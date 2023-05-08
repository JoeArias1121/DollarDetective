<script setup lang="ts">
    import router from '@/router';
    import type { Budget, Category, Entry } from '@/stores/budgets';
    import { categorySum, budgetSum } from '@/stores/stats';
    import session from '@/stores/session';
    import { ref } from 'vue';

    const alltime = ref<Category[]>([])

    function alltimeUpdate() {
        if (session.user && session.user.budgets) {
            session.user.budgets.forEach(budget => {
                budget.categories.forEach(category => {
                    let foundCategory = -1

                    for (let i = 0; i < alltime.value.length && foundCategory == -1; i++) {
                        if (alltime.value[i].categoryType == category.categoryType) {
                            foundCategory = i
                        }
                    }

                    if (foundCategory == -1) {
                        foundCategory = alltime.value.push({
                            categoryType: category.categoryType,
                            entries: []
                        })

                        foundCategory--;
                    }

                    category.entries.forEach(entry => {
                        alltime.value[foundCategory].entries.push({
                            description: entry.description,
                            spent: entry.spent,
                            date: entry.date,
                            weekly: entry.weekly                             
                        })
                    })
                })
            });
        }

        alltime.value.sort( (c0, c1) => {
            return categorySum(c1) - categorySum(c0)
        } )
    }

    function calcPercent(category: Category) {
        const sum = +categorySum(category)
        const total = +budgetSum(alltime.value)

        if (typeof(sum) == 'number' && typeof(total) == 'number' && total > 0) {
            return ((sum/total) * 100).toFixed(2)
        }

        return 0
    }

    function initialize() {
        alltimeUpdate()
    }

    if (session.user) {
        initialize()
    } else {
        router.push('/')
    }
</script>

<template>
    <div class="container fades-in">
        <h1 class="title" style="text-align:center">All-Time Statistics</h1>
            <div class="box" v-for="category in alltime">

                <nav class="level">
                    <!-- left side -->
                    <div class="level-left">
                        <div class="level-item title">
                            {{ category.categoryType }}
                        </div>
                    </div>

                    <!-- right side -->
                    <div class="level-left">
                        <div class="level-item title">
                            {{ calcPercent(category) }}%
                        </div>
                    </div>
                </nav>
                <progress class="progress is-primary" v-bind:value="categorySum(category)" v-bind:max="budgetSum(alltime)"></progress>
            </div>
        </div>

</template>