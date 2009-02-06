Import('com.sjl.io.Http');

Namespace("com.sjl.io");

/**
 * Creates a new instance of RPC
 * @class Provides a mechanism to make calls against the mislabeled REST API
 * @author Danny Graham
 * @constructor
 */
com.sjl.io.RPC = Class.create();
com.sjl.io.RPC.inherits("com.sjl.EventDispatcher");
com.sjl.io.RPC.prototype.initialize = function()
{
	var AuthToken = null;
	var AuthUserID = null;

	var CreateAuthRequest = function()
	{
		var AuthString = 'A';
		AuthString +='ut';
		AuthString +='hT';
		AuthString +='oke';
		AuthString +='n';
		return AuthString;
	}

	var ParseParameterExpression = function(oParameters)
	{
		var QueryString = '';
		for(var i in oParameters)
		{
			if(oParameters.hasOwnProperty(i))
			{
				QueryString += '&'+i+'='+oParameters[i];
			}
		}
		return QueryString;
	}

	this.Call = function(strMethodName,oParameters,strMethod)
	{
		if (!strMethod) strMethod = 'GET';
		var RESTROOT = '/api/rest/';

		var Callback = function(evt)
		{
			this.dispatch({
				type: 'onLoad',
				method: strMethodName,
				xhr: evt
			});
		}

		if (strMethod != 'POST')
		{
			var APIREQUEST = RESTROOT + '?';
//			APIREQUEST += CreateAuthRequest + '=' + AuthToken;
//			APIREQUEST += '&MethodName=' + strMethodName;
			APIREQUEST += 'MethodName=' + strMethodName;
			if (oParameters) APIREQUEST += ParseParameterExpression(oParameters);

			var Request = {
				method: strMethod,
				url: APIREQUEST,
				loaded: Callback.bind(this)
			}
		}
		else
		{
			var APIREQUEST = RESTROOT;

			var PAYLOAD = 'MethodName=' + strMethodName;
			if (oParameters) PAYLOAD += ParseParameterExpression(oParameters);

			var HEADERS = {
				"Content-Type": "application/x-www-form-urlencoded"
			}

			var Request = {
				method: strMethod,
				url: APIREQUEST,
				headers: HEADERS,
				payload: PAYLOAD,
				loaded: Callback.bind(this)
			}
		}


		var xhr = new com.sjl.io.Http(Request);
	}
}