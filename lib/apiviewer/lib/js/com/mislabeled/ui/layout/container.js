Import("com.mislabeled.ui.layout.point.control");
Import("com.mislabeled.dom.Div");

Namespace("com.mislabeled.ui.layout");
/**
 * Create a new instance of Container
 * @class Container hosts layouts and offer other useful functionality
 * @author Scott Thundercloud
 * @constructor
 */
com.mislabeled.ui.layout.container = Class.create();
com.mislabeled.ui.layout.container.extend("div");

com.mislabeled.ui.layout.container.prototype.initialize = function()
{
	/**
	 * Internal reference to overloaded appendChild from DOM
	 * @type Function
	 */

	this.__appendChild = this.appendChild;

	/**
	 * Reference to the logic controller for the specified layout type
	 * @type com.mislabeled.ui.layout.control
	 * @private
	 */
	var layoutControl = null;
	var liquid = false;

	this.setAttribute("mlType", "container");
	this.style.position = "absolute";

	/**
	 * Calls the layout control to perform layout
	 * @type Void
	 * @private
	 */
	var __layout = function()
	{
		if (layoutControl) layoutControl.DoLayout();
	}

	/**
	 * Runs resize handler
	 * @type Void
	 * @private
	 */

	/**
	 * Assigns layoutControl to a new instance of the specified layout type
	 * and initializes the layout control
	 * @type Void
	 * @param {string} type		The type of layout control to be used
	 */
	this.SetLayout = function(type)
	{
		// TODO: Convert this method to a factory method that accepts a string
		if (typeof type == "undefined") return;

		layoutControl = new type(this);
		__layout();
	}

	/**
	 * Set style properties for the container
	 * @type Void
	 * @param {object} styleObj		An object containing DOMElement style properties
	 */
	this.SetStyle = function(styleObj)
	{
		for(var i in styleObj)
		{
			if(i != "inherits" && i != "extend" && i != "getAll")
			{
				eval('this.style.' + i + ' = ' + '"' + styleObj[i] + '"' + ';');
			}
		}
	}

	/**
	 * Allow manual call on layout
	 * @type Void
	 */
	this.DoLayout = function()
	{
		__layout();
	}

	/**
	 * Adjust the size of the container
	 * @type Void
	 * @param {int} x	New width
	 * @param {int} y	New height
	 */
	this.Resize = function(x,y)
	{
		this.style.width = x + "px";
		this.style.height = y + "px";
		layoutControl.configureResize();
	}

	/**
	 * Overloaded appendChild method for the container
	 * @return Returns the DOMElement that was appended
	 * @type DOMElement
	 * @param {DOMElement} element	The DOMElement to be appended to this container
	 */
	this.appendChild = function(element)
	{
		element.style.position = "absolute";
		this.__appendChild(element);

		__layout();

		return element;
	}

	/**
	 * Alternate method for appending this container to the DOM also calls layout controls
	 * @return Returns an instance of this container (which is also a DOMElement)
	 * @type DOMElement
	 * @param {DOMElement} element	The DOMElement to append this container to
	 */
	this.appendTo = function(element)
	{
		element.appendChild(this);

		__layout();

		return this;
	}
}