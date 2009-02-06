Namespace('com.sjl.test');

Import('com.sjl.test.loadingBox');

com.sjl.test.contentBox3 = Class.create();
com.sjl.test.contentBox3.extend('com.sjl.test.loadingBox');
com.sjl.test.contentBox3.prototype.initialize = function()
{
	this.innerHTML += ' - Love, ContentBox3';
};