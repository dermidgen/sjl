Import("com.mislabeled.ui.tabcontrol.tab");
Import("com.mislabeled.ui.tabcontrol.content");
Import("com.mislabeled.EventDispatcher");

Namespace("com.mislabeled.ui.tabcontrol");

/**
 * Creates a tab container
 * @class Tab Container
 * @author Scott Thundercloud
 * @constructor
 */

com.mislabeled.ui.tabcontrol.tabpanel = Class.create();
com.mislabeled.ui.tabcontrol.tabpanel.extend("div");
com.mislabeled.ui.tabcontrol.tabpanel.inherits(com.mislabeled.EventDispatcher);
com.mislabeled.ui.tabcontrol.tabpanel.prototype.initialize = function(obj)
{
	var e = {};

	/**
	 * Stores tab handles
	 * @type Array
	 * @private
	 */
	this.tabs = [];




	this.appendTab = function(tab)
	{
		this.tabContainer.appendChild(tab);
	};

	this.displayTabs = function()
	{
		for(var i=0; i < this.tabs.length; i++)
		{
			if(i==0 && !this.tabs[i].called) this.tabs[i].select(this.tabs[i]);
			this.appendTab(this.tabs[i]);

		}
	};

	this.appendContentContainer = function(container)
	{
		this.contentContainer.appendChild(container);
	}

	this.createContentContainer = function()
	{
		var contentContainer = new com.mislabeled.ui.tabcontrol.content();
		contentContainer.returnContainer();
	}

	this.initialBuild = function()
	{
		with(this.style)
		{
			background = "black";
			width = "100%";
			height = "100%";
		}

		this.tabContainer = document.createElement("div");
		this.tabContainer.style.width = "100%";
		this.tabContainer.style.height = "25px";
		this.tabContainer.style.background = "green";
		this.contentContainer = document.createElement("div");
		this.appendChild(this.tabContainer);
		this.appendChild(this.contentContainer);
		document.body.appendChild(this);

		this.createIframeShat();
	}

	this.ontabdestroy = function(obj)
	{
		for(var i=0; i < this.tabs.length; i++)
		{
			if(this.tabs[i] == obj.tab)
			{
				if(this.tabs[i+1] && this.tabs[i].selected == true)
				{
					this.tabs[i+1].select();
				}
				else if(this.tabs[i-1] && this.tabs[i].selected == true)
				{
					this.tabs[i-1].select();
				}
				this.tabs.splice(i, 1);
			}
		}
	}

	e.tabondestroy = this.ontabdestroy.bind(this);

	this.addListener("tabondestroy", e);
	this.initialBuild();
}

// Used for testing
com.mislabeled.ui.tabcontrol.tabpanel.prototype.createIframeShat = function()
{
	var iframe = document.createElement("iframe");
	with(iframe.style)
	{
		width = "1000px";
		height = "1000px";
	}
	iframe.src = "http://www.levid.com";
	this.addNewTab(this.contentContainer , "Levid", iframe);
	var iframe = document.createElement("iframe");
	with(iframe.style)
	{
		width = "1000px";
		height = "1000px";
	}

	iframe.src = "http://www.mislabeled.com";
	this.addNewTab(this.contentContainer, "Mislabeled", iframe);
	this.displayTabs();
}

com.mislabeled.ui.tabcontrol.tabpanel.prototype.addNewTab = function(Self, Value, Content)
{
	var tab = new com.mislabeled.ui.tabcontrol.tab(Self, Value, Content);
	this.tabs.push(tab);
}