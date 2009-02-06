Namespace("com.mislabeled.util.dom");
/**
 * 
 */
com.mislabeled.util.dom.window = 
{
	screen: function()
	{
		var scrollX = 0;
		if(document.documentElement)
		{
			scrollX = document.documentElement.scrollLeft;
			scrollY = document.documentElement.scrollTop;
		}
		else if(window.scrollX && window.scrollY)
		{
			scrollX = window.scrollX;
			scrollY = window.scrollY;
		}
		return {x: scrollX, y: scrollY};
	}
}
