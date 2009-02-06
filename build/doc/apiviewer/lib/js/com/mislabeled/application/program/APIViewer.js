//Import("com.mislabeled.application.Core");
Import("com.mislabeled.io.Http");
Import("com.mislabeled.xml.xsl.Processor");
Import("com.mislabeled.ui.layout.container");

Namespace("com.mislabeled.application.program");

/**
 * API Viewer application Main class
 *
 * @class Main application class for the API Viewer
 * @author Danny Graham
 * @constructor
 */
com.mislabeled.application.program.APIViewer = Class.create();
com.mislabeled.application.program.APIViewer.inherits('com.mislabeled.EventDispatcher');
com.mislabeled.application.program.APIViewer.prototype.initialize = function()
{
	this.APIDoc = null;
	this.ClassesXSL = null;
	this.PackagesXSL = null;
	this.ClassInfoXSL = null;

	this.loadAPI = function()
	{
		var r = {
			method: "GET",
			url: "lib/xml/jsdoc.xml",
			async: true,
			loaded: this.registerAPIDoc.bind(this)
		}

		var xhr = new com.mislabeled.io.Http(r);
		xhr = null;
	}

	this.loadXSL = function(path)
	{
		var r = {
			method: "GET",
			url: path,
			async: true,
			loaded: this.registerXSL.bind(this)
		}

		var xhr = new com.mislabeled.io.Http(r);
		xhr = null;


	}

	this.registerAPIDoc = function(xhr)
	{
		var doc = xhr.responseXML;
		this.APIDoc = doc;

		xhr = null;
		doc = null;

		this.loadXSL("lib/xsl/classes.xsl");
		this.loadXSL("lib/xsl/class.xsl");
		this.loadXSL("lib/xsl/packages.xsl");
	}

	this.registerXSL = function(xhr,request)
	{
		var doc = xhr.responseXML;

		switch(request)
		{
			case "lib/xsl/classes.xsl":
				this.ClassesXSL = doc;
				break;
			case "lib/xsl/packages.xsl":
				this.PackagesXSL = doc;
				break;
			case "lib/xsl/class.xsl":
				this.ClassInfoXSL = doc;
				break;
		}

		xhr = null;
		request = null;
		doc = null;

		if (this.ClassesXSL != null && this.PackagesXSL != null && this.ClassInfoXSL != null)
		{
			this.RenderAPI();
			this.DisplayHome();

			this.dispatch({
				type:'onLoad'
			});
		}
	}

	var e = {};
	var callBack = function(evt)
	{
		if (evt.newURI != '')
		{
			this.UpdateClassInfo(evt.newURI,true);
		}
		else this.DisplayHome();
	}

	e.onHistoryEvent = callBack.bind(this);
	BrowserHistory.addListener('onHistoryEvent',e);
}

/**
 * Main entry point for API Viewer
 */
com.mislabeled.application.program.APIViewer.prototype.Run = function()
{
	this.loadAPI();
}

com.mislabeled.application.program.APIViewer.prototype.RenderAPI = function()
{
	var Page = new com.mislabeled.ui.layout.container();
	Page.SetLayout(com.mislabeled.ui.layout.point.control);

	var width = (document.all)?document.body.clientWidth:window.innerWidth;
	var height = (document.all)?document.body.clientHeight:window.innerHeight;

	Page.style.width = width+'px';

	document.body.appendChild(Page);

	var Header = document.createElement('div');
	Header.id = 'HeaderBar';
	Header.style.width = width + 'px';
	Header.innerHTML = '<img src="resource/image/logo.png" id="LogoImage"/>' +
			'<div id="PageTitle">' +
			'	<h1>SJL API Viewer</h1>' +
			'</div>';


	Header.setAttribute('Position','top-left');
	Header.setAttribute('StackType','bottomOf');
	Page.appendChild(Header);

	var Body = new com.mislabeled.ui.layout.container();
	Body.SetLayout(com.mislabeled.ui.layout.point.control);
	Body.setAttribute('Position','top-left');
	Body.setAttribute('StackType','bottomOf');
	Page.appendChild(Body);


	var Nav = document.createElement('div');
	Nav.id = 'NavBar';
	Nav.style.height = height - Header.offsetHeight - 20 +'px';
	Nav.style.top = Header.offsetHeight+'px';
	Nav.setAttribute('Position', 'top-left');
	Nav.setAttribute('StackType','bottomOf');


	Body.appendChild(Nav);

	ClassInfoPane = document.createElement('div');
	ClassInfoPane.id = "ClassInfoPane";
	ClassInfoPane.style.width = width - Nav.offsetWidth - 20 +'px';
	ClassInfoPane.style.height = height - Header.offsetHeight +'px';
	ClassInfoPane.style.top = Header.offsetHeight+'px';
	ClassInfoPane.setAttribute("Position","top-left");
	ClassInfoPane.setAttribute('StackType','rightOf');

	Body.appendChild(ClassInfoPane);

	var p = new com.mislabeled.xml.xsl.Processor();
	p.importStylesheet(this.PackagesXSL);
	var b = p.transformToFragment(this.APIDoc, document);
	Nav.appendChild(b);

	p.reset();
	p.importStylesheet(this.ClassesXSL);
	var a = p.transformToFragment(this.APIDoc, document);
	Nav.appendChild(a);

	var onResize = function()
	{
		var width = (document.all)?document.body.clientWidth:window.innerWidth;
		var height = (document.all)?document.body.clientHeight:window.innerHeight;

		Header.style.width = Page.style.width = width+'px';
		Nav.style.height = height - Header.offsetHeight - 20 + 'px';
		ClassInfoPane.style.width = width - Nav.offsetWidth - 20 + 'px';
		ClassInfoPane.style.height = height - Header.offsetHeight + 'px';
	}

	window.addDOMListener('resize',onResize,false);

	p.reset();
	p = null;
}

com.mislabeled.application.program.APIViewer.prototype.DisplayHome = function()
{
	var ClassInfoPane = document.getElementById('ClassInfoPane');

	ClassInfoPane.innerHTML = '<h2><span class="ClassName">Welcome</span></h2>' +
			'Please use the navigation on the left to browse packages and classes.  Note that some ' +
			'"packages" are also instantiable classes.  If a "package" is actually an instantiable class ' +
			'you will be able to click on the name of the package and view the documentation for it.';
	ClassInfoPane = null;
}

com.mislabeled.application.program.APIViewer.prototype.UpdateClassInfo = function(className,cancelBubble)
{
	if (!cancelBubble)
	{
		BrowserHistory.add(className);
	}

	var ClassInfoPane = document.getElementById('ClassInfoPane');
	var p = new com.mislabeled.xml.xsl.Processor();
	p.importStylesheet(this.ClassInfoXSL);

	var query = '/javascript/classes/class[@name="'+className+'"]';
	var frag = this.APIDoc.evaluate(query, this.APIDoc, null, XPathResult.ANY_TYPE, null).iterateNext();
	//var frag = this.APIDoc.selectSingleNode(query);
	//alert(frag);

	ClassInfoPane.scrollTop = 0;

	var a = p.transformToFragment(frag, document);
	ClassInfoPane.innerHTML = '';
	ClassInfoPane.appendChild(a);

	ClassInfoPane = null;
	query = null;
	frag = null;
	p = null;
}