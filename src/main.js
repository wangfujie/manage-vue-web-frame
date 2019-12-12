import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import moment from 'moment';
import 'element-ui/lib/theme-chalk/index.css';
import { iHttp } from "./util/request";

Vue.prototype.$http = iHttp;
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$moment = moment;

/**
 * 公共提交表单方法
 */
Vue.prototype.publicSubmit = function(formName, url, formData){
  this.$refs[formName].validate((valid) => {
    if (valid) {
      this.$http('post', url, formData).then(res => {
        if(res.data.code == 200){
          this.dialogFormVisible = false;
          //重置表单
          this.$refs[formName].resetFields();
          this.initForm();
          this.$message({
            message: res.data.msg, type: 'success'
          });
        }else{
          this.$message.error(res.data.msg);
        }
        //初始化列表数据
        this.init();
      });
    } else {
      return false;
    }
  });
}

/**
 * 公共删除方法
 */
Vue.prototype.publicDel = function(url){
  this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', { 
    confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
  }).then(() => {
    this.$http('get', url).then(res => {
      if(res.data.code == 200){
        this.$message({ type: 'success', message: '删除成功!' });
        this.init();
      }else{
        this.$message({ type: 'error', message: res.data.msg });
      }
    });
  }).catch(() => {
    this.$message({ type: 'info', message: '已取消删除' });          
  });
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
