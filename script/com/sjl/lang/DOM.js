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

// Added functionality for use in com.sjl.DOMParser
document.getElementsByAttribute = function(oElm, strTagName, strAttributeName, strAttributeValue){
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)", "i") : null;
    var oCurrent;
    var oAttribute;
    for(var i=0; i<arrElements.length; i++){
        oCurrent = arrElements[i];
        oAttribute = oCurrent.getAttribute && oCurrent.getAttribute(strAttributeName);
        if(typeof oAttribute == "string" && oAttribute.length > 0){
            if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))){
                arrReturnElements.push(oCurrent);
            }
        }
    }
    return arrReturnElements;
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