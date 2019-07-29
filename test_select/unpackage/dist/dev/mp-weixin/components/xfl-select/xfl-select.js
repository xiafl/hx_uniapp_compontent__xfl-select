(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/xfl-select/xfl-select"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!E:\\code\\github\\hx_uniapp_compontent__xfl-select\\test_select\\components\\xfl-select\\xfl-select.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!E:/code/github/hx_uniapp_compontent__xfl-select/test_select/components/xfl-select/xfl-select.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

























































var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}
_vue.default.__xfl_select = _vue.default.__xfl_select || new _vue.default(); // 这个实例专门用来做xfl-select多个实例之间的通信中间站
var _default2 = {
  name: 'xfl-select',
  props: {
    list: { // 原始数据
      type: Array,
      default: function _default() {
        return [];
      } },

    focusShowList: null, // 当input获取焦点时，是否自动弹出列表框
    initValue: null, // 选择框的初始值
    isCanInput: { // 选择框是否可以输入值
      type: Boolean,
      default: false },

    selectHideType: { // 本选择框与其它选择框之间的关系
      type: String,
      default: 'hideAll' // 'independent' - 是独立的，与其它选择框互不影响  'hideAll' - 任何一个选择框展开时，隐藏所有其它选择框
      // 'hideOthers'- 当本选择框展开时，隐藏其它的选择框。  当其它选择框展开时，不隐藏本选择框。 
      // 'hideSelf' -  当本选择框展开时，不隐藏其它的选择框。当其它选择框展开时，隐藏本选择框。
    },
    placeholder: { // 选择框的placeholder
      type: String,
      default: '请选择' },

    style_Container: { // 最外层的样式
      type: String,
      default: '' },

    disabled: { // 是否禁用整个选择框
      type: Boolean,
      default: false },

    showItemNum: { // 显示列表框的窗口高度，数字表示能显示几个列表项
      type: Number,
      default: 5 },

    listShow: { // 是否显示列表框
      type: Boolean,
      default: false },

    clearable: { // 是否显示右侧的清除按钮
      type: Boolean,
      default: true } },


  data: function data() {
    return {
      isShowList: false, // 是否显示列表框
      selectText: '', // 已经选择的内容
      activeIndex: -1, // 列表中当前活动的索引号
      isRotate: false, // 右侧的小三角是否旋转
      listTop__: 50 // 列表框的top位置，在初始时，根据input节点的高度来调整
    };
  },
  // 进行监听的话，在组件外改变这个值，组件内就能响应变化
  watch: { // 监听变化 ，注意，初始的值是不会被监听到的，只有在mounted回调中手动赋值
    listShow: function listShow(newVal, oldVal) {
      this.onDataChange_listShow(newVal, oldVal);
    } },

  computed: {
    focusShowList__: function focusShowList__() {// 是否在输入框获得焦点时，自动弹出列表框
      if (this.focusShowList == null) {
        // 应该是判断在 pc端还是移动端




        return false;

      } else {
        return this.focusShowList;
      }
    },
    listBoxHeight__: function listBoxHeight__() {// 列表框的总高度
      var itemHeight = 2; // 每个列表项的高度(em), 默认为2个文字高
      return this.showItemNum * itemHeight;
    },
    showInput: function showInput() {// 是否显示输入框
      return this.isCanInput && !this.disabled;
    },
    innerList: function innerList() {// 转换列表的数据格式
      var arr = [],orginArr = this.list;
      orginArr.forEach(function (val, index) {
        var value = typeof val === 'object' && 'value' in val ? val.value : val;
        var isDisabled = typeof val === 'object' && val.disabled == true;
        arr.push({
          isActive: false,
          value: value,
          disabled: isDisabled });

      });
      return arr;
    } },

  mounted: function mounted() {
    _vue.default.__xfl_select.$on('open', this.onOtherXflSelectOpen);
    this.switchMgr = new Switch(this.onListShow, this.onListHide); // 创建开关对象
    this.onDataChange_listShow(this.listShow, null); // 由于 watch 不到初始值，所以需要在这里手动调用一次
    this.init(); //进行初始化
  },
  beforeDestroy: function beforeDestroy() {
    _vue.default.__xfl_select.$off('open', this.onOtherXflSelectOpen);
  },
  methods: {
    onOtherXflSelectOpen: function onOtherXflSelectOpen(component) {//当本组件的其它实例展开时的回调
      if (this.selectHideType === 'independent' || this.selectHideType === 'hideOthers') {
        return;
      }
      component !== this && this.switchMgr.close(100);
    },
    /************************** 初始化函数 ****************************/
    //进行初始化
    init: function init() {
      this.clearInput(); // 清空输入框中的显示，主要是设置placeholder
      this.setInput(this.initValue); // 在输入框中显示初始值
      this.changeActiveIndex(this.initValue); // 根据初始值设置列表框中的活动项
      this.getInputBoxHeight(); // 初始化列表框的top值
    },

    // 获取输入框的总高度 px
    getInputBoxHeight: function getInputBoxHeight() {var _this = this;
      var component = this;



      getNodeInfo('.show-box', component, function (data) {
        if (data) {
          var trangleHeight = 6; //列表框左上角的小的空心三角形的高度(px)
          _this.listTop__ = data[0].height + trangleHeight;
        }
      });
    },
    /************************** 初始化函数 ****************************/

    /************************** 数据 ****************************/
    getIndex: function getIndex(value) {// 将值转换为索引
      var activeIndex = searchIndex(
      this.innerList, value, 'value');
      return activeIndex; // 转换失败，则返回-1
    },
    itemIsDisabled: function itemIsDisabled(index) {// 某个列表项是否已经被禁用了
      return this.innerList[index].disabled;
    },

    itemIsActive: function itemIsActive(index) {// 某个列表项是否是被选中的(活动的)
      return index === this.activeIndex;
    },

    // listShow 这个字段的值变化时的回调
    onDataChange_listShow: function onDataChange_listShow() {var newVal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;var oldVal = arguments.length > 1 ? arguments[1] : undefined;
      newVal ? this.switchMgr.open() : this.switchMgr.close(100);
    },
    /************************** 数据 ****************************/


    /************************** “输入框”的操作 ****************************/
    // 输入框获得焦点时
    onFocus: function onFocus(event) {
      this.focusShowList__ && this.switchMgr.open();
      this.$emit('focus', event);
    },

    // 输入框失去焦点时
    onBlur: function onBlur(event) {
      // 失去焦点时隐藏，在电脑上很好，但在移动端体验不好，因为会弹出数字键盘，然后隐藏键盘时会失去焦点
      this.focusShowList__ && this.switchMgr.close(100);
      this.$emit('blur', event);
    },

    //当显示的不是输入框时，上面的点击事件
    onUpperClick: function onUpperClick() {
      if (this.disabled) {
        return;
      }
      this.switchMgr.toggle('auto', -1, 100);
      this.$emit('input-click');
    },

    //清空已经选择的内容
    onClear: function onClear() {
      this.clearItemActive(); // 清空列表框中的所有活动项
      this.clearInput(); // 清空输入框中的显示
      this.$emit('clear');
    },

    // 输入框的值变化时
    onInput: function onInput(event) {
      var inputVal = event.detail.value;
      this.changeActiveIndex(inputVal);
      this.$emit('input', event);
    },

    // 清空input中显示的内容
    clearInput: function clearInput() {var placeholder = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this.placeholder = placeholder == null ? this.placeholder : placeholder;
      this.selectText = this.showInput ? '' : this.placeholder;
    },
    // 设置input中显示的内容
    setInput: function setInput() {var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (text == null) {
        return;
      }
      this.selectText = text;
    },
    /************************** “输入框”的操作 ****************************/


    /************************** 列表的操作(显示/隐藏/点击) ****************************/

    /**
                                                                               * 传入数字表示索引，其它值表示value, 会自动去搜索对应的索引
                                                                               * 注意： 
                                                                               * 1. 如果没有找到对应的索引，则什么也不会做  
                                                                               * 2. 如果找到了，只会把对应项设置为活动的，并不会清除其它的活动项  
                                                                               */
    changeActiveIndex: function changeActiveIndex(value_index) {//改变列表中的活动项
      if (value_index == null) {
        return;
      }
      var activeIndex = value_index,value = value_index;
      if (typeof value_index !== 'number') {//认为是值，否则就是索引
        activeIndex = this.getIndex(value); // 搜索对应的值所在的索引
      } else {
        value = this.innerList[activeIndex].value;
      }
      if (activeIndex > -1) {
        !this.itemIsActive(activeIndex) && this.setItemActive(activeIndex, value);
      } else {
        this.clearItemActive();
      }
      this.setInput(value); // 更改输入框的值
    },

    clearItemActive: function clearItemActive() {var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1; // 设置为不选中
      if (index < 0) {// 清空全部
        this.activeIndex = -1;
      }
    },
    setItemActive: function setItemActive(index, value) {//选中某一项，必须传入索引和对应的值
      if (this.itemIsDisabled(index)) {
        return;
      }
      this.activeIndex = index;
    },

    // 整个列表框上的点击事件
    onListClick: function onListClick() {

    },
    onClickItem: function onClickItem(index, value) {// 列表项上的点击事件
      if (this.itemIsDisabled(index)) {
        this.switchMgr.open(); // 点在禁用项上，就不隐藏
        return;
      }
      this.switchMgr.close(100); // 开始隐藏，因为会延迟隐藏，所以可以写在这里
      if (this.disabled) {//如果本项被禁用 或 整个列表框被禁用
        return;
      }
      if (!this.itemIsActive(index)) {//如果点在非选中项上
        this.clearItemActive(); // 清空其它的选中的列表项
        this.setItemActive(index, value); // 将这一项设置为选中项
        this.$emit('change', { newVal: value, oldVal: this.selectText,
          index: index, orignItem: this.list[index] });

        this.setInput(value); // 更改输入框的值
      }
    },
    onListHide: function onListHide() {//列表隐藏时的回调
      this.isRotate = false;
      this.isShowList = false;
      this.$emit('visible-change', false);
    },
    onListShow: function onListShow() {//列表显示时的回调
      this.isShowList = true;
      this.isRotate = true;
      this.$emit('visible-change', true);

      if (this.selectHideType === 'independent' || this.selectHideType === 'hideSelf') {
        return;
      }
      _vue.default.__xfl_select.$emit('open', this);
    }
    /************************** 列表的操作(显示/隐藏/点击) ****************************/ }



  /************************** uniapp libs ****************************/

  /**
                                                                         * 是否是web的移动端
                                                                         * @public
                                                                         * @returns {boolean} true表示当前环境是web，并且是移动端，false表示非web或是pc端
                                                                         */ };exports.default = _default2;
function isMobile() {
  try {// 可能不存在window对象
    var reg = /iPhone|iPad|iPod|iOS|Android|SymbianOS|Windows Phone|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince/i;
    return reg.test(navigator.userAgent);
  } catch (e) {
    return false;
  }
}
/**
   * 是否是web的pc端
   * @public
   * @returns {boolean} true表示当前环境是web，并且是pc端，false表示非web或是移动端
   */
function isPC() {
  try {// 可能不存在window对象
    var reg = /iPhone|iPad|iPod|iOS|Android|SymbianOS|Windows Phone|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince/i;
    return !reg.test(navigator.userAgent);
  } catch (e) {
    return false;
  }
}
/**
   * 获取指定元素的样式
   * 注意:  
   * 1. 必须在使用这个函数的文件中 导入 import Vue from 'vue'  
   * 2. 自定义组件编译模式（默认模式）时, 必须传入component参数。(h5中测试时不管传不传都能正常获取，但wx中必须传入才行)
   * @public
   * @param {Object|string} options - 配置对象，如果传入一个字符串，则识别为selector
   *                         selector - dom元素的选择器，仅支持以下选择器: 
   * 							1. ID选择器：'#the-id'
  							2. class选择器（可以连续指定多个）：'.a-class.another-class'
  							3. 子元素选择器：'.the-parent > .the-child'
  							4. 后代选择器：'.the-ancestor .the-descendant'
  							5. 跨自定义组件的后代选择器：'.the-ancestor >>> .the-descendant'
  							6. 多选择器的并集：'#a-node, .some-other-nodes'
  							7. 传入 'viewport' 表示获取视口对象，有点类似于选中window。
   * @param {function|component} [callback=null] - 如果传入一个函数，则识别为获取到样式后的回调，也可以传入一个组件, 
              回调的第一个参数如下:   
  			// 获取信息成功时，是对象数组,  
  			// 对象根据options的配置而有不同的字段  
  			{  
  				id: '',         // String 节点的 ID, 经测试，这个id并不一定正确(特别是选中多个节点时)  
  				dataset: null,  // Object 节点的 dataset  
  				left: 0,        // Number 节点的包围盒的左边界坐标(px)(page元素的左上角为坐标原点)  
  				right: 0,       // Number 节点的包围盒的右边界坐标(px)  
  				top: 0,         // Number 节点的包围盒的上边界坐标(px)  
  				bottom: 0,      // Number 节点的包围盒的下边界坐标(px)  
  				width: 0,       // Number 节点的宽度(px)  
  				height: 0,      // Number 节点的高度(px)  
  				scrollLeft: 0,  // Number 节点的水平滚动位置(px)  
  				scrollTop: 0,   // Number 节点的竖直滚动位置(px)  
  				context: {} || null,   // Object节点对应的Context对象(如VideoContext、CanvasContext、和MapContext)  
  				...        // properties 数组中指定的属性值和computedStyle数组中指定的样式值  
  			}  
  			// 当获取信息失败，则为null  
   * @param {any} [thisObj=null] 回调中的this, 可能位于第三个参数或第四个参数。
   * @return {undefined|promise} 当没有callback时，则返回promise，否则返回undefined  
   * @example
   * 1. 传入选择器，返回promise
   * getNodeInfo('#aa').then((data)=>{ console.log(data);});
   * 
   * 2. 传入选择器和component, 返回promise
   * getNodeInfo('#aa', this).then((data)=>{ console.log(data);});
   * 
   * 3. 传入选择器和callback, 返回undefined
   * getNodeInfo('#aa', (data)=>{ console.log(data);});
   * 
   * 4. 传入配置对象和callback, 返回undefined
   * getNodeInfo({selector: '#aa', component: this}, (data)=>{ console.log(data);});
   */
function getNodeInfo()

















{var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$selector = _ref.selector,selector = _ref$selector === void 0 ? 'selector' : _ref$selector,_ref$component = _ref.component,component = _ref$component === void 0 ? null : _ref$component,_ref$attemptSpaceTime = _ref.attemptSpaceTime,attemptSpaceTime = _ref$attemptSpaceTime === void 0 ? 16 : _ref$attemptSpaceTime,_ref$attemptSpaceRate = _ref.attemptSpaceRate,attemptSpaceRate = _ref$attemptSpaceRate === void 0 ? 1.5 : _ref$attemptSpaceRate,_ref$totalAttemptNum = _ref.totalAttemptNum,totalAttemptNum = _ref$totalAttemptNum === void 0 ? 8 : _ref$totalAttemptNum,_ref$id = _ref.id,id = _ref$id === void 0 ? true : _ref$id,_ref$dataset = _ref.dataset,dataset = _ref$dataset === void 0 ? true : _ref$dataset,_ref$rect = _ref.rect,rect = _ref$rect === void 0 ? true : _ref$rect,_ref$size = _ref.size,size = _ref$size === void 0 ? true : _ref$size,_ref$scrollOffset = _ref.scrollOffset,scrollOffset = _ref$scrollOffset === void 0 ? true : _ref$scrollOffset,_ref$properties = _ref.properties,properties = _ref$properties === void 0 ? [] : _ref$properties,_ref$computedStyle = _ref.computedStyle,computedStyle = _ref$computedStyle === void 0 ? [] : _ref$computedStyle,_ref$context = _ref.context,context = _ref$context === void 0 ? true : _ref$context;var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;var thisObj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  // arguments 始终会记录最原始的传进来的参数，而不管这些默认值会怎么转换
  // 因为传入一个对象或非字符串会报错，强制转换为字符串
  var args = arguments;
  selector = typeof args[0] === 'string' ? args[0] : String(selector);
  if (typeof args[1] !== 'function') {
    component = args[1];callback = args[2];thisObj = args[3];
  }
  !component instanceof _vue.default && (component = null); //传入非组件对象，会报错

  // 不能把 component 字符添加到这个对象上，否则在wx中会报循环引用的错误
  var options = { selector: selector, attemptSpaceTime: attemptSpaceTime, totalAttemptNum: totalAttemptNum, attemptSpaceRate: attemptSpaceRate,
    id: id, dataset: dataset, rect: rect, size: size, scrollOffset: scrollOffset, properties: properties, computedStyle: computedStyle, context: context };

  var selectorQuery = uni.createSelectorQuery();
  component && selectorQuery.in(component);
  var nodesRef = selector === 'viewport' ? selectorQuery.selectViewport() : selectorQuery.selectAll(selector);
  nodesRef.fields(options); // 注意，只注册了这一个命令

  var result; // 必须把创建promise的代码放在前面，否则在h5端会出现exec先执行完成的情况
  if (typeof callback !== 'function') {
    result = new Promise(function (resolve) {return callback = resolve;});
  }
  stepRunFunc(function (next, currNum) {
    selectorQuery.exec(function (_ref2) {var _ref3 = _slicedToArray(_ref2, 1),data = _ref3[0]; // 开始查询页面中的节点
      data && data.length === 0 && (data = null);
      data || totalAttemptNum <= currNum ? typeof callback === 'function' && callback.call(thisObj, data) : next(attemptSpaceTime);
      attemptSpaceTime = Math.round(attemptSpaceTime * attemptSpaceRate);
    });
  })(); // 立即执行一次

  return result;
}
/************************** uniapp libs ****************************/

/************************** js libs ****************************/
/**
                                                                   * 开关类，管理两个状态的切换
                                                                   * 特点是: 状态的切换可能是延迟进行的。
                                                                   * @class
                                                                   */var
Switch = /*#__PURE__*/function () {
  function Switch() {var onopen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var onclose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;_classCallCheck(this, Switch);
    this.onopen = onopen; // 打开后的回调
    this.onclose = onclose; // 关闭后的回调
    this.isOpen = false; // 初始时状态是关闭的
  }_createClass(Switch, [{ key: "toggle", value: function toggle()
    {var toState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto'; //切换开关的状态
      if (!(toState === 'close' || toState === 'open')) {
        toState = this.isOpen ? 'close' : 'open';
      }
      var delayTime_open, delayTime_close, cancelType_open, cancelType_close;
      for (var i = 0, arg; i < (arguments.length <= 1 ? 0 : arguments.length - 1); i++) {
        arg = i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1];
        switch (typeof arg) {
          case 'number':delayTime_open == null ? delayTime_open = arg : delayTime_close = arg;break;
          case 'string':cancelType_open == null ? cancelType_open = arg : cancelType_close = arg;break;}

      }
      var delayTime = toState === 'open' ? delayTime_open : delayTime_close;
      var cancelType = toState === 'open' ? cancelType_open : cancelType_close;
      this.change(toState, delayTime == null ? -1 : delayTime, cancelType == null ? 'both' : cancelType);
    } }, { key: "open", value: function open()
    {var delayTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;var cancelType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both'; // 打开
      this.change('open', delayTime, cancelType);
    } }, { key: "close", value: function close()
    {var delayTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;var cancelType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both'; // 关闭
      this.change('close', delayTime, cancelType);
    } }, { key: "cancel", value: function cancel()
    {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'both'; // 取消定时器
      if (type === 'open') {
        clearTimeout(this.openTimer);this.openTimer = null;
      } else if (type === 'close') {
        clearTimeout(this.closeTimer);this.closeTimer = null;
      } else if (type === 'both') {
        clearTimeout(this.closeTimer);this.closeTimer = null;
        clearTimeout(this.openTimer);this.openTimer = null;
      }
    } }, { key: "change", value: function change(
    toState) {var _this2 = this;var delayTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;var cancelType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'both'; // 改变到指定的状态
      this.cancel(cancelType); // 取消定时器
      if (this.isOpen && toState === 'open' || !this.isOpen && toState === 'close') {
        return;
      }
      var funcName = 'on' + toState;
      if (delayTime < 0) {
        this.isOpen = toState === 'open';
        typeof this[funcName] === 'function' && this[funcName]();
      } else {
        this[toState + 'Timer'] = setTimeout(function () {
          _this2.isOpen = toState === 'open';
          typeof _this2[funcName] === 'function' && _this2[funcName]();
        }, delayTime);
      }
    } }]);return Switch;}();



/**
                              * 从一个数组中进行搜索，返回一个索引, 主要特点是可以深层搜索
                              * 依赖: forEach  props 这两个函数
                              * @public
                              * @param {Array} arr - 要搜索的数组或类数组或普通对象
                              * @param {any} searchVal - 要搜索的值 
                              * @param {string|Array} [propPath=''] - 要搜索的值的路径， 如 'aa.bb.cc' 或 ['aa', 'bb', 'cc']
                              * @param {function} [compareFunc=null] - 比较函数 compareFunc(val, searchVal, arrElem, index, orignArr)
                              *                                        省略时，表示进行全等比较。
                              * @example
                              * 1. 简单的使用
                              * searchIndex([1, 2, 3], 2); // => 1
                              * 
                              * 2. 使用自定义的比较函数
                              * searchIndex([1, 2, 3], '2', '', (val, searchVal)=>val==searchVal); // => 1
                              * 
                              * 3. 指定用值的路径
                              * searchIndex([1, {aa: 3}, {aa: {bb: 3}}, {aa: {bb: 4}], 3, 'aa.bb'); // => 1
                              */
function searchIndex(arr, searchVal) {var propPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';var compareFunc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var result_index = -1;
  if (propPath) {
    if (typeof propPath === 'string') {
      propPath = propPath.split(/\s*[\,\.]\s*/);
    } else if (!Array.isArray(propPath)) {
      propPath = '';
    }
  }
  forEach(arr, function (val, index, orignArr) {
    if (propPath) {
      val = props(val, propPath);
    }
    if (
    typeof compareFunc === 'function' ?
    compareFunc(val, searchVal, arrElem, index, orignArr) :
    val === searchVal)
    {
      result_index = index;
      return false;
    }
  });
  return result_index;
}

/**
   * 遍历数组或类数组或普通对象
   * 跟原生的forEach的差别是: 可以遍历普通对象，也可以中途可以退出。
   * 注意，类数组只会遍历其中的数字属性。
   * @public
   * @param {object|Array} obj - 要遍历的对象
   * @param {function} func - 回调  func.call(thisObj, value, prop, obj);
   * @param {any} [thisObj=null] - 回调中的this
   * @example
   * 1. forEach({a: 3, b: 4}, (val, prop, obj)=>{ // 遍历普通对象
   *     return false; //返回false 表示退出循环
   * });
   * 
   * 2. forEach([3, 4], (val, index, obj)=>{ // 遍历数组
   *     return false; //返回false 表示退出循环
   * });
   * 
   * 3. forEach({1: 3, 5: 10, a: 'aa', length: 20}, (val, index, obj)=>{ // 遍历类数组
   *     return false; //返回false 表示退出循环
   * });
   */
function forEach(obj, func) {var thisObj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  if (obj == null || typeof obj === 'function' || typeof func !== 'function') {
    return obj;
  }

  //对象自身的（不含继承的）所有可遍历（enumerable）属性
  var keys = Object.keys(obj);

  var length = obj.length;
  var isArrayLike = typeof length == 'number' && length > -1 && length % 1 == 0 && length <= 9007199254740991;

  //如果是类数组或数组，只遍历其中的数字属性
  if (isArrayLike) {
    var reg = /^(?:0|[1-9]\d*)$/,
    maxNum = 9007199254740991,
    numPropArr = [];
    for (var i = 0, val; i < keys.length; i++) {
      val = keys[i];
      if (reg.test(val) && +val <= maxNum) {
        numPropArr.push(val);
      }
    }
    keys = numPropArr;
  }

  // 开始遍历所有的数字属性
  for (var _i2 = 0; _i2 < keys.length; _i2++) {
    if (func.call(thisObj, obj[keys[_i2]], keys[_i2], obj) === false) {break;}
  }
  return obj;
}

/**
   * 从一个对象上取指定的属性 或 设置属性的值
   * @public
   * @param {Object} obj - 对象, 当设置时，会更改这个对象
   * @param {Array} propArr - 属性名称的数组，指出要操作的属性的路径
   * @param {any} [val=undefined]   -  要设置的值 省略时表示获取，否则就是设置
   * @param {Boolean} [fource=false]   - 在设置时，如果不存在对应的属性，是否创建
   * @returns {any|undefined} 设置时一定返回undefined, 获取时，返回对应的值，如果不存在则返回undefined
   * @example
   * 1. props({}, ['aa', 'bb', 'cc'], 5);  // => undefined 什么也没做
   * 2. props({}, ['aa', 'bb', 'cc'], 5, true);  // => undefined  在空对象上创建了多层属性 {aa: {bb: {cc: 5} }}
   * 3. props({}, ['aa', 'bb', 'cc']);  // => undefined
   * 4. props({aa: {bb: 77}}, ['aa', 'bb']);  // => 77
   * 5. props({aa: 3}, ['aa', 'bb', 'cc'], 5);  // => undefined 什么也没做
   * 6. props({aa: 3}, ['aa'], 5);  // => undefined  设置了 aa 的值为5
   * 7. props({aa: 3}, [], 5);  // => undefined 什么也没做
   */
function props(obj, propArr) {var val = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;var fource = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  for (var i = 0, subObj = obj, len = propArr.length, propName; i < len; i++) {
    if (!subObj || typeof subObj !== 'object') {
      return;
    }
    propName = propArr[i];
    if (i === len - 1) {
      if (val === undefined) {
        return subObj[propName];
      } else {
        subObj[propName] = val;
      }
    } else {
      if (!(subObj[propName] && typeof subObj[propName] === 'object')) {
        if (fource && val !== undefined) {
          subObj[propName] = {};
        } else {
          return;
        }
      }
      subObj = subObj[propName];
    }
  }
}


/**
  * 分次执行某个函数
  * 使用场景: 异步执行某个操作，这个操作可能会失败，所以当失败时，需要再尝试几次，直到成功或尝试次数用完
  * @public
  * @param {function} callback - 要执行的函数 callback.call(thisObj, next, currCount, timers)
  * @param {any} [thisObj=null] - callback中的this
  * @returns {function} 返回next函数，next函数可以传入以下两个参数   
  * 					  {any} [delayTime=-1] - 延迟多久(ms)再执行下一次callback回调
  * 											 负数、NaN、Infinite表示立即同步调用，其它值表示延迟执行
  * 					  {string} [type='both'] - 当调用next时，如果其它地方也调用了next并且还没有完成，此时该保留哪次调用
  * 						   				'new' - 保留本次的，清除所有原来的
  * 						   				'old' - 保留所有原来的，舍弃本次的
  * 						   				'both' - 两个都保留
  * @example
  * 1. 最简单的使用
  * stepRunFunc((next, currCount, timers)=>{
  * 		console.log('执行第' + currCount + '次');
  *      currCount <= 2 && next(2000);
  * })();
  * // => 会立即执行第一次，然后2s后再执行第二次
  * 
  * 2. next()函数的第二个参数，是考虑到，用户可能会在短时间内连续调用多次，此时应该怎么处理这些next调用之间的关系
  * stepRunFunc((next, currCount, timers)=>{
  * 		console.log('执行第' + currCount + '次');
  *      if(currCount <= 2 ){
  *          next(3000);
  *          setTimeout(()=>{next(1000, 'old')}, 1000); // 这一次next调用将不起作用
  *      }
  * })();
  * // => 会立即执行第一次，然后3s后再执行第二次
  */
function stepRunFunc(callback) {var thisObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var getDelayTime = function getDelayTime(delayTime) {// 转换delayTime的格式
    delayTime = parseInt(delayTime);
    if (isNaN(delayTime) || !isFinite(delayTime)) {
      delayTime = -1;
    }
    return delayTime;
  };
  var timers = []; // 记录所有正在执行的计时器
  var clearTimer = function clearTimer(oneTimer) {// 清除定时器
    if (oneTimer == null) {
      for (var i = 0; i < timers.length; i++) {
        clearTimeout(timers[i]);
      }
      timers.length = 0;
    } else {
      var index = timers.indexOf(oneTimer);
      if (index > -1) {
        clearTimeout(timers[index]);
        timers.splice(index, 1);
      }
    }
  };
  var currCount = 0; // 记录callback当前已经执行了的次数
  var next = function next() {var delayTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
    if (type === 'new') {// 如果只保留最新的next回调
      clearTimer();
    } else if (type === 'old' && timers.length > 0) {// 保留以前的next回调，忽略本次next回调
      return;
    }
    delayTime = getDelayTime(delayTime);
    if (delayTime < 0) {
      callback.call(thisObj, next, ++currCount, timers);
    } else {
      var oneTimer = setTimeout(function () {
        clearTimer(oneTimer);
        callback.call(thisObj, next, ++currCount, timers);
      }, delayTime);
      timers.push(oneTimer);
    }
  };
  return next;
}
/************************** js libs ****************************/
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["default"]))

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/vue-loader/lib/index.js?!E:\\code\\github\\hx_uniapp_compontent__xfl-select\\test_select\\components\\xfl-select\\xfl-select.vue?vue&type=style&index=0&id=2c6f90e6&scoped=true&lang=less&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-1!./node_modules/css-loader??ref--10-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--10-oneOf-1-3!./node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-5!./node_modules/vue-loader/lib??vue-loader-options!E:/code/github/hx_uniapp_compontent__xfl-select/test_select/components/xfl-select/xfl-select.vue?vue&type=style&index=0&id=2c6f90e6&scoped=true&lang=less& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!E:\\code\\github\\hx_uniapp_compontent__xfl-select\\test_select\\components\\xfl-select\\xfl-select.vue?vue&type=template&id=2c6f90e6&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!E:/code/github/hx_uniapp_compontent__xfl-select/test_select/components/xfl-select/xfl-select.vue?vue&type=template&id=2c6f90e6&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "E:\\code\\github\\hx_uniapp_compontent__xfl-select\\test_select\\components\\xfl-select\\xfl-select.vue":
/*!********************************************************************************************************!*\
  !*** E:/code/github/hx_uniapp_compontent__xfl-select/test_select/components/xfl-select/xfl-select.vue ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _xfl_select_vue_vue_type_template_id_2c6f90e6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./xfl-select.vue?vue&type=template&id=2c6f90e6&scoped=true& */ "E:\\code\\github\\hx_uniapp_compontent__xfl-select\\test_select\\components\\xfl-select\\xfl-select.vue?vue&type=template&id=2c6f90e6&scoped=true&");
/* harmony import */ var _xfl_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./xfl-select.vue?vue&type=script&lang=js& */ "E:\\code\\github\\hx_uniapp_compontent__xfl-select\\test_select\\components\\xfl-select\\xfl-select.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _xfl_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _xfl_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _xfl_select_vue_vue_type_style_index_0_id_2c6f90e6_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./xfl-select.vue?vue&type=style&index=0&id=2c6f90e6&scoped=true&lang=less& */ "E:\\code\\github\\hx_uniapp_compontent__xfl-select\\test_select\\components\\xfl-select\\xfl-select.vue?vue&type=style&index=0&id=2c6f90e6&scoped=true&lang=less&");
/* harmony import */ var _D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _xfl_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _xfl_select_vue_vue_type_template_id_2c6f90e6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _xfl_select_vue_vue_type_template_id_2c6f90e6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "2c6f90e6",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "E:/code/github/hx_uniapp_compontent__xfl-select/test_select/components/xfl-select/xfl-select.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "E:\\code\\github\\hx_uniapp_compontent__xfl-select\\test_select\\components\\xfl-select\\xfl-select.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************!*\
  !*** E:/code/github/hx_uniapp_compontent__xfl-select/test_select/components/xfl-select/xfl-select.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_xfl_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./xfl-select.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!E:\\code\\github\\hx_uniapp_compontent__xfl-select\\test_select\\components\\xfl-select\\xfl-select.vue?vue&type=script&lang=js&");
/* harmony import */ var _D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_xfl_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_xfl_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_xfl_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_xfl_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_xfl_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "E:\\code\\github\\hx_uniapp_compontent__xfl-select\\test_select\\components\\xfl-select\\xfl-select.vue?vue&type=style&index=0&id=2c6f90e6&scoped=true&lang=less&":
/*!******************************************************************************************************************************************************************!*\
  !*** E:/code/github/hx_uniapp_compontent__xfl-select/test_select/components/xfl-select/xfl-select.vue?vue&type=style&index=0&id=2c6f90e6&scoped=true&lang=less& ***!
  \******************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_xfl_select_vue_vue_type_style_index_0_id_2c6f90e6_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-1!./node_modules/css-loader??ref--10-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--10-oneOf-1-3!./node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-5!./node_modules/vue-loader/lib??vue-loader-options!./xfl-select.vue?vue&type=style&index=0&id=2c6f90e6&scoped=true&lang=less& */ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/vue-loader/lib/index.js?!E:\\code\\github\\hx_uniapp_compontent__xfl-select\\test_select\\components\\xfl-select\\xfl-select.vue?vue&type=style&index=0&id=2c6f90e6&scoped=true&lang=less&");
/* harmony import */ var _D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_xfl_select_vue_vue_type_style_index_0_id_2c6f90e6_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_xfl_select_vue_vue_type_style_index_0_id_2c6f90e6_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_xfl_select_vue_vue_type_style_index_0_id_2c6f90e6_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_xfl_select_vue_vue_type_style_index_0_id_2c6f90e6_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_xfl_select_vue_vue_type_style_index_0_id_2c6f90e6_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "E:\\code\\github\\hx_uniapp_compontent__xfl-select\\test_select\\components\\xfl-select\\xfl-select.vue?vue&type=template&id=2c6f90e6&scoped=true&":
/*!***************************************************************************************************************************************************!*\
  !*** E:/code/github/hx_uniapp_compontent__xfl-select/test_select/components/xfl-select/xfl-select.vue?vue&type=template&id=2c6f90e6&scoped=true& ***!
  \***************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_xfl_select_vue_vue_type_template_id_2c6f90e6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./xfl-select.vue?vue&type=template&id=2c6f90e6&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!E:\\code\\github\\hx_uniapp_compontent__xfl-select\\test_select\\components\\xfl-select\\xfl-select.vue?vue&type=template&id=2c6f90e6&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_xfl_select_vue_vue_type_template_id_2c6f90e6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_m_software_HBuilderX_1_7_0_20190314_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_xfl_select_vue_vue_type_template_id_2c6f90e6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/xfl-select/xfl-select.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/xfl-select/xfl-select-create-component',
    {
        'components/xfl-select/xfl-select-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('./node_modules/@dcloudio/uni-mp-weixin/dist/index.js')['createComponent'](__webpack_require__("E:\\code\\github\\hx_uniapp_compontent__xfl-select\\test_select\\components\\xfl-select\\xfl-select.vue"))
        })
    },
    [['components/xfl-select/xfl-select-create-component']]
]);                
