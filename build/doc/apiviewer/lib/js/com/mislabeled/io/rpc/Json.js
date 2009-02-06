Namespace("com.mislabeled.io.data");

/**
 * Attaches the methods from com.mislabeled.io.RPC to this
 * @author Scott Thundercloud
 * @class JSON Class
 */
com.mislabeled.io.data.Json = Class.create();

com.mislabeled.io.data.Json.prototype.initialize = function(smd)
{
	var rpc = new com.mislabeled.io.Http.RPC(smd);
	this.createMethods(rpc.newFuncs);
}

com.mislabeled.io.data.Json.prototype.createMethods = function(newFuncs)
{
	for(var i=0; i < newFuncs.length; i++)
	{
		var methodName = newFuncs[i].methodName;
		var method = newFuncs[i].method;
		this[methodName] = method;
	}
}

com.mislabeled.io.data.Json.prototype.runMethod = function()
{
	return null;
}