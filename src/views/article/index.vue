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
            <el-option label="区域一" value></el-option>
            <el-option label="区域二" value></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <div class="block">
            <el-date-picker
              v-model="rangeDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 文章列表 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共找到59898条符合条件的内容</span>
      </div>
      <div>
        <!-- 当el-table 表格组件
              data 有表格内容的数组，要求是数组
              el-table表格组件会使用data数据，在内部自己进行遍历，我们不需要自己在v-for循环
        -->
        <!-- el-table-column表格列组件，
              prop用来指定渲染哪个数据字段
        -->
        <el-table :data="articles" style="width: 100%">
          <el-table-column prop="date" label="封面" width="180">
            <!-- 自定义表格列
              在template上声明 slot-scope='scope',然后就可以通过scope.row获取遍历项
            -->
            <!-- <template slot-scope='scope'>
              <img :src="scope.row.cover.images[0]" alt="">
            </template>-->
            <template slot-scope="scope">
              <img width="70" :src="scope.row.cover.images[0]" />
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题" width="180"></el-table-column>
          <el-table-column prop="status" label="状态">
            <!-- 自定义表格列 -->
            <template slot-scope="scope">
              <!-- <span>{{ Articlestatus[scope.row.status].label }}</span> -->
              <el-tag
                :type="Articlestatus[scope.row.status].type"
              >{{ Articlestatus[scope.row.status].label }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="pubdate" label="发布日期" width="180"></el-table-column>
          <el-table-column prop="address" label="操作">
            <el-row>
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
              <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </el-row>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  // 建议给每个组件都起一个名字，方便在浏览器调试台进行查看
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
      rangeDate: '',
      // 文章列表
      articles: [],
      Articlestatus: [
        {
          type: '',
          label: '待审核'
        },
        {
          type: 'warning',
          label: '草稿'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'danger',
          label: '审核失败'
        },
        {
          type: 'info',
          label: '已删除'
        }
      ]
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
      console.log('令牌', token)
      this.$axios({
        method: 'GET',
        url: '/articles',
        headers: {
          // 添加请求头
          // 名字：值
          // 后端要求把token放到请求头中，
          // Authorization: `Bearer ${token}`
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          console.log(res)
          this.articles = res.data.data.results
        })
        .catch(res => {
          console.log(res, '获取数据失败')
        })
    }
  }
}
</script>

<style>
</style>
