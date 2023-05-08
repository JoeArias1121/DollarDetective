<script setup lang="ts">
    import router from '@/router';
    import { computePercentage, type Category } from '@/stores/budgets';
    import session, { setUser } from '@/stores/session';
    import { updateUser } from '@/stores/users';
    import { ref } from 'vue';

    const newCategory = ref(false)
    const oldCategories = ref<String[]>([])

    const newCategoryInput = ref()
    const oldCategoryInput = ref()
    const valueInput = ref()
    const valueInputBad = ref(false)
    const monthInputBad = ref(false)
    const dayInputBad = ref(false)

    const descInput = ref()

    const dateInput = ref<Date>(new Date())
    const monthInput = ref()
    const dayInput = ref()

    function genOldCategories() {
        oldCategories.value = []

        if (session.user && session.user.budgets.length > 0) {
            session.user.budgets[0].categories.forEach(category => {
                oldCategories.value.push(category.categoryType)
            })

            if (session.user.budgets[1]) {
                session.user.budgets[1].categories.forEach(category => {
                    if (!oldCategories.value.includes(category.categoryType))
                        oldCategories.value.push(category.categoryType)
                })
            }
        }
    }

    function checkValueInput() {
        const num = +valueInput.value

        if (typeof(num) == "number" && num >= 0) {
            valueInputBad.value = false
        } else {
            valueInputBad.value = true
        }
    }

    function checkMonthInput() {
        const num = +monthInput.value

        if (typeof(num) == "number" && num > 0 && num < 13) {
            monthInputBad.value = false
        } else {
            monthInputBad.value = true
        }
    }

    function checkDayInput() {
        const dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

        const num = +dayInput.value
        const month = (+monthInput.value) - 1

        if (typeof(num) == "number" && num > 0 && num <= dayCount[month + 1] - dayCount[month]) {
            dayInputBad.value = false
        } else {
            dayInputBad.value = true
        }
    }

    function addEntry() {
        if (session.user && session.user.budgets[0]) {
            const chosenCategory = newCategory.value ? newCategoryInput.value : oldCategoryInput.value

            let i = session.user.budgets[0].categories.findIndex((c) => {
                return c.categoryType == chosenCategory
            })
            if (i == -1) {
                i = session.user.budgets[0].categories.push({
                    categoryType: chosenCategory,
                    entries: []
                }) - 1
            }

            let time = dateInput.value

            if (!dayInputBad.value && !monthInputBad.value) {
                time.setMonth(monthInput.value - 1)
                time.setDate(dayInput.value)
            }

            session.user.budgets[0].categories[i].entries.push({
                description: descInput.value,
                date: time.valueOf(),
                weekly: false,
                spent: Number(valueInput.value)
            })
            emit('update:isOpen', false)

            updateUser(session.user).then(result => {
                setUser(result);

                router.push('/refreshbudget')
            })
        }
    }

    function initialize() {
        genOldCategories()
        if (session.user)
            dateInput.value = new Date(session.user?.activeTime);
            dayInput.value = dateInput.value.getDate();
            monthInput.value = dateInput.value.getMonth() + 1;

        if (props.injectCategory && props.injectCategory.length > 0) {
            oldCategoryInput.value = props.injectCategory
        }
    }

    const props = defineProps<{ 
        isOpen: boolean,
        injectCategory?: string
    }>();

    const emit = defineEmits<{
        (emit: 'update:isOpen', value: boolean): void;
    }>();

    initialize()
</script>

<template>
    <div class="modal fades-in" v-bind:class="{ 'is-active' : props.isOpen }">
        <div class="modal-background"></div>

        <div class="modal-content">
            <div class="box">
                <div class="title">New Entry</div>
                <div class="field">
                    <div class="label">
                        Category
                        <i class="fa-solid ml-3 hoverable" :class="{'fa-folder-plus': !newCategory, 'fa-folder': newCategory}" @click="newCategory=!newCategory"></i>
                    </div>
                    <div class="control has-icons-left" v-if="newCategory">
                        <input class="input" type="text" placeholder="New Category" v-model="newCategoryInput">
                        <div class="icon is-left">
                            <i class="fas fa-folder-plus"></i>
                        </div>
                    </div>

                    <div class="control has-icons-left" v-if="!newCategory">
                        <div class="select is-fullwidth">
                            <select v-model="oldCategoryInput">
                                <option v:bind:value="category" v-for="category in oldCategories"> {{ category }} </option>
                            </select>
                        </div>    
                        <div class="icon is-left">
                            <i class="fas fa-folder"></i>
                        </div>            
                    </div>


                    <div class="label mt-2">
                        Amount
                    </div>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="text" placeholder="" v-model="valueInput" @keyup="checkValueInput" :class="{'is-danger': valueInputBad}">
                        <span class="icon is-small is-left">
                            <i class="fas fa-coins"></i>
                        </span>
                    </div>

                    <div class="label mt-2">
                        Description
                    </div>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="text" placeholder="" v-model="descInput">
                        <span class="icon is-small is-left">
                            <i class="fas fa-comment"></i>
                        </span>
                    </div>

                    <div class="label mt-2">
                        Month
                    </div>
                    <div class="control has-icons-left">
                        <input class="input" type="text" placeholder="" v-model="monthInput" @keyup="checkMonthInput(); checkDayInput()" :class="{'is-danger': monthInputBad}">
                        <span class="icon is-small is-left">
                            <i class="fas fa-calendar"></i>
                        </span>
                    </div>
                    <div class="label mt-2">
                        Day
                    </div>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="text" placeholder="" v-model="dayInput" @keyup="checkDayInput(); checkMonthInput()" :class="{'is-danger': dayInputBad}">
                        <span class="icon is-small is-left">
                            <i class="fas fa-calendar-day"></i>
                        </span>
                    </div>

                    <div class="field is-grouped is-fullwidth mt-3">
                        <div class="control">
                            <div class="button is-primary is-inverted is-rounded" @click="addEntry()">Confirm</div>
                        </div>
                        <div class="control">
                            <div class="button is-danger is-inverted is-rounded" @click="emit('update:isOpen', false)">Cancel</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>