<script setup lang="ts">
import { ref } from 'vue';
import EntryForm from '@/components/EntryForm.vue';
import UnderOver from '@/components/Under-Over.vue';
import { getWeekNo } from '../stores/time';
import session from '../stores/session';
import BudgetModal from '@/components/BudgetModal.vue';
import router from '@/router';

const isOpen = ref(false);
if(session.user) {
    /* if( session.user.budgets.length == 0 || getWeekNo(new Date()) > (session.user.budgets[0].weekNo)) {
        isOpen.value = true;
    } */

    if (!session.user.hasCurrentWeek) {
        isOpen.value = true;
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
    <BudgetModal class="fades-in" v-model:is-open="isOpen"></BudgetModal>

    <div class="container fades-in">

        <h2><strong>Welcome to </strong></h2>
 
            <h2><strong> <i class="fa-solid fa-magnifying-glass-dollar has-text-black"></i>Dollar Detective</strong></h2>

        <h1 class="title"> Your Recent Activity</h1>

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
    h2{
        text-align: center;
        font-size: 6em;
    }
</style>
