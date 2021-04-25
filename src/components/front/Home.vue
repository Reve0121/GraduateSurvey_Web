<template>
    <div id="front" class="app-container flex">
        <Header></Header>
        <Survey />
    </div>
</template>

<script>
import Header from './Header';
import Survey from './survey/Survey';
export default {
    name: 'Home',
    data() {
        return {
            value: 0
        };
    },
    components: {
        Header,
        Survey
    }
};
</script>

<style lang="scss" scoped>
.app-container {
    width: 48vw;
    min-width: 48vw;
    // height: 100vh;
    flex-direction: column;
    margin: 0 auto;
}
.app-body {
    flex: 1;
}
</style>