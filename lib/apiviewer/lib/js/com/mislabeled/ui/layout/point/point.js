Namespace("com.mislabeled.ui.layout.point");

/**
 * Create a new point instance
 * @class Points control the positioning of elements within a container
 * @see com.mislabeled.ui.layout.point.control
 * @constructor
 */
com.mislabeled.ui.layout.point.point = Class.create();
com.mislabeled.ui.layout.point.point.prototype.initialize = function()
{
	var xPos = 0;
	var yPos = 0;

	var elements = [];

	var stackWidth = 0;
	var stackHeight = 0;

	var verticalStackPositive = 0;
	var verticalStackNegative = 0;

	var horizontalStackPositive = 0;
	var horizontalStackNegative = 0;

	var vName = '';
	var hName = '';

	var debugDiv = false;
	var debugRoot = false;

	// For debugging
	var pointSize = 10;

	this.appended = false;

	this.ParentObj = null;

	this.Name = '';

	var AdjustDebugDiv = function()
	{
		debugDiv.style.left = ((xPos + pointSize) > debugRoot.offsetWidth) ? xPos - pointSize+'px' : xPos+"px";
		debugDiv.style.top =((yPos + pointSize) > debugRoot.offsetHeight) ? yPos - pointSize+'px' : yPos+"px";
	}

	var drawElements = function()
	{
		for(var i=0; i < elements.length; i++)
		{
			elements[i].element.style.left = (elements[i].relativePosition.x + xPos) + "px";
			elements[i].element.style.top = (elements[i].relativePosition.y + yPos) + "px";
		}
	}

	/**
	 * Sets the name of the point and internal horizontal naming and vertical name
	 * @param {string} h	Horizontal name
	 * @param {string} v	Vertical name
	 * @type Void
	 */
	this.SetName = function(h,v)
	{
		vName = v;
		hName = h;

		this.Name = v + "-" + h;
	}

	this.returnhName = function()
	{
		return hName;
	}

	this.returnvName = function()
	{
		return vName;
	}

	/**
	 * Sets the position of the point
	 * @param {int} x	The x value
	 * @param {int} y	The y value
	 * @type Void
	 */
	this.SetPosition = function(x,y)
	{
		xPos = x;
		yPos = y;

		if (debugDiv) AdjustDebugDiv();
	}

	this.SetParent = function(prnt)
	{
		this.ParentObj = prnt;
	}

	this.returnPosition = function()
	{
		return {x: xPos, y: yPos};
	}

	this.ResetStack = function()
	{
		verticalStackPositive = 0;
		verticalStackNegative = 0;
		horizontalStackPositive = 0;
		horizontalStackNegative = 0;

		elements = [];
	}


	/**
	 * Repositions the element according to the current location of its siblings and this point
	 * @type Void
	 * @param {string} positionType		Type of positioning we're going to do - currently: Stack|Absolute;
	 * @param {DOMElement} element		DOMElement to be positioned
	 * @param {string} stackType		Stack positioning relative to the point: leftOf|rightOf|topOf|belowOf
	 * @param {boolean} fill			Fill to nearest stack
	 */
	this.mapElement = function(positionType, element, stackType, fill)
	{
		var elementData = {
			width: element.offsetWidth,
			height: element.offsetHeight,
			area: element.offsetHeight + element.offsetWidth,
			element: element,
			relativePosition: {
				x: 0,
				y: 0
			},
			displayPosition: {
				x: 0,
				y: 0
			},
			fill: fill
		};

		var grow;

		switch(positionType)
		{
			case "stack":
				switch(stackType)
				{
					case "leftOf":
						elementData.relativePosition.x = horizontalStackNegative - elementData.width;
						elementData.relativePosition.y = (vName=="bottom") ? -elementData.height : 0;

						horizontalStackNegative -= elementData.width;
						if(elements.length == 0 && vName=="top")
							verticalStackPositive = elementData.height;
							else if(elements.length==0 && vName=="bottom")
								verticalStackNegative = -elementData.height;
					break;

					case "rightOf":
						elementData.relativePosition.x = horizontalStackPositive - xPos;
						elementData.relativePosition.y = (vName=="bottom") ? -elementData.height : 0;

						horizontalStackPositive += elementData.width;
						if(elements.length == 0 && vName=="top")
							verticalStackPositive = elementData.height;
							else if(elements.length==0 && vName=="bottom")
								verticalStackNegative = -elementData.height;
					break;

					case "topOf":
						elementData.relativePosition.x = (hName=="left") ? 0 : -elementData.width;
						elementData.relativePosition.y = verticalStackNegative - elementData.height;

						if(elements.length == 0 && hName=="left")
							horizontalStackPositive = elementData.width;
							else if(elements.length==0 && hName=="right")
								horizontalStackNegative = -elementData.width;

						verticalStackNegative -= elementData.height
					break;

					case "bottomOf":
						elementData.relativePosition.x = (hName=="left") ? 0 : -elementData.width
						elementData.relativePosition.y = verticalStackPositive;

						verticalStackPositive += elementData.height
						if(elements.length == 0 && hName=="left")
							horizontalStackPositive = elementData.width;
							else if(elements.length==0 && hName=="right")
								horizontalStackNegative = -elementData.width;
					break;

					case "centerOf":
						if(hName=="left" || hName=="right") grow = "vertical";
							else if(hName=="center") grow = "horizontal";

						horizontalStackPositive += elementData.width / 2;
						horizontalStackNegative -= elementData.width / 2;

						verticalStackPositive += elementData.height / 2;
						verticalStackNegative -= elementData.height / 2;

						for(var i=0; i < elements.length; i++)
						{
							if(elements[i].element.getAttribute("StackType") == "centerOf")
							{
								if(grow=="horizontal")
								{
									elements[i].relativePosition.x = (elements[i-1]) ? elements[i-1].width + elements[i-1].relativePosition.x : horizontalStackNegative;
								}
								else if(grow=="vertical")
								{
									elements[i].relativePosition.y = (elements[i-1]) ? elements[i-1].height + elements[i-1].relativePosition.y : verticalStackNegative;
								}
							}
						}

						if(hName=="right") elementData.relativePosition.x = -elementData.width;
						else if(hName=="center") elementData.relativePosition.x = horizontalStackPositive - elementData.width;
						else if(hName=="left") elementData.relativePosition.x = 0;
						if(grow=="horizontal")
						{
							if(vName=="center") elementData.relativePosition.y = -elementData.height / 2;
							else if(vName=="top") elementData.relativePosition.y = 0;
							else if(vName=="bottom") elementData.relativePosition.y = -elementData.height;
						}
						else
						{
							elementData.relativePosition.y = verticalStackPositive - elementData.height;
						}

					break;

					default:
						element.innerHTML = "error";
					break;
				}
			break;

			case "fill":

			break;

			case "absolute":

			break;
		}

		if(elementData.fill == "true")
		{
			/*
			var points = this.ParentObj.findClosestPoints(this, elementData.width, elementData.height);
			if(points.x)
			{
				console.info(points.x);
			}
			if(points.y)
			{
				console.info(points.y);
			}
			*/
		}
		elements.push(elementData);
		drawElements();
	}

	/**
	 * Returns stack width and height
	 * @return Object
	 */
	this.returnStackDimensions = function()
	{
		var height = (Math.abs(verticalStackNegative) > verticalStackPositive) ? Math.abs(verticalStackNegative) : verticalStackPositive;
		var width = (Math.abs(horizontalStackNegative) > horizontalStackPositive) ? Math.abs(horizontalStackNegative) : horizontalStackPositive;

		return {width: width, height: height};
	}

	this.changeColor = function(color)
	{
		debugDiv.style.backgroundColor = color;
	}

	this.EnableDebug = function(element)
	{
		this.debugDivOnclick = function()
		{
			this.ParentObj.findClosestPoints(this, 0, 0);
		}

		debugDiv = document.createElement('div');
		debugDiv.style.backgroundColor = 'red';
		debugDiv.style.width = pointSize + 'px';
		debugDiv.style.height = pointSize + 'px';
		debugDiv.style.position = 'absolute';
		debugDiv.style.zIndex = "99";
		debugDiv.style.lineHeight = "0";
		debugRoot = element;
		debugRoot.appendChild(debugDiv);

		debugDiv.onclick = this.debugDivOnclick.bind(this);

		AdjustDebugDiv();
	}
}
