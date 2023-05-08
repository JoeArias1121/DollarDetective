<script setup lang="ts">
    import { ref } from 'vue';
    import type { Category, Entry } from '../stores/budgets';
    import { categorySum } from '../stores/stats';
    import session, {setUser} from '@/stores/session';
    import { updateUser } from '@/stores/users';

    const props = defineProps(['inputCategory'])
    const category = ref<Category>(props.inputCategory)

    const expanded = ref(false)

    const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]; //for dateToString

    function flipWeekly(entry: Entry) {
        if (session.user) {
            entry.weekly = !entry.weekly
            updateUser(session.user).then(result => {
                    setUser(result)
                })
        }
    }

    function deleteEntry(category: Category, j: number) {
        if (session.user) {
            category.entries.splice(j, 1)
            updateUser(session.user).then(result => {
                    setUser(result)
                })
        }
    }

    function dateToString(entry: Entry) {
        const date = new Date(entry.date)
        const month = date.getMonth() + 1
        let monthString = "" + month
        const day = date.getDate()
        let dayString = "" + day

        console.log(date)

        if (month < 10) {
            monthString = "0" + month
        }
        if (day < 10) {
            dayString = "0" + day
        }
        
        return monthString + "/" + dayString + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
    }
</script>

<template>
    <nav class="level my-0">
        <div class="level-left">
            <div class="level-item">
                <i class="fa-solid hoverable" :class="{'fa-chevron-down': !expanded, 'fa-chevron-up': expanded}" @click="expanded = !expanded"></i>
                <i class="fa-solid fa-plus mx-3 hoverable"></i>
                <strong>{{ category.categoryType }}</strong>
            </div>
        </div>   

        <div class="level-right">
            <div class="level-item">
            <strong>${{ categorySum(category) }}</strong>
            </div>
        </div> 
    </nav>

    <nav class="level my-0 entry" v-for="entry, j in category.entries" v-if="expanded">
        <div class="level-left">
            <div class="level-item">
                {{ weekday[new Date(entry.date).getDay()] }}
            </div>

            <div class="level-item on-hover">
                {{ dateToString(entry) }}
            </div>

            <div class="level-item">
                {{ entry.description }}
            <i class="fa-solid fa-calendar-check mx-3" v-if="entry.weekly"></i>
            </div>
        </div>

        <div class="level-right">
            <div class="level-item">
                ${{ entry.spent }}
            </div>
            <i class="on-hover fa-solid ml-3 hoverable" :class="{'fa-calendar-plus': !entry.weekly, 'fa-calendar-minus': entry.weekly}" @click="flipWeekly(entry)"></i>
            <i class="on-hover fa-solid fa-trash ml-3 hoverable" @click="deleteEntry(category, j)"></i>
        </div>
    </nav>
</template>

<style scoped>
.entry:hover {
    background-color: lightgoldenrodyellow
}

.on-hover {
    display:none;
}
.entry:hover .on-hover {
    display:inline;
}
</style>