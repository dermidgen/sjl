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

Namespace("com.sjl.theme");

Import("com.sjl.theme.Theme");

/**
 * Singleton class - use GetInstance()
 * @class Manages themes
 * @author Danny Graham
 * @requires com.sjl.theme.Theme
 * @constructor
 */
com.sjl.theme.Selector = Class.create();
com.sjl.theme.Selector.prototype.initialize = function()
{
	/**
	 * The current theme
	 * @type com.sjl.theme.Theme
	 */
	this.Theme = null;
}

/**
 * Creates a new theme instance and sets it as active
 * @param {string} theme	Name of the theme to be loaded
 * @type Void
 */
com.sjl.theme.Selector.prototype.SetTheme = function(theme)
{
	this.Theme = new com.sjl.theme.Theme();
	this.Theme.Name = theme;
}

/**
 * Tell the theme to actually load its resources
 * @type Void
 */
com.sjl.theme.Selector.prototype.LoadTheme = function()
{
	this.Theme.Load();
}

/**
 * Static internal reference for singleton
 * @type com.sjl.theme.Selector
 */
com.sjl.theme.Selector.__instance = null;

/**
 * Static method for getting an instance of the class
 * @type com.sjl.theme.Selector
 */
com.sjl.theme.Selector.GetInstance = function()
{
	if (!this.__instance) this.__instance = new com.sjl.theme.Selector();
	return this.__instance;
}