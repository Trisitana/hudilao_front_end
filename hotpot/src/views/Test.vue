<template>
  <el-upload
    ref="upload"
    action="http://192.168.102.155:8082/images/upload"
    :limit="1"
    list-type="picture-card"
    accept=".png, .jpg,.webp"
    v-model:file-list="fileList"
    :on-success="successUpload"
    :on-error="errorUpload"
    :on-exceed="handleExceed"
    :before-upload="beforeAvatarUpload"
    :class="{ disabled: uploadDisabled}"
    :on-preview="handlePictureCardPreview"
    
>
    <el-button size="small" type="primary"> 点击上传 </el-button>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>


</template>

<script setup lang="ts">
import { ElMessage, ElNotification,genFileId } from "element-plus";
import { onBeforeUpdate, ref ,computed} from "vue";
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

const picAction = ref(""); // 这个可以说的保存图片发的请求，也可以去当作图片获取的请求
// 也就是说这个可以存到对应的数据库中
const imageAction = ref("");
const flag = ref(false);
const upload = ref<UploadInstance>()

const fileList=ref([])


function successUpload(response) {
  ElNotification({
    message: "图片上传成功",
    type: "success",
    duration: 1500,
  });
  console.log(response);
  flag.value = true;
  imageAction.value = response.data;
  console.log(imageAction.value);
}
function beforeAvatarUpload(file) {
  const isLt2M = file.size / 1024 / 1024 < 1;
  if (!isLt2M) {
    ElNotification({
       message: "图片大小不能超过1MB",
       type: "error",
       duration: 1500,
  });
  return false;
  }
}
function errorUpload() {
  ElNotification({
    message: "图片上传失败",
    type: "error",
    duration: 1500,
  });
  console.log("error");
}
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}
const uploadDisabled = computed(() => {
            
   return  fileList.value.length > 0
})
const dialogImageUrl = ref('')
const dialogVisible = ref(false)  
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
</script>

<style>
.disabled .el-upload--picture-card {
  display: none;
}
</style>