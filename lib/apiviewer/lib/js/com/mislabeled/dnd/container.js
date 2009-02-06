Import("com.mislabeled.EventDispatcher");
Import("com.mislabeled.dnd.control");
Import("com.mislabeled.dnd.item");
Import("com.mislabeled.util.dom.element");

Namespace("com.mislabeled.dnd");

com.mislabeled.dnd.container = Class.create();
com.mislabeled.dnd.container.inherits(com.mislabeled.EventDispatcher);
com.mislabeled.dnd.container.inherits(com.mislabeled.dnd.control);
/**
 * Drag and Drop container functionality
 * @author Scott Thundercloud
 */
com.mislabeled.dnd.container.prototype.initialize = function(object)
{
	this.element = object.element;
	this.Value = object.containerName;

	com.mislabeled.dnd.control.containers.push(this);



	this.checkContainers = function(containers)
	{
		if(!containers) return;
		for(var i=0; i < containers.length; i++)
		{
			if(containers[i] == this.Value) return true;
		}
		return false;
	}

	this.draghit = function(obj)
	{
		this.element.style.background = "yellow";

	}

	this.dragout = function(obj)
	{
		this.element.style.background = "blue";
	}


};
