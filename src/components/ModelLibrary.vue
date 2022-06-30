<template>
  <a-layout>
    <a-layout-sider width="250" style="background: #fff;">
      <div style="display: table; width: 100%;margin-top:20px; height: 20px">
        <div
          style="
            float: left;
            width: 40%;
            padding: 0 20px 0 0;
          "
        >
          <h3 style="font-weight: bolder">{{$store.getters.getSystemLanguage === 0?"我的模型":"MyModel"}}</h3>
        </div>
        <div
          style="
            float: right;
            width: 25%;
            margin: 0 5px 0 0;
          "
        >
          <a-button
            @click="deleteModel"
            style="
              background-color: white;
              color: gray;
              width: 60px;
              height: 30px;
              border: 1px solid #e7e7e7;
              cursor: pointer;
            "
          >
            {{$store.getters.getSystemLanguage === 0?"删除":"Del"}}
          </a-button>
        </div>
        <div
          style="
            float: right;
            width: 25%;
            margin: 0px 5px 0 0;
          "
        >
          <a-button
            @click="getDetail"
            style="
              background-color: white;
              color: gray;
              width: 60px;
              height: 30px;
              border: 1px solid #e7e7e7;
              cursor: pointer;
            "
          >
            {{$store.getters.getSystemLanguage === 0?"查看":"detail"}}
          </a-button>
        </div>
      </div>
      <div 
        style="
          height:280px;
          overflow:auto;
        "
      >
        <a-menu
          mode="vertical"
          @click="modelSelect"
        >
          <a-menu-item v-for="item in model_list" :key="item" style="height:35px;padding-left:20px;"><ProfileOutlined />&nbsp; {{item}} </a-menu-item>
        </a-menu>
        <div>
          <a-modal
            width="730px"
            :visible="visible[1]"
            :dialog-style="{ top: '150px' }"
            :confirm-loading="confirmLoading[1]"
            @ok="handleOk(1)"
            @cancel="handleCancel(1)"
            ok-text="OK"
            cancel-text="Cancel"
          >
            <template v-slot:title>
              <div style="height: 20px;font-size:18px;font-family:黑体"><strong>[{{selectModel}}] {{$store.getters.getSystemLanguage === 0?"模型信息":"Model Information"}}</strong></div>
            </template>
            <div
              style="
                height: 250px;
                background: #fff;
                font-size:18px;
                overflow:auto;
                font-family:宋体
              "
            >
              <div>
                <strong> {{$store.getters.getSystemLanguage === 0?"数据集 :":"DataSet :"}}</strong>{{modelInfo.dataset}}
              </div>
              <div>
                <strong> {{$store.getters.getSystemLanguage === 0?"数据集大小 :":"Size :"}}</strong>{{modelInfo.dataset_size}}
              </div>
              <div>
                <strong> {{$store.getters.getSystemLanguage === 0?"数据集划分 :":"Split :"}}</strong>{{modelInfo.dataset_split}}
              </div>
              <div>
                <strong> {{$store.getters.getSystemLanguage === 0?"模型描述 :":"Description :"}} </strong>{{modelInfo.model_desc}}
              </div>
              <div>
                <strong> {{$store.getters.getSystemLanguage === 0?"任务类型 :":"Task :"}} </strong>{{modelInfo.task}}
              </div>
              <div>
                <strong> {{$store.getters.getSystemLanguage === 0?"参与训练的列 :":"Field :"}} </strong>{{modelInfo.fields}}
              </div>
              <div>
                <strong> {{$store.getters.getSystemLanguage === 0?"目标字段 :":"Label :"}} </strong>{{modelInfo.label}}
              </div>
              <div>
                <strong> {{$store.getters.getSystemLanguage === 0?"模型生成时间 :":"Time :"}} </strong>{{modelInfo.fit_time}}
              </div>
              <div>
                <strong> {{$store.getters.getSystemLanguage === 0?"模型性能 : :":"Performance :"}} </strong>{{modelInfo.eval_metric}}
              </div>
            </div>
          </a-modal>
        </div>
      </div>
      <div style="width:100%;height:2px;border-bottom: 2px solid gray;"></div>
      <h3
        style="margin: 10px 0 0 10px; text-align:left;font-weight: bolder"
      >
        {{$store.getters.getSystemLanguage === 0?"模型训练中":"Model Fitting"}} 
      </h3>
      <div 
        style="
          height:280px;
          overflow:auto
        "
      >
        <a-menu
          mode="vertical"
          disabled="true"
        >
          <a-menu-item v-for="item in model_list_fitting" :key="item"><LoadingOutlined />&nbsp; {{item}} </a-menu-item>
        </a-menu>
      </div>
    </a-layout-sider>
    <a-layout-content :style="{ minHeight: '200px', background: '#fff' }">
      <div
        style="
          display: table;
          height: 200px;
          width: 1000px;
          background: #fff;
          position: relative;
          left: 300px;
          top: 150px;
        "
      >
        <div
          @click="showModal(0)"
          style="
            float: left;
            cursor: pointer;
            height: 120px;
            width: 50%;
            margin: 50px 40px 50px 20px;
            background: #bebebe;
            opacity: 0.8;
          "
        >
          <!--router-link to="/ModelLibrary/ImportDataSet" -->
          <div
            style="padding: 0 10px 0 10px; font-weight: bolder; font-size: 40px"
          >
            +
          </div>
          <span style="font-weight: bolder; font-size: 17px">{{$store.getters.getSystemLanguage === 0?"选择数据集生成模型":"Select Dataset to Fit"}} </span>
          <!-- 对话框，导入数据-->
          <div>
            <a-modal
              width="700px"
              :visible="visible[0]"
              :dialog-style="{ top: '100px' }"
              :confirm-loading="confirmLoading[0]"
              @ok="handleOk(0)"
              @cancel="handleCancel(0)"
              ok-text="OK"
              cancel-text="Cancel"
            >
              <template v-slot:title>
                <div style="height: 20px"><strong>{{$store.getters.getSystemLanguage === 0?"选择数据集":"Fit Setting"}} </strong></div>
              </template>
              <div
                style="
                  height: 350px;
                  background: #fff;
                  overflow:auto;
                "
              >
                <div style="margin:20px 0 20px 20px">
                  <span style="font-size:18px;font-weight: bolder">{{$store.getters.getSystemLanguage === 0?"训练数据:":"Datatset:"}} </span>
                  <a-select
                    placeholder="选择训练数据集"
                    style="width: 80%;text-align:left;margin:10px 0 0 20px"
                    allowClear="true"
                    v-model:value="selectDataSet"
                    @change="dataSetChange"
                    size="large"
                  >
                    <a-select-option v-for="item in tableList" :key="item">
                      {{ item }}
                    </a-select-option>
                  </a-select>
                </div>
                <div style="margin:20px 0 20px 20px">
                  <span style="font-size:18px;font-weight: bolder">{{$store.getters.getSystemLanguage === 0?"字段选择:":"Fields:"}}</span>
                  <a-select
                    mode="multiple"
                    style="width: 80%;text-align:left;margin:10px 0 0 20px"
                    placeholder="按顺序选择参与训练的字段(包括标签列)"
                    v-model:value="fields"
                    allowClear="true"
                    size="large"
                  >
                    <a-select-option
                      v-for="value in varList"
                      :key="value"
                      :value="value"
                      >{{ value }}
                    </a-select-option>
                  </a-select>
                </div>
                <div style="margin:20px 0 20px 20px">
                  <span style="font-size:18px;font-weight: bolder">{{$store.getters.getSystemLanguage === 0?"任务类型:":"Task:"}}</span>
                  <a-select
                    style="width: 80%;text-align:left;margin:10px 0 0 20px"
                    placeholder="选择任务类型"
                    @change="preFieldChange"
                    v-model:value="selectedTask"
                    allowClear="true"
                    size="large"
                  >
                    <a-select-option
                      v-for="value in taskList[$store.getters.getSystemLanguage]"
                      :key="value"
                      :value="value"
                      >{{ value }}
                    </a-select-option>
                  </a-select>
                </div>
                <div style="margin:20px 0 20px 20px">
                  <span style="font-size:18px;font-weight: bolder">{{$store.getters.getSystemLanguage === 0?"预测变量:":"Label:"}}</span>
                  <a-select
                    style="width: 80%;text-align:left;margin:10px 0 0 20px"
                    placeholder="选择预测目标变量"
                    @change="preFieldChange"
                    v-model:value="selectVar"
                    allowClear="true"
                    size="large"
                  >
                    <a-select-option
                      v-for="value in varList"
                      :key="value"
                      :value="value"
                      >{{ value }}
                    </a-select-option>
                  </a-select>
                </div>
                <div style="margin:20px 0 0 20px">
                  <span style="font-size:18px;font-weight: bolder">{{$store.getters.getSystemLanguage === 0?"模型描述:":"Description:"}}</span>
                  <a-input
                    v-model:value="modelDesc" 
                    style="width: 80%;text-align:left;margin:10px 0 0 20px" 
                    placeholder="模型描述" 
                    size="large"
                  />
                </div>
                <div style="margin:20px 0 0 20px">
                  <span style="font-size:18px;font-weight: bolder">{{$store.getters.getSystemLanguage === 0?"模型名称:":"Name:"}}</span>
                  <a-input
                    v-model:value="modelName" 
                    style="width: 80%;text-align:left;margin:10px 0 0 20px" 
                    placeholder="请输入模型名称" 
                    size="large"
                  />
                </div>
              </div>
            </a-modal>
          </div>
          <!--/router-link-->
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import {ProfileOutlined,LoadingOutlined} from "@ant-design/icons-vue";
import axios from "axios"
export default {
  inject:['reload'],
  data() {
    return {
      taskList:[["二分类","多分类","回归"],["Binary","Multiclass","Regression"]],
      selectedTask:"",
      fields:[],
      model_list:[],
      model_list_fitting:[],
      selectModel:"",
      modelName:"",
      modelDesc:"",
      tableList: [],
      varList:[],
      visible: [false,false],
      selectVar:[], //双向数据绑定
      selectDataSet:[], //双向数据绑定
      selectedFile:"",
      selectedPreField:"",
      confirmLoading: [false,false],

      modelInfo:{},
    };
  },
  components: {
    ProfileOutlined,
    LoadingOutlined,
  },
  mounted () {
    this.getModelList();
    this.getModelListFitting();
    this.getFileList();
  },
  
  methods: {
    async getModelList(){
      await axios.get(this.$store.state.base_url + "/api/getModelList",{params:{'name':this.$store.state.userName,'industry':this.$store.getters.getSystemTitle}})
        .then(res=>{
          //alert(res.data);
          this.model_list = res.data;
        })
    },
    async getModelListFitting(){
      await axios.get(this.$store.state.base_url + "/api/getModelListFitting",{params:{'name':this.$store.state.userName,'industry':this.$store.getters.getSystemTitle}})
        .then(res=>{
          //alert(res.data);
          this.model_list_fitting = res.data;
        })
    },
    async deleteModel(){
      if(this.selectModel == ""){
        alert("请先选择模型");
      }
      else{
        await axios.get(this.$store.state.base_url + "/api/deleteModel",{params:{'name':this.$store.state.userName,'model_name':this.selectModel}})
        .then(res=>{
          alert(res.data);
          this.reload();
        })
      }
    },
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
    async generateModel(){
      const formData = new FormData();
      formData.append('name',this.$store.state.userName);
      formData.append('file_name',this.selectedFile);
      formData.append('model_name',this.modelName);
      formData.append('model_desc',this.modelDesc);
      formData.append('preField',this.selectedPreField);
      formData.append('industry',this.$store.getters.getSystemTitle);
      if(this.selectedTask == "二分类" || this.selectedTask == "Binary"){
        formData.append('task_type',"binary");
      }
      if(this.selectedTask == "多分类" || this.selectedTask == "Multiclass"){
        formData.append('task_type',"multiclass");
      }
      if(this.selectedTask == "回归" || this.selectedTask == "Regression"){
        formData.append('task_type',"regression");
      }
      for(let i = 0; i < this.fields.length; i++){
        formData.append('fieldsList[]',this.fields[i]);
      }
      await axios.post(this.$store.state.base_url + "/api/generateModel",formData)
        .then(res=>{
          alert(res.data);
          this.reload();
      },(res) => {
        alert("保存失败，请检查名称是否含有非法字符");
      });
    },
    async getModelInfo(){
      const formData = new FormData();
      formData.append('name',this.$store.state.userName);
      formData.append('model_name',this.selectModel);
      await axios.post(this.$store.state.base_url + "/api/getModelInfo",formData)
        .then(res=>{
          // alert(res.data);
          this.modelInfo = res.data;
          console.log("模型信息");
          console.log(this.modelInfo);
          this.showModal(1)
      });
    },
    modelSelect(item){
      this.selectModel = item.key;
    },
    getDetail(){
      if(this.selectModel == ""){
        alert("请先选择模型");
      }
      else{
        this.getModelInfo();
      }
    },
    dataSetChange(value){
      this.selectedFile = value;
      if(this.selectedFile.length != 0){
        this.loadFields();
      }
    },
    preFieldChange(value){
      this.selectedPreField = value;
    },
    showModal(n) {
      if(n == 0){
        this.visible[n] = true;
      }
      if(n==1){
        this.visible[n] = true;
      }
      
    },
    handleOk(n) {
      if(n==0){
        if(this.modelName.length == 0 || this.selectedFile.length == 0 || this.selectedPreField.length == 0 || this.selectedTask.length == 0){
          if(this.selectedFile.length == 0){
            alert("请选择数据集");
            return;
          }
          if(this.selectedTask.length == 0){
            alert("请选择任务类型");
            return;
          }
          if(this.selectedPreField.length == 0){
            alert("请选择预测目标");
            return;
          }
          if(this.modelName.length == 0 ){
            alert("请输入模型名称");
            return;
          }
        }
        else{
          this.ModalText = "The modal will be closed after two seconds";
          this.confirmLoading[0] = true;
          this.generateModel();
          setTimeout(() => {
            this.visible[0] = false;
            this.confirmLoading[0] = false;
            alert("模型生成中");
            this.reload();
          }, 2000);
        }
      }
      if(n==1){
        this.visible[0] = false;
      }
      
    },
    handleCancel(n) {
      console.log("Clicked cancel button");
      this.visible[n] = false;
    },
  },
};
</script>

<style lang="scss">
</style>