<template>
    <div class="signin-form">
        <h1 class="text-dark-purple">Sign Up</h1>
        <p class="error-message text-red" >{{errorMessage}}</p>
        <div>
            <v-text-field variant="underlined"
                          v-model="form.email"
                          name="email"
                          label="Email"
            ></v-text-field>
            <v-text-field
                :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append-inner="show1 = !show1"
                v-on:keyup.enter="handleSubmit"
                v-model="form.password" label="Password" variant="underlined"></v-text-field>
             <v-btn @click="handleSubmit" width="100%" class="submit-btn" color="primary">Sign Up</v-btn>

        </div>
        <div class="links">
            <router-link :to="ROUTES.SIGNIN">
                Already have an account? Sign In.
            </router-link>
        </div>
    </div>
</template>

<script>
import {ROUTES} from "@/Constants/routes.js";
import {signUp} from "@/Services/Api/index.js";

export default {
    name: "SignUp",
    data() {
        return {
            ROUTES,
            show1:false,
            show2:false,
            form: {
                email: null,
                password: null,
            },
            errorMessage:null,
        }
    },
    methods:{
        handleSubmit(){
            const mailformat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g ;
            if(!this.form.email){
                this.errorMessage = "Email ID is required to create an account"
                return
            }
            if(!this.form.password){
                this.errorMessage = "Enter a password to create an account"
                return
            }
            if(!this.form.email.match(mailformat)){
                this.errorMessage = "Enter a valid Email"
                return
            }

            this.$emit("handleLoading",true)
            signUp(this.form).then((response)=>{
                this.$emit("handleLoading",false)
                console.log("response")
            }).catch((err)=>{
                this.$emit("handleLoading",false)
                this.errorMessage = err?.msg
            })

        }
    }
}
</script>

<style lang="scss" scoped>
h1 {
    margin-bottom: 24px;
}
.submit-btn{
    margin-top: 16px;
}
.links{
    margin-top: 24px;
    a{
        color: $PURPLE;
    }
}
.error-message{
     margin-bottom: 12px;
 }
</style>