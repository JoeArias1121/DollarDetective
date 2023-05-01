<script setup lang="ts">
import  router  from '../router'
import session from '@/stores/session';

function logout() {
    session.user = null;
    router.push('/signIn')
}
</script>

<<<<<<< Updated upstream
=======
<style>
img{
   
   height:90px;
   width: 60px;
   background-color:white;
    
}


 button {
    padding: 10px;
    font-size: 2em;
    
  }
</style>
>>>>>>> Stashed changes

<template>
   <div class="my-3 px-0">
        <nav class="level px-0 has-text-black">
            <div class="hoverable px-5  is-size-5" @click="router.push('/')">
                <i class="fa-solid fa-magnifying-glass-dollar has-text-black"></i>
                Dollar Detective
            </div>
            <div class="box">
                <nav class="level px-0 has-text-primary">
                    <div class="hoverable right-border pl-0 pr-4" @click="router.push('/budget')">
                        <i class="fa-solid fa-table-list has-text-black"></i>
                        Budget
                    </div>

                    <div class="hoverable right-border px-4">
                        <i class="fa-solid fa-calendar-days has-text-black"></i>
                        Calendar
                    </div>

                    <div class="hoverable right-border px-4" @click="router.push('/stats')">
                        <i class="fa-solid fa-chart-line has-text-black"></i>
                        Statistics
                    </div>

                    <div class="hoverable right-border px-4" @click="router.push('/test')">
                        <i class="fa-solid fa-frog has-text-black"></i>
                        Test
                    </div>

                    <div class="hoverable right-border px-4">
                        <i class="fa-solid fa-user-tie has-text-black"></i>
                        User
                    </div>
                    <div class="hoverable pl-4 pr-0" @click="logout()">
                        
                        <i class="fa-solid fa-right-from-bracket has-text-black"></i>
                        Log Out
                    </div>
                </nav>
            </div>
<<<<<<< Updated upstream
        </nav>
    </div>
=======
          </div>
        </div>

         <div class="navbar-end">

          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-white">
                <strong>Log Out</strong>
              </a>
        
            </div>
          </div>
        </div>
      </div>
   
    </nav>



 



   
>>>>>>> Stashed changes
</template>