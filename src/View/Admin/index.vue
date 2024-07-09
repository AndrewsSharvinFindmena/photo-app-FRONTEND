<template>
    <div class="wrapper">
        <div class="container" >
            <AppSignOutButton/>
            <div class="list-viewer" >
                <AppUserInfo @handleChange="getData" v-if="list.length >= 1" v-for="(item, index) in list" :data="item":key="index" />
                <p v-else class="text-black" >No Users</p>
            </div>
        </div>
    </div>
</template>

<script>
import {ROUTES} from "@/Constants/routes.js";
import {store} from "@/Store/index.js";
import {getUserInfo} from "@/Services/Api/index.js";

export default {
    name:"Admin",
    data(){
        return{
            list:[]
        }
    },
    methods:{
        getData(){
            console.log("getting data")
            getUserInfo().then((response)=>{
                this.list = response?.data
            }).catch((err)=>{
                if(err.code === 400){
                    this.$router.push(ROUTES.HOME)
                }
            })
        },
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
.list-viewer{
    margin-top: 32px;
}
</style>