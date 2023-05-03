<script setup lang="ts">
  import { ref } from 'vue';
  import session from '@/stores/session';
  import { getServerTime, getWeekNo} from '@/stores/time';
  import router from '@/router';
  import type { Budget } from '@/stores/budgets';

  const currentBudgetIndex = ref<number>(0);
  const currentBudget = ref<Budget>();

   function setCurrentBudgetIndex(i: number) {
    if (session.user && i >= 0 && i < session.user.budgets.length) {
      currentBudgetIndex.value = i
      currentBudget.value = session.user.budgets[i]
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
        <strong>Week {{ currentBudget?.weekNo }}</strong>

        <div class="category-container">
          <div class="box category-display" v-for="category, i in currentBudget?.categories">
            <p class="title">{{ category.categoryType }}</p>
            
            <nav class="level" v-for="entry, j in category.entries">
              <div class="level-left">
                <div class="level-item">
                  {{ entry.description }}
                </div>
              </div>

              <div class="level-right">
                <div class="level-item">
                  {{ entry.spent }}
                </div>
              </div>
            </nav>
          </div>
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

<style scoped> 
  .category-display {
      width: 300px;
      min-height: 150px;
      margin-right: 8px;
      margin-bottom: 24px;
  }

  .category-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
</style>
