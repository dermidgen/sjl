Namespace("com.sjl.application");

/**
 * Creates instance of Environment
 * @class Singleton class to get various information about the environment
 * @constructor
 * @author Danny Graham
 */
com.sjl.application.Environment = Class.create();
com.sjl.application.Environment.prototype.initialize = function()
{
	this.UserAgent = null;
	this.AppVersion = null;

	this.Browser = null;
	this.OS = null;

	/**
	 * Gets the client OS
	 * @return The client Operating System
	 * @type {string}
	 */
	this.GetOS = function()
	{
		if (this.AppVersion.indexOf("Macintosh") >= 0) this.OS = "Macintosh";
		if (this.AppVersion.indexOf("Windows") >= 0) this.OS = "Windows";
		if (this.AppVersion.indexOf("Linux") >= 0) this.OS = "Linux";
		return this.OS;
	};

	/**
	 * Gets complete browser details
	 * @return Array of browser details
	 * @type {array}
	 */
	this.GetBrowser = function()
	{
		if (this.UserAgent.indexOf("Opera") >= 0) this.Browser = "Opera";
		if (this.AppVersion.indexOf("Konqueror") >= 0) this.Browser = "Konqueror";
		if (this.AppVersion.indexOf("Safari") >= 0) this.Browser = "Safari";
		if (this.UserAgent.indexOf("Gecko") >= 0 && (this.Browser != "Konqueror" && this.Browser != "Safari")) this.Browser = "Mozilla";
		if (document.all && (this.Browser != 'Opera')) this.Browser = "IE";
		return this.Browser;
	};

	this.HasFeature = function(feature)
	{
	};

	this.UserAgent = navigator.userAgent;
	this.AppVersion = navigator.appVersion;

	this.GetBrowser();
	this.GetOS();
}


com.sjl.application.Environment.__instance = null;

/**
 * Returns an instance of Environment
 * @type com.sjl.application.Environment
 */
com.sjl.application.Environment.GetInstance = function()
{
	if (!this.__instance) this.__instance = new com.sjl.application.Environment();
	return this.__instance;
}