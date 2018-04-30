const checkUtil = {
	// 去掉首尾空白字符
	trim :  function( str ) {
	    // null、undefined、NaN、0、false、''
	    if ( !str ) {
	        return str;
	    }
	    // 优先使用原生的
	    if ( str.trim ) {
	        return str.trim();
	    }
	    return str.replace( /^\s+|\s+$/g, '');
	},
	// 判断是不是函数
	_isFunction :  function( fn ) {
		return typeof fn === 'function';
	},
	// 判断是不是window
	_isWindow :  function( w ) {
	    return !!w && w.window === w;
	},
	// 判断是不是对象
	isObject :  function( obj ) {
		// 防止typeof对null的误判
		if ( obj === null ) {
		    return false;
		}
		// 如果是object或function，那就是对象
		if ( typeof obj === 'object' || typeof obj === 'function' ) {
		    return true;
		}
		return false;
	},
	// 判断是不是字符串
	_isString :  function( str ) {
	    return typeof str === 'string';
	},
	// 判断是不是真数组或伪数组
	isLikeArray :  function( arr ) {
	    // Function、window、!Object
	    if ( this._isFunction( arr ) || this._isWindow( arr ) || !this.isObject( arr ) ) {
	        return false;
	    }
	    // 判断是不是真数组
	    if ( ({}).toString.call( arr ) === '[object Array]' ) {
	        return true;
	    }
	    // 判断是不是伪数组
	    if ( 'length' in arr && ( arr.length === 0 || arr.length - 1 in arr ) ) {
	        return true;
	    }
	    return false;
	},
	// 判断内容是否为空
	isEmtry : function (str) {
		var err = 0;
		if(this.isLikeArray(str)) {		
			str.forEach((ele,index) => {	
				if(this.isEmtry(ele)){	
					err += 1
					return true
				}
			})
		}else if(this._isString(str)){
			if (str == null || this.trim(str).length === 0 || str == undefined) {
				return true
			}else{
				return false
			}
		}
		return err?true:false
	},
	isSame : function (str,str2) {
		return str === str2 ;
	}
}
module.exports = checkUtil;