<template>
    <div class="wrapper">
        <div class="container" >
            <v-btn @click="logout" color="red" prepend-icon="mdi-logout" >Sign out</v-btn>
            <div class="top-section" >
                <AppImagePicker @getData="getData"/>
            </div>
            <div class="image-view-section" >
                <AppEntryViewCard v-if="list.length > 0" v-for="(item,index) in list" :key="index" :data="item"></AppEntryViewCard>
                <p v-else class="text-black medium-16" >No Entries Found.</p>
            </div>
        </div>
    </div>
</template>

<script>
import  {store} from "@/Store/index.js";
import {ROUTES} from "@/Constants/routes.js";
import {getUserImages} from "@/Services/Api/index.js";

export default {
    name:"Home",
    data(){
        return{
            list:[]
        }
    },
    methods:{
        getData(){
                getUserImages().then((response)=>{
                    console.log("response", response)
                    this.list = response?.data
                }).catch((err)=>{
                    if(err.code === 400){
                        this.$router.push(ROUTES.ADMIN)
                    }
                })
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
.top-section, .image-view-section{
    border-radius: 24px;
    border: 1px solid $GREY_BG;
}
.image-view-section{
    display: flex;
    gap:24px;
    flex-wrap: wrap;
}

@media screen and (max-width: $MOB_SCREEN) {
    .top-section{
        margin-top: 16px;
    }
    .top-section, .image-view-section{
        padding: 32px 24px;
    }
    .image-view-section{
        margin-top: 24px;
    }
}
@media screen and (min-width: $TAB_MIN_SCREEN) {
    .top-section{
        margin-top: 32px;
    }
    .top-section, .image-view-section{
        padding: 46px 32px;
    }
    .image-view-section{
        margin-top: 36px;
    }
}
</style>