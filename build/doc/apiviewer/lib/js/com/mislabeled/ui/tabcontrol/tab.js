Import("com.mislabeled.EventDispatcher");

Namespace("com.mislabeled.ui.tabcontrol");
/**
 * Creates and controls a tab for a tab container
 * @class Create Tab
 * @author Scott Thundercloud
 * @constructor
 */

com.mislabeled.ui.tabcontrol.tab = Class.create();
com.mislabeled.ui.tabcontrol.tab.extend("div");
com.mislabeled.ui.tabcontrol.tab.inherits(com.mislabeled.EventDispatcher);

com.mislabeled.ui.tabcontrol.tab.prototype.initialize = function(Container, Value, Content)
{

	this.innerHTML = Value;
	this.Value = Value;
	this.Content = new com.mislabeled.ui.tabcontrol.content(Content);

	this.closeElement = document.createElement("span");
	this.Container = Container;
	with(this.closeElement.style)
	{
		background = "purple";
		cursor = "pointer";
		width = "15px";
	}
	this.closeElement.innerHTML = "X";
	this.closeElement.onclick = this.destroy.bind(this);
	this.appendChild(this.closeElement);

	if(document.all)  this.style.styleFloat = "left";
	this.setAttribute("style", "float:left");
	this.style.background = "blue";
	this.style.width = "200px";
	this.style.height = "25px";

	/////
	this.TabListenerBind = this.tabListener.bind(this);

	this.onclick = function()
	{
		this.dispatch({
			type: "tabonclick",
			tab: this
		});
		this.called = true;
		this.selected = true;
	}

	this.e = {};
	this.e.tabonclick = this.TabListenerBind;

	this.addListener("tabonclick", this.e);

	this.returnTab = function()
	{
		return this;
	}
}

com.mislabeled.ui.tabcontrol.tab.prototype.select = function()
{
	var obj = {};
	obj.tab = this;
	this.tabListener(obj);
	this.called = true;
	this.selected = true;
}

com.mislabeled.ui.tabcontrol.tab.prototype.destroy = function()
{
	this.dispatch({
		type: "tabondestroy",
		tab: this
	});
	this.Content.destroy();
	this.parentNode.removeChild(this);
	this.removeListener("tabonclick", this.e)
}

com.mislabeled.ui.tabcontrol.tab.prototype.tabListener = function(obj)
{
	if(obj.tab != this)
	{
		this.style.background = "blue";
		this.Content.hide();
		this.selected = false;
	}
	else
	{
		this.selected = true;
		this.style.background = "red";
		if(this.called != true) this.Container.appendChild(this.Content.Content);
		this.Content.show();

	}
}