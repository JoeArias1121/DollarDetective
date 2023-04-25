<script setup lang="ts">
//import  router  from '../router'
</script>

<style>
img{
   
   height:90px;
   width: 60px;
   background-color:white;
    
}
body {
  font-size: 100%;
}

h1 {
  font-size: 5em;
   text-align: center;
  
}
h2{
  font-size: 2em;
  text-align: center;
}

 button {
    padding: 10px;
    font-size: 2em;
    
  }
</style>

<template>
    <!-- This is the navbar-->
    <nav class="navbar is-black" role="navigation" aria-label="main navigation">
      
      <div class="navbar-brand">
      <!--  <div class="hoverable px-5  is-size-5" @click="router.push('/')">-->
                <i class="fa-solid fa-magnifying-glass-dollar has-text-black"></i>
                Dollar Detective
            </div>
    
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      
    
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item">
            Home
          </a>
          <a class="navbar-item">
            Calendar
          </a>
          <a class="navbar-item">
            Statistics
          </a>
          <a class="navbar-item">
             User
          </a>
    
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              Budget
            </a>
            <div class="navbar-dropdown">
              <a class="navbar-item">
                Add
              </a>
              <a class="navbar-item">
                Edit
              </a>
              <a class="navbar-item">
                Delete
              </a>
            </div>
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



  
</template>