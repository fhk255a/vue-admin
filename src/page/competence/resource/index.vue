<template>
  <div class="joker-page-role">
    <!-- <SearchForm :config="searchConfig" :header="header"></SearchForm> -->
    <Container>
      <!-- <Table :tableList="tableList" :config="tableConfig"></Table>
      <Page @changePage="changePage" :page="page"/> -->
    </Container>
    <!-- <Dialog :show="dialog.dialog"></Dialog> -->
  </div>
</template>

<script>
import SearchForm from '@/components/SearchForm';
import Container from '@/components/Container';
import Table from '@/components/Table';
import Page from '@/components/Page';
import Dialog from '@/components/Dialog';
import isPass from '@/lib/esss';
export default {
  mixins:[isPass],
  methods:{
    getData(){
      const resource = this.$store.state.competence.resource;
      console.log(resource)
    }
  },
  mounted(){
    this.getData();
  },
  data(){
    return{
    }
  },
  components:{
    SearchForm,
    Container,
    Page,
    Table,
    Dialog
  }
}
</script>

<style>

</style>