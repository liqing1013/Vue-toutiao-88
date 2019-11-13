<template>
  <div>
    <!-- 布局 -->
    <el-container>
      <!-- 左侧布局 -->
      <el-aside class="left" style='width:220px'>
        <div style="background-color:#2e2f32" class="menu-title">
          <img src='../../assets/img/logo_admin.png' alt="" />
        </div>
        <!-- 左侧导航菜单 -->
        <el-menu style="width:221px" background-color="#353b4e" text-color="#adafb5" active-text-color="#ffd04b">
          <!-- 一级菜单 -->
          <el-menu-item>首页</el-menu-item>
          <!-- 二级菜单 -->
          <el-submenu>
            <template slot="title">内容管理</template>
            <el-menu-item>发布文章</el-menu-item>
            <el-menu-item>内容列表</el-menu-item>
            <el-menu-item>评论列表</el-menu-item>
            <el-menu-item>素材管理</el-menu-item>
          </el-submenu>
          <!-- 二级菜单 -->
          <el-submenu>
            <template slot="title">粉丝管理</template>
            <el-menu-item>图文数据</el-menu-item>
            <el-menu-item>粉丝概况</el-menu-item>
            <el-menu-item>粉丝画像</el-menu-item>
            <el-menu-item>粉丝列表</el-menu-item>
          </el-submenu>
          <!-- 一级菜单 -->
          <el-menu-item>账户信息</el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧大容器 -->
      <el-container>
        <!-- 头部 -->
        <el-header>
          <layoutHeader></layoutHeader>
        </el-header>
        <!-- 下面主体-二级容器 -->
        <el-main>
          <!-- 二级路由容器 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import layoutHeader from '../../components/layout-header'
export default {
  components: {
    layoutHeader
  }
}
</script>
<style lang="less" scoped>
.left {
  background-color: #353b4e;
  overflow: hidden;
  height: 100vh;
  .menu-title {
    padding: 15px 0;
    text-align: center;
  }
}
</style>
