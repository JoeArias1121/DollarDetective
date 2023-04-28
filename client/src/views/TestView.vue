<script setup lang="ts">
    import { addBudget, addEntry } from '@/stores/budgets';
    import session, { setUser } from '@/stores/session';
    import { getWeekNo } from '@/stores/time';
    import { updateUser } from '@/stores/users';

    function newBudget() {
        if (session.user) {
            addBudget(session.user, new Date().valueOf(), getWeekNo(new Date()), 1000)

            updateUser(session.user).then(result => {
                setUser(result)
            })
        }
    }

    function newEntry() {
        if (session.user) {
            addEntry(session.user.budgets[0], 100, "food", "donut", new Date().valueOf(), false)
            updateUser(session.user).then(result => {
                setUser(result)
            })
        }
    }
</script>

<template>
    <main>
        <div class="box fades-in">
            <div class="box">
                <div class="button is-bg" @click="newBudget()">budget</div>
                <div class="button is-bg" @click="newEntry()">entry</div>
            </div>

            <div class="box">
                user.budgets:
                <div class="box">
                    {{ session.user?.budgets }}
                </div>
            </div>
        </div>
    </main>
</template>