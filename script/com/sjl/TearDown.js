Namespace("com.sjl");

/**
 * Implements garbage collection
 *
 * @class Runs the global garbage collector
 * @static
 * @author Danny Graham
 */
com.sjl.TearDown = {
	Destructables: [],
	AddDestructable: function(oDestructable)
	{
		this.Destructables.push(oDestructable);
	},
	Destruct: function()
	{
		for(var i=0; i<this.Destructables.length; i++)
		{
			this.Destructables[i].Destroy();
		}
	}
}