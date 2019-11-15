<template>
  <div>
    <!-- 筛选数据区域 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <!-- 筛选数据卡片内容 -->
      <el-form label-width="80px">
        <el-form-item label="文章状态">
          <el-radio-group v-model="filterForm.status">
            <el-radio :label="3">全部</el-radio>
            <el-radio :label="6">草稿</el-radio>
            <el-radio :label="9">待审核</el-radio>
            <el-radio :label="6">审核通过</el-radio>
            <el-radio :label="9">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表">
          <el-select placeholder="请选择频道" v-model="filterForm.channel_id">
            <el-option label="区域一" value=""></el-option>
            <el-option label="区域二" value=""></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <div class="block">
            <el-date-picker
            v-model="filterForm.channel_id"
              type="rangeDate"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共找到59898条符合条件的内容</span>
      </div>
      <!-- 文章列表 -->
      <div>
        <!-- 当el-table元素中注入data对象数组后，在el-table-column中用prop属性来对应对象中的键名即可填入
        数据，用label属性来定义表格的列名。可以使用width属性来定义列宽。 -->
        <el-table :data='articles' style="width: 100%">
          <el-table-column prop="date" label="封面" width="180"></el-table-column>
          <el-table-column prop="name" label="标题" width="180"></el-table-column>
          <el-table-column prop="address" label="状态"></el-table-column>
          <el-table-column prop="name" label="发布日期" width="180"></el-table-column>
          <el-table-column prop="address" label="操作"></el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'articles',
  data () {
    return {
      // 过滤数据的表单
      filterForm: {
        // 文章状态
        status: '',
        // 频道ID
        channel_id: '',
        // 起始时间
        begin_pubdate: '',
        // 结束时间
        end_pubdate: ''
      },
      // 日期区间范围
      rangeDate: {
      },
      // 文章列表
      articles: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    // 调用接口，获取后台文章列表数据
    loadArticles () {
      // 获取token值，判断身份
      const token = window.localStorage.getItem('user-token')
      this.$axios({
        method: 'GET',
        url: '/articles',
        header: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        console.log(res)
        this.articles = res.data.data
      }).catch(res => {})
    }
  }
}
</script>

<style>
</style>
