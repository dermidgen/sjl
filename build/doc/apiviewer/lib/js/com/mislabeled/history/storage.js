Namespace("com.mislabeled.history");

/**
 * @class Stores the history states of the application as a user interacts
 * @static
 * @author Danny Graham
 */

com.mislabeled.history.storage = function(){};
com.mislabeled.history.storage.prototype = 
{
	pages: []
}
com.mislabeled.history.storage = new com.mislabeled.history.storage;