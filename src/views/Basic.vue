<template>
    <div id="basic">
        <Header></Header>
        <div class="flexBox">
            <Aside></Aside>
            <!-- 主体内容 -->
            <div class="flexItem">
                <div class="main">
                <div class="breadcrumbStyle">
                    {{$route.meta || '系统基本情况'}}
                </div>
                <div class="mainBox">
                    <router-view/>
                </div>
                </div>
                <!-- 尾部 -->
                <Footer></Footer>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import Aside from '../components/Aside'
export default {
    components:{Header,Footer,Aside},
    data(){
        return{
            test:1//页面所有的数据写在这里
        }
    },
    methods:{
    },
    mounted(){
        
    }
}
</script>

<style lang="less">
#basic{
  height: 100%;
}
html,body{
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #E8ECF0;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
} 
.flexBox{
  display: flex;
  height: calc(100% - 50px)
}
.flexItem{
  flex: 1;
  overflow: scroll;
}
.main{
  min-height: 550px;
  position: relative;
  width: 100%;
}
*{
  margin: 0;
  padding: 0;
}
.breadcrumbStyle{
  background-color: #ffffff;
  font-size:13px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(102,102,102,1);
  line-height:20px;
  padding: 15px 20px;
  box-shadow:0px 1px 3px 0px rgba(0,0,0,0.05);
  // position: absolute;
  // width: 100%;
}
.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link{
   color:rgba(102,102,102,1);
   font-weight:normal; 
}
.mainBox{
  padding: 20px 15px 0 20px;
}
</style>

