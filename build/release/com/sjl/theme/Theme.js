Namespace("com.sjl.theme");
Import("com.sjl.io.Http");
Import("com.sjl.EventDispatcher");
com.sjl.theme.Theme=Class.create();
com.sjl.theme.Theme.inherits("com.sjl.EventDispatcher");
com.sjl.theme.Theme.prototype.initialize=function(){
this.Name=null;
this.RoundedCorners=false;
this.RoundingRadius=0;
this.Shadows=false;
this.ShadowStrength=0;
this.ShadowOffset=0;
this.__registerThemeDefs=function(_1){
this.dispatch({type:"onReady"});
};
this.LoadStyles=function(){
var _2=document.getElementsByTagName("head").item(0);
var _3=document.createElement("link");
_3.setAttribute("rel","stylesheet");
_3.setAttribute("href","themes/"+this.Name+"/resource/css/css.css");
_3.setAttribute("type","text/css");
_2.appendChild(_3);
_2,_3=null;
};
this.LoadThemeDefs=function(){
var r={url:"themes/"+this.Name+"/theme.xml"};
var _5=new com.sjl.io.Http();
var e={onLoad:this.__registerThemeDefs.bind(this)};
_5.addListener("onLoad",e);
_5.Request(r);
r,_5,e=null;
};
this.Load=function(){
this.LoadStyles();
this.LoadThemeDefs();
};
};
com.sjl.theme.Theme.prototype.GetProperty=function(_7){
if(typeof this[_7]!="undefined"){
return this[_7];
}
};

