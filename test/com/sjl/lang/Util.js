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
if(!Array.indexOf){
Array.prototype.indexOf=function(_3,_4){
_4=_4?_4:0;
for(var i=_4;i<this.length;i++){
if(this[i]==_3){
return i;
}
}
return -1;
};
}

