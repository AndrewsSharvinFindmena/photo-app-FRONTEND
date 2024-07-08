<template>
    <div class="signin-form">
        <h1 class="text-dark-purple">Sign In</h1>
        <div>
            <v-text-field variant="underlined"
                          v-model="form.email"
                          label="Email"
                          name="email"
            ></v-text-field>
            <v-text-field
                name="password"
                :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append-inner="show1 = !show1"
                v-on:keyup.enter="handleSubmit"
                v-model="form.password" label="Password" variant="underlined"></v-text-field>
            <v-checkbox
                    color="primary"
                    label="Keep me signed in"
            ></v-checkbox>
            <v-btn width="100%" color="primary">Sign In</v-btn>
        </div>
        <div class="links">
            <router-link :to="ROUTES.SIGNUP">
                Create new account.
            </router-link>
        </div>
    </div>
</template>

<script>
import {ROUTES} from "@/Constants/routes.js";

export default {
    name: "SignIn",
    data() {
        return {
            ROUTES,
            show1:false,
            form: {
                email: null,
                password: null
            },
            errrorMessage:null,
            keepSignedIn: false
        }
    },
    methods:{
        handleSubmit(){

        }
    }
}
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 24px;
}
.links{
    margin-top: 24px;
    a{
        color: $PURPLE;
    }
}
</style>