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
com.sjl.DOMParser.inherits('com.sjl.EventDispatcher');
com.sjl.DOMParser.prototype.initialize = function()
{
};

com.sjl.DOMParser.prototype.parseDOM = function(oRoot)
{
	var oElm = (oRoot) ? oRoot : document;

	var matches = [];
	matches = document.getElementsByAttribute(oElm, "div", "parseas");
	matches = matches.concat(document.getElementsByAttribute(oElm, "button", "parseas"));
	
	var pList = [];
	var iList = [];
	for (var i=0; i<matches.length; i++)
	{
		var strEmClass = matches[i].getAttribute("parseas");
		pList.push(Array(strEmClass, matches[i]));
		iList.push(strEmClass);
	}

	var replaceNode = function(strClass, oEm)
	{
		var classArgs = "";
		var emChildren = oEm.childNodes;
		if (emChildren.length == 1) classArgs = '"'+emChildren[0].nodeValue+'"';
		
		var oClass = eval("new "+strClass+"("+classArgs+");");
		var oParent = oEm.parentNode;
		oParent.replaceChild(oClass,oEm);
	};
	
	var self = this;
	var e = {};
	e.oncomplete = function(p)
	{
		com.sjl.io.ResourceLoader.GetInstance().removeListener('oncomplete',e);
		
		for(var i=0; i<pList.length; i++)
		{
			replaceNode(pList[i][0],pList[i][1]);
		}
		
		self.dispatch({
			type:'oncomplete'
		});
	};
	com.sjl.io.ResourceLoader.GetInstance().addListener('oncomplete',e);

	Import(iList);
};

com.sjl.DOMParser.__instance = null;
com.sjl.DOMParser.GetInstance = function()
{
	if (com.sjl.DOMParser.__instance == null) com.sjl.DOMParser.__instance = new com.sjl.DOMParser();
	return com.sjl.DOMParser.__instance;
};
