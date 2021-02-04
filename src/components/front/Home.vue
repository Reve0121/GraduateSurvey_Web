<template>
  <div id="front" class="app-container flex">
    <Header></Header>
    <Menu v-bind:menus="menus"></Menu>
    <p>Home page</p>
    <el-rate v-model="value"></el-rate>
    <p>{{value}}</p>
  </div>
</template>

<script>
import Header from "./Header";
import Menu from "./Menu";

export default {
  name: "Home",
  data() {
    return {
      value: 0,
      menus: [
        {
          item: "News",
          path: "/home"
        },
        {
          item: "NBA",
          path: "/home"
        },
        {
          item: "Movies",
          path: "/movies"
        }
      ]
    };
  },
  components: {
    Menu,
    Header
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  width: 60vw;
  min-width: 60vw;
  height: 100vh;
  flex-direction: column;
  margin: auto;
}
.app-body {
  flex: 1;
}

</style>