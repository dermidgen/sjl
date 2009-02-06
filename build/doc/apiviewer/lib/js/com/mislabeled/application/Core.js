Import ("com.mislabeled.theme.Selector");
Namespace("com.mislabeled.application");

/**
 * Base Class - Do not instantiate
 * @class Core provides applications with a base level of functionality
 * to extend upon.
 *
 * @author Danny Graham
 */
com.mislabeled.application.Core = Class.create();
com.mislabeled.application.Core.prototype.initialize = function()
{
	this.Theme = 'default';

	var IncludeThemeResources = function(theme)
	{
		var selector = com.mislabeled.theme.Selector.GetInstance();
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
com.mislabeled.application.Core.prototype.SetTheme = function(theme)
{
	this.Theme = theme;
	this.EnableTheme();
}
