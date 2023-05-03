<script setup lang="ts">
import { underOverBudget } from '../stores/stats';
import session from '../stores/session';


</script>

<template>
    <div>
        <p><strong>You've spent </strong>{{ underOverBudget().percentage }}% of your goal</p>
        <p><strong>You've have </strong>${{ (session.user?.budgets.length != 0 ) ? session.user?.budgets[0].spendingLimit : 0 - underOverBudget().totalSpent }} left</p>
        <p><strong>Total spent this week:</strong> ${{ underOverBudget().totalSpent }}</p>
        <p><strong>Goal for the Week: </strong> ${{ (session.user?.budgets.length != 0 ) ? session.user?.budgets[0].spendingLimit : 0}}</p>
        <progress class="progress is-large" v-bind:value="underOverBudget().percentage" max="100">{{ underOverBudget().percentage }}</progress>
    </div>
</template>



<style scoped>

</style>