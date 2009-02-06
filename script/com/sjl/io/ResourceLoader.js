Namespace("com.sjl.io");

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

com.sjl.io.ResourceLoader = Class.create();
com.sjl.io.ResourceLoader.inherits("com.sjl.EventDispatcher");

com.sjl.io.ResourceLoader.prototype.initialize = function()
{
	this.BasePath = 'lib/js';
	this.Queue = [];
	this.Loaded = ['com.sjl.EventDispatcher',
					'com.sjl.application.Environment',
					'com.sjl.TearDown',
					'com.sjl.DOMEventDispatcher',
					'com.sjl.io.ResourceLoader'];

	if (!window.onReady) window.onReady = function() { if (console && console.info) console.info('No entry point set.'); };

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
};

com.sjl.io.ResourceLoader.prototype.SetPath = function(p)
{
	this.BasePath = p;
};

com.sjl.io.ResourceLoader.prototype.IsLoaded = function(p)
{
	if (this.Loaded.indexOf(p) >= 0) return true;
	return false;
};

com.sjl.io.ResourceLoader.prototype.IsQueued = function(p)
{
	if (this.Queue.indexOf(p) >= 0) return true;
	return false;
};

com.sjl.io.ResourceLoader.prototype.Import = function(p)
{
	if (this.Loaded.indexOf(p) >= 0) return;
	if (this.Queue.indexOf(p) >= 0) return;

	this.Queue.push(p);

	var libpath = (window.DocRoot) ? window.DocRoot + this.BasePath : this.BasePath;
	this._import(p,p,libpath,"/");
};

com.sjl.io.ResourceLoader.__instance = null;
com.sjl.io.ResourceLoader.GetInstance = function()
{
	if (!this.__instance) this.__instance = new com.sjl.io.ResourceLoader();
	return this.__instance;
};

com.sjl.io.ResourceLoader.prototype._import = ImportAs;

Import = com.sjl.io.ResourceLoader.GetInstance().Import.bind(com.sjl.io.ResourceLoader.GetInstance());

window.onload = function() {
	window.onReady();
};
