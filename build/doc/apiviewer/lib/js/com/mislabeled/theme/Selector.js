Import("com.mislabeled.theme.Theme");

Namespace("com.mislabeled.theme");

/**
 * Singleton class - use GetInstance()
 * @class Manages themes
 * @author Danny Graham
 * @requires com.mislabeled.theme.Theme
 * @constructor
 */
com.mislabeled.theme.Selector = Class.create();
com.mislabeled.theme.Selector.prototype.initialize = function()
{
	/**
	 * The current theme
	 * @type com.mislabeled.theme.Theme
	 */
	this.Theme = null;
}

/**
 * Creates a new theme instance and sets it as active
 * @param {string} theme	Name of the theme to be loaded
 * @type Void
 */
com.mislabeled.theme.Selector.prototype.SetTheme = function(theme)
{
	this.Theme = new com.mislabeled.theme.Theme();
	this.Theme.Name = theme;
}

/**
 * Tell the theme to actually load its resources
 * @type Void
 */
com.mislabeled.theme.Selector.prototype.LoadTheme = function()
{
	this.Theme.Load();
}

/**
 * Static internal reference for singleton
 * @type com.mislabeled.theme.Selector
 */
com.mislabeled.theme.Selector.__instance = null;

/**
 * Static method for getting an instance of the class
 * @type com.mislabeled.theme.Selector
 */
com.mislabeled.theme.Selector.GetInstance = function()
{
	if (!this.__instance) this.__instance = new com.mislabeled.theme.Selector();
	return this.__instance;
}