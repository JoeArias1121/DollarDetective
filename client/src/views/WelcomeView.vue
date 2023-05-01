<script setup lang="ts">
import { ref } from 'vue';
import EntryForm from '@/components/EntryForm.vue';
import UnderOver from '@/components/Under-Over.vue';
import { getWeekNo } from '../stores/time';
import session from '../stores/session';
import BudgetModal from '@/components/BudgetModal.vue';


const isOpen = ref(false);
if(session.user) {
    if( session.user.budgets.length == 0 || getWeekNo(new Date()) > (session.user.budgets[0].weekNo)) {
        isOpen.value = true;
    }
}


</script>

<template>
    
    <BudgetModal class="fades-in" v-model:is-open="isOpen"></BudgetModal>

    <div class="container fades-in">
        <h1 class="title">Your Recent Activity</h1>
        <div class="columns">
            <div class="column">
                
            </div>
            <div class="column is-three-fifths">
                <div class="box">
                    <UnderOver />
                </div>
                <div class="box">
                    <EntryForm />
                </div>
            </div>
            <div class="column">
                
            </div>
        </div>
    </div>

</template>

<style scoped>
    h1 {
        text-align: center;
        font-size: 3em;
    }
</style>
