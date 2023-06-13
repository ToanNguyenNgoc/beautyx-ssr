"use strict";function _typeof(a){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;var _reactNative=require("react-native"),_react=_interopRequireWildcard(require("react")),_ApiBase2=_interopRequireDefault(require("./ApiBase"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _getRequireWildcardCache(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(_getRequireWildcardCache=function(a){return a?c:b})(a)}function _interopRequireWildcard(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!==_typeof(a)&&"function"!=typeof a)return{default:a};var c=_getRequireWildcardCache(b);if(c&&c.has(a))return c.get(a);var d={},e=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var f in a)if("default"!=f&&Object.prototype.hasOwnProperty.call(a,f)){var g=e?Object.getOwnPropertyDescriptor(a,f):null;g&&(g.get||g.set)?Object.defineProperty(d,f,g):d[f]=a[f]}return d["default"]=a,c&&c.set(a,d),d}function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(Object(b),!0).forEach(function(c){_defineProperty(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(Object(b)).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function _inherits(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function");a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,writable:!0,configurable:!0}}),Object.defineProperty(a,"prototype",{writable:!1}),b&&_setPrototypeOf(a,b)}function _setPrototypeOf(a,b){return _setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(a,b){return a.__proto__=b,a},_setPrototypeOf(a,b)}function _createSuper(a){var b=_isNativeReflectConstruct();return function(){var c,d=_getPrototypeOf(a);if(b){var e=_getPrototypeOf(this).constructor;c=Reflect.construct(d,arguments,e)}else c=d.apply(this,arguments);return _possibleConstructorReturn(this,c)}}function _possibleConstructorReturn(a,b){if(b&&("object"===_typeof(b)||"function"==typeof b))return b;if(void 0!==b)throw new TypeError("Derived constructors may only return object or undefined");return _assertThisInitialized(a)}function _assertThisInitialized(a){if(void 0===a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return a}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(a){return!1}}function _getPrototypeOf(a){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(a){return a.__proto__||Object.getPrototypeOf(a)},_getPrototypeOf(a)}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function _createClass(a,b,c){return b&&_defineProperties(a.prototype,b),c&&_defineProperties(a,c),Object.defineProperty(a,"prototype",{writable:!1}),a}var runApplication=_reactNative.AppRegistry.runApplication,MiniAppProvider=function(a){(0,_react.useEffect)(function(){//..
return function(){null===a||void 0===a?void 0:a.removeHost(a)}},[]);var b=a.getComponentFunc,c=b();return/*#__PURE__*/_react["default"].createElement(c,a)},AppApiRegister=/*#__PURE__*/function(){function a(b){_classCallCheck(this,a),a._registerException(b)}return _createClass(a,[{key:"register",value:function register(a){return null!==a&&void 0!==a&&a.isWidget?this.registerWidget(a):this.registerApp(a)}},{key:"registerApp",value:function registerApp(){}},{key:"registerWidget",value:function registerWidget(){}}],[{key:"_registerException",value:function _registerException(a){var b=a.exceptionHandled;__DEV__||void 0!==b&&b||(global.ErrorUtils.setGlobalHandler(function(a,b){if(a){var c=a.message,d=a.name,e=a.stack;try{var f;null===(f=ApiReactNative.instance)||void 0===f?void 0:f.throwJSException({error:{message:c,name:d,stack:e},isFatal:b})}catch(a){console.warn("MaxApi: registerException instance undefined: ".concat(a))}}}),console.error=function(a,b){return global.ErrorUtils.reportError(b)})}}]),a}(),SingleBridgeAppApiRegister=/*#__PURE__*/function(a){function b(){return _classCallCheck(this,b),c.apply(this,arguments)}_inherits(b,a);var c=_createSuper(b);return _createClass(b,[{key:"registerApp",value:function registerApp(a){var b=a.params,c=a.getComponentFunc,d=a.onInitSuccess,e=a.init;try{var f=require("momo-core/max-api")["default"].registerMiniApp(b,function(a){if(!a)return void console.warn("Invalid call max api init with undefined passProps and params: ",b);var f=_objectSpread(_objectSpread({},b),a);return ApiReactNative.instance=e(f),d(ApiReactNative.instance),f.removeHost=ApiReactNative.instance.removeHost,f.getComponentFunc=c,/*#__PURE__*/_react["default"].createElement(MiniAppProvider,f)});return f}catch(a){return console.log("Error import max api -> registerApp in multiple bridge mode "),function(){return null}}}},{key:"registerWidget",value:function registerWidget(a){return this.registerApp(a)}}]),b}(AppApiRegister),MultipleBridgeAppApiRegister=/*#__PURE__*/function(a){function b(){return _classCallCheck(this,b),c.apply(this,arguments)}_inherits(b,a);var c=_createSuper(b);return _createClass(b,[{key:"registerApp",value:function registerApp(a){var b=a.params,c=a.getComponentFunc,d=a.onInitSuccess,e=a.init,f=b||{},g=f.appId,h=f.name,i=f.isWidget;!i&&(_reactNative.AppRegistry.runApplication=function(a,f){var i=(f||{}).initialProps,j=void 0===i?{}:i;if(a==g||a==h||"MiniApp"==a){var k=_objectSpread(_objectSpread({},b),j);ApiReactNative.instance=e(k),d(ApiReactNative.instance),f.initialProps=_objectSpread(_objectSpread({},j),{},{getComponentFunc:c,removeHost:ApiReactNative.instance.removeHost})}runApplication(a,f)},g&&_reactNative.AppRegistry.registerComponent(g,function(){return MiniAppProvider}),h&&_reactNative.AppRegistry.registerComponent(h,function(){return MiniAppProvider}),_reactNative.AppRegistry.registerComponent("MiniApp",function(){return MiniAppProvider}))}},{key:"registerWidget",value:function registerWidget(){console.log("Register miniapp widget in multiple bridge is not stable")}}]),b}(AppApiRegister),AppApiRegisterProvider=/*#__PURE__*/function(){function a(){_classCallCheck(this,a)}return _createClass(a,null,[{key:"getAppApiRegister",value:function getAppApiRegister(a){var b=(a||{}).bridgeMode;return 1===b?new SingleBridgeAppApiRegister(a):new MultipleBridgeAppApiRegister(a)}}]),a}(),ApiReactNative=/*#__PURE__*/function(a){function b(){return _classCallCheck(this,b),c.apply(this,arguments)}_inherits(b,a);var c=_createSuper(b);return _createClass(b,null,[{key:"registerApp",value:function registerApp(a,c,d){var e=null===a||void 0===a?void 0:a.isWidget;b.appJson=e?_objectSpread(_objectSpread({},b.appJson),a):a;var f=AppApiRegisterProvider.getAppApiRegister(b.appJson);f.register({isWidget:e,params:b.appJson,getComponentFunc:c,onInitSuccess:d,init:this.init.bind(this)})}}]),b}(_ApiBase2["default"]);exports["default"]=ApiReactNative,_defineProperty(ApiReactNative,"instance",void 0);