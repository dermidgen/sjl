/**----------------------------------------------------------------------------+
| Product:  Ajile [com.iskitz.ajile]
| @version  0.9.5
|+-----------------------------------------------------------------------------+
| @author   Michael A. I. Lee [ http://ajile.iskitz.com/ ]
|
| Created:  Tuesday,   November   4, 2003    [2003.11.04]
| Modified: Saturday,  July      28, 2007    [2007.07.28 - 10:21:30 PM EDT]
|+-----------------------------------------------------------------------------+
|
| [Ajile] - Advanced JavaScript Importing & Loading Extension is a JavaScript
|           module that adds namespacing and importing capabilities to the
|           JavaScript Language.
|
|           Visit http://ajile.iskitz.com/ to start creating
|
|                  "Smart scripts that play nice!"
|
|           Copyright (c) 2003-2007 Michael A. I. Lee, iSkitz.com
|
|+-----------------------------------------------------------------------------+
|
| ***** BEGIN LICENSE BLOCK *****
| Version: MPL 1.1/GPL 2.0/LGPL 2.1
|
| The contents of this file are subject to the Mozilla Public License Version
| 1.1 (the "License"); you may not use this file except in compliance with
| the License. You may obtain a copy of the License at
| http://www.mozilla.org/MPL/
|
| Software distributed under the License is distributed on an "AS IS" basis,
| WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
| for the specific language governing rights and limitations under the
| License.
|
| The Original Code is Ajile.
|
| The Initial Developer of the Original Code is Michael A. I. Lee
|
| Portions created by the Initial Developer are Copyright (C) 2003-2007
| the Initial Developer. All Rights Reserved.
|
| Contributor(s): Michael A. I. Lee [ http://ajile.iskitz.com/ ]
|
| Alternatively, the contents of this file may be used under the terms of
| either the GNU General Public License Version 2 or later (the "GPL"), or
| the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
| in which case the provisions of the GPL or the LGPL are applicable instead
| of those above. If you wish to allow use of your version of this file only
| under the terms of either the GPL or the LGPL, and not to allow others to
| use your version of this file under the terms of the MPL, indicate your
| decision by deleting the provisions above and replace them with the notice
| and other provisions required by the GPL or the LGPL. If you do not delete
| the provisions above, a recipient may use your version of this file under
| the terms of any one of the MPL, the GPL or the LGPL.
|
| ***** END LICENSE BLOCK *****
*-----------------------------------------------------------------------------*/
new function/*com.iskitz.ajile*/(){var _1,_2,_3,_4;if(isIncompatible()){return;}var _5=true,_6=false,_7=false,_8=true,_9=true,_a=false,_b=false;var _c="Ajile",_d="Powered by ",_e="index",_f=".js",_10="<*>",_11="com.iskitz.ajile",_12="/",_13=[_c,"Import","ImportAs","Load","Namespace","JSBasePath","JSImport","JSPackage","JSPackaging","JSPacked","JSPath","NamespaceException","Package","PackageException"];var _14,_15=new NamespaceInfo(),_16="__LOADED__",_17,LOG="",_19;var _1a=["*","|",":","\"","<",">","?","[","{","(",")","}","]","\\","&","@","#","$","%","!",";","'","=","+","~",",","^","_"," ","`","-","/","."];var _1b=(/(cloakoff|cloak)/),_1c=(/(debugoff|debug)/),_1d=(/(legacyoff|legacy)/),_1e=(/(mvcoff|mvc)/),_1f=(/(mvcshareoff|mvcshare)/),_20=(/(overrideoff|override)/),_21=(/(refreshoff|refresh)/),_22=(/(.*\/)[^\/]+/),_23=(/(.*)\.[^\.]+/),_24=(/(\/\.\/)|(\/[^\/]*\/\.\.\/)/),_25=(/:\/\x2f/);function $create(_26){cloakObject((_19=_26));if(_2){var _27=document.createElement("meta");if(_27){_27.httpEquiv=_d+_c;_d=_11.split(".").reverse().join(".");_27.content=_d+" :: Smart scripts that play nice ";getMainLoader(this.document).appendChild(_27);}}_15=new NamespaceInfo(getNamespaceInfo(_11));_28=_11;if(!_1){((_15.fullName=_11),(_15.path="../lib/"),(_15.shortName=_c));}publishAPI(_19);_29.add(_11,_c);_2a.add(_11,_c);handleImportLoaded(_c,_11,_19,this);loadController();cloak(_11);preserveImportFailSafe();}function $destroy(_2b){if(_2b&&_2b!=_11){destroyModules(_2b);return;}_2c.clear();_2d.clear();_2e.clear();_2f.clear();_29.clear();_2a.clear();_30.clear();cloak();_17=null;delete Import;delete ImportAs;delete Load;delete Namespace;delete DEPRECATED$NamespaceException;delete _19;delete window[_c];delete window.Import;delete window.ImportAs;delete window.JSImport;delete window.JSLoad;delete window.JSPackage;delete window.JSPackaging;delete window.Load;delete window.Namespace;delete window.NamespaceException;delete window.Package;delete window.PackageException;destroyEmptyNamespace("com.*");}function addDependence(_31,_32){if(_31==_28){return;}var _33=_2c.get(_28);if(!_33){_2c.add(_28,(_33=new SimpleSet()));}_33.add(_31,_32);}function AddImportListener(_34,_35){preserveImportFailSafe();if(!_35||(Function!=_35.constructor)){if(_34&&(Function==_34.constructor)){_35=_34;_34=null;}else{return false;}}else{if(_34&&(String!=_34.constructor)){return false;}}if(_34==_10&&this==window[_c]){return false;}if(!_34&&this!=window[_c]){_34=_10;}if(_34&&(_2a.has(_34)||GetModule(_34))){return setTimeout(function(){_35(_34);},62.25);}if(!_34&&(_2a.getSize()>0||_29.getSize()==0)){setTimeout(function(){_35(_34);},62.25);}var _36=_2d.get((_34=(_34||"")));if(!_36){_2d.add(_34,(_36=new SimpleSet()));}_36.add(Math.random(),_35);return true;}function addUsage(_37){if(_37==_28){return;}var _38=_30.get(_37);if(!_38){_30.add(_37,(_38=new SimpleSet()));}_38.add(_28);}function cloak(_39){if(_39&&_39.constructor!=String){return;}_39=_39||"";var _3a=GetModule(_39);if(_3a){cloakObject((typeof _3a=="function"?_3a:_3a.constructor));}if(!_3){return;}var _3b=GetNamespaceInfo(_39);var _3c=(_3b&&_3b.hasOption("cloak"));for(var id,src,sys,_40=getLoaders(),i=_40.length;--i>=0;){if(!_40[i]){continue;}if(((id=_40[i].title)&&_39&&(id!=_39))){continue;}src=_40[i].src;sys=(src&&(src.indexOf(_11)>=0))||(id&&(id.indexOf(_11)==0));if(sys||(!src&&id)||_3c||_5){if((_3b=_40[i].parentNode)&&_3b.removeChild){_3b.removeChild(_40[i]);}}}}function cloakObject(obj){if(!obj||typeof obj.toString=="undefined"){return;}var _43=(/(function\s*.*\s*\(.*\))/).exec(obj.toString())||[""],_44=_43.length>1?_43[1]:_43[0];if(typeof obj.prototype=="undefined"){return;}obj.prototype.constructor.toString=function(e){return(_6&&!_5)?_44:obj.prototype.toString();};}function compareNumbers(_46,_47){return _46-_47;}function completeImports(_48){var _49,_4a;if(!(isString(_48)&&_29.has(_48))){_4a=_29.getAllArray();}else{if(GetModule(_48)){_4a=[[_48,_29.get(_48)]];}}if(!_4a){return;}for(var _4b,i=_4a.length;--i>=0;){_48=_4a[i][0];if(!(_29.has(_48)&&(_49=GetModule(_48)))){continue;}logImportCheck((_4b=_4a[i][1]),_48,arguments);if(_4b=="*"){_4b=null;}handleImportLoaded(_4b,_48,_49,this);updateDependents(_48);}}function DEPRECATED$GetPathFor(_4d){return"Ajile.GetPathFor("+_4d+") is not supported. "+"Namespace paths are protected.";}function DEPRECATED$NamespaceException(_4e){this.name="DEPRECATED: "+_11+".NamespaceException";this.message="DEPRECATED: Invalid _namespace name ["+_4e+"]";this.toString=toString;function toString(){return"[ "+this.name+" ] :: "+this.message;}}function DEPRECATED$SetBasePath(_4f){if(typeof _4f!="undefined"){_15.path=_4f;}}function destroyEmptyNamespace(_50){if(!_50){return;}var _51={},_52=_50.split("."),ns=window[_52[0]];for(var i=1,j=_52.length;typeof _52[i]!="undefined";i++){if(typeof ns[_52[i]]=="undefined"){break;}_51[_52[i-1]]=[i,true];ns=ns[_52[i]];for(var _56 in ns){if("undefined"==typeof Object.prototype[_56]){if(_56!=_52[i]){_51[_52[i-1]][1]=false;break;}}}}for(ns in _51){if("undefined"==typeof Object.prototype[ns]){if(_51[ns][1]){destroyModules(_52.slice(0,_51[ns][0]+1).join("."));}}}}function destroyModules(_57){var _58;if(_57){if(String!=_57.constructor){if((_57=GetNamespaceInfo(_57))){_57=_57.fullName;_58=_57.shortName;}}if(!_58&&_57){_58=_57.substring(_57.lastIndexOf(".")+1);}_57=_23.exec(_57);_57=_57?_57[1]:null;}var _59=GetModule(_57);if(_59&&_58){if(_58=="*"||typeof(_59[_58])!="undefined"){if(_58!="*"){if(_59[_58]==window[_58]){window[_58]=null;}delete _59[_58];}else{for(var _5a in _59){if("undefined"==typeof Object.prototype[_5a]){delete _59[_5a];}}destroyEmptyNamespace(_57);}}}cloak(_57);return;}function detectCurrentModule(_5b){var _5c=_5b;var _5d=_29.getAllArray();for(var _5e,i=0,j=_5d.length;i<j;++i){if(_2a.has((_5e=_5d[i][0]))){continue;}if("*"!=_5d[i][1]){_5c=_23.exec(_5e);}if(!(_5c&&(_5b==_5c[1]))){continue;}_2a.add((_28=_5e));return;}_28=_e;}function getContainer(_61){if(!_61){return window.document;}if(typeof _61.write=="undefined"){if(typeof _61.document!="undefined"){_61=_61.document;}else{if(typeof _61.parentNode!="undefined"){return getContainer(_61.parentNode);}else{return window.document;}}}return _61;}function getImportInfo(_62,_63){if(!_63){return null;}var _64=_63.split(".");var _65;for(var i=0,j=_64.length;i<j;i++){if(isNaN(_64[i])){continue;}_63=_64.slice(0,i).join(".");_62=_62||_64.slice(i-1,i)[0];_65=_64.slice(i).join(".");break;}if(!_65){return null;}return[_62,_63,_65];}function getLoaders(_68){if(!(_68=getContainer(_68))){return null;}var _69=(typeof _68.scripts!="undefined"&&typeof _68.scripts.length!="undefined"&&_68.scripts.length>0)?_68.scripts:(typeof _68.getElementsByTagName!="undefined")?(_68.getElementsByTagName("script")||[]):[];return _69;}function getMainLoader(_6a){if(_6a){if((!_17||_3)&&!_2){if((_17&&_4&&_6a!=_17.ownerDocument)||!_17||!_4&&_3){if(_6a.lastChild&&_6a.lastChild.firstChild){_17=_6a.lastChild.firstChild;}}}else{if(!_17&&_2){_17=_14;}}}return _17;}function getMETAInfo(_6b){loadOptions(_6b);if(!_6b||_6b.constructor!=String){return[];}var _6c=_f?_6b.lastIndexOf(_f):_6b.lastIndexOf(".");if(_6c<_6b.length&&_6c>=0){var _6d=_6b.slice(_6c,_6c+_f.length);var _6e=_6b.substring(0,_6c);if(_6e&&isNaN(_6e.charAt(0))){_6e="";}}return[_6e,_6d];}function GetModule(_6f,_70){if(!isString(_6f)){return null;}var _71=_70||window;_6f=_6f.split(".");for(var i=0,j=_6f.length;i<j;i++){if(typeof _71[_6f[i]]!="undefined"){_71=_71[_6f[i]];}else{return null;}}return _71;}function GetNamespaceInfo(_74){if(!_74){return new NamespaceInfo(_15);}var _75=_74.constructor==String;for(var _76 in _2f){if("undefined"==typeof Object.prototype[_76]){if((_75&&_74==_76)||(!_75&&_74==GetModule(_76))){return _2f[_76];}}}return null;}function getNamespaceInfo(_77,_78){_77=_77||_11;if(_77==_11&&_15&&_15.path){return _15;}var _79=_2f[_77];if(_79){return _79;}var _7a=getNamespaceLookups(_77,_78);if((_79=getNamespaceInfoCached(_77,_7a))){return(_2f[_77]=_79);}var _7b=getLoaders();if(!(_7b&&_7a)){return null;}var _7c;for(var _7d=false,_7e,_7f,i=0,j=_7b.length;i<j;i++){_7e=unescape(_7b[i].src);if(_7e&&_7e.search(_25)==-1){_7e=unescape(window.location.href);if(_7e.charAt(_7e.length-1)!=_12){if((_7f=_22.exec(_7e))!=null){if(_7f[1].length>_7e.search(_25)+3){_7e=_7f[1];}}}_7e+=unescape(_7b[i].src);}if(typeof _7e=="undefined"||_7e==null){continue;}while(_24.test(_7e)){_7e=_7e.replace(_24,"/");}if(_2e.has(_7e)){continue;}_2e.add(_7e);if(_7d){continue;}var _82;for(var _83 in _7a){if(typeof Object.prototype[_83]!="undefined"){continue;}_82=_7a[_83];var _84,_85,_86=[];for(var lc=_82.length;--lc>=0;){_84=_82[lc];_85=_7e.lastIndexOf(_84)+1;if(_85<=0||_85==_86[0]){continue;}_86[_86.length]=_85;log("FOUND :: Path [ "+_7e+" ]",arguments);}if(_86.length==0){continue;}_86.sort(compareNumbers);_85=_86[_86.length-1];_78=(_85==(_7e.lastIndexOf(_84)+1))?_83:null;_7c=_7e.substring(0,_85);_7d=true;if(_77==_11&&_7b[i].title!=_11){_7b[i].title=_11;}var _88=_85+_84.length-2;var _89=getMETAInfo(_7e.substring(_88+1));var _8a=_89[1];var _8b=_89[0];break;}}if(!_7c){return null;}_79=new NamespaceInfo(_7c,_78,_77,null,_8b,_8a);_2f[_77]=_79;return _79;}function getNamespaceInfoCached(_8c,_8d){var _8e=Number.MAX_VALUE;var _8f;var _90=[];var _91;var _92=0;_8d=_8d||getNamespaceLookups(_8c);var _93=[];var _94=_2e.getAll();_94:for(var _95 in _94){if(typeof Object.prototype[_95]!="undefined"){continue;}for(var _96 in _8d){if(typeof Object.prototype[_96]!="undefined"){continue;}_93[_93.length]=_96;for(var _97=_8d[_96],i=_97.length;--i>=0;){if(0<(_91=_95.lastIndexOf(_97[i]))){_8f=_95.length-(_91+_97[i].length);if(_8f<_8e){_8e=_8f;_92=_90.length;}_90[_90.length]=_91+1;var _99=(_91+1)+_97[i].length-2;var _9a=getMETAInfo(_95.substring(_99+1));var _9b=_9a[1];var _9c=_9a[0];log("FOUND :: Cached Path [ "+_95+" ]",arguments);break _94;}if(i==0){delete _93[--_93.length];}}}}if(!_90||_90.length==0){return null;}_95=_95.substring(0,_90[_92]);var _9d=new NamespaceInfo(_95,_93[_92],_8c,null,_9c,_9b);if(_9d.path){_2f[_8c]=_9d;}return _9d;}function getNamespaceLookups(_9e,_9f){var _a0=getSeparator();var _a1=typeof _9f=="undefined"?_1a:[_9f];var _a2={};for(var i=_a1.length;--i>=0;){_9f=_a1[i];_a2[_9f]=[];_a2[_9f][2]=_a0+_9e.replace(/\x2e/g,_9f);_a2[_9f][0]=_a2[_9f][2]+_9f;_a2[_9f][1]=_a2[_9f][2]+_a0;_a2[_9f][2]=_a2[_9f][2]+".";}return _a2;}function getOptions(){return[(_5?"cloak":"cloakoff"),(_6?"debug":"debugoff"),(_7?"legacy":"legacyoff"),(_8?"mvc":"mvcoff"),(_9?"mvcshare":"mvcshareoff"),(_a?"override":"overrideoff"),(_b?"refresh":"refreshoff")].join(",");}function getSeparator(){var _a4=unescape(window.location.href);var _a5=_a4.lastIndexOf("\\")+1;var _a6=_a4.lastIndexOf("/")+1;_12=(_a5>_a6?"\\":"/");return _12;}function handleImport(_a7,_a8,url,_aa,_ab,_ac,_ad){var _ae=_a8+(_a7=="*"?".*":"");var _af=_ae;var _b0;do{if((_ae=_23.exec(_ae))){_ae=_ae[1];}else{break;}if(_ae==_af){break;}_af=_ae;_b0=getNamespaceInfo(_ae);}while(!_b0);if(url==null||typeof url=="undefined"||url.constructor!=String){url=(typeof _b0!="undefined"&&_b0!=null&&typeof _b0.path!="undefined")?_b0.path:(_15.path||"");}if(url.lastIndexOf("/")!=(url.length-1)){url+="/";}if(_7){if(_aa==false){_aa="/";}else{if(_aa==true){_aa=".";}}}if(_aa==null||typeof _aa=="undefined"){_aa=_b0?typeof _b0.notation=="undefined"?_15.notation:_b0.notation:_15.notation;}url+=escape(_a8.replace(/\x2e/g,_aa));addDependence(_a8,(_a7=="*"?_a8:_a7));addUsage(_a8);if(_29.add(_a8,_a7)){if(_a7=="*"){((_a7=_16),log("...\t:: Import (\""+_a8+".*\")",arguments));}else{if(_a7==_a8){log("...\t:: Include (\""+_a7+"\")",arguments);}else{log("...\t:: ImportAs (\""+_a7+"\", \""+_a8+"\")",arguments);}}if(_ab){url+="."+_ab;}url+=_f;if(_b0&&_b0.hasOption("refresh")){url=setRefresher(url);}var _b1=Load(url,getContainer((_ad||this)),"ImportAs(\""+_a7+"\", \""+_a8+"\");",false,_a8);if(!_b1){return _ac;}(new ImportThread(_a8)).start();}return _ac;}function handleImportLoaded(_b2,_b3,_b4,_b5){_b5=_b5||this;if(!_b4){return _b4;}if((_b2!=_16)&&hasNamingConflict(_b2,_b3,_b5)){_29.remove(_b3);return _b4;}if(!isSupported(_b3,_b2)){return null;}var _b6=[];var _b7=_29.get(_b3);var _b8=_b2==_b3||_b7==_b3;if(_b2&&_b2!=_16&&(!_b7||(_b7!="*"&&_b7!=_16))){if(_b8){_b6[0]="SUCCESS :: Include (\""+_b3+"\")";}else{((_b5[_b2]=_b4),(_b6[0]="SUCCESS :: ImportAs (\""+_b2+"\", \""+_b3+"\")"));}_29.remove(_b3);}else{if(_b7=="*"){_b6[_b6.length]=" ";if(!_b8){var _b9;for(var _ba in _b4){if(typeof Object.prototype[_ba]!="undefined"){continue;}_b9=_b3+"."+_ba;if(_2f[_b9]||hasNamingConflict(_ba,_b9,_b5)){continue;}_b5[_ba]=_b4[_ba];_b6[_b6.length]="SUCCESS :: ImportAs (\""+_ba+"\", \""+_b9+"\")";}}_29.remove(_b3);if(_b2!=_16){_29.add(_b3,_16);}}else{if(_b7!="*"&&(_b7==_16||_b2==_16)){_b6[0]="SUCCESS :: "+(_b8?"Include":"Import")+" (\""+_b3+".*\")";_29.remove(_b3);}}}if(_b6.length>0){log(_b6.join("\r\n"),arguments);}notifyImportListeners(_b3);return _b4;}function hasNamingConflict(_bb,_bc,_bd){_bd=_bd||this;if(_a||(_bc==_bb&&!GetModule(_bb))||(typeof _bd[_bb]=="undefined")||(GetModule(_bc)==_bd[_bb])){return false;}var msg="\nWARNING: There is a naming conflict, "+_bb+" already exists.\nConsider using ImportAs with an alias; for "+"example:\n\n\tImportAs (\""+_bb+"1\", \""+_bc+"\");";if(_bb==_bc){msg+="\n\nThe module is currently inaccessible.\n";}else{msg+="\n\nThe module can currently be accessed using its "+"fully-qualified name:\n\n\t"+_bc+".\n";}log(msg,arguments,_6);return true;}function Import(_bf,url,_c1,_c2){return ImportAs(null,_bf,url,_c1,_c2);}function ImportAs(_c3,_c4,url,_c6,_c7){preserveImportFailSafe();if(!_c4||_c4=="*"){log("ERROR :: ImportAs (\""+_c3+"\", \""+_c4+"\")");return null;}var _c8,_c9;if(!isString(_c3)){_c3="";}if((_c8=getImportInfo(_c3,_c4))){_c4=_c8[1];_c3=(_c3!=_16)?_c8[0]:_16;_c9=_c8[2];}else{if(!_c3){_c3=_c4.substring(_c4.lastIndexOf(".")+1);}}_c7=_c7||this;if(_c3=="*"){_c4=_23.exec(_c4)[1];}else{if(typeof _c7[_c3]!="undefined"&&_c3!=_c4){for(var t=_13.length;--t>=0;){if(_c3!=_13[t]){continue;}log("ERROR :: ImportAs (\""+_c3+"\", \""+_c4+"\")! "+_c3+" is restricted.",arguments);return _c7[_c3];}}}var _cb=_c7;var _cc="";for(var _cd=_c4.split("."),i=0,j=_cd.length;i<j;i++){if(typeof _cb[_cd[i]]!="undefined"){_cb=_cb[_cd[i]];_cc+=_cd[i]+".";}else{break;}}if((i>=j&&_c3!="*")){if(_29.has(_c4)||!_2a.has(_c4)){_cb=handleImportLoaded(_c3,_c4,_cb,_c7);updateDependents(_c4);}return _cb;}if(_29.has(_c4)){if(_c3=="*"||_c3==_16){_c3=_c4;}addDependence(_c4,_c3);addUsage(_c4);return null;}return handleImport(_c3,_c4,url,_c6,_c9,_cb,_c7);}function ImportThread(_d0,ttl,_d2){var _d3,_d4,_d5=0;function $ImportThread(_d6){_d2=_d2||500;ttl=ttl||60000;_d3=window.setInterval(stop,ttl);_d6.start=start;_d6.stop=stop;return _d6;}function start(){if(_d5>=_d2){stop();return;}if(GetModule(_d0)){completeImports();}else{_d4=window.setTimeout(start,0);}}function stop(){if(typeof _d4!="undefined"){window.clearTimeout(_d4);}if(typeof _d3!="undefined"){window.clearInterval(_d3);}}if(this.constructor!=ImportThread){if(!this.constructor||this.constructor.toString()!=ImportThread.toString()){return new ImportThread(_d0,ttl,_d2);}}return $ImportThread(this);}function Include(_d7,url,_d9,_da){return ImportAs(_d7,_d7,url,_d9,_da);}function isIncompatible(){if(typeof document=="undefined"){return false;}var _db="undefined"!=typeof document.write&&"undefined"!=typeof document.writeln;_1=_db&&"undefined"!=typeof document.createElement;_2=_1&&"undefined"!=typeof document.createTextNode&&"undefined"!=typeof document.getElementsByTagName&&"undefined"!=typeof(_14=document.getElementsByTagName("head")[0]).appendChild&&"undefined"!=typeof _14.removeChild;_3=_2&&"undefined"!=typeof document.firstChild&&"undefined"!=typeof document.lastChild&&"undefined"!=typeof document.parentNode;_4=_3&&"undefined"!=typeof document.ownerDocument;return!(_db||_1||_2||_3||_4);}function isString(obj){return(obj!=null&&typeof obj!="undefined"&&obj.constructor==String);}function isSupported(_dd,_de){var _df=(_dd==_28);var _e0=_29.has(_dd);var _e1=_2c.get(_dd);function isInlineImportReady(){if(_df||isSupported(_28)||_e0){return true;}_29.add(_dd,_de);(new ImportThread(_dd)).start();return false;}if(!_e1||!(_e1=_e1.getAll())){return isInlineImportReady();}for(var _e2 in _e1){if("undefined"==typeof Object.prototype[_e2]){if(!GetModule(_e1[_e2])){return false;}}}return isInlineImportReady();}function Load(url,_e4,_e5,_e6,_e7,_e8,_e9){preserveImportFailSafe();if(!(_e4=getContainer(_e4))){log("ERROR :: Container not found. Unable to load:\n\n["+url+"]",arguments);return false;}if(url){_2e.add(unescape(url));if(_b){url=setRefresher(url);}}if(!(_e8||_e9)){_e9="JavaScript";_e8="text/javascript";}if(typeof _e6=="undefined"){_e6=false;}var _ea;if(_1){_ea=_e4.createElement("script");}if(!_ea){if(_e5){_e5="window.setTimeout('"+_e5+"',0);";}LoadSimple(url,_e4,_e5,_e6,_e7,_e8,_e9);return false;}if(_e6){_ea.defer=_e6;}if(_e9){_ea.language=_e9;}if(_e7){_ea.title=_e7;}if(_e8){_ea.type=_e8;}if(url){log("...\t:: Load [ "+url+" ]",arguments);if(_eb||!_ec){_ea.src=url;}getMainLoader(_e4).appendChild(_ea);if(_ed||_ec){_ea.src=url;}log("DONE\t:: Load [ "+url+" ]",arguments);}if(!_e5){return true;}if(url){Load(null,_e4,_e5,_e6,_e7,_e8,_e9);return true;}if(typeof(_ea.canHaveChildren)=="undefined"||_ea.canHaveChildren){_ea.appendChild(_e4.createTextNode(_e5));}else{if(!_ea.canHaveChildren){_ea.text=_e5;}}getMainLoader(_e4).appendChild(_ea);return false;}function loadController(){if(!(_8||_9)){return;}if(_9){Load(_15.path+_e+_f,null,null,null,_e);}if(!_8){return;}var _ee=unescape(document.location.href.substring(0,document.location.href.indexOf('#')));var _ef=_ee.lastIndexOf(_12);_ee=_ee.substring(++_ef);_ef=_ee.lastIndexOf(".");_ef=(_ef==-1)?0:_ef;if(""!=(_ee=_ee.substring(0,_ef))){_e=_ee;}Load(_e+_f,null,null,null,_e);}function loadOptions(_f0){if(!_f0||_f0.constructor!=String){return;}var _f1=_f0.lastIndexOf("?")+1;_f0=_f0.substring(_f1).toLowerCase();if(_f0.length==0){return;}var _f2;if((_f2=_1b.exec(_f0))){_5=_f2[1]=="cloak";}if((_f2=_1c.exec(_f0))){_6=_f2[1]=="debug";}if((_f2=_1d.exec(_f0))){SetLegacy(_f2[1]=="legacy");}if((_f2=_1e.exec(_f0))){_8=_f2[1]=="mvc";}if((_f2=_1f.exec(_f0))){_9=_f2[1]=="mvcshare";}if((_f2=_20.exec(_f0))){_a=_f2[1]=="override";}if((_f2=_21.exec(_f0))){_b=_f2[1]=="refresh";}}function LoadSimple(src,_f4,_f5,_f6,_f7,_f8,_f9){if(!(_f4=getContainer(_f4))){return;}var _fa;if(src){log("...\t:: LoadSimple [ "+src+" ]",arguments);if(_f5){_fa=_f5;_f5=null;}}var _fb="<"+"script"+(_f6?" defer=\"defer\"":"")+(_f9?(" language=\""+_f9+"\""):"")+(_f7?(" title=\""+_f7+"\""):"")+(_f8?(" type=\""+_f8+"\""):"")+(src?(" src=\""+src+"\">"):">")+(_f5?(_f5+";"):"")+"</script>\n";_f4.write(_fb);if(src){log("DONE\t:: LoadSimple [ "+src+" ]",arguments);}if(!(_f5=_f5||_fa)){return;}if(src){LoadSimple(null,_f4,_f5,_f6,_f7,_f8,_f9);}}function log(_fc,_fd,_fe){if(!_6&&!_fe){return;}var _ff,_100=1<((_ff=(/function\s*(\w*)\(/).exec(_fd.callee))||["("]).length?_ff[1]:"";if(typeof _fc!="undefined"){var _LOG=LOG;var now=new Date();LOG=[now.getFullYear(),now.getMonth(),now.getDate()].join(".")+","+[now.getHours(),now.getMinutes(),now.getSeconds(),now.getMilliseconds()].join(":")+"\t:: "+_28+" :: "+_100+"\r\n"+_fc+"\r\n\r\n";if(typeof console!="undefined"){if(typeof console.info=="function"){console.info(LOG);}}if(typeof YAHOO!="undefined"){if(typeof YAHOO.log=="function"){YAHOO.log(LOG);}}if(typeof MochiKit!="undefined"){if(typeof MochiKit.log=="function"){MochiKit.log(LOG);}}LOG+=_LOG;}if(_fe){ShowLog();}}function logImportCheck(_103,_104,_105){var _106=(_103=="*"||_103==_16)?("Import   (\""+_104+".*\")"):(_103==_104)?("Include  (\""+_104+"\")"):("ImportAs (\""+_103+"\", \""+_104+"\")");log(("CHECKING :: "+_106+"..."),_105);}function Namespace(_107,path,_109,_10a){preserveImportFailSafe();_107=_107||"<default>";log("Namespace (\""+_107+"\")",arguments);var _10b=_10a||window;if(_107=="<default>"){_15.update(path,_109);log(_15,arguments);return _10b;}detectCurrentModule(_107);var _10c=_107.split(".");for(var i=0,j=_10c.length;i<j;i++){if(typeof _10b[_10c[i]]!="undefined"){_10b=_10b[_10c[i]];}else{_10b=_10b[_10c[i]]={};}}var _10f=_2f[_107];if(_10f){_10f.update(path,_109);log(_10f,arguments);return _10b;}if(!path){_10f=getNamespaceInfo(_107,_109);}if(path||!_10f){_10f=new NamespaceInfo(path,_109,_107);}if(_10f&&!_2f[_107]){_2f[_107]=_10f;}log(_10f,arguments);return _10b;}function NamespaceInfo(path,_111,_112,_113,_114,_115,_116){function $NamespaceInfo(THIS){handleArguments();THIS.hasOption=hasOption;THIS.toString=toString;THIS.update=update;THIS.update(path,_111,_112,_113,_114,_115,_116);return THIS;}function handleArguments(){if(!(path&&path.constructor==NamespaceInfo)){return;}var ns=path;_115=ns.extension;_112=ns.fullName;_111=ns.notation;_116=ns.options;path=ns.path;_113=ns.shortName;_114=ns.version;}function hasOption(_119){_116=_116||this.options;if(!(_116&&_119&&(_116.indexOf(_119)>=0))){return false;}var _11a=(new RegExp(_119,"g")).exec(_116);return _11a&&(typeof _11a[1]!="undefined")&&_11a[1]==_119;}function toString(){return"NamespaceInfo"+"\r\n[ fullName: "+this.fullName+"\r\n, shortName: "+this.shortName+"\r\n, version: "+this.version+"\r\n, notation: "+this.notation+"\r\n, options: "+this.options+"\r\n, path: "+this.path+"\r\n, uri: "+this.uri+"\r\n]";}function update(path,_11c,_11d,_11e,_11f,_120,_121){this.extension=_120||this.extension||_f;this.fullName=_11d||this.fullName||"";this.shortName=_11e||this.shortName||"";this.notation=isString(_11c)?_11c:(this.notation||((_15&&isString(_15.notation))?_15.notation:"."));this.options=isString(_121)?_121:(this.options||getOptions());this.path=isString(path)?path:(this.path||((_15&&isString(_15.path))?_15.path:""));this.uri=this.path+this.fullName.replace(/\x2e/g,this.notation);this.version=""+(_11f||this.version||"");if(!this.uri){return;}this.uri+=(this.version?("."+this.version):"")+this.extension;}if(this.constructor!=NamespaceInfo){if(!this.constructor||this.constructor.toString()!=NamespaceInfo.toString()){return new NamespaceInfo(path,_111,_112,_113,_114,_115,_116);}}return $NamespaceInfo(this);}function notifyImportListeners(_122){var _123=[_2d.get(""),_2d.get(_122),_2d.get(_10)];if(!_123[0]&&!_123[1]&&!_123[2]){return;}var _124=(_123[0]&&(_123[0].getSize()>0))||(_123[1]&&(_123[1].getSize()>0));if(_6&&_124){log(("NOTIFY :: Import Listeners for "+_122+"..."),arguments);}for(var _125,i=_123.length;--i>=0;){if(!_123[i]){continue;}_125=_123[i].getAll();for(var id in _125){if("undefined"==typeof Object.prototype[id]){_125[id](_122);}}}if(_6&&_124){log(("NOTIFY :: Import Listeners for "+_122+"...DONE!"),arguments);}}function preserveImportFailSafe(_128){var _129=(_128=_128||window||this).onload;function importFailSafe(e){AddImportListener(cloak);completeImports(e);cloak();if(_129&&(Function==_129.constructor)){_129(e);}}if(_129&&(Function==_129.constructor)){if(importFailSafe.toString()==_129.toString()){return;}}cloakObject(_128.onload=importFailSafe);}function publishAPI(THIS){Namespace(_11);cloakObject(this.Import=Import);cloakObject(this.ImportAs=ImportAs);cloakObject(this.Include=Include);cloakObject(this.Load=Load);cloakObject(this.Namespace=Namespace);cloakObject(THIS.AddImportListener=AddImportListener);cloakObject(THIS.EnableLegacy=SetLegacy);cloakObject(THIS.GetVersion=function(){return _15.version;});cloakObject(THIS.RemoveImportListener=RemoveImportListener);cloakObject(THIS.SetOption=SetOption);cloakObject(THIS.ShowLog=ShowLog);cloakObject(THIS.Unload=$destroy);publishOption(THIS,"Cloak");publishOption(THIS,"Debug");publishOption(THIS,"Override");publishOption(THIS,"Refresh");SetLegacy(_7||false);}function publishOption(THIS,_12d){if(!_12d||_12d.constructor!=String){return;}cloakObject(THIS["Enable"+_12d]=function(_12e){SetOption(_12d,_12e);});}function RemoveImportListener(_12f,_130){preserveImportFailSafe();if(!_130||(Function!=_130.constructor)){if(_12f&&(Function==_12f.constructor)){_130=_12f;_12f=null;}else{return false;}}else{if(_12f&&(String!=_12f.constructor)){return false;}}var _131=[_2d.get(""),_2d.get(_12f),_2d.get(_10)];if(!_131[0]&&!_131[1]&&!_131[2]){return false;}var _132=false;for(var _133,i=_131.length;--i>=0;){if(!_131[i]){continue;}_133=_131[i].getAll();for(var id in _133){if("undefined"==typeof Object.prototype[id]){if(_133[id]==_130){_131[i].remove(id);_132=true;break;}}}}return _132;}function SetLegacy(_136){if(typeof _136=="undefined"){_136=true;}_7=_136;_19=_19||GetModule(_c);if(_136){_19.DIR_NAMESPACE=_19.USE_PATH="/";_19.DOT_NAMESPACE=_19.USE_NAME=".";cloakObject(_19.CompleteImports=completeImports);cloakObject(_19.EnableDebugging=_19.EnableDebug);cloakObject(_19.GetPathFor=DEPRECATED$GetPathFor);cloakObject(window.JSBasePath=window.JSPath=_19.SetBasePath=DEPRECATED$SetBasePath);cloakObject(window.JSImport=Import);cloakObject(window.JSLoad=Load);cloakObject(window.JSPackaging=_19);cloakObject(window.JSPackage=window.Package=Namespace);cloakObject(window.JSPacked=function(n){_15.notation=n;});cloakObject(window.NamespaceException=window.PackageException=DEPRECATED$NamespaceException);}if(_136||typeof window["JSPackaging"]=="undefined"){return;}delete _19.DIR_NAMESPACE;delete _19.DOT_NAMESPACE;delete _19.CompleteImports;delete _19.EnableDebugging;delete _19.GetPathFor;delete _19.SetBasePath;delete _19.USE_NAME;delete _19.USE_PATH;delete window.JSBasePath;delete window.JSImport;delete window.JSLoad;delete window.JSPackaging;delete window.JSPackage;delete window.JSPacked;delete window.JSPath;delete window.Package;delete window.NamespaceException;delete window.PackageException;}function SetOption(_138,_139){preserveImportFailSafe();if(!_138||_138.constructor!=String){return;}_139=typeof _139=="undefined"?true:_139;_138=_138.toLowerCase();switch(_138){case"cloak":_5=_139;break;case"debug":_6=_139;break;case"legacy":SetLegacy(_139);break;case"override":_a=_139;break;case"refresh":_b=_139;break;default:break;}}function setRefresher(url){if((/ajile.refresh/g).test(url)){return url;}return url+((/\?/g).test(url)?"&":"?")+"ajile.refresh="+Math.random();}function ShowLog(){preserveImportFailSafe();if(!_6){LOG="\r\nTo enable debug logging, use <b>Ajile.EnableDebug()</b> "+"from within any of your scripts or use Ajile's debug load-time "+"option as follows:<br><br>"+"<pre><code>&lt;script src=\""+_15.uri+"?<b>debug</b>\" "+"type=\"text/javascript\"&gt;&lt;/script&gt;</code></pre>";}var _13b="<html><head><title>Ajile's Debug Log "+(!_6?":: DISABLED":"")+"</title>\r\n"+"<style type=\"text/css\">*{background-color:#eee;color:#000;"+"font-family:\"Tahoma\";font-size:12px;}"+"</style>\r\n</head>\r\n<body>"+LOG.replace(/\r\n/g,"<br>")+"</body></html>";var _13c=screen.width/1.5;var _13d=screen.height/1.5;var _13e=window.open("","__AJILELOG__","width="+_13c+",height="+_13d+",addressbar=0,directories=0,location=0,menubar=0"+",scrollbars=1,statusbar=0,toolbar=0,resizable=1");if(!_13e){return;}_13e.document.writeln(_13b);_13e.document.close();}function SimpleSet(){var _13f={},size=0;function $SimpleSet(THIS){THIS.add=add;THIS.clear=clear;THIS.get=get;THIS.getAll=getAll;THIS.getAllArray=getAllArray;THIS.getSize=getSize;THIS.has=has;THIS.remove=remove;return THIS;}function add(key,_143){if(get(key)){return false;}_13f[key]=_143;size++;return true;}function clear(){for(var key in _13f){if("undefined"==typeof Object.prototype[key]){delete _13f[key];}}size=0;}function get(key){if("undefined"==typeof Object.prototype[key]){if("undefined"==typeof _13f[key]){return null;}else{return _13f[key];}}else{return null;}}function getAll(){return _13f;}function getAllArray(){var _146=[];for(var item in _13f){if("undefined"==typeof Object.prototype[item]){_146[_146.length]=[item,_13f[item]];}}return _146;}function getSize(){return size;}function has(key){return typeof Object.prototype[key]=="undefined"&&typeof _13f[key]!="undefined";}function remove(key){if(!has(key)){return false;}delete _13f[key];size--;return true;}if(this.constructor!=SimpleSet){if(!this.constructor||this.constructor.toString()!=SimpleSet.toString()){return new SimpleSet();}}return $SimpleSet(this);}function updateDependents(_14a){var _14b=_30.get(_14a);if(!_14b){return;}_14b=_14b.getAll();var _14c;for(var user in _14b){if("undefined"==typeof Object.prototype[user]){if(_29.has(user)&&(_14c=GetModule(user))){if(handleImportLoaded(_29.get(user),user,_14c,this)){updateDependents(user);}}}}}var _28=_11,_2c=new SimpleSet(),_2d=new SimpleSet(),_ed=(/MSIE/i).test(window.navigator.userAgent),_ec=(/Opera/i).test(window.navigator.userAgent),_eb=(/WebKit/i).test(window.navigator.userAgent),_2e=SimpleSet(),_2f={clear:function(){for(var _14e in this){if("undefined"==typeof Object.prototype[_14e]){delete this[_14e];}}}},_29=new SimpleSet(),_2a=new SimpleSet(),_30=new SimpleSet();$create(this);};