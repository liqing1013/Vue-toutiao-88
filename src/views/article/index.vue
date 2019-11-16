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
          <!--
            单选框组会把选中的radio 的label同步给绑定的数据
          -->
          <el-radio-group v-model="filterForm.status">
            <!-- 处理绑定表单中文章状态的单选框组，label -->
            <el-radio :label="null">全部</el-radio>
            <el-radio label="0">草稿</el-radio>
            <el-radio label="1">待审核</el-radio>
            <el-radio label="2">审核通过</el-radio>
            <el-radio label="3">审核失败</el-radio>
            <el-radio label="4">已刪除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表">
          <!-- 下拉列表会把选中的数据 -->
          <el-select placeholder="请选择频道" v-model="filterForm.channel_id">
            <el-option label="所有频道" :value="null"></el-option>
            <el-option
              v-for="channel in channels"
              :label="channel.name"
              :value="channel.id"
              :key="channel.id"
            ></el-option>
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
              value-format="yyyy-MM-dd"
            ></el-date-picker>
            <!-- value-format绑定指日期绑定格式，不绑定是日期对象的形式 -->
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadArticles(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 文章列表 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- <span>共找到59898条符合条件的内容</span> -->
        <span>共找到{{ totalCount }}条符合条件的内容</span>
      </div>
      <div>
        <!-- 当el-table 表格组件
              data 有表格内容的数组，要求是数组
              el-table表格组件会使用data数据，在内部自己进行遍历，我们不需要自己在v-for循环
        -->
        <!-- el-table-column表格列组件，
              prop用来指定渲染哪个数据字段
        -->
        <el-table v-loading="loading" :data="articles" style="width: 100%">
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
            <el-row slot-scope="scope">
              <!--  -->
              <el-button type="primary" icon="el-icon-edit" circle >编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" circle @click="onDelete(scope.row.id)">删除</el-button>
            </el-row>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <!-- 页面分页 -->
    <!-- loading状态时，页码禁用，disabled控制页码的使用状态 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalCount"
      @current-change="onPageChange"
      :disabled="loading"
    ></el-pagination>
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
        status: null,
        // 频道ID
        channel_id: null
        // // 起始时间
        // begin_pubdate: '',
        // // 结束时间
        // end_pubdate: ''
      },
      // 日期区间范围
      rangeDate: [],
      // 文章列表
      articles: [],
      // 审核状态样式
      Articlestatus: [
        {
          type: '',
          label: '草稿'
        },
        {
          type: 'warning',
          label: '待审核'
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
          label: '已刪除'
        }
      ],
      // 总记录数
      totalCount: 0,
      // 表格loding状态
      loading: true,
      // 频道列表
      channels: [],
      // 记录当前页码
      inpage: 1
    }
  },
  // 初始化加载时加载第一页
  created () {
    this.loadArticles(1)

    // 加载频道列表
    this.loadChannels()
  },
  methods: {
    // 调用接口，获取后台文章列表数据
    // page如果没传，就默认是1
    loadArticles (page = 1) {
      // 页面渲染时loading为true，运行
      this.loading = true
      // 获取token值，判断身份
      const token = window.localStorage.getItem('user-token')
      this.$axios({
        method: 'GET',
        url: '/articles',
        headers: {
          // 添加请求头
          // 名字：值
          // 后端要求把token放到请求头中，
          // Authorization: `Bearer ${token}`
          Authorization: `Bearer ${token}`
        },
        // Query参数使用params传递
        params: {
          // 页码
          page,
          // 每页几条
          per_page: 10,
          // axios有个功能，当参数为null,undefined时，请求就不发送了
          status: this.filterForm.status, // 文章状态
          // channel_id, // 文章状态
          // begin_pubdate, // 开始时间
          // end_pubdate// 结束时间
          // 点击查询时，调用loadArticles这个函数
          channel_id: this.filterForm.channel_id,
          // 手动判断数据是否有效，是因为当用户手动清除时，数据被充值为null，因为
          // 因为数组为null时，选取null[索引]会报错，
          begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
          end_pubdate: this.rangeDate ? this.rangeDate[1] : null
        }
      })
        .then(res => {
          // console.log(res)
          // 跟新文章列表
          this.articles = res.data.data.results
          // 更新文章记录总数
          this.totalCount = res.data.data.total_count
        })
        .catch(res => {
          console.log(res, '获取数据失败')
        })
        .finally(() => {
          // 无论成功还是失败，最终都要执行
          this.loading = false
        })
    },
    // 页码改变时调用此函数
    onPageChange (page) {
      this.inpage = page
      // 请求加载指定页码的文章列表
      this.loadArticles(page)
    },
    // 获取服务器频道数据
    loadChannels () {
      // 有些接口不需要token
      this.$axios({
        method: 'GET',
        url: '/channels'
      })
        .then(res => {
          // console.log(res)
          this.channels = res.data.data.channels
        })
        .catch(res => {
          console.log(res)
        })
    },
    // 删除文章
    onDelete (articleId) {
      const token = window.localStorage.getItem('user-token')
      this.$axios({
        method: 'DELETE',
        url: `/articles/${articleId}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        console.log(res)
        this.loadArticles(this.inpage)
      }).catch(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style>
</style>
