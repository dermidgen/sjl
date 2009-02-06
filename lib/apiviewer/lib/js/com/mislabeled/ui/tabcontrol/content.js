Import("com.mislabeled.EventDispatcher");

Namespace("com.mislabeled.ui.tabcontrol");
/**
 * Creates a content wrapper for tabs
 * @class Content Wrapper
 * @author Scott Thundercloud
 * @constructor
 */
com.mislabeled.ui.tabcontrol.content = Class.create(this);
com.mislabeled.ui.tabcontrol.content.extend("div");
com.mislabeled.ui.tabcontrol.content.inherits(com.mislabeled.EventDispatcher);
com.mislabeled.ui.tabcontrol.content.prototype.initialize = function(domElement)
{
	this.Content = domElement;

	this.show = function()
	{
		with(this.Content.style)
		{
			visibility = "visible";
			display = "block";
		}
	};

	this.hide = function()
	{
		with(this.Content.style)
		{
			visibility = "hidden";
			display = "none";
		}
	};

	this.destroy = function()
	{
		if(this.Content.parentNode) this.Content.parentNode.removeChild(this.Content);
	};
}