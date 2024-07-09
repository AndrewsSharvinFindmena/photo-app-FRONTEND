<template>
    <div class="user-info-card">
        <div class="email" >
            <p class="text-dark-purple medium-16" >{{data.email}}</p>
        </div>
        <div class="permissions" >
            <v-select v-model="viewAccess" label="View Access" class="access-select" variant="underlined" :items="accessList" ></v-select>
            <v-checkbox v-model="isEditEnabled" label="Enable edit" ></v-checkbox>
            <v-checkbox v-model="isDeleteEnabled" label="Enable delete" ></v-checkbox>
        </div>
        <AppLoadingOverlay v-if="loading" />
    </div>
</template>

<script>
import {editUser} from "@/Services/Api/index.js";

export default {
    name:"AppUserInfo",
    props:{
        data:Object
    },
    data(){
        return{
            accessList:[
                {
                    title:'View Uploaded',
                    value:1
                },
                {
                    title:'View All',
                    value:2
                },
                {
                    title:'Restrict View',
                    value:0
                }
            ],
            isEditEnabled:this.data?.isEditEnabled,
            isDeleteEnabled:this.data?.isDeleteEnabled,
            viewAccess:this.data?.viewAccess,
            loading:false
        }
    },
    watch:{
        viewAccess(newVal,oldVal){
            if(this.data?.viewAccess !== newVal){
                this.changeData("viewAccess",newVal)
            }
        },
        isDeleteEnabled(newVal,oldVal){
            if(this.data?.isDeleteEnabled !== newVal){
                console.log("changed ", newVal)
                this.changeData("isDeleteEnabled",newVal)
            }
        },
        isEditEnabled(newVal,oldVal){
            if(this.data?.isEditEnabled !== newVal){
                console.log("changed ", newVal)
                this.changeData("isEditEnabled",newVal)
            }
        }
    },
    methods:{
        changeData(key,value){
            this.loading = true
            editUser({
                email: this.data?.email,
                edited: {
                    [key]:value,
                }
            }).then((res)=>{
                this.loading= false
                this.$emit("handleChange")
            }).catch((err)=>{
                this.loading = false

                this.$emit("handleChange")
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.user-info-card{
    border-radius: 16px ;
    border: 1px solid $GREY_BG;
    padding: 20px 30px;
    margin-bottom: 16px;
    position: relative;
}

@media screen and (max-width:$TAB_MIN_SCREEN) {
    .access-select{
        width: 100%;
    }
    .permissions{
        display: flex;
        flex-flow: column;
        gap:16px;
    }
}
@media screen and (min-width:$TAB_MAX_SCREEN) {
    .access-select{
        width: 200px;
    }
    .permissions{
        gap:24px;
    }

.user-info-card , .permissions{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
}
</style>