Namespace("com.mislabeled.io");

/**
 * Implements dependency and resource loading
 *
 * @class This class manages the loading of dependencies and resources.
 * It also creates a wrapper replacement for Ajile's Import and Load methods
 * and makes available the queue of resources currently being loaded.
 *
 * @constructor
 * @author Danny Graham
 */

com.mislabeled.io.ResourceLoader = Class.create();
com.mislabeled.io.ResourceLoader.inherits("com.mislabeled.EventDispatcher");

com.mislabeled.io.ResourceLoader.prototype.initialize = function()
{
	this.Queue = [];
	this.Loaded = ['com.mislabeled.EventDispatcher',
					'com.mislabeled.application.Environment',
					'com.mislabeled.TearDown',
					'com.mislabeled.DOMEventDispatcher',
					'com.mislabeled.io.ResourceLoader'];

	if (!window.onReady) window.onReady = function() { alert('No Entry Point Defined')};

	this._onLoad = function()
	{
		if (!arguments[0] || arguments[0] == "") return;

		var p = arguments[0];

		for(var i=0; i<this.Queue.length; i++) if (this.Queue[i] == p) this.Queue.splice(i,1);

		this.Loaded.push(p);

		this.dispatch({
			type: "onload",
			resource: p
		});

		if (this.Queue.length <= 0)
		{
			this.dispatch({
				type: "oncomplete"
			})
		}
	}

	var lObj = this._onLoad.bind(this);
	Ajile.AddImportListener(lObj);
}

com.mislabeled.io.ResourceLoader.prototype.IsLoaded = function(p)
{
//	if (window.ie) return true;
	if (this.Loaded.indexOf(p) >= 0) return true;
	return false;
}

com.mislabeled.io.ResourceLoader.prototype.IsQueued = function(p)
{
	if (this.Queue.indexOf(p) >= 0) return true;
	return false;
}

com.mislabeled.io.ResourceLoader.prototype.Import = function(p)
{
	if (this.Loaded.indexOf(p) >= 0) return;
	if (this.Queue.indexOf(p) >= 0) return;

	this.Queue.push(p);

	var libpath=(window.DocRoot)?DocRoot+"lib/js":"lib/js";
	this._import(p,p,libpath,"/");
}

com.mislabeled.io.ResourceLoader.__instance = null;
com.mislabeled.io.ResourceLoader.GetInstance = function()
{
	if (!this.__instance) this.__instance = new com.mislabeled.io.ResourceLoader();
	return this.__instance;
}

com.mislabeled.io.ResourceLoader.prototype._import = ImportAs;

Import = com.mislabeled.io.ResourceLoader.GetInstance().Import.bind(com.mislabeled.io.ResourceLoader.GetInstance());

window.onload = function() {
	//alert('Calling OnReady: '+typeof window.onReady);
	window.onReady();
};
//window.onReady();