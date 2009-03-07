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

// This is the pre-defined main entry point for kicking off code
window.onReady = function()
{
	// We need to tell the resource loader what our base path is for imports
	// since we're not running in the default 'lib/js' directory
	var io = com.sjl.io.ResourceLoader.GetInstance();
	io.SetPath('.');

	// This method is simple enough - dependencies are handled for you
	// by the parser
	com.sjl.DOMParser.GetInstance().parseDOM();
	
	// Alternatively the following method can be used to manually call your
	// imports and parse the DOM when all imports have completed.  This is
	// useful if one of your imports uses DOM nodes with the "parseas" attribute
	
//	var e = {};
//	e.oncomplete = function()
//	{
//		io.removeListener('oncomplete',e);
//		
//		com.sjl.DOMParser.GetInstance().parseDOM();
//	};
//	
//	io.addListener('oncomplete',e);
	
	// When using a listener as exemplified above it is not recommended to make successive Import calls
	// IE doesn't handle the queueing properly and will fire the oncomplete event early.  Instead use an Array.
//	Import('com.sjl.test.contentBox1');
//	Import('com.sjl.test.contentBox2');
//	Import('com.sjl.test.contentBox3');
//	Import('com.sjl.test.contentBox4');

//	Import(Array('com.sjl.test.contentBox1','com.sjl.test.contentBox2','com.sjl.test.contentBox3','com.sjl.test.contentBox4'));
};