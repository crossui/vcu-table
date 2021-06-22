import axios from 'axios'
import qs from "qs";
import { message, Modal } from 'vcu';


// 创建一个AXIOS实例 (请求不同服务器地址或超时时长等等可以创建不同的实例)
const request = axios.create({
	// withCredentials: true, // 跨域请求时发送cookies
	timeout: 30000 	// 请求超时
})

// 开始设置请求 发起的拦截处理
// config 代表发起请求的参数的实体
request.interceptors.request.use(config => {
	//设置接口前缀
	config.baseURL = "http://10.16.241.70:8033/mock/9cf15880587211ea804331cf8/";

	//设置提交方式
	config.headers['Content-Type'] = "application/x-www-form-urlencoded;charset=UTF-8";
	//根据项目要求设置token
	config.data = qs.stringify({
		...config.data,
		token: config.data.token ? config.data.token : "ba4b5ded1a384b54b0deffac4bb5145e"
	});
	return config
}, error => {
	return Promise.reject(error)
})

// 请求到结果的拦截处理
request.interceptors.response.use(async (response) => {
	const { data, headers } = response;
	if (data.status == 500) {
		Modal.error({
			title: '错误提示',
			content: data.title,
		})
		return false
	} else {
		return response
	}
}, (error) => {
	// 请求错误需要自行处理
	message.error('连接到服务器失败');
	return false;
})

export default request