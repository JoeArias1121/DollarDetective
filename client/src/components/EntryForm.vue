<script setup lang="ts">
import{ addBudget, addEntry } from '../stores/budgets';
import session, { setUser } from '../stores/session';

</script>

<template>
    
    <div class="field">
    <label class="label">Choose Category</label>
        <div class="control">
            <div class="select">
                <select>
                    <option disabled selected value="">Category</option>
                    <option></option>
                </select>
            </div>
        </div>
    </div>
    <div class="field">
        <label class="label">Enter Total Price</label>
        <div class="control">
            <span class="dollar-sign">$</span>
            <input class="input price-input" type="number" min="0" placeholder="Price">
        </div>
    </div>
    <div class="field">
        <label class="label">Description</label>
        <div class="control">
            <textarea class="textarea" name="description" placeholder="Enter description of purchase here"></textarea>
        </div>
    </div>

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