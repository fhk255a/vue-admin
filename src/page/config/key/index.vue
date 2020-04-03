<template>
  <div class="joker-page-key">
    <Container title="SELECT">
      <div class="joker-form">
        <el-tag type='info' class="tag-item"
          @click="viewItem(item,index)"
          @close="handleClose(tag)"
          :effect="currentIndex==index?'dark':'plain'"
          v-for="(item,index) in tableList" :key="item.id">{{item.label}}</el-tag>
        <el-button class="button-new-tag" size="small" @click="create">+ 添加</el-button>
      </div>
    </Container>
    <div class="mb-20"/>
    <Container title="OPTIONS" class="container">
      <div class="right" v-show="currentData.item.id">
        <div class="joker-form key-form">
          <Item title="KEY">{{currentData.item.key}}</Item>
          <Item title="类型名称">{{currentData.item.label}}</Item>
          <Item title="状态">
            {{currentData.item.status?'开启':'禁用'}}
          </Item>
          <Item title="备注说明">{{currentData.item.node}}</Item>
          <Item title="创建时间">{{$toTime(currentData.item.createTime)}}</Item>
          <Item className="w100">
            <span class="icon-btn color-blue el-icon-edit-outline" @click="eidt"> 编辑</span>
          </Item>
        </div>
        <div class="mb-20"/>
        <el-table :data="currentData.children">
          <el-table-column label="名称">
            <template slot-scope="row">
              <el-input v-model="row.row.label" :ref="'name_'+row.$index"/>
            </template>
          </el-table-column>
          <el-table-column label="Value">
            <template slot-scope="row">
              <el-input v-model="row.row.value" :ref="'value_'+row.$index"/>
            </template>
          </el-table-column>
          <el-table-column label="说明">
            <template slot-scope="row">
              <el-input v-model="row.row.node"/>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="row">
              <el-switch v-model="row.row.status"/>
            </template>
          </el-table-column>
          <el-table-column label="排序" width="100px">
            <template slot-scope="row">
              <el-input type="number" v-model="row.row.sort"/>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="row">
              <span title="删除" @click="deleteItem(row.$index)" class="set-text color-red icon-btn">删除</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="mb-20"></div>
        <el-button @click="add">添加</el-button>
        <el-button @click="save" type="primary">保存</el-button>
      </div> 
      <div class="no-data" v-show="!currentData.item.id">请选择</div>
    </Container>
    <div class="mb-20"/>
    <Dialog :title="currentData.item.label" :show="dialog" @close="close">
      <div class="joker-form">
        <Item className="w100" title="KEY：">
          <el-input ref="config-key-input" v-if="!currentData.item.id" v-model="currentData.item.key"/>
          <span v-else>{{currentData.item.key}}</span>
        </Item>
        <Item className="w100" title="类型名称：">
          <el-input ref="config-name-input" v-model="currentData.item.label"/>
        </Item>
        <Item className="w100" title="备注说明：">
          <el-input v-model="currentData.item.node"/>
        </Item>
        <Item className="w100" title="启用状态：">
          <el-switch v-model="currentData.item.status"/>
        </Item>
        <Item>
          <el-button @click="submit">保存</el-button>
        </Item>
      </div>
    </Dialog>
  </div>
</template>

<script>
import Container from '@/components/Container';
import Card from '@/components/Card';
import Item from '@/components/Item';
import Dialog from '@/components/Dialog';
import {KEY} from '@/api/config';
import SearchForm from '@/components/SearchForm';
export default {
  components:{
    Container,
    SearchForm,
    Card,
    Dialog,
    Item
  },
  mounted(){
    this.getData();
  },
  methods:{
    search(form){
      this.header = form;
      this.getData();
    },
    close(){
      this.dialog = false;
    },
    getData(){
      this.$store.dispatch('loading',true);
      KEY.list(this.header).then(res=>{
        if(res.code==200){
          this.tableList = res.data;
        }else{
          this.notify(res.msg,'抱歉','error');
        }
      }).catch(err=>{
        this.$message.error(err);
      }).finally(()=>{
        this.$store.dispatch('loading',false);
      })
    },
    deleteItem(index){
      const ITEM = this.currentData.children[index];
      if(ITEM.id!=null){
        this.deleteIds.push(ITEM.id);
      }
      this.currentData.children.splice(index,1);
    },
    // 查看下线
    viewItem(item,index){
      this.currentIndex = index;
      this.currentData.item = {...item};
      this.deleteIds = [];
      this.$store.dispatch('loading',true);
      KEY.getItem(item.id).then(res=>{
        if(res.code==200){
          this.currentData.children = res.data;
        }else{
          this.notify(res.msg,'抱歉','error');
        }
      }).catch(err=>{
        this.$message.error(err);
      }).finally(()=>{
        this.$store.dispatch('loading',false);
      })
    },
    // 创建select
    create(){
      this.dialog = true;
      this.currentIndex = null;
      this.currentData.item={
        label:'',
        id:null,
        key:'',
        pid:0,
        node:'',
        status:true,
      };
    },
    // 添加options
    add(){
      this.currentData.children.push({
        id:null,
        pid:this.currentData.item.id,
        label:'',
        node:'',
        value:'',
        status:true,
        sort:0,
      })
    },
    submit(){
      delete this.currentData.item.createTime;
      if(this.currentData.item.key.trim() == ''){
        this.$message.error('key不能为空');
        this.$refs['config-key-input'].focus();
        return;
      }
      if(this.currentData.item.label.trim() == ''){
        this.$message.error('名称不能为空');
        this.$refs['config-name-input'].focus();
        return;
      }
      this.$store.dispatch('loading',true);
      if(this.currentData.item.id){
        KEY.update(this.currentData.item).then(res=>{
          if(res.code==200){
            this.notify(res.msg,'成功','success');
            this.close();
            this.getData();
          }else{
            this.notify(res.msg,'抱歉','error');
          }
        }).catch(err=>{
          this.$message.error(err);
        }).finally(()=>{
          this.$store.dispatch('loading',false);
        })
      }else{
        KEY.create(this.currentData.item).then(res=>{
          if(res.code==200){
            this.notify(res.msg,'成功','success');
            this.close();
            this.getData();
          }else{
            this.notify(res.msg,'抱歉','error');
          }
        }).catch(err=>{
          this.$message.error(err);
        }).finally(()=>{
          this.$store.dispatch('loading',false);
        })
      }
    },
    // 编辑
    eidt(){
      this.dialog = true;
    },
    // 保存
    save(){
      for(let i = 0 ; i < this.currentData.children.length; i++){
        const item = this.currentData.children[i];
        if(item.label.trim()==''){
          this.$refs['name_'+i].focus();
          this.$message.error('名称不能为空');
          return;
        }
      }
      KEY.updateItem(this.currentData.item.id,JSON.stringify(this.currentData.children),this.deleteIds.join(',')).then(res=>{
        if(res.code==200){
          this.notify('保存成功','','success');
          this.viewItem(this.currentData.item,this.currentIndex);
          this.deleteIds=[];
        }else{
          this.notify(res.msg,'抱歉','error');
        }
      }).catch(err=>{
        this.$message.error(err);
      }).finally(()=>{
        this.$store.dispatch('loading',false);
      })
    },
  },
  data(){
    return{
      dialog:false,
      tableList:[],
      currentIndex:null, // 选择的值
      currentData:{
        item:{
          label:'',
          id:null,
          key:'',
          node:'',
          status:true,
        },
        children:[],
      },
      deleteIds:[], // 删除的id
    }
  }
}
</script>

<style lang="scss">
.joker-page-key{
  .tag-item{
    cursor: pointer;
    margin-right: 10px;
  }
  .container{
    display: flex;
    >.left{
      width: 300px;
      margin-right: 10px;
      background: #fff;
      ul{
        color: #666;
        .left-li{
          padding: 10px 0;
          font-size: 16px;
          border-bottom: 1px solid #eee;
          box-sizing: border-box;
          cursor: pointer;
          &:last-child{
            border:none;
          }
          &:hover{
            color:#409EFF;
          }
          >.el-icon-view{
            float: right;
          }
        }
        .active{
          color:#409EFF;
        }
      }
    }
    >.right{
      flex:1;
      .key-form{
        .joker-form-item{
          min-width: 200px;
        }
      }
      .key-table{
        width: 100%;
        margin-top: 10px;
        border-top:1px solid #ddd;
        min-width: 600px;
        overflow-y: hidden;
        overflow-x: auto;
        .title-menu{
          font-weight: 600;
          background: #eee;
          padding: 10px;
        }
        .title{width: 30%;}
        .value{width: 15%;}
        .node{width: 20%;}
        .status{width: 10%;}
        .sort{width: 10%;}
        .set{width: 15%}
        .key-table-item{
          width: 100%;
          display: flex;
          margin: 10px 0;
          align-items: center;
          >span{
            margin:0 10px;
          }
        }
      }
    }
  }
}
</style>