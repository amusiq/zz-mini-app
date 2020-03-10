import Taro from "@tarojs/taro";
import wxLog from "./wxLog";

(function() {
  const config = {
    qiniuRegion: "ECN",
    qiniuImageURLPrefix: "https://file-storage.distinctclinic.com",
    qiniuUploadToken:
      "7HxTttXqWTy_8dExVipZsajVR8qizi30pVBbfyor:DRHjiSzWG4IlBxIi7c0HzXzj0PY=:eyJzY29wZSI6ImRpc3RpbmN0aGVhbHRoY2FyZSIsImRlYWRsaW5lIjoxNTUwMzI3MzI2fQ==",
    qiniuUploadTokenFunction: null,
    qiniuShouldUseQiniuFileName: false
  };

  module.exports = {
    upload: upload
  };
  /**
   * @param object fileObject
   * @param str qiniuUploadToken
   * @return Promise
   */
  function upload(fileObject, qiniuUploadToken, options, progress, cancelTask) {
    const filePath = fileObject.path;
    const tmpPromise = new Promise(function(resolve, reject) {
      if (null == filePath) {
        wxLog.error(
          `qiniuUpload file path empty,${JSON.stringify(fileObject)}`
        );
        reject("qiniu uploader need filePath to upload");
      }
      if (qiniuUploadToken) {
        config.qiniuUploadToken = qiniuUploadToken;
      }
      if (config.qiniuUploadToken) {
        //执行上传
        if (
          null == config.qiniuUploadToken &&
          config.qiniuUploadToken.length > 0
        ) {
          wxLog.error(
            `qiniu UploadToken is null, please check the init config or networking`
          );
          return;
        }
        const url = uploadURLFromRegionCode(config.qiniuRegion);
        let fileName = filePath.split("//")[1];
        if (options && options.key) {
          fileName = options.key;
        }
        const formData = {
          token: config.qiniuUploadToken
        };
        if (!config.qiniuShouldUseQiniuFileName) {
          formData["key"] = "distinct-wxmp/wxRecord/" + fileName;
        }
        const uploadTask = Taro.uploadFile({
          url: url,
          filePath: filePath,
          name: "file",
          formData: formData,
          success: function(res) {
            let dataString = res.data;
            if (res.data.hasOwnProperty("type") && res.data.type === "Buffer") {
              dataString = String.fromCharCode.apply(null, res.data.data);
            }
            try {
              const dataObject = JSON.parse(dataString);
              const imageUrl =
                config.qiniuImageURLPrefix + "/" + dataObject.key;
              dataObject.resourceURL = imageUrl;
              resolve(dataObject);
            } catch (e) {
              wxLog.error(
                `qiniu uploader parse JSON failed, origin String is: ${dataString} .${JSON.stringify(
                  fileObject
                )}`
              );
              reject(e);
            }
          },
          fail: function(error) {
            wxLog.error(
              `qiniu uploader fail. error message :${JSON.stringify(
                error
              )} --fileObject:${JSON.stringify(fileObject)}`
            );
            reject(error);
          }
        });

        cancelTask &&
          cancelTask(() => {
            uploadTask.abort();
          });
      } else {
        wxLog.error(
          `qiniu UploadToken is null, please check the init config or networking`
        );
        reject("qiniu uploader need one of [uptoken]");
      }
    });
    return tmpPromise;
  }
  function uploadURLFromRegionCode(code) {
    let uploadURL = null;
    switch (code) {
      case "ECN":
        uploadURL = "https://up.qiniup.com";
        break; //华东
      case "NCN":
        uploadURL = "https://up-z1.qbox.me";
        break;
      case "SCN":
        uploadURL = "https://up-z2.qbox.me";
        break;
      case "NA":
        uploadURL = "https://up-na0.qbox.me";
        break;
      case "ASG":
        uploadURL = "https://up-as0.qbox.me";
        break;
      default:
        console.error(
          "please make the region is with one of [ECN, SCN, NCN, NA, ASG]"
        );
    }
    return uploadURL;
  }
})();
