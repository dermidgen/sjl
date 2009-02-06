Namespace("com.sjl");
com.sjl.EventDispatcher=function(){
this.__events={};
};
com.sjl.EventDispatcher.prototype={__event:function(_1){
var _2=1;
var o={id:_2,name:_1,listeners:[]};
return o;
},__dispatchQueue:function(_4){
var _5=_4.type;
var _6=this.__events[_5];
if(!_6){
return;
}
for(var i=0;i<_6.listeners.length;i++){
var _8=(_6.listeners[i][_5])?(_6.listeners[i][_5]):_6.listeners[i];
_8(_4);
}
},__removeListener:function(_9,_a){
var _b=this.__events[_9];
if(_b){
for(var i in _b.listeners){
if(_b.listeners[i]==_a){
_b.listeners.splice(i,1);
}
}
}
},__addEventType:function(_d){
if(!this.__events[_d]){
this.__events[_d]=this.__event(_d);
}
},__checkListener:function(_e,_f){
var _10=this.__events[_e].listeners;
for(var i=0;i<_10.length;i++){
if(_10[i]==_f){
return true;
}
}
return false;
},dispatch:function(_12){
this.__dispatchQueue(_12);
},addListener:function(_13,obj){
this.__addEventType(_13);
if(!this.__checkListener(_13,obj)){
this.__events[_13].listeners.push(obj);
}
},removeListener:function(_15,_16){
this.__removeListener(_15,_16);
}};

