Namespace("com.mislabeled.util.dom");
/**
 * @author Scott Thundercloud
 */

com.mislabeled.util.dom.element = function() {};
com.mislabeled.util.dom.element.prototype = {
	findCoordinates: function(element)
	{
		var x = 0;
		var y = 0;
		if(element.offsetParent)
		{
			while(1)
			{
				x += element.offsetLeft;
				y += element.offsetTop;
				if(!element.offsetParent) break;
				element = element.offsetParent;
			}
		}
		else if(element.x && element.y)
		{
			x += element.x;
			y += element.y;
		}
		return {x:x,y:y};
	},

	
	trueMouseOver: function(obj)
	{
		var element = (!obj.element) ? null : obj.element;
		var event = (!obj.event) ? null : obj.event;
		var e = event;
		
		//var scrollX = (window.scrollX) ? window.scrollX : document.documentElement.scrollLeft;
		//var scrollY = (window.scrollY) ? window.scrollY : document.documentElement.scrollTop;
		
		//var screen = com.mislabeled.util.dom.window.screen();
		
		var mX = (e.clientX) ? e.clientX + window.scrollX : e.pageX;
		var mY = (e.clientY) ? e.clientY + window.scrollY : e.pageY;
		
		var Coordinates = this.findCoordinates(element);

		var startX = Coordinates.x;
		var startY = Coordinates.y;

		var endX = startX + element.offsetWidth;
		var endY = startY + element.offsetHeight;

		if(mX > startX && mX < endX && mY > startY && mY < endY)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
}
com.mislabeled.util.dom.element = new com.mislabeled.util.dom.element;