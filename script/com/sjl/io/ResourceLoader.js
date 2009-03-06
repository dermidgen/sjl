/**
 * Standard JavaScript Library
 *
 * LICENSE
 *
 * This source file is subject to the sjl Public License license that
 * is bundled with this package in the file LICENSE.txt.
 *
 * @license http://www.opensource.org/licenses/bsd-license.php New BSD License
 * @copyright Copyright (c) 2008, Danny Graham, Scott Thundercloud
 */

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

	this.__import = window.Import;
	
	this._onLoad = function()
	{
		if ((!arguments[0] || arguments[0] == "") || this.IsLoaded(arguments[0])) return;
		
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
	var io = com.sjl.io.ResourceLoader.GetInstance();
	if (arguments.length > 1) 
	{
		io.__import.apply(window,arguments);
		return;
	}
	
	if (io.Loaded.indexOf(p) >= 0) return;
	if (io.Queue.indexOf(p) >= 0) return;

	io.Queue.push(p);

	var libpath = (window.DocRoot) ? window.DocRoot + io.BasePath : io.BasePath;
	ImportAs(p,p,libpath,"/");
};

com.sjl.io.ResourceLoader.__instance = null;
com.sjl.io.ResourceLoader.GetInstance = function()
{
	if (!this.__instance) this.__instance = new com.sjl.io.ResourceLoader();
	return this.__instance;
};

var io = com.sjl.io.ResourceLoader.GetInstance();
window.Import = io.Import;

function __sjlinit()
{
	// quit if this function has already been called
	if (arguments.callee.done) return;
	// flag this function so we don't do the same thing twice
	arguments.callee.done = true;

	if (typeof window.onReady != 'undefined') window.onReady();
}

// Safari Onload
if (/WebKit/i.test(navigator.userAgent)) { // sniff
  var _timer = setInterval(function() {
    if (/loaded|complete/.test(document.readyState)) {
      clearInterval(_timer);
      __sjlinit(); // call the onload handler
    }
  }, 10);
}
else if (document.addEventListener) {
	document.addEventListener("DOMContentLoaded", __sjlinit, false);
}

if(!document.all)window.onload = __sjlinit;