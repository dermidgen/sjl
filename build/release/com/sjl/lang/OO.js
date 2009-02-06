var Class={create:function(_1){
var _2=function(){
if(this.__construct){
var _3=this.__construct.apply(this,arguments);
if(this.initialize&&_3){
this.initialize.apply(_3,arguments);
}else{
if(this.initialize){
this.initialize.apply(this,arguments);
}
}
if(_3){
return _3;
}else{
return this;
}
}
if(this.initialize){
this.initialize.apply(this,arguments);
}
};
_2.__mixins=[];
_2.__interfaces=[];
_2.__extends=null;
_2.inherits=function(_4){
this.__mixins.push(_4);
};
_2.mixin=_2.inherits;
_2.implement=function(_5){
this.__interfaces.push(_5);
};
_2.extend=function(_6){
this.__extends=_6;
};
_2.prototype.__construct=function(){
var _7=function(_8){
return "Interface Dependency Not Satisfied: "+_8;
};
var _9=function(p){
p.isDOM=true;
p._parent={};
try{
for(var _b in p){
if(typeof p[_b]=="function"){
p._parent[_b]=p[_b];
}
}
for(var _b in this){
try{
p[_b]=this[_b];
}
catch(e){
}
}
}
catch(ee){
}
return p;
};
var _c=function(p){
this._parent=p;
for(var _e in p){
if(!this[_e]){
this[_e]=this._parent[_e];
}
}
return this;
};
var _f=_2.__mixins;
var _10=_2.__interfaces;
var _11=_2.__extends;
for(var i=0;i<_2.__mixins.length;i++){
var _13=eval("new "+_2.__mixins[i]+"();");
for(var _14 in _13){
this[_14]=_13[_14];
}
}
if(_2.__extends!=null){
if(_2.__extends.indexOf("com.")==-1){
var _15=_9.apply(this,[document.createElement(_2.__extends)]);
}else{
var p=eval("new "+_2.__extends+"();");
var _15=(p.isDOM)?_9.apply(this,[p]):_c.apply(this,[p]);
}
}
for(var i=0;i<_10.length;i++){
var _13=eval(_10[i]);
for(var _14 in _13){
if(typeof _15[_14]=="undefined"){
throw new _7(_14);
}
}
}
return _15;
};
return _2;
}};

