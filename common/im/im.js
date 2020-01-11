import JMessage from './jmessage-wxapplet-sdk-1.4.0.min.js'
const md5 = require('./md5.js');
export default class Chat {
	constructor() {
		this.jim = null
	}
	getJim() {
		if (!this.jim) {
			this.jim = new JMessage({
				debug: true
			})
		}
	}
	getRandom_str() {
		const words = 'qwertyuiopasdfghjkllzxcvbnm123456789'
		let str = ''
		for (let i = 0; i < 36; i++) {
			str += words.charAt(Math.random() * words.length - 1)
		}
		return str
	}
	/* 
	 *	获取初始化需要的参数(生产环境签名的生成需要在开发者服务端生成，不然存在 masterSecret 暴露的风险)
	 * 	appkey和signature换成自己的
	 */
	getConfig() {
		md5(`appkey={appkey}&timestamp={timestamp}&random_str={random_str}&key={secret}}`)
		const appkey = '0ee931215e4fe6b9254b2549'
		const random_str = this.getRandom_str()
		const timestamp = Date.parse(new Date())
		const signature = md5(
			`appkey=${appkey}&timestamp=${timestamp}&random_str=${random_str}&key=f33ec33c29b713fb5ee1df0d`)
		return {
			appkey,
			random_str,
			timestamp,
			signature
		}
	}
	// 初始化
	init() {
		let that = this
		let Jim = this.jim
		return new Promise((resolve, reject) => {
			// 轮询保证在初始化之前im已连接
			let num = 0
			let interval = setInterval(() => {
				console.log(Jim.isConnect());
				num++
				if (Jim.isConnect()) {
					clearInterval(interval)
					console.log('连接总共消耗了' + num * 500 / 1000 + '秒');
					if (!Jim.isInit()) {
						const config = this.getConfig()
						Jim.init({
							...config,
							flag: 0
						}).onSuccess(function(data) {
							console.log('<<<----------Jim初始化成功---------->>>');
							resolve(data)
						}).onFail(function(data) {
							console.log('<<<----------Jim初始化失败---------->>>');
							reject(data)
						}).onTimeout(function(data) {
							console.log('<<<----------Jim初始化超时---------->>>');
							reject(data)
						})
					}
				}
			}, 500)
		})
	}
	// TODO 显示参数不合法:长度大于四位
	register({
		username,
		password
	}) {
		return new Promise((resolve, reject) => {
			this.jim.register({
				username,
				password
			}).onSuccess(function(data) {
				resolve(data)

			}).onFail(function(data) {
				reject(data)
			});
		})
	}
	// 判断是否登录
	isLogin() {
		return this.jim.isLogin();
	}
	// 登录
	login({
		username,
		password
	}) {
		let that = this
		let Jim = this.jim
		return new Promise((resolve, reject) => {
			if (!Jim.isLogin()) {
				Jim.login({
					username,
					password,
				}).onSuccess(function(data) {
					console.log('<<<----------Jim登录成功---------->>>');
					resolve(data)
					that.onDisconnect(() => {
						that.login({
							username,
							password
						})
					})
				}).onFail(function(data) {
					console.log('<<<----------Jim登录失败---------->>>');
					reject(data)
				})
			} else {
				console.log('<<<----------Jim已经登录了---------->>>');
				resolve('')
			}
		})
	}
	// 退出
	loginout() {
		this.jim.loginOut()
	}
}
