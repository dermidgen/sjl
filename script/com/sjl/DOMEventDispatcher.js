Namespace("com.sjl");

/**
 * Provides cross-browser DOM event support.
 *
 * @class Provides cross-browser DOM event support.
 * Known browsers supported: Mozilla, Opera, Internet Explorer 5.5+, Konqueror, Safari.
 *
 * @static
 * @author Scott Thundercloud
 */
com.sjl.DOMEventDispatcher = function(){};
com.sjl.DOMEventDispatcher.prototype =
{
	/*
	 * Some notes.
	 *
	 * addEventListener, removeEventListener, dispatchEvent are all part
	 * of the W3C specification. Mozilla, Opera, Safari, Konqueror, all support
	 * the aforementioned methods to some extent.  Internet Explorer specific methods:
	 * attachEvent detachEvent and fireEvent.
	 */
	DOMEvents: [],

	Initialize: function()
	{
		if(DOMEvents.length == 0) this.addDOMListener(window, "unload", this.Destroy.bind(this), false);
	},

	findElement: function(element)
	{
		for(var i=0; i < this.DOMEvents.length; i++)
		{
			if(this.DOMEvents[i] == element) return this.DOMEvents[i];
		}
		return false;
	},

	addDOMListener: function(element, type, listener, useCapture)
	{
		if(element.addEventListener) element.addEventListener(type, listener, useCapture);
		if(element.attachEvent) element.attachEvent("on" + type, listener);

		var eObj = {
			element: element,
			type: type,
			listener: listener,
			useCapture: useCapture
		};
		this.DOMEvents.push(eObj);
		element = null;
		eObj = null;
	},

	removeDOMListener: function(element, type, listener, useCapture)
	{
		for(var i=0; i < this.DOMEvents.length; i++)
		{
			if(this.DOMEvents[i].element == element && this.DOMEvents[i].type == type && this.DOMEvents[i].listener == listener)
			{
				if(this.DOMEvents[i].element.removeEventListener) this.DOMEvents[i].element.removeEventListener(type, listener, useCapture);
				if(this.DOMEvents[i].element.detatchEvent) this.DOMEvents[i].element.detatchEvent(type, listener);
				this.DOMEvents.splice(i, 1);
			}
		}
		element = null;
	},

	dispatchDOMEvent: function(element, event)
	{
		var element = this.findElement(element);
		if(element.dispatchEvent) element.dispatchEvent(event);
		if(element.fireEvent) element.fireEvent(event);
		element = null;
	},

	Destroy: function()
	{
		for(var i=0; i < this.DOMEvents.length; i++)
		{
			this.removeDOMListener(this.DOMEvents[i].element, this.DOMEvents[i].type, this.DOMEvents[i].listener, this.DOMEvents[i].useCapture);
			this.DOMEvents[i] = null;
			this.DOMEvents.splice(i,1);
		}
	}
};