
Namespace("com.mislabeled.dnd");

com.mislabeled.dnd.item = Class.create();
com.mislabeled.dnd.item.inherits(com.mislabeled.EventDispatcher);
/**
 * Drag and Drop item functionality
 * @class
 * @author Scott Thundercloud
 */

com.mislabeled.dnd.item.prototype.initialize = function(object)
{
	this.rent = (object.parent) ? object.parent : object.parent;
	this.handler = (object.handler) ? object.handler : object.parent;
	this.easing = (object.easing) ? true : false;
	this.containers = (object.container) ? object.container : null;

	this.handler.onmousedown = this.eventHandler.bind(this);
	this.handler.onmouseup = this.eventHandler.bind(this);

	com.mislabeled.dnd.control.items.push(this);

	// Properties to capture statically until overrode
	this.rmX = null;
	this.rmY = null;

	this.containersSet = 0;

	this.mouseupBind = this.mouseup.bind(this);
	this.mousedownBind = this.mousedown.bind(this);
	this.mousemoveBind = this.mousemove.bind(this);

	this.rent.style.zIndex = "50";

	this.setZIndex = function()
	{
		var items = com.mislabeled.dnd.control.items;
		for(var i=0; i < items.length; i++)
		{
			if(items[i] == this) items[i].rent.style.zIndex = "50";
			else items[i].rent.style.zIndex = "49" - i;
		}
	}
};

com.mislabeled.dnd.item.prototype.destroy = function()
{
	var items = com.mislabeled.dnd.control.items;
	for(var i=0; i < items.length; i++)
	{
		if(items[i] == this) items.splice(i, 1);
	}
	this.rent.parentNode.removeChild(this.rent);
}

com.mislabeled.dnd.item.prototype.eventHandler = function(e)
{
	if(!e) e = event;
	switch(e.type)
	{
		case "mousedown":
			this.mousedown(e);
		break;

		case "mouseup":
			this.mouseup(e);
		break;
	}
};

com.mislabeled.dnd.item.prototype.mouseup = function()
{
	document.body.removeDOMListener("mousemove", this.mousemoveBind, null);
}

com.mislabeled.dnd.item.prototype.mousedown = function(e)
{
	if(!e) e = event;
	this.rent.style.position = "absolute";

	this.isMouseDown = true;

	this.setZIndex();

	// Capture mouse x / y coordinates relative to the page
	var mX = (e.clientX) ? e.clientX : e.pageX;
	var mY = (e.clientY) ? e.clientY : e.pageY;

	// Capture mouse x / y coordinates relative to the element
	var Coordinates = com.mislabeled.util.dom.element.findCoordinates(this.rent);

	this.rX =  mX - Coordinates.x;
	this.rY = mY - Coordinates.y;

	document.body.addDOMListener("mouseup", this.mouseupBind, null);
	document.body.addDOMListener("mousemove", this.mousemoveBind, null);
};

com.mislabeled.dnd.item.prototype.mousemove = function(e)
{
	if(!e) e = event;

	var mX = (e.clientX) ? e.clientX : e.pageX;
	var mY = (e.clientY) ? e.clientY : e.pageY;

	var rmX = mX - this.rX;
	var rmY = mY - this.rY;

	this.rent.style.left = rmX + "px";
	this.rent.style.top = rmY + "px";

	var containers = com.mislabeled.dnd.control.containers;

	for(var i=0; i < containers.length; i++)
	{
		if(com.mislabeled.util.dom.element.trueMouseOver({
			element: containers[i].element,
			event: e
		}))
		{
			containers[i].draghit(this);
		}
		else
		{
			containers[i].dragout(this);

		}
	}


}