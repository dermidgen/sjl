Namespace('com.sjl.test');

Import('com.sjl.test.loadingBox');

com.sjl.test.contentBox4 = Class.create();
com.sjl.test.contentBox4.extend('com.sjl.test.loadingBox');
com.sjl.test.contentBox4.prototype.initialize = function()
{
	this.innerHTML += ' - Love, ContentBox4';
};