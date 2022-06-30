<template>
  <a-layout>
    <a-layout-sider width="250px" style="background: #fff">
      <!--hr /-->
      <div style="display: table; width: 100%; margin-top:20px;height: 20px">
        <div
          style="
            float: left;
            width: 25%;
            margin: 10px 0 0 0;
            padding-left:10px;
          "
        >
          <h3 style="font-weight: bolder">{{$store.getters.getSystemLanguage === 0?"工作表":"Sheet"}}</h3>
        </div>
        <div
          style="
            float: right;
            width: 27%;
            margin: 5px 0 0 0;
          "
        >
          <a-button
            @click="deleteItem"
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
            width: 27%;
            margin: 5px 0 0 0;
          "
        >
          <a-dropdown :placement="bottomCenter" :trigger="['click']">
            <a-button style="
              background-color: white;
              color: gray;
              width: 60px;
              height: 30px;
              border: 1px solid #e7e7e7;
              cursor: pointer;
            "
            >
              {{$store.getters.getSystemLanguage === 0?"添加":"Add"}}
            </a-button>
            <template #overlay>
              <a-menu @click="handleClick">
                <a-menu-item key="Excel">
                  {{$store.getters.getSystemLanguage === 0?"从Excel文件拉取":"Excel"}}
                  <div>
                    <a-modal
                      width="700px"
                      :visible="modalVisible[0]"
                      :dialog-style="{ top: '150px' }"
                      :confirm-loading="confirmLoading[0]"
                      @ok="handleOk(0)"
                      @cancel="handleCancel(0)"
                      ok-text="OK"
                      cancel-text="Cancel"
                    >
                      <template v-slot:title> <strong>{{$store.getters.getSystemLanguage === 0?"从Excel文件拉取":"Select Files from Data Source"}}</strong> </template>
                      
                        <div style="width: 650px; height: 150px; background: #fff">
                          <span style="font-size: 16px;"><strong>{{$store.getters.getSystemLanguage === 0?"文件选择 :":"Files :"}}</strong></span>
                          <a-select
                            mode="multiple"
                            style="
                              width: 500px;
                              text-align: left;
                              margin: 10px 0 0 20px;
                              color: green;
                            "
                            placeholder="选择文件"
                            @change="handleChange"
                            v-model:value="selectBox"
                            size="large"
                          >
                            <a-select-option
                              v-for="value in excelFileList"
                              :key="value"
                              :value="value"
                              >{{ value }}
                            </a-select-option>
                          </a-select>
                        </div>
                      
                      <!--div style="height: 300px; text-align: center">
                        选择Excel
                      </div-->
                    </a-modal>
                  </div>
                </a-menu-item>
                <a-menu-item key="MySQL">
                  MySQL
                  <div>
                    <a-modal
                      width="750px"
                      :visible="modalVisible[1]"
                      :dialog-style="{ top: '100px' }"
                      :confirm-loading="confirmLoading[1]"
                      @ok="handleOk(1)"
                      @cancel="handleCancel(1)"
                      ok-text="确认"
                      cancel-text="取消"
                    >
                      <template v-slot:title> <strong>从MySQL数据库抽取</strong> </template>
                      <div style="height: 400px; background: #fff">
                        <div>
                          <span style="font-size:16px"><strong>当前连接实例:</strong></span>
                          <a-select
                            placeholder="选择连接实例"
                            style="width: 70%;margin-left:30px;"
                            allowClear="true"
                            size="large"
                            v-model:value="mysqlConnectionBind"
                            @change="mysqlConnectionChange"
                          >
                            <a-select-option v-for="item in mysqlList" :key="item">
                              {{ item }}
                            </a-select-option>
                          </a-select>
                        </div>

                        <div>
                          <span style="font-size:16px"><strong>生成的文件名:</strong></span>
                          <a-input
                            v-model:value="tablestofile_name" 
                            style="
                              width: 70%;
                              text-align:left;
                              margin-left:30px;
                              margin-top:20px;
                            " 
                            placeholder="生成的文件名" 
                            size="large"
                          />
                        </div>

                        <div>
                          <span style="font-size:16px"><strong>当前数据库表:</strong></span>
                          <a-select
                            mode="multiple"
                            style="
                              width: 70%;
                              text-align: left;
                              margin-left:30px;
                              margin-top:20px;
                            "
                            placeholder="数据表选择,选择框失去焦点后确认选择"
                            @change="tableChange"
                            @blur="confirmSelect(0)"
                            allowClear="true"
                            v-model:value="tablesSelectBind"
                            size="large"
                          >
                            <a-select-option
                              v-for="value in databaseTableList"
                              :key="value"
                              :value="value"
                              >{{ value }}</a-select-option
                            >
                          </a-select>
                        </div>

                        <div 
                          style="
                            height:220px;
                            margin-top:20px;
                            margin-bottom:10px;
                            background:#fff;
                            overflow:auto
                          "
                        >
                            <div v-for="i in tablesCnt" :key="i">
                              <div>
                                <div><span style="font-size:16px"><strong>数据表{{selectedTableList_blur[i-1]}}:</strong></span></div>
                                <a-select
                                  mode="multiple"
                                  style="
                                    width: 89%;
                                    text-align:left;
                                    margin-top:20px;
                                    margin-bottom:15px;
                                  "
                                  v-model:value="selectedTablesFields[i-1]"
                                  placeholder="数据表字段选择,为空时抽取整表"
                                  size="large"
                                >
                                  <a-select-option
                                    v-for="value in tables_fields[selectedTableList_blur[i-1]]"
                                    :key="value"
                                    :value="value"
                                  >{{ value }}
                                  </a-select-option>
                                </a-select>
                              </div>
                            </div>
                        </div>
                      </div>
                    </a-modal>
                  </div>
                </a-menu-item>

                <a-menu-item key="Influxdb">
                  Influxdb
                  <div>
                    <a-modal
                      width="750px"
                      :visible="modalVisible[2]"
                      :dialog-style="{ top: '100px' }"
                      :confirm-loading="confirmLoading[2]"
                      @ok="handleOk(2)"
                      @cancel="handleCancel(2)"
                      ok-text="确认"
                      cancel-text="取消"
                    >
                      <template v-slot:title> <strong>从Influxdb数据库抽取</strong> </template>
                      <div style="height: 400px; background: #fff">
                        <div>
                          <span style="font-size:16px"><strong>当前连接实例:</strong></span>
                          <a-select
                            placeholder="选择连接实例"
                            style="width: 70%;margin-left:30px;"
                            allowClear="true"
                            size="large"
                            v-model:value="influxdbConnectionBind"
                            @change="influxdbConnectionChange"
                          >
                            <a-select-option v-for="item in influxdbList" :key="item">
                              {{ item }}
                            </a-select-option>
                          </a-select>
                        </div>

                        <div>
                          <span style="font-size:16px"><strong>生成的文件名:</strong></span>
                          <a-input
                            v-model:value="measurementstofile_name" 
                            style="
                              width: 70%;
                              text-align:left;
                              margin-left:30px;
                              margin-top:20px;
                            " 
                            placeholder="生成的文件名" 
                            size="large"
                          />
                        </div>

                        <div>
                          <span style="font-size:16px"><strong>当前Measurement:</strong></span>
                          <a-select
                            mode="multiple"
                            style="
                              width: 65%;
                              text-align: left;
                              margin-left:30px;
                              margin-top:20px;
                            "
                            placeholder="Measurement选择,选择框失去焦点后确认选择"
                            @change="measurementChange"
                            @blur="confirmSelect(1)"
                            allowClear="true"
                            v-model:value="measurementsSelectBind"
                            size="large"
                          >
                            <a-select-option
                              v-for="value in databaseMeasurementList"
                              :key="value"
                              :value="value"
                              >{{ value }}</a-select-option
                            >
                          </a-select>
                        </div>

                        <div 
                          style="
                            height:220px;
                            margin-top:20px;
                            margin-bottom:10px;
                            background:#fff;
                            overflow:auto
                          "
                        >
                            <div v-for="i in measurementsCnt" :key="i">
                              <div>
                                <div><span style="font-size:16px"><strong>Measurement {{selectedMeasurementList_blur[i-1]}}:</strong></span></div>
                                <a-select
                                  mode="multiple"
                                  style="
                                    width: 89%;
                                    text-align:left;
                                    margin-top:20px;
                                    margin-bottom:15px;
                                  "
                                  v-model:value="selectedMeasurementFields[i-1]"
                                  @blur="getRecordCnt(1)"
                                  placeholder="Measurement字段选择,为空时抽取整表,选择框失去焦点时确认"
                                  size="large"
                                >
                                  <a-select-option
                                    v-for="value in measurements_fields[selectedMeasurementList_blur[i-1]]"
                                    :key="value"
                                    :value="value"
                                  >{{ value }}
                                  </a-select-option>
                                </a-select>
                              </div>
                              <div>
                                <span style="font-size:16px"><strong>输入抽取的数据条数(共有{{recordCntAll}}条数据):</strong></span>
                                <a-input
                                  v-model:value="recordCnt" 
                                  style="
                                    width: 80%;
                                    text-align:left;
                                    margin-top:20px;
                                  " 
                                  placeholder="输入抽取的数据行数,为空时默认不超过1500条,少于1500条则全部抽取" 
                                  size="large"
                                />
                              </div>
                            </div>
                        </div>
                      </div>
                    </a-modal>
                  </div>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          
        </div>
      </div>
      <a-menu mode="vertical" style="height: 95%" @click="loadData"> 
        <a-menu-item v-for="item in fileList" :key="item" style="height:35px;padding-left:20px;"> <FileOutlined />&nbsp; {{item}} </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout-content :style="{ minHeight: '200px', background: '#fff' }">
      <div v-if="spinning == true"><a-spin :spinning="spinning" tip="数据加载中..."></a-spin></div>
      <div
        style="
          width: 97%;
          height: 500px;
          margin: 30px 20px 0 20px;
          background: #fff;
          border: 1px solid #e7e7e7;
          
        "
      >
        <a-table
          :data-source="data"
          :columns="columns"
          :pagination="pagination"
          :showHeader="true"
          bordered="true"
          :scroll="{y: 520 }"
        >
          <template
            #filterDropdown="{
              setSelectedKeys,
              selectedKeys,
              confirm,
              clearFilters,
              column,
            }"
          >
            <div style="padding: 8px">
              <a-input
                ref="searchInput"
                :placeholder="`检索 ${column.dataIndex}`"
                :value="selectedKeys[0]"
                style="width: 188px; margin-bottom: 8px; display: block"
                @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex,clearFilters)"
              />
              <a-button
                type="primary"
                size="small"
                style="width: 90px; margin-right: 8px"
                @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
              >
                <template #icon><SearchOutlined /></template>
                {{$store.getters.getSystemLanguage === 0?"搜索":"Search"}}
              </a-button>
              <a-button
                size="small"
                style="width: 90px"
                @click="handleReset(clearFilters)"
              >
                {{$store.getters.getSystemLanguage === 0?"重置":"Reset"}}
              </a-button>
            </div>
          </template>
          <template #filterIcon="filtered">
            <search-outlined
              :style="{ color: filtered ? '#108ee9' : undefined }"
            />
          </template>
          <template #customRender="{ text, column }">
            <span v-if="searchText && searchedColumn === column.dataIndex">
              <template
                v-for="(fragment, i) in text
                  .toString()
                  .split(
                    new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')
                  )"
              >
                <mark
                  v-if="fragment.toLowerCase() === searchText.toLowerCase()"
                  class="highlight"
                  :key="i"
                >
                  {{fragment}}
                </mark>
                <template v-else>{{fragment}}</template>
              </template>
            </span>
            <template v-else>
              {{ text }}
            </template>
          </template>
        </a-table>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { inject, defineComponent, reactive, ref, toRefs } from "vue";
import { FileOutlined, SearchOutlined } from "@ant-design/icons-vue";
import axios from "axios";

export default {
  inject:['reload'],
  data() {
    return {
      datashow: false,

      modalVisible: [false,false],
      confirmLoading: [false,false],

      //从工作表选择
      selectedFileList:[],
      excelFileList:[],
      fileList:[],
      selectBox:[],
      fileNameStr:"",


      //返回的记录数
      recordCntAll:"0",
      recordCnt:"",

      mysqlList:[],
      selectedMysqlConnection:"",
      databaseTableList:[],
      selectedTableList:[],
      selectedTableList_blur:[],
      tables_fields:{},
      tables_fields_to_file:{},//用于生成表格文件的数据表及其字段
      selectedTablesFields:[],  //选择的数据表字段
      tablesCnt:0, //表格个数


      //双向数据绑定，用于清空
      tablestofile_name:"",
      mysqlConnectionBind:"",
      tablesSelectBind:[],


      //influxdb
      influxdbList:[],
      selectedInfluxdbConnection:"",
      databaseMeasurementList:[],
      selectedMeasurementList:[],
      selectedMeasurementList_blur:[],
     
      measurements_fields:{},
      measurements_fields_to_file:{},//用于生成表格文件的数据表及其字段
      selectedMeasurementFields:[],  //选择的数据表字段
      measurementsCnt:0, //表格个数


      //双向数据绑定，用于清空
      measurementstofile_name:"",
      influxdbConnectionBind:"",
      measurementsSelectBind:[],


      //表格参数
      selectedItem:"",
      data: [],
      columns: [],
      dataHeader: {},
      searchInput:null,
      searchText: "",
      searchedColumn: "",
      tableWidth: 1200,
      varIndex:"",
      varList:[],



      //加载
      spinning:false,
      delayTime:10,

      //表格分页
      pagination: {
        pageSize: 20,
        current: 1,
        total: "this.data.length",
        hideOnSinglePage: false,
        showQuickJumper: true,
        showSizeChanger: false,
        pageSizeOptions: ["5", "10", "30"],
        onShowSizeChange: (current, pagesize) => {
          this.pagination.current = current;
          this.pagination.pageSize = pagesize;
        },
        onChange: (current) => {
          this.pagination.current = current;
        },
        showTotal: (total) => `共${total}条`,
      },
    };
  },
  components: {
    FileOutlined,
    SearchOutlined,
  },
  mounted () {
    this.getFileList(); //获取工作表列表
  },
  methods: {
    async getExcelFileList(){ //获取数据源中的Excel文件列表
      await axios.get(this.$store.state.base_url + "/api/getFileName",{params:{'name':this.$store.state.userName}})
        .then(res=>{
        this.excelFileList = res.data;
      });
    },
    async getConnList(){
      await axios.get(this.$store.state.base_url + "/api/getConnectName",{params:{'name':this.$store.state.userName}})
      .then(res=>{
        this.mysqlList = res.data['mysql'];
        this.influxdbList = res.data['influxdb'];
      });
    },
    async getDatabaseTableList(){
      await axios.get(this.$store.state.base_url + "/api/getDatabaseTableList",{params:{'name':this.$store.state.userName,'databaseConnection':this.selectedMysqlConnection}})
      .then(res=>{
        this.databaseTableList = res.data;
      });
    },
    async getMeasurementsList(){
      await axios.get(this.$store.state.base_url + "/api/getMeasurementsList",{params:{'name':this.$store.state.userName,'databaseConnection':this.selectedInfluxdbConnection}})
      .then(res=>{
        this.databaseMeasurementList = res.data;
      });
    },
    async getTablesFields(){
      const formData = new FormData();
      formData.append('name',this.$store.state.userName);
      formData.append('databaseConnection',this.selectedMysqlConnection);
      for(let i = 0; i < this.selectedTableList_blur.length; i++){
        formData.append('tableList[]',this.selectedTableList_blur[i]);
      }
      console.log("选中的表格");
      console.log(this.selectedTableList_blur)
      await axios.post(this.$store.state.base_url + "/api/getTablesFields",formData)
      .then(res=>{
        this.tables_fields = res.data;
        console.log("表格字段返回");
        console.log(this.tables_fields);
      });
    },
    async getMeasurementsFields(){
      const formData = new FormData();
      formData.append('name',this.$store.state.userName);
      formData.append('databaseConnection',this.selectedInfluxdbConnection);
      for(let i = 0; i < this.selectedMeasurementList_blur.length; i++){
        formData.append('measurementList[]',this.selectedMeasurementList_blur[i]);
      }
      await axios.post(this.$store.state.base_url + "/api/getMeasurementsFields",formData)
      .then(res=>{
        this.measurements_fields = res.data;
        console.log("度量字段返回");
        //console.log(this.tables_fields);
      });
    },
    async measurementsToFile(){
      const formData = new FormData();
      formData.append('name',this.$store.state.userName);
      formData.append('databaseConnection',this.selectedInfluxdbConnection);
      formData.append('measurements_fields',JSON.stringify(this.measurements_fields_to_file));
      if(this.recordCnt.length == 0){
        this.recordCnt = "1500";
      }
      formData.append('record_cnt',this.recordCnt);
      formData.append('file_name',this.measurementstofile_name);
      await axios.post(this.$store.state.base_url + "/api/measurementsToFile",formData)
      .then(res=>{
        alert(res.data);
        this.reload();
      });
    },
    async getRecordCnt(n){
      if(n == 0){

      }
      if(n == 1){
        this.recordCntAll = 0;
        this.measurements_fields_to_file = {};

        
        for(let i = 0; i < this.selectedMeasurementList.length; i++){
          
          if(this.selectedMeasurementFields[i] === undefined){
            this.measurements_fields_to_file[this.selectedMeasurementList[i]] = ["*"];     //未选择字段抽取整表
          }else if(this.selectedMeasurementFields[i].length == 0){
            this.measurements_fields_to_file[this.selectedMeasurementList[i]] = ["*"];     //未选择字段抽取整表
          }else{
            this.measurements_fields_to_file[this.selectedMeasurementList[i]] = this.selectedMeasurementFields[i];
          }
        }

       
        const formData = new FormData();
        formData.append('name',this.$store.state.userName);
        formData.append('databaseConnection',this.selectedInfluxdbConnection);
        formData.append('measurements_fields',JSON.stringify(this.measurements_fields_to_file));
        //formData.append('file_name',this.measurementstofile_name);
        await axios.post(this.$store.state.base_url + "/api/getMeasurementRecordCnt",formData)
        .then(res=>{
          //alert(res.data);
          this.recordCntAll = res.data;
        });
      }
    },
    async tablesToFile(){
      const formData = new FormData();
      formData.append('name',this.$store.state.userName);
      formData.append('databaseConnection',this.selectedMysqlConnection);
      formData.append('tables_fields',JSON.stringify(this.tables_fields_to_file));
      formData.append('file_name',this.tablestofile_name);
      formData.append('method',"UNION");
      await axios.post(this.$store.state.base_url + "/api/tablesToFile",formData)
      .then(res=>{
        alert(res.data);
        this.reload();
      });
    },
    async addExcelFile(){  //将数据源中的Excel文件添加到工作表
      const formData = new FormData();
      for(let i = 0; i < this.SelectedFileList.length; i++){
        formData.append('xlsxList[]',this.SelectedFileList[i]);
      }
      formData.append('name',this.$store.state.userName);
      await axios.post(this.$store.state.base_url + "/api/addToWorkSheet",formData)
        .then(res=>{
        alert(res.data);
        this.selectBox.length = 0;
        this.getFileList()
        this.reload();
      });
    },
    async getFileList(){ //获取工作表列表
      await axios.get(this.$store.state.base_url + "/api/getCsvFileName",{params:{'name':this.$store.state.userName}})
        .then(res=>{
        this.fileList = res.data;
      });
    },
    async deleteItem(){
      if(this.selectedItem.length != 0){
        await axios.get(this.$store.state.base_url + "/api/delFromWorkSheet",{params:{'name':this.$store.state.userName,'file_name':this.selectedItem}})
          .then(res=>{
          alert(res.data);
        });
        this.reload();
      }else{
        alert("请选择文件");
      }  
    },
    updateColumn() {
      this.columns.splice(0);
      for (var key in this.data[0]) {
        var obj = {};
        this.varList.push(key);
        obj.title = key;
        obj.dataIndex = key;
        obj.key = key;
        obj.width = 200;
        obj.slots = {
          filterDropdown: "filterDropdown",
          filterIcon: "filterIcon",
          customRender: "customRender",
        };
        obj.onFilter = (value, record) => {
          if(record[this.searchedColumn] === null){

          }else{
            return record[this.searchedColumn].toString().toLowerCase().includes(value.toLowerCase());
          }
        }
        obj.onFilterDropdownVisibleChange = visible => {
          if (visible) {
            setTimeout(() => {
              console.log(searchInput.value);
              searchInput.value.focus();
            }, 100);
          }
        },
        this.columns.push(obj);
      }
      this.spinning = false;
    },
    loadData(item) {
      this.spinning = true;
      this.selectedItem = item.key;
      this.pagination.current = 1;
      axios.get(this.$store.state.base_url + "/api/loadWorkSheetFile",{params:{'name':this.$store.state.userName,'file_name':this.selectedItem}})
        .then((res) => {
          this.data = res.data;
          this.updateColumn();
          console.log(this.data);
        });
    },
    showModal(n) { //对话框显示
      this.modalVisible[n] = true;
      if(n == 0){
        this.getExcelFileList();
      }else{
        this.getConnList();
      }
      
    },
    handleClick(item){ //工作表添加方式
       if (item.key == "Excel") {
        this.showModal(0);
      }
      if (item.key == "MySQL") {
        this.showModal(1);
      }
      if (item.key == "Influxdb") {
        this.showModal(2);
      }
    },
    handleOk(n) { //对话框确认
      console.log("点击ok");
      if(n == 0){
        this.modalVisible[n] = false;
        this.addExcelFile();
      }
      if(n == 1){
        if(this.tablestofile_name.length == 0){
          alert("名称不能为空");
          return 0;
        }
        this.modalVisible[n] = false;

        
        this.tables_fields_to_file = {};
        console.log("表个数:");
        console.log(this.selectedTableList.length);
        for(let i = 0; i < this.selectedTableList.length; i++){
          console.log("字段内容");
          console.log(this.selectedTablesFields[i])
          if(this.selectedTablesFields[i] === undefined){
            this.tables_fields_to_file[this.selectedTableList[i]] = ["*"];     //未选择字段抽取整表
          }else if(this.selectedTablesFields[i].length == 0){
            this.tables_fields_to_file[this.selectedTableList[i]] = ["*"];     //未选择字段抽取整表
          }else{
            this.tables_fields_to_file[this.selectedTableList[i]] = this.selectedTablesFields[i];
          }
        }
        console.log("数据表和字段为:");
        console.log(this.tables_fields_to_file);

        this.tablesToFile();
      }
      if(n == 2){
        if(this.measurementstofile_name.length == 0){
          alert("名称不能为空");
          return 0;
        }
        this.modalVisible[n] = false;

        
        this.measurements_fields_to_file = {};
        console.log("表个数:");
        console.log(this.selectedMeasurementList.length);
        for(let i = 0; i < this.selectedMeasurementList.length; i++){
          console.log("字段内容");
          console.log(this.selectedMeasurementFields[i])
          if(this.selectedMeasurementFields[i] === undefined){
            this.measurements_fields_to_file[this.selectedMeasurementList[i]] = ["*"];     //未选择字段抽取整表
          }else if(this.selectedMeasurementFields[i].length == 0){
            this.measurements_fields_to_file[this.selectedMeasurementList[i]] = ["*"];     //未选择字段抽取整表
          }else{
            this.measurements_fields_to_file[this.selectedMeasurementList[i]] = this.selectedMeasurementFields[i];
          }
        }
        console.log("数据表和字段为:");
        console.log(this.measurements_fields_to_file);
        this.measurementsToFile();
      }
    },
    handleCancel(n) { //取消对话框
      console.log("Clicked cancel button");
      this.modalVisible[n] = false;
      if(n==0){
        this.selectBox.length = 0;
      }
      if(n==1){
        this.sqltofile_name = "";
        this.selectedFields = [];
        this.connectionBind = "";
        this.tablesSelectBind = [];
        this.tablesCnt = 0;
        this.selectedTableList_blur = [];
        this.selectedFields = [];
      }
    },
    handleSearchIpt(selectedKeys, confirm, dataIndex, clearFilters) { //表格检索
      console.log("搜索");
      this.searchText = selectedKeys[0];
      this.searchedColumn = dataIndex;
      console.log(this.searchText);
      console.log(this.searchedColumn);
      confirm();
    },
    handleSearch(selectedKeys, confirm, dataIndex) { //表格检索
      console.log("搜索");
      this.searchText = selectedKeys[0];
      this.searchedColumn = dataIndex;
      console.log(this.searchText);
      console.log(this.searchedColumn);
      confirm();
    },
    handleChange(value){ //Excel文件选择
      this.SelectedFileList = value;
      console.log(this.SelectedFileList);
      console.log(this.SelectedFileList.length);
    },
    handleReset(clearFilters) {//重置过滤后的表格
      clearFilters();
      this.searchText = "";
    },
    mysqlConnectionChange(value){
      this.selectedMysqlConnection = value;
      this.databaseTableList = [];
      if(this.selectedMysqlConnection.length != 0){ 
        this.getDatabaseTableList();
      }
    },
    influxdbConnectionChange(value){
      this.selectedInfluxdbConnection = value;
      this.databaseMeasurementList = [];
      if(this.selectedInfluxdbConnection.length != 0){ 
        this.getMeasurementsList();
      }
    },
    tableChange(value){
      console.log("value值"+ value)
      this.selectedTableList = value;
      console.log("表格个数"+ this.selectedTableList.length);
      console.log(this.selectedTableList);
    },
    measurementChange(value){
      this.selectedMeasurementList = value;
      console.log("11111")
      console.log(this.selectedMeasurementList);
    },
    //表格选择框失去焦点回调，异步请求每个表格的字段
    confirmSelect(n){
      if(n == 0){
        this.tablesCnt = this.selectedTableList.length;
        this.selectedTableList_blur = this.selectedTableList;
        console.log("确认选择");
        if(this.tablesCnt != 0){
          this.getTablesFields();
        }
        //this.tables_fields
      }
      if(n == 1){
        this.measurementsCnt = this.selectedMeasurementList.length;
        this.selectedMeasurementList_blur = this.selectedMeasurementList;
        for(let i = 0;i<this.selectedMeasurementList.length;i++){
          this.selectedMeasurementFields[i] = [];
        }
        if(this.measurementsCnt!=0){
          this.getRecordCnt(1);
          this.getMeasurementsFields();
        }
      }
    },
  },
};
</script>

<style lang="scss">
</style>