Namespace("com.mislabeled.application");
com.mislabeled.application.Environment=Class.create();
com.mislabeled.application.Environment.prototype.initialize=function(){
this.UserAgent=null;
this.AppVersion=null;
this.Browser=null;
this.OS=null;
this.GetOS=function(){
if(this.AppVersion.indexOf("Macintosh")>=0){
this.OS="Macintosh";
}
if(this.AppVersion.indexOf("Windows")>=0){
this.OS="Windows";
}
if(this.AppVersion.indexOf("Linux")>=0){
this.OS="Linux";
}
return this.OS;
};
this.GetBrowser=function(){
if(this.UserAgent.indexOf("Opera")>=0){
this.Browser="Opera";
}
if(this.AppVersion.indexOf("Konqueror")>=0){
this.Browser="Konqueror";
}
if(this.AppVersion.indexOf("Safari")>=0){
this.Browser="Safari";
}
if(this.UserAgent.indexOf("Gecko")>=0&&(this.Browser!="Konqueror"&&this.Browser!="Safari")){
this.Browser="Mozilla";
}
if(document.all&&(this.Browser!="Opera")){
this.Browser="IE";
}
return this.Browser;
};
this.HasFeature=function(_1){
};
this.UserAgent=navigator.userAgent;
this.AppVersion=navigator.appVersion;
this.GetBrowser();
this.GetOS();
};
com.mislabeled.application.Environment.__instance=null;
com.mislabeled.application.Environment.GetInstance=function(){
if(!this.__instance){
this.__instance=new com.mislabeled.application.Environment();
}
return this.__instance;
};

Namespace("com.mislabeled");
com.mislabeled.DOMEventDispatcher=function(){
};
com.mislabeled.DOMEventDispatcher.prototype={DOMEvents:[],Initialize:function(){
if(DOMEvents.length==0){
this.addDOMListener(window,"unload",this.Destroy.bind(this),false);
}
},findElement:function(_1){
for(var i=0;i<this.DOMEvents.length;i++){
if(this.DOMEvents[i]==_1){
return this.DOMEvents[i];
}
}
return false;
},addDOMListener:function(_3,_4,_5,_6){
if(_3.addEventListener){
_3.addEventListener(_4,_5,_6);
}
if(_3.attachEvent){
_3.attachEvent("on"+_4,_5);
}
var _7={element:_3,type:_4,listener:_5,useCapture:_6};
this.DOMEvents.push(_7);
_3=null;
_7=null;
},removeDOMListener:function(_8,_9,_a,_b){
for(var i=0;i<this.DOMEvents.length;i++){
if(this.DOMEvents[i].element==_8&&this.DOMEvents[i].type==_9&&this.DOMEvents[i].listener==_a){
if(this.DOMEvents[i].element.removeEventListener){
this.DOMEvents[i].element.removeEventListener(_9,_a,_b);
}
if(this.DOMEvents[i].element.detatchEvent){
this.DOMEvents[i].element.detatchEvent(_9,_a);
}
this.DOMEvents.splice(i,1);
}
}
_8=null;
},dispatchDOMEvent:function(_d,_e){
var _d=this.findElement(_d);
if(_d.dispatchEvent){
_d.dispatchEvent(_e);
}
if(_d.fireEvent){
_d.fireEvent(_e);
}
_d=null;
},Destroy:function(){
for(var i=0;i<this.DOMEvents.length;i++){
this.removeDOMListener(this.DOMEvents[i].element,this.DOMEvents[i].type,this.DOMEvents[i].listener,this.DOMEvents[i].useCapture);
this.DOMEvents[i]=null;
this.DOMEvents.splice(i,1);
}
}};

Namespace("com.mislabeled");
com.mislabeled.EventDispatcher=function(){
this.__events={};
};
com.mislabeled.EventDispatcher.prototype={__event:function(_1){
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
},removeListener:function(_15,_16){
this.__removeListener(_15,_16);
}};

Namespace("com.mislabeled");
com.mislabeled.TearDown={Destructables:[],AddDestructable:function(_1){
this.Destructables.push(_1);
},Destruct:function(){
for(var i=0;i<this.Destructables.length;i++){
this.Destructables[i].Destroy();
}
}};

Namespace("com.mislabeled.io");
com.mislabeled.io.ResourceLoader=Class.create();
com.mislabeled.io.ResourceLoader.inherits("com.mislabeled.EventDispatcher");
com.mislabeled.io.ResourceLoader.prototype.initialize=function(){
this.Queue=[];
this.Loaded=["com.mislabeled.EventDispatcher","com.mislabeled.application.Environment","com.mislabeled.TearDown","com.mislabeled.DOMEventDispatcher","com.mislabeled.io.ResourceLoader"];
if(!window.onReady){
window.onReady=function(){
alert("No Entry Point Defined");
};
}
this._onLoad=function(){
if(!arguments[0]||arguments[0]==""){
return;
}
var p=arguments[0];
for(var i=0;i<this.Queue.length;i++){
if(this.Queue[i]==p){
this.Queue.splice(i,1);
}
}
this.Loaded.push(p);
this.dispatch({type:"onload",resource:p});
if(this.Queue.length<=0){
this.dispatch({type:"oncomplete"});
}
};
var _3=this._onLoad.bind(this);
Ajile.AddImportListener(_3);
};
com.mislabeled.io.ResourceLoader.prototype.IsLoaded=function(p){
if(this.Loaded.indexOf(p)>=0){
return true;
}
return false;
};
com.mislabeled.io.ResourceLoader.prototype.IsQueued=function(p){
if(this.Queue.indexOf(p)>=0){
return true;
}
return false;
};
com.mislabeled.io.ResourceLoader.prototype.Import=function(p){
if(this.Loaded.indexOf(p)>=0){
return;
}
if(this.Queue.indexOf(p)>=0){
return;
}
this.Queue.push(p);
var _7=(window.DocRoot)?DocRoot+"lib/js":"lib/js";
this._import(p,p,_7,"/");
};
com.mislabeled.io.ResourceLoader.__instance=null;
com.mislabeled.io.ResourceLoader.GetInstance=function(){
if(!this.__instance){
this.__instance=new com.mislabeled.io.ResourceLoader();
}
return this.__instance;
};
com.mislabeled.io.ResourceLoader.prototype._import=ImportAs;
Import=com.mislabeled.io.ResourceLoader.GetInstance().Import.bind(com.mislabeled.io.ResourceLoader.GetInstance());
window.onload=function(){
window.onReady();
};

