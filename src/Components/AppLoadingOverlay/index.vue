<template>
    <div class="loading-overlay">
        <v-progress-circular
            :size="41" :width="5"
            color="primary"
            indeterminate
        ></v-progress-circular>
    </div>
</template>

<script>
export default {
    name:"AppLoadingOverlay"
}
</script>

<style lang="scss" scoped>
.loading-overlay{
    position: absolute;
    width: 100%;
    height: 100%;
    display:flex ;
    align-items: center;
    justify-content: center;
    top:0;
    left:0;
    background-color: rgba(255, 255, 255, 0.5); /* white with 50% transparency */
    z-index: 1;
}
</style>