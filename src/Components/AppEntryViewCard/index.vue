<template>
    <div class="view-card">
        <div v-if="editable">
            <label for="edit-photo">
                <div class="image-area editable-image">
                    <img v-if="imageUrl" :src="imageUrl">
                    <img v-else :src="data?.image">
                    <div class="overlay">
                        <p class="text-white">Change</p>
                    </div>
                </div>
            </label>
            <input
                    id="edit-photo"
                    type="file"
                    @change="onFileChange"
                    accept="image/*"
            />
        </div>
        <div class="image-area" v-else>
            <img :src="data?.image">
        </div>
        <div>
            <v-text-field v-if="editable" variant="underlined" v-model="title" label=""></v-text-field>
            <p v-else class="text-dark-purple medium-16">{{ data?.title }}</p>
            <p class="text-grey medium-16">{{ getTimeDifference(data?.createdAt) }}</p>
        </div>
        <div class="action-btns">
            <v-btn v-if="data?.isEditEnabled" @click="handlePrimary" :icon="editable ? 'mdi-check-bold' : 'mdi-pencil'"
                   size="x-small" color="primary"></v-btn>
            <v-btn v-if="editable" @click="cancelEdit" icon="mdi-cancel" size="x-small" color="primary"></v-btn>
            <v-btn v-if="data?.isDeleteEnabled" @click="handleDelete" icon="mdi-delete" size="x-small"
                   color="red"></v-btn>
        </div>
        <AppLoadingOverlay v-if="loading"/>
    </div>
</template>

<script>
import {deleteEntry, editEntry} from "@/Services/Api/index.js";

export default {
    name: "AppEntryViewCard",
    props: {
        data: Object
    },
    data() {
        return {
            editable: false,
            imageFile: null,
            imageUrl: null,
            title: this.data?.title,
            loading: false
        }
    },
    methods: {
        handlePrimary() {
            if (!this.editable) {
                this.editable = true
            } else {
                this.handleEdit()
            }
        },
        handleEdit() {
            const formData = new FormData();
            if (this.imageFile) {
                formData.append('image', this.imageFile);
            }
            if (this.title) {
                formData.append('title', this.title);
            }
            formData.append('id', this.data.id);
            this.loading = true
            editEntry(formData).then((response)=>{
                this.editable=false
                this.loading = false
                this.$emit("getData")
            }).catch((err)=>{
                this.editable=false
                this.loading = false
            })
        },
        cancelEdit() {
            this.editable = false
            this.imageUrl = null
            this.imageFile = null
            this.title = this.data?.title

        },
        handleDelete() {
            this.loading = true
            deleteEntry({id: this.data.id}).then((res) => {
                this.loading = false
                this.$emit("getData")
            })
        },
        getTimeDifference(utcTimeString) {
            const now = new Date();
            const utcTime = new Date(utcTimeString);

            // Calculate the time difference in milliseconds
            const timeDifference = now - utcTime;

            // Define time units and their conversion factors
            const units = [
                {label: 'm', factor: 30 * 24 * 60 * 60 * 1000},
                {label: 'w', factor: 7 * 24 * 60 * 60 * 1000},
                {label: 'd', factor: 24 * 60 * 60 * 1000},
                {label: 'h', factor: 60 * 60 * 1000},
                {label: 'min', factor: 60 * 1000},
                {label: 's', factor: 1000},
            ];

            // Find the appropriate unit
            for (const unit of units) {
                if (timeDifference >= unit.factor) {
                    const count = Math.floor(timeDifference / unit.factor);
                    return `${count}${unit.label}`;
                }
            }

            return 'just now';
        },
        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.imageFile = file;
                this.imageUrl = URL.createObjectURL(file);
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.view-card {
  background-color: $BEIGE;
  position: relative;

}

#edit-photo {
  position: absolute;
  opacity: 0;
}

.image-area {
  overflow: clip;

  img {
    width: 100%;
  }
}

.action-btns {
  display: flex;
  gap: 24px;
  margin-top: 12px;
}

.editable-image {
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: rgba(18, 18, 18, 0.4);

  p {
    font-weight: 600;
  }
}

@media screen and (max-width: $MOB_SCREEN) {
  .view-card {
    border-radius: 24px;
    padding: 12px 16px;
    width: 100%;
  }
  .image-area {
    border-radius: 20px;

    img {
      border-radius: 20px;
    }
  }
}

@media screen and (min-width: $TAB_MIN_SCREEN) {
  .view-card {
    border-radius: 24px;
    padding: 20px 24px;

  }
  .image-area {
    border-radius: 20px;

    img {
      border-radius: 20px;
    }
  }
}

@media screen and (min-width: 586px) {
  .view-card {
    max-width: 240px;
  }
}

@media screen and (max-width: 586px) {

}
</style>