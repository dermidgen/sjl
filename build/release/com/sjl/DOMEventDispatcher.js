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
com.sjl.DOMEventDispatcher=function(){
};
com.sjl.DOMEventDispatcher.prototype={DOMEvents:[],Initialize:function(){
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

