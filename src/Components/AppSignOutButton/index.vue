<template>
    <v-btn @click="logout" color="red" append-icon="mdi-logout" >Sign out</v-btn>
</template>

<script>
import {store} from "@/Store/index.js";
import {ROUTES} from "@/Constants/routes.js";

export default {
    name:"AppSignOutButton",
    methods:{
        logout(){
                store.logout()
                this.$router.push(ROUTES.SIGNIN)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>