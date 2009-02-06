Namespace ("com.mislabeled");

/**
 * Interface for objects wishing to publish events
 *
 * @class com.mislabeled.EventDispatcher
 * @static
 * @author Scott Thundercloud
 */
com.mislabeled.EventDispatcher = function() {};
com.mislabeled.EventDispatcher.prototype = {
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
	},
	
	removeListener: function(type, listener)
	{
		this.__removeListener(type, listener);
	}
};
com.mislabeled.EventDispatcher = new com.mislabeled.EventDispatcher;