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
Namespace("com.sjl.application");
Import("com.sjl.EventDispatcher");
com.sjl.application.Navigator=Class.create();
com.sjl.application.Navigator.inherits("com.sjl.EventDispatcher");
com.sjl.application.Navigator.prototype.initialize=function(){
var e={};
e.onHistoryEvent=this.onHistoryEvent.bind(this);
e.onHistoryAdd=this.onLocationChange.bind(this);
BrowserHistory.addListener("onHistoryEvent",e);
BrowserHistory.addListener("onHistoryAdd",e);
};
com.sjl.application.Navigator.prototype.onLocationChange=function(_2){
this.dispatch({type:"onLocationChange",newURI:_2.newURI});
};
com.sjl.application.Navigator.prototype.onHistoryEvent=function(_3){
this.dispatch({type:"onHistoryChange",newURI:_3.newURI});
this.dispatch({type:"onLocationChange",newURI:_3.newURI});
};
com.sjl.application.Navigator.__instance=null;
com.sjl.application.Navigator.GetInstance=function(){
if(this.__instance==null){
this.__instance=new com.sjl.application.Navigator();
}
return this.__instance;
};

