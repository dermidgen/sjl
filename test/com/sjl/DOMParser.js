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
Namespace("com.sjl");
com.sjl.DOMParser=Class.create();
com.sjl.DOMParser.prototype.initialize=function(){
};
com.sjl.DOMParser.prototype.parseDOM=function(_1){
var _2=(_1)?_1:document;
var _3=[];
_3=document.getElementsByAttribute(_2,"div","parseas");
_3=_3.concat(document.getElementsByAttribute(_2,"button","parseas"));
var _4=[];
var _5=[];
for(var i=0;i<_3.length;i++){
var _7=_3[i].getAttribute("parseas");
_4.push(Array(_7,_3[i]));
_5.push(_7);
}
var _8=function(_9,_a){
var _b="";
var _c=_a.childNodes;
if(_c.length==1){
_b="\""+_c[0].nodeValue+"\"";
}
var _d=eval("new "+_9+"("+_b+");");
var _e=_a.parentNode;
_e.replaceChild(_d,_a);
};
var e={};
e.oncomplete=function(p){
com.sjl.io.ResourceLoader.GetInstance().removeListener("oncomplete",e);
for(var i=0;i<_4.length;i++){
_8(_4[i][0],_4[i][1]);
}
};
com.sjl.io.ResourceLoader.GetInstance().addListener("oncomplete",e);
Import(_5);
};
com.sjl.DOMParser.__instance=null;
com.sjl.DOMParser.GetInstance=function(){
if(com.sjl.DOMParser.__instance==null){
com.sjl.DOMParser.__instance=new com.sjl.DOMParser();
}
return com.sjl.DOMParser.__instance;
};

