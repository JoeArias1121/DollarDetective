<script setup lang="ts">
import { ref } from 'vue';
import { updateUser } from '@/stores/users';
import session, { setUser } from '../stores/session';
import { addBudget } from '@/stores/budgets';
import { getWeekNo } from '@/stores/time';


function newBudget(spendingLimit: number) {
        if (session.user) {
            addBudget(session.user, new Date().valueOf(), getWeekNo(new Date()), spendingLimit)

            updateUser(session.user).then(result => {
                setUser(result)
            })
        }
    }

const spendingLimit = ref(session.user!.budgets[0].spendingLimit ?? 0);

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

        <div class="modal-card">
            <header class="modal-card-head">
                <slot name="header">
                    <p class="modal-card-title">New Weekly Budget!!</p>
                </slot>
            </header>
            <section class="modal-card-body">
                <label class="label">Set this weeks spending limit</label>
                <div class="control">
                    <input type="number" class="input" v-model="spendingLimit" v-bind:placeholder="session.user!.budgets[0].spendingLimit.toString()">
                </div>
            </section>
            <footer class="modal-card-foot">
                <div class="control field">
                    <button class="button is-primary" @click="newBudget(spendingLimit); emit('update:isOpen', false)">Save</button>
                </div>
            </footer>
            
        </div>
        
    </div>
</template>



<style scoped>
    

</style>