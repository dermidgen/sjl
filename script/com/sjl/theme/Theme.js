Import("com.sjl.io.Http");
Import("com.sjl.EventDispatcher");

Namespace("com.sjl.theme");

/**
 * Creates an instance of Theme
 * @class Theme manages all the aspects of a theme's details.  It also loads all necessary CSS
 * for the theme and manages the location and path to theme relative resources
 * @author Danny Graham
 * @constructor
 */
com.sjl.theme.Theme = Class.create();
com.sjl.theme.Theme.inherits("com.sjl.EventDispatcher");
com.sjl.theme.Theme.prototype.initialize = function()
{
	/**
	 * Theme name
	 * @type string
	 */
	this.Name = null;

	this.RoundedCorners = false;
	this.RoundingRadius = 0;

	this.Shadows = false;
	this.ShadowStrength = 0;
	this.ShadowOffset = 0;

	this.__registerThemeDefs = function(event)
	{
		this.dispatch({
			type: 'onReady'
		});
	}

	this.LoadStyles = function()
	{
		var doc_head = document.getElementsByTagName('head').item(0);
		var link = document.createElement('link');
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('href', 'themes/'+this.Name+'/resource/css/css.css');
		link.setAttribute('type', 'text/css');
		doc_head.appendChild(link);

		doc_head,link = null;
	}

	this.LoadThemeDefs = function()
	{
		var r = {
			url: 'themes/'+this.Name+'/theme.xml'
		}

		var xhr = new com.sjl.io.Http();
		var e = {
			onLoad: this.__registerThemeDefs.bind(this)
		}
		xhr.addListener("onLoad",e);
		xhr.Request(r);

		r,xhr,e = null;
	}


	/**
	 * Loads the theme's CSS and Definition
	 * @type Void
	 */
	this.Load = function()
	{
		this.LoadStyles();
		this.LoadThemeDefs();
	}
}

com.sjl.theme.Theme.prototype.GetProperty = function(propertyName)
{
	if (typeof this[propertyName] != 'undefined') return this[propertyName];
}