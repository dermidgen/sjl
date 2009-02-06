/**
 * @fileoverview Here we seek to extend the JavaScript language a bit for our OOP needs.
 * It should be noted that we're a bit unconventional here.  What we're calling inherits
 * should be more properly named mixin, but we liked the sound of inherits better cause
 * we're dorks.
 */
/**
 * Allows a class to inherit the methods of an external class without actually extending it
 * Provides an interface/implements of sorts
 *
 * Methods may still be overloaded but are defined in extern
 * Only static methods/properties will be inherited
 *
 * @addon
 */
Function.prototype.inherits = function(obj) {
	obj = eval(obj);
	for (var property in obj)
	{
		this.prototype[property] = obj[property];
	}
}

/**
 * Allows a class to inherit the methods of an external class without actually extending it
 * Provides an interface/implements of sorts
 *
 * Methods may still be overloaded but are defined in extern
 * Only static methods/properties will be inherited
 *
 * @addon
 */
Object.prototype.inherits = function(obj) {
	obj = eval(obj);
	for (var property in obj)
	{
		this.prototype[property] = obj[property];
	}
}

/**
 * Allows a class to inherit the methods of an external class without actually extending it
 * Provides an interface/implements of sorts
 *
 * Methods may still be overloaded but are defined in extern
 * Only static methods/properties will be inherited
 *
 * @addon
 */
Function.prototype.extend = function(parent) {
	this.prototype.__construct = function()
	{
		var returnDOM = function(p)
		{
			p.isDOM = true;
			p._parent = {};

			// Backup Methods (to catch protected methods)
			for (var property in p)
			{
				if (typeof p[property] == 'function') p._parent[property] = p[property];
			}

			for (var property in this)
			{
				try {
					p[property] = this[property];
				} catch (e) {}
			}
			return p;
		};

		var returnObject = function(p)
		{
			this._parent = p;
			for (var property in p)
			{
				if (!this[property]) this[property] = this._parent[property];
			}
			return this;
		};

		if (parent.indexOf('mislabeled') == -1)
		{
			return returnDOM.apply(this, [document.createElement(parent)]);
		}
		else
		{
			var p = eval('new '+parent+'();');

			return (p.isDOM) ? returnDOM.apply(this,[p]) : returnObject.apply(this,[p]);
		}
	}
}

/**
 * Allows a class to inherit the methods of an external class without actually extending it
 * Provides an interface/implements of sorts
 *
 * Methods may still be overloaded but are defined in extern
 * Only static methods/properties will be inherited
 *
 * @addon
 */
Object.prototype.extend = function(destination, source) {
  for (var property in source) {
    try {
      destination[property] = source[property];
    } catch (e) {}
  }
  return destination;
}


/**
 * @class Class
 */
var Class = {
  create: function(obj) {
    return function() {

    	if (this.__construct)
    	{
			var instance = this.__construct.apply(this, arguments);

			if (this.initialize && instance) this.initialize.apply(instance, arguments);
			else if (this.initialize) this.initialize.apply(this, arguments);

			if (instance) return instance;
			else return this;
    	}
		if (this.initialize) this.initialize.apply(this, arguments);

    }
  }
}
