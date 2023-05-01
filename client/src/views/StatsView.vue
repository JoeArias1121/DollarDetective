<script setup lang="ts">
import { ref } from 'vue';
import { getCategoriesAndPercentage, underOverAll } from '@/stores/stats';

const timeFrames = [
        'week',
        'two weeks',
        'month',
        'year',
        'all'
    ]

    
    const date = new Date();
    const time = ref('all');
    const categories = ref(getCategoriesAndPercentage());
    const underOver = ref(underOverAll());

    console.log(date.valueOf())
    console.log('hello');
    console.log(Math.pow(6.048, 8));
    

function getTime(){
    switch(time.value) {
        case 'week':
            categories.value = getCategoriesAndPercentage(date.valueOf() - 604800000);
            underOver.value = underOverAll(date.valueOf() - 604800000);
            console.log('1');
            break;

        case 'two weeks':
            categories.value = getCategoriesAndPercentage(date.valueOf() - 1209600000);
            underOver.value = underOverAll(date.valueOf() - 1209600000); 
            console.log('2');
            break;
        
        case 'month':
            categories.value = getCategoriesAndPercentage(date.valueOf() - 2629746000);
            underOver.value = underOverAll(date.valueOf() - 2629746000);
            console.log('3');
            break;

        case 'year':
            categories.value = getCategoriesAndPercentage(date.valueOf() - 31556952000);
            underOver.value = underOverAll(date.valueOf() - 31556952000);
            console.log('4');
            break;
        
        case 'all':
            categories.value = getCategoriesAndPercentage();
            underOver.value = underOverAll();
            console.log('5');
            break;
    }
}



    


    
    // week=6.048^8 twoWeeks=1.21^9 month=2.628^9 year=3.154^10 alltime
</script>

<template>
    <h1 class="title">Your Statistics</h1>

        
    
    <div class="container">
        <div class="time-container box">
            <a href="#" class="times has-text-info" v-for="timeFrame in timeFrames" v-bind:class="{'is-active': time == timeFrame}"
            @click="time = timeFrame; getTime()">{{ timeFrame }}</a>
        </div>
        <div class="box under-over">
            <h2 class="title"> Total Spent: {{  underOver.totalSpent }}</h2>
            <h2 class="title"> Total Attemped to Save: {{  underOver.attemptedSavings }}</h2>
        </div>
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
        justify-content: center;
        align-items: center;
    }
    .box {
        width: 300px;
        min-height: 150px;
        margin-right: 8px;
        margin-bottom: 24px;
    }
    .under-over {
        width: 100%;
    }
    h1 {    
        text-align: center;
        font-size: 3em;
    }
    .time-container {
        display: flex;
        flex-flow: row wrap;
        width: 95vw;
        min-height: 50px;
        justify-content: space-between;
    }
    .times {
        font-size: 1.25em;
        margin-left: 10px;
        margin-right: 10px;
    }
    .is-active {
        text-decoration: underline;
    }
</style>