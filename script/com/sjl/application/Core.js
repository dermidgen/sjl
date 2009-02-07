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

Import ("com.sjl.theme.Selector");

/**
 * Base Class - Do not instantiate
 * @class Core provides applications with a base level of functionality
 * to extend upon.
 *
 * @constructor
 * @author Danny Graham
 */
com.sjl.application.Core = Class.create();
com.sjl.application.Core.prototype.initialize = function()
{
	this.Theme = 'default';

	var IncludeThemeResources = function(theme)
	{
		var selector = com.sjl.theme.Selector.GetInstance();
		selector.SetTheme(theme);
		selector.LoadTheme();
	}

	this.EnableTheme = function()
	{
		IncludeThemeResources(this.Theme);
	}
}

/**
 * Set and immediately enable a specified theme
 * @param {String} theme	The theme to be set and enabeled
 * @type Void
 */
com.sjl.application.Core.prototype.SetTheme = function(theme)
{
	this.Theme = theme;
	this.EnableTheme();
}
