<template>
    <div class="wrapper">
        <div class="container" >
            <v-btn @click="logout" color="red" prepend-icon="mdi-logout" >Sign out</v-btn>
            <div class="list-viewer" >

            </div>
        </div>
    </div>
</template>

<script>
import {ROUTES} from "@/Constants/routes.js";
import {store} from "@/Store/index.js";

export default {
    name:"Admin",
    data(){
        return{
            list:[]
        }
    },
    methods:{
        getData(){
            // getUserImages().then((response)=>{
            //     console.log("response", response)
            //     this.list = response?.data
            // }).catch((err)=>{
            //     if(err.code === 400){
            //         this.$router.push(ROUTES.ADMIN)
            //     }
            // })
        },
        logout(){
            store.logout()
            this.$router.push(ROUTES.SIGNIN)
        }
    },
    beforeMount() {
        const user = store.getUser()
        console.log("user",user)
        if(!user?.email){
            this.$router.push(ROUTES.SIGNIN)
        }else{
            this.getData()
        }
    }
}
</script>

<style lang="scss" scoped>
.container{
    padding-top: 50px;
}
</style>