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
Namespace("com.sjl.theme");
Import("com.sjl.theme.Theme");
com.sjl.theme.Selector=Class.create();
com.sjl.theme.Selector.prototype.initialize=function(){
this.Theme=null;
};
com.sjl.theme.Selector.prototype.SetTheme=function(_1){
this.Theme=new com.sjl.theme.Theme();
this.Theme.Name=_1;
};
com.sjl.theme.Selector.prototype.LoadTheme=function(){
this.Theme.Load();
};
com.sjl.theme.Selector.__instance=null;
com.sjl.theme.Selector.GetInstance=function(){
if(!this.__instance){
this.__instance=new com.sjl.theme.Selector();
}
return this.__instance;
};

