Namespace('com.sjl.test');

Import('com.sjl.test.loadingBox');

com.sjl.test.contentBox1 = Class.create();
com.sjl.test.contentBox1.extend('com.sjl.test.loadingBox');
com.sjl.test.contentBox1.prototype.initialize = function()
{
	this.innerHTML += ' - Love, ContentBox1';
};