<template>
    <div class="header">
        <div class="header-logo pointer">
            <!-- 暂时删除img外部的链接 -->
            <!-- <router-link class="routerLink center" to="/home">
                <img src="../../assets/img/logo2.jpeg" />
            </router-link> -->
            <img src="../../assets/img/logo2.jpeg" />
            <router-link class="routerLink center align-left" to="/home">
                <h2 class="menu-item">毕业生就业调查</h2>
            </router-link>
            <!-- <router-link class="routerLink" to="/home">
                <img src="../../assets/img/logo.png" />
            </router-link> -->
        </div>
        <div class="header-menu">
            <!-- <div class="menu-item pointer center" v-if="false">
                <el-dropdown @command="switchLanguage">
                    <span>
                        {{ language }}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" style="min-width: auto">
                        <el-dropdown-item command="简体中文">简体中文</el-dropdown-item>
                        <el-dropdown-item command="English">English</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div> -->
            <div class="menu-item pointer center">
                <!-- <Signin v-if="true"></Signin> -->
                <Avatar v-bind:userName="userName"></Avatar>
            </div>
        </div>
    </div>
</template>

<script>
import Signin from './Signin';
import Avatar from './Avatar';

export default {
    name: 'Header',
    data() {
        return {
            userName: 'YoYo',
            language: 'English'
        };
    },
    components: {
        Signin,
        Avatar
    },
    methods: {
        switchLanguage: function (item) {
            this.language = item;
        }
    }
};
</script>

<style lang="scss" scoped>
.header {
    width: 100%;
    min-width: 800px;
    height: 80px;
    border-bottom: 2px solid #53a4f4;
    padding: 5px 40px;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
}
.header-logo {
    display: flex;
    justify-content: start;
}
.header-logo img {
    height: 100%;
}
.header-menu {
    display: flex;
    justify-content: flex-end;
}
.menu-item {
    margin: 0 8px 0 3px;
}
</style>
