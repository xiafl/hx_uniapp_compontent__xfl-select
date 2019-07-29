

# hx_uniapp_compontent__xfl-select

这是 `HBuilerX` 的插件， 使用环境为 `uni-app`。    
是一个UI组件: 下拉列表。    
   
1. 在选择框的以外区域点击时，弹出的列表框不会自动隐藏，这在同时使用了有多个选择框组件的页面尤其明显，  
   而且还会存在相互之间的层级高低问题。还没想到好的办法解决这个问题。
2. 不支持多选。
3. 选项列表框的每一项不支持自定义样式(或节点结构), 因为`uniapp`对`slot`的支持不好，所以现在只是简单的显示为一个`div`。  
4. 组件的默认值和初始样式是在`mouted`的时候设置的，而且是一次性的，所以如果初始要显示的默认值是异步获取的，    
   则必须使用`v-if`命令在拿到所有数据后，再创建组件，才能正常显示默认值。  
5. 对于组件的样式更改，目前就只有一个`style_Container`只能更改最外层的节点样式(某些可能会通过继承传递到其它节点)    
   如果不能满足要求，可以直接更改组件源码中的样式(组件中的逻辑还是比较清晰的)。  
6. 写本组件的初衷是: 提供一个模板，以后遇到类似的选择框需求时，可以直接更改代码，快速的做一个出来。   
  
## 获取
github仓库: [https://github.com/xiafl/hx_uniapp_compontent__xfl-select](https://github.com/xiafl/hx_uniapp_compontent__xfl-select)  
  
## API说明
属性  
   
参数	| 说明	| 类型	| 可选值	| 默认值   
-- | -- | -- | -- | --   
list	| 要展示的数据	| Array	| —	| [ ]   
clearable	| 是否显示清除按钮	| Boolean	| —	| true   
initValue	| 第一次显示时默认选中的文本	| String	| —	| " "   
isCanInput	| 是否可以输入值	| Boolean	| —	| false   
placeholder	| 占位符	| String	| —	| "请选择"   
style_Container	| 组件根节点的行内样式	| String	| —	| " "   
disabled	| 是否禁用整个选择框	| Boolean	| —	| false   
showItemNum	| 显示列表的窗口高度，数字表示能显示几个列表项	| Number	| —	| 5   
listShow	| 第一次显示时是否显示列表	| Boolean	| —	| false   
focusShowList	| 当input获取焦点时，是否自动弹出列表框	| Boolean	| —	| null，表示在pc上自动弹出，在移动端(包括模拟环境)不弹   
  
list属性特别说明(设 数组元素为 item):
1. 如果 `typeof item === 'object' && 'value' in item`, 则取value的值，否则就用item作为显示项  
2. 如果 `typeof item === 'object' && item.disabled == true`, 则表示禁用本项，显示为灰色  
    
事件  
   
| 事件名称	| 说明	| 回调参数 |   
| -- | -- | -- |   
| blur	| 在 Input 失去焦点时触发 | (event: Event)   
| focus	| 在 Input 获得焦点时触发 | (event: Event)   
| input	| 在 Input 中数据变化时触发 | (event: Event)   
| change	| 	选中值发生变化时触发 | {newVal: value, oldVal: this.selectText, index: index, orignItem: this.list[index]}   
| visible-change	| 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false   
| clear	| 可清空的单选模式下用户点击清空按钮时触发 | --   
| confirm	| 当焦点在 Input 中时，按下回车键时触发 | --   
  
## 使用方法
  
```javascript
<templete>
	<view style="width: 80%; margin: auto; margin-bottom: 20px;">
		<xfl-select 
			:list="list"
			:clearable="false"
			:showItemNum="5" 
			:listShow="true"
			:isCanInput="true"  
			:style_Container="'height: 50px; font-size: 16px;'"
			:placeholder = "'placeholder'"
			:initValue="'苹果'"
		>
		</xfl-select>
	</view>
</templete>

<script>
import xflSelect from '../../components/xfl-select/xfl-select.vue';     //导入

export default {
	data() {
		return {
			list: [       //要展示的数据
				'苹果',
				{value: '香蕉', disabled: true},
				'葡萄',
				'芒果',
				'大白菜',
			],
		}
	},
	components: { xflSelect },  //注册为子组件
	
	/* 
		// 或者在 main.js 中注册为全局组件 
		import xflSelect from './components/xfl-select/xfl-select.vue';
		Vue.component('xfl-select', xflSelect);
	*/
}
</script>
```

## 效果
[**示例页面（需要在手机模式下查看，否则样式可能有点问题）**](http://raw.githack.com/xiafl/hx_uniapp_compontent__xfl-select/master/test_select/unpackage/dist/build/h5/index.html)
   
![](example.png)

## 权限
无 

## 问题反馈
如在使用中发现bug或有优化的建议和意见，请发邮件 <541151284@qq.com> 或在 [gitHub](https://github.com/xiafl/hx_uniapp_compontent__xfl-select) 上反馈。
  
## 更新日志
  
2019.7.28 ***v1.1.0***   
1. 修复bug: 清除标志的样式变形的问题    
2. 重构代码，并添加更详细的注释，将基础代码从业务逻辑分离，便于维护、扩展、阅读  
3. 修复bug: 清空标志异常显示问题  
4. 修改: 将placeholder的颜色设置为比正常文字的颜色更浅  
5. 新增: 将输入框的input事件传递出来   
5. 新增: focusShowList属性，配置input获取焦点时，是否自动弹出列表框  
						 
2019.6.27 ***v1.0.0***  
1. 创建本插件  
  