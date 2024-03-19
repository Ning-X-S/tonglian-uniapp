//  request.js 里面

const fmmUrl = "http://192.168.0.101:8083";  // 这里放自己的接口名称

// get 请求
function getRequest(url,data) {
    let promise = new Promise((resolve,reject) => {
    let postData = data;
    // 这里是获取 token 
    let token = uni.getStorageSync("data")
    try {
    uni.request({
      url: fmmUrl + url,
          data: postData,
          method: "GET",
          dataType: "json",
          header: {
            "Cookie":`JSESSIONID=${token}`,
            'content-type': 'application/json'
          },
          // 这里请求成功根据自己的 code 判断就好了
          success: res => {
            if (res.data.code == 0) {
              resolve(res.data)
            } else if (res.data.code == -2) {
              resolve(res.data)
            } else if (res.data.code == -1) {
            resolve(res.data)
            } else  {
              resolve(res.data)
            }
          },
          error: e => {
            reject("网络出错")
          }
    });	 			 
    } catch (e) {
    reject(e)
    }
  
  });
  return promise;
}

// post 请求
function postRequest(url,data) {
  let promise = new Promise((resolve,reject) => {
    let postData = data;
    // 这里是获取 token 
    let token = uni.getStorageSync("data")
    try {
      uni.request({
        url: fmmUrl + url,
          data: postData,
          method: "POST",
          header: {
          "Cookie":"JSESSIONID="+token,
          'content-type': 'application/json'
          },
          // 这里请求成功根据自己的 code 判断就好了
          success: res => {
            if (res.data.code == 0) {
              resolve(res.data)
            } else if (res.data.code == -2) {
              resolve(res.data)
            } else if (res.data.code == -1) {
            resolve(res.data)
            } else  {
              resolve(res.data)
            }
          },
          error: e => {
            reject("网络出错")
          }
      });	 
    } catch (e) {
      reject(e)
    }
  });
  return promise
}

// 最后在底部把写好的方法抛出就好了
export  {
	postRequest,
	getRequest,
}
