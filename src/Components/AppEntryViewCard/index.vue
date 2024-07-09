<template>
    <div class="view-card">
        <div class="image-area" >
            <img :src="data?.image">
        </div>
        <div>
            <p class="text-dark-purple medium-16">{{data?.title}}</p>
            <p class="text-grey medium-16">{{getTimeDifference(data?.createdAt)}}</p>
        </div>
        <div class="action-btns" >
            <v-btn v-if="data?.isEditEnabled" icon="mdi-pencil" size="x-small" color="primary" ></v-btn>
            <v-btn v-if="data?.isDeleteEnabled" icon="mdi-delete" size="x-small" color="primary" ></v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name:"AppEntryViewCard",
    props:{
        data:Object
    },
    methods:{
        getTimeDifference(utcTimeString){
            const now = new Date();
            const utcTime = new Date(utcTimeString);

            // Calculate the time difference in milliseconds
            const timeDifference = now - utcTime;

            // Define time units and their conversion factors
            const units = [
                { label: 'm', factor: 30 * 24 * 60 * 60 * 1000 },
                { label: 'w', factor: 7 * 24 * 60 * 60 * 1000 },
                { label: 'd', factor: 24 * 60 * 60 * 1000 },
                { label: 'h', factor: 60 * 60 * 1000 },
                { label: 'min', factor: 60 * 1000 },
                { label: 's', factor: 1000 },
            ];

            // Find the appropriate unit
            for (const unit of units) {
                if (timeDifference >= unit.factor) {
                    const count = Math.floor(timeDifference / unit.factor);
                    return `${count}${unit.label}`;
                }
            }

            return 'just now';
        }
    }
}
</script>

<style lang="scss" scoped>
.view-card{
    background-color: $BEIGE;

}
.image-area{
    overflow: clip;
    img{
        width: 100%;
    }
}
.action-btns{
    display: flex;
    gap:24px;
    margin-top: 12px;
}
@media screen and (max-width: $MOB_SCREEN) {
    .view-card{
        border-radius: 24px;
        padding: 12px 16px;
        width: 100%;
    }
    .image-area{
        border-radius: 20px;
        img{
            border-radius: 20px;
        }
    }
}

@media screen and (min-width: $TAB_MIN_SCREEN) {
    .view-card{
        border-radius: 24px;
        padding: 20px 24px;

    }
    .image-area{
        border-radius: 20px;
        img{
            border-radius: 20px;
        }
    }
}
@media screen and (min-width: 586px) {
    .view-card{
        max-width: 240px;
    }
}
@media screen and (max-width: 586px) {

}
</style>