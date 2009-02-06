Import("com.mislabeled.ui.layout.point.point");

Namespace("com.mislabeled.ui.layout.point");

/**
 * Creates an instance of the point control class
 * @class Manages elements and points for a point based layout approach
 * @author Scott Thundercloud
 * @see com.mislabeled.ui.layout.container
 * @requires com.mislabeled.ui.layout.point.point
 * @constructor
 */
com.mislabeled.ui.layout.point.control = Class.create();
com.mislabeled.ui.layout.point.control.prototype.initialize = function(obj)
{
	/**
	 * The container that we're controlling
	 * @type DOMElement
	 * @private
	 */
	var ctrlParent = null;

	/**
	 * Array of points for managing layout
	 * @type Array
	 * @private
	 */
	var points = [];
	var debug = false;

	this.self = this;

	/**
	 * Gets the current dimensions of the container we're doing layout for
	 * @return Returns an object with horizontal and vertical point locations
	 * @type Object
	 * @private
	 */
	var GetDimensions = function()
	{
		var h = {
			left: 0,
			center: ctrlParent.offsetWidth / 2,
			right: ctrlParent.offsetWidth
		}

		var v = {
			top: 0,
			center: ctrlParent.offsetHeight / 2,
			bottom: ctrlParent.offsetHeight
		}

		return {horizontal:h,vertical:v};
	}

	/**
	 * Get a point with the matching name
	 * @param {string} type		The name of the point
	 * @return Returns a matching point or null if it cannot be found
	 * @type com.mislabeled.ui.layout.point.point;
	 * @private
	 */
	var GetPoint = function(type)
	{
		for(var i=0; i < points.length; i++)
			if(points[i].Name == type) return points[i];

		return null;
	}

	/**
	 * Position points according to the current dimensions of the container
	 * @type Void
	 * @private
	 */
	var PositionPoints = function()
	{
		var positions = GetDimensions();

		for(var i in positions.horizontal)
		{
			if (positions.horizontal.hasOwnProperty(i))
			{
				for(var j in positions.vertical)
				{
					if (positions.vertical.hasOwnProperty(j))
					{
						var point = GetPoint(j+'-'+i);
						point.ResetStack();
						point.SetPosition(positions.horizontal[i],positions.vertical[j]);
					}
				}
			}
		}
	}

	/**
	 * Create points for managing layout
	 * @type Void
	 * @private
	 */
	this.CreatePoints = function()
	{
		var positions = GetDimensions();

		for(var i in positions.horizontal)
		{
			if (positions.horizontal.hasOwnProperty(i))
			{
				for(var j in positions.vertical)
				{
					if (positions.vertical.hasOwnProperty(j))
					{
						var point = new com.mislabeled.ui.layout.point.point();
						if (debug) point.EnableDebug(ctrlParent);
						point.SetParent(this);
						point.SetPosition(positions.horizontal[i],positions.vertical[j]);
						point.SetName(i,j);
						points.push(point);
					}
				}
			}
		}
	}

	/**
	 * Position elements according to points
	 * @type Void
	 * @private
	 */
	var LayoutItem = function(node)
	{
		var cHeight = ctrlParent.offsetHeight;
		var cWidth = ctrlParent.offsetWidth;

		var position = node.getAttribute("Position");
		var nodeStackTypeAttribute = node.getAttribute("StackType");
		var nodeFillAttribute = node.getAttribute("Fill");

		var point = GetPoint(position);
		switch(position)
		{
			case "top-left":
				point.mapElement("stack", node, nodeStackTypeAttribute, nodeFillAttribute);
			break;

			case "top-center":
				point.mapElement("stack", node, nodeStackTypeAttribute, nodeFillAttribute);
			break;

			case "top-right":
				point.mapElement("stack", node, nodeStackTypeAttribute, nodeFillAttribute);
			break;

			case "center-left":
				point.mapElement("stack", node, nodeStackTypeAttribute, nodeFillAttribute);
			break;

			case "center-center":
				point.mapElement("stack", node, nodeStackTypeAttribute, nodeFillAttribute);
			break;

			case "center-right":
				point.mapElement("stack", node, nodeStackTypeAttribute, nodeFillAttribute);
			break;

			case "bottom-left":
				point.mapElement("stack", node, nodeStackTypeAttribute, nodeFillAttribute);
			break;

			case "bottom-center":
				point.mapElement("stack", node, nodeStackTypeAttribute, nodeFillAttribute);
			break;

			case "bottom-right":
				point.mapElement("stack", node, nodeStackTypeAttribute, nodeFillAttribute);
			break;

			default:

			break;
		}
	}

	/**
	 * Recalculate point positions and layout each childNode of the container
	 * @type Void
	 */
	this.DoLayout = function()
	{
		PositionPoints();
		for(var i=0; i < ctrlParent.childNodes.length; i++)
		{
			LayoutItem(ctrlParent.childNodes[i]);
		}
	}

	/**
	 * Run if the container is resized
	 * @type Void
	 */
	this.configureResize = function()
	{
		this.DoLayout();
	}

	/**
	 * Find the closest points relative to point
	 * @type Point
	 */
	this.findClosestPoints = function(point, fillType, w, h)
	{
		var distanceFormula = function(x1,y1,x2,y2)
		{
			var xsub = x2 - x1;
			var ysub = y2 - y1;
			return Math.sqrt(Math.pow(xsub, 2) + Math.pow(ysub, 2));
		};

		var w = (!w) ? 0 : w;
		var h = (!h) ? 0 : h;

		var pCoords = point.returnPosition();
		var stack = point.returnStackDimensions();

		var hName = point.returnhName();
		var vName = point.returnvName();

		var pointX = points[0];
		var pointY = points[points.length-1];

		for(var i=0; i < points.length; i++)
		{
			var coords = points[i].returnPosition();
			var distance = distanceFormula(pCoords.x, pCoords.y, coords.x, coords.y);
			var stack = points[i].returnStackDimensions();
			if(w==0 && pCoords.x != coords.x)
			{
				if(points[i].returnStackDimensions().width > pointX.returnStackDimensions().width)
				{
					pointX = points[i];
				}
			}

			if(h==0 && pCoords.y != coords.y)
			{
				if(points[i].returnStackDimensions().height > pointY.returnStackDimensions().height)
				{
					pointY = points[i];
				}
			}
		}
		if(h > 0) pointY = null; else pointX.changeColor("blue");
		if(w > 0) pointX = null; else pointY.changeColor("yellow");

		return {x: pointX, y:pointY};
	}

	this.Debug = function(arg)
	{
		debug = arg;
		if(points.length > 0 && arg === true)
		{
			for(var i=0; i < points.length; i++)
			{
				points[i].EnableDebug();
			}
		}
	}

	if (typeof obj == "undefined") return;

	ctrlParent = obj;
	this.CreatePoints();
}