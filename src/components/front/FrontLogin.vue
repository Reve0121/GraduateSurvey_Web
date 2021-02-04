<template>
    <Login :title="title" :loginPath="loginPath"/>
</template>

<script>
import Login from '@/components/page/Login';

export default {
    name: 'FrontLogin',
    components: {
        Login
    },
    data:function(){
        return {
            title:"毕业生就业情况调查",
            loginPath: "/home"
        }
    }
};
</script>