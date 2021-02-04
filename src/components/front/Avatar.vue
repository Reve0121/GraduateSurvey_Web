<template>
  <div class="menu-item pointer center">
    <el-dropdown class="fontsize-20">
      <i class="el-icon-user-solid">
        <i class="el-icon-caret-bottom"></i>
      </i>
      <el-dropdown-menu class="fontsize-16" slot="dropdown" style="min-width:auto;">
        <el-dropdown-item>
          <router-link class="routerLink" to="/home">{{ userName }}</router-link>
        </el-dropdown-item>
        <el-dropdown-item  v-for="(item,index) in dropdownList" :key="item.path + index">
          <router-link class="routerLink" :to="item.path">{{item.page}}</router-link>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  name: "Avatar",
  props: ["userName"],
  data() {
    return {
      dropdownList: [
        { page: "设置", path: "/settings/profile" },
        { page: "帮助", path: "/help" },
        { page: "退出", path: "/home" }
      ]
    };
  },
  methods: {
    setting(name) {
      console.log(name);
    }
  }
};
</script>
<style lang="scss" scoped>
.menu-item {
  margin: 0 8px 0 3px;
}
.el-dropdown-menu__item{
  font-size: 16px;
}
</style>
