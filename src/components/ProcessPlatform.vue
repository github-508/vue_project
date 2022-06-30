<template>
  <a-layout>
    <a-layout-sider width="250px" style="background: #fff">
      <div style="display: table; width: 100%;margin-top:20px; height: 20px">
        <div
          style="
            float: left;
            width: 25%;
            margin: 10px 0 0 0;
            padding-left:10px;
          "
        >
          <h3 style="font-weight: bolder">{{$store.getters.getSystemLanguage === 0?"加工表":"Sheet"}}</h3>
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
          <button
            @click="showModal(1)"
            style="
              background-color: white;
              color: gray;
              width: 60px;
              height: 30px;
              border: 1px solid #e7e7e7;
              cursor: pointer;
            "
          >
            {{$store.getters.getSystemLanguage === 0?"添加":"Add"}}
          </button>
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
              <template v-slot:title> <strong>{{$store.getters.getSystemLanguage === 0?"从工作表添加数据":"Select File from Work Sheet"}}</strong> </template>       
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
                  @change="selectBoxChange"
                  v-model:value="selectBox"
                  size="large"
                >
                  <a-select-option
                    v-for="item in workFileList"
                    :key="item"
                    :value="item"
                    >{{ item }}
                  </a-select-option>
                </a-select>
              </div>
            </a-modal>
          </div>
        </div>
      </div>
      <a-menu mode="vertical" style="height: 95%" @click="loadData">
        <a-menu-item v-for="item in fileList" :key="item" style="height:35px;padding-left:20px;"> <FileOutlined />&nbsp; {{item}} </a-menu-item>
        <!--a-menu-item key="table_1">
          <FileOutlined /> &nbsp;352_DP
        </a-menu-item-->
      </a-menu>
    </a-layout-sider>
    <a-layout-content :style="{ minHeight: '200px', background: '#fff' }">
      <div
        style="
          width: 99%;
          height: 70px;
          margin: 10px 5px 0px 5px;
          background: #fff;
        "
      >
        <div style="display: table; float: left; width: 99%">
          <div style="float: left; width: 8%; padding: 2px">
            <div style="margin: 5px 0 0 0">
              <a-dropdown :placement="bottomCenter" :trigger="['click']">
                <a-button>{{$store.getters.getSystemLanguage === 0?"数据合并":"Merge"}}</a-button>
                <template #overlay>
                  <a-menu @click="handelClick">
                    <a-menu-item key="option_1">
                      {{$store.getters.getSystemLanguage === 0?"横向堆叠":"Transverse"}}
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
                          <template v-slot:title> <strong>{{$store.getters.getSystemLanguage === 0?"横向堆叠":"Transverse"}}</strong> </template>       
                          <div style="width: 650px; height: 250px; background: #fff">
                            <div>
                              <span style="font-size:16px"><strong>{{$store.getters.getSystemLanguage === 0?"文件名称:":"File Name:"}}</strong></span>
                              <a-input
                                v-model:value="concat_name_1" 
                                style="
                                  width: 80%;
                                  text-align:left;
                                  margin-left:30px;
                                  margin-top:20px;
                                " 
                                placeholder="输入生成的文件名" 
                                size="large"
                              />
                            </div>
                            <span style="font-size: 16px;"><strong>{{$store.getters.getSystemLanguage === 0?"表格选择:":"Select Sheet:"}}</strong></span>
                            <a-select
                              mode="multiple"
                              style="
                                width: 80%;
                                text-align: left;
                                margin-left:30px;
                                margin-top:20px;
                              "
                              placeholder="选择要合并的文件"
                              v-model:value="concat_list_1"
                              size="large"
                            >
                              <a-select-option
                                v-for="item in fileList"
                                :key="item"
                                :value="item"
                                >{{ item }}
                              </a-select-option>
                            </a-select>
                          </div>
                        </a-modal>
                      </div>
                    </a-menu-item>
                    <a-menu-item key="option_2">
                      {{$store.getters.getSystemLanguage === 0?"纵向堆叠":"Longitudinal"}}
                      <div>
                        <a-modal
                          width="700px"
                          :visible="modalVisible[3]"
                          :dialog-style="{ top: '150px' }"
                          :confirm-loading="confirmLoading[3]"
                          @ok="handleOk(3)"
                          @cancel="handleCancel(3)"
                          ok-text="OK"
                          cancel-text="Cancel"
                        >
                          <template v-slot:title> <strong>{{$store.getters.getSystemLanguage === 0?"纵向堆叠":"Longitudinal"}}</strong> </template>
                          <div style="width: 650px; height: 250px; background: #fff">
                            <div>
                              <span style="font-size:16px"><strong>{{$store.getters.getSystemLanguage === 0?"文件名称:":"File Name:"}}</strong></span>
                              <a-input
                                v-model:value="concat_name_0" 
                                style="
                                  width: 80%;
                                  text-align:left;
                                  margin-left:30px;
                                  margin-top:20px;
                                " 
                                placeholder="输入生成的文件名" 
                                size="large"
                              />
                            </div>
                            <span style="font-size: 16px;"><strong>{{$store.getters.getSystemLanguage === 0?"表格选择:":"Select Sheet:"}}</strong></span>
                            <a-select
                              mode="multiple"
                              style="
                                width: 80%;
                                text-align: left;
                                margin-left:30px;
                                margin-top:20px;
                              "
                              placeholder="选择要合并的文件"
                              v-model:value="concat_list_0"
                              size="large"
                            >
                              <a-select-option
                                v-for="item in fileList"
                                :key="item"
                                :value="item"
                                >{{ item }}
                              </a-select-option>
                            </a-select>
                          </div>
                        </a-modal>
                      </div>
                    </a-menu-item>
                    <a-menu-item key="option_3">
                      {{$store.getters.getSystemLanguage === 0?"主键合并":"Primary key"}}
                      <div>
                        <a-modal
                          width="700px"
                          :visible="modalVisible[4]"
                          :dialog-style="{ top: '150px' }"
                          :confirm-loading="confirmLoading[4]"
                          @ok="handleOk(4)"
                          @cancel="handleCancel(4)"
                          ok-text="确认"
                          cancel-text="取消"
                        >
                          <template v-slot:title> <strong>{{$store.getters.getSystemLanguage === 0?"主键合并":"Primary key"}}</strong> </template>
                          <div style="width: 650px; height: 250px; background: #fff">
                            <div>
                              <span style="font-size:16px"><strong>{{$store.getters.getSystemLanguage === 0?"文件名称:":"File Name:"}}</strong></span>
                              <a-input
                                v-model:value="merge_name" 
                                style="
                                  width: 80%;
                                  text-align:left;
                                  margin-left:30px;
                                  margin-top:20px;
                                " 
                                placeholder="输入生成的文件名" 
                                size="large"
                              />
                            </div>
                            <span style="font-size: 16px;"><strong>{{$store.getters.getSystemLanguage === 0?"表格选择:":"Select Sheet:"}}</strong></span>
                            <a-select
                              mode="multiple"
                              style="
                                width: 80%;
                                text-align: left;
                                margin-left:30px;
                                margin-top:20px;
                              "
                              placeholder="选择要合并的文件"
                              v-model:value="merge_list"
                              size="large"
                            >
                              <a-select-option
                                v-for="item in fileList"
                                :key="item"
                                :value="item"
                                >{{ item }}
                              </a-select-option>
                            </a-select>
                          </div>
                        </a-modal>
                      </div>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </div>
          <!--数据清洗-->
          <div style="float: left; width: 8%; padding: 2px">
            <div style="margin: 5px 0 0 0">
              <!--:disabled="selectedItem === ''"-->
              <a-dropdown :placement="bottomCenter" :trigger="['click']" >
                <a-button>{{$store.getters.getSystemLanguage === 0?"数据清洗":"Cleansing"}}</a-button>
                <template #overlay>
                  <a-menu @click="handelClick">
                    <a-menu-item key="option_4">
                      {{$store.getters.getSystemLanguage === 0?"缺失值处理":"Missing Values"}}
                      <div>
                        <a-modal
                          width="700px"
                          :visible="modalVisible[5]"
                          :dialog-style="{ top: '150px' }"
                          :confirm-loading="confirmLoading[5]"
                          @ok="handleOk(5)"
                          @cancel="handleCancel(5)"
                          ok-text="OK"
                          cancel-text="Cancel"
                        >
                          <template v-slot:title> <strong>{{$store.getters.getSystemLanguage === 0?"缺失值处理":"Handing Missing Values"}}</strong> </template>
                          <div style="width: 650px; height: 300px; background: #fff;overflow:auto;">
                            <div>
                              <span style="font-size: 16px;"><strong>{{$store.getters.getSystemLanguage === 0?"处理方式":"Handing Way"}}</strong></span>
                              <a-select
                                style="
                                  width: 80%;
                                  text-align: left;
                                  margin-left:30px;
                                  margin-top:20px;
                                "
                                allowClear="true"
                                placeholder="选择缺失值处理方式"
                                v-model:value="nan_pro_meth"
                                size="large"
                              >
                                <a-select-option
                                  v-for="item in nan_pro_meth_list[$store.getters.getSystemLanguage]"
                                  :key="item"
                                  :value="item"
                                  >{{ item }}
                                </a-select-option>
                              </a-select>
                            </div>
                            
                            <div v-show="nan_pro_meth == '删除' || nan_pro_meth == 'Drop'">
                              <div>
                                <span style="font-size: 16px;"><strong>{{$store.getters.getSystemLanguage === 0?"删除方式:":"Drop Way:"}}</strong></span>
                                <a-select
                                  style="
                                    width: 80%;
                                    text-align: left;
                                    margin-left:30px;
                                    margin-top:20px;
                                  "
                                  allowClear="true"
                                  placeholder="选择删除方式"
                                  v-model:value="drop_meth"
                                  size="large"
                                >
                                  <a-select-option
                                    v-for="item in drop_meth_list[$store.getters.getSystemLanguage]"
                                    :key="item"
                                    :value="item"
                                    >{{ item }}
                                  </a-select-option>
                                </a-select>
                              </div>
                              <div v-show="drop_meth == '根据特征判断' || drop_meth == 'Field'">
                                <span style="font-size:16px"><strong>{{$store.getters.getSystemLanguage === 0?"特征选择:":"Field:"}}</strong></span>
                                <a-select
                                  mode="multiple"
                                  style="
                                    width: 80%;
                                    text-align: left;
                                    margin-left:30px;
                                    margin-top:20px;
                                  "
                                  placeholder="选择判定的表格特征,该特征为空值的记录会被删除"
                                  allowClear="true"
                                  v-model:value="drop_pro_fields"
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

                            <div v-show="nan_pro_meth == '填充' || nan_pro_meth == 'Fill'">
                              <div>
                                <span style="font-size: 16px;"><strong>{{$store.getters.getSystemLanguage === 0?"填充方式:":"Fill Way:"}}</strong></span>
                                <a-select
                                  style="
                                    width: 80%;
                                    text-align: left;
                                    margin-left:30px;
                                    margin-top:20px;
                                  "
                                  allowClear="true"
                                  placeholder="选择填充方式"
                                  v-model:value="fill_meth"
                                  size="large"
                                >
                                  <a-select-option
                                    v-for="item in fill_meth_list[$store.getters.getSystemLanguage]"
                                    :key="item"
                                    :value="item"
                                    >{{ item }}
                                  </a-select-option>
                                </a-select>
                              </div>
                              <div v-show="fill_meth == '整表缺失值替换' || fill_meth == 'Replace All'">
                                <div>
                                  <span style="font-size:16px"><strong>{{$store.getters.getSystemLanguage === 0?"填充值:":"Fill Value:"}}</strong></span>
                                  <a-input
                                    v-model:value="fill_all_nan_value" 
                                    style="
                                      width: 80%;
                                      text-align:left;
                                      margin-left:30px;
                                      margin-top:20px;
                                    " 
                                    placeholder="输入填充值" 
                                    size="large"
                                  />
                                </div>
                              </div>
                              <div v-show="fill_meth == '根据特征填充' || fill_meth == 'Field'">
                                <div>
                                  <span style="font-size:16px"><strong>{{$store.getters.getSystemLanguage === 0?"特征选择:":"Field:"}}</strong></span>
                                  <a-select
                                    mode="multiple"
                                    style="
                                      width: 80%;
                                      text-align: left;
                                      margin-left:30px;
                                      margin-top:20px;
                                    "
                                    placeholder="选择需要填充的特征"
                                    allowClear="true"
                                    v-model:value="fill_pro_fields"
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
                                <div>
                                  <span style="font-size: 16px;"><strong>{{$store.getters.getSystemLanguage === 0?"特征填充方式:":"Fill Way:"}}</strong></span>
                                  <a-select
                                    style="
                                      width: 75%;
                                      text-align: left;
                                      margin-left:30px;
                                      margin-top:20px;
                                    "
                                    allowClear="true"
                                    placeholder="选择填充方式"
                                    v-model:value="fill_fields_meth"
                                    size="large"
                                  >
                                    <a-select-option
                                      v-for="item in fill_fields_meth_list[$store.getters.getSystemLanguage]"
                                      :key="item"
                                      :value="item"
                                      >{{ item }}
                                    </a-select-option>
                                  </a-select>
                                </div>
                                <div v-show="fill_fields_meth == '自定义填充值' || fill_fields_meth == 'Customization' ">
                                  <span style="font-size:16px"><strong>{{$store.getters.getSystemLanguage === 0?"自定义填充值:":"Customization:"}}</strong></span>
                                  <a-input
                                    v-model:value="fill_fields_meth_value" 
                                    style="
                                      width: 75%;
                                      text-align:left;
                                      margin-left:30px;
                                      margin-top:20px;
                                    " 
                                    placeholder="输入自定义填充值" 
                                    size="large"
                                  />
                                </div>
                              </div>
                            </div>

                            <div v-show="nan_pro_meth == '插值' || nan_pro_meth == 'Interpolation'">
                              <div>
                                <span style="font-size:16px"><strong>{{$store.getters.getSystemLanguage === 0?"特征选择:":"Field:"}}</strong></span>
                                <a-select
                                  mode="multiple"
                                  style="
                                    width: 80%;
                                    text-align: left;
                                    margin-left:30px;
                                    margin-top:20px;
                                  "
                                  placeholder="选择插值的特征"
                                  allowClear="true"
                                  v-model:value="inter_pro_fields"
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

                              <div>
                                <span style="font-size: 16px;"><strong>{{$store.getters.getSystemLanguage === 0?"插值方式:":"Interpolation Way:"}}</strong></span>
                                <a-select
                                  style="
                                    width: 80%;
                                    text-align: left;
                                    margin-left:30px;
                                    margin-top:20px;
                                  "
                                  allowClear="true"
                                  placeholder="选择插值方式"
                                  v-model:value="inter_meth"
                                  size="large"
                                >
                                  <a-select-option
                                    v-for="item in inter_meth_list[$store.getters.getSystemLanguage]"
                                    :key="item"
                                    :value="item"
                                    >{{ item }}
                                  </a-select-option>
                                </a-select>
                              </div>
                            </div>

                          </div>
                        </a-modal>
                      </div>
                    </a-menu-item>
                    <a-menu-item key="option_5">
                      {{$store.getters.getSystemLanguage === 0?"重复数据处理":"Duplicate Processing"}}
                      <div>
                        <a-modal
                          width="700px"
                          :visible="modalVisible[6]"
                          :dialog-style="{ top: '150px' }"
                          :confirm-loading="confirmLoading[6]"
                          @ok="handleOk(6)"
                          @cancel="handleCancel(6)"
                          ok-text="OK"
                          cancel-text="Cancel"
                        >
                          <template v-slot:title> <strong>{{$store.getters.getSystemLanguage === 0?"重复数据处理":"Duplicate Processing"}}</strong> </template>
                          <div style="width: 650px; height: 300px; background: #fff">
                            <div>
                              <span style="font-size: 16px;"><strong>{{$store.getters.getSystemLanguage === 0?"处理方式":"Handing Way"}}</strong></span>
                              <a-select
                                style="
                                  width: 80%;
                                  text-align: left;
                                  margin-left:30px;
                                  margin-top:20px;
                                "
                                allowClear="true"
                                placeholder="选择重复数据处理方式"
                                v-model:value="duplicate_axis_meth"
                                size="large"
                              >
                                <a-select-option
                                  v-for="item in duplicate_axis[$store.getters.getSystemLanguage]"
                                  :key="item"
                                  :value="item"
                                  >{{ item }}
                                </a-select-option>
                              </a-select>
                            </div>

                            <div v-show="duplicate_axis_meth == '处理重复行' || duplicate_axis_meth == 'Duplicate Row'">
                              <div>
                                <span style="font-size: 16px;"><strong>{{$store.getters.getSystemLanguage === 0?"行处理方式":"Handing Way(Row)"}}</strong></span>
                                <a-select
                                  style="
                                    width: 80%;
                                    text-align: left;
                                    margin-left:15px;
                                    margin-top:20px;
                                  "
                                  allowClear="true"
                                  placeholder="重复行处理方式"
                                  v-model:value="row_duplicate_meth"
                                  size="large"
                                >
                                  <a-select-option
                                    v-for="item in row_duplicate[$store.getters.getSystemLanguage]"
                                    :key="item"
                                    :value="item"
                                    >{{ item }}
                                  </a-select-option>
                                </a-select>
                              </div>
                              <div v-show="row_duplicate_meth == '特征字段重复' || row_duplicate_meth == 'Field'">
                                <div>
                                  <span style="font-size:16px"><strong>特征选择: </strong></span>
                                  <a-select
                                    mode="multiple"
                                    style="
                                      width: 80%;
                                      text-align: left;
                                      margin-left:25px;
                                      margin-top:20px;
                                    "
                                    placeholder="选择处理重复数据的特征"
                                    allowClear="true"
                                    v-model:value="duplicate_fields"
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

                          </div>
                        </a-modal>
                      </div>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </div>
          <!--数据标准化-->
          <div style="float: left; width: 11%; padding: 2px">
            <div style="margin: 5px 0 0 0">
              <!--:disabled="selectedItem === ''"-->
              <a-dropdown :placement="bottomCenter" :trigger="['click']">
                <a-button>{{$store.getters.getSystemLanguage === 0?"数据标准化":"Standardization"}}</a-button>
                <template #overlay>
                  <a-menu @click="handelClick">
                    <a-menu-item key="option_7">
                      离差标准化
                      <div>
                        <a-modal
                          width="700px"
                          :visible="modalVisible[8]"
                          :dialog-style="{ top: '150px' }"
                          :confirm-loading="confirmLoading[8]"
                          @ok="handleOk(8)"
                          @cancel="handleCancel(8)"
                          ok-text="确认"
                          cancel-text="取消"
                        >
                          <template v-slot:title> 离差标准化 </template>
                          <div style="width: 650px; height: 250px; background: #fff">
                            <div>
                              <span style="font-size:16px"><strong>字段选择:</strong></span>
                              <a-select
                                mode="multiple"
                                style="
                                  width: 80%;
                                  text-align: left;
                                  margin-left:30px;
                                  margin-top:20px;
                                "
                                placeholder="选择需要标准化的列"
                                allowClear="true"
                                v-model:value="min_max_scale_fields"
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
                        </a-modal>
                      </div>
                    </a-menu-item>
                    <a-menu-item key="option_8">
                      标准差标准化
                      <div>
                        <a-modal
                          width="700px"
                          :visible="modalVisible[9]"
                          :dialog-style="{ top: '150px' }"
                          :confirm-loading="confirmLoading[9]"
                          @ok="handleOk(9)"
                          @cancel="handleCancel(9)"
                          ok-text="确认"
                          cancel-text="取消"
                        >
                          <template v-slot:title> 标准差标准化 </template>
                          <div style="width: 650px; height: 250px; background: #fff">
                            <div>
                              <span style="font-size:16px"><strong>字段选择:</strong></span>
                              <a-select
                                mode="multiple"
                                style="
                                  width: 80%;
                                  text-align: left;
                                  margin-left:30px;
                                  margin-top:20px;
                                "
                                placeholder="选择需要标准化的列"
                                allowClear="true"
                                v-model:value="standard_scale_fields"
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
                        </a-modal>
                      </div>
                    </a-menu-item>
                    <a-menu-item key="option_9">
                      小数定标标准化
                      <div>
                        <a-modal
                          width="700px"
                          :visible="modalVisible[10]"
                          :dialog-style="{ top: '150px' }"
                          :confirm-loading="confirmLoading[10]"
                          @ok="handleOk(10)"
                          @cancel="handleCancel(10)"
                          ok-text="确认"
                          cancel-text="取消"
                        >
                          <template v-slot:title> 小数定标标准化 </template>
                          <div style="width: 650px; height: 250px; background: #fff">
                            <div>
                              <span style="font-size:16px"><strong>字段选择:</strong></span>
                              <a-select
                                mode="multiple"
                                style="
                                  width: 80%;
                                  text-align: left;
                                  margin-left:30px;
                                  margin-top:20px;
                                "
                                placeholder="选择需要标准化的列"
                                allowClear="true"
                                v-model:value="decemal_scale_fields"
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
                        </a-modal>
                      </div>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </div>
          <!--离散化-->
          <div style="float: left; width: 10%; padding: 2px">
            <div style="margin: 5px 0 0 0">
              <a-dropdown :placement="bottomCenter" :trigger="['click']">
                <a-button>{{$store.getters.getSystemLanguage === 0?"数据离散化":"Discretization"}}</a-button>
                <template #overlay>
                  <a-menu @click="handelClick">
                    <a-menu-item key="option_10">
                      等宽离散
                      <div>
                        <a-modal
                          width="700px"
                          :visible="modalVisible[11]"
                          :dialog-style="{ top: '150px' }"
                          :confirm-loading="confirmLoading[11]"
                          @ok="handleOk(11)"
                          @cancel="handleCancel(11)"
                          ok-text="确认"
                          cancel-text="取消"
                        >
                          <template v-slot:title> 等宽离散 </template>
                          <div style="width: 650px; height: 250px; background: #fff">
                            <div>
                              <span style="font-size:16px"><strong>字段选择:</strong></span>
                              <a-select
                                mode="multiple"
                                style="
                                  width: 80%;
                                  text-align: left;
                                  margin-left:30px;
                                  margin-top:20px;
                                "
                                placeholder="选择需要等宽离散化的列"
                                allowClear="true"
                                v-model:value="cut_fields"
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
                            <div>
                              <span style="font-size:16px"><strong>区间定义</strong></span>
                              <a-input
                                v-model:value="bins_str_cut" 
                                style="
                                  width: 80%;
                                  text-align:left;
                                  margin-left:30px;
                                  margin-top:20px;
                                " 
                                placeholder="单个数值作为分类数目,多个值作为分类的区间,如:0,5,10或者单数值2" 
                                size="large"
                              />
                            </div>
                            <div>
                              <span style="font-size:16px"><strong>类别定义</strong></span>
                              <a-input
                                v-model:value="labels_str_cut" 
                                style="
                                  width: 80%;
                                  text-align:left;
                                  margin-left:30px;
                                  margin-top:20px;
                                " 
                                placeholder="离散化后的类别,个数与区间数/分类数一致,如:类别1,类别3,类别3" 
                                size="large"
                              />
                            </div>
                          </div>
                        </a-modal>
                      </div>
                    </a-menu-item>
                    <a-menu-item key="option_11">
                      等频离散
                      <div>
                        <a-modal
                          width="700px"
                          :visible="modalVisible[12]"
                          :dialog-style="{ top: '150px' }"
                          :confirm-loading="confirmLoading[12]"
                          @ok="handleOk(12)"
                          @cancel="handleCancel(12)"
                          ok-text="确认"
                          cancel-text="取消"
                        >
                          <template v-slot:title> 等频离散 </template>
                          <div style="width: 650px; height: 250px; background: #fff">
                            <div>
                              <span style="font-size:16px"><strong>字段选择:</strong></span>
                              <a-select
                                mode="multiple"
                                style="
                                  width: 80%;
                                  text-align: left;
                                  margin-left:30px;
                                  margin-top:20px;
                                "
                                placeholder="选择需要等频离散化的列"
                                allowClear="true"
                                v-model:value="qcut_fields"
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
                            <div>
                              <span style="font-size:16px"><strong>区间定义</strong></span>
                              <a-input
                                v-model:value="bins_str_qcut" 
                                style="
                                  width: 80%;
                                  text-align:left;
                                  margin-left:30px;
                                  margin-top:20px;
                                " 
                                placeholder="单个数值作为分类数目,多个分位数值作为分类的区间,如:0,0.5,1或者单数值2" 
                                size="large"
                              />
                            </div>
                            <div>
                              <span style="font-size:16px"><strong>类别定义</strong></span>
                              <a-input
                                v-model:value="labels_str_qcut" 
                                style="
                                  width: 80%;
                                  text-align:left;
                                  margin-left:30px;
                                  margin-top:20px;
                                " 
                                placeholder="离散化后的类别,个数与区间数/分类数一致,如:类别1,类别3,类别3" 
                                size="large"
                              />
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
          <!--高级加工-->
          <div style="float: left; width: 10%; margin: 7px 0 0 10px">
            <a-popover :visible="visible" placement="bottom" trigger="click">
              <template v-slot:content>
                <div style="width: 1000px; height: 150px; background: #fff">
                  <div style="width: 1000px; height: 100px; overflow: auto">
                    <a-checkbox-group @change="onChange">
                      <a-row>
                        <a-col v-for="item in processOption" :key="item" :span="8">
                          <a-checkbox :value="item">{{item}} </a-checkbox>
                        </a-col>
                      </a-row>
                    </a-checkbox-group>
                  </div>
                  <div style="position: absolute; top: 190px; right: 500px">
                    <button
                      @click="hide(1)"
                      style="
                        background: #d3d3d3;
                        color: black;
                        border: 2px solid #e7e7e7;
                        padding: 2px 24px;
                        cursor: pointer;
                      "
                    >
                      OK
                    </button>
                  </div>
                </div>
              </template>
              <template v-slot:title>
                <div>
                  <span style="margin: 0 10px 0 0; font-weight: bolder"
                    >行业数据选择:</span
                  >
                  <a-select
                    placeholder="选择行业数据"
                    style="width: 140px; align: left"
                    allowClear="true"
                    @change="handleChange"
                  >
                    <a-select-option value="car">
                      汽车行业数据
                    </a-select-option>
                  </a-select>
                </div>
              </template>
              <a-button
                @click="hide(0)"
                style="
                  background-color: white;
                  color: black;
                  border: 1px solid #e7e7e7;
                  cursor: pointer;
                  width: 120px;
                  height: 32px;
                "
                >{{$store.getters.getSystemLanguage === 0?"行业数据加工":"Industry"}}
              </a-button>
            </a-popover>
          </div>
          <!--数据拆分-->
          <div style="float: left; width: 10%; margin: 7px 0 0 10px">
            <button
              @click="showModal(14)"
              style="
                background-color: white;
                color: black;
                border: 1px solid #e7e7e7;
                cursor: pointer;
                width: 120px;
                height: 32px;
              "
            >
              {{$store.getters.getSystemLanguage === 0?"数据拆分":"Split"}}
            </button>
            <div>
              <a-modal
                width="700px"
                :visible="modalVisible[14]"
                :dialog-style="{ top: '150px' }"
                :confirm-loading="confirmLoading[14]"
                @ok="handleOk(14)"
                @cancel="handleCancel(14)"
                ok-text="OK"
                cancel-text="Cancel"
              >
                <template v-slot:title>
                  <div style="height: 20px"><strong>{{$store.getters.getSystemLanguage === 0?"表格拆分":"Split Sheet"}}</strong></div>
                </template>
                <div style="width: 650px; height: 250px; background: #fff">
                  <div>
                    <span style="font-size: 16px;"><strong>{{$store.getters.getSystemLanguage === 0?"表格选择:":"Sheet:"}}</strong></span>
                    <a-select
                      style="
                        width: 80%;
                        text-align: left;
                        margin-left:30px;
                        margin-top:20px;
                      "
                      allowClear="true"
                      placeholder="选择要拆分的文件"
                      v-model:value="split_file"
                      @change="loadFields(split_file)"
                      size="large"
                    >
                      <a-select-option
                        v-for="item in fileList"
                        :key="item"
                        :value="item"
                        >{{ item }}
                      </a-select-option>
                    </a-select>
                  </div>
                  <div>
                    <span style="font-size:16px"><strong>{{$store.getters.getSystemLanguage === 0?"字段选择:":"Field:"}}</strong></span>
                    <a-select
                      mode="multiple"
                      style="
                        width: 80%;
                        text-align: left;
                        margin-left:30px;
                        margin-top:20px;
                      "
                      placeholder="选择要拆分出的字段"
                      allowClear="true"
                      v-model:value="split_fields"
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
                  <div>
                    <span style="font-size:16px"><strong>{{$store.getters.getSystemLanguage === 0?"文件选择:":"File Name:"}}</strong></span>
                    <a-input
                      v-model:value="split_new_file" 
                      style="
                        width: 80%;
                        text-align:left;
                        margin-left:30px;
                        margin-top:20px;
                      "
                      placeholder="输入生成的文件名" 
                      size="large"
                    />
                  </div>
                </div>
              </a-modal>
            </div>
          </div>
          <!--数据预测-->
          <div style="float: left; width: 10%; margin: 7px 0 0 10px">
            <button
              @click="showModal(15)"
              style="
                background-color: white;
                color: black;
                border: 1px solid #e7e7e7;
                cursor: pointer;
                width: 120px;
                height: 32px;
              "
            >
              {{$store.getters.getSystemLanguage === 0?"数据预测":"Predict"}}
            </button>
            <div>
              <a-modal
                width="700px"
                :visible="modalVisible[15]"
                :dialog-style="{ top: '150px' }"
                :confirm-loading="confirmLoading[15]"
                @ok="handleOk(15)"
                @cancel="handleCancel(15)"
                ok-text="OK"
                cancel-text="Cancel"
              >
                <template v-slot:title>
                  <div style="height: 20px"><strong>{{$store.getters.getSystemLanguage === 0?"应用模型数据分析":"Apply Models for Data Predict"}}</strong></div>
                </template>
                <div style="width: 650px; height: 250px; background: #fff">
                  <div>
                    <span style="font-size: 16px;"><strong>{{$store.getters.getSystemLanguage === 0?"模型选择:":"Model:"}}</strong></span>
                    <a-select
                      style="
                        width: 80%;
                        text-align: left;
                        margin-left:30px;
                        margin-top:20px;
                      "
                      placeholder="选择模型"
                      allowClear="true"
                      v-model:value="model_item"
                      size="large"
                    >
                      <a-select-option
                        v-for="item in model_list"
                        :key="item"
                        :value="item"
                        >{{ item }}
                      </a-select-option>
                    </a-select>
                  </div>
                  <div>
                    <span style="font-size: 16px;"><strong>{{$store.getters.getSystemLanguage === 0?"数据选择:":"DataSet:"}}</strong></span>
                    <a-select
                      style="
                        width: 80%;
                        text-align: left;
                        margin-left:30px;
                        margin-top:20px;
                      "
                      placeholder="选择数据预测"
                      allowClear="true"
                      v-model:value="test_file"
                      size="large"
                    >
                      <a-select-option
                        v-for="item in fileList"
                        :key="item"
                        :value="item"
                        >{{ item }}
                      </a-select-option>
                    </a-select>
                  </div>
                  <div>
                    <span style="font-size: 16px;"><strong>{{$store.getters.getSystemLanguage === 0?"保存方式:":"Save Way:"}}</strong></span>
                    <a-select
                      style="
                        width: 80%;
                        text-align: left;
                        margin-left:30px;
                        margin-top:20px;
                      "
                      placeholder="选择预测结果保存方式"
                      allowClear="true"
                      v-model:value="save_flag"
                      size="large"
                    >
                      <a-select-option
                        v-for="item in save_way[$store.getters.getSystemLanguage]"
                        :key="item"
                        :value="item"
                        >{{ item }}
                      </a-select-option>
                    </a-select>
                  </div>
                  <div v-show="save_flag == '保存至新文件' || save_flag == 'New File'">
                    <span style="font-size:16px;"><strong>{{$store.getters.getSystemLanguage === 0?"文件名称:":"File Name:"}}</strong></span>
                    <a-input
                      v-model:value="predFileName" 
                      style="width: 80%;text-align:left;margin:20px 0 0 30px" 
                      placeholder="请输入文件名称" 
                      size="large"
                    />
                  </div>
                </div>
              </a-modal>
            </div>
          </div>
          <!--数据删除-->
          <div style="float: left; width: 10%; margin: 7px 0 0 10px">
            <!--:disabled="selectedItem === ''"-->
            <button
              @click="showModal(16)"
              style="
                background-color: white;
                color: black;
                border: 1px solid #e7e7e7;
                cursor: pointer;
                width: 120px;
                height: 32px;
              "
            >
              {{$store.getters.getSystemLanguage === 0?"批量删除":"Bulk deletion"}}
            </button>
            <div>
              <a-modal
                width="700px"
                :visible="modalVisible[16]"
                :dialog-style="{ top: '150px' }"
                :confirm-loading="confirmLoading[16]"
                @ok="handleOk(16)"
                @cancel="handleCancel(16)"
                ok-text="OK"
                cancel-text="Cancel"
              >
                <template v-slot:title>
                  <div style="height: 20px"><strong>{{$store.getters.getSystemLanguage === 0?"批量删除":"Bulk deletion"}}</strong></div>
                </template>
                <div style="width: 650px; height: 250px; background: #fff">
                  <div>
                    <span style="font-size: 16px;"><strong>{{$store.getters.getSystemLanguage === 0?"删除方式":"Deletion Mode"}}</strong></span>
                    <a-select
                      style="
                        width: 80%;
                        text-align: left;
                        margin-left:30px;
                        margin-top:20px;
                      "
                      placeholder="选择删除方式"
                      allowClear="true"
                      v-model:value="delete_axis"
                      size="large"
                    >
                      <a-select-option
                        v-for="item in delete_option[$store.getters.getSystemLanguage]"
                        :key="item"
                        :value="item"
                        >{{ item }}
                      </a-select-option>
                    </a-select>
                  </div>
                  <div v-show="delete_axis == '按列删除' || delete_axis == 'Column'">
                    <span style="font-size:16px"><strong>{{$store.getters.getSystemLanguage === 0?"字段选择":"Field"}}</strong></span>
                    <a-select
                      mode="multiple"
                      style="
                        width: 80%;
                        text-align: left;
                        margin-left:25px;
                        margin-top:20px;
                      "
                      placeholder="选择要删除的字段"
                      allowClear="true"
                      v-model:value="delete_fields"
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
                </div>
              </a-modal>
            </div>
          </div>
          <div style="float: left; width: 10%; margin: 7px 0 0 10px">
            <button
              @click="modifyData"
              style="
                background-color: white;
                color: black;
                border: 1px solid #e7e7e7;
                cursor: pointer;
                width: 120px;
                height: 32px;
              "
              :disabled="selectedItem === ''"
            >
              {{$store.getters.getSystemLanguage === 0?"保存修改":"Modification"}}
            </button>
          </div>


        </div>
      </div>
      <!--hr style="width: 98%" /-->
      <!--表格区域-->
      <div v-if="spinning == true"><a-spin :spinning="spinning" tip="数据加载中..."></a-spin></div>
      <div
        v-if="spinning == false"
        style="
          width: 97%;
          height: 400px;
          margin: 0 20px 5px 20px;
          background: #fff;
          order: 1px solid #e7e7e7;
        "
      >
        <a-table
          :data-source="data"
          :columns="columns"
          :pagination="pagination"
          :showHeader="true"
          bordered="true"
          :scroll="{  y: 470 }"
        >
          <template  v-for="item in customCol" :key="item" v-slot:[item]="{ text,index,column}">
            <div class="editable-cell">
              <div v-if="editableData[`${index}`]" class="editable-cell-input-wrapper">
                <a-input v-model:value="editableData[`${index}`][column.dataIndex]" @pressEnter="save(index,column.dataIndex)" />
                <check-outlined class="editable-cell-icon-check" @click="save(index,column.dataIndex)" />
              </div>
              <div v-else class="editable-cell-text-wrapper">
                {{ text }}
                <edit-outlined class="editable-cell-icon" @click="edit(index,column.dataIndex)" />
              </div>
            </div>
          </template>
          <template #delete="{index}">
            <a-popconfirm
              v-if="data.length"
              title="确认删除"
              okText="确认"
              cancelText="取消"
              @confirm="onDelete(index)"
            >
              <a>删除</a>
            </a-popconfirm>
          </template>
        </a-table>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { FileOutlined,CheckOutlined,EditOutlined } from "@ant-design/icons-vue";
//import { cloneDeep } from 'lodash-es';
import {inject} from "vue"
import axios from "axios";
export default {
  inject:['reload'],
  data() {
    return {


      editableData:{},
      customCol:[],   //动态插槽

      //修改结果
      modifyFlag:false,
      modifyAns:{
        edit:[],
        delete:[],
      },   

      processOption:Array,
      visible: false,
      modalVisible: Array(17).fill(false),
      confirmLoading: Array(17).fill(false),
      /*data: [{
        name: 'Edward King 0',
        age: 32,
        address: 'London, Park Lane no. 0',
      },
      {
        name: 'Edward King 1',
        age: 32,
        address: 'London, Park Lane no. 1',
      }],*/
      data:[],
      columns: [],
      dataHeader: {},
      tableWidth: 1000,
      varCounts: 0,

      selectedFileList:[],  //多选框中选择的数据文件
      workFileList:[],  //工作表中的数据表
      fileList:[],  //加工台中的数据表
      selectBox:[], //多选框值

      selectedItem:"",

      // 表格字段列表
      varList:[],

      //表格合并
      merge_name:"",
      concat_name_0:"",
      concat_name_1:"",
      merge_list:[],
      concat_list_0:[],
      concat_list_1:[],

      //缺失值处理
      nan_pro_meth_list:[["删除", "填充", "插值"],["Drop", "Fill", "Interpolation"]],   //处理方式
      nan_pro_meth:"",

      drop_meth_list:[["删除存在空值特征记录","删除整行为空值的记录","根据特征判断"],["Exist","All","Field"]], //删除方式
      drop_meth:"",
      drop_pro_fields:[],  //删除判断的特征

      fill_meth_list:[["整表缺失值替换","前置填充","后置填充","根据特征填充"],["Replace All","Front","Behind","Field"]],
      fill_meth:"",
      fill_all_nan_value:"",
      fill_pro_fields:[],  //指定特征数组
      fill_fields_meth_list:[["均值","中位数","众数","自定义填充值"],["Mean","Median","Mode","Customization"]], //根据特征的填充方式
      fill_fields_meth:"",
      fill_fields_meth_value:"",    //自定义填充值

      inter_meth_list:[["线性插值","二次多项式插值","三次样条插值"],["Linear","Polynomial","Spline"]],
      inter_meth:[],
      inter_pro_fields:[],

      //重复数据处理
      duplicate_axis:[["处理重复行","处理重复列"],["Duplicate Row","Duplicate Column"]],
      duplicate_axis_meth:"",
      row_duplicate:[["整行重复","特征字段重复"],["All","Field"]],
      row_duplicate_meth:"",
      duplicate_fields:[],





      //标准化
      min_max_scale_fields:[],
      standard_scale_fields:[],
      decemal_scale_fields:[],


      //数据离散化
      //等宽离散
      cut_fields:[],
      bins_str_cut:"",
      bins_list_cut:[],
      labels_str_cut:"",
      labels_list_cut:[],

      //等频离散
      qcut_fields:[],
      bins_str_qcut:"",
      bins_list_qcut:[],
      labels_str_qcut:"",
      labels_list_qcut:[],



      //数据拆分
      split_file:"",
      split_fields:[],
      split_new_file:"",

      //模型
      model_list:[],
      test_file:"",
      model_item:"",
      save_flag:"",
      predFileNmae:"",

      save_way:[['保存至新文件','保存至原文件'],['New File','Original File']],


      //数据删除
      delete_option:[["按列删除","按行删除"],["Row","Column"]],
      delete_axis:"",
      delete_fields:[],


      spinning:false,
      delayTime:500,
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
    CheckOutlined,
    EditOutlined,
  },
  mounted () {
    this.getFileList(); //获取工作表列表
    //this.updateColumn();
  },
  methods: {
    reloadData(){
      this.spinning = true;
      axios.get(this.$store.state.base_url + "/api/loadProcessPlatformFile",{params:{'name':this.$store.state.userName,'file_name':this.selectedItem}})
      .then((res) => {
        this.data = res.data;
        this.updateColumn();
      });
    },
    async getWorkSheetFileList(){ //获取工作表模块中的数据表
      await axios.get(this.$store.state.base_url + "/api/getCsvFileName",{params:{'name':this.$store.state.userName}})
        .then(res=>{
        this.workFileList = res.data;
      });
    },
    async getFileList(){ //获取加工台数据表列表
      await axios.get(this.$store.state.base_url + "/api/getProcessFileName",{params:{'name':this.$store.state.userName}})
        .then(res=>{
        this.fileList = res.data;
      });
    },
    async loadFields(item){
      await axios.get(this.$store.state.base_url + "/api/loadStatFields",{params:{'name':this.$store.state.userName,'file_name':item}})
        .then(res=>{
          console.log(res.data)
          this.varList = res.data['columns']
      });
    },
    async deleteItem(){ //删除加工台的数据表
      if(this.selectedItem.length != 0){
        await axios.get(this.$store.state.base_url + "/api/delFromProcessPlatform",{params:{'name':this.$store.state.userName,'file_name':this.selectedItem}})
          .then(res=>{
          alert(res.data);
        });
        this.reload();
      }else{
        alert("请选择文件");
      }  
    },
    async addWorkSheetFile(){  //将数据源中的Excel文件添加到工作表
      const formData = new FormData();
      for(let i = 0; i < this.SelectedFileList.length; i++){
        formData.append('csvList[]',this.SelectedFileList[i]);
      }
      formData.append('name',this.$store.state.userName);
      await axios.post(this.$store.state.base_url + "/api/addToProcessPlatform",formData)
        .then(res=>{
        alert(res.data);
        this.selectBox.length = 0;
        this.getFileList()
        this.reload();
      });
    },
    async getModelList(){
      await axios.get(this.$store.state.base_url + "/api/getModelList",{params:{'name':this.$store.state.userName,'industry':this.$store.getters.getSystemTitle}})
        .then(res=>{
          //alert(res.data);
          this.model_list = res.data;
        })
    },
    async tabularMerge(flag){
      const formData = new FormData();
      formData.append('name',this.$store.state.userName);
      if(flag == 2){
        formData.append('file_name',this.concat_name_1);
        for(let i = 0; i < this.concat_list_1.length; i++){
          formData.append('tabularList[]',this.concat_list_1[i]);
        }
        formData.append('method',"concat_1");
      }
      if(flag == 3){
        formData.append('file_name',this.concat_name_0);
        for(let i = 0; i < this.concat_list_0.length; i++){
          formData.append('tabularList[]',this.concat_list_0[i]);
        }
        formData.append('method',"concat_0");
      }
      if(flag == 4){
        formData.append('file_name',this.merge_name);
        for(let i = 0; i < this.merge_list.length; i++){
          formData.append('tabularList[]',this.merge_list[i]);
        }
        formData.append('method',"merge");
      }
      await axios.post(this.$store.state.base_url + "/api/tabularMerge",formData)
        .then(res=>{
        alert(res.data);
        this.reload();
      });
      
    },
    async duplicateProcess(){
      const formData = new FormData();
      formData.append('name',this.$store.state.userName);
      formData.append('file_name',this.selectedItem);
      if(this.duplicate_axis_meth == "处理重复行" || this.duplicate_axis_meth == "Duplicate Row"){
        formData.append('duplicate_axis',"row");
        if(this.row_duplicate_meth == "整行重复" || this.row_duplicate_meth == "All"){
          formData.append('process_flag',"0");
        }
        if(this.row_duplicate_meth == "特征字段重复" || this.row_duplicate_meth == "Field"){
          formData.append('process_flag',"1");
          for(let i = 0;i<this.duplicate_fields.length;i++){
            formData.append('field_list[]',this.duplicate_fields[i]);
          }
        }
      }
      if(this.duplicate_axis_meth == "处理重复列" || this.duplicate_axis_meth == "Duplicate Column"){
        formData.append('duplicate_axis',"col");
        formData.append('process_flag',"0");
      }
      await axios.post(this.$store.state.base_url + "/api/duplicateProcess",formData)
        .then(res=>{
          alert(res.data);
          //this.reload();
          this.reloadData();
        });
    },
    async minMaxScale(){
      const formData = new FormData();
      formData.append('name',this.$store.state.userName);
      formData.append('file_name',this.selectedItem);
      for(let i = 0;i<this.min_max_scale_fields.length;i++){
        formData.append('field_list[]',this.min_max_scale_fields[i]);
      }
      await axios.post(this.$store.state.base_url + "/api/minMaxScale",formData)
        .then(res=>{
          alert(res.data);
          this.reloadData();
          //this.reload();
        });
    },
    async standardScale(){
      const formData = new FormData();
      formData.append('name',this.$store.state.userName);
      formData.append('file_name',this.selectedItem);
      for(let i = 0;i<this.standard_scale_fields.length;i++){
        formData.append('field_list[]',this.standard_scale_fields[i]);
      }
      await axios.post(this.$store.state.base_url + "/api/standardScale",formData)
        .then(res=>{
          alert(res.data);
          this.reloadData();
          //this.reload();
        });
    },
    async decimalScale(){
      const formData = new FormData();
      formData.append('name',this.$store.state.userName);
      formData.append('file_name',this.selectedItem);
      for(let i = 0;i<this.decemal_scale_fields.length;i++){
        formData.append('field_list[]',this.decemal_scale_fields[i]);
      }
      await axios.post(this.$store.state.base_url + "/api/decimalScale",formData)
        .then(res=>{
          alert(res.data);
          this.reloadData();
          //this.reload();
        });
    },
    async dataCut(){
      const formData = new FormData();
      formData.append('name',this.$store.state.userName);
      formData.append('file_name',this.selectedItem);
      this.bins_list_cut = this.bins_str_cut.split(",");
      this.labels_list_cut = this.labels_str_cut.split(",")
      console.log(this.bins_list_cut)
      console.log(this.labels_list_cut)
      for(let i = 0;i<this.cut_fields.length;i++){
        formData.append('field_list[]',this.cut_fields[i]);
      }
      for(let item in this.bins_list_cut){
        formData.append('class_bins[]',this.bins_list_cut[item]);
      }
      for(let item in this.labels_list_cut){
        formData.append('class_labels[]',this.labels_list_cut[item]);
      }
      await axios.post(this.$store.state.base_url + "/api/dataCut",formData)
        .then(res=>{
          alert(res.data);
          this.reloadData();
          //this.reload();
        });
    }, 
    async dataQCut(){
      const formData = new FormData();
      formData.append('name',this.$store.state.userName);
      formData.append('file_name',this.selectedItem);
      this.bins_list_qcut = this.bins_str_qcut.split(",");
      this.labels_list_qcut = this.labels_str_qcut.split(",")
      for(let i = 0;i<this.qcut_fields.length;i++){
        formData.append('field_list[]',this.qcut_fields[i]);
      }
      for(let item in this.bins_list_qcut){
        formData.append('class_bins[]',this.bins_list_qcut[item]);
      }
      for(let item in this.labels_list_qcut){
        formData.append('class_labels[]',this.labels_list_qcut[item]);
      }
      await axios.post(this.$store.state.base_url + "/api/dataQCut",formData)
        .then(res=>{
          alert(res.data);
          this.reloadData();
          //this.reload();
        });
    }, 
    async dropData(){
      const formData = new FormData();
      formData.append('name',this.$store.state.userName);
      formData.append('file_name',this.selectedItem);
      if(this.delete_axis == "按列删除" || this.delete_axis == "Column"){
        formData.append('drop_flag',"1");
        for(let i = 0;i<this.delete_fields.length;i++){
            formData.append('field_list[]',this.delete_fields[i]);
        }
      }
       await axios.post(this.$store.state.base_url + "/api/dropData",formData)
        .then(res=>{
          alert(res.data);
          this.reloadData();
        });
    },
    async splitData(){
      const formData = new FormData();
      formData.append('name',this.$store.state.userName);
      formData.append('file_name',this.split_file);
      for(let i = 0;i<this.split_fields.length;i++){
          formData.append('field_list[]',this.split_fields[i]);
      }
      formData.append('new_file_name',this.split_new_file);
       await axios.post(this.$store.state.base_url + "/api/splitData",formData)
        .then(res=>{
          alert(res.data);
          this.reload();
        });
    },
    async predSave(){
      const formData = new FormData();
      formData.append('name',this.$store.state.userName);
      formData.append('model_name',this.model_item);
      formData.append('file_name',this.test_file);
      if(this.save_flag == "保存至新文件" || this.save_flag == "New File"){
        formData.append('save_flag',"0");
        formData.append('new_file_name',this.predFileName);
      }
      if(this.save_flag == "保存至原文件" || this.save_flag == "Original File"){
        formData.append('save_flag',"1");
      }
       await axios.post(this.$store.state.base_url + "/api/predSave",formData)
        .then(res=>{
          alert(res.data);
          this.reload();
        });
    },
    async nanProcess(){
      const formData = new FormData();
      formData.append('name',this.$store.state.userName);
      formData.append('file_name',this.selectedItem);
      if(this.nan_pro_meth == "删除" || this.nan_pro_meth == "Drop"){
        formData.append('process_meth',"drop");
        if(this.drop_meth == "删除存在空值特征记录" || this.drop_meth == "Exist"){
          formData.append('process_flag',"0");
        }
        if(this.drop_meth == "删除整行为空值的记录" || this.drop_meth == "All"){
          formData.append('process_flag',"1");
        }
        if(this.drop_meth == "根据特征判断" || this.drop_meth == "Field"){
          formData.append('process_flag',"2");
          for(let i = 0;i<this.drop_pro_fields.length;i++){
            formData.append('field_list[]',this.drop_pro_fields[i]);
          }
        }
      }
      if(this.nan_pro_meth == "填充" || this.nan_pro_meth == "Fill"){
        formData.append('process_meth',"fill");
        if(this.fill_meth == "整表缺失值替换" || this.fill_meth == "Replace All"){
          formData.append('process_flag',"0");
          formData.append('fill_value',this.fill_all_nan_value);
        }
        if(this.fill_meth == "前置填充" || this.fill_meth == "Front"){
          formData.append('process_flag',"1");
        }
        if(this.fill_meth == "后置填充" || this.fill_meth == "Behind"){
          formData.append('process_flag',"2");
        }
        if(this.fill_meth == "根据特征填充" || this.fill_meth == "Field"){
          if(this.fill_fields_meth == "均值" || this.fill_fields_meth == "Mean"){
            formData.append('process_flag',"3");
          }
          if(this.fill_fields_meth == "中位数" || this.fill_fields_meth == "Median"){
            formData.append('process_flag',"4");
          }
          if(this.fill_fields_meth == "众数" || this.fill_fields_meth == "Mode"){
            formData.append('process_flag',"5");
          }
          if(this.fill_fields_meth == "自定义填充值" || this.fill_fields_meth == "Customization"){
            formData.append('process_flag',"6");
            formData.append('fill_value',this.fill_fields_meth_value);
          }
          for(let i = 0;i<this.fill_pro_fields.length;i++){
            formData.append('field_list[]',this.fill_pro_fields[i]);
          }
        }
      }
      if(this.nan_pro_meth == "插值" || this.nan_pro_meth == "Interpolation"){
        formData.append('process_meth',"inter");
        for(let i = 0;i<this.inter_pro_fields.length;i++){
            formData.append('field_list[]',this.inter_pro_fields[i]);
        }
        if(this.inter_meth == "线性插值" || this.inter_meth == "Linear"){
          formData.append('process_flag',"0");
        }
        if(this.inter_meth == "二次多项式插值" || this.inter_meth == "Polynomial"){
          formData.append('process_flag',"1");
        }
        if(this.inter_meth == "三次样条插值" || this.inter_meth == "Spline"){
          formData.append('process_flag',"2");
        }
      }
      await axios.post(this.$store.state.base_url + "/api/nanProcess",formData)
        .then(res=>{
          alert(res.data);
          this.reloadData();
          //this.reload();
          /*axios.get("http://10.62.141.130:5000/api/loadProcessPlatformFile",{params:{'name':this.$store.state.userName,'file_name':this.selectedItem}})
          .then((res) => {
            this.data = res.data;
            this.updateColumn();
          });*/
        });
    },
    updateColumn() { //表格columns更新
      this.columns.splice(0);
      this.customCol = [];
      //this.editableData = this.data;
      for (var key in this.data[0]) {
        if(key != "key"){
          this.varCounts++;
          var obj = {};
          obj.title = key;
          obj.dataIndex = key;
          obj.key = key;
          obj.width = 150;
          obj.slots = { customRender: `${key}` },
          this.customCol.push(key);
          this.columns.push(obj);
        }
      }
      this.columns.push({
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        slots: { customRender: "delete" },
      })
      // this.tableWidth = 200 * this.varCounts; //表格宽度调整
      //console.log(this.varCounts);
      //console.log(this.tableWidth);
      this.varCounts = 0;
      this.spinning = false;
    },
    edit(recordIndex,key){
      //alert(recordIndex);
      //alert(key);
      //alert(recordIndex);
      //alert(typeof(recordIndex));
      //let ans = cloneDeep(this.data.filter(index => recordIndex === index))
      //console.log(this.customCol);
      let ans = this.data.filter(function(value,index){
          return index == recordIndex;
        })
      //console.log("过滤");
      //console.log(ans);
      this.editableData[`${recordIndex}`] = ans[0];
      console.log("编辑");
      console.log(this.editableData);
    },
    save(recordIndex,key){
      
      Object.assign(this.data.filter(function(value,index){return index == recordIndex;}), this.editableData[`${recordIndex}`]);
      console.log("保存编辑");
      //console.log(this.editableData);
      //this.modifyAns["edit"].push(this.editableData);
      //console.log(this.modifyAns);
      delete this.editableData[`${recordIndex}`];
      console.log(this.data);
      this.modifyFlag = true;
    },
    onDelete(recordIndex){
      this.data = this.data.filter(function(value,index){return index != recordIndex;});
      console.log("删除数据");
      //this.modifyAns["delete"].push(recordIndex);
      //console.log(this.modifyAns);
      console.log(this.data);
      this.modifyFlag = true;
    },
    async modifyData(){
      if(this.modifyFlag == false){
        alert("数据未修改");
        return 0;
      }
      const formData = new FormData();
      formData.append('name',this.$store.state.userName);
      formData.append('file_name',this.selectedItem);
      for(let i = 0;i<this.data.length;i++){
          console.log(this.data[i])
          formData.append('modify_data[]',JSON.stringify(this.data[i]));
      }
      await axios.post(this.$store.state.base_url + "/api/modifyData",formData)
      .then(res=>{
        alert(res.data);
        this.modifyFlag = false;
        /*axios.get("http://10.62.141.130:5000/api/loadProcessPlatformFile",{params:{'name':this.$store.state.userName,'file_name':this.selectedItem}})
          .then((res) => {
            this.data = res.data;
            this.updateColumn();
          });
          */
         this.reloadData();
        //this.reload();
      });
    },
    async loadData(item) {//数据表加载
      this.spinning = true;
      this.selectedItem = item.key;
      this.pagination.current = 1;

      await axios.get(this.$store.state.base_url + "/api/loadProcessPlatformFile",{params:{'name':this.$store.state.userName,'file_name':this.selectedItem}})
        .then((res) => {
          // this.dataHeader = res.data.dataHeader;
          this.data = res.data;
          //alert(res.data);
          this.updateColumn();
          console.log("加载数据")
          console.log(this.data)
          //console.log(this.data);
        });
    },
    hide(n) { //高级加工板块
      if (n == 0) { //高级加工按钮
        this.visible = !this.visible;
        console.log(this.visible);
      }
      if (n == 1) {//高级加工确认按钮
        this.visible = false;
        console.log(this.visible);
        //this.data = [0];
      }
    },
    handleChange(value){//高级加工行业数据选择
      if(value === "car"){
        this.processOption = ["M排量","M功率","前轮距","后轮距","轴距","最高车速"];
      }else{
        this.processOption = [];
      }
    },
    selectBoxChange(value){ //文件选择框改变
      this.SelectedFileList = value;
      console.log(this.SelectedFileList);
      console.log(this.SelectedFileList.length);
    },
    showModal(n) {
      this.modalVisible[n] = true;
      if(n == 1){
        this.getWorkSheetFileList()
      }
      if(n == 15){
        this.getModelList();
      }
      if(n == 16 || n == 8 || n == 9 || n == 10){
        this.loadFields(this.selectedItem);
      }
    },
    handelClick(item) { //数据清洗，合并，标准化，离散化单击响应
      if (item.key == "option_1") {   //横向堆叠
        this.showModal(2);
      }
      if (item.key == "option_2") {   //纵向堆叠
        this.showModal(3);
      }
      if (item.key == "option_3") {    //主键合并
        this.showModal(4);
      }
      if (item.key == "option_4") {   //缺失值处理
        this.showModal(5);
        this.loadFields(this.selectedItem);
      }
      if (item.key == "option_5") {   //重复数据处理
        this.showModal(6);
        this.loadFields(this.selectedItem);
      }
      if (item.key == "option_6") {   //异常数据处理
        this.showModal(7);
      }
      if (item.key == "option_7") {    //离差标准化
        this.showModal(8);
      }
      if (item.key == "option_8") {    //标准差标准化
        this.showModal(9);
      }
      if (item.key == "option_9") {    //小数定标标准化
        this.showModal(10);
      }
      if (item.key == "option_10") {    //等宽离散
        this.showModal(11);
        this.loadFields(this.selectedItem);
      }
      if (item.key == "option_11") {  //等频离散
        this.showModal(12);
        this.loadFields(this.selectedItem);
      }
      if (item.key == "option_12") {
        this.showModal(13);
      }
    },
    handleOk(n) { //弹出对话框的确定按钮响应
      if (n == 1) {  //添加数据
        //this.confirmLoading[n] = true;
        this.modalVisible[n] = false;
        this.addWorkSheetFile();
        //this.confirmLoading[n] = false;
      }
      if (n == 2) {   //横向堆叠
        //this.confirmLoading[n] = true;
        this.modalVisible[n] = false;
        this.tabularMerge(2);
        //this.confirmLoading[n] = false;
      }
      if (n == 3) {  //纵向堆叠
        //this.confirmLoading[n] = true;
        this.modalVisible[n] = false;
        this.tabularMerge(3);
        //this.confirmLoading[n] = false;
      }
      if (n == 4) {   //主键合并
        //this.confirmLoading[n] = true;
        this.modalVisible[n] = false;
        this.tabularMerge(4);
        //this.confirmLoading[n] = false;
      }
      if (n == 5) {  //缺失值处理
        // this.confirmLoading[n] = true;
        this.modalVisible[n] = false;
        this.nanProcess();
        // this.confirmLoading[n] = false;
      }
      if (n == 6) {  //重复数据处理
        //this.confirmLoading[n] = true;
        
        this.duplicateProcess();
        this.modalVisible[n] = false;
        //this.confirmLoading[n] = false;
      }
      if (n == 7) {  //异常值处理

      }
      if (n == 8) {  //离差标准化
        //this.confirmLoading[n] = true;
        this.modalVisible[n] = false;
        this.minMaxScale();
        //this.confirmLoading[n] = false;
      }
      if (n == 9) {  //标准差标准化
        //this.confirmLoading[n] = true;
        this.modalVisible[n] = false;
        this.standardScale();
        //this.confirmLoading[n] = false;
      }
      if (n == 10) {   //小数定标标准化
        //this.confirmLoading[n] = true;
        this.modalVisible[n] = false;
        this.decimalScale();
        //this.confirmLoading[n] = false;
      }
      if (n == 11) {  //等宽离散化
        //this.confirmLoading[n] = true;
        this.modalVisible[n] = false;
        this.dataCut();
        //this.confirmLoading[n] = false;
      }
      if (n == 12) {  //等频离散化
        //this.confirmLoading[n] = true;
        this.modalVisible[n] = false;
        this.dataQCut();
        //this.confirmLoading[n] = false;
      }
      if (n == 13) {  //聚类离散化

      }
      if (n == 14) {  //数据拆分
        //this.confirmLoading[n] = true;
        this.modalVisible[n] = false;
        this.splitData();
        //this.confirmLoading[n] = false;
      }
      if (n == 15) {  //数据预测
        //this.confirmLoading[n] = true;
        this.modalVisible[n] = false;
        this.predSave();
        //this.confirmLoading[n] = false;
      }
      if (n == 16){  //数据删除
        //this.confirmLoading[n] = true;
        this.modalVisible[n] = false;
        this.dropData();
        //this.confirmLoading[n] = false;
      }
    },
    handleCancel(n) { //弹出对话框的取消按钮响应
      this.modalVisible[n] = false;
      if(n == 1){
        this.selectBox.length = 0;
      }
    },
  },
};
</script>

<style lang="less">
.editable-cell {
  position: relative;
  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    margin-top: 4px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}
.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
</style>