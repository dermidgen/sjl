Namespace("com.sjl");
com.sjl.TearDown={Destructables:[],AddDestructable:function(_1){
this.Destructables.push(_1);
},Destruct:function(){
for(var i=0;i<this.Destructables.length;i++){
this.Destructables[i].Destroy();
}
}};

