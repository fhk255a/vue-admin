<template>
  <div class="joker-page-page">
    <!-- 组件栏 -->
    <div class="h5-components-menu">
      <div class="h5-menu-title">
        组件库 
      </div>
      {{currentTools.id}}
      <ul class="h5-menu-ul" >
        <li class="h5-menu-li" v-for="(item,index) in pageConfig" 
          :key="item.type" 
          @click.stop="addComponent(item,index)">
          <span class="color-blue">{{item.title}}</span>
        </li>
      </ul>
    </div>
    <!-- 手机展示区 -->
    <div class="h5-phone">
      <div class="h5-phone-layout">
        <div ref="h5-phone-container" class="h5-container">
          <div class="h5-phone-container" ref="container" @mousedown.stop="stopClick" >
            <div :class="['h5-phone-item',componentIndex==index?'active':'']" 
              @click.stop="changeCurrentComponent(item,index)" 
              :ref="'h5-item-'+index" 
              v-for="(item,index) in currentComponent" 
              :key="item.id">
              <div class="item-bottom-tools" v-if="componentIndex==index">
                <Popover :show="show" @yes="sureDelete" @no="show=false"></Popover>
                <span @click.stop="deleteItem(index)" class="iconfont icon-shanchu"></span>
                <span v-if="index!=0" @click="topItem(index)" class="iconfont icon-jiantoushangsheng"></span>
                <span v-if="currentComponent.length-1!=index" @click="bottomItem(index)" class="iconfont icon-jiantouxiajiang"></span>
              </div>
              <component v-bind:is="componentsMenu[item.type]" :data="item"></component>
              <div :key="item.id" 
                :class="['center-title',componentIndex==index?'title-active':'']"
              >{{item.title}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 工具 -->
    <div class="h5-tools">
      <div class="tools-container">
        <div class="page-info" v-if="componentIndex==null">
          <Card title="页面信息">
            <div class="joker-form">
              <Item title="页面ID(随机生成)：">{{pageInfo.id}}</Item>
              <Item title="页面状态：">
                <el-switch v-model="pageInfo.status"></el-switch>
              </Item>
              <Item title="页面链接：">{{pageInfo.link}}</Item>
              <Item title="页面名称：">
                <el-input v-model="pageInfo.name" @change="changeInput()"/>
              </Item>
              <Item title="备注：">
                <el-input type="textarea" style="width:300px" :autosize="{ minRows: 3,maxRows:10}" v-model="pageInfo.remark" @change="changeInput()"/>
              </Item>
            </div>
          </Card>
        </div>
        <div class="tools-item" @mousedown.stop="stopClick" v-show="componentIndex!=null">
          <!-- 当前组件ID -->
          <keep-alive>
            <component 
              :class="currentTools.id"
              :component="currentTools"
              @update="update"
              v-bind:is="toolsMenu[currentTools.type]" 
            ></component>
          </keep-alive>
        </div>
      </div>
    </div>
    <div class="footer-btns">
      <el-button @click="save()" >保存</el-button>
    </div>
  </div>
</template>

<script>
import Index from './index.js';
export default Index;
</script>