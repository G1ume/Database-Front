import axios from "axios"
import {ElMessage} from 'element-plus'


const service = axios.create({
    baseURL: "https://api.imgbb.com/1/upload"
})

service.interceptors.response.use(response => {
    const code = response.data.code || 200
    if (code === 200) {
        return response.data.data
    }

    let msg = response.data.code + " " + response.data.msg
    ElMessage.error(msg)

    return Promise.reject('上传图片失败：' + msg)
})

/**
 * 上传图片
 * @param {File} file 图片文件
 * @param {RefImpl} progress 上传进度
 * @returns promise
 */
function uploadImage(file, progress) {
    let formData = new FormData();
    formData.append("file", file.file)
    // return service({
    //     url: "https://api.imgbb.com/1/upload",
    //     method: "post",
    //     data: formData,
    //     onUploadProgress(event) {
    //         let v = Math.round(event.loaded / event.total * 100)
    //         progress.value = v == 100 ? 80 : v
    //     },
    //
    // })
    return service.post('https://api.imgbb.com/1/upload', formData, {
        params: {
            key: "b3af80c7860822bee54611e28f1261e2",
        }
    })
}

export {uploadImage}
