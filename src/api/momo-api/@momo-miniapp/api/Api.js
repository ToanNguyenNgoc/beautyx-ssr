"use strict";var _Api2=_interopRequireDefault(require("./@momo-api/Api"));function _typeof(a){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function _createClass(a,b,c){return b&&_defineProperties(a.prototype,b),c&&_defineProperties(a,c),Object.defineProperty(a,"prototype",{writable:!1}),a}function _inherits(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function");a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,writable:!0,configurable:!0}}),Object.defineProperty(a,"prototype",{writable:!1}),b&&_setPrototypeOf(a,b)}function _setPrototypeOf(a,b){return _setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(a,b){return a.__proto__=b,a},_setPrototypeOf(a,b)}function _createSuper(a){var b=_isNativeReflectConstruct();return function(){var c,d=_getPrototypeOf(a);if(b){var e=_getPrototypeOf(this).constructor;c=Reflect.construct(d,arguments,e)}else c=d.apply(this,arguments);return _possibleConstructorReturn(this,c)}}function _possibleConstructorReturn(a,b){if(b&&("object"===_typeof(b)||"function"==typeof b))return b;if(void 0!==b)throw new TypeError("Derived constructors may only return object or undefined");return _assertThisInitialized(a)}function _assertThisInitialized(a){if(void 0===a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return a}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(a){return!1}}function _getPrototypeOf(a){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(a){return a.__proto__||Object.getPrototypeOf(a)},_getPrototypeOf(a)}var Index=/*#__PURE__*/function(a){function b(){return _classCallCheck(this,b),c.apply(this,arguments)}_inherits(b,a);var c=_createSuper(b);return _createClass(b,[{key:"copyToClipboard",value:/**
     * copy text to Clipboard and show toast.
     * @method
     * @public
     * @param {text} - text to save to Clipboard
     * @param {text} - text to show on Toast
     */function copyToClipboard(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["copyToClipboard"].concat(b))}/**
     * open Dialer to call.
     * @public
     * @method
     * @param {text} - phone number
     */},{key:"openDialer",value:function openDialer(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["openDialer"].concat(b))}/**
     * convert image from url to base64 string.
     * @method
     * @public
     * @param {url} - image url
     * @param {callback} - callback base64 image
     */},{key:"getBase64FromUrl",value:function getBase64FromUrl(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["getBase64FromUrl"].concat(b))}/**
     * set Brightness level.
     * @method
     * @public
     * @param {number} - brightnessLevel 0 to 1
     * @param {callback} - callback success or not
     */},{key:"setBrightnessLevel",value:function setBrightnessLevel(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["setBrightnessLevel"].concat(b))}/**
     * get Brightness level.
     * @method
     * @public
     * @param {callback} - callback current brightness level
     */},{key:"getBrightnessLevel",value:function getBrightnessLevel(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["getBrightnessLevel"].concat(b))}/**
     * get system Brightness level (Android only).
     * @method
     * @public
     * @param {callback} - callback current system brightness level
     */},{key:"getSystemBrightnessLevel",value:function getSystemBrightnessLevel(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["getSystemBrightnessLevel"].concat(b))}/**
     * show SMS activity.
     * @method
     * @public
     * @param {number} - phone number
     * @param {text} - sms content
     * @param {callback} - callback empty
     */},{key:"sendSMS",value:function sendSMS(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["sendSMS"].concat(b))}/**
     * capture screenshot
     * @method
     * @public
     * @param {callback} - callback base64 of screenshot
     */},{key:"getScreenShot",value:function getScreenShot(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["getScreenShot"].concat(b))}/**
     * enable screenshot (Android only).
     * @method
     * @public
     * @param {boolean} - enable screenshot
     */},{key:"enableScreenshots",value:function enableScreenshots(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["enableScreenshots"].concat(b))}/**
     * Get image from gallery or capture new image
     * @method
     * @public
     * @param {Object} options options: {type: "camera" || "album" || "storage", editable: true/false}
     * @param {callback} callback
     */},{key:"getImage",value:function getImage(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["getImage"].concat(b))}/**
     * save image to gallery
     * @public
     * @param {string} base64Image
     * @param {callback} callback
     */},{key:"saveImage",value:function saveImage(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["saveImage"].concat(b))}/**
     * get size image
     * @public
     * @param {string} uri
     * @param {callback} callback
     */},{key:"getImageSize",value:function getImageSize(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["getImageSize"].concat(b))}/**
     * get rotated image from uri, return back uri
     * @public
     * @param {string} uri
     * @param {callback} callback
     */},{key:"getImageRotateFromUri",value:function getImageRotateFromUri(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["getImageRotateFromUri"].concat(b))}/**
     * open url
     * @public
     * @method
     * @param {callback} callbackDeepLink
     */},{key:"openURL",value:function openURL(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["openURL"].concat(b))}/**
     * playYouTube
     * @method
     * @public
     * @param {Object} video: {videoId: VideoId, videoURL: videoUrl}
     * @param {callback} callbackDeepLink
     */},{key:"playYouTube",value:function playYouTube(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["playYouTube"].concat(b))}/**
     *  tracking event
     * @public
     * @param {String} event tracking event name
     * @param {Object} parameters tracking parameters
     */},{key:"track",value:function track(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["track"].concat(b))}/**
     *  share Facebook
     * @public
     * @param {Object} params {link: link to share, image: share image, stories: {}}
     */},{key:"shareFacebook",value:function shareFacebook(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["shareFacebook"].concat(b))}/**
     * throwException
     * throw Exception from miniApp at version 1.0
     * @public
     * @param {*} exception
     * @param {*} callback
     */},{key:"throwJSException",value:function throwJSException(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["throwJSException"].concat(b))}/**
     * share text content to other apps
     * @public
     * @param {*} data
     * @param {*} callback
     */},{key:"share",value:function share(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["share"].concat(b))}/**
     * Check device is high performance
     * @method
     * @public
     * @param {callback} callback
     */},{key:"isHighPerformanceDevice",value:function isHighPerformanceDevice(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["isHighPerformanceDevice"].concat(b))}/**
     * register device shaking listener.
     * @method
     * @public
     */},{key:"registerShakeSensitivity",value:function registerShakeSensitivity(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["registerShakeSensitivity"].concat(b))}/**
     * unregister device shaking listener.
     * @method
     * @public
     */},{key:"unregisterShakeSensitivity",value:function unregisterShakeSensitivity(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["unregisterShakeSensitivity"].concat(b))}/**
     * Creates or updates a calendar event. To update an event, the event id must be defined.
     * @public
     * @param title - The title of the event
     * @param details - Event details
     * @param [options] - Options specific to the saved event.
     * @returns - Promise resolving to saved event's ID.
     */},{key:"saveCalendarEvent",value:function saveCalendarEvent(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["saveCalendarEvent"].concat(b))}/**
     * activeKeepAwake
     * @method
     * @public
     * @param isActive - The title of the event
     */},{key:"activeKeepAwake",value:function activeKeepAwake(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["activeKeepAwake"].concat(b))}/**
     *
     * getToolkit
     * @public
     * @param
     */},{key:"getToolkit",value:function getToolkit(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["getToolkit"].concat(b))}/**
     * Show toolkit menu mini apps.
     * @method
     * @public
     * @param {Object} params
     * If mini app wants to show specific tool functions, an array of tool can be passed.
     * Otherwise, all functions should be displayed on bottom sheet.
     * List of functions: addFavorite, addShortcut, share, settings, support.
     *
     * @example
     * MaxApi.showToolkit({
     *      tools: ['addFavorite', 'addShortcut']
     * });
     */},{key:"showToolkit",value:function showToolkit(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["showToolkit"].concat(b))}/**
     * Show toolkit menu mini apps.
     * @method
     * @public
     * @param {Object} params
     * @param {callback} callback
     * @example
     * MiniApi.showQrCodeReader(callback,params);
     */},{key:"showQrCodeReader",value:function showQrCodeReader(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["showQrCodeReader"].concat(b))}/**
     * Get contacts.
     * @method
     * @public
     * @param {Object} options
     * @param {boolean} options.allowMultipleSelection Allow select multi contact. Default: false
     * @param {boolean} options.allowMomo Allow select momo. Default: true
     * @param {boolean} options.allowNonMomo Allow select non momo. Default: true
     * @param {boolean} options.allowAgency Allow select agency. Default: true
     * @param {boolean} options.allowSelf Allow select yourself. Default: false
     * @param {boolean} options.allowDuplicate Allow select duplicate .Default: false
     * @param {boolean} options.showPopupNonMomo Show popup when select contact non momo. Default: false
     * @param {text} options.contentPopupNonMomo Content of popup contact non momo
     * @param {Number} options.maxCountSelection Maximum length of contact can select. Default: 1
     * @param {text} options.messageOverCountSelection Message when select over maximum length of contact
     * @param {text} options.messageSelfSelection Message when select yourself
     * @param {text} options.messageDuplicateSelection Message when select duplicate
     * @param {text} options.messageAgencySelection Message when select agency
     * @param {text} options.messageMomoSelection Message when select momo
     * @param {text} options.messageNonMomoSelection Message when select non momo
     * @param {Array} options.selectedContacts Result from callback
     * @param {function} return Array contacts
     */},{key:"getContacts",value:function getContacts(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["getContacts"].concat(b))}/**
     * Save contact
     * @method
     * @public
     * @param {object} contact {phone, name}
     * @param {text}
     * @param {function} callback Callback({ isSaveSuccess, contact })
     */},{key:"saveContact",value:function saveContact(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["saveContact"].concat(b))}/**
     * listen all events
     * @method
     * @public
     * @param {string} event event
     * @param {callback} callback
     */},{key:"listen",value:function listen(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["listen"].concat(b))}/**
     * get location of device.
     * @method
     * @public
     * @param {callback} - return location of device
     */},{key:"getLocation",value:function getLocation(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["getLocation"].concat(b))}/**
     * request permission
     * @method
     * @public
     * @param {string} permission
     * @param {callback} callback
     */},{key:"requestPermission",value:function requestPermission(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["requestPermission"].concat(b))}/**
     * check permission has granted
     * @method
     * @public
     * @param {string} permission
     * @param {callback} callback
     */},{key:"checkPermission",value:function checkPermission(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["checkPermission"].concat(b))}/**
     * get data from qr code
     * @public
     * @param {object} data
     * @param {callback} callback
     */},{key:"scanQRCode",value:function scanQRCode(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["scanQRCode"].concat(b))}/**
     * start screen by feature code.
     * @method
     * @public
     * @param {object} - featureId
     * @param {object} - params
     * @param {callback} - callback
     */},{key:"startFeatureCode",value:function startFeatureCode(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["startFeatureCode"].concat(b))}/**
     * start web screen by url or html.
     * @method
     * @public
     * @param {object} - {url, html, title}
     * @param {callback} - callback
     */},{key:"openWeb",value:function openWeb(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["openWeb"].concat(b))}/**
     * dismiss current screen and return result for previous route
     * @method
     * @public
     * @param {object} - result
     * @param {callback} - callback
     */},{key:"dismiss",value:function dismiss(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["dismiss"].concat(b))}/**
     * dismiss all screen.
     * @method
     * @public
     * @param {callback} - callback
     */},{key:"dismissAll",value:function dismissAll(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["dismissAll"].concat(b))}/**
     * go back.
     * @method
     * @public
     * @param {callback} - callback
     */},{key:"goBack",value:function goBack(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["goBack"].concat(b))}/**
     * go home screen.
     * @method
     * @public
     * @param {callback} - callback
     */},{key:"goHome",value:function goHome(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["goHome"].concat(b))}/**
     * get data from Storage.
     * @method
     * @public
     * @param {text} - key
     * @param {callback} - return value
     */},{key:"getItem",value:function getItem(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["getItem"].concat(b))}/**
     * set data to Storage.
     * @method
     * @public
     * @param {text} - key
     * @param {text} - value
     */},{key:"setItem",value:function setItem(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["setItem"].concat(b))}/**
     * remove data from Storage.
     * @method
     * @public
     * @param {text} - key
     */},{key:"removeItem",value:function removeItem(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["removeItem"].concat(b))}/**
     * show Toast.
     * @method
     * @public
     * @param {array} - args
     */},{key:"showToast",value:function showToast(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["showToast"].concat(b))}/**
     * hide Toast.
     * @method
     * @public
     * @param {array} - args
     */},{key:"hideToast",value:function hideToast(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["hideToast"].concat(b))}/**
     * show Loading.
     * @method
     * @public
     * @param {array} - args
     */},{key:"showLoading",value:function showLoading(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["showLoading"].concat(b))}/**
     * hide Loading.
     * @method
     * @public
     * @param {array} - args
     */},{key:"hideLoading",value:function hideLoading(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["hideLoading"].concat(b))}/**
     * show dialog alert.
     * @method
     * @public
     * @param {text} - title
     * @param {text} - message
     * @param {array} - buttonTitles
     * @param {callback} - return index of CTAs of dialog which be clicked
     */},{key:"showAlert",value:function showAlert(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["showAlert"].concat(b))}/**
     * show bottomsheet to choose action.
     * @method
     * @public
     * @param {text} - title
     * @param {array} - buttonTitles
     * @param {callback} - return index of CTAs of bottomSheet which be clicked
     */},{key:"showAction",value:function showAction(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["showAction"].concat(b))}/**
     * show bottomsheet to choose action.
     * @method
     * @public
     * @param {object} - args
     * @param {callback} - callback
     */},{key:"showPicker",value:function showPicker(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["showPicker"].concat(b))}/**
     * request user info.
     * @method
     * @public
     * @param {object} - options
     * @param {callback} - return user info
     */},{key:"requestUserInfo",value:function requestUserInfo(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["requestUserInfo"].concat(b))}/**
     * request user consents.
     * @method
     * @public
     * @param {object} - options
     * @param {callback} - return user info
     */},{key:"requestUserConsents",value:function requestUserConsents(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["requestUserConsents"].concat(b))}/**
     * get user consents.
     * @method
     * @public
     * @param {object} - options
     * @param {callback} - return user info
     */},{key:"getUserConsents",value:function getUserConsents(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["getUserConsents"].concat(b))}/**
     * get userUniqueId from partnerCode
     * this api provided from SDK team
     * resolve issue of 7-eleven partner
     * @public
     * @param {*} params { partnerCode } is code provided from SDK, M4B team
     * @param {*} callback
     */},{key:"getUserUUID",value:function getUserUUID(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["getUserUUID"].concat(b))}/**
     * Get User Authentication
     * @method
     * @public
     * @param {*} callback
     */},{key:"getUserAuth",value:function getUserAuth(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["getUserAuth"].concat(b))}/**
     * Get Wallet ID
     * @method
     * @public
     * @param {*} callback
     */},{key:"getWalletId",value:function getWalletId(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["getWalletId"].concat(b))}/**
     * Push header navigation style
     * @method
     * @public
     *
     * @param {String} options.title
     * @param {Boolean} options.headerShown
     * @param {String} options.headerTintColor
     * @param {String | Array} options.headerBackground
     * @param {String} options.statusBarStyle: 'light-content' | 'dark-content'
     * @param {Boolean} options.disableBackPress: disable default backPress and emit "onBackPress" to window.onmessage for web
     */},{key:"pushWebNavigationOptions",value:function pushWebNavigationOptions(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["pushWebNavigationOptions"].concat(b))}/**
     * pop header navigation style
     * @method
     * @public
     */},{key:"popWebNavigationOptions",value:function popWebNavigationOptions(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["popWebNavigationOptions"].concat(b))}/**
     * Pop n styles
     * @method
     * @public
     * @param {Number} number: number of nodes you want to pop
     */},{key:"popNWebNavigationOptions",value:function popNWebNavigationOptions(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["popNWebNavigationOptions"].concat(b))}/**
     * Replace header navigation style
     * @method
     * @public
     * @param {String} options.title
     * @param {Boolean} options.headerShown
     * @param {String} options.headerTintColor
     * @param {String | Array} options.headerBackground
     * @param {String} options.statusBarStyle: 'light-content' | 'dark-content'
     * @param {Boolean} options.disableBackPress: disable default backPress and emit "onBackPress" to window.onmessage for web
     */},{key:"replaceWebNavigationOptions",value:function replaceWebNavigationOptions(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["replaceWebNavigationOptions"].concat(b))}/**
     * Trigger event vibration
     * @method
     * @public
     */},{key:"triggerEventVibration",value:function triggerEventVibration(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["triggerEventVibration"].concat(b))}/**
     *
     * share mini app to home screen
     * @public
     * @param
     **/},{key:"addShortcut",value:function addShortcut(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["addShortcut"].concat(b))}/**
     *
     * share mini app to social network
     * @public
     * @param
     **/},{key:"shareApp",value:function shareApp(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["shareApp"].concat(b))}/**
     *
     * add mini app to favorite
     * @public
     * @param
     **/},{key:"addFavorite",value:function addFavorite(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["addFavorite"].concat(b))}/**
     * Show  mini app toast suggestion
     * @method
     * @public
     * @param {Object} params
     * type: share,addFavorite,addShortcut
     * @example
     * MaxApi.showToastSuggestion({
     *     type:'share',
     *     duration: 5000,
     * });
     */},{key:"showToastSuggestion",value:function showToastSuggestion(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["showToastSuggestion"].concat(b))}/**
     * hide  mini app toast suggestion
     * @method
     * @public
     * @param {Object} params
     * @example
     * MaxApi.hideToastSuggestion({});
     */},{key:"hideToastSuggestion",value:function hideToastSuggestion(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return this.dispatchFunction.apply(this,["hideToastSuggestion"].concat(b))}}]),b}(_Api2["default"]);exports["default"]=Index;