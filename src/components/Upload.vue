<template>
  <div
    style="
      height: 200px;
      width: 1000px;
      display: table;
      position: relative;
      left: 300px;
      top: 100px;
    "
  >
    <a-upload-dragger
      name="file"
      :multiple="true"
      v-model:fileList="fileList"
      :remove="fileRemove"
      :beforeUpload="beforeUpload"
      accept="xls,.xlsx,.csv"
    >
      <p class="ant-upload-drag-icon">
        <a-icon type="inbox" />
      </p>
      <p class="ant-upload-text">{{$store.getters.getSystemLanguage === 0?"点击或者将文件拖曳到此处上传":"Click Here or Drag the File Here"}}</p>
      <!--p class="ant-upload-hint">{{$store.getters.getSystemLanguage === 0?"数据库 :":"DataBase :"}}支持单次或者批量上传</p-->
    </a-upload-dragger>
  </div>
  <div style="margin:200px 0 0 80px">
    <div>
      <a-button type="primary" @click="uploadFile">
        {{$store.getters.getSystemLanguage === 0?"上传":"Upload"}}
      </a-button>
    </div>
  </div>
</template>
<script>
import XLSX from "xlsx";
import Router from "@/router/index";
import axios from "axios";
export default {
  data() {
    return {
      fileList:[]
    };
  },
  components: {
    //Button,
  },
  methods: {
    customRequest(file){
       const formData = new FormData();
       formData.append('files', file.file);
       axios.post(this.$store.state.base_url + "/api/upload",formData)
       .then((res)=>{
          alert(res.data);
          file.status = "done";
       });
    },
    beforeUpload(file){
      this.fileList.push(file);
      console.log(`共有${this.fileList.length}文件上传`);
      return false;

    },
    fileRemove(file){
      const fileIndex = this.fileList.indexOf(file)  
      const newFileList = this.fileList.slice()  
      newFileList.splice(fileIndex, 1)  
      this.fileList = newFileList
      console.log(`移除一个文件,目前共有${this.fileList.length}文件上传`);
    },
    handleChange(file) {
      const status = file.status;
      if (status !== "uploading") {
        //console.log(file.fileList);
      }
      if (status == "done") {
        //this.$message.success(`${info.file.name} file uploaded successfully.`);
        console.log("file uploaded successfully");
      } else if (status == "error") {
        //this.$message.error(`${info.file.name} file upload failed.`);
        console.log("file upload failed");
      }
    },
    uploadFile(){
      if(this.fileList.length == 0){
        if(this.$store.getters.getSystemLanguage === 0){
          alert("当前无文件,请先选择文件再点击上传!");
        }
        if(this.$store.getters.getSystemLanguage === 1){
          alert("Pleases Select File First!");
        }
      }
      else{
        const formData = new FormData();
        for(let i = 0;i < this.fileList.length;i++){
          formData.append('files[]',this.fileList[i]);
          console.log(`装入文件${i}`);
        }
        formData.append('name',this.$store.state.userName);
        console.log(formData);
        axios.post(this.$store.state.base_url + "/api/upload",formData)
        .then((res)=>{
          alert(res.data);
          this.$router.push("/DataSrc");
          file.status = "done";
        });
      }
    }
  }
};
</script>
