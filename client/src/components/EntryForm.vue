<script setup lang="ts">
import { ref } from 'vue';
import{ addBudget, addEntry } from '../stores/budgets';
import session, { setUser } from '../stores/session';
import { updateUser } from '@/stores/users';

    function getCategories() :string[] {
        let categoryArray : string[] = [];
        if(session.user?.budgets.length == 0) {
            return [] as string[];
        }

        //current week
        session.user?.budgets[0].categories.forEach(category => {

            let isAdded : boolean = false;
            categoryArray.forEach(c => {
                if(category.categoryType.toLowerCase() == c.toLowerCase()) {
                    isAdded = true;
                }
            });
            if(!isAdded) {
                categoryArray.push(category.categoryType)
            }
        });

        //the week prior
        if(session.user?.budgets[1] != undefined) {
            session.user?.budgets[1].categories.forEach(category => {

                let isAdded : boolean = false;
                categoryArray.forEach(c => {
                    if(category.categoryType.toLowerCase() == c.toLowerCase()) {
                        isAdded = true;
                    }
                });
                if(!isAdded) {
                    categoryArray.push(category.categoryType)
                }
            });
        }
        return categoryArray;
    }

    function newEntry(spent: number, category: string, description: string) {
        if (session.user && spent >= 0 && category.length > 0 && description.trim().length > 0) {
            addEntry(session.user.budgets[0], spent, category, description.trim(), new Date().valueOf(), false)
            updateUser(session.user).then(result => {
                setUser(result)
            })
        }
    }


const categoryList = ref(getCategories());

const category = ref('');
const spent = ref(0);
const description = ref('');


</script>

<template>
    
    <div class="field">
    <label class="label">Choose Category</label>
        <div class="control">
            <div class="select">
                <select v-model="category" @click="categoryList = getCategories()">
                    <option disabled selected value="">Category</option>
                    <option v-for="category in categoryList" v-bind:value="category">{{ category }}</option>
                </select>
            </div>
        </div>
    </div>
    <div class="field">
        <label class="label">Enter Total Price</label>
        <div class="control">
            <span class="dollar-sign">$</span>
            <input class="input price-input" type="number" min="0" placeholder="0" v-model="spent">
        </div>
    </div>
    <div class="field">
        <label class="label">Description</label>
        <div class="control">
            <textarea class="textarea" name="description" placeholder="Enter description of purchase here" v-model="description"></textarea>
        </div>
    </div>
    <button class="button is-primary" @click="newEntry(spent, category, description); spent=0; category=''; description=''">Submit</button>

</template>



<style scoped>
    .price-input {
        width: 125px;
    }
    .dollar-sign {
        font-size: 1.5em;
        margin-right: 3px;
    }
    .label {
        font-size: 1.25em;
    }
</style>