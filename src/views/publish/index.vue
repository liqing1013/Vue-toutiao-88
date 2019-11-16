<template>
  <div>
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 表头：发表文章 -->
      <div slot="header" class="clearfix">
        <span>发表文章</span>
      </div>
      <!-- 发表文章填充内容 -->
      <el-form ref="form" :model="article" label-width="80px">
        <!-- 标题 -->
        <el-form-item label="标题" placeholder="文章名称">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <!-- 文章内容 -->
        <el-form-item label="内容">
          <!-- bidirectional data binding（双向数据绑定） -->
          <quill-editor v-model="article.content"
                        ref="myQuillEditor"
                        :options='{ editorOption }'
                        row=20
                        >
          </quill-editor>
        </el-form-item>
        <!-- 频道 -->
        <el-form-item label="频道">
          <el-select v-model="article.channel_id" placeholder="请选择">
            <el-option label="所有频道" :value="null"></el-option>
            <el-option
            :label="channel.name"
            :value="channel.name"
            v-for="channel in channels"
            :key='channel.id'
            ></el-option>
          </el-select>
        </el-form-item>
        <el-divider></el-divider>
        <!-- 发表/存入草稿 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">发表</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'publish',
  components: {
    quillEditor
  },
  created () {
    // 加载频道列表
    this.loadChannels()
  },
  data () {
    return {
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        // cover: '',//封面
        channel_id: null // 文章所属频道
      },
      // 符文本编辑器的配置对象
      editorOption: {},
      // 频道列表
      channels: []
    }
  },
  methods: {
    // 发布文章
    onSubmit () {
    },
    // 获取频道列表数据
    loadChannels () {
      this.$axios({
        mothod: 'GET',
        url: '/channels'
      }).then(res => {
        console.log(res)
        this.channels = res.data.data.channels
      })
    }
  }
}
</script>

<style>
</style>
