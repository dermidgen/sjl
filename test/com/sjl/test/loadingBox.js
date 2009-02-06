Namespace("com.sjl.test");

com.sjl.test.loadingBox = Class.create();
com.sjl.test.loadingBox.extend('div');
com.sjl.test.loadingBox.inherits('com.sjl.EventDispatcher');
com.sjl.test.loadingBox.prototype.initialize = function()
{
	this.innerHTML = 'Hello World';
	
	com.sjl.TearDown.AddDestructable(this);
};

com.sjl.test.loadingBox.prototype.Destroy = function()
{
	
};