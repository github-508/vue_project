<template>
  <a-layout>
    <a-layout-sider width="250px" style="background: #fff">
      <div style="display: table; width: 100%;margin:10px; height: 20px">
        <div
          style="
            float: left;
            width: 30%;
            margin: 10px 0 0 0;
          "
        >
          <h3 style="font-weight: bolder">{{$store.getters.getSystemLanguage === 0?"我的报告":"MyReport"}}</h3>
        </div>
        <div
          style="
            float: right;
            width: 50%;
            margin-top:10px;
            margin-right:15px;
            display:table;
          "
        >
          <a-button
            @click="deleteReport"
            style="
              background-color: white;
              color: gray;
              padding:0 2px 0 0;
              float: right;
              width: 46%;
              height: 30px;
              border: 1px solid #e7e7e7;
              cursor: pointer;
            "
          >
            {{$store.getters.getSystemLanguage === 0?"删除":"Del"}}
          </a-button>
          <a-button
            @click="showModal(0)"
            style="
              background-color: white;
              color: gray;
              float: left;
              width: 46%;
              height: 30px;
              padding:0 2px 0 0;
              border: 1px solid #e7e7e7;
              cursor: pointer;
            "
          >
            {{$store.getters.getSystemLanguage === 0?"生成":"New"}}
          </a-button>
          <div>
            <a-modal
              width="700px"
              :visible="modalVisible[0]"
              :dialog-style="{ top: '150px' }"
              :confirm-loading="confirmLoading[0]"
              @ok="handleOk(0)"
              @cancel="handleCancel(0)"
              ok-text="Preview"
              cancel-text="Cancel"
            >
              <template v-slot:title> <strong>{{$store.getters.getSystemLanguage === 0?"报告内容选择":"Select Report Content"}}</strong> </template>
              <div style="width: 650px; height: 250px; background: #fff;overflow:auto">
                <div>
                  <span style="font-size: 16px;"><strong>{{$store.getters.getSystemLanguage === 0?"可视化结果选择:":"Visualization Result"}}</strong></span>
                  <a-select
                    mode="multiple"
                    style="
                      width: 90%;
                      text-align: left;
                      margin: 10px 0 30px 20px;
                      color: green;
                    "
                    placeholder="可视化结果"
                    v-model:value="selectedVisualList"
                    size="large"
                  >
                    <a-select-option
                      v-for="value in visualList"
                      :key="value"
                      :value="value"
                      >{{ value }}
                    </a-select-option>
                  </a-select>
                </div>
                <div>
                  <span style="font-size: 16px;"><strong>{{$store.getters.getSystemLanguage === 0?"统计结果选择:":"Statistics Result"}}</strong></span>
                  <a-select
                    mode="multiple"
                    style="
                      width: 90%;
                      text-align: left;
                      margin: 10px 0 0 20px;
                      color: green;
                    "
                    placeholder="可视化结果"
                    v-model:value="selectedStatList"
                    size="large"
                  >
                    <a-select-option
                      v-for="value in statList"
                      :key="value"
                      :value="value"
                      >{{ value }}
                    </a-select-option>
                  </a-select>
                </div> 
              </div>
            </a-modal>
          </div>
        </div>
      </div>
      <a-menu
        mode="vertical"
        :default-selected-keys="['1']"
        style="height: 95%"
        @click="loadReport"
      >
        <a-menu-item v-for="item in reportList" :key="item" style="height:35px;padding-left:20px;"><FilePdfOutlined />&nbsp; {{item}}</a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout-content
      :style="{ minHeight: '200px', width: '1000px', background: '#fff' }"
    >
      <div style="margin: 0 5px 0 5px">
        <div
          style="
            margin: 5px 0 0 0;
            height: 50px;
            width: 100%;
            backgroud: #d3d3d3;
          "
        >
          <div style="float: right; padding: 10px">
            <a-button
              @click="showModal(2)"
              :disabled="selectedItem === ''"
              style="
                background-color: white;
                color: black;
                margin-right:20px;
                cursor: pointer;
                width: 90px;
              "
            >
              {{$store.getters.getSystemLanguage === 0?"格式修改":"Style Set"}}
            </a-button>
            <a-button
              @click="showModal(1)"
              style="
                background-color: white;
                color: black;
                margin-right:20px;
                cursor: pointer;
                width: 70px;
              "
            >
              {{$store.getters.getSystemLanguage === 0?"保存":"Save"}}
            </a-button>
            <a-button
              style="
                background-color: white;
                color: black;
                cursor: pointer;
                width: 90px;
              "
              @click="downloadReport"
            >
              {{$store.getters.getSystemLanguage === 0?"下载":"Download"}}
            </a-button>
          </div>
          <div style="float: left; margin: 10px 0 0 20px">
            <h3 style="font-weight: bolder">{{$store.getters.getSystemLanguage === 0?"报告预览":"View"}}</h3>
          </div>
        </div>
        <div>
          <a-modal
            width="700px"
            :visible="modalVisible[1]"
            :dialog-style="{ top: '150px' }"
            :confirm-loading="confirmLoading[1]"
            @ok="handleOk(1)"
            @cancel="handleCancel(1)"
            ok-text="OK"
            cancel-text="Cancel"
          >
            <template v-slot:title>
              <div style="height: 20px"><strong>{{$store.getters.getSystemLanguage === 0?"保存报告结果":"Save Report"}}</strong></div>
            </template>
            <div
              style="
                height: 250px;
                background: #fff;
              "
            >
              <div style="margin:20px 0 0 20px">
                <span style="font-size:18px;font-weight: bolder">{{$store.getters.getSystemLanguage === 0?"文件名称":"Report Name"}}</span>
                <a-input
                  v-model:value="reportSaveName" 
                  style="width: 80%;text-align:left;margin:10px 0 0 20px" 
                  placeholder="请输入要保存的文件名" 
                  size="large"
                />
              </div>
              <div style="margin:20px 0 0 20px">
                <span style="font-size:18px;font-weight: bolder">{{$store.getters.getSystemLanguage === 0?"报告标题:":"Title"}}</span>
                <a-input
                  v-model:value="reportTitle" 
                  style="width: 80%;text-align:left;margin:10px 0 0 20px" 
                  placeholder="请输入标题内容,生成报告时作为标题" 
                  size="large"
                />
              </div>
              <div style="margin:20px 0 0 20px">
                <span style="font-size:18px;font-weight: bolder">{{$store.getters.getSystemLanguage === 0?"报告描述:":"Description"}}</span>
                <a-input
                  v-model:value="reportDesc" 
                  style="width: 80%;text-align:left;margin:10px 0 0 20px" 
                  placeholder="请输入描述内容,生成报告时作为描述" 
                  size="large"
                />
              </div>
            </div>
          </a-modal>
        </div>

        <div>
          <a-modal
            width="700px"
            :visible="modalVisible[2]"
            :dialog-style="{ top: '150px' }"
            :confirm-loading="confirmLoading[2]"
            @ok="handleOk(2)"
            @cancel="handleCancel(2)"
            ok-text="OK"
            cancel-text="Cancel"
          >
            <template v-slot:title>
              <div style="height: 20px"><strong>报告格式修改</strong></div>
            </template>
            <div
              style="
                height: 250px;
                background: #fff;
                width:100%;
              "
            >
              <a-tabs v-model:activeKey="activeKey">
                <a-tab-pane key="Tab 1" tab="主标题/描述">
                <!--一级标题样式-->
                  <div style="font-size: 16px;"><strong>主标题</strong></div>
                  <div style="display:inline">
                    <span style="font-size: 16px;"><strong>字体大小:</strong></span>
                    <a-select
                      style="
                        width: 12%;
                        text-align: left;
                        margin: 10px 5px 0 5px;
                      "
                      placeholder="选择字体大小"
                      v-model:value="mainTFontSize"
                      size="large"
                    >
                      <a-select-option
                        v-for="value in font_size"
                        :key="value"
                        :value="value"
                        >{{ value }}
                      </a-select-option>
                    </a-select>
                  </div> 
                  <div style="display:inline">
                    <span style="font-size: 16px;"><strong>字体类型:</strong></span>
                    <a-select
                      style="
                        width: 12%;
                        text-align: left;
                        margin: 10px 5px 0 5px;
                      "
                      placeholder="选额字体类型"
                      v-model:value="mainTFontFamily"
                      size="large"
                    >
                      <a-select-option
                        v-for="value in font_family"
                        :key="value"
                        :value="value"
                        >{{ value }}
                      </a-select-option>
                    </a-select>
                  </div>
                  <div style="display:inline">
                    <span style="font-size: 16px;"><strong>加粗:</strong></span>
                    <a-select
                      style="
                        width: 17%;
                        text-align: left;
                        margin: 10px 5px 0 5px;
                      "
                      placeholder="选额字体类型"
                      v-model:value="mainTFontWeight"
                      size="large"
                    >
                      <a-select-option
                        v-for="value in font_bolder"
                        :key="value"
                        :value="value"
                        >{{ value }}
                      </a-select-option>
                    </a-select>
                  </div>
                  <div style="display:inline">
                    <span style="font-size: 16px;"><strong>位置:</strong></span>
                    <a-select
                      style="
                        width: 17%;
                        text-align: left;
                        margin: 10px 5px 0 5px;
                      "
                      placeholder="选额字体类型"
                      v-model:value="mainTTextAlign"
                      size="large"
                    >
                      <a-select-option
                        v-for="value in font_align"
                        :key="value"
                        :value="value"
                        >{{ value }}
                      </a-select-option>
                    </a-select>
                  </div> 
                <!--一级描述样式-->
                  <div style="font-size: 16px;margin-top:10px;"><strong>描述</strong></div>
                  <div style="display:inline">
                    <span style="font-size: 16px;"><strong>字体大小:</strong></span>
                    <a-select
                      style="
                        width: 12%;
                        text-align: left;
                        margin: 10px 5px 0 5px;
                      "
                      placeholder="选择字体大小"
                      v-model:value="mainDFontSize"
                      size="large"
                    >
                      <a-select-option
                        v-for="value in font_size"
                        :key="value"
                        :value="value"
                        >{{ value }}
                      </a-select-option>
                    </a-select>
                  </div> 
                  <div style="display:inline">
                    <span style="font-size: 16px;"><strong>字体类型:</strong></span>
                    <a-select
                      style="
                        width: 12%;
                        text-align: left;
                        margin: 10px 5px 0 5px;
                      "
                      placeholder="选额字体类型"
                      v-model:value="mainDFontFamily"
                      size="large"
                    >
                      <a-select-option
                        v-for="value in font_family"
                        :key="value"
                        :value="value"
                        >{{ value }}
                      </a-select-option>
                    </a-select>
                  </div>
                  <div style="display:inline">
                    <span style="font-size: 16px;"><strong>加粗:</strong></span>
                    <a-select
                      style="
                        width: 17%;
                        text-align: left;
                        margin: 10px 5px 0 5px;
                      "
                      placeholder="选额字体类型"
                      v-model:value="mainDFontWeight"
                      size="large"
                    >
                      <a-select-option
                        v-for="value in font_bolder"
                        :key="value"
                        :value="value"
                        >{{ value }}
                      </a-select-option>
                    </a-select>
                  </div>
                  <div style="display:inline">
                    <span style="font-size: 16px;"><strong>位置:</strong></span>
                    <a-select
                      style="
                        width: 17%;
                        text-align: left;
                        margin: 10px 5px 0 5px;
                      "
                      placeholder="选额字体类型"
                      v-model:value="mainDTextAlign"
                      size="large"
                    >
                      <a-select-option
                        v-for="value in font_align"
                        :key="value"
                        :value="value"
                        >{{ value }}
                      </a-select-option>
                    </a-select>
                  </div> 

                </a-tab-pane>
                <a-tab-pane key="Tab 2" tab="子标题/描述">
                  <!--一级标题样式-->
                  <div style="font-size: 16px;"><strong>子标题</strong></div>
                  <div style="display:inline">
                    <span style="font-size: 16px;"><strong>字体大小:</strong></span>
                    <a-select
                      style="
                        width: 12%;
                        text-align: left;
                        margin: 10px 5px 0 5px;
                      "
                      placeholder="选择字体大小"
                      v-model:value="subTFontSize"
                      size="large"
                    >
                      <a-select-option
                        v-for="value in font_size"
                        :key="value"
                        :value="value"
                        >{{ value }}
                      </a-select-option>
                    </a-select>
                  </div> 
                  <div style="display:inline">
                    <span style="font-size: 16px;"><strong>字体类型:</strong></span>
                    <a-select
                      style="
                        width: 12%;
                        text-align: left;
                        margin: 10px 5px 0 5px;
                      "
                      placeholder="选额字体类型"
                      v-model:value="subTFontFamily"
                      size="large"
                    >
                      <a-select-option
                        v-for="value in font_family"
                        :key="value"
                        :value="value"
                        >{{ value }}
                      </a-select-option>
                    </a-select>
                  </div>
                  <div style="display:inline">
                    <span style="font-size: 16px;"><strong>加粗:</strong></span>
                    <a-select
                      style="
                        width: 17%;
                        text-align: left;
                        margin: 10px 5px 0 5px;
                      "
                      placeholder="选额字体类型"
                      v-model:value="subTFontWeight"
                      size="large"
                    >
                      <a-select-option
                        v-for="value in font_bolder"
                        :key="value"
                        :value="value"
                        >{{ value }}
                      </a-select-option>
                    </a-select>
                  </div>
                  <div style="display:inline">
                    <span style="font-size: 16px;"><strong>位置:</strong></span>
                    <a-select
                      style="
                        width: 17%;
                        text-align: left;
                        margin: 10px 5px 0 5px;
                      "
                      placeholder="选额字体类型"
                      v-model:value="subTTextAlign"
                      size="large"
                    >
                      <a-select-option
                        v-for="value in font_align"
                        :key="value"
                        :value="value"
                        >{{ value }}
                      </a-select-option>
                    </a-select>
                  </div> 
                <!--一级描述样式-->
                  <div style="font-size: 16px;margin-top:10px;"><strong>描述</strong></div>
                  <div style="display:inline">
                    <span style="font-size: 16px;"><strong>字体大小:</strong></span>
                    <a-select
                      style="
                        width: 12%;
                        text-align: left;
                        margin: 10px 5px 0 5px;
                      "
                      placeholder="选择字体大小"
                      v-model:value="subDFontSize"
                      size="large"
                    >
                      <a-select-option
                        v-for="value in font_size"
                        :key="value"
                        :value="value"
                        >{{ value }}
                      </a-select-option>
                    </a-select>
                  </div> 
                  <div style="display:inline">
                    <span style="font-size: 16px;"><strong>字体类型:</strong></span>
                    <a-select
                      style="
                        width: 12%;
                        text-align: left;
                        margin: 10px 5px 0 5px;
                      "
                      placeholder="选额字体类型"
                      v-model:value="subDFontFamily"
                      size="large"
                    >
                      <a-select-option
                        v-for="value in font_family"
                        :key="value"
                        :value="value"
                        >{{ value }}
                      </a-select-option>
                    </a-select>
                  </div>
                  <div style="display:inline">
                    <span style="font-size: 16px;"><strong>加粗:</strong></span>
                    <a-select
                      style="
                        width: 17%;
                        text-align: left;
                        margin: 10px 5px 0 5px;
                      "
                      placeholder="选额字体类型"
                      v-model:value="subDFontWeight"
                      size="large"
                    >
                      <a-select-option
                        v-for="value in font_bolder"
                        :key="value"
                        :value="value"
                        >{{ value }}
                      </a-select-option>
                    </a-select>
                  </div>
                  <div style="display:inline">
                    <span style="font-size: 16px;"><strong>位置:</strong></span>
                    <a-select
                      style="
                        width: 17%;
                        text-align: left;
                        margin: 10px 5px 0 5px;
                      "
                      placeholder="选额字体类型"
                      v-model:value="subDTextAlign"
                      size="large"
                    >
                      <a-select-option
                        v-for="value in font_align"
                        :key="value"
                        :value="value"
                        >{{ value }}
                      </a-select-option>
                    </a-select>
                  </div> 
                </a-tab-pane>
              </a-tabs>
            </div>
          </a-modal>
        </div>

        <!--hr style="backgroud: black;width: 100%" /-->
        <div
          style="
            margin-top:15px;
            padding: 20px 60px 10px 60px;
            height: 580px;
            width: 100%;
            backgroud: #d3d3d3;
            border-top: 2px solid gray;
            overflow:auto;
          "
        >
          <div v-if="spinning == true"><a-spin :spinning="spinning" tip="报告下载中..."></a-spin></div>
          <!--报告显示区域-->
          <div id="pdf">
            <!--报告标题和描述-->
            <div v-show="isReportTile" style="text-align:center;">
              <div style="text-color:gray;font-size:22px;weight:bold;text-align:left">{{$store.getters.getUserName}}</div>
              <div :style="mainTitle">{{reportAns["title"]}}</div>
              <p :style="mainDesc">&nbsp;{{descText}} {{reportAns["desc"]}}</p>
            </div>
            <!--可视化结果-->
            <div v-for="(item, index) in visualItemList" :key="index" :value="item">
              <div style="text-align:left;">
                <div style="font-size:20px;font-weight:bolder;font-family:黑体;">&nbsp;&nbsp;{{item["title"]}}</div>
                <p style="font-size:18px;font-family:宋体;">&nbsp;&nbsp;&nbsp;{{descText}}{{item["desc"]}}</p>
              </div>
              <div
                class="myChart"
                :style="{ width: '100%', height: '550px' }"
              >
              </div>
            </div>
            <!--PdfView :url="pdfurl"></PdfView-->
            <!--统计结果-->
            <div v-for="(item,index) in statItemList" :key="index">
              <div v-if="item['mode'] == '普通模式'">
                <div style="text-align:left;">
                  <div style="font-size:20px;font-weight:bolder;font-family:黑体;">&nbsp;&nbsp;{{item["title"]}}</div>
                  <p style="font-size:18px;font-family:宋体;">&nbsp;&nbsp;&nbsp;{{descText}}{{item["desc"]}}</p>
                </div>
                <StatAns :ans="item['statAns']"></StatAns>
              </div>
              <div v-if="item['mode'] == '汽车行业'">
                <div style="text-align:left;">
                  <div style="font-size:20px;font-weight:bolder;font-family:黑体;">&nbsp;&nbsp;{{item["title"]}}</div>
                  <p style="font-size:18px;font-family:宋体;">&nbsp;&nbsp;&nbsp;{{descText}}{{item["desc"]}}</p>
                </div>
                <StatAnsCar :ans="item['statAns']"></StatAnsCar>
              </div>
              <div v-if="item['mode'] == '模式二'">

              </div>
            </div>
          </div>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
//import PdfView from "@/components/PdfView.vue";
import { FilePdfOutlined } from "@ant-design/icons-vue";
import axios from "axios";
import * as echarts from "echarts";
import StatAns from "@/components/StatAns.vue";
import StatAnsCar from "@/components/StatAnsCar.vue";
import htmlToPdf from '@/utils/htmlToPdf'
import { getElementTop } from 'vant/lib/utils';
export default {
  inject:['reload'],
  data() {
    return {
      pdfurl: "",
      visualCnt:0,
      isReload: true,
      isReportTile:false,
      isReportShow:true,

      descText:"",

      activeKey:1,
      //样式
      font_size:[16,17,18,19,20,21,22,23,24,25,26,27,28],
      font_bolder:["bolder","无"],
      font_family:["宋体","黑体","微软雅黑","楷体"],
      font_align:["left","right","center"],

      //主标题
      mainTFontSize:25,
      mainTFontWeight:'bolder',
      mainTFontFamily:'黑体',
      mainTTextAlign:'center',
      mainTitle:{
        fontSize: `${25}px`,
        fontWeight:'bolder',
        fontFamily:'黑体',
        textAlign:'center',
      },

      //报告描述
      mainDFontSize:25,
      mainDFontWeight:'无',
      mainDFontFamily:'黑体',
      mainDTextAlign:'center',
      mainDesc:{
        fontSize: `${25}px`,
        fontWeight:'',
        fontFamily:'黑体',
        textAlign:'center',
      },

      //子标题
      subTFontSize:20,
      subTFontWeight:'bolder',
      subTFontFamily:'宋体',
      subTTextAlign:'left',
      subTitle:{
        fontSize: `${20}px`,
        fontWeight:'bolder',
        fontFamily:'黑体',
        textAlign:'left',
      },
      //子项描述
      subDFontSize:20,
      subDFontWeight:'无',
      subDFontFamily:'宋体',
      subDTextAlign:'left',
      subDesc:{
        fontSize: `${20}px`,
        fontWeight:'',
        fontFamily:'宋体',
        textAlign:'left',
      },


      modalVisible: [false,false,false],
      confirmLoading: [false,false,false],

      reportList:[],  //报告列表
      selectedItem:"", //选中的报告

      selectedVisualList:[], //报告所选的可视化列表
      selectedStatList:[], //报告所选的统计列表

      reportAns:[],   //报告结果
      visualItemList:[], //报告中可视化项列表
      statItemList:[],  //报告中统计项列表


      //保存报告
      reportTitle:"",  //报告标题
      reportDesc:"",  //报告描述
      reportSaveName:"", //报告名称


      saveFlag:0,
      reportShowFlag:false,
      
      visualList:[], //用户可视化列表
      statList:[], //用户统计列表

      //可视化DOM数据
      myCharts:[],

      //加载
      spinning:false,
      delayTime:10,
    }
  },
  components: {
    //PdfView,
    FilePdfOutlined,
    StatAns,
    StatAnsCar,
    //Chart,
  },
  mounted(){
    this.getReportList();
  },
  methods: {
    cssChange(){
      this.mainTitle = {
        fontSize:`${this.mainTFontSize}px`,
        fontWeight: this.mainTFontWeight == '无'?'':'bolder',
        fontFamily: this.mainTFontFamily,
        textAlign:this.mainTTextAlign,
      };
      this.mainDesc = {
        fontSize: `${this.mainDFontSize}px`,
        fontWeight: this.mainDFontWeight == '无'?'':'bolder',
        fontFamily:this.mainDFontFamily,
        textAlign:this.mainDTextAlign,
      };
      this.subTitle = {
        fontSize: `${this.subTFontSize}px`,
        fontWeight: this.mainTFontWeight == '无'?'':'bolder',
        fontFamily:this.subTFontFamily,
        textAlign:this.subTTextAlign,
      };
      this.subDesc = {
        fontSize: `${this.mainDFontSize}px`,
        fontWeight: this.mainDFontWeight == '无'?'':'bolder',
        fontFamily:this.mainDFontFamily,
        textAlign:this.mainDTextAlign,
      };
    },
    reloadReportArea(){
      this.isReportShow = false;
      this.$nextTick(()=>{
        this.isReportShow = true;
      });
    },
    async getReportList(){ //报告列表
      await axios.get(this.$store.state.base_url + "/api/getReportList",{params:{'name':this.$store.state.userName}})
      .then((res)=>{
        this.reportList = res.data;
      },(res)=>{
        //alert("请求失败")
      })
    },
    async deleteReport(){  //删除报告
      await axios.get(this.$store.state.base_url + "/api/deleteReport",{params:{'name':this.$store.state.userName,'report_name':this.selectedItem}})
      .then((res)=>{
        alert(res.data);
        this.selectedItem = "";
        this.reload();
      },(res)=>{
        alert("请求失败")
      });
    },
    async generateReport(){  //生成报告
      this.isReportTile  = false;
      this.descText = "";
      const formData = new FormData();
      formData.append('name',this.$store.state.userName);
      for(let i = 0; i < this.selectedVisualList.length; i++){
        formData.append('visual_list[]',this.selectedVisualList[i]);
      }
      for(let i = 0; i < this.selectedStatList.length; i++){
        formData.append('stat_list[]',this.selectedStatList[i]);
      }
      await axios.post(this.$store.state.base_url + "/api/generateReport",formData)
      .then((res)=>{
        this.reportAns = res.data;
        this.saveFlag = 1;
        console.log("报告结果");
        console.log(this.reportAns);
        this.visualItemList = this.reportAns["visual"];
        this.statItemList = this.reportAns["stat"];
        this.descText = "概要: ";
        this.visualCnt = this.visualItemList.length;
        console.log(this.visualCnt)
        this.$nextTick(()=>{
          let myChartClass = document.getElementsByClassName("myChart")
          for(let i = 0; i < this.visualItemList.length;i++){
            let myChartDemo = echarts.init( myChartClass[i])
            myChartDemo.clear();
            myChartDemo.setOption(this.visualItemList[i]["option"]);
          }
        })
      })
      //this.statLoad();
      //this.visualLoad();
    },
    downloadReport(){ //报告下载
      if(this.selectedItem.length == 0){
        alert("请先选择报告");
        return 0;
      }
      //this.spinning = true;
      htmlToPdf.getPdf(this.selectedItem);
      //setTimeout(()=>{this.spinning = false},2000);
    },
    async loadReport(item) {  //报告加载
      this.isReportTile = true;
      this.selectedItem = item.key;
      this.descText = "";
      this.reportAns = {};
      await axios.get(this.$store.state.base_url + "/api/loadReport",{params:{'name':this.$store.state.userName,'report_name':this.selectedItem}})
      .then((res) => {
        this.reportAns = res.data;
        console.log("报告项结果");
        console.log(this.reportAns);
        this.visualItemList = this.reportAns['reportAns']["visual"];
        this.statItemList = this.reportAns['reportAns']["stat"];
        this.descText = "概要: ";
        this.$nextTick(()=>{
          let myChartClass = document.getElementsByClassName("myChart")
          for(let i = 0; i < this.visualItemList.length;i++){
            let myChartDemo = echarts.init( myChartClass[i])
            myChartDemo.clear();
            myChartDemo.setOption(this.visualItemList[i]["option"]);
          }
        })
      },(res) => {
        alert("请求失败");
      });
    },
    async saveReport(){ //报告保存
      if(this.saveFlag == 1){
        let ans = {};
        ans["title"] = this.reportTitle;
        ans["desc"] = this.reportDesc;
        ans["reportAns"] = this.reportAns;
        const formData = new FormData();
        formData.append('name',this.$store.state.userName);
        formData.append('report_name',this.reportSaveName);
        formData.append('report_ans',JSON.stringify(ans))
        await axios.post(this.$store.state.base_url + "/api/saveReport",formData)
          .then(res=>{
            alert(res.data);
            this.saveFlag = 0;
            this.reload();
        },(res) => {
          alert("保存失败，请检查名称是否含有非法字符");
        });
      }else{
        alert("没有新报告");
      }
    },
    initEchartsDom(){
      //this.reloadArea();
      let myChartClass = document.getElementsByClassName("myChart")
      for(let i = 0; i < this.visualItemList.length;i++){
        let myChartDemo = echarts.init( myChartClass[i])
        myChartDemo.setOption(this.visualItemList[i]["option"]);
        //this.myCharts.push(myChartDemo)
      }
    },
    showContent(){
      for(let i = 0;i < this.myCharts.length;i++){
        console.log("可视化")
        console.log(`可视化chart${i}`)
        console.log("可视化");
        this.myCharts[i].setOption(this.visualItemList[i]["option"]);
      }
    },
    async getVisualList(){
      await axios.get(this.$store.state.base_url + "/api/getVisualList",{params:{'name':this.$store.state.userName,'industry':this.$store.getters.getSystemTitle}})
        .then(res=>{
        this.visualList = res.data;
      });
    },
    async getStatList(){
      await axios.get(this.$store.state.base_url + "/api/getStatList",{params:{'name':this.$store.state.userName,'industry':this.$store.getters.getSystemTitle}})
        .then(res=>{
        this.statList = res.data;
      });
    },
    showModal(n) { //对话框显示
      if(n == 0){
        this.getVisualList();
        this.getStatList();
        this.modalVisible[n] = true;
      }
      if(n == 1){
        if(this.saveFlag == 0){
          alert("未存在新报告");
        }
        else{
          this.modalVisible[n] = true;
        }
      }
      if(n == 2){
        this.modalVisible[2] = true;
      }
    },
    handleOk(n) {
      if(n == 0){
        this.generateReport();
        this.modalVisible[n] = false;
      }
      if(n == 1){
        if(this.reportSaveName.length == 0){
          alert("名称不能为空");
          return 0;
        }else{
          this.saveReport();
          this.modalVisible[n] = false;
          //this.confirmLoading = false;
        }
      }
      if(n == 2){
        this.modalVisible[n] = false;
        this.cssChange();
      }
    },
    handleCancel(n) {
      console.log("Clicked cancel button");
      this.modalVisible[n] = false;
    },
  },
};
</script>
<style>
</style>