<script setup lang="ts">
    import router from '@/router';
import session, { setUser } from '@/stores/session';
    import { updateUser, deleteUser } from '@/stores/users';
    import { ref } from 'vue';

    const prevInput = ref("")
    const passInput = ref("")
    const confirmInput = ref("")

    const d1 = ref(false)
    const d2 = ref(false)
    const d3 = ref(false)


    function changePassword() {
        if (session.user)
            if (passInput.value == confirmInput.value && prevInput.value == session.user.password) {
                session.user.password = passInput.value

                prevInput.value = ""
                passInput.value = ""
                confirmInput.value = ""

                updateUser(session.user).then(result => {
                    setUser(result);
                })
            }
    }

    function deleteAccount() {
        if (session.user) {
            if (d1.value && d2.value && d3.value) {
                deleteUser(session.user).then(result => {
                    console.log(result)
                    if (result) {
                        session.user = null;
                        router.push('/')
                    }
                })
            }
        }
    }
</script>

<template>
    <div class="container fades-in">
        <h1 class="title" style="text-align:center">User Settings</h1>

        <div class="box">
            <h1 class="title">Change Password</h1>

            <div class="field">
                <div class="label mt-2">
                    Previous Password
                </div>
                <div class="control has-icons-left has-icons-right">
                    <input class="input" type="text" placeholder="" v-model="prevInput">
                    <span class="icon is-small is-left">
                        <i class="fas fa-unlock"></i>
                    </span>
                </div>

                <div class="label mt-2">
                    New Password
                </div>
                <div class="control has-icons-left has-icons-right">
                    <input class="input" type="text" placeholder="" v-model="passInput">
                    <span class="icon is-small is-left">
                        <i class="fas fa-key"></i>
                    </span>
                </div>

                <div class="label mt-2">
                    Confirm Password
                </div>
                <div class="control has-icons-left has-icons-right">
                    <input class="input" type="text" placeholder="" v-model="confirmInput">
                    <span class="icon is-small is-left">
                        <i class="fas fa-key"></i>
                    </span>
                </div>

                <div class="control mt-3">
                    <div class="button is-primary is-inverted is-rounded" @click="changePassword()">Confirm</div>
                </div>
            </div>
        </div>

        <div class="box">
            <h1 class="title has-text-danger">Delete Account</h1>

            <div class="field">
                <label class="checkbox has-text-danger">
                    <input type="checkbox" v-model="d1">
                    I understand this will delete my account
                </label>
            </div>

            <div class="field">
                <label class="checkbox has-text-danger" v-if="d1">
                    <input type="checkbox" v-model="d2">
                    I understand I will not recover my data
                </label>
            </div>

            <div class="field">
                <label class="checkbox has-text-danger" v-if="d1 && d2">
                    <input type="checkbox" v-model="d3">
                    I still wish to delete my account
                </label>
            </div>

            <div class="field">
                <div class="control mt-3" v-if="(d1 && d2 && d3)">
                    <div class="button is-danger is-inverted is-rounded" @click="deleteAccount()">Confirm</div>
                </div>
            </div>
        </div>
    </div>
</template>