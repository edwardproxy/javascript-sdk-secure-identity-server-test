var appID = 'PwlZOBLGdZ0SxTohTf51mGwrrLivN5CI';
var appSecret = 'cqSreePIH9pMW37MAFO5epKIqz46oWWD'
var apiURL = 'api-staging.cloud.appcelerator.com';
var oauthURL = 'security-staging.cloud.appcelerator.com';
var redirectUri = 'http://192.168.1.102/cocoafish-javascript-sdk-demo/test/testIE.html';
//var redirectUri = 'http://www.baidu.com' 
params = {};
//params.display = 'iframe';
//params.size = {};
//params.size.width = 800;
//params.size.height = 300;
params.cb = function(data){
//	alert('cb');
//	for(i in data)
//	{
//		alert(i);
//	}
	alert(data.access_token + '\n-->' + data.expires_in);
}

//sdk = new Cocoafish(appID);
//sdk = new Cocoafish(appID, appSecret);
//sdk = new Cocoafish(appID, appSecret, apiURL);
//sdk = new Cocoafish(appID, appSecret, oauthURL);
//sdk = new Cocoafish(appID, appSecret, oauthURL, redirectUri);
sdk = new Cocoafish(appID, appSecret, apiURL, oauthURL, redirectUri);

//sdk.authBaseURL = 'security-staging.cloud.appcelerator.com';
//sdk.apiBaseURL = 'api-staging.cloud.appcelerator.com';
//sdk.redirectUri = redirectUri;

sdk.useThreeLegged(true);

function callApi()
{
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
		}, false);
}

function create(){
//	sdk = new Cocoafish(appID);
//	sdk = new Cocoafish(appID, appSecret);
//	sdk = new Cocoafish(appID, appSecret, apiURL);
//	sdk = new Cocoafish(appID, appSecret, oauthURL);
	sdk = new Cocoafish(appID, appSecret, apiURL, oauthURL, redirectUri);
	
//	sdk.authBaseURL = 'security-staging.cloud.appcelerator.com';
//	sdk.apiBaseURL = 'api-staging.cloud.appcelerator.com';
//	sdk.redirectUri = redirectUri;
	
	sdk.useThreeLegged(true);
	
	alert('done');
}

function signUp()
{	
//	sdk.signUpRequest();
	sdk.signUpRequest(
						{
							params: params, 
							redirectUri: redirectUri, 
							useSecure: false
						}
						);
//	sdk.signUpRequest({useSecure: true});
//	sdk.signUpRequest({params: params});
}

function signIn()
{
	sdk.sendAuthRequest();
//	sdk.sendAuthRequest(
//						{
//							params: params, 
//							redirectUri: redirectUri, 
//							useSecure: true
//						}
//						);
//	sdk.sendAuthRequest({redirectUri: redirectUri});
//	sdk.sendAuthRequest({useSecure: true});
//	sdk.sendAuthRequest({params: params});
}

function signOut()
{
	sdk.sendRequest('users/logout.json', 'GET', null, function(data){
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
	},false);
}

function clear()
{
	sdk.clearSession();
}

function show()
{
	var bAu = sdk.authorized;
	var data = sdk.getSession();
	var bS = sdk.saveSession(data);
	var to = sdk.accessToken;
	var ex = sdk.expiresIn
	
	alert(
//			'sta: ' + sta + '\n'
			+'bAu: ' + bAu + '\n'
			+'data: ' + data + '\n'
			+'bS: ' + bS + '\n'
			+'to: ' + to + '\n'
			+'ex: ' + ex + '\n'
			);
}

function check()
{
	var sta = sdk.checkStatus();
}
