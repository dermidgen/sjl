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
Function.prototype.bind=function(_1){
var _2=this;
return function(){
return _2.apply(_1,arguments);
};
};
if(!Array.forEach){
Array.forEach=function(_3,_4,_5){
for(var i=0;i<_3.length;i++){
_4.call(_5,_3[i],i,_3);
}
};
}
Function.prototype.forEach=function(_7,_8,_9){
for(var _a in _7){
if(typeof this.prototype[_a]=="undefined"){
_8.call(_9,_7[_a],_a,_7);
}
}
};
String.forEach=function(_b,_c,_d){
Array.forEach(_b.split(""),function(_e,_f){
_c.call(_d,_e,_f,_b);
});
};
var forEach=function(_10,_11,_12){
if(_10){
var _13=Object;
if(_10 instanceof Function){
_13=Function;
}else{
if(_10.forEach instanceof Function){
_10.forEach(_11,_12);
return;
}else{
if(typeof _10=="string"){
_13=String;
}else{
if(typeof _10.length=="number"){
_13=Array;
}
}
}
}
_13.forEach(_10,_11,_12);
}
};
if(!Array.indexOf){
Array.prototype.indexOf=function(_14,_15){
_15=_15?_15:0;
for(var i=_15;i<this.length;i++){
if(this[i]==_14){
return i;
}
}
return -1;
};
}
if(!Array.remove){
Array.prototype.remove=function(_17,to){
var _19=this.slice((to||_17)+1||this.length);
this.length=_17<0?this.length+_17:_17;
return this.push.apply(this,_19);
};
}
if(!Object.hasProperty){
Object.prototype.hasProperty=function(_1a){
for(var i in this){
if(this.hasOwnProperty(i)){
if(typeof this[i]!="undefined"){
return true;
}
}
}
};
}

