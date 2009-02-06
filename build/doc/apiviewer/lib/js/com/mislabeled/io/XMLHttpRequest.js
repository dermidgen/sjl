Import("com.mislabeled.application.Environment");

Namespace("com.mislabeled.io");

/**
 * Creates and instance of XMLHttpRequest
 *
 * @class Provides abstraction to browser XHR
 * @constructor
 * @author Danny Graham
 */
com.mislabeled.io.XMLHttpRequest = Class.create();
com.mislabeled.io.XMLHttpRequest.prototype.__construct = function()
{
	var xObj;
	var e = com.mislabeled.application.Environment.GetInstance();

	// TODO: Implement real browser checking
	// TODO: Throw Exception on Failure
	if (e.Browser != 'IE') xObj = new XMLHttpRequest();
	else
	{
		try {
			xObj = new ActiveXObject("Msxml2.XMLHTTP.4.0");
		} catch(e) {
			try {
				xObj = new ActiveXObject("Msxml2.XMLHttp.3.0");
			} catch(e) {
				try {
					xObj = new ActiveXObject("Msxml2.XMLHttp");
				} catch (e) {
					try {
						xObj = new ActiveXObject("Microsoft.XMLHttp");
					} catch(e) {
						xObj = false;
					}
				}
			}
		}
	}
	return xObj;
}