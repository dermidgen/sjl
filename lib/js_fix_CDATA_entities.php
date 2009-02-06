#!/usr/bin/php
<?
/**
 * This utility will clean the data within documentation output from JSDoc.
 * JSDoc keeps HTML from source comments and descriptions and wraps them in
 * CDATA to prevent them from invalidating the XML.  This is a generally bad
 * practice and causes problems for XSL engines that do not implement
 * disable-output-escaping. Here we target those sections and replace HTML
 * tags with XML encoded equivalents.
 *
 * This also updates the XML datasource in the API Viewer source tree
 *
 * @author Danny Graham
 */

define("DOCXML","./build/doc/jsdoc.xml");
define("OUTPUT","./build/doc/apiviewer/lib/xml/jsdoc.xml");

$jsdoc = new DOMDocument();
$jsdoc->load(DOCXML);
$jsdoc->save(DOCXML);

$jsdoc = new DOMDocument();
$jsdoc->load(DOCXML);

$xpath = new DOMXPath($jsdoc);

$result = $xpath->query("//text()");

foreach($result as $res)
{
	if ($res instanceof DOMCdataSection)
	{
		$value = $res->nodeValue;
		$parent = $res->parentNode;

		$hDoc = new DOMDocument();
		$hDoc->loadHTML($value);

		$xDoc = new DOMDocument();
		$xDoc->loadXML($hDoc->saveXML());

		$p = $jsdoc->importNode($xDoc->documentElement->firstChild->firstChild,true);

		$parent->replaceChild($p,$res);

	}
	$res->normalize();
}

$jsdoc->save(OUTPUT);

?>
