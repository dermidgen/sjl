//Ajile.EnableDebug(false);
//Ajile.EnableLegacy(false);
//Ajile.EnableCloak(false);

window.onReady = function()
{
	var io = com.sjl.io.ResourceLoader.GetInstance();
	io.SetPath('./');
	
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
};