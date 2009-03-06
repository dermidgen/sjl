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

Ajile.EnableDebug(false);
//Ajile.ShowLog();
Ajile.EnableCloak(true);

//IE Onload - without delays for image loads
/*@cc_on @*/
/*@if (@_win32)
document.write("<script id=__ie_onload defer src=javascript:void(0)><\/script>");
var script = document.getElementById("__ie_onload");
script.onreadystatechange = function() {
  if (this.readyState == "complete") {
    __sjlinit(); // call the onload handler
  }
};
/*@end @*/

function kickstart()
{
	// We need to tell the resource loader what our base path is for Imports
	var io = com.sjl.io.ResourceLoader.GetInstance();
	io.SetPath('.');
	
	var e = {};
	e.oncomplete = function()
	{
		io.removeListener('oncomplete',e);
		
		var parser = new com.sjl.DOMParser();
		parser.parseDOM();
	};
	
	io.addListener('oncomplete',e);
	
	Import('com.sjl.test.contentBox1');
	Import('com.sjl.test.contentBox2');
	Import('com.sjl.test.contentBox3');
	Import('com.sjl.test.contentBox4');
}