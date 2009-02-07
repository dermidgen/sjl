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
Import("com.sjl.EventDispatcher");
Import("com.sjl.io.XMLHttpRequest");
Namespace("com.sjl.io");
com.sjl.io.Http=Class.create();
com.sjl.io.Http.inherits("com.sjl.EventDispatcher");
com.sjl.io.Http.prototype.initialize=function(_1){
var _2=new com.sjl.io.XMLHttpRequest();
var _3=null;
var _4=null;
var _5=null;
var _6=null;
var _7=null;
var _8=null;
var _9=null;
var _a=null;
this.contentType=null;
this.mimeType=null;
var _b=function(_c){
_3=_c.method||"GET";
_4=_c.url;
_5=_c.async||true;
_6=_c.username||null;
_7=_c.password||null;
_8=_c.headers||null;
_9=_c.payload||_c.sendData||_c.data||null;
_a=_c.loaded||null;
this.contentType=_c.contentType||"text/xml";
this.mimeType=_c.mimeType||null;
};
this._onreadystatechange=function(){
var _d;
switch(_2.readyState){
case 0:
_d="onInit";
break;
case 1:
_d="onOpen";
break;
case 2:
_d="onSend";
break;
case 3:
_d="onData";
break;
case 4:
_d="onLoad";
break;
default:
_d="onError";
break;
}
if(_a&&_d=="onLoad"){
_a(_2,_4);
}
this.dispatch({type:_d,xhr:_2,url:_4});
};
this.Open=function(){
_2.open(_3,_4,_5,_6,_7);
if(_8){
for(var i in _8){
if(_8.hasOwnProperty(i)){
_2.setRequestHeader(i,_8[i]);
}
}
}
if(document.all){
_2.onreadystatechange=this._onreadystatechange.bind(this);
}
};
this.Send=function(){
_2.send(_9);
};
this.Request=function(_f){
_b(_f);
this.Open();
this.Send();
};
if(!document.all){
_2.onreadystatechange=this._onreadystatechange.bind(this);
}
if(typeof (_1)=="undefined"){
return;
}
_b(_1);
this.Open();
this.Send();
};

