<script setup lang="ts">
import { underOverBudget } from '../stores/stats';
import session from '../stores/session';


</script>

<template>
    <div>
        <p>Percantage of spending limit spent: {{ underOverBudget().percentage }}%</p>
        <p>Total spent this week: {{ underOverBudget().totalSpent }}</p>
        <p>Your spending limit for this weeks budget: {{ (session.user?.budgets.length != 0 ) ? session.user?.budgets[0].spendingLimit : 0}}</p>
        <progress class="progress is-large" v-bind:value="underOverBudget().percentage" max="100">{{ underOverBudget().percentage }}</progress>
    </div>
</template>



<style scoped>

</style>