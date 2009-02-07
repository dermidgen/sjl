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
com.sjl.TearDown={Destructables:[],AddDestructable:function(_1){
this.Destructables.push(_1);
},Destruct:function(){
for(var i=0;i<this.Destructables.length;i++){
this.Destructables[i].Destroy();
}
}};

