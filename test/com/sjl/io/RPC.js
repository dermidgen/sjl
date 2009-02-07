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
Import("com.sjl.io.Http");
Namespace("com.sjl.io");
com.sjl.io.RPC=Class.create();
com.sjl.io.RPC.inherits("com.sjl.EventDispatcher");
com.sjl.io.RPC.prototype.initialize=function(){
var _1=null;
var _2=null;
var _3=function(){
var _4="A";
_4+="ut";
_4+="hT";
_4+="oke";
_4+="n";
return _4;
};
var _5=function(_6){
var _7="";
for(var i in _6){
if(_6.hasOwnProperty(i)){
_7+="&"+i+"="+_6[i];
}
}
return _7;
};
this.Call=function(_9,_a,_b){
if(!_b){
_b="GET";
}
var _c="/api/rest/";
var _d=function(_e){
this.dispatch({type:"onLoad",method:_9,xhr:_e});
};
if(_b!="POST"){
var _f=_c+"?";
_f+="MethodName="+_9;
if(_a){
_f+=_5(_a);
}
var _10={method:_b,url:_f,loaded:_d.bind(this)};
}else{
var _f=_c;
var _11="MethodName="+_9;
if(_a){
_11+=_5(_a);
}
var _12={"Content-Type":"application/x-www-form-urlencoded"};
var _10={method:_b,url:_f,headers:_12,payload:_11,loaded:_d.bind(this)};
}
var xhr=new com.sjl.io.Http(_10);
};
};

