/**
 * Standard JavaScript Library
 *
 * LICENSE
 *
 * This source file is subject to the sjl Public License license that
 * is bundled with this package in the file LICENSE.txt.
 *
 * @license http://www.opensource.org/licenses/bsd-license.php New BSD License
 * @copyright Copyright (c) 2008, Danny Graham, Scott Thundercloud
 */
Namespace("com.sjl.io");
Import("com.sjl.application.Environment");
com.sjl.io.XMLHttpRequest=Class.create();
com.sjl.io.XMLHttpRequest.prototype.__construct=function(){
var _1;
var e=com.sjl.application.Environment.GetInstance();
if(e.Browser!="IE"){
_1=new XMLHttpRequest();
}else{
try{
_1=new ActiveXObject("Msxml2.XMLHTTP.4.0");
}
catch(e){
try{
_1=new ActiveXObject("Msxml2.XMLHttp.3.0");
}
catch(e){
try{
_1=new ActiveXObject("Msxml2.XMLHttp");
}
catch(e){
try{
_1=new ActiveXObject("Microsoft.XMLHttp");
}
catch(e){
_1=false;
}
}
}
}
}
return _1;
};

