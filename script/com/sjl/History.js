/**
   Copyright (c) 2005, Brad Neuberg, bkn3@columbia.edu
   http://codinginparadise.org

   Permission is hereby granted, free of charge, to any person obtaining
   a copy of this software and associated documentation files (the "Software"),
   to deal in the Software without restriction, including without limitation
   the rights to use, copy, modify, merge, publish, distribute, sublicense,
   and/or sell copies of the Software, and to permit persons to whom the
   Software is furnished to do so, subject to the following conditions:

   The above copyright notice and this permission notice shall be
   included in all copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
   EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
   OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
   IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
   CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
   OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
   THE USE OR OTHER DEALINGS IN THE SOFTWARE.

   The JSON class near the end of this file is
   Copyright 2005, JSON.org
*/

/**
 * Changes and modifications for sjl
 * 
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


/** An object that provides DHTML history, history data, and bookmarking
    for AJAX applications. */
BrowserHistory = {

	__events: {},
	__event: function(Type)
	{
		var eventID = 1;
		var o = {
			id: eventID,
			name: Type,
			listeners: []
		};
		return o;
	},
	__dispatchQueue: function(data)
	{
		 var name = data.type;
		 var event = this.__events[name];
		 if(!event) return;

		 for(var i=0; i < event.listeners.length; i++)
		 {
		 	var proc = event.listeners[i][name];
		 	proc(data);
		 }
	},
	__removeListener: function(type, listener)
	{
		var event = this.__events[type];
		if(event)
		{
			for (var i in event.listeners)
			{
				if(event.listeners[i] == listener)
				{
					event.listeners.splice(i, 1);
				}
			}
		}
	},
	__addEventType: function(type)
	{
		if (!this.__events[type]) this.__events[type] = this.__event(type);
	},
	__checkListener: function(event, obj)
	{
		var listeners = this.__events[event].listeners;
		for(var i=0; i < listeners.length; i++)
		{
			if(listeners[i] == obj) return true;
		}
		return false;
	},
	dispatch: function(data)
	{
		this.__dispatchQueue(data);
	},
	addListener: function(event,obj)
	{
		this.__addEventType(event);
		if(!this.__checkListener(event, obj)) this.__events[event].listeners.push(obj);

		if (this.fireOnNewListener == true)
		{
			this.fireHistoryEvent(this.currentLocation);
			this.fireOnNewListener = false;
		}
	},
	removeListener: function(type, listener)
	{
		this.__removeListener(type, listener);
	},

	firstLoad: null,
	ieDebug: null,
	iframe: null,
	ignoreLocationChange: false,
	ieAtomicLocationChange: false,
	currentWaitTime: 0,
	WAIT_TIME: 200,
	IE_UPDATE: true,

	CurrentURI: null,
	LastURI: null,

	initialize: function()
	{
		// Setup browser types through object detection
		window.xpath = !!(document.evaluate);
		if (window.ActiveXObject) window.ie = window[window.XMLHttpRequest ? 'ie7' : 'ie6'] = true;
		else if (document.childNodes && !document.all && !navigator.taintEnabled) window.webkit = window[window.xpath ? 'webkit420' : 'webkit419'] = true;
		else if (document.getBoxObjectFor != null) window.gecko = true;

		this.ieDebugLog = function(strLog)
		{
			if (!this.ieDebug) this.ieDebug = window.open('about:blank','IEDebug');
			this.ieDebug.document.writeln(strLog + '<br>');
		}

		this.create();

		if (window.ie) return;
	},

	create: function()
	{
		var initialHash = this.getCurrentLocation();
		this.CurrentURI = initialHash;

		if (window.ie && !this.iframe)
		{
			this.iframe = document.createElement('iframe');
			with (this.iframe.style)
			{
				position = 'absolute';
				top = '-10000px';
				left = '-10000px';
				display = 'none';
			}
			this.iframe.src = 'blank.html';
			document.body.appendChild(this.iframe);

			this.WAIT_TIME = 400;
		}

		if (window.webkit && !this.form)
		{
			this.form = document.createElement('form');
			this.form.setAttribute('method','get');
			document.body.appendChild(this.form);
		}

		this.ignoreLocationChange = (window.ie) ? true : false;
		this.firstLoad = true;

		var self = this;
		var locationCheck = function()
		{
			self.checkLocation();
		}
		setInterval(locationCheck, 100);
	},

	checkLocation: function()
	{
		if (!window.ie && this.ignoreLocationChange == true)
		{
			this.ignoreLocationChange = false;
			return;
		}

		if (!window.ie && this.ieAtomicLocationChange == true) return;

		var hash = this.getCurrentLocation();
		if (hash == this.CurrentURI) return;

		this.ieAtomicLocationChange = true;

		if (window.ie && this.getIframeHash() != hash)
		{
			this.iframe.src = 'blank.html?'+hash;
		}
		else if (window.ie) return;

		this.CurrentURI = hash;

		this.ieAtomicLocationChange = false;

		this.fireHistoryEvent(hash);
	},

	fireHistoryEvent: function(hash)
	{
		this.dispatch({
			type:'onHistoryEvent',
			newURI: hash
		});
	},

	getIframeHash: function()
	{
		var doc = this.iframe.contentWindow.document;
		var hash = new String(doc.location.search);

		if (hash.length == 1 && hash.charAt(0) == "?") hash = "";
		else if (hash.length >= 2 && hash.charAt(0) == "?") hash = hash.substring(1);

		return hash;
	},

	getCurrentLocation: function()
	{
		return this.cleanHash(window.location.hash);
	},

	cleanHash: function(hash)
	{
		if (typeof hash == 'undefined' || hash == '') return '';

		hash = hash.substring(1);
		if (typeof hash == 'undefined' || hash == '') return '';

		return hash;
	},

	setHash: function(uri)
	{
		if (window.webkit)
		{
			this.form.setAttribute('action','#' + uri);
			this.form.submit();
		}
		else window.location.hash = uri;
	},

	add: function(uri)
	{
		var self = this;
		var addImpl = function()
		{
			if (self.currentWaitTime > 0) self.currentWaitTime = self.currentWaitTime - self.WAIT_TIME;

			var newLocation = self.cleanHash(uri);

//			this.ieDebugLog('Adding History Path: '+uri);

			self.dispatch({
				type: 'onHistoryAdd',
				newURI: uri
			});

			self.ignoreLocationChange = true;
			this.ieAtomicLocationChange = true;

			self.CurrentURI = uri;

			// TODO: Check for webkit - don't touch the hash in webkit browsers
			if (window.webkit && this.form)
			{
				this.form.setAttribute('action','#' + uri);
				this.form.submit();
			}
			else window.location.hash = uri;

			if (window.ie) self.iframe.src = 'blank.html?'+uri;

			this.ieAtomicLocationChange = false;
		}

		window.setTimeout(addImpl, this.currentWaitTime);

		this.currentWaitTime = this.currentWaitTime + this.WAIT_TIME;
	},

	iframeLoaded: function(newLocation)
	{
		if(this.ignoreLocationChange == true)
		{
			this.ignoreLocationChange = false;
			return;
		}

		var hash = new String(newLocation.search);
		if (hash.length == 1 && hash.charAt(0) == "?") hash = "";
		else if (hash.length >= 2 && hash.charAt(0) == "?") hash = hash.substring(1);

		if (this.pageLoadEvent != true) window.location.hash = hash;

		this.fireHistoryEvent(hash);
	},

	isFirstLoad: function()
	{

	      if (this.firstLoad == true) {
         return true;
      }
      else {
         return false;
      }
	}
}