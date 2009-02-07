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

Namespace("com.sjl.application");

Import("com.sjl.EventDispatcher");

/**
 * Creates instance of Navigator
 * @class Singleton class to get various information about current navigation
 * @constructor
 * @author Danny Graham
 */
com.sjl.application.Navigator = Class.create();
com.sjl.application.Navigator.inherits("com.sjl.EventDispatcher");
com.sjl.application.Navigator.prototype.initialize = function()
{
	var e = {};
	e.onHistoryEvent = this.onHistoryEvent.bind(this);
	e.onHistoryAdd = this.onLocationChange.bind(this);

	//BrowserHistory.initialize();
	BrowserHistory.addListener('onHistoryEvent',e);
	BrowserHistory.addListener('onHistoryAdd',e);
}

com.sjl.application.Navigator.prototype.onLocationChange = function(evt)
{
	this.dispatch({
		type: 'onLocationChange',
		newURI: evt.newURI
	});
}

com.sjl.application.Navigator.prototype.onHistoryEvent = function(evt)
{
	this.dispatch({
		type: 'onHistoryChange',
		newURI: evt.newURI
	});

	this.dispatch({
		type: 'onLocationChange',
		newURI: evt.newURI
	});
}

/** @type com.sjl.application.Navigator **/
com.sjl.application.Navigator.__instance = null

/** @type com.sjl.application.Navigator **/
com.sjl.application.Navigator.GetInstance = function()
{
	if (this.__instance == null) this.__instance = new com.sjl.application.Navigator();
	return this.__instance;
}