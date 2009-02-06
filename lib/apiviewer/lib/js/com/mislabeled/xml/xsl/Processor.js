// TODO: Add logic to only include compat libraries for browsers that will need them

if(document.all)
{
	var libpath = (window.DocRoot)?window.DocRoot+"/lib/js":"lib/js";
	Load(libpath+"/sarissa.js");
	Load(libpath+"/javeline_xpath.js");
	Load(libpath+"/javeline_xslt.js");
	Load(libpath+"/sarissa_dhtml.js");
	Load(libpath+"/sarissa_ieemu_load.js");
	Load(libpath+"/sarissa_ieemu_xpath.js");
	Load(libpath+"/sarissa_ieemu_xslt.js");
}

Namespace("com.mislabeled.xml.xsl");

// TODO: Implement wrapping for browsers that don't provide XSLTProcessor
/**
 * To enable cross browser compatability we should consider Sarissa (http://sarissa.sourceforge.net)
 * or for an even lighter approach directly use Javeline (http://developer.javeline.com/)
 *
 * Also consider for Xpath implementation
 */

/**
 * Creates an instance of the XSLT Processor
 *
 * @class Processor is a generic wrapper implemented against Mozilla's
 * XSLTProcessor and serves to abstract the variants in XSLT
 * implementation across browsers.
 *
 * @constructor
 * @author Danny Graham
 */
com.mislabeled.xml.xsl.Processor = Class.create();
com.mislabeled.xml.xsl.Processor.prototype.initialize = function()
{
	/**
	 * Internal reference to the native browser or fallback
	 * implementation of the XSL engine.
	 *
	 * @protected
	 * @type mixed
	 */
	this.xslProcessor = new XSLTProcessor();
}

/**
 * Removes all set parameters from this Processor. This will make the
 * processor use the default value for all parameters as specified
 * in the stylesheet.
 *
 * @return Void
 * @type void
 */
com.mislabeled.xml.xsl.Processor.prototype.clearParameters = function()
{
	this.xslProcessor.clearParameters();
}

/**
 * Gets a parameter if previously set by setParameter. Returns null
 * otherwise.
 *
 * @param {String} namespaceURI The namespaceURI of the XSLT parameter
 * @param {String} localName The local name of the XSLT parameter
 *
 * @return The value of the XSLT parameter
 * @type nsIVariant
 */
com.mislabeled.xml.xsl.Processor.prototype.getParameter = function(namespaceURI, localName)
{
	return this.xslProcessor.getParameter(namespaceURI, localName);
}

/**
 * Import the stylesheet into this Processor for transformations
 *
 * @param {Node} style The root-node of a XSLT stylesheet. This can be
 * either a document node or an element node. If a document node then
 * the document can contain either a XSLT stylesheet or a LRE
 * stylesheet. If the argument is an element node it must be the
 * xsl:stylesheet (or xsl:transform) element of an XSLT stylesheet.
 *
 * @return Void
 * @type void
 */
com.mislabeled.xml.xsl.Processor.prototype.importStylesheet = function(style)
{
	this.xslProcessor.importStylesheet(style);
}

/**
 * Removes a parameter, if set.  this will make the processor use the
 * default value for the parameter as specified in the stylesheet.
 *
 * @param {String} namespaceURI The namespaceURI of the XSLT parameter
 * @param {String} localName The local name of the XSLT parameter
 *
 * @return Void
 * @type void
 */
com.mislabeled.xml.xsl.Processor.prototype.removeParameter = function(namespaceURI, localName)
{
	this.xslProcessor.removeParameter(namespaceURI, localName);
}

/**
 * Remove all parameters and stylesheets from this Processor.
 *
 * @return Void
 * @type void
 */
com.mislabeled.xml.xsl.Processor.prototype.reset = function()
{
	if (typeof this.xslProcessor.reset != 'undefined') this.xslProcessor.reset();
}

/**
 * Sets a parameter to be used in subsequent transformations with this
 * processor.  If the parameter doesn't exist in the stylesheet the
 * parameter will be ignored.
 *
 * @param {String} namespaceURI The namespaceURI of the XSLT parameter
 * @param {String} localName The local name of the XSLT parameter
 * @param {nsIVariant} the new value of the XSLT parameter
 *
 * @return Void
 * @type void
 */
com.mislabeled.xml.xsl.Processor.prototype.setParameter = function(namespaceURI, localName, value)
{
	return this.xslProcessor.setParameter(namespaceURI, localName, value);
}

/**
 * Transforms the node source applying the stylesheet given by the
 * importStyleSheet() function.
 *
 * @param {Node} source The node to be transformed
 *
 * @return The result of the transformation
 * @type Document
 */
com.mislabeled.xml.xsl.Processor.prototype.transformToDocument = function(source)
{
	return this.xslProcessor.transformToDocument(source);
}

/**
 * Transforms the node source applying the stylesheet given by the
 * importStyleSheet() function. The owner document of the output
 * node owns the returned document fragment.
 *
 * @param {Node} source The node to be transformed
 * @param {Document} output This document is used to generate the output
 *
 * @return The result of the transformation
 * @type DocumentFragment
 */
com.mislabeled.xml.xsl.Processor.prototype.transformToFragment = function(source, output)
{
	return this.xslProcessor.transformToFragment(source, output);
}