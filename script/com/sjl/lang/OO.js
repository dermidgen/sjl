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

/*
Function.prototype.inherits = function(obj)
{
	this.__mixins.push(obj);
}
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
/*
Object.prototype.inherits = function(obj) {
	this.__mixins.push(obj);
}
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
/*
Function.prototype.extend = function(objParent) {

	this.__extends = objParent;

}
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
/*
Object.prototype.extend = function(destination, source) {
  for (var property in source) {
    try {
      destination[property] = source[property];
    } catch (e) {}
  }
  return destination;
}
*/

/**
 * @class Class
 */
var Class = {
	create: function(obj)
	{
		var newClass = function()
		{
			if (this.__construct)
			{
				var instance = this.__construct.apply(this, arguments);

				if (this.initialize && instance) this.initialize.apply(instance, arguments);
				else if (this.initialize) this.initialize.apply(this, arguments);

				if (instance) return instance;
				else return this;
			}
			if (this.initialize) this.initialize.apply(this, arguments);
		};


		newClass.__mixins = [];
		newClass.__interfaces = [];
		newClass.__extends = null;

		newClass.inherits = function(strObj)
		{
			this.__mixins.push(strObj);
		};
		
		newClass.mixin = newClass.inherits;

		newClass.implement = function(strObj)
		{
			this.__interfaces.push(strObj);
		}

		newClass.extend = function(strObj)
		{
			this.__extends = strObj;
		}

		newClass.prototype.__construct = function()
		{
			var InterfaceException = function(unsatisfiedProperty)
			{
				return 'Interface Dependency Not Satisfied: '+unsatisfiedProperty;
			}

			var returnDOM = function(p)
			{
				p.isDOM = true;
				p._parent = {};

				try{
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
				} catch (ee) {}
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

			var mixins = newClass.__mixins;
			var interfaces = newClass.__interfaces;
			var extentions = newClass.__extends;

			// Perform Mixin
			for(var i=0; i<newClass.__mixins.length; i++)
			{
				var mObj = eval('new '+newClass.__mixins[i]+'();');
				for (var property in mObj)
				{
					this[property] = mObj[property];
				}
			}

			// Perform Extensions
			if (newClass.__extends != null)
			{
				if (newClass.__extends.indexOf('com.') == -1)
				{
					var finalClass = returnDOM.apply(this, [document.createElement(newClass.__extends)]);
				}
				else
				{
					var p = eval('new '+newClass.__extends+'();');
					var finalClass = (p.isDOM) ? returnDOM.apply(this,[p]) : returnObject.apply(this,[p]);
				}
			}

			// Validate Interfaces
			for(var i=0; i<interfaces.length; i++)
			{
				var mObj = eval(interfaces[i]);
				for(var property in mObj)
				{
					if (typeof finalClass[property] == 'undefined') throw new InterfaceException(property);
				}
			}

			return finalClass;
		}

		return newClass;
	}
}
