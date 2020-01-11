<template>
	<view>
		<form @submit="submit">
			<view class="uni-form-item uni-column">
				<view class="title">姓名</view>
				<input class="uni-input" name="username" placeholder="请输入用户名"  />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">密码</view>
				<input class="uni-input" name="password" placeholder="请输入密码" />
			</view>
			<button type="primary" form-type="submit" style="width: 500rpx;margin-top: 44rpx;">提交</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			submit(e){
				const form = e.detail.value
				for (let i in form) {
					if(form[i] === ''){
						this.$toast('值不能为空')
						return
					}
				}
				this.$chat.register(form).then(res=>{
					this.$toast('注册成功')
				}).catch(err=>{
					this.$toast('注册失败')
					console.log(err);
				})
			}
		}
	}
</script>

<style>
	.uni-column {
		flex-direction: column;
	}
	.uni-form-item {
		display: flex;
		width: 100%;
		padding: 10upx 0;
	}

	.uni-form-item .title {
		padding: 10upx 25upx;
	}

	.uni-input {
		height: 50upx;
		padding: 15upx 25upx;
		line-height: 50upx;
		font-size: 28upx;
		background: #FFF;
		flex: 1;
		border-bottom: 1px solid #EEEEEE;
	}
</style>
