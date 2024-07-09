<template>
    <div class="signin-form">
        <h1 class="text-dark-purple">Sign In</h1>
        <p class="error-message text-red" >{{errorMessage}}</p>
        <div>
            <v-text-field variant="underlined"
                          v-model="form.email"
                          label="Email"
                          class="input-area"
                          name="email"
            ></v-text-field>
            <v-text-field
                class="input-area"
                name="password"
                :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append-inner="show1 = !show1"
                v-on:keyup.enter="handleSubmit"
                v-model="form.password" label="Password" variant="underlined"></v-text-field>
            <v-btn class="submit-btn" @click="handleSubmit" width="100%" color="primary">Sign In</v-btn>
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
import {signIn} from "@/Services/Api/index.js";
import {store} from "@/Store/index.js";

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
            errorMessage:null,
        }
    },
    methods:{
        handleSubmit(){
            this.errorMessage =""
            console.log("pressed enter",this.form)
            if(!this.form.email){
                this.errorMessage = "Email ID is required"
                return
            }
            if(!this.form.password){
                this.errorMessage = "Enter password"
                return
            }
            this.$emit("handleLoading",true)
            console.log("opening or sending request")
            signIn(this.form).then(({data})=>{
                store.setUser({email:data?.email})
                store.setToken(data?.accessToken)
                store.setRefreshToken(data?.refreshToken)
                if(data?.isAdmin){
                    this.$router.push(ROUTES.ADMIN)
                }else{
                    this.$router.push(ROUTES.HOME)
                }
                store.unAuthorized = false
                this.$emit("handleLoading",false)

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
.input-area{
    margin-bottom: 26px;
}
</style>