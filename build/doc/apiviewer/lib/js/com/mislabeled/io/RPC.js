Namespace("com.mislabeled.io");

/**
 * Creates a new instance of RPC
 * @class Parses JSON and attaches a callback method per each method in the JSON file
 * @param {String} smd The path of the smd file to be loaded
 * @author Scott Thundercloud
 * @constructor
 *
 */
com.mislabeled.io.RPC = Class.create();
com.mislabeled.io.RPC.prototype.initialize = function(smd)
{
	this.newFuncs = [];
	this.smd = smd;
	this.fetchSMD();

}

com.mislabeled.io.RPC.prototype.parseSMD = function(handler)
{
	var handler = handler;
	var response = eval("(" + handler.responseText + ")");

	for(method in response.methods)
	{
		var aMethod = response.methods[method];
		var obj = {};
		obj.methodName = aMethod.name;
		obj.method = this.attachSMDMethod(aMethod.name, aMethod.parameters, response);
		this.newFuncs.push(obj);
	}
}

com.mislabeled.io.RPC.prototype.fetchSMD = function()
{
	var smd = new com.mislabeled.io.Http({
		url: this.smd,
		method: "POST",
		async: false,
		contentType: "text/json",
		loaded: this.parseSMD.bind(this)
	});
	return smd.handler;
}

com.mislabeled.io.RPC.prototype.attachSMDMethod = function(name, parameters, requestObj)
{
	return function()
	{
		var args = arguments;
		if(args.length < parameters.length) return false;


		var obj = {};
		obj.parameters = [];
		for(var i=0; i < parameters.length; i++)
		{
			obj.parameters.push(args[i]);
		}
		obj.method = name;

		this.callback = function(method)
		{
			var send = new com.mislabeled.io.Http({
				url: requestObj.serviceURL,
				method: "POST",
				async: true,
				contentType: "application/x-www-form-urlencoded",
				sendData: obj,
				loaded: method
			});
		};
		return this;
	};
}

com.mislabeled.io.RPC.prototype.runMethod = function(handler)
{

}