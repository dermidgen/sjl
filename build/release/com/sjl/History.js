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

