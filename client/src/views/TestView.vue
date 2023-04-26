<script setup lang="ts">
    import session from '@/stores/session';
    import { updateUser } from '@/stores/users';

    function noChange() {
        if (session.user) {
            updateUser(session.user).then(result => {
                console.log(result)
            })
        }
    }

    function passChange() {
        if (session.user) {
            session.user.password = "pass"
            updateUser(session.user).then(result => {
                console.log(result)
            })
        }
    }
</script>

<template>
    <main>
        <div class="box fades-in">
            <div class="button is-bg" @click="passChange()">password change to 'pass'</div>
        </div>
    </main>
</template>