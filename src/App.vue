<template>
    <router-view></router-view>
</template>

<script>
import {store} from "@/Store/index.js";
import {ROUTES} from "@/Constants/routes.js";

export default {
    watch:{
      authorization(newVal,oldVal){
          if(newVal===true){
              this.$router.push(ROUTES.SIGNIN)
          }
      }
    },
    computed:{
        authorization(){
            return store.unAuthorized
        }
    }

}
</script>

<style lang="scss" scoped>

</style>