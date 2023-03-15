<template>
  <div class="upload-wrap">
    <!-- action="https://jsonplaceholder.typicode.com/posts/" -->
    <el-upload
      class="upload-content"
      action="string"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="5000"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :show-file-list="false"
      :http-request="toRequest"
    >
      <el-button type="primary">上传</el-button>
      <template #tip>
        <div class="el-upload__tip">
          请上传文件
        </div>
      </template>
    </el-upload>
    <div v-if="successData" class="successData">{{successData}}</div>
    <div v-if="errData.errCount" class="errCount">问题条数：{{errData.errCount}}</div>
    <div v-if="errData.importRepeatMsg.length>0" class="importRepeatMsg">导入数据重复校验：</div>
    <div v-if="errData.importRepeatMsg.length>0">
      <el-table
        :data="tableDataImportRepeatMsg"
        border
        height="400px"
        style="width: 660px">
        <el-table-column
          prop="序号"
          label="序号"
          align="center"
          type="index"
          width="60">
        </el-table-column>
        <el-table-column
          prop="工号"
          label="工号"
          align="center"
          width="600">
        </el-table-column>
      </el-table>
    </div>
    <div v-if="errData.checkName.length>0" class="checkName">系统数据校验：</div>
    <div v-if="errData.checkName.length>0">
      <el-table
        :data="tableDataCheckName"
        border
        height="400px"
        style="width: 660px">
        <el-table-column
          prop="序号"
          label="序号"
          align="center"
          type="index"
          width="60">
        </el-table-column>
        <el-table-column
          prop="工号"
          label="工号"
          align="center"
          width="300">
        </el-table-column>
        <el-table-column
          prop="系统名称"
          label="系统名称"
          align="center"
          width="300">
        </el-table-column>
      </el-table>
    </div>
    <!-- <div>{{errData.flag}}</div> -->
  </div>
</template>
<script lang="ts" setup>
import { Vue } from 'vue-class-component';
import { uploadFiles } from '@/api/index';
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import type { UploadUserFile, UploadFile } from 'element-plus'

const fileList = ref<UploadUserFile[]>([])

const handleRemove = (file: UploadFile, fileList: UploadFile[]) => {
  console.log(file, fileList)
}
const handlePreview = (file: UploadFile) => {
  console.log(file)
}
const handleExceed = (files: File[], fileList: UploadFile[]) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + fileList.length
    } totally`
  )
}
const beforeRemove = (file: UploadFile, fileList: UploadFile[]) => {
  return ElMessageBox.confirm(`Cancel the transfert of ${file.name} ?`).then(
    () => true,
    () => false
  )
}
let successData = ref('')
let errData = reactive({
  checkName: [],
  errCount: '',
  flag: '',
  importRepeatMsg: [],
})
let tableDataCheckName = reactive(
  [
    {
      "工号": '',
      "系统名称": ''
    }
  ]
)
let tableDataImportRepeatMsg = reactive(
  [
    {
      "工号": ''
    }
  ]
)

const toRequest = async (file: any, fileList: UploadFile[]) => {
  console.log('64', file)
  if(file.file.name.indexOf('.xls') < 0){
    ElMessage('请上传excel文件')
    return false
  }
  successData.value = ''
  // const isLt2M = dataA.file.size / 1024 / 1024 < this.imageSize
  // if (!isLt2M) {
  //   this.$message.error('上传证照大小不能超过' + this.imageSize + 'MB!')
  //   return false
  // }
  // // 发起请求
  let fd = new FormData()
  fd.append('file', file.file)
  await uploadFiles(fd).then((res:any) => {
    console.log('90', res)
    if(res.code === '0000'){
      successData.value = '上传成功'
      ElMessage.success('上传成功')
      errData.checkName = []
      errData.errCount = ''
      errData.flag = ''
      errData.importRepeatMsg = []
    }
  })
  .catch((err)=>{
    // ElMessage('上传失败')
    tableDataCheckName.length = 0
    errData.checkName = err.data.checkName.split(';')
    err.data.checkName.split(';').forEach((ele:any) => {
      if(ele){
        tableDataCheckName.push(
          {
            '工号': ele.split('，')[0],
            '系统名称': ele.split('，')[1]
          }
        )
      }
    });
    errData.errCount = err.data.errCount
    errData.flag = err.data.flag
    tableDataImportRepeatMsg.length = 0
    errData.importRepeatMsg = err.data.importRepeatMsg.split(';')
    err.data.importRepeatMsg.split(';').forEach((ele:any) => {
      if(ele){
        tableDataImportRepeatMsg.push(
          {
            '工号': ele
          }
        )
      }
    });
  })
  .finally(()=>{
    // ElMessage('操作完成')
  })
}
</script>
<style lang="scss">
.upload-wrap{
  display: flex;
  flex-direction: column;
  align-items: center;
  .successData{
    padding: 20px 0;
  }
  .errCount{
    height: 60px;
    line-height: 60px;
    width: 660px;
    text-align: left;
    font-weight: bold;
  }
  .checkName{
    height: 60px;
    line-height: 60px;
    width: 660px;
    text-align: left;
    font-weight: bold;
  }
  .importRepeatMsg{
    height: 60px;
    line-height: 60px;
    width: 660px;
    text-align: left;
    font-weight: bold;
  }
}
</style>