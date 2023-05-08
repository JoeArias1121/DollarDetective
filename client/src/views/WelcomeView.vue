<script setup lang="ts">
import { ref } from 'vue';
import UnderOver from '@/components/Under-Over.vue';
import { getWeekNo } from '../stores/time';
import session from '../stores/session';
import BudgetModal from '@/components/BudgetModal.vue';
import EntryModal from '@/components/EntryModal.vue';
import router from '@/router';

const isNewBudgetOpen = ref(false);
const isNewEntryOpen = ref(false);

if(session.user) {
    /* if( session.user.budgets.length == 0 || getWeekNo(new Date()) > (session.user.budgets[0].weekNo)) {
        isOpen.value = true;
    } */

    if (!session.user.hasCurrentWeek) {
        isNewBudgetOpen.value = true;
    }
}else{
    router.push("/signIn")
}


</script>

<style>
  .div1 {
  width: 300px;
  height: 100px;
  border: 1px solid blue; 
}

.div2 {
  width: 300px;
  height: 100px;
  padding: 50px;
  border: 1px solid red;
}
</style>
<template>
    <BudgetModal v-model:is-open="isNewBudgetOpen"></BudgetModal>
    <EntryModal v-model:is-open="isNewEntryOpen"></EntryModal>

    <div class="container fades-in">

        <h2><strong>Welcome to </strong></h2>
 
            <h2><strong> <i class="fa-solid fa-magnifying-glass-dollar has-text-black"></i>Dollar Detective</strong></h2>

        <h1 class="title">Recent Activity</h1>

        <div class="columns">
            <div class="column">
                
            </div>
            <div class="column is-three-fifths">
                <div class="box">
                    <UnderOver />
                </div>

                <div class="box">
                    <div class="button is-inverted is-primary is-rounded is-fullwidth" @click="isNewEntryOpen = true">New Entry</div>
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
    h2{
        text-align: center;
        font-size: 6em;
    }
</style>
