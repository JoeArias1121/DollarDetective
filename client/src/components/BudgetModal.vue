<script setup lang="ts">
import { ref } from 'vue';
import { updateUser } from '@/stores/users';
import session, { setUser } from '../stores/session';
import { addBudget } from '@/stores/budgets';
import { getWeekNo } from '@/stores/time';

    const goalInput = ref()
    const goalInputBad = ref(false)

    function checkGoalInput() {
        const num = +goalInput.value

        if (typeof(num) == "number" && num >= 0) {
            goalInputBad.value = false
        } else {
            goalInputBad.value = true
        }
    }

function newBudget() {
        if (session.user) {
            addBudget(session.user, new Date().valueOf(), getWeekNo(new Date(session.user.activeTime)) - 1, goalInput.value)

            emit('update:isOpen', false)
            updateUser(session.user).then(result => {
                setUser(result)
            })
        }
    }

    

const spendingLimit = ref((session.user?.budgets.length ? session.user.budgets[0].spendingLimit : 100));

const props = defineProps<{ 
    isOpen: boolean,
}>();

const emit = defineEmits<{
    (emit: 'update:isOpen', value: boolean): void;
}>();

</script>

<template>
    <div class="modal" v-bind:class="{ 'is-active' : props.isOpen }">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <div class="title">New Budget</div>
                <div class="field">
                    <div class="label mt-2">
                        Goal
                    </div>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="text" placeholder="" v-model="goalInput" @keyup="checkGoalInput" :class="{'is-danger': goalInputBad}">
                        <span class="icon is-small is-left">
                            <i class="fas fa-coins"></i>
                        </span>
                    </div>
                </div>
                
                <div class="field is-grouped is-fullwidth mt-3">
                    <div class="control">
                        <div class="button is-primary is-inverted is-rounded is-fullwidth" @click="newBudget()">Confirm</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<style scoped>
    

</style>