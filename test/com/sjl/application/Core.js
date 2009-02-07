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
Import("com.sjl.theme.Selector");
com.sjl.application.Core=Class.create();
com.sjl.application.Core.prototype.initialize=function(){
this.Theme="default";
var _1=function(_2){
var _3=com.sjl.theme.Selector.GetInstance();
_3.SetTheme(_2);
_3.LoadTheme();
};
this.EnableTheme=function(){
_1(this.Theme);
};
};
com.sjl.application.Core.prototype.SetTheme=function(_4){
this.Theme=_4;
this.EnableTheme();
};

