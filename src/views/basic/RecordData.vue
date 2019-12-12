<template>
  <div class="warnGroup">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="dialogFormVisible = true,title = '新增'">新增</el-button>
      </el-form-item>
    </el-form>

    <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form :model="form" label-width="120px" :rules="rules" ref="ruleForm">
        <el-form-item label="账户" prop="accountId">
          <el-select v-model="form.accountId" clearable>
            <el-option v-for="item in accountList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="token" prop="token">
          <el-input v-model="form.token" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="submitFun('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <div class="study-plan">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="序列"></el-table-column>
        <el-table-column prop="recordTypeStr" label="浏览类别"></el-table-column>
        <el-table-column prop="treatiseName" label="浏览文章"></el-table-column>
        <el-table-column prop="ipAddress" label="浏览IP"></el-table-column>
        <el-table-column prop="createTime" label="浏览时间"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="updateRow(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="margin: 10px 0;"
        @current-change="init"
        :current-page="tableSearch.page"
        :page-size="tableSearch.pageSize"
        :total="tableSearch.total"
        layout="total, prev, pager, next, jumper">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
    name: 'warnGroup',
    data(){
        return{
          tableSearch:{
            page: 1, pageSize: 10, total: 0
          },
          tableData: [],
          accountList: [],
          form: {
            id: null, name: '', accountId: null, token: ''
          },
          dialogFormVisible: false,
          title: '新增',
          rules: {
            accountId: [
              { required: true, message: '请选择账户', trigger: 'change' }
            ],
            token: [
              { required: true, message: '请输入Token', trigger: 'change' }
            ]
          }
        }
    },
    methods:{
      submitFun(formName){
        let url = this.title == '新增' ? '/blogLogRecord/add' : '/blogLogRecord/update';
        this.publicSubmit(formName, url, this.form);
      },
      initForm(){
        this.form = {id: null, accountId: null, token: ''};
      },
      init(currentPage){
        if(currentPage){
          this.tableSearch.page = currentPage;
        }else{
          this.tableSearch.page = 1;
        }
        this.$http('get','/blogLogRecord/list', this.tableSearch).then(res => {
          this.tableData = res.data.data;
          this.tableSearch.total = res.data.totalSize;
          this.tableSearch.page = res.data.page;
        });
      },
      updateRow(row){
        this.form = row;
        this.title = '修改'
        this.dialogFormVisible = true;
      },
      deleteRow(row){
        let url = '/blogLogRecord/del/'+row.id;
        this.publicDel(url);
      },
      handleClose(done){
        this.$confirm('确认关闭？')
          .then( () => {
            this.initForm();
            done();
          });
      },
      closeDialog(){
        this.initForm();
        this.dialogFormVisible = false;
      }
    },
    mounted(){
      this.init(1);
    }
}
</script>