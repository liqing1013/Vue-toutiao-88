<template>
  <div>
    <!-- 布局 -->
    <el-container>
      <!-- 左侧布局 -->
      <el-aside>左</el-aside>
      <!-- 右侧大容器 -->
      <el-container>
        <!-- 头部 -->
        <el-header>头</el-header>
        <!-- 下面主体-二级容器 -->
        <el-main>
          <!-- 二级路由容器 -->
          容器
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {}
</script>
