<template>
        <form @submit.prevent="uploadImage">
            <input type="file" @change="onFileChange" />
            <button type="submit">Upload</button>
        </form>
        <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" />
</template>

<script>
import {imgUpload} from "@/Services/Api/index.js";

export default {
    name:"AppImagePicker",
    data() {
        return {
            imageFile: null,
            imageUrl: null,
        };
    },
    methods: {
        onFileChange(event) {
            this.imageFile = event.target.files[0];
        },
        async uploadImage() {
            const formData = new FormData();
            formData.append('image', this.imageFile);

            imgUpload(formData).then((response)=>{
                this.imageUrl = response.data.imageUrl;
            })

            // try {
            //     const response = await axios.post('http://localhost:5000/upload', formData, {
            //         headers: {
            //             'Content-Type': 'multipart/form-data',
            //         },
            //     });
            //     this.imageUrl = response.data.imageUrl;
            // } catch (error) {
            //     console.error('Error uploading image:', error);
            // }
        },
    },
};
</script>
