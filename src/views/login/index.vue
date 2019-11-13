<template>
  <div class="login">
    <!-- 背景 -->
    <!-- 中间位置，element-ui -->
    <!-- 卡片组件 -->
    <el-card class="login-card">
      <!-- 卡片内容 -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- 表单容器 -->
      <el-form style="margin-top:10px">
        <!-- 表单域手机号 -->
        <el-form-item>
          <el-input></el-input>
        </el-form-item>
        <!-- 表单域验证码 -->
        <el-form-item>
          <!-- 验证码输入框 -->
          <el-input style="width:230px"></el-input>
          <!-- 获取验证码-朴素按钮 -->
          <el-button plain style="float:right">获取验证码</el-button>
        </el-form-item>
        <el-form-item>
          <!-- 勾选同意框 -->
          <el-checkbox>我已阅读并同意用户协议及条框</el-checkbox>
        </el-form-item>
        <el-form-item>
          <!-- 登录按钮 -->
          <el-button  style='width:100%' type='primary'>登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
// style的lang属性(less)
// style的scoped(在单组件全局作用域下，仅在当前html结构页面中有效，原理：给当前页的每个标签加了一个与其他单组件不同的data-v-xxx属性)
.login {
  background-image: url("../../assets/img/login_bg.jpg");
  height: 100vh; // 占整个屏幕的100倍
  background-size: cover; //铺满屏幕
  display: flex; // flex布局
  justify-content: center; // 水平居中
  align-items: center; //垂直居中
  .login-card {
    height: 330px;
    width: 400px;
    .title {
      text-align: center;
      img {
        height: 45px;
      }
    }
  }
}
</style>
