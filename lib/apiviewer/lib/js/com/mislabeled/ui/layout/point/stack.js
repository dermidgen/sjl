Namespace("com.mislabeled.ui.layout.point");

/**
 * @class Stack control for points
 * @author Scott Thundercloud
 * @constructor
 * @see com.mislabeled.ui.layout.point.point
 * Creates a stack a point.  Stacks control where each element is displayed.
 */

com.mislabeled.ui.layout.point.stack = Class.create();
com.mislabeled.ui.layout.point.stack.inherits("com.mislabeled.EventDispatcher");

com.mislabeled.ui.layout.point.stack.prototype.initialize = function(pointBind)
{
	var height = 0;
	var width = 0;
	var area = 0;
	var growth = [""];
	var elements = [];

	this.point = pointBind;

	var calculateArea = function()
	{
		area = width + height;
	};

	var calculateElement = function()
	{

	};


	var findLeft = function()
	{

	}

	var findTop = function()
	{

	}

	var findRight = function()
	{

	}

	var findBottom = function()
	{

	}


	var findGrowthPosition = function(point)
	{

	}

	this.add = function(element)
	{
		elements.push(element);
	}

	this.remove = function(element)
	{
		for(var i=0; i < elements.length; i++)
		{

		}
	}

	this.bindTo = function(point)
	{
		this.point = point;
	}
}