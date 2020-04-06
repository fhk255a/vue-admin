<template>
  <div class="joker-page-components">
    <Card color="#8fb9af" title="[ Card ] - 区块">
      <Card>
        <ul>
          <li style="padding:10px">color:[区块颜色]</li>
          <li style="padding:10px">title:[默认标题]</li>
          <li style="padding:10px">slot:[自定义组件内容]</li>
          <li style="padding:10px">slot-right:[标题右边按钮]</li>
        </ul>
        <div style="padding:10px">
          slot = 这是Card的内容
        </div>
      </Card>
    </Card>
    <Card color="#8fb9af" title="[ SearchForm ] - 搜索头部">
      <ul>
        <li style="padding:10px">select:[下拉框]</li>
        <li style="padding:10px">input:[输入框]</li>
        <li style="padding:10px">input-number:[数字输入框]</li>
        <li style="padding:10px">textarea:[长输入框]</li>
      </ul>
      <SearchForm :config="searchConfig" :header="header"></SearchForm>
    </Card>
    <Card color="#8fb9af" title="[ Dialog ] - 弹出框">
      <el-button @click="dialog=!dialog">开启Dialog</el-button>
      <Dialog :show="dialog" @close="dialog=false">
        你点击了Dialog 当前状态是【{{dialog}}】
      </Dialog>
    </Card>
    <Card color="#8fb9af" title="[ Editor ] - 富文本编辑器">
      <div v-html="content"></div>
      <div class="mb-20"></div>
      <Editor :content="content" @update="updateContent"/>
    </Card>
    <Card color="#8fb9af" title="[ Item ] - 表单子控件">
      <div class="joker-form">
        <Item title="标题">
          <el-input />
        </Item>
        <Item title="ID">
          <el-input/>
        </Item>
      </div>
    </Card>
    <Card color="#8fb9af" title="[ Medias ] - 媒体库">
      <Medias @submit="submit"></Medias>
      <div class="mb-20"></div>
      你选择了 <span>{{image}}</span>
      <img :src="image" alt="">
    </Card>
    <Card color="#8fb9af" title="[ Page ] - 分页">
      <Page :page="page" @changePage="changePage"/>
    </Card>
    <Card color="#8fb9af" title="[ Table ] - 表格">
      <Table :tableList="tableList" :config="tableConfig"></Table>
    </Card>
    <Card color="#8fb9af" title="[ Upload ] - 上传控件">
      <Upload></Upload>
    </Card>
    <Card color="#8fb9af" title="[ Container ] - 页面容器">
      <Container title="Container">
        主要用来包裹一个页面
        主要用slot组件
      </Container>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Card'
import SearchForm from '@/components/SearchForm'
import Dialog from '@/components/Dialog'
import Container from '@/components/Container'
import Item from '@/components/Item'
import Page from '@/components/Page'
import Editor from '@/components/Editor'
import Table from '@/components/Table'
import Medias from '@/components/Medias'
import Upload from '@/components/Upload'
export default {
  components:{
    Card,SearchForm,Dialog,Item,Page,Editor,Table,Medias,Container,Upload
  },
  methods: {
    updateContent(html){
      this.content=html;
    },
    submit(img){
      console.log(img)
      this.image = img;
    },
    changePage(page){
      this.page = page;
      this.notify(`<ul>
        <li>当前是第<i class="color-blue">${page.current}</i>页</li>
        <li>每页是<i class="color-blue">${page.size}</i>条数据</li>
      </ul>`)
    }
  },
  data(){
    return{
      searchConfig:[
        {
          type:'input',
          label:'输入框',
          key:'name'
        },
        {
          type:'input',
          inputType:'number',
          label:'数字输入框',
          key:'number'
        },
        {
          type:'select',
          label:'下拉框',
          key:'select',
          data:[
            {
              label:'option 1',
              value:'1'
            },
            {
              label:'option 2',
              value:'2'
            },
          ]
        },
        {
          type:'textarea',
          label:'长输入框',
          key:'text',
        },
      ],
      header:{
        name:'',
        number:'',
        select:'',
        text:''
      },
      dialog:false,
      content:'',
      image:'',
      page:{
        current:1,
        size:10,
        total:50
      },
      tableConfig:[
        {
          label:'ID',
          value:'id'
        },
        {
          label:'名称',
          value:'name'
        },
        {
          label:'性别',
          value:'sex'
        },
      ],
      tableList:[
        {
          id:10000,
          name:'Joker',
          sex:'男'
        },
        {
          id:10001,
          name:'Admin',
          sex:'男'
        },
      ]
    }
  }
}
</script>

<style lang="scss">
.joker-page-components{
  >.joker-component-card{
    margin-bottom: 20px;
    .ql-editor{
      height: 200px;
    }
  }
}
</style>