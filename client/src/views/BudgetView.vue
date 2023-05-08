<script setup lang="ts">
  import { ref } from 'vue';
  import session from '@/stores/session';
  import router from '@/router';
  import type { Budget, Category } from '@/stores/budgets';
  import { categorySum, budgetSum } from '@/stores/stats';
  import CategoryBox from '@/components/CategoryBox.vue';

  const currentBudgetIndex = ref<number>(0);
  const currentBudget = ref<Budget>();

   function setCurrentBudgetIndex(i: number) {
    if (session.user && i >= 0 && i < session.user.budgets.length) {
      currentBudgetIndex.value = i
      currentBudget.value = session.user.budgets[i]
      session.user.budgets[i].categories.sort((c0, c1) => {
        return categorySum(c1) - categorySum(c0)
      })

      session.user.budgets[i].categories.forEach(category => {
        category.entries.sort((e0, e1) => {
          return e1.date - e0.date
        })
      })
    }
  }

  if (session.user) {
      setCurrentBudgetIndex(0)
  } else {
      router.push("/")
  }
</script>

<template>
  <main>
    <div class="container fades-in">
      <div class="box">
        <nav class="level">
          <div class="level-left">
            <div class="level-item title">
              <strong>Week {{ currentBudget?.weekNo }}</strong>
            </div>
          </div>   
          
          <div class="level-right">
            <div class="level-item title">
              ${{ budgetSum(currentBudget?.categories) }}
            </div>
          </div> 
        </nav>

        <div class="box " v-for="category, i in currentBudget?.categories">
          <CategoryBox :inputCategory="category" :budgetIndex="currentBudgetIndex"></CategoryBox>
        </div>

      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="button" @click="setCurrentBudgetIndex(currentBudgetIndex + 1)">
              <i class="fa-solid fa-chevron-left"></i>
            </div>
          </div>
        </div>

        <div class="level-right">
          <div class="level-item">
            <div class="button" @click="setCurrentBudgetIndex(currentBudgetIndex - 1)">
              <i class="fa-solid fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </nav>

      </div>
    </div>
  </main>
</template>