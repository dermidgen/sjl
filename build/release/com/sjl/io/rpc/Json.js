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
Namespace("com.sjl.io.data");
com.sjl.io.data.Json=Class.create();
com.sjl.io.data.Json.prototype.initialize=function(_1){
var _2=new com.sjl.io.Http.RPC(_1);
this.createMethods(_2.newFuncs);
};
com.sjl.io.data.Json.prototype.createMethods=function(_3){
for(var i=0;i<_3.length;i++){
var _5=_3[i].methodName;
var _6=_3[i].method;
this[_5]=_6;
}
};
com.sjl.io.data.Json.prototype.runMethod=function(){
return null;
};

