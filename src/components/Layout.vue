<template>
  <a-layout id="components-layout-demo-top-side" v-if="isLayoutReload">
    <a-layout-header
      style="background: rgb(241, 242, 244); padding: 0 0 0 0; height: 80px;"
    >
      <div class="name" v-if="this.$store.getters.getSystemLanguage == 0">
        <div
          style="
            padding: 10px 0 0 0;
            font-size: 27px;
            font-weight: bold;
            font-family: LiSu;
          "
        >
          {{$store.getters.getSystemTitle}}
        </div>
      </div>

      <div class="name" v-if="this.$store.getters.getSystemLanguage == 1">
        <div
          style="
            padding: 10px 0 0 0;
            font-size: 22px;
            font-weight: bold;
            font-family: LiSu;
          "
        >
          {{systemTitle[$store.getters.getSystemTitle]}}
        </div>
      </div>
      <a-menu
        mode="horizontal"
        defaultSelectedKeys="['DataSrc']"
        style="
          float: left;
          lineheight: 80px;
          background: rgb(241, 242, 244);
          font-size: 18px;
          font-weight: bold;
        "
        @click="handelClickLink"
      >
        <a-menu-item key="DataSrc"> {{data_src_text[this.$store.getters.getSystemLanguage]}} </a-menu-item>
        <a-menu-item key="WorkSheet"> {{work_sheet_text[this.$store.getters.getSystemLanguage]}} </a-menu-item>
        <a-menu-item key="ProcessPlatform"> {{process_text[this.$store.getters.getSystemLanguage]}} </a-menu-item>
        <a-menu-item key="Visual"> {{visula_text[this.$store.getters.getSystemLanguage]}} </a-menu-item>
        <a-menu-item key="StatisticsRoom"> {{stat_text[this.$store.getters.getSystemLanguage]}} </a-menu-item>
        <a-menu-item key="ModelLibrary"> {{model_text[this.$store.getters.getSystemLanguage]}} </a-menu-item>
        <a-menu-item key="Report"> {{report_text[this.$store.getters.getSystemLanguage]}} </a-menu-item>
      </a-menu>
      <div
        style="
          float: right;
          display: table;
          width: 390px;
          margin: 10px 10px 10px 0;
          height: 60px;
          background: rgb(241, 242, 244);
        "
      >
        <div style="width: 35%;float: left;">
          <a-dropdown :trigger="['click']">
            <a-button 
              style="
                background: rgb(241, 242, 244);
                border:none;
              "
              size="large"
            >
              <SettingOutlined />{{$store.getters.getSystemLanguage === 0?"语言设置":"Language"}} <DownOutlined />
            </a-button>
            <template #overlay>
              <a-menu @click="languageSelect">
                <a-menu-item v-for="item in language" :key="item">{{item}}</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>

        <div style="width: 30%;float: left;">
          <a-dropdown :trigger="['click']">
            <a-button 
              style="
                background: rgb(241, 242, 244);
                border:none;
              "
              size="large"
            >
              <SettingOutlined />{{industry_text[this.$store.getters.getSystemLanguage]}} <DownOutlined />
            </a-button>
            <template #overlay>
              <a-menu @click="industrySelect">
                <a-menu-item v-for="item in industry[this.$store.getters.getSystemLanguage]" :key="item">{{item}}</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>

        <div style="width: 30%;float: right;">
          <a-dropdown :trigger="['click']">
            <a-tooltip placement="bottomRight">
              <template #title>
                <span>{{$store.getters.getUserName}}</span>
              </template>
              <a-button 
                style="
                  background: rgb(241, 242, 244);
                  border:none;
                  width:100px;
                  overflow-x: hidden;
                "
                size="large"
              >
                <UserOutlined />{{$store.getters.getUserName}}
              </a-button>
              </a-tooltip>
              <template #overlay>
                <a-menu @click="userLogout">
                  <a-menu-item key="logout" style="text-align:center;">{{logout_text[this.$store.getters.getSystemLanguage]}}</a-menu-item>
                </a-menu>
              </template>
            
          </a-dropdown>
        </div>

        <!--div style="width: 20%; float: left;">
          <UserOutlined :style="{fontSize:'35px',margin:'12px'}"/>
        </div>
        <div style="width: 30%; float: left;">
          <div style="float: left;margin:2px 0 0 10px;font-size:22px;">
            {{$store.getters.getUserName}}
          </div>
        </div>
        <div style="width: 32%; float: right;">
          <a-button
            @click="userLogout"
            style="
              background: white;
              color: black;
              width: 60px;
              height: 30px;
              border: 1px solid #e7e7e7;
              cursor: pointer;
            "
          >
            退出
          </a-button>
        </div-->
      </div>
    </a-layout-header>
    <!--div style="background:#3c3c3c;minHeight:16px"></div-->
    <!--a-layout-content-->
    <a-layout-content :style="{ minHeight: '450px', background: '#fff' }">
      <router-view name="content" v-if="isRouterAlive" />
    </a-layout-content>
    <!--/a-layout-content-->
  </a-layout>
</template>

<script>
//import Upload from '@/components/Upload.vue';
import DataSrc from '@/components/DataSrc.vue'
import Router from "@/router/index";
import axios from "axios";
import { UserOutlined,SettingOutlined,DownOutlined} from "@ant-design/icons-vue";
import { provide } from "vue"
//import { useStore } from 'vuex'

export default {
  //inject:['pageReload'],
  provide(){
    return {
      reload: this.reload,
    }
  },
  data() {
    return {
      isRouterAlive: true,
      isLayoutReload: true,
      systemTitle:{
        '智能数据分析':"Intelligent Analysis",
        '汽车行业数据分析':"Auto Industry"
      },

      data_src_text:["数据源","Data Source"],
      work_sheet_text:["工作表","Work Sheet"],
      process_text:["加工台","Process"],
      visula_text:["透视图","Visual"],
      stat_text:["统计室","Statisitics"],
      model_text:["模型库","Model"],
      report_text:["报告柜","Report"],
      industry_text:["行业设置","Industry"],
      logout_text:["退出","Logout"],

      industry:[["智能数据分析","汽车行业数据分析"],["Intelligent Analysis","Auto Industry"]],
      language:["Chinese","English"]
    };
  },
  components: {
    UserOutlined,
    SettingOutlined,
    DownOutlined,
  },
  mounted(){
    //const store = useStore();
    this.$router.replace("/DataSrc");
    //console.log(store.state.userName);
    //store.commit('updateUserName', 'nihao')
  },
  methods: {
    handelClickLink(item) {
      this.$router.push("/" + item.key);
    },
    languageSelect(item){
      if(item.key == "Chinese"){
        this.$store.commit("updateSystemLanguage",0);
      }
      if(item.key == "English"){
        this.$store.commit("updateSystemLanguage",1);
      }
      this.layoutReload();
    },
    industrySelect(item) {
      if(item.key == "智能数据分析" || item.key == "Intelligent Analysis"){
        this.$store.commit("updateSystemTitle","智能数据分析");
      }
      if(item.key == "汽车行业数据分析" || item.key == "Auto Industry"){
        this.$store.commit("updateSystemTitle","汽车行业数据分析");
      }
      this.reload();
    },
    async userLogout(){
       await axios.get(this.$store.state.base_url + "/api/logout",{params:{'name':this.$store.state.userName}})
          .then((res) => {
          console.log(res)
        });
      this.$store.commit("updateLoginFlag", 0);
      this.$router.push("/");
    },
    layoutReload(){
      this.isLayoutReload = false;
      this.$nextTick(function(){
        this.isLayoutReload = true;
      })
    },
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive = true;
      })
    }
  },
};
</script>

<style>
.name {
  width: 250px;
  height: 80px;
  /*background: rgba(55, 16, 233, 0.2);*/
  background: rgba(71, 110, 228, 0.9);
  float: left;
}
</style>
