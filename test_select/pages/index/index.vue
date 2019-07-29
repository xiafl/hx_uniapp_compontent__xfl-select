<template>
	<view class="content">
		<view style="padding-top: 50px;">
			有清除按钮
			<view style="width: 80%; margin: auto; margin-bottom: 20px;">
				<xfl-select 
				:list="list"
				:initValue="'葡萄'"
				:showItemNum="2" 
				:isCanInput="false"  
				:style_Container="listBoxStyle"
				:placeholder = "'placeholder'"
				@visible-change = 'visibleChange'
				>
				</xfl-select>
			</view>
			可输入
			<view style="width: 80%; margin: auto;margin-bottom: 20px;">
				<xfl-select 
				:list="list"
				:clearable="true"
				:showItemNum="5" 
				:isCanInput="true"  
				:style_Container="listBoxStyle"
				:placeholder = "'placeholder'"
				@change="change"
				>
				</xfl-select>
			</view>
			禁用
			<view style="width: 80%; margin: auto;margin-bottom: 20px;">
				<xfl-select 
				:list="list"
				:clearable="false"
				:showItemNum="5" 
				:disabled="true"
				:isCanInput="true"  
				:style_Container="listBoxStyle"
				>
				</xfl-select>
			</view>
			默认展开
			<view style="width: 80%; margin: auto;margin-bottom: 20px;">
				<xfl-select 
				:list="list"
				:clearable="false"
				:showItemNum="5" 
				:listShow="true"
				:isCanInput="true"  
				:style_Container="listBoxStyle"
				:placeholder = "'placeholder'"
				:initValue="'芒果'"
				:selectHideType="'independent'"
				>
				</xfl-select>
			</view>
		</view>
	</view>
</template>

<script>
	import xflSelect from '../../components/xfl-select/xfl-select.vue';
	export default {
		data() {
			return {
				listBoxStyle: `height: 40px; font-size: 16px;`,
				list: [
					'苹果',
					{value: '香蕉', disabled: true},
					'葡萄',
					'芒果',
					'大白菜',
				],
			}
		},
		methods: {
			visibleChange(isShow){ // 列表框的显示隐藏事件
				console.log('isShow::', isShow);
			},
			change({newVal, oldVal, index, orignItem}){ 
				console.log(newVal, oldVal, index, orignItem);
			}
		},
		components: { xflSelect },

		 /* 
			// 或者在 main.js 中注册为全局组件 
			import xflSelect from './components/xfl-select/xfl-select.vue';
			Vue.component('xfl-select', xflSelect);
		*/
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}
</style>
