<template>
  <a-layout style="background: #fff">
    <a-layout-sider width="250" style="background: #fff">
      <div style="display: table; margin-top:20px;width: 250px">
        <h3 style="float: left; margin: 10px 0 0 10px; font-weight: bolder">
          {{$store.getters.getSystemLanguage === 0?"当前表格:":"Sheet:"}}
        </h3>
        <div style="float: right; width: 60%; padding: 2px">
          <div style="margin: 5px 0 20px 0">
            <a-select
              placeholder="表格数据选择"
              style="width: 140px"
              allowClear="true"
              @change="handleChange"
            >
              <a-select-option v-for="item in tableList" :key="item">
                {{ item }}
              </a-select-option>
            </a-select>
          </div>
        </div>
      </div>
      <div style="width:100%;height:2px;border-bottom: 2px solid gray;"></div>
      <div style="display: table; width: 100%; height: 20px">
        <div style="float: left; width: 40%; margin: 10px 0 0 0">
          <h3 style="font-weight: bolder">{{$store.getters.getSystemLanguage === 0?"可视化图表:":"Result List"}}</h3>
        </div>
        <div style="float: right; width: 25%; margin: 10px 15px 0 0">
          <a-button
            @click="deleteVisualItem"
            style="
              background-color: white;
              color: gray;
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
        @click="visualLoad"
      >
        <a-menu-item v-for="item in visualAnsList" :key="item" style="height:35px;padding-left:20px;">
          <BarChartOutlined />&nbsp;{{ item }}
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout-content
      :style="{ minHeight: '200px', width: '1000px', background: '#fff' }"
    >
      <div style="margin: 5px 5px 5px 5px">
        <div
          style="
            height: 77px;
            width: 100%;
            backgroud: #d3d3d3;
            box-shadow: 0 0 9px 3px #fff;
            overflow:auto;
          "
        >
          <div style="width: 100%;height:75px;display:table;">
            <div style="float:left;width:70%;">
              <span style="font-size: 18px; font-weight: bolder">{{$store.getters.getSystemLanguage === 0?"选择变量:":"Fields(Y Axis)"}}</span>
              <a-select
                mode="multiple"
                style="
                  width: 80%;
                  text-align: left;
                  margin: 10px 0 0 20px;
                  color: green;
                "
                placeholder="变量选择"
                @change="varChange"
                allowClear="true"
                v-model:value="selectBind"
                size="large"
              >
                <a-select-option
                  v-for="value in varList"
                  :key="value"
                  :value="value"
                  >{{ value }}</a-select-option
                >
              </a-select>
            </div>
            <div style="float:right;width:30%;">
              <span style="font-size: 18px; font-weight: bolder">{{$store.getters.getSystemLanguage === 0?"选择横轴:":"X Axis"}}</span>
              <a-select
                style="
                  width: 70%;
                  text-align: left;
                  margin: 10px 0 0 20px;
                  color: green;
                "
                placeholder="横轴选择"
                allowClear="true"
                @change="xAsixChange"
                v-model:value="selectedXAsixBind"
                size="large"
              >
                <a-select-option
                  v-for="value in varList"
                  :key="value"
                  :value="value"
                  >{{ value }}</a-select-option
                >
              </a-select>
            </div>
          </div>
        </div>
        <div style="width:100%;height:2px;border-bottom: 2px solid gray;"></div>
        <div style="height:10px;">
          <div style="float: right; width: 15%; margin: 15px 0 0 0">
            <a-button
              @click="clearArea"
              style="
                background-color: white;
                color: gray;
                margin: 0 10px 0 0;
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
                height: 32px;
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
                  <div style="height: 20px"><strong>{{$store.getters.getSystemLanguage === 0?"保存可视化结果":"Save Visualization"}}</strong></div>
                </template>
                <div
                  style="
                    height: 250px;
                    background: #fff;
                  "
                >
                  <div style="margin:20px 0 0 20px">
                    <span style="font-size:18px;font-weight: bolder">{{$store.getters.getSystemLanguage === 0?"可视化名称:":"Name"}}</span>
                    <a-input
                      v-model:value="visualName" 
                      style="width: 80%;text-align:left;margin:10px 0 0 20px" 
                      placeholder="请输入要保存的可视化结果名称" 
                      size="large"
                    />
                  </div>
                  <div style="margin:20px 0 0 20px">
                    <span style="font-size:18px;font-weight: bolder">{{$store.getters.getSystemLanguage === 0?"可视化标题:":"Title"}}</span>
                    <a-input
                      v-model:value="visualTitle" 
                      style="width: 80%;text-align:left;margin:10px 0 0 20px" 
                      placeholder="请输入标题内容,生成报告时作为标题" 
                      size="large"
                    />
                  </div>
                  <div style="margin:20px 0 0 20px">
                    <span style="font-size:18px;font-weight: bolder">{{$store.getters.getSystemLanguage === 0?"可视化描述:":"Description"}}</span>
                    <a-input
                      v-model:value="visualDesc" 
                      style="width: 80%;text-align:left;margin:10px 0 0 20px" 
                      placeholder="请输入描述内容,生成报告时作为描述" 
                      size="large"
                    />
                  </div>
                </div>
              </a-modal>
            </div>
          </div>
        </div>
        <div
          style="
            margin: 50px 0 0 0;
            height: 560px;
            padding-left:20px;
            padding-right:20px;
            width: 100%;
          "
        >
          <!--:style="{ width: '100%', height: '530px',background:'rgb(231,235,238)'}"-->
          <div
            ref="myChart"
            id="myChart"
            :style="{ width: '100%', height: '530px'}"
          ></div>
        </div>
      </div>
    </a-layout-content>
    <a-layout-sider width="130" style="background: #fff">
      <div
        style="
          margin: 5px 0 0 0;
          height: 100%;
          width: 128px;
          backgroud: #d3d3d3;
        "
      >
        <a-card style="height:100%;font-family:黑体;background: rgba(241, 242, 244,0.5)" headStyle="" bodyStyle="">
          <template v-slot:title>
            <span style="font-size:15px;color:#108ee9;"><strong>{{$store.getters.getSystemLanguage === 0?"可视化图例":"Charts"}}</strong></span>
          </template>
          <a-card-grid @click="draw(1)" style="width: 100%;cursor: pointer; text-align: center"><strong><LineChartOutlined />&nbsp;{{$store.getters.getSystemLanguage === 0?"曲线图":"SLine"}}</strong></a-card-grid>
          <a-card-grid @click="draw(2)" style="width: 100%;cursor: pointer; text-align: center"><strong><LineChartOutlined />&nbsp;{{$store.getters.getSystemLanguage === 0?"折线图":"Line"}}</strong></a-card-grid>
          <a-card-grid @click="draw(3)" style="width: 100%;cursor: pointer; text-align: center"><strong><BarChartOutlined />&nbsp;{{$store.getters.getSystemLanguage === 0?"柱状图":"Bar"}}</strong></a-card-grid>
          <a-card-grid @click="draw(4)" style="width: 100%;cursor: pointer; text-align: center"><strong><DotChartOutlined />&nbsp;{{$store.getters.getSystemLanguage === 0?"散点图":"scatter"}}</strong></a-card-grid>
          <a-card-grid @click="draw(5)" style="width: 100%;cursor: pointer; text-align: center"><strong><BoxPlotOutlined />&nbsp;{{$store.getters.getSystemLanguage === 0?"箱线图":"Boxplot"}}</strong></a-card-grid>
          <a-card-grid @click="draw(6)" style="width: 100%;cursor: pointer; text-align: center"><strong><DotChartOutlined />&nbsp;{{$store.getters.getSystemLanguage === 0?"散点矩阵":"Scatter Matrix"}}</strong></a-card-grid>
          <a-card-grid @click="draw(7)" style="width: 100%;cursor: pointer; text-align: center"><strong><PauseOutlined />&nbsp;{{$store.getters.getSystemLanguage === 0?"平行坐标":"Parallel"}}</strong></a-card-grid>
        </a-card>
      </div>
    </a-layout-sider>
  </a-layout>
</template>

<script>
import { BarChartOutlined, ConsoleSqlOutlined,DotChartOutlined,LineChartOutlined,BoxPlotOutlined,PauseOutlined } from "@ant-design/icons-vue";
import * as echarts from "echarts";
import {prepareBoxplotData} from "echarts/extension/dataTool/index";

import axios from "axios";

export default {
  inject:['reload'],
  data() {
    return {
      modalVisible:false,
      confirmLoading: false,
      visualName:"",
      //showType: "",
      //issmooth: "",
      option: {},
      visualTitle:"",
      visualDesc:"",
      saveFlag:false,
      selectedVisualItem:"",
      selectBind:[],
      selectVar: [],
      statList: [],
      tableList: [],
      selectedFile:"",
      visualAnsList: [],
      varList:[],
      selectedXAsix:"",
      selectedXAsixBind:"",
      dataFrame:Object,
    };
  },
  components: {
    BarChartOutlined,
    DotChartOutlined,
    LineChartOutlined,
    BoxPlotOutlined,
    PauseOutlined
  },
  mounted () {
    this.getFileList();
    this.getVisualList();
  },
  methods: {
    async getFileList(){ //获取加工台数据表列表
      await axios.get(this.$store.state.base_url + "/api/getProcessFileName",{params:{'name':this.$store.state.userName}})
        .then(res=>{
        this.tableList = res.data;
      });
    },
    async loadData(){
      await axios.get(this.$store.state.base_url + "/api/loadFileForVisual",{params:{'name':this.$store.state.userName,'file_name':this.selectedFile}})
        .then(res=>{
        this.dataFrame = res.data;
        console.log("数据返回")
        console.log(this.dataFrame);
        this.varList.length = 0;
        for(var key in this.dataFrame){
            this.varList.push(key);
        }
      });
    },
    async getVisualList(){
      await axios.get(this.$store.state.base_url + "/api/getVisualList",{params:{'name':this.$store.state.userName,'industry':this.$store.getters.getSystemTitle}})
        .then(res=>{
        this.visualAnsList = res.data;
      });
    },
    async deleteVisualItem() {//删除可视化结果
      if(this.selectedVisualItem.length == 0){
        alert("请先选择图表项");
      }else{
        await axios.get(this.$store.state.base_url + "/api/deleteVisualItem",{params:{'name':this.$store.state.userName,'visual_file_name':this.selectedVisualItem}})
          .then(res=>{
            alert(res.data);
            this.reload();
        });
      }
    },
    async saveVisual() {//保存可视化结果
      if(this.saveFlag){
        let ans = {};
        ans["title"] = this.visualTitle;
        ans["desc"] = this.visualDesc;
        ans["option"] = this.option
        const formData = new FormData();
        formData.append('name',this.$store.state.userName);
        formData.append('visual_file_name',this.visualName);
        formData.append('industry',this.$store.getters.getSystemTitle);
        console.log(this.option);
        formData.append('visualAns',JSON.stringify(ans))
        await axios.post(this.$store.state.base_url + "/api/saveVisual",formData)
          .then(res=>{
            alert(res.data);
            this.reload();
            this.saveFlag = false;
        },(res) => {
            alert("保存失败，请检查名称是否含有非法字符");
          }
        );
      }
      else{
        alert("请先选择图表选项进行可视化");
      }
    },
    clearArea() {//清空区域
      const dom = this.$refs["myChart"];
      const myChart = echarts.init(dom);
      myChart.clear();
      this.selectBind = [];
      this.selectVar = [];
      this.selectedXAsixBind = [];
      this.option = {};
      this.saveFlag = false;
    },
    handleChange(value) {//表格数据切换
      this.selectedFile = "";
      this.selectedFile = value;
      console.log(`选中文件${this.selectedFile}`);
      if(this.selectedFile){
        this.loadData();
      }else{
        this.varList.length = 0;
      }
    },
    varChange(value) {//可视化变量选择
      
      console.log(value);
      this.selectVar = value;
      console.log(this.selectVar);
    },
    xAsixChange(value){
      this.selectedXAsix = value;
    },
    draw(num) {
      if(this.selectVar.length == 0){
        alert("请先选择变量")
        return 0;
      }
      this.saveFlag = true;
      const dom = this.$refs["myChart"]; // 获取dom节点
      const myChart = echarts.init(dom); // 初始化echarts实例

      let dataSet = [];   //数据集,二维数组
      let dataSetItem = [];  //数据集中的某一列值
      let xAsix = "";
      let xAxisData = [];

      for(let item in this.selectVar){
        let fieldSeries = this.dataFrame[this.selectVar[item]]   //整列值
        for(let key in fieldSeries){
            dataSetItem.push(fieldSeries[key]);
        }
        dataSet.push(dataSetItem)
        dataSetItem = []
      }
      
      xAsix = this.selectedXAsix;
      for(let key in this.dataFrame[xAsix]){
        xAxisData.push(this.dataFrame[xAsix][key]);
      }
      console.log("数据集")
      console.log(dataSet);


      console.log(this.selectedXAsix);
      console.log(`横轴${xAsix}`)
      console.log(xAxisData)


      this.option = {};
      if (num == 1 || num == 2 || num == 3 || num == 4) {
        let dataSetItemIndex = 0;
        var series = [];
        var legend = [];
        let showType = ["line","line","bar","scatter"];
        let showSmooth = [true,false,false,false];
        for(let item in this.selectVar){
          let obj = {};
          obj.name = this.selectVar[item];
          obj.data = dataSet[dataSetItemIndex]
          obj.type =  showType[num-1],
          //obj.seriesLayoutBy = 'row',
          obj.smooth = showSmooth[num-1]
          series.push(obj)
          dataSetItemIndex = dataSetItemIndex + 1;
          legend.push(this.selectVar[item])
        }
        console.log("series")
        console.log(series);
        this.option = {
          tooltip: {
            trigger: "axis",
            axisPointer: { type: "cross" },
          },
          legend:{
            data:legend,
          },
         
          xAxis:{
            name: xAsix,
            type: "category",
            axisTick: {
              alignWithLabel: true,
            },
            data:xAxisData
          },
          yAxis: {
            name:"",
            type: "value",
          },
          series: series,
        };

        console.log("option")
        console.log(this.option)
        myChart.clear();
        myChart.setOption(this.option);
        
      }
      if(num == 5){
        let dataField =[];
        for(let item in this.selectVar){
          dataField.push(this.selectVar[item])
        }
        /*dataSet = [
          [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 930, 650, 760, 810, 1000, 1000, 960, 960],
          [960, 940, 960, 940, 880, 800, 850, 880, 900, 840, 830, 790, 810, 880, 880, 830, 800, 790, 760, 800],
          [880, 880, 880, 860, 720, 720, 620, 860, 970, 950, 880, 910, 850, 870, 840, 840, 850, 840, 840, 840],
          [890, 810, 810, 820, 800, 770, 760, 740, 750, 760, 910, 920, 890, 860, 880, 720, 840, 850, 850, 780],
          [890, 840, 780, 810, 760, 810, 790, 810, 820, 850, 870, 870, 810, 740, 810, 940, 950, 800, 810, 870]
        ]*/
        this.option = {
          title: [
            {
              //text: dataField.join(",") + " 变量盒须图",
              left: '10%',
              textStyle: {
                fontWeight: 'bolder',
                fontSize: 15,
                lineHeight: 15
              },
            },
            /*{
              text: '上边缘: Q3 + 1.5 * IQR \n下边缘: Q1 - 1.5 * IQR',
              borderColor: '#999',
              borderWidth: 1,
              textStyle: {
                fontWeight: 'normal',
                fontSize: 12,
                lineHeight: 15
              },
              left: '10%',
              top: '90%'
            }*/
          ],
          dataset:[
            {
              source:dataSet
            },
            {
              transform: {
                type: 'boxplot',
                config: { itemNameFormatter: '{value}' }
              }
            },
            {
              fromDatasetIndex: 1,
              fromTransformResult: 1
            }
          ],
          tooltip: {
            trigger: 'item',
            axisPointer: {
              type: 'shadow'
            },
            textStyle: {
              fontWeight: 'bolder',
              fontSize: 15,
              lineHeight: 15
            },
          },
          grid: {
            left: '10%',
            right: '10%',
            bottom: '15%'
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: true,
              nameGap: 30,
              slitArea: {
                show: false
              },
              splitLine: {
                show: false
              },
              axisLabel:{
                formatter:'{value}'
              }
            },
            /*{
              type: 'category',
              data:dataField,
            }*/
            
          ],
          yAxis: {
            type: 'value',
            splitArea: {
              show: true
            }
          },
          series: [
            {
              name: 'boxplot',
              type: 'boxplot',
              //data:data_1[0].boxData
              datasetIndex: 1,
              tooltip:{
                  formatter:function(param){
                  return [
                    "boxplot",
                    "名称" + " : " + dataField[param.name],
                    "上限值" + " : " + param.data[5],
                    "Q3" + " : " + param.data[4],
                    "中位数" + " : " + param.data[3],
                    "Q1" + " : " + param.data[2],
                    "下限值" + " : " + param.data[1],

                  ].join("</br>");
                },
              },
            },
            {
              name: 'outlier',
              type: 'scatter',
              datasetIndex: 2,
              //data:data_1[0].outliers
              tooltip:{
                formatter:function(param){
                  return [
                    "outliers",
                    "名称" + " : " + dataField[param.name],
                    "异常值" + " : " + param.data[1],
                  ].join("</br>");
                },
              }
            }
          ],
        }
        myChart.clear();
        myChart.setOption(this.option);
      }
      if(num == 6){
        let dataField =[];
        for(let item in this.selectVar){
          dataField.push(this.selectVar[item])
        }

        //取单个散点图的两列值
        function retrieveScatterData(data, dimX, dimY) {
          let result = [];
          for (let i = 0; i < data[0].length; i++) {
            let item = [data[dimX][i], data[dimY][i]];
            result.push(item);
          }
          return result;
        }
        
        //网格间隙
        const GAP = 3;
        const BASE_LEFT = 12;
        const BASE_TOP = 10;
        //网格宽度与高度
        const GRID_WIDTH = (100 - BASE_LEFT - GAP) / dataSet.length - GAP;
        const GRID_HEIGHT = (100 - BASE_TOP - GAP) / dataSet.length - GAP;
        
        function generateGrids() {
          let index = 0;
          const grid = [];
          const xAxis = [];
          const yAxis = [];
          const series = [];
          for (let i = 0; i < dataSet.length; i++) {
            for (let j = 0; j < dataSet.length; j++) {
              if(dataSet.length -i -1 < j){
                //continue;
              }
              grid.push({
                left: BASE_LEFT + i * (GRID_WIDTH + GAP) + '%',
                top: BASE_TOP + j * (GRID_HEIGHT + GAP) + '%',
                width: GRID_WIDTH + '%',
                height: GRID_HEIGHT + '%'
              });
              xAxis.push({
                name:j === 0?dataField[i]:'',
                //name:index,
                nameLocation:'center',
                nameGap:25,
                splitNumber: dataSet.length,
                position: 'top',
                nameTextStyle: {
                  fontWeight: 'bolder',
                  fontSize:'16px',
                },
                axisLine: {
                  show: true,
                  onZero: false
                },
                axisTick: {
                  show: j === 0,
                  inside: true
                },
                axisLabel: {
                  show: j === 0,
                  align:'center'
                },
                type: 'value',
                gridIndex: index,
                scale: true
              });
              yAxis.push({
                name:i === 0?dataField[j]:'',
                nameLocation:'center',
                nameGap:55,
                nameTextStyle: {
                  fontWeight: 'bolder',
                  fontSize:'16px',
                },
                splitNumber: dataSet.length,
                position: 'left',
                axisLine: {
                  show:true,
                  onZero: false
                },
                axisTick: {
                  show: i === 0,
                  inside: true
                },
                axisLabel: {
                  show: i === 0,
                },
                type: 'value',
                gridIndex: index,
                scale: true
              });
              series.push({
                type: 'scatter',
                xAxisIndex: index,
                yAxisIndex: index,
                symbolSize: 5,
                data: retrieveScatterData(dataSet, i, j)
              });
              index++;
            }
          }
          return {
            grid,
            xAxis,
            yAxis,
            series
          };
        }
        const gridOption = generateGrids();
        this.option = {
          tooltip: {
            trigger: 'item'
          },
          xAxis: gridOption.xAxis,
          yAxis: gridOption.yAxis,
          grid: gridOption.grid,
          series: [
            ...gridOption.series
          ]
        };

        myChart.clear();
        myChart.setOption(this.option);
      }
      if(num == 7){
        let dataField =[];
        
        for(let item in this.selectVar){
          dataField.push(this.selectVar[item])
        }
        
        let schema = [];
        for(let i = 0;i<dataField.length;i++){
          schema.push({
            name:dataField[i],
            index:i,
            text:dataField[i]
          })
        }
        let parallelAxis = [];
        for(let i = 0;i<schema.length;i++){
          if(i == 0){
            parallelAxis.push({
              dim:i,
              name:schema[i].text,
              nameLocation: 'start'
            })
          }
          if(i == schema.length-1 ){
            parallelAxis.push({
              dim:i,
              name:schema[i].text,
              nameLocation: 'start',
              type:"value",
              data:dataSet[dataSet.length-1]
            })
          }
          parallelAxis.push({
            dim:i,
            name:schema[i].text,
          })
        }
        this.option = {
          //backgroundColor: '#333',
          title: [
            {
              text:"平行坐标系",
              //top:'2%',
              left:'1%',
              textStyle: {
                fontWeight: 'bolder',
                fontSize: 15,
                lineHeight: 15
              },
            },
          ],
         
          dataset:[
            {
              source: dataSet,
            }
          ],
          tooltip: {
            trigger: 'item',
            axisPointer: {
              type: 'shadow'
            }
            
          },
          parallelAxis:parallelAxis,
          
          parallel: {
            left: '5%',
            right: '18%',
            bottom: 100,
            parallelAxisDefault: {
              type: 'value',
              name: '55',
              nameLocation: 'end',
              nameGap: 20,
              nameTextStyle: {
                color: '#000',
                fontSize: 12
              },
              axisLine: {
                lineStyle: {
                  color: '#000'
                }
              },
              axisTick: {
                lineStyle: {
                  color: '#000'
                }
              },
              splitLine: {
                show: false
              },
              axisLabel: {
                color: '#000'
              }
            }
          },
          series: [
            {
              name: '数据',
              type: 'parallel',
              seriesLayoutBy: 'row',
              lineStyle:  {
                width: 1,
                opacity: 0.7,
                color: 'green'
              },
              datasetIndex:0,
            }
          ]
        }
        myChart.clear();
        myChart.setOption(this.option);
      }
     
    },
    async visualLoad(item) {
      this.saveFlag = false;
      this.selectedVisualItem = item.key;
      this.option = {};
      const dom = this.$refs["myChart"];
      const myChart = echarts.init(dom);
      await axios.get(this.$store.state.base_url + "/api/getVisualAns",{params:{'name':this.$store.state.userName,'visual_file_name':this.selectedVisualItem}})
      .then((res) => {
        this.option = res.data["option"];
      },(res) => {
        alert("请求失败");
      });
      myChart.clear();
      myChart.setOption(this.option);
    },
    showModal() {
      if(this.selectVar.length == 0){
        alert("请先选择变量进行可视化")
        return 0;
      }
      if(this.saveFlag == false){
        alert("请先选择图表选项进行可视化")
        return 0;
      }
      this.visualName = "",
      this.visualTitle = "",
      this.visualDesc = "",
      this.modalVisible = true;
      console.log("show");
    },
    handleOk(e) {
      // this.confirmLoading = true;
      if(this.visualName.length == 0){
        alert("名称不能为空");
        return 0;
      }else{
        this.saveVisual();
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

<style lang="scss">
</style>