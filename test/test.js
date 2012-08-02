//Here is data for test
//if(!Object.keys){  
//    Object.keys = (function(){  
//         var hasOwnPrototype = Object.prototype.hasOwnPrototype,  
//               hasDontEnumBug = !({toString:null}).propertyIsEnumerable('toString'),  
//          dontEnums = [  
//                 'toString',  
//                 'toLocalString',  
//                 'valueOf',  
//                 'hasOwnProperty',  
//                 'isPrototypeOf',  
//                 'propertyIsEnumerable',  
//                 'constructor'  
//          ],  
//          dontEnumsLength = dontEnums.length;  
//          return function(obj){  
//                if(typeof obj !== 'object' && typeof obj !== 'function' || obj === null){  
//        throw new TypeError('Object.keys called on non-object')  
//                }    
//                var result = [];  
//                for(var prop in obj){  
//                     if(hasOwnProperty.call(obj,prop)){  
//                             result.push(prop);  
//                     }  
//               }  
//               if(hasDontEnumBug){  
//                     for(var i =0;i<dontEnumsLength;i++){  
//                          if (hasOwnProperty.call(obj, dontEnums[i])){             
//                                 result.push(dontEnums[i])                        
//                          }  
//                     }  
//               }  
//               return result;   
//          }  
//    })  
//}  
if (!Object.keys) Object.keys = function(o) {
  if (o !== Object(o))
    throw new TypeError('Object.keys called on a non-object');
  var k=[],p;
  for (p in o) if (Object.prototype.hasOwnProperty.call(o,p)) k.push(p);
  return k;
}
function verify(s)
{
	s.sendRequest('users/show/me.json', 'GET', null, function(data){
			if (data) {
				if (data.meta) 
				{
					var meta = data.meta;
					if (meta.status == 'ok' && meta.code == 200) 
					{
						alert('API call is successful');
						return;
					}
					else 
					{
						alert('API call is failed\n' +
						'Status: ' +
						meta.status +
						'\n' +
						'Code: ' +
						meta.code);
						return;
					}
				}
				else 
				{
					alert('data.meta is ' + data.meta);
					return;
				}
			}
			else 
			{
				alert('data is ' + data);
				return;
			}
		});
}


var appID = 'PwlZOBLGdZ0SxTohTf51mGwrrLivN5CI';
var appSecret = 'cqSreePIH9pMW37MAFO5epKIqz46oWWD'
var apiURL = 'api-staging.cloud.appcelerator.com';
var oauthURL = 'security-staging.cloud.appcelerator.com';
var redirectUri = 'www.baidu.com'; 
var state = ['notSignedUp',
				'signedUp',
				'signedIn',
				'signedOutWithSignedUp'];

//data for "Create Cocoafish instance - Positive"
var arg_1_key = {key:appID};
var arg_2_key_secret = {key:appID, secret:appSecret};
var arg_3_key_secret_baseURL = {key:appID, secret:appSecret, baseURL:'api-staging.cloud.appcelerator.com'};
var arg_4_key_secret_baseURL_authBaseURL = {key:appID, secret:appSecret, baseURL:'api-staging.cloud.appcelerator.com', authBaseURL:'security-staging.cloud.appcelerator.com'};
var arg_5_key_secret_baseURL_authBaseURL_redirectUri = {key:appID, secret:appSecret, baseURL:'api-staging.cloud.appcelerator.com', authBaseURL:'security-staging.cloud.appcelerator.com', redirect_uri:'www.appcelerator.com'};
var arrCreateCocoafish_Positive = new Array(arg_1_key,
											arg_2_key_secret,
											arg_3_key_secret_baseURL,
											arg_4_key_secret_baseURL_authBaseURL,
											arg_5_key_secret_baseURL_authBaseURL_redirectUri);

//data for "Create Cocoafish instance - Negative"
var invalid_arg_0 = {};
var invalid_arg_1_key = {key:'ThisIsAWrongIDKey'};
var invalid_arg_2_key_secret = {key:appID, secret:'UnmatchedSecretString'};
var invalid_arg_3_key_secret_baseURL = {key:appID, secret:appSecret, baseURL:'this-is-not-api-server.com'};
var invalid_arg_4_key_secret_baseURL_authBaseURL = {key:appID, secret:appSecret, baseURL:'api-staging.cloud.appcelerator.com', authBaseURL:'this-is-not-api-server.com'};
var invalid_arg_5_key_secret_baseURL_authBaseURL_redirectUri = {key:appID, secret:appSecret, baseURL:'api-staging.cloud.appcelerator.com', authBaseURL:'security-staging.cloud.appcelerator.com', redirect_uri:'www.it_does_not_exist.com'};
var invalid_arg_key_undefined = {key:undefined};
var invalid_arg_key_null = {key:null};
var invalid_arg_key_nullString = {key:''};
var invalid_arg_key_false = {key:false};
var invalid_arg_key_brace = {key:{}};
var arrCreateCocoafish_Negative = new Array(invalid_arg_0,
											invalid_arg_1_key,
											invalid_arg_2_key_secret,
											invalid_arg_3_key_secret_baseURL,
											invalid_arg_4_key_secret_baseURL_authBaseURL,
											invalid_arg_5_key_secret_baseURL_authBaseURL_redirectUri,
											invalid_arg_key_undefined,
											invalid_arg_key_null,
											invalid_arg_key_false,
											invalid_arg_key_brace);

//data for "Call signUpRequest - Positive"
var arg_1_redirectUri = {redirectUri:'www.appcelerator.com'};
var arg_1_useSecure_true = {useSecure:true}
var arg_1_useSecure_false = {useSecure:false}

var params = new Object();
params.display = 'popup';
params.size = {};
params.size.width = 500;
params.size.height = 500;
params.cb = function(data)
{
	alert('cb: ' + data.cb + '\n' +
			'access_token: ' + data.access_token + '\n' +
			'expires_in: ' + data.expires_in + '\n' +
			'key: ' + data.key);
}
//params.cb = function(data)
//{
//	var str = '';
//	for (key in data) 
//	{
//		str = data[key] + '\n';
//	}
//	alert(str);
//}
var arg_1_params_regular_popup = {params:params};	//regular popup

var params = new Object();
params.display = 'iframe';
params.size = {};
params.size.width = 500;
params.size.height = 500;
params.cb = function(data)
{
	alert('cb: ' + data.cb + '\n' +
			'access_token: ' + data.access_token + '\n' +
			'expires_in: ' + data.expires_in + '\n' +
			'key: ' + data.key);
}
var arg_1_params_regular_iframe = {params:params};

var params = new Object();
params.display = 'popup';
params.size = {};
params.size.width = 0;
params.size.height = 0;
params.cb = function(data)
{
	alert('cb: ' + data.cb + '\n' +
			'access_token: ' + data.access_token + '\n' +
			'expires_in: ' + data.expires_in + '\n' +
			'key: ' + data.key);
}
var arg_1_params_B = {params:params};	//size => Zero

var params = new Object();
params.display = 'popup';
params.size = {};
params.size.width = 500;
params.size.height = 500;
params.cb = function(data)
{
	alert('cb: ' + data.cb + '\n' +
			'access_token: ' + data.access_token + '\n' +
			'expires_in: ' + data.expires_in + '\n' +
			'key: ' + data.key);
}
var arg_3_all = {redirectUri:'www.appcelerator.com', useSecure:true, params:params};
var arrCallSignUpRequest_Positive = new Array(arg_1_redirectUri,
											arg_1_useSecure_true,
											arg_1_useSecure_false,
											arg_1_params_regular_popup,
											arg_1_params_regular_iframe,
											arg_1_params_B,
											arg_3_all);

//data for "Call signUpRequest - Negative"
var invalid_arg_1_redirectUri_undefined = {redirectUri:undefined};
var invalid_arg_1_redirectUri_null = {redirectUri:null};
var invalid_arg_1_redirectUri_nullString = {redirectUri:''};
var invalid_arg_1_redirectUri_false = {redirectUri:false};
var invalid_arg_1_redirectUri_brace = {redirectUri:{}};

var invalid_arg_1_useSecure_undefined = {useSecure:undefined};
var invalid_arg_1_useSecure_null = {useSecure:null};
var invalid_arg_1_useSecure_nullString = {useSecure:''};
var invalid_arg_1_useSecure_false = {useSecure:false};
var invalid_arg_1_useSecure_brace = {useSecure:{}};

var invalid_arg_1_params_undefined = {params:undefined};
var invalid_arg_1_params_null = {params:null};
var invalid_arg_1_params_nullString = {params:''};
var invalid_arg_1_params_false = {params:false};
var invalid_arg_1_params_brace = {params:{}};

var params = new Object();
params.display = undefined;
params.size = {};
params.size.width = 500;
params.size.height = 500;
params.cb = function(data)
{
	alert('cb: ' + data.cb + '\n' +
			'access_token: ' + data.access_token + '\n' +
			'expires_in: ' + data.expires_in + '\n' +
			'key: ' + data.key);
}
var invalid_arg_params_display_undefined = {params:params};

var params = new Object();
params.display = null;
params.size = {};
params.size.width = 500;
params.size.height = 500;
params.cb = function(data)
{
	alert('cb: ' + data.cb + '\n' +
			'access_token: ' + data.access_token + '\n' +
			'expires_in: ' + data.expires_in + '\n' +
			'key: ' + data.key);
}
var invalid_arg_params_display_null = {params:params};

var params = new Object();
params.display = '';
params.size = {};
params.size.width = 500;
params.size.height = 500;
params.cb = function(data)
{
	alert('cb: ' + data.cb + '\n' +
			'access_token: ' + data.access_token + '\n' +
			'expires_in: ' + data.expires_in + '\n' +
			'key: ' + data.key);
}
var invalid_arg_params_display_nullString = {params:params};

var params = new Object();
params.display = false;
params.size = {};
params.size.width = 500;
params.size.height = 500;
params.cb = function(data)
{
	alert('cb: ' + data.cb + '\n' +
			'access_token: ' + data.access_token + '\n' +
			'expires_in: ' + data.expires_in + '\n' +
			'key: ' + data.key);
}
var invalid_arg_params_display_false = {params:params};

var params = new Object();
params.display = {};
params.size = {};
params.size.width = 500;
params.size.height = 500;
params.cb = function(data)
{
	alert('cb: ' + data.cb + '\n' +
			'access_token: ' + data.access_token + '\n' +
			'expires_in: ' + data.expires_in + '\n' +
			'key: ' + data.key);
}
var invalid_arg_params_display_brace = {params:params};

var params = new Object();
params.display = 'popup';
params.size = {};
params.size.width = undefined;
params.size.height = 500;
params.cb = function(data)
{
	alert('cb: ' + data.cb + '\n' +
			'access_token: ' + data.access_token + '\n' +
			'expires_in: ' + data.expires_in + '\n' +
			'key: ' + data.key);
}
var invalid_arg_params_width_undefined = {params:params};

var params = new Object();
params.display = 'popup';
params.size = {};
params.size.width = null;
params.size.height = 500;
params.cb = function(data)
{
	alert('cb: ' + data.cb + '\n' +
			'access_token: ' + data.access_token + '\n' +
			'expires_in: ' + data.expires_in + '\n' +
			'key: ' + data.key);
}
var invalid_arg_params_width_null = {params:params};

var params = new Object();
params.display = 'popup';
params.size = {};
params.size.width = 500;
params.size.height = 500;
params.cb = function(data)
{
	alert('cb: ' + data.cb + '\n' +
			'access_token: ' + data.access_token + '\n' +
			'expires_in: ' + data.expires_in + '\n' +
			'key: ' + data.key);
}
var invalid_arg_params_width_nullString = {params:params};

var params = new Object();
params.display = 'popup';
params.size = {};
params.size.width = false;
params.size.height = 500;
params.cb = function(data)
{
	alert('cb: ' + data.cb + '\n' +
			'access_token: ' + data.access_token + '\n' +
			'expires_in: ' + data.expires_in + '\n' +
			'key: ' + data.key);
}
var invalid_arg_params_width_false = {params:params};

var params = new Object();
params.display = 'popup';
params.size = {};
params.size.width = {};
params.size.height = 500;
params.cb = function(data)
{
	alert('cb: ' + data.cb + '\n' +
			'access_token: ' + data.access_token + '\n' +
			'expires_in: ' + data.expires_in + '\n' +
			'key: ' + data.key);
}
var invalid_arg_params_width_brace = {params:params};

var params = new Object();
params.display = 'popup';
params.size = {};
params.size.width = 500;
params.size.height = undefined;
params.cb = function(data)
{
	alert('cb: ' + data.cb + '\n' +
			'access_token: ' + data.access_token + '\n' +
			'expires_in: ' + data.expires_in + '\n' +
			'key: ' + data.key);
}
var invalid_arg_params_height_undefined = {params:params};

var params = new Object();
params.display = 'popup';
params.size = {};
params.size.width = 500;
params.size.height = null;
params.cb = function(data)
{
	alert('cb: ' + data.cb + '\n' +
			'access_token: ' + data.access_token + '\n' +
			'expires_in: ' + data.expires_in + '\n' +
			'key: ' + data.key);
}
var invalid_arg_params_height_null = {params:params};

var params = new Object();
params.display = 'popup';
params.size = {};
params.size.width = 500;
params.size.height = '';
params.cb = function(data)
{
	alert('cb: ' + data.cb + '\n' +
			'access_token: ' + data.access_token + '\n' +
			'expires_in: ' + data.expires_in + '\n' +
			'key: ' + data.key);
}
var invalid_arg_params_height_nullString = {params:params};

var params = new Object();
params.display = 'popup';
params.size = {};
params.size.width = 500;
params.size.height = false;
params.cb = function(data)
{
	alert('cb: ' + data.cb + '\n' +
			'access_token: ' + data.access_token + '\n' +
			'expires_in: ' + data.expires_in + '\n' +
			'key: ' + data.key);
}
var invalid_arg_params_height_false = {params:params};

var params = new Object();
params.display = 'popup';
params.size = {};
params.size.width = 500;
params.size.height = {};
params.cb = function(data)
{
	alert('cb: ' + data.cb + '\n' +
			'access_token: ' + data.access_token + '\n' +
			'expires_in: ' + data.expires_in + '\n' +
			'key: ' + data.key);
}
var invalid_arg_params_height_brace = {params:params};

params.size.height = 500;

var params = new Object();
params.display = 'popup';
params.size = {};
params.size.width = 500;
params.size.height = 500;
params.cb = undefined;
var invalid_arg_params_cp_undefined = {params:params};

var params = new Object();
params.display = 'popup';
params.size = {};
params.size.width = 500;
params.size.height = 500;
params.cb = null;
var invalid_arg_params_cp_null = {params:params};

var params = new Object();
params.display = 'popup';
params.size = {};
params.size.width = 500;
params.size.height = 500;
params.cb = '';
var invalid_arg_params_cp_nullString = {params:params};

var params = new Object();
params.display = 'popup';
params.size = {};
params.size.width = 500;
params.size.height = 500;
params.cb = false;
var invalid_arg_params_cp_false = {params:params};

var params = new Object();
params.display = 'popup';
params.size = {};
params.size.width = 500;
params.size.height = 500;
params.cb = {};
var invalid_arg_params_cp_brace = {params:params};

var params = new Object();
params.display = 'popup';
params.size = {};
params.size.width = 500;
params.size.height = 500;
params.cb = function(one, two)
{
	alert('this is the callback with 2 arguments');
};
var invalid_arg_params_cp_2args = {params:params};

var params = new Object();
params.display = 'popup';
params.size = {};
params.size.width = 500;
params.size.height = 500;
params.cb = function()
{
	alert('this is the callback with 0 arguments');
};
var invalid_arg_params_cp_0args = {params:params};
var arrCallSignUpRequest_Negative = new Array(invalid_arg_1_redirectUri_undefined,
												invalid_arg_1_redirectUri_null,
												invalid_arg_1_redirectUri_nullString,
												invalid_arg_1_redirectUri_false,
												invalid_arg_1_redirectUri_brace,
												invalid_arg_1_useSecure_undefined,
												invalid_arg_1_useSecure_null,
												invalid_arg_1_useSecure_nullString,
												invalid_arg_1_useSecure_false,
												invalid_arg_1_useSecure_brace,
												invalid_arg_1_params_undefined,
												invalid_arg_1_params_null,
												invalid_arg_1_params_nullString,
												invalid_arg_1_params_false,
												invalid_arg_1_params_brace,
												invalid_arg_params_display_undefined,
												invalid_arg_params_display_null,
												invalid_arg_params_display_nullString,
												invalid_arg_params_display_false,
												invalid_arg_params_display_brace,
												invalid_arg_params_width_undefined,
												invalid_arg_params_width_null,
												invalid_arg_params_width_nullString,
//												invalid_arg_params_width_false,
//												invalid_arg_params_width_brace,
												invalid_arg_params_height_undefined,
												invalid_arg_params_height_null,
												invalid_arg_params_height_nullString,
//												invalid_arg_params_height_false,
//												invalid_arg_params_height_brace,
												invalid_arg_params_cp_undefined,
												invalid_arg_params_cp_null,
												invalid_arg_params_cp_nullString,
												invalid_arg_params_cp_false,
												invalid_arg_params_cp_brace,
												invalid_arg_params_cp_2args,
												invalid_arg_params_cp_0args
												);
//data for Call sendAuthRequest - Positive
//same as "data for signUpRequest - Positive"
var arrCallSendAuthRequest_Positive = arrCallSignUpRequest_Positive;

//data for Call sendAuthReques - Negative
//same as "data for signUpRequest - Negative"
var arrCallSendAuthRequest_Negative = arrCallSignUpRequest_Negative;

//data for Call invalidateTokenRequest - Positive
//same as "data for signUpRequest - Positive
//var arrCallInvalidateTokenRequest_Positive = arrCallSignUpRequest_Positive;

//data for Call invalidateTokenRequest - Negative
//same as "data for signUpRequest - Negative
//var arrCallInvalidateTokenRequest_Negative = arrCallSignUpRequest_Negative;

//data for Call saveSession - Negative
var invalid_arg_data_undefined = undefined;
var invalid_arg_data_null = null;
var invalid_arg_data_nullString = '';
var invalid_arg_data_false = false;
var invalid_arg_data_brace = {};
var invalid_arg_data_number = 100;
var invalid_arg_data_string = 'myString';
var arrCallSaveSession_Negative = new Array(invalid_arg_data_undefined,
											invalid_arg_data_null,
											invalid_arg_data_nullString,
											invalid_arg_data_false,
											invalid_arg_data_brace,
											invalid_arg_data_number,
											invalid_arg_data_string);

//Here are Test Driver Code
function testCreateCocoafish_Positive()
{
	var count = 1;
	for (i in arrCreateCocoafish_Positive) 
	{
		arguments = arrCreateCocoafish_Positive[i];
		var message = '';
		for (i in arguments) 
		{
			switch (i) 
			{
				case 'key':
					message = message + 'key: ' + arguments[i] + '\n';
					break;
				case 'secret':
					message = message + 'secret: ' + arguments[i] + '\n';
					break;
				case 'baseURL':
					message = message + 'baseURL: ' + arguments[i] + '\n';
					break;
				case 'authBaseURL':
					message = message + 'authBaseURL: ' + arguments[i] + '\n';
					break;
				case 'redirect_uri':
					message = message + 'redirect_uri: ' + arguments[i] + '\n';
					break;
				default:
					message = message + 'None' + arguments[i] + '\n';
					break;
			}
		}
		alert('This is scenario #' + count + '\ninput is :\n' + message);
//		alert(Object.keys(arguments).length);
		switch (Object.keys(arguments).length)
		{
			case 0:
				sdk = new Cocoafish();
				alert('Create Cocoafish with:' + '\n' +
				'appKey: ' + sdk.appKey + '\n' + 'oauthKey: ' + sdk.oauthKey + '\n' + 
				'secret: ' + sdk.oauthSecret + '\n' +
				'baseURL: ' + sdk.apiBaseURL + '\n' +
				'authBaseURL: ' + sdk.authBaseURL + '\n' +
				'redirect_uri: ' + sdk.redirectUri);
				break;
			case 1:
				sdk = new Cocoafish(arguments.key);
//				alert(arguments.key);
				alert('Create Cocoafish with:' + '\n' +
				'appKey: ' + sdk.appKey + '\n' + 'oauthKey: ' + sdk.oauthKey + '\n' + 
				'secret: ' + sdk.oauthSecret + '\n' +
				'baseURL: ' + sdk.apiBaseURL + '\n' +
				'authBaseURL: ' + sdk.authBaseURL + '\n' +
				'redirect_uri: ' + sdk.redirectUri);
				sdk.authBaseURL = 'security-staging.cloud.appcelerator.com';
				sdk.apiBaseURL = 'api-staging.cloud.appcelerator.com';
				sdk.redirectUri = 'http://www.baidu.com';
				break;
			case 2:
//				alert('2222');
				sdk = new Cocoafish(arguments.key, arguments.secret);
				alert('Create Cocoafish with:' + '\n' +
				'appKey: ' + sdk.appKey + '\n' + 'oauthKey: ' + sdk.oauthKey + '\n' + 
				'secret: ' + sdk.oauthSecret + '\n' +
				'baseURL: ' + sdk.apiBaseURL + '\n' +
				'authBaseURL: ' + sdk.authBaseURL + '\n' +
				'redirect_uri: ' + sdk.redirectUri);
				sdk.authBaseURL = 'security-staging.cloud.appcelerator.com';
				sdk.apiBaseURL = 'api-staging.cloud.appcelerator.com';
				sdk.redirectUri = 'http://www.baidu.com';
				break;
			case 3:
				sdk = new Cocoafish(arguments.key, arguments.secret, arguments.baseURL);
				alert('Create Cocoafish with:' + '\n' +
				'appKey: ' + sdk.appKey + '\n' + 'oauthKey: ' + sdk.oauthKey + '\n' + 
				'secret: ' + sdk.oauthSecret + '\n' +
				'baseURL: ' + sdk.apiBaseURL + '\n' +
				'authBaseURL: ' + sdk.authBaseURL + '\n' +
				'redirect_uri: ' + sdk.redirectUri);
				sdk.authBaseURL = 'security-staging.cloud.appcelerator.com';
//				sdk.apiBaseURL = 'api-staging.cloud.appcelerator.com';
				sdk.redirectUri = 'http://www.baidu.com';
				break;
			case 4:
				sdk = new Cocoafish(arguments.key, arguments.secret, arguments.baseURL, arguments.authBaseURL);
				alert('Create Cocoafish with:' + '\n' +
				'appKey: ' + sdk.appKey + '\n' + 'oauthKey: ' + sdk.oauthKey + '\n' + 
				'secret: ' + sdk.oauthSecret + '\n' +
				'baseURL: ' + sdk.apiBaseURL + '\n' +
				'authBaseURL: ' + sdk.authBaseURL + '\n' +
				'redirect_uri: ' + sdk.redirectUri);
//				sdk.authBaseURL = 'security-staging.cloud.appcelerator.com';
//				sdk.apiBaseURL = 'api-staging.cloud.appcelerator.com';
				sdk.redirectUri = 'http://www.baidu.com';
				break;
			case 5:
				sdk = new Cocoafish(arguments.key, arguments.secret, arguments.baseURL, arguments.authBaseURL, arguments.redirect_uri);
				alert('Create Cocoafish with:' + '\n' +
				'appKey: ' + sdk.appKey + '\n' + 'oauthKey: ' + sdk.oauthKey + '\n' + 
				'secret: ' + sdk.oauthSecret + '\n' +
				'baseURL: ' + sdk.apiBaseURL + '\n' +
				'authBaseURL: ' + sdk.authBaseURL + '\n' +
				'redirect_uri: ' + sdk.redirectUri);
				break;
			default:
				break;
		}
		sdk.useThreeLegged(true);		
		sdk.sendAuthRequest();		
		//to call api
		alert('Call api...');
		sdk.sendRequest('users/show/me.json', 'GET', null, function(data){
			if (data) {
				if (data.meta) 
				{
					var meta = data.meta;
					if (meta.status == 'ok' && meta.code == 200) 
					{
						alert('API call is successful');
						return;
					}
					else 
					{
						alert('API call is failed\n' +
						'Status: ' +
						meta.status +
						'\n' +
						'Code: ' +
						meta.code);
						return;
					}
				}
				else 
				{
					alert('data.meta is ' + data.meta);
					return;
				}
			}
			else 
			{
				alert('data is ' + data);
				return;
			}
		});
		sdk.clearSession();
		count++;
	}
	alert('Test Done');
}

function testCreateCocoafish_Negative()
{
	var count = 1;
	for (i in arrCreateCocoafish_Negative)
	{
		arguments = arrCreateCocoafish_Negative[i];
		var message = '';
		for (i in arguments) 
		{
			switch (i) 
			{
				case 'key':
					message = message + 'key: ' + arguments[i] + '\n';
					break;
				case 'secret':
					message = message + 'secret: ' + arguments[i] + '\n';
					break;
				case 'baseURL':
					message = message + 'baseURL: ' + arguments[i] + '\n';
					break;
				case 'authBaseURL':
					message = message + 'authBaseURL: ' + arguments[i] + '\n';
					break;
				case 'redirect_uri':
					message = message + 'redirect_uri: ' + arguments[i] + '\n';
					break;
				default:
					message = message + 'None' + arguments[i] + '\n';
					break;
			}
		}
		alert('This is scenario #' + count + '\ninput is :\n' + message);
		switch (Object.keys(arguments).length)
		{
			case 0:
				sdk = new Cocoafish();
				alert('Create Cocoafish with:' + '\n' +
				'appKey: ' + sdk.appKey + '\n' + 'oauthKey: ' + sdk.oauthKey + '\n' + 
				'secret: ' + sdk.oauthSecret + '\n' +
				'baseURL: ' + sdk.apiBaseURL + '\n' +
				'authBaseURL: ' + sdk.authBaseURL + '\n' +
				'redirect_uri: ' + sdk.redirectUri);
				break;
			case 1:
				sdk = new Cocoafish(arguments.key);
				alert('Create Cocoafish with:' + '\n' +
				'appKey: ' + sdk.appKey + '\n' + 'oauthKey: ' + sdk.oauthKey + '\n' + 
				'secret: ' + sdk.oauthSecret + '\n' +
				'baseURL: ' + sdk.apiBaseURL + '\n' +
				'authBaseURL: ' + sdk.authBaseURL + '\n' +
				'redirect_uri: ' + sdk.redirectUri);
				sdk.authBaseURL = 'security-staging.cloud.appcelerator.com';
				sdk.apiBaseURL = 'api-staging.cloud.appcelerator.com';
				sdk.redirectUri = 'http://www.baidu.com';
				break;
			case 2:
				sdk = new Cocoafish(arguments.key, arguments.secret);
				alert('Create Cocoafish with:' + '\n' +
				'appKey: ' + sdk.appKey + '\n' + 'oauthKey: ' + sdk.oauthKey + '\n' + 
				'secret: ' + sdk.oauthSecret + '\n' +
				'baseURL: ' + sdk.apiBaseURL + '\n' +
				'authBaseURL: ' + sdk.authBaseURL + '\n' +
				'redirect_uri: ' + sdk.redirectUri);
				sdk.authBaseURL = 'security-staging.cloud.appcelerator.com';
				sdk.apiBaseURL = 'api-staging.cloud.appcelerator.com';
				sdk.redirectUri = 'http://www.baidu.com';
				break;
			case 3:
				sdk = new Cocoafish(arguments.key, arguments.secret, arguments.baseURL);
				alert('Create Cocoafish with:' + '\n' +
				'appKey: ' + sdk.appKey + '\n' + 'oauthKey: ' + sdk.oauthKey + '\n' + 
				'secret: ' + sdk.oauthSecret + '\n' +
				'baseURL: ' + sdk.apiBaseURL + '\n' +
				'authBaseURL: ' + sdk.authBaseURL + '\n' +
				'redirect_uri: ' + sdk.redirectUri);
				sdk.authBaseURL = 'security-staging.cloud.appcelerator.com';
//				sdk.apiBaseURL = 'api-staging.cloud.appcelerator.com';
				sdk.redirectUri = 'http://www.baidu.com';
				break;
			case 4:
				sdk = new Cocoafish(arguments.key, arguments.secret, arguments.baseURL, arguments.authBaseURL);
				alert('Create Cocoafish with:' + '\n' +
				'appKey: ' + sdk.appKey + '\n' + 'oauthKey: ' + sdk.oauthKey + '\n' + 
				'secret: ' + sdk.oauthSecret + '\n' +
				'baseURL: ' + sdk.apiBaseURL + '\n' +
				'authBaseURL: ' + sdk.authBaseURL + '\n' +
				'redirect_uri: ' + sdk.redirectUri);
//				sdk.authBaseURL = 'security-staging.cloud.appcelerator.com';
//				sdk.apiBaseURL = 'api-staging.cloud.appcelerator.com';
				sdk.redirectUri = 'http://www.baidu.com';
				break;
			case 5:
				sdk = new Cocoafish(arguments.key, arguments.secret, arguments.baseURL, arguments.authBaseURL, arguments.redirect_uri);
				alert('Create Cocoafish with:' + '\n' +
				'appKey: ' + sdk.appKey + '\n' + 'oauthKey: ' + sdk.oauthKey + '\n' + 
				'secret: ' + sdk.oauthSecret + '\n' +
				'baseURL: ' + sdk.apiBaseURL + '\n' +
				'authBaseURL: ' + sdk.authBaseURL + '\n' +
				'redirect_uri: ' + sdk.redirectUri);
				break;
			default:
				break;
		}
		sdk.useThreeLegged(true);		
		sdk.sendAuthRequest();		
		//to call api
		alert('Call api...');
		sdk.sendRequest('users/show/me.json', 'GET', null, function(data){
			if (data) {
				if (data.meta) 
				{
					var meta = data.meta;
					if (meta.status == 'ok' && meta.code == 200) 
					{
						alert('API call is successful');
						return;
					}
					else 
					{
						alert('API call is failed\n' +
						'Status: ' +
						meta.status +
						'\n' +
						'Code: ' +
						meta.code);
						return;
					}
				}
				else 
				{
					alert('data.meta is ' + data.meta);
					return;
				}
			}
			else 
			{
				alert('data is ' + data);
				return;
			}
		});
		sdk.clearSession();
		count++;
	}
	alert('Test Done!');
}

function testSignUpRequest_Positive()
{
	var count = 1;
	for (i in arrCallSignUpRequest_Positive)
	{
		arguments = arrCallSignUpRequest_Positive[i];
		var message = '';
		for (i in arguments) 
		{
			switch (i) 
			{
				case 'redirectUri':
					message = message + 'redirectUri: ' + arguments[i] + '\n';
					break;
				case 'useSecure':
					message = message + 'useSecure: ' + arguments[i] + '\n';
					break;
				case 'params':
					message = message + 'params: ' + arguments[i] + '\n';
					break;
				default:
					message = message + 'None' + arguments[i] + '\n';
					break;
			}
		}
		alert('This is scenario #' + count + '\ninput is :\n' + message);
		sdk = new Cocoafish(appID, appSecret, apiURL, oauthURL, redirectUri);
		sdk.useThreeLegged(true);		
		sdk.signUpRequest(arguments);		
		//to call api
		alert('Call api...');
		sdk.sendRequest('users/show/me.json', 'GET', null, function(data){
			if (data) {
				if (data.meta) 
				{
					var meta = data.meta;
					if (meta.status == 'ok' && meta.code == 200) 
					{
						alert('API call is successful');
						return;
					}
					else 
					{
						alert('API call is failed\n' +
						'Status: ' +
						meta.status +
						'\n' +
						'Code: ' +
						meta.code);
						return;
					}
				}
				else 
				{
					alert('data.meta is ' + data.meta);
					return;
				}
			}
			else 
			{
				alert('data is ' + data);
				return;
			}
		});
		sdk.clearSession();
		count++;
	}
	alert('Test Done!');
}

function testSignUpRequest_Negative()
{
	var count = 1;
	for (i in arrCallSignUpRequest_Negative)
	{
		arguments = arrCallSignUpRequest_Negative[i];
		var message = '';
		for (i in arguments) 
		{
			switch (i) 
			{
				case 'redirectUri':
					message = message + 'redirectUri: ' + arguments[i] + '\n';
					break;
				case 'useSecure':
					message = message + 'useSecure: ' + arguments[i] + '\n';
					break;
				case 'params':
					message = message + 'params: ' + arguments[i] + '\n';
					break;
				default:
					message = message + 'None' + arguments[i] + '\n';
					break;
			}
		}
		alert('This is scenario #' + count + '\ninput is :\n' + message);
		sdk = new Cocoafish(appID, appSecret, apiURL, oauthURL, redirectUri);
		sdk.useThreeLegged(true);		
		sdk.signUpRequest(arguments);		
		//to call api
		alert('Call api...');
		sdk.sendRequest('users/show/me.json', 'GET', null, function(data){
			if (data) {
				if (data.meta) 
				{
					var meta = data.meta;
					if (meta.status == 'ok' && meta.code == 200) 
					{
						alert('API call is successful');
						return;
					}
					else 
					{
						alert('API call is failed\n' +
						'Status: ' +
						meta.status +
						'\n' +
						'Code: ' +
						meta.code);
						return;
					}
				}
				else 
				{
					alert('data.meta is ' + data.meta);
					return;
				}
			}
			else 
			{
				alert('data is ' + data);
				return;
			}
		});
		sdk.clearSession();
		count++;
	}
	alert('Test Done!');
}

function testSendAuthRequest_Positive()
{
	var count = 1;
	for (i in arrCallSendAuthRequest_Positive)
	{
		arguments = arrCallSendAuthRequest_Positive[i];
		var message = '';
		for (i in arguments) 
		{
			switch (i) 
			{
				case 'redirectUri':
					message = message + 'redirectUri: ' + arguments[i] + '\n';
					break;
				case 'useSecure':
					message = message + 'useSecure: ' + arguments[i] + '\n';
					break;
				case 'params':
					message = message + 'params: ' + arguments[i] + '\n';
					break;
				default:
					message = message + 'None' + arguments[i] + '\n';
					break;
			}
		}
		alert('This is scenario #' + count + '\ninput is :\n' + message);
		sdk = new Cocoafish(appID, appSecret, apiURL, oauthURL, redirectUri);
		sdk.useThreeLegged(true);		
		sdk.sendAuthRequest(arguments);		
		//to call api
		alert('Call api...');
		sdk.sendRequest('users/show/me.json', 'GET', null, function(data){
			if (data) {
				if (data.meta) 
				{
					var meta = data.meta;
					if (meta.status == 'ok' && meta.code == 200) 
					{
						alert('API call is successful');
						return;
					}
					else 
					{
						alert('API call is failed\n' +
						'Status: ' +
						meta.status +
						'\n' +
						'Code: ' +
						meta.code);
						return;
					}
				}
				else 
				{
					alert('data.meta is ' + data.meta);
					return;
				}
			}
			else 
			{
				alert('data is ' + data);
				return;
			}
		});
		sdk.clearSession();
		count++;
	}
	alert('Test Done!');
}

function testSendAuthRequest_Negative()
{
	var count = 1;
	for (i in arrCallSendAuthRequest_Negative)
	{
		arguments = arrCallSendAuthRequest_Negative[i];
		var message = '';
		for (i in arguments) 
		{
			switch (i) 
			{
				case 'redirectUri':
					message = message + 'redirectUri: ' + arguments[i] + '\n';
					break;
				case 'useSecure':
					message = message + 'useSecure: ' + arguments[i] + '\n';
					break;
				case 'params':
					message = message + 'params: ' + arguments[i] + '\n';
					break;
				default:
					message = message + 'None' + arguments[i] + '\n';
					break;
			}
		}
		alert('This is scenario #' + count + '\ninput is :\n' + message);
		sdk = new Cocoafish(appID, appSecret, apiURL, oauthURL, redirectUri);
		sdk.useThreeLegged(true);		
		sdk.sendAuthRequest(arguments);		
		//to call api
		alert('Call api...');
		sdk.sendRequest('users/show/me.json', 'GET', null, function(data){
			if (data) {
				if (data.meta) 
				{
					var meta = data.meta;
					if (meta.status == 'ok' && meta.code == 200) 
					{
						alert('API call is successful');
						return;
					}
					else 
					{
						alert('API call is failed\n' +
						'Status: ' +
						meta.status +
						'\n' +
						'Code: ' +
						meta.code);
						return;
					}
				}
				else 
				{
					alert('data.meta is ' + data.meta);
					return;
				}
			}
			else 
			{
				alert('data is ' + data);
				return;
			}
		});
		sdk.clearSession();
		count++;
	}
	alert('Test Done!');
}

//function testInvalidateTokenRequest_Positive()
//{
//	var count = 1;
//	for (i in arrCallInvalidateTokenRequest_Positive)
//	{
//		arguments = arrCallInvalidateTokenRequest_Positive[i];
//		var message = '';
//		for (i in arguments) 
//		{
//			switch (i) 
//			{
//				case 'redirectUri':
//					message = message + 'redirectUri: ' + arguments[i] + '\n';
//					break;
//				case 'useSecure':
//					message = message + 'useSecure: ' + arguments[i] + '\n';
//					break;
//				case 'params':
//					message = message + 'params: ' + arguments[i] + '\n';
//					break;
//				default:
//					message = message + 'None' + arguments[i] + '\n';
//					break;
//			}
//		}
//		sdk = new Cocoafish(appID, appSecret, apiURL, oauthURL, redirectUri);
//		sdk.useThreeLegged(true);	
//		params = new Object();
//		params.display = 'popup';	
//		sdk.sendAuthRequest({params: params});
//		alert('This is scenario #' + count + '\ninput is :\n' + message);
//		sdk.invalidateTokenRequest(arguments);
//		//to call api
//		alert('Call api...');
//		sdk.sendRequest('users/show/me.json', 'GET', null, function(data){
//			if (data) {
//				if (data.meta) 
//				{
//					var meta = data.meta;
//					if (meta.status == 'ok' && meta.code == 200) 
//					{
//						alert('API call is successful');
//						return;
//					}
//					else 
//					{
//						alert('API call is failed\n' +
//						'Status: ' +
//						meta.status +
//						'\n' +
//						'Code: ' +
//						meta.code);
//						return;
//					}
//				}
//				else 
//				{
//					alert('data.meta is ' + data.meta);
//					return;
//				}
//			}
//			else 
//			{
//				alert('data is ' + data);
//				return;
//			}
//		});
//		sdk.clearSession();
//		count++;
//	}
//	alert('Test Done!');
//}

//function testInvalidateTokenRequest_Negative()
//{
//	var count = 1;
//	for (i in arrCallInvalidateTokenRequest_Negative)
//	{
//		arguments = arrCallInvalidateTokenRequest_Negative[i];
//		var message = '';
//		for (i in arguments) 
//		{
//			switch (i) 
//			{
//				case 'redirectUri':
//					message = message + 'redirectUri: ' + arguments[i] + '\n';
//					break;
//				case 'useSecure':
//					message = message + 'useSecure: ' + arguments[i] + '\n';
//					break;
//				case 'params':
//					message = message + 'params: ' + arguments[i] + '\n';
//					break;
//				default:
//					message = message + 'None' + arguments[i] + '\n';
//					break;
//			}
//		}
//		sdk = new Cocoafish(appID, appSecret, apiURL, oauthURL, redirectUri);
//		sdk.useThreeLegged(true);	
//		params = new Object();
//		params.display = 'popup';	
//		alert('sign in first');
//		sdk.sendAuthRequest({params: params});
//		alert('This is scenario #' + count + '\ninput is :\n' + message);
//		sdk.invalidateTokenRequest(arguments);
//		//to call api
//		alert('Call api...');
//		sdk.sendRequest('users/show/me.json', 'GET', null, function(data){
//			if (data) {
//				if (data.meta) 
//				{
//					var meta = data.meta;
//					if (meta.status == 'ok' && meta.code == 200) 
//					{
//						alert('API call is successful');
//						return;
//					}
//					else 
//					{
//						alert('API call is failed\n' +
//						'Status: ' +
//						meta.status +
//						'\n' +
//						'Code: ' +
//						meta.code);
//						return;
//					}
//				}
//				else 
//				{
//					alert('data.meta is ' + data.meta);
//					return;
//				}
//			}
//			else 
//			{
//				alert('data is ' + data);
//				return;
//			}
//		});
//		sdk.clearSession();
//		count++;
//	}
//	alert('Test Done!');
//}

function testCheckStatus()
{
	sdk = new Cocoafish(appID, appSecret, apiURL, oauthURL, redirectUri);
	sdk.useThreeLegged(true);
//	params = new Object();
//	params.display = 'popup';
	
	//notSignedUp
	alert('press to call "checkStatus"');
	alert("checkStatus called\n" + 
			'Actual: ' + sdk.checkStatus() + '\n' +
			'Expected: ' + 'false');
			
	//notSignedUp do sign in -->notSignedUp
	sdk.sendAuthRequest();
	alert('press to call "checkStatus"');
	alert("checkStatus called\n" + 
			'Actual: ' + sdk.checkStatus() + '\n' +
			'Expected: ' + 'false');
	
	//notSignedUp do sign out -->notSignedUp
//	sdk.invalidateTokenRequest({params:params});
	sdk.sendRequest('users/logout.json', 'GET', null, function(data){
		alert('new logout called');
		if (data) {
				if (data.meta) 
				{
					var meta = data.meta;
					if (meta.status == 'ok' && meta.code == 200) 
					{
						alert('API call is successful');
						return;
					}
					else 
					{
						alert('API call is failed\n' +
						'Status: ' +
						meta.status +
						'\n' +
						'Code: ' +
						meta.code);
						return;
					}
				}
				else 
				{
					alert('data.meta is ' + data.meta);
					return;
				}
		}
		else 
		{
			alert('data is ' + data);
			return;
		}
	});
	alert('press to call "checkStatus"');
	alert("checkStatus called\n" + 
			'Actual: ' + sdk.checkStatus() + '\n' +
			'Expected: ' + 'false');
			
	//notSignedUp do sign up -->SignedUp
	sdk.signUpRequest();
	alert('press to call "checkStatus"');
	alert("checkStatus called\n" + 
			'Actual: ' + sdk.checkStatus() + '\n' +
			'Expected: ' + 'true');
			
	//SignedUp do sign up -->SignedUp
	sdk.signUpRequest();
	alert('press to call "checkStatus"');
	alert("checkStatus called\n" + 
			'Actual: ' + sdk.checkStatus() + '\n' +
			'Expected: ' + 'true');	
			
	//SignedUp do sign out -->signedOutWithSignedUp
//	sdk.invalidateTokenRequest({params:params});
	sdk.sendRequest('users/logout.json', 'GET', null, function(data){
		alert('new logout called');
		if (data) {
				if (data.meta) 
				{
					var meta = data.meta;
					if (meta.status == 'ok' && meta.code == 200) 
					{
						alert('API call is successful');
						return;
					}
					else 
					{
						alert('API call is failed\n' +
						'Status: ' +
						meta.status +
						'\n' +
						'Code: ' +
						meta.code);
						return;
					}
				}
				else 
				{
					alert('data.meta is ' + data.meta);
					return;
				}
		}
		else 
		{
			alert('data is ' + data);
			return;
		}
	});
	alert('press to call "checkStatus"');
	alert("checkStatus called\n" + 
			'Actual: ' + sdk.checkStatus() + '\n' +
			'Expected: ' + 'false');
			
	//SignedUp do sign in -->signedIn
	sdk = new Cocoafish(appID, appSecret, apiURL, oauthURL, redirectUri);
	sdk.useThreeLegged(true);
	sdk.signUpRequest();
	alert('press to sign in');
	sdk.sendAuthRequest();
	alert('press to call "checkStatus"');
	alert("checkStatus called\n" + 
			'Actual: ' + sdk.checkStatus() + '\n' +
			'Expected: ' + 'true');
	
	//SignedIn do sign in -->SignedIn (new expiresIn & same accessToken)
	sdk.sendAuthRequest();
	alert('press to call "checkStatus"');
	alert("checkStatus called\n" + 
			'Actual: ' + sdk.checkStatus() + '\n' +
			'Expected: ' + 'true');
			
	//SignedIn do sign up -->SignedIn (same expiresIn & same accessToken)
	sdk.signUpRequest();
	alert('press to call "checkStatus"');
	alert("checkStatus called\n" + 
			'Actual: ' + sdk.checkStatus() + '\n' +
			'Expected: ' + 'true');
			
	//SignedIn do sign out -->SignedOutWithSignedIn
//	sdk.invalidateTokenRequest({params:params});
	sdk.sendRequest('users/logout.json', 'GET', null, function(data){
		alert('new logout called');
		if (data) {
				if (data.meta) 
				{
					var meta = data.meta;
					if (meta.status == 'ok' && meta.code == 200) 
					{
						alert('API call is successful');
						return;
					}
					else 
					{
						alert('API call is failed\n' +
						'Status: ' +
						meta.status +
						'\n' +
						'Code: ' +
						meta.code);
						return;
					}
				}
				else 
				{
					alert('data.meta is ' + data.meta);
					return;
				}
		}
		else 
		{
			alert('data is ' + data);
			return;
		}
	});
	alert('press to call "checkStatus"');
	alert("checkStatus called\n" + 
			'Actual: ' + sdk.checkStatus() + '\n' +
			'Expected: ' + 'false');
			
	//SignedOutWithSignedUp do sign in -->SignedIn (default expiresIn & new accessToken)
	sdk.sendAuthRequest();
	alert('press to call "checkStatus"');
	alert("checkStatus called\n" + 
			'Actual: ' + sdk.checkStatus() + '\n' +
			'Expected: ' + 'true');
//	sdk.invalidateTokenRequest({params:params});
	sdk.sendRequest('users/logout.json', 'GET', null, function(data){
		alert('new logout called');
		if (data) {
				if (data.meta) 
				{
					var meta = data.meta;
					if (meta.status == 'ok' && meta.code == 200) 
					{
						alert('API call is successful');
						return;
					}
					else 
					{
						alert('API call is failed\n' +
						'Status: ' +
						meta.status +
						'\n' +
						'Code: ' +
						meta.code);
						return;
					}
				}
				else 
				{
					alert('data.meta is ' + data.meta);
					return;
				}
		}
		else 
		{
			alert('data is ' + data);
			return;
		}
	});
			
	//SignedOutWithSignedUp do sign up -->SignedOutWithSignedUp
	alert('press to sign up');
	sdk.signUpRequest();
	alert('press to call "checkStatus"');
	alert("checkStatus called\n" + 
			'Actual: ' + sdk.checkStatus() + '\n' +
			'Expected: ' + 'false');
			
	//SignedOutWithSignedUp do sign out -->SignedOutWithSignedUp
//	sdk.invalidateTokenRequest({params:params});
	sdk.sendRequest('users/logout.json', 'GET', null, function(data){
		alert('new logout called');
		if (data) {
				if (data.meta) 
				{
					var meta = data.meta;
					if (meta.status == 'ok' && meta.code == 200) 
					{
						alert('API call is successful');
						return;
					}
					else 
					{
						alert('API call is failed\n' +
						'Status: ' +
						meta.status +
						'\n' +
						'Code: ' +
						meta.code);
						return;
					}
				}
				else 
				{
					alert('data.meta is ' + data.meta);
					return;
				}
		}
		else 
		{
			alert('data is ' + data);
			return;
		}
	});
	alert('press to call "checkStatus"');
	alert("checkStatus called\n" + 
			'Actual: ' + sdk.checkStatus() + '\n' +
			'Expected: ' + 'false');
	
	alert('Test Done!');
}

function testGetSession()
{
	sdk = new Cocoafish(appID, appSecret, apiURL, oauthURL, redirectUri);
	sdk.useThreeLegged(true);
	params = new Object();
	params.display = 'popup';
	
	//notSignedUp
	alert('press to call "getSession"');
	alert("getSession called\n" + 
			'Actual: ' + sdk.getSession() + '\n' +
			'Expected: ' + 'false');
			
	//notSignedUp do sign in -->notSignedUp
	sdk.sendAuthRequest({params:params});
	alert('press to call "getSession"');
	alert("getSession called\n" + 
			'Actual: ' + sdk.getSession() + '\n' +
			'Expected: ' + 'false');
	
	//notSignedUp do sign out -->notSignedUp
//	sdk.invalidateTokenRequest({params:params});
	sdk.sendRequest('users/logout.json', 'GET', null, function(data){
		alert('new logout called');
		if (data) {
				if (data.meta) 
				{
					var meta = data.meta;
					if (meta.status == 'ok' && meta.code == 200) 
					{
                    	sdk.clearSession();
						alert('log out successful');
						return;
					}
					else 
					{
						alert('log out failed\n' +
						'Status: ' +
						meta.status +
						'\n' +
						'Code: ' +
						meta.code);
						return;
					}
				}
				else 
				{
					alert('log out failed \ndata.meta is ' + data.meta);
					return;
				}
		}
		else 
		{
			alert('log out failed \ndata is ' + data);
			return;
		}
	});
	alert('press to call "getSession"');
	alert("getSession called\n" + 
			'Actual: ' + sdk.getSession() + '\n' +
			'Expected: ' + 'false');
			
	//notSignedUp do sign up -->SignedUp
	sdk.signUpRequest({params:params});
	alert('press to call "getSession"');
	data = sdk.getSession();
	alert("getSession called\n" + 
			'Actual: ' + data + '\n' +
			'data.access_token: ' + data.access_token + '\n' +
			'data.expires_in: ' + data.expires_in + '\n' +
			'sdk.accessToken: ' + sdk.accessToken + '\n' +
			'sdk.expiresIn: ' + sdk.expiresIn + '\n' +
			'sdk.authorized: ' + sdk.authorized + '\n' +
			'Expected: ' + 'true' + '\n' +
			'data.access_token: ' + 'new token' + '\n' +
			'data.expires_in: ' + '600' + '\n' +
			'sdk.accessToken: ' + 'new token' + '\n' +
			'sdk.expiresIn: ' + '600' + '\n' +
			'sdk.authorized: ' + 'true');
			
	//SignedUp do sign up -->SignedUp
	sdk.signUpRequest({params:params});
	alert('press to call "getSession"');
	data = sdk.getSession();
	alert("getSession called\n" + 
			'Actual: ' + data + '\n' +
			'data.access_token: ' + data.access_token + '\n' +
			'data.expires_in: ' + data.expires_in + '\n' +
			'sdk.accessToken: ' + sdk.accessToken + '\n' +
			'sdk.expiresIn: ' + sdk.expiresIn + '\n' +
			'sdk.authorized: ' + sdk.authorized + '\n' +
			'Expected: ' + 'true' + '\n' +
			'data.access_token: ' + 'new token' + '\n' +
			'data.expires_in: ' + '600' + '\n' +
			'sdk.accessToken: ' + 'new token' + '\n' +
			'sdk.expiresIn: ' + '600' + '\n' +
			'sdk.authorized: ' + 'true');	
			
	//SignedUp do sign out -->signedOutWithSignedUp
//	sdk.invalidateTokenRequest({params:params});
	sdk.sendRequest('users/logout.json', 'GET', null, function(data){
		alert('new logout called');
		if (data) {
				if (data.meta) 
				{
					var meta = data.meta;
					if (meta.status == 'ok' && meta.code == 200) 
					{
                    	sdk.clearSession();
						alert('log out successful');
						return;
					}
					else 
					{
						alert('log out failed\n' +
						'Status: ' +
						meta.status +
						'\n' +
						'Code: ' +
						meta.code);
						return;
					}
				}
				else 
				{
					alert('log out failed \ndata.meta is ' + data.meta);
					return;
				}
		}
		else 
		{
			alert('log out failed \ndata is ' + data);
			return;
		}
	});
	alert('press to call "getSession"');
	alert("getSession called\n" + 
			'Actual: ' + sdk.getSession() + '\n' +
			'Expected: ' + 'false');
			
	//SignedUp do sign in -->signedIn
	sdk = new Cocoafish(appID, appSecret, apiURL, oauthURL, redirectUri);
	sdk.useThreeLegged(true);
	sdk.signUpRequest({params:params});
	alert('press to sign in');
	sdk.sendAuthRequest({params:params});
	alert('press to call "getSession"');
	data = sdk.getSession();
	alert("getSession called\n" + 
			'Actual: ' + data + '\n' +
			'data.access_token: ' + data.access_token + '\n' +
			'data.expires_in: ' + data.expires_in + '\n' +
			'sdk.accessToken: ' + sdk.accessToken + '\n' +
			'sdk.expiresIn: ' + sdk.expiresIn + '\n' +
			'sdk.authorized: ' + sdk.authorized + '\n' +
			'Expected: ' + 'true' + '\n' +
			'data.access_token: ' + 'new token' + '\n' +
			'data.expires_in: ' + '<600' + '\n' +
			'sdk.accessToken: ' + 'new token' + '\n' +
			'sdk.expiresIn: ' + '<600' + '\n' +
			'sdk.authorized: ' + 'true');
	
	//SignedIn do sign in -->SignedIn (new expiresIn & same accessToken)
	sdk.sendAuthRequest({params:params});
	alert('press to call "getSession"');
	data = sdk.getSession();
	alert("getSession called\n" + 
			'Actual: ' + data + '\n' +
			'data.access_token: ' + data.access_token + '\n' +
			'data.expires_in: ' + data.expires_in + '\n' +
			'sdk.accessToken: ' + sdk.accessToken + '\n' +
			'sdk.expiresIn: ' + sdk.expiresIn + '\n' +
			'sdk.authorized: ' + sdk.authorized + '\n' +
			'Expected: ' + 'true' + '\n' +
			'data.access_token: ' + 'same token' + '\n' +
			'data.expires_in: ' + '< 600' + '\n' +
			'sdk.accessToken: ' + 'same token' + '\n' +
			'sdk.expiresIn: ' + '< 600' + '\n' +
			'sdk.authorized: ' + 'true');
			
	//SignedIn do sign up -->SignedIn (same expiresIn & same accessToken)
	sdk.signUpRequest({params:params});
	alert('press to call "getSession"');
	data = sdk.getSession();
	alert("getSession called\n" + 
			'Actual: ' + data + '\n' +
			'data.access_token: ' + data.access_token + '\n' +
			'data.expires_in: ' + data.expires_in + '\n' +
			'sdk.accessToken: ' + sdk.accessToken + '\n' +
			'sdk.expiresIn: ' + sdk.expiresIn + '\n' +
			'sdk.authorized: ' + sdk.authorized + '\n' +
			'Expected: ' + 'true' + '\n' +
			'data.access_token: ' + 'same token' + '\n' +
			'data.expires_in: ' + '< 600' + '\n' +
			'sdk.accessToken: ' + 'same token' + '\n' +
			'sdk.expiresIn: ' + '< 600' + '\n' +
			'sdk.authorized: ' + 'true');
			
	//SignedIn do sign out -->SignedOutWithSignedIn
//	sdk.invalidateTokenRequest({params:params});
	sdk.sendRequest('users/logout.json', 'GET', null, function(data){
		alert('new logout called');
		if (data) {
				if (data.meta) 
				{
					var meta = data.meta;
					if (meta.status == 'ok' && meta.code == 200) 
					{
                    	sdk.clearSession();
						alert('log out successful');
						return;
					}
					else 
					{
						alert('log out failed\n' +
						'Status: ' +
						meta.status +
						'\n' +
						'Code: ' +
						meta.code);
						return;
					}
				}
				else 
				{
					alert('log out failed \ndata.meta is ' + data.meta);
					return;
				}
		}
		else 
		{
			alert('log out failed \ndata is ' + data);
			return;
		}
	});
	alert('press to call "getSession"');
	alert("getSession called\n" + 
			'Actual: ' + sdk.getSession() + '\n' +
			'Expected: ' + 'false');
			
	//SignedOutWithSignedUp do sign in -->SignedIn (default expiresIn & new accessToken)
	sdk.sendAuthRequest({params:params});
	alert('press to call "getSession"');
	data = sdk.getSession();
	alert("getSession called\n" + 
			'Actual: ' + data + '\n' +
			'data.access_token: ' + data.access_token + '\n' +
			'data.expires_in: ' + data.expires_in + '\n' +
			'sdk.accessToken: ' + sdk.accessToken + '\n' +
			'sdk.expiresIn: ' + sdk.expiresIn + '\n' +
			'sdk.authorized: ' + sdk.authorized + '\n' +
			'Expected: ' + 'true' + '\n' +
			'data.access_token: ' + 'new token' + '\n' +
			'data.expires_in: ' + '600' + '\n' +
			'sdk.accessToken: ' + 'new token' + '\n' +
			'sdk.expiresIn: ' + '600' + '\n' +
			'sdk.authorized: ' + 'true');
//	sdk.invalidateTokenRequest({params:params});
	sdk.sendRequest('users/logout.json', 'GET', null, function(data){
		alert('new logout called');
		if (data) {
				if (data.meta) 
				{
					var meta = data.meta;
					if (meta.status == 'ok' && meta.code == 200) 
					{
                    	sdk.clearSession();
						alert('log out successful');
						return;
					}
					else 
					{
						alert('log out failed\n' +
						'Status: ' +
						meta.status +
						'\n' +
						'Code: ' +
						meta.code);
						return;
					}
				}
				else 
				{
					alert('log out failed \ndata.meta is ' + data.meta);
					return;
				}
		}
		else 
		{
			alert('log out failed \ndata is ' + data);
			return;
		}
	});
			
	//SignedOutWithSignedUp do sign up -->SignedOutWithSignedUp
	alert('press to sign up');
	sdk.signUpRequest({params:params});
	alert('press to call "getSession"');
	alert("getSession called\n" + 
			'Actual: ' + sdk.getSession() + '\n' +
			'Expected: ' + 'false');
			
	//SignedOutWithSignedUp do sign out -->SignedOutWithSignedUp
//	sdk.invalidateTokenRequest({params:params});
	sdk.sendRequest('users/logout.json', 'GET', null, function(data){
		alert('new logout called');
		if (data) {
				if (data.meta) 
				{
					var meta = data.meta;
					if (meta.status == 'ok' && meta.code == 200) 
					{
                    	sdk.clearSession();
						alert('log out successful');
						return;
					}
					else 
					{
						alert('log out failed\n' +
						'Status: ' +
						meta.status +
						'\n' +
						'Code: ' +
						meta.code);
						return;
					}
				}
				else 
				{
					alert('log out failed \ndata.meta is ' + data.meta);
					return;
				}
		}
		else 
		{
			alert('log out failed \ndata is ' + data);
			return;
		}
	});
	alert('press to call "getSession"');
	alert("getSession called\n" + 
			'Actual: ' + sdk.getSession() + '\n' +
			'Expected: ' + 'false');
	
	alert('Test Done!');
}

function testClearSessionAndSaveSession()
{
	sdk = new Cocoafish(appID, appSecret, apiURL, oauthURL, redirectUri);
	sdk.useThreeLegged(true);
	params = new Object();
	params.display = 'popup';
	
	sdk.sendAuthRequest({params: params});
	alert('press to call saveSession');
	data = sdk.getSession();
	sdk.saveSession(data);
	alert("saveSession called\n" + 
			'Actual: ' + data + '\n' +
			'data.access_token: ' + data.access_token + '\n' +
			'data.expires_in: ' + data.expires_in + '\n' +
			'sdk.accessToken: ' + sdk.accessToken + '\n' +
			'sdk.expiresIn: ' + sdk.expiresIn + '\n' +
			'sdk.authorized: ' + sdk.authorized + '\n' +
			'Expected: ' + 'true' + '\n' +
			'data.access_token: ' + 'new token' + '\n' +
			'data.expires_in: ' + '600' + '\n' +
			'sdk.accessToken: ' + 'new token' + '\n' +
			'sdk.expiresIn: ' + '600' + '\n' +
			'sdk.authorized: ' + 'true');
	
	sdk.clearSession();
	alert("clearSession called\n" + 
			'Actual: \n' +
//			'data.access_token: ' + data.access_token + '\n' +
//			'data.expires_in: ' + data.expires_in + '\n' +
			'sdk.accessToken: ' + sdk.accessToken + '\n' +
			'sdk.expiresIn: ' + sdk.expiresIn + '\n' +
			'sdk.authorized: ' + sdk.authorized + '\n' +
			'Expected: \n' +
//			'data.access_token: ' + 'new token' + '\n' +
//			'data.expires_in: ' + '600' + '\n' +
			'sdk.accessToken: ' + 'undefined' + '\n' +
			'sdk.expiresIn: ' + 'undefined' + '\n' +
			'sdk.authorized: ' + 'false');
			
	result = sdk.getSession();
	sdk.saveSession(result);
	alert("saveSession called\n" + 
			'Actual: ' + result + '\n' +
			'result.access_token: ' + result.access_token + '\n' +
			'result.expires_in: ' + result.expires_in + '\n' +
			'sdk.accessToken: ' + sdk.accessToken + '\n' +
			'sdk.expiresIn: ' + sdk.expiresIn + '\n' +
			'sdk.authorized: ' + sdk.authorized + '\n' +
			'Expected: ' + 'true' + '\n' +
			'result.access_token: ' + 'undefined' + '\n' +
			'result.expires_in: ' + 'undefined' + '\n' +
			'sdk.accessToken: ' + 'undefined' + '\n' +
			'sdk.expiresIn: ' + 'undefined' + '\n' +
			'sdk.authorized: ' + 'false');
	alert('test done');
}

function testSaveSession_Negative()
{
	var count = 1;
	params = new Object();
	params.display = 'popup';
	sdk = new Cocoafish(appID, appSecret, apiURL, oauthURL, redirectUri);
	sdk.useThreeLegged(true);		
	sdk.sendAuthRequest({params:params});
	for (i in arrCallSaveSession_Negative)
	{
		arguments = arrCallSaveSession_Negative[i];
		var message = arguments;			
		alert('This is scenario #' + count + '\ninput is :\n' + message);
		sdk.saveSession(arguments);
		count++;
	}
	alert('Test Done!');
}



function testSdkProperty()
{
	var arr = new Array('',
					null,
					undefined,
					{});
	
	var params = {};
	params.cb = function(data) {
		alert('cb: ' + data[cb] + '\n' +
				'token: ' + data[access_token] + '\n' +
				'ex: ' + data[expires_in]);
	}				
	var sdk = new Cocoafish(appID, appSecret, apiURL, oauthURL, redirectUri);
	sdk.useThreeLegged(true);
//	for (var i = 0; i < arr.length; i++)
//	{	alert('press to sign up with oauthKey: ' + arr[i]);
//		sdk.oauthKey = arr[i];
//		sdk.signUpRequest({params: params});
//		alert('press to sign in');
//		sdk.sendAuthRequest({params: params});
//		alert('press to sign out');
//		verify(sdk);
//		sdk.invalidateTokenRequest({params: params});
//	};
	var sdk = new Cocoafish(appID, appSecret, apiURL, oauthURL, redirectUri);
	sdk.useThreeLegged(true);
	for (var i = 0; i < arr.length; i++)
	{	alert('press to sign up with oauthSecret: ' + arr[i]);
		sdk.oauthSecret = arr[i];
		sdk.signUpRequest({params: params});
		alert('press to sign in');
		sdk.sendAuthRequest({params: params});
		alert('press to sign out');
		verify(sdk);
		sdk.invalidateTokenRequest({params: params});
	};
	var sdk = new Cocoafish(appID, appSecret, apiURL, oauthURL, redirectUri);
	sdk.useThreeLegged(true);
	for (var i = 0; i < arr.length; i++)
	{	alert('press to sign up with apiBaseURL: ' + arr[i]);
		sdk.apiBaseURL = arr[i];
		sdk.signUpRequest({params: params});
		alert('press to sign in');
		sdk.sendAuthRequest({params: params});
		alert('press to sign out');
		verify(sdk);
		sdk.invalidateTokenRequest({params: params});
	};
	var sdk = new Cocoafish(appID, appSecret, apiURL, oauthURL, redirectUri);
	sdk.useThreeLegged(true);
	for (var i = 0; i < arr.length; i++)
	{	alert('press to sign up with authBaseURL: ' + arr[i]);
		sdk.authBaseURL = arr[i];
		sdk.signUpRequest({params: params});
		alert('press to sign in');
		sdk.sendAuthRequest({params: params});
		alert('press to sign out');
		verify(sdk);
		sdk.invalidateTokenRequest({params: params});
	};
	var sdk = new Cocoafish(appID, appSecret, apiURL, oauthURL, redirectUri);
	sdk.useThreeLegged(true);
	for (var i = 0; i < arr.length; i++)
	{	alert('press to sign up with redirectUri: ' + arr[i]);
		sdk.redirectUri = arr[i];
		sdk.signUpRequest({params: params});
		alert('press to sign in');
		sdk.sendAuthRequest({params: params});
		alert('press to sign out');
		verify(sdk);
		sdk.invalidateTokenRequest({params: params});
	};
	
	alert('Test Done');
}
