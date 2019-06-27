<template>
	<div class="show-box"  :class="{disabled: disabled, active: isShowList}" :style="style_Container">
		<input  
			v-if="showInput"  class="input" 
			type="text" v-model="selectText"  :placeholder="placeholder"
			@focus="focus" @blur="blur" @input="input" @confirm="$emit('confirm', $event)"
		>
		<div v-else class="input" @click="upperClick" >{{selectText}}</div>
		<span 
			@click="toggleList" 
			class="iconfont iconarrowBottom-fill right-arrow" 
			:class="{isRotate: isRotate}"
		></span>
		
		<span 
			v-show="clearable && selectText && selectText != placeholder" 
			class="right-arrow" @click="clear" 
		>
			<span class="iconfont iconshanchu1 clear"></span>
		</span>
		
		
		<div class="list-container" 
		@click.stop="listClick"
		:style="'top:' + boxHeight + 'px;'" v-show="isShowList">
			<span class="popper__arrow"></span>
			<scroll-view 
				class="list" style="background-color: #fff;"  
				:style="'max-height: ' + showBoxHeight +'em;'"
			    scroll-y=true scroll-x=true
			>
				<div 
					class="item" @click="clickItem(index, item.value)"
					v-for="(item, index) in innerList" :key="index" 
					:class="{active: activeIndex == index, disabled: item.disabled}"
				>
					<div>{{item.value}}</div>
				</div>
				<div v-show="innerList.length==0" class="data-state item">无数据</div>
				<!-- <slot></slot> -->
			</scroll-view>
		</div>
		
	</div>
</template>

<script>
	export default {
		name: 'xfl-select',
		props: {
			list: {            //原始数据
			  type: Array,  
			  default: function(){
				  return [];
			  }
			},
			initValue: null,    //初始值
			isCanInput: {       // 是否可以输入值
			  type: Boolean,  
			  default: false,
			},
			placeholder: {       // placeholder
			  type: String,  
			  default: '请选择',
			},
			style_Container: { 
			  type: String,  
			  default: ''
			},
			disabled: {        //是否禁用整个选择框
			  type: Boolean,  
			  default: false,
			},
			showItemNum: {      //显示列表的窗口高度，数字表示能显示几个列表项
			  type: Number,  
			  default: 5
			},
			listShow: {      //是否显示列表
			  type: Boolean,  
			  default: false
			},
			clearable: {      //是否显示清除按钮
			  type: Boolean,  
			  default: true
			},
		},
		data() {
			return {
				isShowList: false, //是否显示列表
				selectText: '',    //已经选择的内容
				activeIndex: -1,   //列表中当前活动的索引号
				isRotate: false,   //右侧的小三角是否旋转
				boxHeight: 50,     //本组件的总高度
			};
		},
		watch: { // 监听变化 ，注意，初始的值是不会被监听到的，只有在mounted回调中手动赋值
			listShow(newVal, oldVal){
				this.listShow_change(newVal, oldVal);
			},
		},
		computed:{
			showBoxHeight(){
				return this.showItemNum*2;
			},
			showInput(){
				return this.isCanInput && !this.disabled;
			},
			innerList(){
				return this.convertListData(this.list);
			},
		},
		mounted(){
			this.listShow_change(this.listShow, null);
			this.init(); //进行初始化
		},
		methods: {
			listShow_change(newVal, oldVal){
				this.toggleList(newVal || false);
			},
			convertListData(orginArr){ //转换列表的数据格式
				const arr = [];
				orginArr.forEach((val, index)=>{
					let value = typeof val === 'object' && 'value' in val ? val.value : val;
					let isDisabled = typeof val === 'object' && val.disabled == true;
					arr.push({
						isActive: false,
						value: value,
						disabled: isDisabled,
					});
				});
				return arr;
			},
			
			/************************** “输入框”的操作 ****************************/
			// 输入框获得焦点时
			focus(event){
				this.showList();
				this.$emit('focus', event);
			},
			
			// 输入框失去焦点时
			blur(event){
				// this.hideList();
				this.$emit('blur', event);
			},
			
			//当显示的不是输入框时，上面的点击事件
			upperClick(){
				this.toggleList();
			},
			
			//清空已经选择的内容
			clear(){ 
				this.activeIndex = -1;
				if(this.showInput){
					this.selectText = '';
				}else{
					this.changePlaceholder();
				}
				this.$emit('clear');
			},
			
			// 输入框的值变化时
			input(event){
				let inputVal = event.detail.value;
				this.changeActiveIndex(inputVal);
			},
			/************************** “输入框”的操作 ****************************/
			
			
			/************************** 初始化函数 ****************************/
			
			//进行初始化
			init(){
				this.changeActiveIndex(this.initValue);
				this.changePlaceholder(this.initValue); 
				this.initBoxHeight();
			},
			
			// 获取input的总高度
			initBoxHeight(){
				this.getStyle(this, '.show-box', (data)=>{
					if(data){
						this.boxHeight = data.height + 6;
					}
				})
			},
			
			//设置 placeholder 的显示
			changePlaceholder(initValue = null){
				if(!this.showInput){
					this.selectText = initValue == null ? this.placeholder : initValue;
				}else{
					if(initValue != null){
						this.selectText = initValue;
					}
				}
			},
			
			//改变列表中的活动项
			changeActiveIndex(initValue){
				this.activeIndex = this.searchIndex(
										this.innerList, '.value', initValue, 
										(val, value, index, arrVal)=>{
											return val === value && !arrVal.disabled;
									})
			},
			/************************** 初始化函数 ****************************/
			
			/************************** 列表的操作 ****************************/
			//列表框上的点击事件
			listClick(){},
			
			//列表项上的点击事件
			clickItem(index, value){
				if(this.disabled){
					return;
				}
				if(this.innerList[index].disabled){ //如果本项被禁用
					this.cancelHide();
					return;
				}
				if(index !== this.activeIndex){  //如果点在非活动项上
					this.$emit('change', {newVal: value, oldVal: this.selectText, 
					                     index: index, orignItem: this.list[index]});
				}
				this.selectText = value;
				this.activeIndex = index;
				this.hideList();
			},
			
			toggleList(toVal){ //切换隐藏和显示列表
				if(typeof toVal === 'boolean'){
					toVal ? this.showList() : this.hideList();
				}else{
					this.isShowList ? this.hideList() : this.showList();
				}
			},
			showList(){ //显示列表
				if(this.disabled){
					return;
				}
				this.isShowList = true;
				this.isRotate = true;
				this.$emit('visible-change', true);
			},
			hideList(){  //隐藏列表
				if(this.disabled){
					return;
				}
				this.timer = setTimeout(()=>{
					this.isRotate = false;
					this.isShowList = false;
					this.$emit('visible-change', false);
				}, 100)
			},
			cancelHide(){
				clearTimeout(this.timer);
				this.timer = null;
			},
			/************************** 列表的操作 ****************************/
			
			/************************** libs ****************************/
			// 获取指定元素的样式
			getStyle(component, slector, callback){
				//在手机和开发者工具中必须加in(this)才能获取到
				const spaceTime = 250;
				let currNum = 0, totalNum = 3;
				const getFunc = ()=>{
					const viewObj = uni.createSelectorQuery().in(component).select(slector);
					viewObj.boundingClientRect( (data) => {
						/*
						data = {
							bottom: 10.76388931274414,
							dataset:{},
							height:10.416666984558105,
							id:"1555469782064",
							left:0.5097222328186035,
							right:69.95417022705078,
							top:0.347222238779068,
							width:69.44445037841797, 
						}
						当获取失败时，data为null
						*/
					  if(data){
						  callback && callback(data);
					  }else{
						  currNum ++;
						  if(totalNum < currNum){
							callback && callback(null);
						  }else{
							setTimeout(getFunc, spaceTime); 
						  }
					  }
					}).exec();
				}
				getFunc();
			},
			
			/*
			* 对象的属性访问
			* @example
			* 1. prop({aa: {bb: {cc: 99}}}, '.aa.bb.cc'); 
			* // => 99
			* */
			prop(obj, propPath){
				if(typeof obj !== 'object' || typeof propPath !== 'string'){
					return;
				}
				propPath = propPath.replace(/^[\,\.\s\/\\]*|[\,\.\s\/\\]*$/g, '');
				const propArr = propPath.split(/[\,\.\s\/\\]+/);
				const lastProp = propArr.pop();
				let currObj = obj;
				for(let i=0, prop; i<propArr.length; i++){
					prop = propArr[i];
					let isObj = prop in currObj && currObj[prop] && typeof currObj[prop] === 'object';
					if( !isObj ){
						return;
					}
					currObj = currObj[prop];
				}
				return currObj[lastProp];
			},
			searchIndex(arr, prop, value, compareFunc = null){
				let result_index= -1;
				this.forEachProp(arr, prop, (val, index, arrVal)=>{
					if(
						typeof compareFunc === 'function' 
						? compareFunc(val, value, index, arrVal)
						: val === value
					){
						result_index = index;
						return false;
					}
				});
				return result_index;
			},
			
			forEachProp(arr, prop, callback){
				for(let i=0, val, result; i<arr.length; i++){
					val = this.prop(arr[i], prop)
					if( val !== undefined){
						result = callback(val, i, arr[i]);
						if(result === false){
							return;
						}
					}	
				}
			},
			/************************** libs ****************************/
		}
	}
</script>

<style scoped lang="less">
	@normal-color: #606266;      //正常情况下的字体颜色
	@hover-color: #c0c4cc;       //边框的颜色
	@active-color: #409eff;       //活动的颜色
	@mouse-move-color: #f5f7fa;  //在列表项上按下时的列表项的背景色
	@padding-left: 5%;           //两侧的边距
	@arrowWidth: 12%;            //右边的小三角按钮区域的宽度
	.show-box{
		&.active{
			border-color: @active-color;
		}
		// &:hover{
		// 	border-color: @normal-color;
		// 	&.active{
		// 		border-color: @active-color;
		// 	}
		// }
		&.disabled{
			background-color: #f0f0f0;
		}
		text-align: left;
		-webkit-appearance: none;
		background-color: #fff;
		background-image: none;
		border-radius: 4px;
		border: 1px solid @hover-color;
		box-sizing: border-box;
		color: @normal-color;
		display: inline-block;
		font-size: inherit;
		height: 3em;
		line-height: inherit;
		outline: none;
		padding: 0 @arrowWidth 0 @padding-left;
		transition: border-color .2s cubic-bezier(.645,.045,.355,1);
		width: 100%;
		position: relative;
		.input{
			width: 100%; height: 100%; 
			display: flex; align-items: center; justify-content: flex-start;
		}
		
		//***************************  右侧的小箭头  ***************************
		.right-arrow{
			&.isRotate{
				transform: rotate(180deg);
			}
			transition: transform .2s cubic-bezier(.645,.045,.355,1);
			position: absolute; font-size: 1em; right: 0px; display: flex; 
			top: 0;
			align-items: center; color: @hover-color; height: 100%;
			font-weight: 100; width: @arrowWidth; justify-content: center;
		}
		.clear{
			color: #fff;
			background-color: @hover-color; border-radius: 50%; padding: 1.5px 3px 2px 3px;
		}
		.list-container{
			position: absolute; width: 100%; left: 0; top: 50px;
			box-sizing: border-box; z-index: 100;
			
			//***************************  弹出框上面的小三角  ***************************
			.popper__arrow{
				 transform: translateX(-400%);
				 position: absolute;
				 display: block;
				 width: 0;
				 height: 0;
				 border-color: transparent;
				 border-style: solid;
				 border-width: 6px;
				 filter: drop-shadow(0 2px 12px rgba(0,0,0,.03));
				 left: 30%;
				 margin-right: 3px;
				 border-top-width: 0;
				 border-bottom-color: #dcdfe6;  
				 top: -5px;
				&:after{
					content: " ";
					border-width: 6px;
					position: absolute;
					display: block;
					width: 0;
					height: 0;
					border-color: transparent;
					border-style: solid;
					 top: 1px;
					margin-left: -6px;
					border-top-width: 0;
					border-bottom-color: #fff;
				}
			}
			.list{
				border-radius: 4px;
				border: 1px solid #dcdfe6; 
				width: 100%; 
				max-height: 10em;
				background-color: #fff;
				box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
				padding: 5px 0;
				
				//***************************  弹出框中每一项样式  ***************************
				.item{
					&:hover{
						background-color: @mouse-move-color;
						&.disabled{
							background-color: transparent;
						}
					}
					&.active{
						color: @active-color;
						font-weight: 500;
						background-color: @mouse-move-color;
					}
					&.disabled{
						color:  @hover-color;
					}
					padding: 0 @padding-left;
					line-height: 2;
				}
				.data-state{
					color:  @hover-color;
				}
			}
		}
	}
	
//**************************************  以下为字体  ****************************************
@font-face {font-family: "iconfont";
  src: 
  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAM8AAsAAAAAB1gAAALvAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDHAqCEIFsATYCJAMQCwoABCAFhG0HSxthBhEVlKdkPwvsmHgLNqmwEc2pDxvYjI1gkX0f4uFrv9dz3+772RAqQJV8FbKANj5RiB1f1q0ioyorK1THs2Qj0gAJVYn///3mxT27TKyJJ63gD/KkYhr/9woe4ghtLxKJk5AWd7icc+CiJuQLU5SVQ48+ST+l0H2/pM2sm89zOb2VZYHMb1luYy3a0496AWYLKLA9sQ0UaAEFxC2yi7gTF3GaQJtRTbFxcfcIRYYmBeKyjDJQCiFZNrJFaDSszOI11Ep1IQZeRd+P/zAXcip1gmbuHJ/nYeWX9redqtuqPU6AYj4vjHUkNJGJ08bUviQMXtL2m2wJRVHxS/sz/N1+2CZOdizDemP/eBXRgCo7wIKcTvzSUnlmGMoSgt/tChX8EEOBlNvCLsQdpgv8HuNG8wuia9YA1Tfni5TZR1QthTxh8ZM2VCAHtiBtzfWtz1RtObA8IXowr5rzRK4/sRYpfjm1FBA9nrPl/qNAJRZLKJNsUumMKdb3dkIlkqjEtt8VrbNjZgnB48fG1XqNHax98/uI4xs768DFXVceFql2do6594N/t9vl/tw+ZlhKP6ngFjorHQq/AOmpcAlI98L7Pz/KG7P0OqU7+SuqQ7d8OXhYRvZsnLHcTCD4zwpgXfZVyJGzq6byIJiNgyZUaNOGv5ujz885jIPgWkIxOCLYYiRDUkyTmdNErd0CGopltJm1vb5dv3tJ5DDjpYTQ4wMqXT4h6fGZzJwfqA2R/SGlDxGUnsO0o4onyuKUUDLWoDbodPCGuFjE1U9sJispr4r4X6Sxi0IRiZWzD/RIc8wZ56ZkNmAoOLhL56G1ASKFHjWnLXOssmix6UWpDm4nnCJIYqgGlA3oaIFneHMmKp9/Qo2JJVEHqyf9hcio6x0UUjmAfOg9iHUvl4xmjRJjBjBI4IC7NAxZVgBi87Ae0liqHZGIKhluZKD6dH2j+8Jd0AY9MUcVKXLU5I9a6XU7FUcUppMkCss5MAeXmM7a3Q4A') format('woff2'),
  url('data:application/x-font-woff;charset=utf-8;base64,d09GMgABAAAAAAM8AAsAAAAAB1gAAALvAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDHAqCEIFsATYCJAMQCwoABCAFhG0HSxthBhEVlKdkPwvsmHgLNqmwEc2pDxvYjI1gkX0f4uFrv9dz3+772RAqQJV8FbKANj5RiB1f1q0ioyorK1THs2Qj0gAJVYn///3mxT27TKyJJ63gD/KkYhr/9woe4ghtLxKJk5AWd7icc+CiJuQLU5SVQ48+ST+l0H2/pM2sm89zOb2VZYHMb1luYy3a0496AWYLKLA9sQ0UaAEFxC2yi7gTF3GaQJtRTbFxcfcIRYYmBeKyjDJQCiFZNrJFaDSszOI11Ep1IQZeRd+P/zAXcip1gmbuHJ/nYeWX9redqtuqPU6AYj4vjHUkNJGJ08bUviQMXtL2m2wJRVHxS/sz/N1+2CZOdizDemP/eBXRgCo7wIKcTvzSUnlmGMoSgt/tChX8EEOBlNvCLsQdpgv8HuNG8wuia9YA1Tfni5TZR1QthTxh8ZM2VCAHtiBtzfWtz1RtObA8IXowr5rzRK4/sRYpfjm1FBA9nrPl/qNAJRZLKJNsUumMKdb3dkIlkqjEtt8VrbNjZgnB48fG1XqNHax98/uI4xs768DFXVceFql2do6594N/t9vl/tw+ZlhKP6ngFjorHQq/AOmpcAlI98L7Pz/KG7P0OqU7+SuqQ7d8OXhYRvZsnLHcTCD4zwpgXfZVyJGzq6byIJiNgyZUaNOGv5ujz885jIPgWkIxOCLYYiRDUkyTmdNErd0CGopltJm1vb5dv3tJ5DDjpYTQ4wMqXT4h6fGZzJwfqA2R/SGlDxGUnsO0o4onyuKUUDLWoDbodPCGuFjE1U9sJispr4r4X6Sxi0IRiZWzD/RIc8wZ56ZkNmAoOLhL56G1ASKFHjWnLXOssmix6UWpDm4nnCJIYqgGlA3oaIFneHMmKp9/Qo2JJVEHqyf9hcio6x0UUjmAfOg9iHUvl4xmjRJjBjBI4IC7NAxZVgBi87Ae0liqHZGIKhluZKD6dH2j+8Jd0AY9MUcVKXLU5I9a6XU7FUcUppMkCss5MAeXmM7a3Q4A') format('woff')
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.iconshanchu1:before {
  content: "\e68c";
}

.icongou:before {
  content: "\e786";
}

.iconarrowBottom-fill:before {
  content: "\e60e";
}
</style>
