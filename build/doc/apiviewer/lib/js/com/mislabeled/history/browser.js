Namespace("com.mislabeled.history");

/**
 * Implements Browser History and Back Button Support
 *
 * @class This is the basic browser history managment class.  It supports
 * back button compatability across browsers.
 * <br><br>
 * This class is a port of RSH (Really Simple History Framework) to mislabeled
 * <br><br>
 * Copyright (c) 2005, Brad Neuberg, <a href="mailto:bkn3@columbia.edu">bkn3@columbia.edu</a>
   <a href="http://codinginparadise.org" target="_blank">http://codinginparadise.org</a>
 * <br><br>
   Permission is hereby granted, free of charge, to any person obtaining
   a copy of this software and associated documentation files (the "Software"),
   to deal in the Software without restriction, including without limitation
   the rights to use, copy, modify, merge, publish, distribute, sublicense,
   and/or sell copies of the Software, and to permit persons to whom the
   Software is furnished to do so, subject to the following conditions:
 * <br><br>
   The above copyright notice and this permission notice shall be
   included in all copies or substantial portions of the Software.
 *
 * @constructor
 * @author Danny Graham
 */
com.mislabeled.history.browser = Class.create();

com.mislabeled.history.browser.prototype.initialize = function()
{
	this.initialHref = window.location.href;
	this.initialHash = window.location.hash;

	this.history = [];
	this.currentIndex;

	this.historyTarget;

	// TODO: Implement global browser detection


	//if (!ISIE()) return;

}