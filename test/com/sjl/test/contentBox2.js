Namespace('com.sjl.test');

Import('com.sjl.test.loadingBox');

com.sjl.test.contentBox2 = Class.create();
com.sjl.test.contentBox2.extend('com.sjl.test.loadingBox');
com.sjl.test.contentBox2.prototype.initialize = function()
{
	this.innerHTML += ' - Love, ContentBox2';
};