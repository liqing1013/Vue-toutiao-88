<template>
  <div>
    <!-- 头部组件 el-row布局 -->
    <el-row type="flex" justify="space-between">
      <!-- 左侧 -->
      <el-col :span="10" class="left">
        <i class="el-icon-s-fold"></i>
        <span>江苏传智播客教育科技股份有限公司</span>
      </el-col>
      <!-- 右侧 -->
      <el-col :span="3" class="right">
        <img style='height:35px;width:50px' src="../assets/img/2.jpeg" alt='' />
        <!-- 用户信息--下拉菜单 -->
        <el-dropdown trigger="click">
          <span>
            小青青
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu>
            <el-dropdown-item>账户信息</el-dropdown-item>
            <el-dropdown-item>git地址</el-dropdown-item>
            <!-- 如果想要给一个组件注册原生js事件，用vue给的修饰符.native -->
            <el-dropdown-item @click.native='onDelete'>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    onDelete () {
      this.$confirm('是否退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style lang='less' scoped>
.left {
  display: flex;
  align-items: center;
  i {
    font-size: 24px;
  }
  span {
    margin-left: 4px;
  }
}
.right {
  display: flex;
  align-items: center;
  img {
    border-radius: 10%;
    margin-right: 5px;
  }
}
</style>
