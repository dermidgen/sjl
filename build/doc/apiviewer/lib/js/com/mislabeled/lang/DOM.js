
if(document.all)
{
	Element = function() { };
}

Element.prototype.addDOMListener = window.addDOMListener = function(type, listener, useCapture)
{
	if(this.addEventListener)
	{
		this.addEventListener(type, listener, useCapture);
	}
	else if(this.attachEvent)
	{
		this.attachEvent("on" + type, listener);
	}
}

Element.prototype.removeDOMListener = window.removeDOMListener = function(type, listener, useCapture)
{
	if(this.removeEventListener)
	{
		this.removeEventListener(type, listener, useCapture);
	}
	else if(this.detachEvent)
	{
		this.detachEvent("on" + type, listener);
	}
}

if(document.all)
{
	var all = [];

	all["createElement"] = document.createElement;
	all["getElementById"] = document.getElementById;
	all["getElementsByTagName"] = document.getElementsByTagName;

	// TODO: Fix for IE event listener compatability
	/*

	for(var Name in all)
	{
		eval('var _IE_'+Name+' = document.' + Name + ';' +
				'document.' + Name + ' = function(tag)' +
				'{' +
				'var domElement = _IE_'+Name+'(tag);' +
				'var inter = new Element;' +
				'for(var meth in inter)' +
				'{' +
				'domElement[meth] = inter[meth]' +
				'}' +
				'return domElement;' +
				'}');
	}

	*/



	scroller = function()
	{
		if(document.documentElement)
		{
			window.scrollX = document.documentElement.scrollLeft;
			window.scrollY = document.documentElement.scrollTop;
		}
	}

	window.scrollX = document.documentElement.scrollLeft;
	window.scrollY = document.documentElement.scrollTop;

	document.documentElement.onscroll = function() { scroller(); }
}