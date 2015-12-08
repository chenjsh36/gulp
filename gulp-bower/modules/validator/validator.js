// 验证器定义///////////////////////////////////////////////////////////////////////
var validator = {
	types : {},
	config : {},
	message : [],
	validate : function(data) {
		var i, type, checker, result, msg;
		this.message = [];
		for (i in data) {
			if (data.hasOwnProperty(i)) {
				type = this.config[i];
				checker = this.types[type];
				if (!type) {
					continue;
				};
				if (!checker) {
					throw {
						name: 'ValidattionError',
						message: 'No handler to validate type ' + type
					};
				}
				result = checker.validate(data[i]);
				if (!result) {
					// msg = '"' + i + '*, ' + checker.instruction; 
					msg = {
						name: i,
						ins: checker.instruction
					}
					this.message.push(msg);
				}
			}
		}
		return this.hasErrors();
	},
	hasErrors : function() {
		return this.message.length !== 0;
	}
}

validator.types.isNonEmpty = {
	validate: function(val) {
		return val !== '';
	},
	instruction: '值不能为空'
};

validator.types.isMobilePhone = {
	validate: function(val) {
		return val !== '' && /[0-9]{11}/i.test(val);
	},
	instruction: '手机号码格式错误'
};


validator.types.isUserName = {
	validate: function(val) {
		return val !== '' && /^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/.test(val);
	},
	instruction: '用户名不合法'
};

validator.types.isPassword = {
	validate: function(val) {
		return val !== '' && /^[A-Za-z0-9_-]+$/.test(val);
	},
	instruction: '密码由字母和数字组成'
};

validator.types.isIdentify = {
	validate: function(val) {
		return val !== '' && /^[0-9]+$/.test(val);
	},
	instruction: '验证码格式错误'
};

// test example
var data = {
	'phone': '12345678901',
	'phone2': '1234567890',
	'username': 'asdfie12134ji',
	'username2': '@#$$@I@J',
	'passwd': 'sdfiowefj21230_-',
	'passwd2': '@#$IJOIFJ()',
	'iden': '323345',
	'iden2': '121e2ir3j'
};

validator.config = {
	'phone': 'isMobilePhone',
	'phone2': 'isMobilePhone',
	'username': 'isUserName',
	'username2': 'isUserName',
	'passwd': 'isPassword',
	'passwd2': 'isPassword',
	'iden': 'isIdentify',
	'iden2': 'isIdentify'
}

// if (validator.validate(data)) {
// 	console.log('hasErrors');
// 	console.log(validator.message.join(' '));
// } else {
// 	console.log('no error');
// }