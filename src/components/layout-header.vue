<template>
  <div>
    <!-- 头部组件 el-row布局 -->
    <el-row type='flex' justify="space-between">
      <!-- 左侧 -->
      <el-col :span='10' class='left'>
        <i class="el-icon-s-fold"></i>
        <span>江苏传智播客教育科技股份有限公司</span>
      </el-col>
      <!-- 右侧 -->
      <el-col :span='2' class="right">
        <img src="../assets/img/avatar.jpg" alt />
        <!-- 用户信息--下拉菜单 -->
        <el-dropdown trigger="click">
          <span>小青青</span>
          <el-dropdown-menu>
            <el-dropdown-item>账户信息</el-dropdown-item>
            <el-dropdown-item>git地址</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.left{
    display:flex;
    align-items: center;
    i{
        font-size: 24px;
    }
    span{
        margin-left: 4px;
    }
}
.right{
    img{
        border-radius: 50%;
        margin-right: 5px;
    }
}
</style>
