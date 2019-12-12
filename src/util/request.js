import { Message } from "element-ui";
import router from "@/router";
import axios from "axios";

// axios.defaults.baseURL = ''; // 配置axios请求的地址
// axios.defaults.headers.common['Authorization'] = ''; // 设置请求头为 Authorization

//配置发送请求前的拦截器.可以设置带登录用户信息
axios.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// 配置响应拦截器 
axios.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    return Promise.reject(err);
  }
);

axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;
let cont = "application/json; charset=utf-8";

export const iHttp = (type, url, data = {}, headersV = cont) => {
  return new Promise((resolve, reject) => {
    let init = {
      method: type,
      url: url,
      headers: {
        "Content-Type": headersV
      }
    };

    type === "get" ? (init["params"] = data) : (init["data"] = data);

    axios(init)
      .then(
        res => {
          //返回res处理
          if (res.data.code === 200) {
            resolve(res);
          } else {
            switch (res.data.code) {
              case res.data.code == 500 ? res.data.code : "":
                resolve(res);
                break;
              case res.data.code == 404 ? res.data.code : "":
                reject("404");
                break;
              case res.data.code == 401 ? res.data.code : "":
                Message.error(res.data.msg);
                // 与后台约定规则,用户登录过期返回状态码401,跳转到登录页面
                router.push({ name: "login" });
                break;
              default:
                resolve(res);
            }
          }
        },
        err => {
          reject(err);
        }
      )
      .catch(err => {
        Message.error(err);
        reject(err);
      });
  });
};