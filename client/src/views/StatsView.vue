<script setup lang="ts">
import { getCategoriesAndPercentage } from '@/stores/stats';

    const categories = getCategoriesAndPercentage();
</script>

<template>
    <div class="container">
        <div class="box" v-for="category, i in categories">
            <p class="title">{{ category.categoryType }}</p>
            <p>Percentage: {{ category.percentage }}</p>
            <p>Total Spent: {{ category.totalSpending }}</p>
        </div>
    </div>
</template>



<style scoped>

</style>