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
if(document.all){
Element=function(){
};
}
Element.prototype.addDOMListener=window.addDOMListener=function(_1,_2,_3){
if(this.addEventListener){
this.addEventListener(_1,_2,_3);
}else{
if(this.attachEvent){
this.attachEvent("on"+_1,_2);
}
}
};
Element.prototype.removeDOMListener=window.removeDOMListener=function(_4,_5,_6){
if(this.removeEventListener){
this.removeEventListener(_4,_5,_6);
}else{
if(this.detachEvent){
this.detachEvent("on"+_4,_5);
}
}
};
document.getElementsByAttribute=function(_7,_8,_9,_a){
var _b=(_8=="*"&&_7.all)?_7.all:_7.getElementsByTagName(_8);
var _c=new Array();
var _d=(typeof _a!="undefined")?new RegExp("(^|\\s)"+_a+"(\\s|$)","i"):null;
var _e;
var _f;
for(var i=0;i<_b.length;i++){
_e=_b[i];
_f=_e.getAttribute&&_e.getAttribute(_9);
if(typeof _f=="string"&&_f.length>0){
if(typeof _a=="undefined"||(_d&&_d.test(_f))){
_c.push(_e);
}
}
}
return _c;
};
if(document.all){
var all=[];
all["createElement"]=document.createElement;
all["getElementById"]=document.getElementById;
all["getElementsByTagName"]=document.getElementsByTagName;
scroller=function(){
if(document.documentElement){
window.scrollX=document.documentElement.scrollLeft;
window.scrollY=document.documentElement.scrollTop;
}
};
window.scrollX=document.documentElement.scrollLeft;
window.scrollY=document.documentElement.scrollTop;
document.documentElement.onscroll=function(){
scroller();
};
}

