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
if(_2.__extends.indexOf("mislabeled")==-1){
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
if(!Object.hasProperty){
Object.prototype.hasProperty=function(_17){
for(var i in this){
if(this.hasOwnProperty(i)){
if(typeof this[i]!="undefined"){
return true;
}
}
}
};
}

if(!Object.prototype.toJSONString){
Array.prototype.toJSONString=function(){
var a=[],i,l=this.length,v;
for(i=0;i<l;i+=1){
v=this[i];
switch(typeof v){
case "object":
if(v){
if(typeof v.toJSONString==="function"){
a.push(v.toJSONString());
}
}else{
a.push("null");
}
break;
case "string":
case "number":
case "boolean":
a.push(v.toJSONString());
}
}
return "["+a.join(",")+"]";
};
Boolean.prototype.toJSONString=function(){
return String(this);
};
Date.prototype.toJSONString=function(){
function f(n){
return n<10?"0"+n:n;
}
return "\""+this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z\"";
};
Number.prototype.toJSONString=function(){
return isFinite(this)?String(this):"null";
};
Object.prototype.toJSONString=function(){
var a=[],k,v;
for(k in this){
if(typeof k==="string"&&this.hasOwnProperty(k)){
v=this[k];
switch(typeof v){
case "object":
if(v){
if(typeof v.toJSONString==="function"){
a.push(k.toJSONString()+":"+v.toJSONString());
}
}else{
a.push(k.toJSONString()+":null");
}
break;
case "string":
case "number":
case "boolean":
a.push(k.toJSONString()+":"+v.toJSONString());
}
}
}
return "{"+a.join(",")+"}";
};
(function(s){
var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\"":"\\\"","\\":"\\\\"};
s.parseJSON=function(_b){
var j;
function walk(k,v){
var i;
if(v&&typeof v==="object"){
for(i in v){
if(v.hasOwnProperty(i)){
v[i]=walk(i,v[i]);
}
}
}
return _b(k,v);
}
if(/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/.test(this.replace(/\\./g,"@").replace(/"[^"\\\n\r]*"/g,""))){
j=eval("("+this+")");
return typeof _b==="function"?walk("",j):j;
}
throw new SyntaxError("parseJSON");
};
s.toJSONString=function(){
if(/["\\\x00-\x1f]/.test(this)){
return "\""+this.replace(/([\x00-\x1f\\"])/g,function(a,b){
var c=m[b];
if(c){
return c;
}
c=b.charCodeAt();
return "\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16);
})+"\"";
}
return "\""+this+"\"";
};
})(String.prototype);
}

BrowserHistory={__events:{},__event:function(_1){
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
var _8=_6.listeners[i][_5];
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
if(this.fireOnNewListener==true){
this.fireHistoryEvent(this.currentLocation);
this.fireOnNewListener=false;
}
},removeListener:function(_15,_16){
this.__removeListener(_15,_16);
},firstLoad:null,ieDebug:null,iframe:null,ignoreLocationChange:false,ieAtomicLocationChange:false,currentWaitTime:0,WAIT_TIME:200,IE_UPDATE:true,CurrentURI:null,LastURI:null,initialize:function(){
window.xpath=!!(document.evaluate);
if(window.ActiveXObject){
window.ie=window[window.XMLHttpRequest?"ie7":"ie6"]=true;
}else{
if(document.childNodes&&!document.all&&!navigator.taintEnabled){
window.webkit=window[window.xpath?"webkit420":"webkit419"]=true;
}else{
if(document.getBoxObjectFor!=null){
window.gecko=true;
}
}
}
this.ieDebugLog=function(_17){
if(!this.ieDebug){
this.ieDebug=window.open("about:blank","IEDebug");
}
this.ieDebug.document.writeln(_17+"<br>");
};
this.create();
if(window.ie){
return;
}
},create:function(){
var _18=this.getCurrentLocation();
this.CurrentURI=_18;
if(window.ie&&!this.iframe){
this.iframe=document.createElement("iframe");
with(this.iframe.style){
position="absolute";
top="-10000px";
left="-10000px";
display="none";
}
this.iframe.src="blank.html";
document.body.appendChild(this.iframe);
this.WAIT_TIME=400;
}
if(window.webkit&&!this.form){
this.form=document.createElement("form");
this.form.setAttribute("method","get");
document.body.appendChild(this.form);
}
this.ignoreLocationChange=(window.ie)?true:false;
this.firstLoad=true;
var _19=this;
var _1a=function(){
_19.checkLocation();
};
setInterval(_1a,100);
},checkLocation:function(){
if(!window.ie&&this.ignoreLocationChange==true){
this.ignoreLocationChange=false;
return;
}
if(!window.ie&&this.ieAtomicLocationChange==true){
return;
}
var _1b=this.getCurrentLocation();
if(_1b==this.CurrentURI){
return;
}
this.ieAtomicLocationChange=true;
if(window.ie&&this.getIframeHash()!=_1b){
this.iframe.src="blank.html?"+_1b;
}else{
if(window.ie){
return;
}
}
this.CurrentURI=_1b;
this.ieAtomicLocationChange=false;
this.fireHistoryEvent(_1b);
},fireHistoryEvent:function(_1c){
this.dispatch({type:"onHistoryEvent",newURI:_1c});
},getIframeHash:function(){
var doc=this.iframe.contentWindow.document;
var _1e=new String(doc.location.search);
if(_1e.length==1&&_1e.charAt(0)=="?"){
_1e="";
}else{
if(_1e.length>=2&&_1e.charAt(0)=="?"){
_1e=_1e.substring(1);
}
}
return _1e;
},getCurrentLocation:function(){
return this.cleanHash(window.location.hash);
},cleanHash:function(_1f){
if(typeof _1f=="undefined"||_1f==""){
return "";
}
_1f=_1f.substring(1);
if(typeof _1f=="undefined"||_1f==""){
return "";
}
return _1f;
},setHash:function(uri){
if(window.webkit){
this.form.setAttribute("action","#"+uri);
this.form.submit();
}else{
window.location.hash=uri;
}
},add:function(uri){
var _22=this;
var _23=function(){
if(_22.currentWaitTime>0){
_22.currentWaitTime=_22.currentWaitTime-_22.WAIT_TIME;
}
var _24=_22.cleanHash(uri);
_22.dispatch({type:"onHistoryAdd",newURI:uri});
_22.ignoreLocationChange=true;
this.ieAtomicLocationChange=true;
_22.CurrentURI=uri;
if(window.webkit&&this.form){
this.form.setAttribute("action","#"+uri);
this.form.submit();
}else{
window.location.hash=uri;
}
if(window.ie){
_22.iframe.src="blank.html?"+uri;
}
this.ieAtomicLocationChange=false;
};
window.setTimeout(_23,this.currentWaitTime);
this.currentWaitTime=this.currentWaitTime+this.WAIT_TIME;
},iframeLoaded:function(_25){
if(this.ignoreLocationChange==true){
this.ignoreLocationChange=false;
return;
}
var _26=new String(_25.search);
if(_26.length==1&&_26.charAt(0)=="?"){
_26="";
}else{
if(_26.length>=2&&_26.charAt(0)=="?"){
_26=_26.substring(1);
}
}
if(this.pageLoadEvent!=true){
window.location.hash=_26;
}
this.fireHistoryEvent(_26);
},isFirstLoad:function(){
if(this.firstLoad==true){
return true;
}else{
return false;
}
}};

