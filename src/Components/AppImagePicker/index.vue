<template>
    <div class="image-picker">
        <div class="left-side">
            <div class="image-selctor">
                <input
                    id="upload-photo"
                    type="file"
                    @change="onFileChange"
                    accept="image/*"
                />
                <label class="upload-label" for="upload-photo">
                    <p class="medium-16 text-dark-purple" >{{imageUrl ? "Change Image" :"Choose Image"}}</p>
                </label>
            </div>
            <div class="img-preview" v-if="imageUrl">
                <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image"/>
            </div>
        </div>
        <p class="text-red medium-16" v-if="errorMessage" >{{errorMessage}}</p>
        <div class="right-side">
            <div class="title-input-box" >
                <v-text-field variant="underlined" label="Title" v-model="title">
                </v-text-field>
            </div>
            <v-btn color="primary" @click="uploadImage">Upload</v-btn>
        </div>
        <AppLoadingOverlay v-if="loading" />
    </div>
</template>

<script>
import {imgUpload} from "@/Services/Api/index.js";

export default {
    name: "AppImagePicker",
    data() {
        return {
            imageFile: null,
            imageUrl: null,
            title:"",
            loading:false,
            errorMessage:""
        };
    },
    methods: {
        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.imageFile = file;
                this.imageUrl = URL.createObjectURL(file);
            }
        },
        async uploadImage() {
            if(this.imageUrl){
                this.errorMessage = ""
                this.loading = true
                const formData = new FormData();
                formData.append('image', this.imageFile);
                if(this.title){
                    formData.append('title', this.title);
                }
                imgUpload(formData).then((response) => {
                    this.loading = false
                    this.imageUrl = null;
                    this.title = ""
                    this.$emit("getData")
                }).catch((err)=>{
                    this.loading = false
                })
            }else{
                this.errorMessage = "Choose an Image to continue"
            }

        },
    },
    beforeUnmount() {
        if (this.imageUrl) {
            URL.revokeObjectURL(this.imageUrl);

        }
    }
};
</script>
<style lang="scss" scoped>
.image-picker{
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-between;
    .left-side{
        display: flex;
        align-items: center;
    }
}

.img-preview {
  width: 200px;

  img {
    width: 100%;
  }
}

#upload-photo {
  opacity: 0;
  position: absolute;
}
.upload-label{
 cursor: pointer;
}
@media screen and (max-width: $MOB_SCREEN) {
    .image-picker{

        flex-wrap: wrap;
        .left-side{
            width: 100%;
        }
    }
    .title-input-box{
        width: 100%;
    }
    .right-side{
        width: 100%;
    }
}
@media screen and (min-width: $TAB_MIN_SCREEN) {
    .image-picker{

        .left-side{
            gap:32px;
            width: 40%;
        }
    }
    .title-input-box{
        width: 250px;
    }
    .right-side{
        display: flex;
        gap:25px;
        align-items: center;
    }
}
</style>
