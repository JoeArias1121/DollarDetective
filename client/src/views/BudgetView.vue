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
        Week {{ currentBudget?.weekNo }} 

<!--         <div v-for="(entry, i) in currentBudget?.spending" class="box">
        </div> -->

        <div class="buttons has-addons is-centered input-group">
          <div class="button" @click="setCurrentBudgetIndex(currentBudgetIndex + 1)">
              <i class="fa-solid fa-chevron-left"></i>
            </div>
            <div class="button" @click="setCurrentBudgetIndex(currentBudgetIndex - 1)">
              <i class="fa-solid fa-chevron-right"></i>
            </div>
        </div>
    </div>
  </div>
  </main>
</template>

<style scoped>
    .container {
        margin-left: 15px;
        margin-right: 15px;
    }
</style>

