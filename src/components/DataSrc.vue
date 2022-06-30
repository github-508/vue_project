<template>
  <a-layout>
    <a-layout-content>
      <a-layout>
        <a-layout-sider width="250" style="background:#fff">
          <!--hr /-->
          <div style="display: table; width: 250px;margin-top:20px;height:20px;">
            <h3
              style="
                float: left;
                width: 50%;
                margin: 8px 0 0 0;
                font-weight: bolder;
                padding: 0 40px 0 0;
              "
            >
              {{$store.getters.getSystemLanguage === 0?"我的数据":"My Data"}}
            </h3>
            <div
              style="
                float: right;
                margin: 5px 5px 0 0;
              "
            >
              <a-button
                @click="deleteItem"
                style="
                  background-color: white;
                  color: gray;
                  width: 60px;
                  height:30px;
                  border: 1px solid #e7e7e7;
                  cursor: pointer;
                "
              >
                {{$store.getters.getSystemLanguage === 0?"删除":"Del"}}
              </a-button>
            </div>
          </div>
          <a-menu
            mode="inline"
            :default-selected-keys="['1']"
            :default-open-keys="['sub1']"
            style="height: 95%;font-size:14px;"
            @click="itemSelect"
          >
            <a-sub-menu key="sub1" title="EXCEL">
              <a-menu-item v-for="item in xlsxList" :key="'1-'+item"><FileExcelOutlined />&nbsp; {{item}} </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2" title="MySQL">
              <a-menu-item v-for="item in mysqlList" :key="'2-'+item"><DatabaseOutlined />&nbsp; {{item}} </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub3" title="Influxdb">
              <a-menu-item v-for="item in influxList" :key="'3-'+item"><DatabaseOutlined />&nbsp; {{item}} </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout-content :style="{ minHeight: '450px', background: '#fff' }">
          <div class="dsrc">
            <div class="src">
              <router-link to="/DataSrc/Upload">
                <div
                  style="
                    padding: 0 10px 0 10px;
                    font-weight: bolder;
                    font-size: 40px;
                  "
                >
                  +
                </div>
                <span style="font-weight: bolder; font-size: 17px">{{$store.getters.getSystemLanguage === 0?"上传文件(.csv .xlxs)":"Upload File(.csv .xlxs)"}}</span>
              </router-link>
            </div>
            <div class="src" @click="showModal(0)" style="cursor: pointer">
              <!--router-link to="/DataSrc/db"-->
              <div
                style="
                  padding: 0 10px 0 10px;
                  font-weight: bolder;
                  font-size: 40px;
                "
              >
                +
              </div>
              <span style="font-weight: bolder; font-size: 17px">{{"MySQL"}}</span>
              <!--/router-link-->
              <div>
                <a-modal
                  width="700px"
                  :visible="visible[0]"
                  :dialog-style="{ top: '150px' }"
                  :confirm-loading="confirmLoading[0]"
                  @ok="handleOk(0)"
                  @cancel="handleCancel(0)"
                  ok-text="OK" 
                  cancel-text="Cancel"
                >
                  <template v-slot:title>
                    <div style="height: 20px"><strong>{{$store.getters.getSystemLanguage === 0?"创建MySql连接实例":"Create a Connection to MySQL"}}</strong></div>
                  </template>
                  <div style="height: 300px">
                    <div style="margin: 8px 20px">
                      <span><strong>{{$store.getters.getSystemLanguage === 0?"实例名 :":"ConnID :"}}</strong></span>
                      <input
                        class="input-block"
                        placeholder="请输入实例名称.."
                        v-model="mysql_conn.connName"
                        size="large"
                      />
                    </div>
                    <div style="margin: 8px 20px">
                      <span><strong>{{$store.getters.getSystemLanguage === 0?"主机名 :":"Host IP :"}}</strong></span>
                      <input 
                        class="input-block"
                        placeholder="请输入IP地址.." 
                        v-model="mysql_conn.hostName"
                        size="large"
                      />
                    </div>
                    <div style="margin: 8px 20px">
                      <span><strong>{{$store.getters.getSystemLanguage === 0?"端口号 :":"Port :"}}</strong></span>
                      <input 
                        class="input-block" 
                        placeholder="请输入端口号.." 
                        v-model="mysql_conn.portNumber"
                        size="large"
                      />
                    </div>
                    <div style="margin: 8px 20px">
                      <span><strong>{{$store.getters.getSystemLanguage === 0?"用户名 :":"User :"}}</strong></span>
                      <input 
                        class="input-block" 
                        placeholder="请输入用户名.."
                        v-model="mysql_conn.databaseUserName" 
                        size="large"
                      />
                    </div>
                    <div style="margin: 8px 20px">
                      <span><strong>{{$store.getters.getSystemLanguage === 0?"密  码 :":"Passwrd :"}}</strong></span>
                      <input 
                        class="input-block"  
                        placeholder="请输入密码.."
                        v-model="mysql_conn.databaseUserPassword" 
                        size="large"
                      />
                    </div>
                    <div style="margin: 8px 20px">
                      <span><strong>{{$store.getters.getSystemLanguage === 0?"数据库 :":"DataBase :"}}</strong></span>
                      <input
                        class="input-block"
                        placeholder="请输入数据库名.."
                        v-model="mysql_conn.databaseName" 
                        size="large"
                      />
                    </div>
                  </div>
                </a-modal>
              </div>
            </div>


            <div class="src" @click="showModal(1)" style="cursor: pointer">
              <!--router-link to="/DataSrc/db"-->
              <div
                style="
                  padding: 0 10px 0 10px;
                  font-weight: bolder;
                  font-size: 40px;
                "
              >
                +
              </div>
              <span style="font-weight: bolder; font-size: 17px">{{"Influxdb"}}</span>
              <!--/router-link-->
              <div>
                <a-modal
                  width="700px"
                  :visible="visible[1]"
                  :dialog-style="{ top: '150px' }"
                  :confirm-loading="confirmLoading[1]"
                  @ok="handleOk(1)"
                  @cancel="handleCancel(1)"
                  ok-text="OK" 
                  cancel-text="Cancel"
                >
                  <template v-slot:title>
                    <div style="height: 20px"><strong>{{$store.getters.getSystemLanguage === 0?"创建Influxdb连接实例":"Create a Connection to Influxdb"}}</strong></div>
                  </template>
                  <div style="height: 300px">
                    <div style="margin: 8px 20px">
                      <span><strong>{{$store.getters.getSystemLanguage === 0?"实例名 :":"ConnID :"}}</strong></span>
                      <input
                        class="input-block"
                        placeholder="请输入实例名称.."
                        v-model="influxdb_conn.connName"
                        size="large"
                      />
                    </div>
                    <div style="margin: 8px 20px">
                      <span><strong>{{$store.getters.getSystemLanguage === 0?"主机名 :":"Host IP :"}}</strong></span>
                      <input 
                        class="input-block"
                        placeholder="请输入IP地址.." 
                        v-model="influxdb_conn.hostName"
                        size="large"
                      />
                    </div>
                    <div style="margin: 8px 20px">
                      <span><strong>{{$store.getters.getSystemLanguage === 0?"端口号 :":"Port :"}}</strong></span>
                      <input 
                        class="input-block" 
                        placeholder="请输入端口号.." 
                        v-model="influxdb_conn.portNumber"
                        size="large"
                      />
                    </div>
                    <div style="margin: 8px 20px">
                      <span><strong>{{$store.getters.getSystemLanguage === 0?"用户名 :":"User :"}}</strong></span>
                      <input 
                        class="input-block" 
                        placeholder="请输入用户名.."
                        v-model="influxdb_conn.databaseUserName" 
                        size="large"
                      />
                    </div>
                    <div style="margin: 8px 20px">
                      <span><strong>{{$store.getters.getSystemLanguage === 0?"密  码 :":"Passwrd :"}}</strong></span>
                      <input 
                        class="input-block"  
                        placeholder="请输入密码.."
                        v-model="influxdb_conn.databaseUserPassword" 
                        size="large"
                      />
                    </div>
                    <div style="margin: 8px 20px">
                      <span><strong>{{$store.getters.getSystemLanguage === 0?"数据库 :":"DataBase :"}}</strong></span>
                      <input
                        class="input-block"
                        placeholder="请输入数据库名.."
                        v-model="influxdb_conn.databaseName" 
                        size="large"
                      />
                    </div>
                  </div>
                </a-modal>
              </div>
            </div>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
  </a-layout>
</template>

<script>
import Router from "@/router/index";
import axios from "axios";
import {DatabaseOutlined,FileExcelOutlined} from '@ant-design/icons-vue'
import {inject} from "vue"
export default {
  inject:['reload'],
  data() {
    return {
      visible: [false, false],
      confirmLoading:  [false, false],
      
      selectedItem:"",
      selectedSub:"",

      db_option:["mysql","influxdb"],
      selected_db:"",

      //mysql数据库连接信息
      mysql_conn:{
        connName:"", //实例名
        hostName:"", //主机
        portNumber:"", //端口号
        databaseUserName:"", //用户名
        databaseUserPassword:"", //密码
        databaseName:"", //数据库名
      },
      influxdb_conn:{
        connName:"", //实例名
        hostName:"", //主机
        portNumber:"", //端口号
        databaseUserName:"", //用户名
        databaseUserPassword:"", //密码
        databaseName:"", //数据库名
      },
      xlsxList:[],
      mysqlList:[],
      influxList:[],
    };
  },
  components: {
    FileExcelOutlined,
    DatabaseOutlined,
  },
  mounted(){
    this.getXlsxList();
    this.getConnList();
  },
  methods: {
    async getXlsxList(){
      await axios.get(this.$store.state.base_url + "/api/getFileName",{params:{'name':this.$store.state.userName}})
      .then(res=>{
        this.xlsxList = res.data;
      });
    },
    async getConnList(){
      await axios.get(this.$store.state.base_url + "/api/getConnectName",{params:{'name':this.$store.state.userName}})
      .then(res=>{
        this.mysqlList = res.data['mysql'];
        this.influxList = res.data['influxdb']
      });
    },
    async createConnection(){
      const formData = new FormData();
      if(this.selected_db == "mysql"){
        formData.append('name',this.$store.state.userName);
        formData.append('connName',this.mysql_conn.connName);
        formData.append('hostName',this.mysql_conn.hostName);
        formData.append('portNumber',this.mysql_conn.portNumber);
        formData.append('databaseUserName',this.mysql_conn.databaseUserName);
        formData.append('databaseUserPassword',this.mysql_conn.databaseUserPassword);
        formData.append('databaseName',this.mysql_conn.databaseName);
        formData.append('databaseType',this.selected_db);
      }
      if(this.selected_db == "influxdb"){
        formData.append('name',this.$store.state.userName);
        formData.append('connName',this.influxdb_conn.connName);
        formData.append('hostName',this.influxdb_conn.hostName);
        formData.append('portNumber',this.influxdb_conn.portNumber);
        formData.append('databaseUserName',this.influxdb_conn.databaseUserName);
        formData.append('databaseUserPassword',this.influxdb_conn.databaseUserPassword);
        formData.append('databaseName',this.influxdb_conn.databaseName);
        formData.append('databaseType',this.selected_db);
      }
      await axios.post(this.$store.state.base_url + "/api/createConnection",formData)
      .then(res=>{
        alert(res.data);
        this.reload();
      });
    },
    itemSelect(item) {
      let str = "";
      str = item.key;
      this.selectedSub = str[0]
      this.selectedItem = str.slice(2);
      console.log(this.selectedSub);
      console.log(this.selectedItem);
    },
    async deleteItem() {
      if(this.selectedSub == "1"){

        if(this.selectedItem.length != 0){
          await axios.get(this.$store.state.base_url + "/api/delFile",{params:{'name':this.$store.state.userName,'file_name':this.selectedItem}})
            .then(res=>{
            alert(res.data);
          });
        }else{
          alert("请选择要删除的文件");
        }
        this.selectedItem = "";
        this.reload();

      }else if(this.selectedSub == "2" || this.selectedSub == "3" ){

       if(this.selectedItem.length != 0){
          await axios.get(this.$store.state.base_url + "/api/delConnection",{params:{'name':this.$store.state.userName,'con_name':this.selectedItem}})
            .then(res=>{
            alert(res.data);
          });
        }else{
          alert("请选择要删除的连接实例");
        }
        this.selectedItem = "";
        this.reload();

      }else{

        alert("请选择要删除的文件");
        this.selectedSub = ""

      }
    },
    showModal(n) {
      if(n == 0){
        this.visible[n] = true;
        this.selected_db = "mysql";
      }
      if(n == 1){
        this.visible[n] = true;
        this.selected_db = "influxdb";
      }
    },
    handleOk(n) {
      if(n == 0){
        this.confirmLoading[n] = true;
        setTimeout(() => {
          this.visible[n] = false;
          this.confirmLoading[n] = false;
          this.createConnection();
        }, 1000);
      }
      if(n == 1){
        this.confirmLoading[n] = true;
        setTimeout(() => {
          this.visible[n] = false;
          this.confirmLoading[n] = false;
          this.createConnection();
        }, 1000);
      }
    },
    handleCancel(n) {
      if(n == 0){
        console.log("Clicked cancel button");
        this.visible[n] = false;
      }
      if(n == 1){
        console.log("Clicked cancel button");
        this.visible[n] = false;
      }
    },
  },
};
</script>

<style lang="less">
.dsrc {
  height: 400px;
  width: 80%;
  display: table;
  //background: rgb(6, 68, 162);
  position: relative;
  left: 100px;
  right:100px;
  top: 150px;
}

.src {
  height: 30%;
  width: 28%;
  background: #bebebe;
  //background:rgb(231,235,238);
  float: left;
  margin: 50px 20px 50px 20px;
}
.input-block {
  width: 85%;
  height: 27px;
  padding: 2px 2px;
  margin: 8px 8px;
  border: 1px solid #ccc;
  //border-radius: 4px;
  box-sizing: border-box;
  text-align: left;
}
</style>