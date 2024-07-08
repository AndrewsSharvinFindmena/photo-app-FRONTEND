<template>
    <div class="wrapper" >
        <div class="container" >
            <div class="form-wrapper" >
               <SignIn v-if="isSignInPage"/>
                <SignUp v-else />
                <AppLoadingOverlay v-if="loading" />
            </div>
        </div>
    </div>
</template>

<script>
import SignIn from "@/View/SignInAndSignUp/SignIn/index.vue";
import SignUp from "@/View/SignInAndSignUp/SignUp/index.vue";
import {ROUTES} from "@/Constants/routes.js";

export default {
    name:"SignInAndSignUp",
    components: {SignUp, SignIn},
    data(){
        return{
            loading:false
        }
    },
    computed:{
        isSignInPage(){
            if(this.$route.path === ROUTES.SIGNIN ){
                return true
            }
        }

    }
}
</script>

<style lang="scss" scoped>
.container{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 120px 0px;
  max-height: 100vh;
}
.form-wrapper{
  border-radius: 24px;
  position: relative;
  min-height: 400px;
    background-color: $BEIGE;
    width: 100%;
    max-width: 700px;
  padding: 56px 64px;
}
</style>