<script setup lang="ts">
import { getCategoriesAndPercentage } from '@/stores/stats';

    const categories = getCategoriesAndPercentage();
</script>

<template>
    <h1 class="title">Your Statistics</h1>

    <div class="container">
        <div class="box" v-for="category, i in categories">
            <p class="title">{{ category.categoryType }}</p>
            <p>Percentage: {{ category.percentage }}</p>
            <p>Total Spent: {{ category.totalSpending }}</p>
        </div>
    </div>
</template>



<style scoped>
    .container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .box {
        width: 300px;
        min-height: 150px;
        margin-right: 8px;
        margin-bottom: 24px;
    }
    h1 {    
        text-align: center;
        font-size: 3em;
    }
</style>