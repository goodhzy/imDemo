<template>
	<view class="content">
		<button class="btn" @tap="init">初始化</button>
		<button class="btn" @tap="register" :disabled="disabled">注册</button>
		<button class="btn" @tap="login" :disabled="disabled">登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				disabled: true,
			}
		},
		onLoad() {

		},
		methods: {
			init(){
				this.$chat.init().then(res=>{
					this.disabled = false
					this.$toast('初始化成功')
				}).catch(err=>{
					this.$toast('初始化失败')
				})
			},
			register(){
				uni.navigateTo({
					url:'../register/register'
				})
			},
			login(){
				uni.navigateTo({
					url:'../login/login'
				})
			}
		}
	}
</script>

<style>
	.btn{
		margin-top: 44rpx;
	}
</style>
