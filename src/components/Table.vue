<template>
  <div class="joker-component-table">
    <el-table :data="tableList">
      <el-table-column v-for="item in config" :label="item.label" :prop="item.value" :width="item.width" :key="item.label">
        <template slot-scope="tableItem">
          <template v-if="item.set">
            <!-- 回调给设置了set的 :scope="tableItem.row" -->
            <a class="j-table-func" @click="setItem(tableItem.row)">
              <slot :scope="tableItem.row" :name="item.value" />
            </a>
          </template>
          <!-- 默认情况直接展示值就好了 -->
          <template v-else>
            {{tableItem.row[item.value]}}
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props:{
    tableList:{
      type:Array,
      default:()=>[]
    },
    config:{
      type:Array,
      default:()=>[]
    }
  },
  methods:{
    // 只管输出当前操作的行
    setItem(item){
      this.$emit('get',item);
    },
  }
}
</script>

<style lang="scss">
  .j-table-func{
    display: inline-block;
  }
</style>