<template>
  <a-layout>
    <a-layout-sider width="250" style="background: #fff;">
      <div style="display: table; margin-top:20px;width: 250px">
        <h3 style="float: left; margin: 10px 0 0 10px; font-weight: bolder">
          {{$store.getters.getSystemLanguage === 0?"当前表格:":"Sheet:"}}
        </h3>
        <div style="float: right; width: 60%; padding: 2px">
          <div style="margin: 5px 0 54px 0">
            <a-select
              placeholder="表格数据选择"
              style="width: 140px"
              allowClear="true"
              @change="handleChange"
            >
              <a-select-option v-for="item in tableList" :key="item"> {{item}} </a-select-option>
            </a-select>
          </div>
        </div>
      </div>
      <div style="width:100%;height:2px;border-bottom: 2px solid gray;"></div>
      <div style="display: table; width: 100%; height: 20px">
        <div style="float: left; width: 48%; margin: 10px 0 0 0">
          <h3 style="font-weight: bolder">{{$store.getters.getSystemLanguage === 0?"统计分析图表:":"Result List"}}</h3>
        </div>
        <div
          style="
            float: right;
            width: 25%;
            padding: 10px 5px 0 0;
            font-size: 12px;
          "
        >
          <a-button
            @click="deletestatItem"
            style="
              background-color: white;
              color: gray;
              margin:0 15px 0 0;
              width: 60px;
              height: 30px;
              border: 1px solid #e7e7e7;
              cursor: pointer;
            "
          >
            {{$store.getters.getSystemLanguage === 0?"删除:":"Del"}}
          </a-button>
        </div>
      </div>
      <a-menu
        mode="vertical"
        :default-selected-keys="['1']"
        style="height: 60%"
        @click="statLoad"
      >
        <a-menu-item v-for="item in statAnsList" :key="item" style="height:35px;padding-left:20px;"><LineChartOutlined />&nbsp; {{item}}</a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout-content
      :style="{ minHeight: '680px', width: '1000px', background: '#fff' }"
    >
      <div style="margin: 5px 5px 5px 5px">
        <div
          style="
            height: 110px;
            width: 100%;
            backgroud: green;
            box-shadow: 0 0 9px 3px #fff;
            overflow:auto;
          "
        >
          <div style="width: 100%;height:70px;display:table;">
            <div style="width:80%;float:left;">
              <span style="font-size:18px;font-weight: bolder">{{$store.getters.getSystemLanguage === 0?"选择变量:":"Fields"}}</span>
              <a-select
                mode="multiple"
                style="width: 88%;text-align:left;margin:10px 0 0 20px;color:green"
                placeholder="变量选择"
                @change="varChange"
                v-model:value="selectBind"
                size="large"
              >
                <a-select-option
                  v-for="value in varList"
                  :key="value"
                  :value="value"
                  >{{ value }}
                </a-select-option>
                <!--a-select-option v-for="(value,name) in varList" :key="value" :value="name">{{value}}</a-select-option-->
              </a-select>
            </div>

            <div style="width:20%;float:left;">
              <span style="font-size:18px;font-weight: bolder">{{$store.getters.getSystemLanguage === 0?"模式选择:":"Mode"}}</span>
              <a-select
                style="width: 120px;text-align:left;margin:10px 0 0 20px;color:black"
                placeholder="模式选择"
                v-model:value="statModeBind[$store.getters.getSystemLanguage]"
                size="large"
              >
                <a-select-option
                  v-for="value in statModeList[$store.getters.getSystemLanguage]"
                  :key="value"
                  :value="value"
                  >{{ value }}
                </a-select-option>
              </a-select>
            </div>
          </div>    
          <div style="margin: 0px 15px 0 0; float: right">
            <a-button
              @click="confirm"
              style="
                background: #d3d3d3;
                color: black;
                border: 2px solid #e7e7e7;
                padding: 2px 24px;
                cursor: pointer;
              "
            >
              OK
            </a-button>
          </div>
        </div>
        <div style="width:100%;height:2px;border-bottom: 2px solid gray;"></div>
        <div style="float: right; width: 13%; margin: 10px 5px 0 0;">
          <a-button
            @click="clearArea"
            style="
              background-color: white;
              color: gray;
              margin:0 15px 0 0;
              border: 1px solid #e7e7e7;
              cursor: pointer;
              width: 60px;
              height: 32px;
            "
          >
            {{$store.getters.getSystemLanguage === 0?"清空":"Clear"}}
          </a-button>
          <a-button
            @click="showModal"
            style="
              background-color: white;
              color: gray;
              border: 1px solid #e7e7e7;
              cursor: pointer;
              width: 60px;
              height: 30px;
            "
          >
            {{$store.getters.getSystemLanguage === 0?"保存":"Save"}}
          </a-button>
          <div>
            <a-modal
              width="700px"
              :visible="modalVisible"
              :dialog-style="{ top: '150px' }"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              ok-text="OK"
              cancel-text="Cancel"
            >
              <template v-slot:title>
                <div style="height: 20px"><strong>{{$store.getters.getSystemLanguage === 0?"保存统计结果":"Save Result"}}</strong></div>
              </template>
              <div
                style="
                  height: 250px;
                  background: #fff;
                "
              >
                <div style="margin:20px 0 0 20px">
                  <span style="font-size:18px;font-weight: bolder">{{$store.getters.getSystemLanguage === 0?"统计结果名称:":"Name"}}</span>
                  <a-input
                    v-model:value="statName" 
                    style="width: 75%;text-align:left;margin:10px 0 0 20px" 
                    placeholder="请输入要保存的统计分析结果名称" 
                    size="large"
                  />
                </div>
                <div style="margin:20px 0 0 20px">
                  <span style="font-size:18px;font-weight: bolder">{{$store.getters.getSystemLanguage === 0?"统计结果标题:":"Title"}}</span>
                  <a-input
                    v-model:value="statTitle" 
                    style="width: 75%;text-align:left;margin:10px 0 0 20px" 
                    placeholder="请输入要保存的统计分析结果标题，生成报告时用" 
                    size="large"
                  />
                </div>
                <div style="margin:20px 0 0 20px">
                  <span style="font-size:18px;font-weight: bolder">{{$store.getters.getSystemLanguage === 0?"统计描述:":"Description"}}</span>
                  <a-input
                    v-model:value="statDesc" 
                    style="width: 75%;text-align:left;margin:10px 0 0 20px" 
                    placeholder="请输入要保存的统计分析结果描述，生成报告时用" 
                    size="large"
                  />
                </div>
              </div>
            </a-modal>
          </div>
        </div>
        <div
          style="
            margin: 60px 0 5px 0;
            minheight: 550px;
            width: 100%;
            backgroud: #d3d3d3;
          "
        >
          <div v-if="statMode == '普通模式'">
            <template v-for="item in statList" :key="item"> 
              <Statistics :ans="item"></Statistics>
            </template>
            <div
              v-if="corr_data.length > 1"
              style="
                margin-bottom:20px;
                margin-left:40px;
                margin-right:40px;
                minheight: 300px;
                width: 95%;
                backgroud: green;
              "
            >
              <div
                style="
                  margin: 0 0 5px 0;
                  padding:10px 10px 10px 10px;
                  width: 100%;
                  backgroud: #d3d3d3;
                "
              >
              <table>
                <tr>
                  <th>{{$store.getters.getSystemLanguage === 0?"相关系数矩阵":"Correlation Coefficient Matrix"}}</th>
                  <th  v-for="(value, index) in corr_columns" :key="index" :value="value">
                    {{corr_columns[index]}}
                  </th>
                </tr>
                <tr v-for="(value1, index1) in corr_data" :key="index1" :value="value1">
                  <td>
                    {{corr_columns[index1]}}
                  </td>
                  <td v-for="(value2, index2 ) in corr_data" :key="index2" :value="value2">
                    {{corr_data[index1][index2]}}
                  </td>
                </tr>
              </table>
              </div>
            </div>
          </div>
          <div v-if="statMode == '汽车行业'">
            <StatAnsCar :ans="statAnsCar"></StatAnsCar>
          </div>
          <div v-if="statMode == '模式二'">
            <div style="align:center">模式二统计结果显示格式</div>
          </div>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { LineChartOutlined } from "@ant-design/icons-vue";
import Statistics from "@/components/Statistics.vue";
import StatAnsCar from "@/components/StatAnsCar.vue";
import axios from "axios";
export default {
  inject:['reload'],
  data() {
    return {
      modalVisible:false,
      confirmLoading: false,
      statName:"",
      statTitle:"",
      statDesc:"",
      selectedStatField:"",
      saveFlag:false,

      selectBind:[],
      retAns:{},
      statList:[],
      statAnsList:[],
      tableList:[],
      varList:[],
      selectVar:[],
      selectedFile:"",

      //普通模式返回的相关系数矩阵
      corr_columns:[],
      corr_data:[],
      //varList:Object,

      //模式一返回的csv表格数据
      statAnsCar:{
        csv:[],
        img:[],
      },
      csv_ans_list:[],
      img_ans_list:[],
      csv_cnt:0,
      img_cnt:0,
      img_stream:[],

      statModeList:[["普通模式","汽车行业"],["Normal Mode","Auto Industry"]],
      statMode:"",
      statModeBind:["普通模式","Normal Mode"],
    };
  },
  components: {
    Statistics,
    LineChartOutlined,
    StatAnsCar,
  },
  mounted () {
    this.getFileList();
    this.getStatList();
  },
  methods: {
    async getFileList(){ //获取加工台数据表列表
      await axios.get(this.$store.state.base_url + "/api/getProcessFileName",{params:{'name':this.$store.state.userName}})
        .then(res=>{
        this.tableList = res.data;
      });
    },
    async loadFields(){
      await axios.get(this.$store.state.base_url + "/api/loadStatFields",{params:{'name':this.$store.state.userName,'file_name':this.selectedFile}})
        .then(res=>{
          console.log(res.data)
          this.varList = res.data['columns']
      });
    },
    async getStatAns(){
      if(this.statMode == "普通模式"){
        const formData = new FormData();
        for(let i = 0; i < this.selectVar.length; i++){
          formData.append('varList[]',this.selectVar[i]);
        }
        formData.append('name',this.$store.state.userName);
        formData.append('file_name',this.selectedFile);
        this.retAns = {};
        await axios.post(this.$store.state.base_url + "/api/dataStat",formData)
          .then(res=>{
            this.saveFlag = true;
            this.retAns = res.data;
            console.log(this.retAns);
            console.log(this.selectVar)
            this.statList = [];
            this.corr_columns = [];
            this.corr_data = [];
            for(let i = 0; i < this.selectVar.length; i++){
              this.statList.push(this.retAns[this.selectVar[i]])
            }
            console.log(this.statList)
            this.corr_columns = this.retAns['corr']['columns'];
            this.corr_data = this.retAns['corr']['data'];
            console.log(this.corr_columns);
            console.log(this.corr_data);
        });
      }
      if(this.statMode == "汽车行业"){
        //alert("按照模式一进行统计分析");
        const formData = new FormData();
        formData.append('name',this.$store.state.userName);
        formData.append('file_name',this.selectedFile);
        await axios.post(this.$store.state.base_url + "/api/dataStatCar",formData)
          .then(res=>{
            this.saveFlag = true;
            this.retAns = res.data;
            //alert(res.data)
            console.log("resdata");
            console.log(res.data);
            this.statAnsCar["csv"] = res.data['csv'];
            this.statAnsCar["img"] = res.data['img'];
            console.log("statAnsCar");
            console.log(this.statAnsCar);
        });
      }
      if(this.statMode == "模式二"){
        this.saveFlag = true;
        alert("按照模式二进行统计分析");
      }
    },
    async getStatList(){
      await axios.get(this.$store.state.base_url + "/api/getStatList",{params:{'name':this.$store.state.userName,'industry':this.$store.getters.getSystemTitle}})
        .then(res=>{
        this.statAnsList = res.data;
      });
    },
    async deletestatItem() {//删除可视化结果
      if(this.selectedStatField.length == 0){
        alert("请先选择统计项");
      }
      else{
        console.log(this.selectedStatField);
        await axios.get(this.$store.state.base_url + "/api/deleteStatItem",{params:{'name':this.$store.state.userName,'stat_file_name':this.selectedStatField}})
        .then(res=>{
          alert(res.data);
          this.reload();
      });
      }
    },
    async saveStat() {//保存统计结果
      if(this.saveFlag){
        let ans = {};
        ans["title"] = this.statTitle;
        ans["desc"] = this.statDesc;
        ans["mode"] = this.statMode;
        ans["statAns"] = this.retAns;
        const formData = new FormData();
        formData.append('name',this.$store.state.userName);
        formData.append('stat_file_name',this.statName);
        formData.append('industry',this.$store.getters.getSystemTitle);
        console.log(this.retAns);
        formData.append('statAns',JSON.stringify(ans))
        await axios.post(this.$store.state.base_url + "/api/saveStat",formData)
          .then(res=>{
            alert(res.data);
            this.reload();
            this.saveFlag = false;
        },(res) => {
          alert("保存失败，请检查名称是否含有非法字符");
        });
      }
      else{
        alert("请先对数据进行统计分析");
      }
    },
    handleChange(value){//表格数据切换
      this.selectedFile = "";
      this.selectedFile = value;
      console.log(`选中文件${this.selectedFile}`);
      if(this.selectedFile){
        this.loadFields();
      }else{
        this.varList.length = 0;
      }
    },
    clearArea(){//清空区域
      this.statList= [];
      this.corr_columns = [];
      this.corr_data = [];
      this.selectBind = [];
      this.retAns = {};
      this.selectVar = [];
      this.statAnsCar = {
        csv:[],
        img:[],
      },
      this.saveFlag = false;
    },
    confirm() {//统计分析确认
    if(this.selectVar.length == 0){
      alert("请先选择数据");
    }
    else{
      if(this.statModeBind[this.$store.getters.getSystemLanguage] == "普通模式" || this.statModeBind[this.$store.getters.getSystemLanguage] == "Normal Mode"){
        this.statMode = "普通模式";
      }
      if(this.statModeBind[this.$store.getters.getSystemLanguage] == "汽车行业" || this.statModeBind[this.$store.getters.getSystemLanguage] == "Auto Industry"){
        this.statMode = "汽车行业";
      }
      this.getStatAns();
    }
    },
    varChange(value) { //统计变量选择
      console.log(value);
      this.selectVar = value;
      console.log(this.selectVar);
    },
    async statLoad(item){ //加载已经保存的统计分析结果
      this.selectedStatField = item.key;
      this.saveFlag = false;
      console.log(this.selectedStatField);
      this.retAns = {};
      await axios.get(this.$store.state.base_url + "/api/getStatAns",{params:{'name':this.$store.state.userName,'stat_file_name':this.selectedStatField}})
      .then((res) => {
        this.retAns = res.data["statAns"];
        this.statMode = res.data["mode"];

        if(this.statMode == "普通模式"){
          this.statList = [];
          this.corr_columns = [];
          this.corr_data = [];
          for(let key in this.retAns){
            if(key != "corr"){
              this.statList.push(this.retAns[key])
            }
          }
          console.log(this.statList)
          this.corr_columns = this.retAns['corr']['columns'];
          this.corr_data = this.retAns['corr']['data'];
          console.log(this.corr_columns);
          console.log(this.corr_data);
        }
        if(this.statMode == "汽车行业"){
          this.statAnsCar["csv"] = this.retAns['csv'];
          this.statAnsCar["img"] = this.retAns['img'];
        }
        //console.log(this.retAns);
        
      },(res) => {
        alert("请求失败");
      });
    },
    showModal() {
      if(this.selectVar.length == 0){
        alert("请先选择变量进行统计分析");
        return 0;
      }
      if(this.saveFlag == false){
        alert("请先点击确认进行统计分析");
        return 0;
      }
      this.statName = "",
      this.statTitle = "",
      this.statDesc = "";
      this.modalVisible = true;
      console.log("show");
    },
    handleOk(e) {
      // this.confirmLoading = true;
      if(this.statName.length == 0){
        alert("名称不能为空");
        return 0;
      }else{
        this.saveStat();
        this.modalVisible = false;
        this.confirmLoading = false;
      }
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.modalVisible = false;
    },
  },
};
</script>

<style scoped>
table, td, th {
  border: 2px solid gray;
}

table {
  border-collapse: collapse;
  width: 100%;
}
th {
  color: green;
}
td {
  text-align: center;
  color: green;
}
</style>