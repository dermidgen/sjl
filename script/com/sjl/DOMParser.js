Namespace('com.sjl');

/**
 * Enables DOM parsing for divs with the parseAs attribute
 *
 * @class Parses DOM for elements matching classes
 *
 * @constructor
 * @author Danny Graham
 */
com.sjl.DOMParser = Class.create();
com.sjl.DOMParser.prototype.initialize = function()
{
}

com.sjl.DOMParser.prototype.parseDOM = function(oRoot)
{
	var oElm = (oRoot) ? oRoot : document;

	var matches = Array();
	matches = document.getElementsByAttribute(oElm, "div", "parseas");
	matches = matches.concat(document.getElementsByAttribute(oElm, "button", "parseas"));

	for (var i=0; i<matches.length; i++)
	{
		var strEmClass = matches[i].getAttribute("parseas");
		this.createClass(strEmClass, matches[i]);
	}
}

com.sjl.DOMParser.prototype.createClass = function(strClass, oEm)
{
	
	var replaceNode = function(strClass, oEm)
	{
		var classArgs = "";
		var emChildren = oEm.childNodes;
		if (emChildren.length == 1) classArgs = '"'+emChildren[0].nodeValue+'"';

		var oClass = eval("new "+strClass+"("+classArgs+");");
		var oParent = oEm.parentNode;
		oParent.replaceChild(oClass,oEm);
	};
	
	var e = {};
	e.oncomplete = function(p)
	{
		com.sjl.io.ResourceLoader.GetInstance().removeListener('oncomplete',e);
		replaceNode(strClass, oEm);
	}

	if (eval(strClass)) replaceNode(strClass, oEm); // EEEVIIILLLLL this _must_ be fixed
	else
	{
		com.sjl.io.ResourceLoader.GetInstance().addListener('oncomplete',e);
		Import(strClass);
	}
}