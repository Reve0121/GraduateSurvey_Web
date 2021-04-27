<template>
    <div id="app" :class="{ app_wrap: hasBgImg }">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
            hasBgImg: false
        };
    },
    created() {
        this.$bus.$on('setAppBgImg', (val) => {
            this.hasBgImg = val;
        });
    },
    beforeDestory() {
        this.$bus.$off('setAppBgImg');
    }
};
</script>
<style>
@import './assets/css/main.css';
@import './assets/css/color-dark.css'; /*深色主题*/
/*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
#app {
    background-color: #f0f0f0;
    overflow: scroll;
    overflow-x: hidden;
    /* height: 2146px !important; */
}
.app_wrap {
    background: url(./assets/login_bg.jpg) no-repeat;
    background-size: 100%;
    background-color: none;
    background-attachment: fixed;
}
</style>