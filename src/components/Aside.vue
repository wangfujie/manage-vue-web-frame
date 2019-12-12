<template>
    <div id="aside" :style="isCollapse?'width:70px':'200px'">
        <div class="sysName" v-if="!isCollapse">管理菜单</div>
        <el-menu
        router
        :default-active="active"
        class="el-menu-vertical-demo"
        background-color="#352c2c"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        >
            <el-submenu index="1">
                <template slot="title">
                    <i class="iconfont el-icon-tickets"></i>
                    <span>数据相关</span>
                </template>
                <el-menu-item :index="'/basic/recordData.html'">浏览数据</el-menu-item>
                <el-menu-item :index="'/basic/welcomeHome.html'">版本信息</el-menu-item>
            </el-submenu>
        </el-menu>
        <i class="iconshouqi el-icon-s-fold" v-if="!isCollapse" @click="isCollapse=!isCollapse"></i>
        <i class="iconzhankai el-icon-s-unfold" v-if="isCollapse" @click="isCollapse=!isCollapse"></i>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:'Aside',
    data(){
        return{
            isCollapse: false,
            isSuperAdmin: false,
            active:'/basic/welcomeHome.html'
        }
    },
    computed: mapState({
        // 箭头函数可使代码更简练
        authRole: state => state.userInfo.authRole,
    }),
    methods:{
        checkAdmin(){
            this.$http('get','/blogAdmin/list').then();
        }
    },
    mounted(){
        this.checkAdmin();
        this.active =this.$route.path
    }
}
</script>

<style>
#aside{
    background-color: #352c2c;
    width: 200px;
    height: 100%;
    color: #ffffff;
    position: relative;
}
.el-submenu__title,.el-menu-item{
    text-align: left;
}
.el-menu{
    border-right: 1px solid #352c2c!important;
}
.sysName{
    height:50px;
    font-size:14px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:60px;
    text-align: left;
    margin-left: 15px;
}
.el-submenu,.el-submenu__title,.el-menu-item{
    font-size: 13px!important;
}
.iconshouqi,.iconzhankai{
    font-size: 20px;
    cursor: pointer;
    position: fixed;
    bottom: 10px;
    left: 30px;
}
.iconfont{
    margin-right: 10px;
}
</style>

