<script setup lang="ts">
    import router from '@/router';
    import type { Budget, Category, Entry } from '@/stores/budgets';
    import { categorySum, budgetSum } from '@/stores/stats';
    import session from '@/stores/session';
    import { ref } from 'vue';
    import { getDayNo, dayNoToDate } from '@/stores/time';
    import CategoryBox from '@/components/CategoryBox.vue';

    const days = new Array<Category[]>(365)
    const dayNo = ref(0)
    const currentIndex = ref(0)
    const currentCategories = ref<Category[]>([])

    function budgetsToDays(budgets: Budget[]) {
        for (const budget of budgets) {
            for (const category of budget.categories) {
                for (const entry of category.entries) {
                    const day = getDayNo(new Date(entry.date)) - 1//convert to index

                    if (!days[day])
                        days[day] = new Array<Category>();

                    // this is already going to be our 3rd nested loop :(
                    // so lets use the flag method to end our loop ASAP
                    let found = -1;
                    // found will be the Category in days[day] 
                    // that has the same description as category (from loop)
 /*                    for (let i = 0; i < days[day].length && !found; i++) {
                        if (days[day][i].categoryType == category.categoryType) { //string.toLowerCase()?
                            found = days[day][i]
                        }
                    } */

                    found = days[day].findIndex((c) => {
                        return c.categoryType == category.categoryType
                    })

                    let i = 0
                    // !found means the category doesn't exist
                    if (found == -1) {
                        i = days[day].push({
                            categoryType: category.categoryType,
                            entries: []
                        }) - 1
                    }

                    // by now found must exist, push a copy of entry onto it
                    days[day][i].entries.push({
                        description: entry.description,
                        spent: entry.spent,
                        date: entry.date,
                        weekly: entry.weekly 
                    })
                }
            }
        }
    }

    function changeCurrentIndex(i: number) {
        if (i >= 0 && i < 365) {
            currentIndex.value = i
            currentCategories.value = days[currentIndex.value]
        }
    }

    if (session.user) {
        budgetsToDays(session.user.budgets)
        dayNo.value = getDayNo(new Date(session.user.activeTime)) - 1
        
        changeCurrentIndex(dayNo.value)
    } else {
        router.push('/signIn')
    }
</script>

<template>
    <div class="container fades-in">
      <h1 class="title" style="text-align:center">Daily Activity</h1>
        <div class="box fades-in">

            <nav class="level">
            <div class="level-left">
                <div class="level-item title">
                <strong> {{ dayNoToDate(currentIndex + 1).getMonth() + 1 }}/{{ dayNoToDate(currentIndex + 1).getDate() }} Day {{ currentIndex + 1 }}</strong>
                </div>
            </div>   
            
            <div class="level-right">
                <div class="level-item title">
                    ${{ budgetSum(currentCategories) }}
                    </div>
                </div> 
            </nav>

            <nav class="level">
                <div class="level-left">
                    <div class="level-item">
                        <div class="button" @click="changeCurrentIndex(currentIndex - 1)">
                            <i class="fa-solid fa-chevron-left"></i>
                        </div>
                    </div>
                </div>

                <div class="level-right">
                    <div class="level-item">
                        <div class="button" @click="changeCurrentIndex(currentIndex + 1)">
                            <i class="fa-solid fa-chevron-right"></i>
                        </div>
                    </div>
                </div>
            </nav>

            <div class="box " v-for="category, i in currentCategories">
                <CategoryBox :inputCategory="category" :budgetIndex="1"></CategoryBox>
            </div>
        </div>
    </div>
</template>