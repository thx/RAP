var ecui={};

baidu.string.trim=function(a){
return a.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g,"")};


baidu.dom.remove=function(a){
var b=a.parentNode;
b&&b.removeChild(a);
return a};





(function(){






var c=ecui,Qc=c.array={},Yc=c.browser={},C=c.dom={},Jb=c.ext={},Mb=c.string={},p=c.ui={},P=c.util={},eb=baidu,$c=eb.array,nd=eb.browser,N=eb.dom,cc=eb.string,d=void 0,ib=window,r=document,gb=Math,A=gb.min,g=gb.max,md=gb.abs,T=gb.floor,vc=gb.round,H=parseInt,v=Yc.ie=nd.ie,ad=Yc.firefox=nd.firefox,Vc=ad?"textContent":"innerText",Y=Qc.indexOf=$c.indexOf,Cb=Qc.remove=$c.remove,Cc=C.addClass=N.addClass,I=C.children=N.children,vd=C.contain=function(a,b){













































































return a==b||N.contains(a,b)},t=C.create=function(c,b,d){












var a=r.createElement(d||"div");if(b)a.style.cssText=b;if(c)a.className=c;






return a},ub=C.first=N.first,l=C.getParent=v?function(a){



















return a.parentElement}:function(a){

return a.parentNode},tb=C.getPosition=N.getPosition,L=C.getStyle=function(a,b){
























return b?N.getStyle(a,b):a.currentStyle||(v?a.style:getComputedStyle(a,null))},Kc=C.getText=function(a){












return a[Vc]},Mc=C.insertAfter=N.insertAfter,U=C.insertBefore=N.insertBefore,Ec=C.insertHTML=N.insertHTML,Od=C.ready=N.ready,J=C.remove=N.remove,uc=C.removeClass=N.removeClass,Hb=C.setInput=function(a,b,c){if(!a){if(v)return r.createElement('<input type="'+(c||"")+'" name="'+(b||"")+'">');










































































a=t("","","input")}


b=b===d?a.name:b;
c=c===d?a.type:c;if(a.name!=b||a.type!=c)if(v){


Ec(a,"beforeBegin",'<input style="'+a.style.cssText+'" class="'+a.className+'" type="'+c+'" name="'+b+'"'+(a.disabled?" disabled":"")+(a.readOnly?" readOnly":"")+">");






b=a;
(a=a.previousSibling).value=b.value;if(c=="radio")a.checked=b.checked;



J(b)}else{


a.type=c;
a.name=b}


return a},gd=C.setStyle=N.setStyle,Nd=C.setText=function(b,a){




















b[Vc]=a},Md=Mb.encodeHTML=cc.encodeHTML,Td=Mb.sliceByte=function(a,d,c){





















for(var 
b=0,e=a.length,f="number"==typeof c?function(a){


return a>127?c:1}:c;b<e;b++){




d-=f(a.charCodeAt(b));if(d<0)return a.substring(0,b)}





return a},Nc=Mb.toCamelCase=cc.toCamelCase,yd=Mb.toHalfWidth=cc.toHalfWidth,ob=Mb.trim=cc.trim,hb=P.attachEvent=function(a,c,b){






































a.attachEvent?a.attachEvent("on"+c,b):a.addEventListener(c,b,false)},lb=P.blank=function(){},bc=P.cancel=function(){


















return false},G=P.copy=eb.object.extend,Rd=P.createSWF=eb.swf.create,Nb=P.detachEvent=function(a,c,b){




















































a.detachEvent?a.detachEvent("on"+c,b):a.removeEventListener(c,b,false)},Hc=P.findPrototype=function(c,b){












for(var 
d=c[b],a=c.constructor.prototype;a;a=a.constructor.superClass)if(d!=a[b])return a[b]},Eb=P.getView=function(){
























var a=r.body,b=l(a),c=r.compatMode=="BackCompat"?a:r.documentElement,e=b.scrollTop+a.scrollTop,d=b.scrollLeft+a.scrollLeft,f=c.clientWidth,h=c.clientHeight;







return{top:e,right:f+d,bottom:h+e,left:d,width:g(b.scrollWidth,a.scrollWidth,f),height:g(b.scrollHeight,a.scrollHeight,h)}},f=P.inherits=function(a,b){


















eb.lang.inherits(a,b);
return a.prototype},zd=P.parse=eb.json.parse,de=P.stringify=eb.json.stringify,m=P.toNumber=function(a){



























return H(a)||0},xb=c.Timer=function(c,d,a){











var b=Array.prototype.slice.call(arguments,3);
this._nID=setTimeout(function(){
c.apply(a,b);
b=a=null},d)},Gc,lc,Bc,k,Ic,nc,Wd,hc,Rb,V,Wb,fc,Xb,wb,Pc,jc,Ob,W,Ub,qb,ab,Q,




















































































b=p.Control=function(b,a){

var c=b.style;

this._bCapture=a.capture!==false;
this._bFocus=a.focus!==false;
this._sUID=a.uid;
this._sBaseClass=this._sClass=a.base;
this._sType=a.type;
this._eBase=this._eBody=b;
this._bEnabled=a.enabled!==false;
this._cParent=null;

/px$/.test(a=c.width)||(this._sWidth=a);
/px$/.test(a=c.height)||(this._sHeight=a);

Gc(b,this)},a=b.prototype,






































Qb=p.Scroll=function(e,c){

var a=c.base,d=c.type,f=0,g=[["_uPrev",Dc,Lc],["_uNext",Dc,pc],["_uBlock",bd]];








c.focus=false;
c.custom=true;


e.onselectstart=bc;

e.innerHTML='<div style="position:absolute;top:0px;left:0px" class="'+d+"-prev "+a+'-prev"></div><div style="position:absolute;top:0px;left:0px" class="'+d+"-next "+a+'-next"></div><div style="position:absolute" class="'+d+"-block "+a+'-block"></div>';





d=I(e);

b.call(this,e,c);


this._nValue=this._nTotal=0;
this._nStep=1;


for(;a=g[f];)(this[a[0]]=k(a[1],d[f++],this,{focus:false,custom:true}))._fAction=a[2]},z=f(Qb,b),bd=function(a,c){














b.call(this,a,c)},yc=f(bd,b),Dc=function(a,c){



b.call(this,a,c)},kc=f(Dc,b),











qc=p.VScroll=function(a,b){
Qb.call(this,a,b)},zb=f(qc,Qb),












Tc=p.HScroll=function(a,b){
Qb.call(this,a,b)},Ab=f(Tc,Qb),













































vb=p.Panel=function(c,d){

var n=0,m=0,e=d.base,h=d.vScroll!==false,g=d.hScroll!==false,f=h&&g,j=[[h,"_uVScroll",qc],[g,"_uHScroll",Tc],[f,"_uCorner",b]],a=t(c.className,c.style.cssText+";overflow:hidden"),o=c.nextSibling,i=l(c);














a.innerHTML=(h?'<div style="position:absolute" class="ec-vscroll '+e+'-vscroll"></div>':"")+(g?'<div style="position:absolute" class="ec-hscroll '+e+'-hscroll"></div>':"")+(f?'<div style="position:absolute" class="'+d.type+"-corner "+e+'-corner"></div>':"")+'<div class="'+e+'-layout" style="position:absolute;overflow:hidden"></div>';











a.lastChild.appendChild(c);
c.className=e+"-main";
c.style.cssText="top:0px;left:0px"+(g?";white-space:nowrap":"");
i&&i.insertBefore(a,o);


f=I(a);

b.call(this,a,d);
this._bAbsolute=!(!d.absolute);
this._nWheelDelta=d.wheelDelta;

this.$setBody(c);


for(;a=j[n++];)if(a[0])this[a[1]]=k(a[2],f[m++],this)},K=f(vb,b),







































X=p.Edit=function(c,e){

var h=0,g=["onkeydown","onkeypress","onkeyup","onfocus","onblur","onchange","ondragover","ondrop","onpaste"],f=e.input;if(c.tagName=="INPUT"){








var a=c,i=c.nextSibling,d=l(c);



c=t(a.className,a.style.cssText+";overflow:hidden");

J(a);
a.className="";
a.style.cssText="border:none";
c.appendChild(a);
d&&d.insertBefore(c,i)}else{


c.style.overflow="hidden";if(a=c.getElementsByTagName("input")[0])a.style.border="none";else{




a=Hb(null,e.name,f);
a.value=e.value||"";
a.style.border="none";
c.appendChild(a)}}


this._eInput=a;if(f!="hidden")for(;d=g[h++];)a[d]=jb[d]||null;else if(f!=a.type)a.style.display="none";












v?Gb(this,false):a.addEventListener("input",rc,false);

gd(c,"display","inline-block");

b.call(this,c,e)},u=f(X,b),jb={},rc=v?function(){if(event.propertyName=="value"){











var a=V(this);
Gb(a);
a.change();
Gb(a,false)}}:function(){


V(this).change()},Gb=X.stop=v?function(a,b){










a._eInput.onpropertychange=b!==false?null:rc}:lb,



































tc=p.FormatEdit=function(b,a){


X.call(this,b,a);

this._bSymbol=a.symbol!==false;
this._bTrim=a.trim!==false;
this._sEncoding=a.encoding;
this._oKeyMask=a.keyMask?new RegExp("["+a.keyMask+"]","g"):null;
this._nMinLength=a.minLength;
this._nMaxLength=a.maxLength;
this._nMinValue=a.minValue;
this._nMaxValue=a.maxValue;
this._oPattern=a.pattern?new RegExp("^"+a.pattern+"$"):null},Kb=f(tc,X),


























fe=p.Label=function(c,a){

b.call(this,c,a);

lc(this,this.setFor,a['for'])},ed=f(fe,b),




































qd=p.Checkbox=function(a,b){

var c=a.tagName=="INPUT"?a.checked:b.checked;

b.input="hidden";
X.call(this,a,b);
a=this.getInput();
a.checked=true;

this._aInferior=[];
this._nStatus=2;
this.setChecked(!(!c));

lc(this,this.setSuperior,b.superior)},$=f(qd,X),




































nb=p.Radio=function(a,b){

b.input="radio";
X.call(this,a,b);
this.getInput().style.display="none";if(a=this.getName())(nb["ec-"+a]=nb["ec-"+a]||[]).push(this);





b.checked&&this.checked();if(v)this.$change=je},bb=f(nb,X),

























Z=p.Item=function(a,c){

b.call(this,a,c);
this.getBody().style.overflow="hidden"},O=f(Z,b),q=p.Items={},

















































Ac=p.Select=function(a,d){

var f=0,i=d.name||"",j=d.type,e=a.options,n=l(a),o=a.nextSibling,c,h=-1,m=[],g=t(a.className,a.style.cssText);










J(a);if(e){




i=a.name||i;

a=t();

for(;c=e[f];f++){
m[f]='<div value="'+Md(c.value)+'">'+c.text+"</div>";if(c.selected)h=f}





a.innerHTML=m.join("")}


a.className="ec-panel "+d.base+"-options";
a.style.cssText="position:absolute;z-index:65535;display:none";

g.innerHTML='<div class="ec-item '+j+'-text"></div><div style="position:absolute" class="ec-control '+j+'-button"></div><input type="'+(d.input||"hidden")+'" name="'+i+'">';


e=I(g);
e[2].value=d.value||"";

X.call(this,g,d);


c=this._uOptions=k(vb,a,this,{hScroll:false});
this._cScroll=c.$getSection("VScroll");
this.$setBody(c.getBody());


this._uText=k(Z,e[0],this,{capture:false});


this._uButton=k(b,e[1],this,{capture:false});


this._nOptionSize=d.optionSize||5;if(v)this.$change=Ad;






this.$initItems();


h>=0?this.setSelected(h):this.setValue(this.getValue());

n&&n.insertBefore(this.getOuter(),o)},E=f(Ac,X),oc={},








































Ed=p.Combox=function(b,a){

a.input=a.input||"text";
Ac.call(this,b,a);
this.$getSection("Text").getOuter().style.display="none"},ge=f(Ed,Ac),






























Fc=p.Grid=function(c,g){


var e=this._aItem=[],a=0,f=I(c),d;




b.call(this,c,g);

for(;d=f[a];)(e[a]=k(ld,d,this))._nIndex=a++},Rc=f(Fc,b),ld=function(a,c){







b.call(this,a,c)},kd=f(ld,b),































Dd=p.Calendar=function(d,f){


var c=f.base,e=[],a=0;



b.call(this,d,f);

for(;a<7;)e[a]='<div style="float:left" class="ec-grid-item '+c+'-name-item">'+["\u65e5","\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d"][a++]+"</div>";



e[a]='</div><div class="ec-grid '+c+'-date">';
for(;++a<50;)e.push('<div style="float:left" class="ec-grid-item '+c+'-date-item"></div>');



d.innerHTML='<div class="ec-grid '+c+'-name">'+e.join("")+"</div>";

this._uNames=k(Fc,d.firstChild,this);


(this._uDate=k(Fc,d.lastChild,this)).$click=ae;


this.setDate(f.year,f.month)},Bb=f(Dd,b),







































ke=p.Form=function(d,c){


var e=c.base,a=ub(d);


a=a&&a.tagName=="LABEL"?a:t();
a.className="ec-control "+e+"-title "+a.className;
a.style.position="absolute";

a.onselectstart=bc;

this._bHide=c.hide;
this._nTitleAuto=c.titleAuto||"width";
b.call(this,d,c);


(this._uTitle=k(b,a,this,{focus:false})).$mousedown=Bd;
d.appendChild(a);


(this._uClose=k(b,a=t("ec-control "+e+"-close","position:absolute"),this)).$click=Pd;




d.appendChild(a);


this.getOuter().style.zIndex=Tb.push(this)-1+dd},db=f(ke,b),dd=4096,Tb=[],






































sb=p.Tree=function(a,c){

var d=ub(a),h=1,f=this._aTree=[];



c=G(G({},c),getParameters(a));if(d&&d.tagName=="LABEL"){



b.call(this,a,c);


for(var 
e=t(a.className,a.style.cssText),g=I(a);d=g[h++];){



e.appendChild(d);
f.push(this.$createChild(c,d,this))}


_c(this,e);
Mc(e,a)}else b.call(this,a,c);






a=a.style;if(a.display=="none"||c.fold){

a.display="";
this.setFold()}else ic(this)},D=f(sb,b),








































ee=p.CheckTree=function(a,b){

b=G(G({},b),getParameters(a));

sb.call(this,a,b);

this._sSuperior=b.superior;

var f=this._uCheckbox=k(qd,a.insertBefore(t("ec-checkbox "+this.getBaseClass()+"-checkbox"),a.firstChild),this,b),c=this.getChildTrees(),e=0;








for(;a=c[e++];){
b=a._sSuperior;
a=a._uCheckbox;if(b===d)a.setSuperior(f);else if(b!==true)lc(a,a.setSuperior,b)}},Ud=f(ee,sb),































































Yb=p.Table=function(c,g){

var o=g.base,n=g.type,e=this._aRow=[],u=this._aCol=[],d=0,f=c.style,l=ub(c),h=ub(l),i=h,q=[],r=[],v=g.crossCell;












this._bAutoWidth=!/px$/.test(f.width);
this._bAutoHeight=!/px$/.test(f.height);
J(l);if(h.tagName!="THEAD"){


h=U(t("","","thead"),h);
h.appendChild(I(i)[0])}


l.setAttribute("cellSpacing","0");
i=I(h.nextSibling);

for(;a=i[d];){
a.className=n+"-row "+o+"-row "+a.className;
i[d]=I(a);
a=e[d]=k(this.$getRowClass(),a,this);
q[d]=a._aCol=[];
r[d++]=0}


g.wheelDelta=1;
vb.call(this,c,g);if(a=this._cVScroll=this.$getSection("VScroll"))a.setValue=td;if(a=this._cHScroll=this.$getSection("HScroll"))a.setValue=td;










var a=t(n+"-area "+o+"-area","position:absolute;top:0px;overflow:hidden"),s=this._uHead=k(b,a,this);





a.innerHTML='<div style="white-space:nowrap;position:absolute"><table cellspacing="0"><tbody></tbody></table></div>';


this.getBase().appendChild(a);

s.$setBody(c=h.lastChild);


for(d=0,(h=I(c));c=h[d];d++){
a=c.className;
f=a.replace(/^\s+/,"");
e=f.indexOf(" ");
f=e<0?f:f.substring(0,e);
c.className=n+"-head "+o+"-head "+a;

u.push(k(wc,c,s));

f=n+"-item "+(f||o)+"-item ";
for(e=0;a=i[e];e++){
g=q[e];if(g.length<=d){

g[d]=c=a[d-r[e]];if(v){

var j=m(c.getAttribute("rowSpan"))||1,p=m(c.getAttribute("colSpan"))||1;

while(j--){
j||p--;
for(g=p;g--;)q[e+j].push(j?false:null);


r[e+j]+=p}}


c.className=f+c.className;
c.getControl=ec}}}




this.getBody().appendChild(l)},w=f(Yb,vb),ac=Yb.Row=function(a,c){




b.call(this,a,c)},rb=f(ac,b),wc=function(a,c){



b.call(this,a,c)},dc=f(wc,b),fd=function(a,c){



b.call(this,a,c)},mc=f(fd,b),




















































$d=p.LockedTable=function(a,d){

var e=d.base,g=d.type,h=t("","position:absolute;top:0px;left:0px"),f=0,c=[],i=this._aLockedRow=[];






Yb.call(this,a,d);
this._nLeftLock=d.leftLock||0;
this._nRightLock=d.rightLock||0;


for(d=this.getRows();a=d[f];){
a=a.getBase();
c[f++]='<tr style="'+a.style.cssText+'" class="'+a.className+'"><td style="padding:0px;border:0px"></td></tr>'}



h.innerHTML='<div class="'+g+"-area "+e+'-area" style="overflow:hidden">'+'<div style="white-space:nowrap;position:absolute">'+'<table cellspacing="0"><thead><tr><td style="padding:0px;border:0px"></td></tr></thead>'+'</table></div></div><div class="'+g+"-layout "+e+'-layout" style="overflow:hidden;position:relative">'+'<div style="white-space:nowrap;position:absolute;top:0px;left:0px;">'+'<table cellspacing="0"><tbody>'+c.join("")+"</tbody></table></div></div>";








c=this._uLockedHead=k(b,h.firstChild,this);
c.$setBody(c.getBase().lastChild.lastChild.firstChild.lastChild);
c._eFill=c.getBody().lastChild;

c=this._uLockedMain=k(b,h.lastChild,this);
c.$setBody(a=c.getBase().lastChild);


for(f=0,(c=I(a.lastChild.lastChild));g=c[f];){
i.push(e=k(this.$getRowClass(),g,this));
e._eFill=e.getBase().lastChild;
a=d[f++];
a._cMain=e._cMain=a;
e._cJoint=a;
a._cJoint=e}

U(h,this.getBase().firstChild)},fb=f($d,Yb),Wc=function(a,b){




ac.call(this,a,b)},Sc=f(Wc,ac),











































$b=p.Popup=function(c,g){

var i=0,h=[["_uNext","lastChild",ie],["_uPrev","firstChild",Cd]],a=c.style,e=g.base,d=this._nOptionSize=g.optionSize,f;









J(c);
a.display="none";
a.position="absolute";if(d){


d=c;
c=t(d.className,a.cssText);
d.className="";
a.cssText="position:absolute;top:0px;left:0px";
c.style.overflow="hidden";
c.innerHTML='<div class="ec-control '+e+'-prev" style="position:absolute;top:0px;left:0px"></div><div class="ec-control '+e+'-next" style="position:absolute"></div>';





for(;f=h[i++];){
a=this[f[0]]=k(b,e=c[f[1]],this);
e.onselectstart=bc;
a.setFocus(false);
a.$mousedown=Gd;
a.$click=f[2]}


U(d,e)}


b.call(this,c,g);

d&&this.$setBody(d);


this.$initItems()},S=f($b,b),Fd=$b.Item=function(a,c){




var b=ub(a);if(b&&b.tagName=="LABEL"){



U(b,a);
b.className=a.className;
b.style.cssText=a.style.cssText+";display:block";
a.className="ec-popup "+V(l(a)).getBaseClass();
this._cPopup=k($b,a,this,getParameters(a));
a=b}


Z.call(this,a,c);

this.setFocus(false);
this.getItems()[0]&&this.setClass(this.getBaseClass()+"-complex")},kb=f(Fd,Z),_,
































Oc=p.Listbox=function(b,a){

a.hScroll=false;
a.vScroll=true;
this._sName=a.name||"";

vb.call(this,b,a);

this._cScroll=this.$getSection("VScroll");
this.$initItems()},cb=f(Oc,vb),Yd=Oc.Item=function(a,b){




Z.call(this,a,b)},mb=f(Yd,Z),


























Qd=p.Progress=function(a,c){

var d=c.base,e=a.innerHTML;


a.innerHTML='<div style="position:absolute;left:0px;top:0px" class="'+d+'-text"></div>'+'<div style="position:absolute;left:0px;top:0px" class="'+d+'-complete"></div>';


this._eText=a.firstChild;
this._eComplete=a.lastChild;

b.call(this,a,c);

this.setText(c.rate||0,e)},Zb=f(Qd,b),
























Fb=c.Color=function(a){if("string"==typeof a)this.setRGB(H(a.substring(0,2),16),H(a.substring(2,4),16),H(a.substring(4,6),16));else this.setRGB(0,0,0)},B=Fb.prototype;























function pb(b,c,a){
a=a<0?a+1:a>1?a-1:a;
a=a<.5?A(6*a,1):g(4-6*a,0);
return gb.round(255*(b+(c-b)*a))}








B.getBlue=function(){
return this._nBlue};








B.getGreen=function(){
return this._nGreen};








B.getHue=function(){
return this._nHue};








B.getLight=function(){
return this._nLight};








B.getRGB=function(){
var a=this._nRed,c=this._nGreen,b=this._nBlue;



return((a<16?"0":"")+a.toString(16)+(c<16?"0":"")+c.toString(16)+(b<16?"0":"")+b.toString(16)).toUpperCase()};










B.getRed=function(){
return this._nRed};








B.getSaturation=function(){
return this._nSaturation};










B.setRGB=function(a,b,d){
this._nRed=a;
this._nGreen=b;
this._nBlue=d;

a/=255;
b/=255;
d/=255;

var h=A(a,b,d),f=g(a,b,d),e=f-h,c;




this._nLight=(f+h)/2;if(e){

c=a==f?(b-d)/6/e:b==f?.3333333333333333+(d-a)/6/e:.6666666666666666+(a-b)/6/e;


this._nHue=c<0?(c+=1):c>1?(c-=1):c;
this._nSaturation=this._nLight<.5?e/(f+h):e/(2-f-h)}else{




this._nHue=0;
this._nSaturation=0}};











B.setHSL=function(b,e,a){
var c=a+Math.min(a,1-a)*e,d=2*a-c;


this._nHue=b;
this._nSaturation=e;
this._nLight=a;

this._nRed=pb(d,c,b+.3333333333333333);
this._nGreen=pb(d,c,b);
this._nBlue=pb(d,c,b-.3333333333333333)};
































var _d=p.Palette=function(e,d){

var h=v&&v<8?"display:inline;zoom:1":"display:inline-block",a=d.base,f=['<div style="float:left" class="'+a+'-left"><div style="position:relative;overflow:hidden" class="ec-control '+a+'-image"><div style="position:absolute" class="ec-control '+a+'-cross"><div></div></div></div></div><div style="float:left" class="'+a+'-mid"><div style="position:relative" class="ec-control '+a+'-lightbar">'],c=1,i=this._aBasic=[],g=this._aValue=[];












for(;c<257;)f[c++]='<div style="height:1px;overflow:hidden"></div>';



f[c++]='<div style="position:absolute" class="ec-control '+a+'-arrow"><div></div></div></div></div><div style="float:left" class="'+a+'-right"><p>\u57fa\u672c\u989c\u8272</p><div style="white-space:normal" class="'+a+'-basic">';



for(;c<306;)f[c++]='<div style="'+h+";background:#"+od[c-259]+'" class="ec-control '+a+'-area"></div>';




f[c]='</div><table cellspacing="0" cellpadding="0" border="0"><tr><td class="'+a+'-color" rowspan="3"><div class="ec-control '+a+'-show"></div><input class="ec-edit '+a+'-value"></td><th>\u8272\u8c03:</th><td><input class="ec-edit '+a+'-edit"></td><th>\u7ea2:</th><td><input class="ec-edit '+a+'-edit"></td></tr><tr><th>\u9971\u548c\u5ea6:</th><td><input class="ec-edit '+a+'-edit"></td><th>\u7eff:</th><td><input class="ec-edit '+a+'-edit"></td></tr><tr><th>\u4eae\u5ea6:</th><td><input class="ec-edit '+a+'-edit"></td><th>\u84dd:</th><td><input class="ec-edit '+a+'-edit"></td></tr></table><div class="ec-control '+a+'-button">\u786e\u5b9a</div></div>';











e.innerHTML=f.join("");

b.call(this,e,d);

e=e.firstChild;
(d=this._uMain=k(b,f=e.firstChild,this)).$mousedown=he;

(this._uCross=k(b,f.lastChild,d,{capture:false})).$dragmove=pd;


e=e.nextSibling;
(d=this._uLightbar=k(b,f=e.firstChild,this)).$mousedown=Xd;

(this._uArrow=k(b,f.lastChild,d,{capture:false})).$dragmove=ud;


f=I(e.nextSibling);
for(c=0,(e=I(f[1]));c<48;){
d=i[c]=k(b,e[c],this);
d.$click=Hd;
d._nIndex=c++}


e=f[2].getElementsByTagName("td");
this._uColor=k(b,e[0].firstChild,this);

d=g[0]=k(tc,e[0].lastChild,this);
d.$keypress=ce;
d.$change=be;

for(c=1;c<7;){
d=g[c]=k(tc,e[c].lastChild,this,{keyMask:"0-9",maxValue:255,maxLength:3});




d.$change=Id;
d._nIndex=++c}


(this._uConfirm=k(b,f[3],this)).$click=Ld},Ib=f(_d,b),M=new Fb(),od=["FF8080","FFFF80","80FF80","00FF80","80FFFF","0080F0","FF80C0","FF80FF","FF0000","FFFF00","80FF00","00FF40","00FFFF","0080C0","8080C0","FF00FF","804040","FF8040","00FF00","008080","004080","8080FF","800040","FF0080","800000","FF8000","008000","008040","0000FF","0000A0","800080","8000FF","400000","804000","004000","004040","000080","000040","400040","400080","000000","808000","808040","808080","408080","C0C0C0","400040","FFFFFF"],































Vb=p.SWFControl=function(e,a){

var c=this._sMovieId="ECUI_SWF_"+ ++Kd,d=a.vars||{};


b.call(this,e,a);

d.id=c;
Rd({id:c,url:a.swf,width:a.width||1,height:a.height||1,wmode:a.wmode||"opaque",bgcolor:a.bgcolor||"#FFFFFF",align:a.align||"middle",vars:d},e)},Pb=f(Vb,b),Kd=0,
























Zd=p.PCTPStream=function(b,a){

this._sUrl=a.url;
Vb.call(this,b,a)},Lb=f(Zd,Vb),














Jd=p.Storage=function(a,b){

Vb.call(this,a,b)},rd=f(Jd,Vb),

























R=Jb.Decorator=function(b,f){

var d=b.getUID(),c=(this._oInner=R[d]||b).getOuter(),a=c.style,e=this._eOuter=t(this._sClass=f||b.getBaseClass()+"-decorator","position:"+(a.position=="absolute"?"absolute":"relative")+";top:"+(a.top||"auto")+";left:"+(a.left||"auto")+(a.display?";display:"+a.display:""));









a.position="relative";
a.top="auto";
a.left="auto";
a.display="block";

U(e,c);
e.appendChild(c);

R[d]=this;


G(b,yb)},F=R.prototype,yb={},
















Vd=Jb.LRDecorator=function(b,a){
R.call(this,b,a);

a=this.getClass();
Sb(b,a+"-left");
Sb(b,a+"-right")},













Sd=Jb.TBDecorator=function(b,a){
R.call(this,b,a);

a=this.getClass();
Sb(b,a+"-top");
Sb(b,a+"-bottom")},













xd=Jb.MagicDecorator=function(c,b){
R.call(this,c,b);

b=this.getClass()+"-widget";
for(var a=0;a<9;a++)a!=4&&Sb(c,b+a)};















xb.prototype.stop=function(){
clearTimeout(this._nID)};






(function(){
var K="ecui",F,P,O,M=[],N,u,q,R,z=[],B,$=0,D={},h,f=null,H=null,w=null,X=[],a={mousedown:function(a){





























a=Q(a);
f=a.getTarget();if(f){



f.isFocus()&&ab(f);
f.mousedown(a);
f.pressstart(a)}else ab()},mouseover:function(c){








c=Q(c);

var e=H,g=Z(H=c.getTarget(),e),d=a.type,d=d!="drag"&&d!="zoom",b;







for(b=e;b!=g;b=b.getParent()){
b.mouseout(c);
f==b&&(d&&b.pressout(c))}

for(b=H;b!=g;b=b.getParent()){
b.mouseover(c);
f==b&&(d&&b.pressover(c))}},mousemove:function(b){




b=Q(b);


for(var a=b.getTarget();a;a=a.getParent()){
a.mousemove(b);
f==a&&a.pressmove(b)}},mouseup:function(a){




a=Q(a);

var b=a.getTarget();
b&&b.mouseup(a);if(f){


f.pressend(a);

f.contain(b)&&f.click(a);
f=null}}},n={type:"drag",mousemove:function(c){








c=Q(c);


var b=a.target,h=b.getX()+u-a.x,f=b.getY()+q-a.y,e=A(g(h,a.left),a.right),d=A(g(f,a.top),a.bottom);







b.ondragmove&&b.ondragmove(c,e,d)===false||(b.$dragmove(c,e,d)===false||b.setPosition(e,d));



a.x=u+b.getX()-h;
a.y=q+b.getY()-f},mouseup:function(b){



var c=a.target;
c.ondragend&&c.ondragend(Q(b))===false||c.$dragend(b);
qb();

v&&r.body.releaseCapture(false);
a.mouseup(b)}},T={type:"forcibly",mousedown:function(b){







b=Q(b);

var e=a,d=e.target,c=b.getTarget();if(c&&!c.isFocus()){





c.mousedown(b);
c.pressstart(b);
f=c}else if(d.onforcibly&&d.onforcibly(b)===false||d.$forcibly(b)===false)e!=a&&a.mousedown(b);else qb()}},E={type:"zoom",mousemove:function(f){















f=Q(f);
var e=a.target,b=a.width,i=a.width=u-a.x+b,c=a.height,j=a.height=q-a.y+c,h=a.minWidth,m=a.maxWidth,k=a.minHeight,l=a.maxHeight;









a.x=u;
a.y=q;

var o=a.left,n=a.top;


b=h!==d?g(h,i):i;
c=k!==d?g(k,j):j;
b=m!==d?A(m,b):b;
c=l!==d?A(l,c):c;


e.setPosition(b<0?o+b:o,c<0?n+c:n);
e.onzoom&&e.onzoom(f)===false||(e.$zoom(f)===false||e.setSize(md(b),md(c)))},mouseup:function(c){




var b=a.target;
b.onzoomend&&b.onzoomend(Q(c))===false||b.$zoomend(c);
qb();
v&&r.body.releaseCapture(false);


b==h?b.hide():Ub();
a.mouseup(c)}};











Gc=c.$bind=function(a,b){
a._cControl=b;
a.getControl=db};











lc=c.$connect=function(b,d,a){if(a){

var c=B[a];
c?d.call(b,c):(D[a]||(D[a]=[])).push({func:d,caller:b})}};






















Bc=c.$create=function(a,b){
b=b||{};

var d=b.parent,f=b.base,g=b.element,e=b.id,h=b.type,c,i=0;







b.uid="ec-"+ ++$;if(g){if(g.getControl)return g.getControl()}else g=t();












g.className+=(" "+(h&&h!=a?h:(b.type="ec-"+a.toLowerCase()))+(f?" "+f:""));



f=f||g.className.replace(/^\s+/,"");
c=f.indexOf(" ");
b.base=c<0?f:f.substring(0,c);


a=new p[Nc(a.charAt(0).toUpperCase()+a.substring(1))](g,b);
a.create(b);if(d)a.setParent(d);else if(d=V(l(a.getOuter())))d.onappend&&d.onappend(a)===false||(d.$append(a)===false||a.$setParent(d));









z.push(a);

c=b.decorate;
c&&c.replace(/([^(]+)\(([^)]+)\)/g,function(d,b,c){

b=ob(b);
b=Jb[Nc(b.charAt(0).toUpperCase()+b.substring(1))];


c=ob(c).split(/\s+/);
for(var e=0;d=c[e++];)new b(a,d)});if(e)B[e]=a;if(c=D[e])for(D[e]=null;e=c[i++];)e.func.call(e.caller,a);















return a};













k=c.$fastCreate=function(b,e,g,a){
var c=e.className,d=c.indexOf(" "),f=c.indexOf(" ",d+1);



a=a||{};

a.uid="ec-"+ ++$;
a.type=c.substring(0,d);
a.base=c.substring(d+1,f<0?c.length:f);


b=new b(e,a);
b.create(a);
b.$setParent(g);

z.push(b);
return b};










Ic=c.calcHeightRevise=function(a){
return F?m(a.borderTopWidth)+m(a.paddingTop)+m(a.paddingBottom)+m(a.borderBottomWidth):0};













c.calcLeftRevise=function(a){
return P?m(L(a.offsetParent,"borderLeftWidth")):0};










c.calcTopRevise=function(a){
return P?m(L(a.offsetParent,"borderTopWidth")):0};










nc=c.calcWidthRevise=function(a){
return F?m(a.borderLeftWidth)+m(a.paddingLeft)+m(a.paddingRight)+m(a.borderRightWidth):0};



















Wd=c.create=function(a,b){
a=Bc(a,b);
a.cache();
a.paint();
a.init();
return a};








hc=c.dispose=function(a){
var d=z.length,f=a instanceof ecui.ui.Control,c,b,e={};






f?Ob(a):w&&(vd(a,w.getOuter())&&ab(V(l(a))));for(b in B)e[B[b].getUID()]=b;








while(d--){
c=z[d];if(f?a.contain(c):vd(a,c.getOuter())){

c.dispose();
b=e[c.getUID()];
b&&delete B[b];
z.splice(d,1)}}};


















Rb=c.drag=function(a,d,h){if(d.type=="mousedown"){

var e=a.getOuter(),c=e.offsetParent,b=L(c),f=c.tagName;




G(n,f=="BODY"||f=="HTML"?Eb():{top:0,right:c.offsetWidth-m(b.borderLeftWidth)-m(b.borderRightWidth),bottom:c.offsetHeight-m(b.borderTopWidth)-m(b.borderBottomWidth),left:0});





G(n,h);
n.right=g(n.right-a.getWidth(),n.left);
n.bottom=g(n.bottom-a.getHeight(),n.top);
n.target=a;
S(n);


b=e.style;
b.top=a.getY()+"px";
b.left=a.getX()+"px";
b.position="absolute";

v&&r.body.setCapture();
a.ondragstart&&a.ondragstart(d)===false||a.$dragstart(d)}};


















Q=c.event=function(a){
var b=r.body,c=l(b);if(v){



a=ib.event;
a.pageX=c.scrollLeft+b.scrollLeft+a.clientX-b.clientLeft-c.clientLeft;
a.pageY=c.scrollTop+b.scrollTop+a.clientY-b.clientTop-c.clientTop;
a.target=a.srcElement;
a.which=a.keyCode;
a.stopPropagation=eb;
a.preventDefault=C}


a.getTarget=_;

u=a.pageX;
q=a.pageY;

R=a.which||R;

return a};










V=c.findControl=function(a){
for(;a&&a.nodeType==1;a=l(a))if(a.getControl)return a.getControl();





return null};









forcibly=c.forcibly=function(a){
T.target=a;
S(T);

hb(r,"selectstart",C);
hb(r,"mousedown",C)};










c.get=function(e){if(!B){for(b in a)hb(r,b,a[b]);






B={};


var d=r.body,b="data-ecui";


K=d.getAttribute(b)||K;
d.setAttribute(b,"");

Ec(d,"beforeEnd",'<div style="position:absolute;top:0px;left:0px;background-color:#000;display:none"></div><div style="position:relative;width:8px;border:1px solid"><div></div></div>');





b=d.lastChild;
F=b.offsetWidth>8;
P=b.firstChild.offsetTop;
J(b);
N=d.lastChild;
hb(ib,"resize",Ub);
hb(ib,"unload",bb);


c.init(d)}

return B[e]||null};








Wb=c.getFocused=function(){
return w||null};









fc=c.getKey=function(){
return R};










Xb=c.getMouseX=function(a){if(a){

a=a.getOuter();
return u-tb(a).left-m(L(a,"borderLeftWidth"))}

return u};










wb=c.getMouseY=function(a){if(a){

a=a.getOuter();
return q-tb(a).top-m(L(a,"borderTopWidth"))}

return q};









getParameters=c.getParameters=function(f){
var b=f.getAttribute(K),g={},e;if(b){




f.removeAttribute(K);
b=b.split(";");
e=b.length;

for(;e--;){
var c=b[e],d=c.indexOf(":"),h=ob(d>=0?c.substring(0,d):c),a=d>=0?ob(c.substring(d+1))||"true":"true";




g[Nc(ob(h))]=/^\d+(\.\d+)?$/.test(a)?+a:a=="true"?true:a=="false"?false:a}}






return g};









Pc=c.getPressed=function(){
return f};









c.init=function(b){
var a=0,d=0,c=b.getElementsByTagName("*"),g=[b],e=[],f;if(!O){







f=O=true;
Nb(ib,"resize",Ub)}



for(;b=c[a];)g[++a]=b;



for(a=0;b=g[a++];)if(l(b)){

c=getParameters(b);
c.element=b;if(b=c.type)e[d++]=Bc(b,c)}







for(a=0;a<d;)e[a++].cache();


for(a=0;a<d;)e[a++].paint();


for(a=0;a<d;)e[a++].init();if(f){




O=false;
hb(ib,"resize",Ub)}};









jc=c.isFixedSize=function(){
return F};









Ob=c.loseFocus=function(a){
a.contain(w)&&ab(a.getParent())};










W=c.mask=function(a,d){
var c=Eb(),b=N.style,e=r.body;



d=d||32767;if("number"!=typeof a){if(a!==false){




a||M.pop();
a=M.length}if(!a){



b.display="none";
uc(e,"mask");
Nb(ib,"scroll",U);
return}

a=M[a-1];
d=a[1];
a=a[0]}else M.push([a,d]);





b.top=c.top+"px";
b.left=c.left+"px";
b.width=c.right-c.left+"px";
b.height=c.bottom-c.top+"px";
b.zIndex=d;
gd(N,"opacity",a);if(b.display){

b.display="";
Cc(e,"mask");
hb(ib,"scroll",U)}};








Ub=c.paint=function(){
var c=0,b=a.type;

W(false);if(b!="zoom"){


b=="drag"&&a.mouseup();
for(;b=z[c++];)b.resize()}



v<8?new xb(W,0,null,true):W(true)};













c.query=function(a){
a=a||{};

for(var 
h=0,c=[],f=a.type,e=a.parent,g=a.custom,b;b=z[h++];)if((!f||b instanceof f)&&((e===d||b.getParent()==e)&&(!g||g(b))))c.push(b);













return c};







qb=c.restore=function(){
I(a,true);
I(a=X.pop());

Nb(r,"selectstart",C);
Nb(r,"mousedown",C)};












c.select=function(g,f,j){if(f.type=="mousedown"){if(!h){



a=r.body;
Ec(a,"beforeEnd",'<div class="ec-control ec-selector" style="overflow:hidden"><div class="ec-selector-box"></div></div>');





h=k(b,a.lastChild);

h.$setSize=cb;
for(var e=3,i=["start","","end"];e--;){
var a=i[e],d="select"+a;

h["$zoom"+a]=new Function("e","var o=this.target;o.on"+d+"&&o.on"+d+"(e)===false||o.$"+d+"(e)")}}








h.setPosition(u,q);
h.setSize(1,1);
h.setClass(j||"ec-selector"),h.show();

h.target=g;

c.zoom(h,f)}};










ab=c.setFocused=function(a){
var c=Z(w,a),b;



for(b=w;b!=c;b=b.getParent())b.blur();



for(w=a;a!=c;a=a.getParent())a.focus()};

















c.zoom=function(a,b,c){if(b.type=="mousedown"){


a.getOuter().style.position="absolute";


c&&G(E,c);
G(E,{left:a.getX(),top:a.getY(),width:a.getWidth(),height:a.getHeight()});





E.target=a;
S(E);

v&&r.body.setCapture();
a.onzoomstart&&a.onzoomstart(b)===false||a.$zoomstart(b)}};









function C(a){
a.preventDefault()}










function Z(a,b){if(a!=b){

var c=[],e=[],d=0;


while(a){
c.push(a);
a=a.getParent()}

while(b){
e.push(b);
b=b.getParent()}


c.reverse();
e.reverse();


for(;c[d]==e[d];d++);;
a=c[d-1]}


return a||null}








function db(){
return this._cControl}








function _(){
for(var a=V(this.target);a;a=a.getParent()){if(!a.isEnabled())break;if(a.isCapture())return a}







return null}









function Y(a,b){
for(;a;a=a._cParent)if(a.mousewheel(b)===false)return false}










function U(){
W(true)}






function bb(){

N=r=null;
for(var b=0,a;a=z[b++];)try{a.dispose()}catch(a){}}












function C(){
this.returnValue=false}








function S(c){
var b={};
I(a,true);

G(b,a);
G(b,c);
b.x=u;
b.y=q;
I(b);

X.push(a);
a=b}









function I(b,c){
for(var 
f=0,e=["mousedown","mouseover","mousemove","mouseout","mouseup"],d=c?Nb:hb,a;a=e[f++];)b[a]&&d(r,a,b[a])}
















function cb(d,b){
var a=this.getOuter().firstChild,c=a.style;


p.Control.prototype.$setSize.call(this,d,b);
c.width=g(1,d-nc(a))+"px";
c.height=g(1,b-Ic(a))+"px"}






function eb(){
this.cancelBubble=true}


Od(c.get);

(function(){








for(var e=0,c=["keydown","keypress","keyup"],b;b=c[e++];)a[b]=new Function("e","e=ecui.event(e);for(var o=ecui.getFocused();o;o=o.getParent())if(o."+b+"(e)===false)return false");if(v)a.dblclick=function(b){













a.mousedown(b);
a.mouseup(b)};







a[ad?"DOMMouseScroll":"mousewheel"]=function(b){
b=Q(b);if(b.detail===d)b.detail=b.wheelDelta/-40;if(a.type=="drag"||(Y(H,b)===false||Y(w,b)===false))b.preventDefault()}})()})();































































a.$alterClass=function(a,b){
(b?uc:Cc)(this._eBase,this._sClass+"-"+a+" "+this._sType+"-"+a)};










a.$blur=function(){
this.alterClass("focus",true)};










a.$cache=function(a,g){
var b=this._eBase,d=jc(),e=b.style;



for(var 
h=0,f=["borderTopWidth","borderLeftWidth","borderRightWidth","borderBottomWidth","paddingTop","paddingLeft","paddingRight","paddingBottom"],c;c=f[h++];)this["$cache$"+c]=m(a[c]);if(g!==false){











this._nWidth=b.offsetWidth||m(a.width||e.width)+(d?this.getInvalidWidth(true):0);

this._nHeight=b.offsetHeight||m(a.height||e.height)+(d?this.getInvalidHeight(true):0)}};









a.$dispose=function(){
this._eBase.getControl=d;
this._eBase=this._eBody=null};







a.$focus=function(){
this.alterClass("focus")};










a.$getSection=function(a){
return this["_u"+a]};






a.$hide=function(){if(this._sDisplay===d){

var a=this.getOuter().style;
this._sDisplay=a.display;
a.display="none"}};








a.$init=function(){
this.setEnabled(this._bEnabled)};









a.$mouseout=function(){
this.alterClass("over",true)};









a.$mouseover=function(){
this.alterClass("over")};









a.$pressend=a.$pressout=function(){
this.alterClass("press",true)};









a.$pressover=a.$pressstart=function(){
this.alterClass("press")};






a.$resize=function(){
var h=this.getOuter(),a=this._eBase,e=this._sWidth,f=this._sHeight,c=e!==d,b=f!==d,i=a.style,g;if(!this.getParent()&&(c&&(l(h)&&this.isShow()))){if(c)i.width=e;












e=h.offsetWidth;if(b)i.height=f;



f=0;if(a!=h){



var k=a.nextSibling,j=l(a);if(v){



g=L(a);
c=!/px$/.test(g.width);
b=b&&!/px$/.test(g.height)}else{



g=j.style;
c=a.offsetWidth;
g.width=c+100+"px";
c=c!=a.offsetWidth;if(b){


b=a.offsetHeight;
g.height=b&&b+100+"px";
b=b!=a.offsetHeight}}if(c||b){




l(h).appendChild(a);if(c)e=a.offsetWidth;if(b){




i.width=e-this.getInvalidWidth(true)+"px";
f=a.offsetHeight}

j.insertBefore(a,k)}}if(!f){




i.width=e-this.getInvalidWidth()+"px";
f=h.offsetHeight}

this.cache(false,true);
this.$setSize(e,f)}};










a.$setBody=function(a){
this._eBody=a};








a.$setBodyHTML=function(a){
this._eBody.innerHTML=a};









a.$setParent=function(a){
this._cParent=a};










a.$setSize=function(b,a){
var c=this._eBase.style,d=jc();if(b){



c.width=b-(d?this.getInvalidWidth(true):0)+"px";
this._nWidth=b}if(a){



c.height=a-(d?this.getInvalidHeight(true):0)+"px";
this._nHeight=a}};







a.$show=function(){
this.getOuter().style.display=this._sDisplay||"";
this._sDisplay=d};










a.alterClass=function(b,a){
this.onalterclassbefore&&this.onalterclassbefore(b,a);
this.$alterClass(b,a);
this.onalterclassend&&this.onalterclassend(b,a)};










a.cache=function(b,a){if(a||!this._bCache){

this._bCache=true;
this.$cache(L(this._eBase),b)}};








a.clearCache=function(){
this._bCache=false};










a.contain=function(a){
for(;a;a=a._cParent)if(a==this)return true;




return false};







a.dispose=function(){try{this.ondispose&&this.ondispose()}catch(a){}





this.$dispose()};









a.getBase=function(){
return this._eBase};









a.getBaseClass=function(){
return this._sBaseClass};









a.getBody=function(){
return this._eBody};









a.getBodyHeight=function(){
return this.getHeight()-this.getInvalidHeight()};









a.getBodyWidth=function(){
return this.getWidth()-this.getInvalidWidth()};









a.getClass=function(){
return this._sClass};








a.getHeight=function(){
this.cache();
return this._nHeight};








a.getInvalidHeight=function(){
this.cache();
return this.$cache$borderTopWidth+this.$cache$paddingTop+this.$cache$paddingBottom+this.$cache$borderBottomWidth};









a.getInvalidWidth=function(){
this.cache();
return this.$cache$borderLeftWidth+this.$cache$paddingLeft+this.$cache$paddingRight+this.$cache$borderRightWidth};










a.getOuter=function(){
return this._eBase};








a.getParent=function(){
return this._cParent||null};









a.getType=function(){
return this._sType};









a.getUID=function(){
return this._sUID};








a.getWidth=function(){
this.cache();
return this._nWidth};









a.getX=function(){
var a=this.getOuter();

return this.isShow()?a.offsetLeft-c.calcLeftRevise(a):0};









a.getY=function(){
var a=this.getOuter();

return this.isShow()?a.offsetTop-c.calcTopRevise(a):0};









a.hide=function(){
var b=this.getOuter(),a=this.isShow();if(a){



this.$hide();
this.onhide&&this.onhide();

Ob(this)}

return a};









a.isCapture=function(){
return this._bCapture};









a.isEnabled=function(){
var a=this._cParent;

return this._bEnabled&&(!a||a.isEnabled())};









a.isFocus=function(){
return this._bFocus};








a.isShow=function(){
return!(!this.getOuter().offsetWidth)};







a.paint=function(){
this.$setSize(this.getWidth(),this.getHeight())};










a.setBodySize=function(b,a){
this.setSize(b&&b+this.getInvalidWidth(),a&&a+this.getInvalidHeight())};









a.setCapture=function(a){
this._bCapture=a!==false};









a.setClass=function(a){
var d=this._eBase,b=[],f=0,c=this._sType,e=this._sClass;





a=a||c;if(a!=e){




d.className.replace(new RegExp("(^|\\s)"+e+"(-[^\\s]+)","g"),function(f,e,d){
b.push(c+d);
c!=a&&b.push(a+d)});



b.push(c);
c!=a&&b.push(a);

d.className=b.join(" ");
this._sClass=a}},(a.setEnabled=function(a){











a=a!==false;if(this._bEnabled!=a){



this.alterClass("disabled",a);

a||Ob(this);
this._bEnabled=a}});










a.setFocus=function(a){
this._bFocus=a!==false};









a.setParent=function(a){
var d=this._cParent,e=this.getOuter(),c;if(a)if(a instanceof b)c=a._eBody;else{









c=a;
a=V(a)}if(a!=d||c!=l(e)){if(d){






d.onremove&&d.onremove(this);
d.$remove(this)}if(a){if(a.onappend&&a.onappend(this)===false||a.$append(this)===false)a=c=null};







c?c.appendChild(e):J(e);
this._cParent=a;
this.clearCache()}};











a.setPosition=function(c,b){
var a=this.getOuter().style;
a.left=c+"px";
a.top=b+"px"};









a.setSize=function(b,a){
this.$setSize(b,a);if(b)this._sWidth=d;if(a)this._sHeight=d};















a.show=function(){
var a=!this.isShow();if(a){

this.$show();
this.onshow&&this.onshow()}

return a};


(function(){


for(var d=0,c=["keydown","keypress","keyup","mousewheel","focus","blur","click","mousedown","mouseover","mousemove","mouseout","mouseup","pressstart","pressover","pressmove","pressout","pressend","change","resize","create","init"],e=c.length-4,b;b=c[d++];){











a[b]=new Function("e","var o=this;if("+(d<e?"o.isEnabled()&&":"")+"(o.on"+b+"&&o.on"+b+"(e)===false||o.$"+b+"(e)===false))return false");




a["$"+b]=a["$"+b]||lb}



a.$forcibly=a.$append=a.$remove=a.$selectstart=a.$select=a.$selectend=a.$zoomstart=a.$zoom=a.$zoomend=a.$dragstart=a.$dragmove=a.$dragend=lb})();







































function pc(b){
var a=this._nValue;
Db(this);if(a<this._nTotal){

this.$allowNext()&&this.setValue(a+b);
this._oTimer=new xb(pc,200,this,b)}}










function hd(b,c){
var a=b.getParent();
a.focus();
b._fAction.call(a,g(a._nStep,5));


c.preventDefault()}








function Lc(b){
var a=this._nValue;
Db(this);if(a){

this.$allowPrev()&&this.setValue(a-b);
this._oTimer=new xb(Lc,200,this,b)}}









function Db(b){
var a=b._oTimer;
a&&a.stop()}










yc.$dragmove=function(e,d,c){
var a=this.getParent(),b=a.$calcDragValue(d,c);



a.$setValue(b==a._nTotal?b:b-b%a._nStep);
a.scroll()};








yc.$mousedown=function(b){
a.$mousedown.call(this,b);

this.getParent().focus();
Rb(this,b,this._oRange);


b.preventDefault()};











yc.setRange=function(d,c,a,b){
this._oRange={top:d,right:c,bottom:a,left:b}};













kc.$pressend=function(b){
Db(this.getParent());
a.$pressend.call(this,b)};








kc.$pressout=function(b){
Db(this.getParent());
a.$pressout.call(this,b)};








kc.$pressover=function(b){
hd(this,b);
a.$pressover.call(this,b)};








kc.$pressstart=function(b){
hd(this,b);
a.$pressstart.call(this,b)};










z.$cache=function(b,c){
a.$cache.call(this,b,c);

this._uPrev.cache(false,true);
this._uNext.cache(false,true);
this._uBlock.cache(false,true);

this.$cache$position=b.position};







z.$hide=function(){
z.setValue.call(this,0);
return a.$hide.call(this)};









z.$pressend=function(b){
Db(this);
a.$pressend.call(this,b)};









z.$pressout=function(b){
Db(this);
a.$pressout.call(this,b)};









z.$pressover=function(b){
this._fAction(this._nPageStep||this.$getPageStep());
a.$pressover.call(this,b)};









z.$pressstart=function(b){
(this._fAction=this.$allowPrev()?Lc:pc).call(this,this._nPageStep||this.$getPageStep());

this.focus();
a.$pressstart.call(this,b);


b.preventDefault()};








z.$setPageStep=function(a){
this._nPageStep=a};









z.$setSize=function(c,b){if(this.$cache$position!="absolute"&&this.$cache$position!="relative")this.getBase().style.position=this.$cache$position="relative";




a.$setSize.call(this,c,b)};









z.$setValue=function(a){
this._nValue=a};







z.focus=function(){
var a=this.getParent();
a&&(!a.contain(Wb())&&ab(a))};









z.getStep=function(){
return this._nStep};









z.getTotal=function(){
return this._nTotal};









z.getValue=function(){
return this._nValue};







z.scroll=function(){
var a=this.getParent();
this.change();
a&&(a.onscroll&&a.onscroll(this)===false||a.$scroll(this))};









z.setStep=function(a){if(a>0)this._nStep=a};












z.setTotal=function(a){if(a>=0&&this._nTotal!=a){

this._nTotal=a;if(this._nValue>a){



this._nValue=a;
this.scroll()}

this.$flush()}};










z.setValue=function(a){
a=g(A(a,this._nTotal),0);if(this._nValue!=a){


this._nValue=a;
this.scroll();
this.$flush()}};










z.skip=function(a){
this.setValue(this._nValue+a*this._nStep)};










zb.$allowNext=function(){
var a=this._uBlock;
return wb(this)>a.getY()+a.getHeight()};









zb.$allowPrev=function(){
return wb(this)<this._uBlock.getY()};










zb.$calcDragValue=function(d,c){
var b=this._uBlock,a=b._oRange;

return(c-a.top)/(a.bottom-this._uPrev.getHeight()-b.getHeight())*this._nTotal};







zb.$flush=function(){

var b=this._nTotal;if(b){


var a=this._uBlock,f=this.getHeight(),c=this._uPrev.getHeight(),d=this.getBodyHeight(),e=g(T(d*f/(f+b)),a.getInvalidHeight()+5);





a.$setSize(0,e);
a.setPosition(0,c+T(this._nValue/b*(d-e)));
a.setRange(c,0,d+c,0)}};










zb.$getPageStep=function(){
var a=this.getHeight();
return a-a%this._nStep};









zb.$setSize=function(e,d){
var a,c=this._uNext,b=this.$cache$paddingTop;



z.$setSize.call(this,e,d);
a=this.getBodyWidth();


this._uPrev.$setSize(a,b);
c.$setSize(a,this.$cache$paddingBottom);
this._uBlock.$setSize(a);
c.setPosition(0,this.getBodyHeight()+b);

this.$flush()};










Ab.$allowNext=function(){
var a=this._uBlock;
return Xb(this)>a.getX()+a.getWidth()};









Ab.$allowPrev=function(){
return Xb(this)<this._uBlock.getX()};










Ab.$calcDragValue=function(c,d){
var b=this._uBlock,a=b._oRange;

return(c-a.left)/(a.right-this._uPrev.getWidth()-b.getWidth())*this._nTotal};







Ab.$flush=function(){

var b=this._nTotal;if(b){


var a=this._uBlock,f=this.getWidth(),d=this._uPrev.getWidth(),c=this.getBodyWidth(),e=g(T(c*f/(f+b)),a.getInvalidWidth()+5);





a.$setSize(e);
a.setPosition(d+T(this._nValue/b*(c-e)),0);
a.setRange(0,c+d,0,d)}};










Ab.$getPageStep=function(){
var a=this.getWidth();
return a-a%this._nStep};









Ab.$setSize=function(e,d){
var a,b=this._uNext,c=this.$cache$paddingLeft;



z.$setSize.call(this,e,d);
a=this.getBodyHeight();


this._uPrev.$setSize(c,a);
b.$setSize(this.$cache$paddingRight,a);
this._uBlock.$setSize(0,a);
b.setPosition(this.getBodyWidth()+c,0);

this.$flush()};







































K.$cache=function(b,k){
var c=this.getBody(),f=c.offsetWidth,e=c.offsetHeight,h=0;




a.$cache.call(this,b,k);

this.$cache$position=b.position;if(this._bAbsolute){for(var 




d=tb(c),m=d.left,j=d.top,i=c.getElementsByTagName("*");b=i[h++];)if(b.offsetWidth&&L(b,"position")=="absolute"){






d=tb(b);
f=g(f,d.left-m+b.offsetWidth);
e=g(e,d.top-j+b.offsetHeight)}}




this.$cache$mainWidth=f;
this.$cache$mainHeight=e;

b=L(l(c));
this.$cache$layoutWidthRevise=nc(b);
this.$cache$layoutHeightRevise=Ic(b);

(b=this._uVScroll)&&b.cache(true,true);
(b=this._uHScroll)&&b.cache(true,true);
(b=this._uCorner)&&b.cache(false,true)};









K.$keydown=K.$keypress=function(d){
var a=fc(),c=a%2,e=d.target,b;if(a>=37&&(a<=40&&!e.value)){





b=c?this._uHScroll:this._uVScroll;
b&&b.skip(a+c-39);
return false}};











K.$mousewheel=function(c){
var a=this._uVScroll;if(a&&a.isShow()){



var d=a.getValue(),b=this._nWheelDelta||(T(20/a.getStep())||1);

a.skip(c.detail>0?b:-b);
return d==a.getValue()}};








K.$scroll=function(){
var a=this.getBody().style;
a.left=-g(this.getScrollLeft(),0)+"px";
a.top=-g(this.getScrollTop(),0)+"px"};










K.$setSize=function(n,q){
var s=this.$cache$paddingLeft+this.$cache$paddingRight,o=this.$cache$paddingTop+this.$cache$paddingBottom,e=n-this.getInvalidWidth(true),f=q-this.getInvalidHeight(true),h=this.$cache$mainWidth,g=this.$cache$mainHeight,c=this._uVScroll,b=this._uHScroll,d=this._uCorner,r=c&&c.getWidth(),p=b&&b.getHeight(),j=e-r,i=f-p,k=j+s,m=i+o;if(this.$cache$position!="absolute"&&this.$cache$position!="relative")this.getBase().style.position=this.$cache$position="relative";



















a.$setSize.call(this,n,q);


c&&c.setPosition(k,0);
b&&b.setPosition(0,m);
d&&d.setPosition(k,m);if(h<=e&&g<=f){



c&&c.$hide();
b&&b.$hide();
d&&d.$hide()}else for(;;){if(d){if(h>j&&g>i){






b.$setSize(k);
b.setTotal(h-j);
b.$show();
c.$setSize(0,m);
c.setTotal(g-i);
c.$show();
d.$setSize(r,p);
d.$show();
e=j;
f=i;
break}

d.$hide()}if(b)if(h>e){




b.$setSize(e+s);
b.setTotal(h-e);
b.$show();
c&&c.$hide();
f=i}else b.$hide();if(c)if(g>f){








c.$setSize(0,f+o);
c.setTotal(g-f);
c.$show();
b&&b.$hide();
e=j}else c.$hide();





break}



e-=this.$cache$layoutWidthRevise;
f-=this.$cache$layoutHeightRevise;

c&&c.$setPageStep(f);
b&&b.$setPageStep(e);


d=this.getBody();

d.style.position="absolute";

d=l(d).style;
d.width=e+"px";
d.height=f+"px"};









K.getScrollLeft=function(){
var a=this._uHScroll;
return a?a.getValue():-1};









K.getScrollTop=function(){
var a=this._uVScroll;
return a?a.getValue():-1};


























jb.onblur=function(){
var b=V(this);

b.$blur=a.$blur;
b.isEnabled()&&Ob(b);
delete b.$blur};









jb.ondragover=jb.ondrop=function(a){
a=Q(a);
a.stopPropagation();
a.preventDefault()};






jb.onfocus=function(){
var b=V(this);

b.$focus=a.$focus;

b.isEnabled()?ab(b):this.blur();
delete b.$focus};









jb.onpaste=function(a){
V(this).$keydown(a)};







u.$dispose=function(){
this._eInput.getControl=d;
this._eInput=null;
a.$dispose.call(this)};









u.$setSize=function(d,c){
var b=this._eInput.style;
a.$setSize.call(this,d,c);
b.width=this.getBodyWidth()+"px";
b.height=this.getBodyHeight()+"px"};








u.getInput=function(){
return this._eInput};









u.getName=function(){
return this._eInput.name};








u.getSelectionStart=v?function(){
var a=r.selection.createRange().duplicate(),b=this.getInput().value.length;


a.moveEnd("character",b);
return b-a.text.length}:function(){

return this.getInput().selectionStart};








u.getSelectionEnd=v?function(){
var a=r.selection.createRange().duplicate(),b=this.getInput().value.length;


a.moveStart("character",-b);
return a.text.length}:function(){

return this.getInput().selectionEnd};









u.getValue=function(){
return this._eInput.value};








u.setCaret=v?function(b){
var a=this._eInput.createTextRange();
a.collapse();
a.select();
a.moveStart("character",b);
a.collapse();
a.select()}:function(a){

this._eInput.setSelectionRange(a,a)};








u.setEnabled=function(b){
a.setEnabled.call(this,b);

this._eInput.readOnly=!b};









u.setName=function(c){
var a=this._eInput,b=a.onpropertychange;


a=this._eInput=Hb(a,c||"");if(a.type!="hidden"){

G(a,jb);

v?(a.onpropertychange=b):a.addEventListener("input",rc,false)}};












u.setValue=function(a){
Gb(this);
this._eInput.value=a;
Gb(this,false)};








(function(){
for(var c=0,b=["keydown","keypress","keyup"],a;a=b[c++];)jb["on"+a]=new Function("e","var c=ecui,o=c.findControl(this),s=c.ui.Edit.stop,r;e=c.event(e);e.stopPropagation();return o."+a+"(e)");








for(c=0,(b=["blur","focus"]);a=b[c++];)u["$"+a]=new Function("var e=this._eInput,f=e.on"+a+";e.on"+a+"=null;try{e."+a+"()}catch(v){}e.on"+a+"=f;ecui.ui.Control.prototype.$"+a+".call(this)")})();































function sc(a,b){
return (b?a.replace(/[^\x00-\xff]/g,b=="utf8"?"aaa":"aa"):a).length}









Kb.$keydown=function(d){
var a=this.getInput().value,b=this.getSelectionStart(),c=this.getSelectionEnd();



this._sLeft=a.substring(0,b);
this._sRight=a.substring(c);
this._sSelection=a.substring(b,c);

u.$keydown.call(this,d)};






Kb.change=function(){

var j=this.getValue(),h=this._oKeyMask,b=this._nMaxLength,g=this._nMaxValue,f=this._sEncoding,c=this._sLeft||"",e=this._sRight||"",l=this._sSelection||"",i=c.length,k=j.length-e.length,a=k<0?"":j.slice(i,k);if(a){if(this._bSymbol)a=yd(a);if(h)a=(a.match(h)||[]).join("");if(this._bTrim)a=ob(a);if(b>0){






























b-=sc(c,f)+sc(e,f);
a=f?Td(a,b):a.substring(0,b)}if(!a){



this.restore();
return}if(g!==d&&!(g>=+(c+a+e)))a=l;







this.setValue(c+a+e);
this.setCaret(i+a.length)}

u.change.call(this)};






Kb.restore=function(){
var a=this._sLeft||"";

this.setValue(a+(this._sSelection||"")+(this._sRight||""));
this.setCaret(a.length)};








Kb.validate=function(){
var b=[],e=this._nMinLength,d=this._nMaxLength,f=this._nMinValue,h=this._nMaxValue,c=this._oPattern,a=this.getValue(),g=sc(a,this._sEncoding);








e>g&&b.push(["minLength",e]);
d<g&&b.push(["maxLength",d]);
f>+a&&b.push(["minValue",f]);
h<+a&&b.push(["maxValue",h]);
c&&!c.test(a)&&b.push(["pattern"]);

a=!b[0];
a||this.onerror&&this.onerror(b);
return a};




















ed.$click=function(b){
var a=this._cFor;
a&&a.click(b)};









ed.setFor=function(a){
this._cFor=a};
































function cd(a,c,b){
a.setClass(a.getBaseClass()+["-checked","","-part"][c],b)}










function Uc(a,b){
var e=a._cSuperior,c=a._nStatus,d=b!==c;if(d){





cd(a,c,true);
cd(a,b);

a._nStatus=b;
a.getInput().disabled=!(!b);


e&&Jc(e);

a.change()}

return d}








function Jc(d){
for(var c=0,b,a;b=d._aInferior[c];){if(c++&&a!=b._nStatus){

a=2;
break}

a=b._nStatus}


c&&Uc(d,a)}









$.$click=function(a){
u.$click.call(this,a);

this.setChecked(!(!this._nStatus))};









$.$keydown=$.$keypress=function(a){
return a.which!=32};









$.$keyup=function(a){if(a.which==32){

this.$click(a);
return false}};










$.getInferiors=function(){
return[].concat(this._aInferior)};









$.getSuperior=function(){
return this._cSuperior||null};








$.isChecked=function(){
return!this._nStatus};








$.setChecked=function(a){if(Uc(this,a!==false?0:1))for(var 


c=0,b;b=this._aInferior[c++];)b.setChecked(a)};












$.setParent=function(a){
this._cSuperior&&this.setSuperior();
u.setParent.call(this,a)};









$.setSuperior=function(a){
var b=this._cSuperior;
this._cSuperior=a;if(b){



Cb(b._aInferior,this);
Jc(b)}if(a){



a._aInferior.push(this);
Jc(a)}};




























function je(){

for(var c=0,b=this.getItems(),a;a=b[c++];)delete a.$change;


this.checked()}









bb.$click=function(a){
u.$click.call(this,a);
this.checked()};







bb.$dispose=function(){
this.setName();
u.$dispose.call(this)};









bb.$keydown=bb.$keypress=function(a){
return a.which!=32};









bb.$keyup=function(a){if(a.which==32){

this.$click(a);
return false}};








bb.checked=function(){
for(var c=0,b=this.getItems(),a;a=b[c++];)a.isChecked()&&a.setClass(this.getBaseClass());


this.getInput().checked=true;
this.setClass(this.getBaseClass()+"-checked")};









bb.getItems=function(){
return this.getName()?[].concat(nb["ec-"+this.getName()]):[this]};








bb.isChecked=function(){
return this.getInput().checked};









bb.setName=function(a){
var b=this.getName(),c=nb["ec-"+b];if(a!=b){




c&&Cb(c,this);if(a){if(this.isChecked()){





this.getInput().checked=false;
this.setClass(this.getBaseClass())}


(nb["ec-"+a]=nb["ec-"+a]||[]).push(this)}}



u.setName.call(this,a)};





















O.$alterClass=function(e,b){
var d=this.getWidth(),c=this.getHeight();

a.$alterClass.call(this,e,b);
this.cache(false,true);
this.$setSize(d,c)};









O.$mousedown=function(b){
a.$mousedown.call(this,b);
b.preventDefault()};







O.$mouseout=lb;








O.$mouseover=function(d){
var e=this.getParent(),c=q[e.getUID()],b=c._cOver;if(this!=b){




b&&a.$mouseout.call(b);
a.$mouseover.call(this,d);
c._cOver=this}};










O.setParent=function(b){
var c=this.getParent();

a.setParent.call(this,b);if(b&&q[b.getUID()]){




b=this.getParent();


b&&b.$alterItems()}


c&&(q[c.getUID()]&&c.$alterItems())};









q.$append=function(a){if(!(a instanceof Z)||Hc(this,"$append").call(this,a)===false)return false;




q[this.getUID()].push(a)};







q.$initItems=function(){
var c=0,b=I(this.getBody()),a;



this.$alterItems=lb;


q[this.getUID()]=[];


for(;a=b[c++];)this.add(a);



delete this.$alterItems};









q.$remove=function(a){
Hc(this,"$remove").call(this,a);
Cb(q[this.getUID()],a)};












q.add=function(a,f,c){
var d=q[this.getUID()],b="ec-item "+this.getClass()+"-item ",e="string"==typeof a,g=this.constructor.Item;if(a instanceof Z)a.setParent(this);else{if(e){











e=a;
a=t(b);
this.getBody().appendChild(a);
a.innerHTML=e}else a.className=b+a.className;





a.onselectstart=bc;
c=c||getParameters(a);
d.push(a=k(g||Z,a,this,c));

this.$initItem&&this.$initItem(a,c);
this.$alterItems()}if(a.getParent()&&((b=d[f])&&b!=a)){




U(a.getOuter(),b.getOuter());
d.splice(f,0,d.pop())}


return a};











q.append=function(a,b){
this.add(a,d,b)};







q.clearOvered=function(){
var c=q[this.getUID()],b=c._cOver;

b&&a.$mouseout.call(b);
c._cOver=null};







q.dispose=function(){
Hc(this,"dispose").call(this);
delete q[this.getUID()]};








q.getItems=function(){
return[].concat(q[this.getUID()])};









q.getOvered=function(){
return q[this.getUID()]._cOver||null};









q.remove=function(a){if("number"==typeof a)a=q[this.getUID()][a];



a&&a.setParent();
return a};









q.setItemSize=function(c,d){
for(var e=0,b=q[this.getUID()],a;a=b[e++];)a.$setSize(c,d)};











































function Ad(){
var a=this._cSelect,b=this.getValue();


delete this.$change;if(a&&a._sValue!=b)this.setValue(b)}












function Zc(a){
var b=a._uOptions,f=b.getOuter(),d=a._cScroll,e=tb(a.getOuter()),c=a._cSelect,i=e.top,h=i+a.getHeight(),g=b.getHeight();if(!l(f)){










r.body.appendChild(f);
a.$alterItems()}if(b.isShow()){




b.setPosition(e.left,h+g<=Eb().bottom?h:i-g);





c&&c.$mouseover();

d.setValue(d.getStep()*Y(a.getItems(),c))}}












function sd(e,a,f){
var d=e.getItems(),c=d.length,b=f?e.getOvered():e._cSelect;if(c){




a=f?((b?Y(d,b):a>0?c-1:0)+a+c)%c:Y(d,b)+a;if(a>=0&&a<c){




b=d[a];
b.$mouseover()}}



return b}


G(E,q);








oc.getValue=function(){
return this._sValue};









oc.mousewheel=function(a){
this.getParent()._uOptions.mousewheel(a);
return false};







E.$alterItems=function(){
var a=this._uOptions,f=this._nOptionSize,b=this._cScroll,d=this.getBodyHeight(),e=this.getWidth(),c;if(l(a.getOuter())){







c=this.getItems().length;

a.cache(false,true);


b.setStep(d);
b=e-a.getInvalidWidth()-(c>f?b.getWidth():0);

this.setItemSize(a.$cache$mainWidth=b,d);

a.$cache$mainHeight=c*d;

a.$setSize(e,(A(c,f)||1)*d+a.getInvalidHeight())}};











E.$cache=function(a,b){
u.$cache.call(this,a,b);
this._uText.cache(false,true);
this._uButton.cache(false,true);

this.$cache$position=a.position};







E.$dispose=function(){
var a=this._uOptions;if(a.isShow()){


a.hide();
W();
qb()}

J(this._uOptions.getOuter());
u.$dispose.call(this)};









E.$forcibly=function(b){
var a=b.getTarget();
this._uOptions.hide();
W();if(a instanceof Z&&(a.getParent()==this&&a!=this._cSelect)){



this.setSelected(a);
this.change()}};










E.$initItem=function(b,a){
a=a.value;
b._sValue=a===null||a===d?Kc(b.getBody()):""+a;

G(b,oc)};









E.$keydown=function(i){
var a=i.which,g=this.getItems(),f=this.getOvered(),h=this._uOptions;if(Pc()!=this){if(!h.isShow()){if(a==40||a==13){









this.$pressstart();
this.$pressend();
return false}}else if(a==40||a==38){



var k=g.length,e=this._nOptionSize,d=this._cScroll,j=d.getStep(),c=d.getValue()/j,b=Y(g,sd(this,a==40?1:-1,true));






d.skip((b<c?b:b>=c+e?b-e+1:c)-c);


return false}else if(a==13||a==27){



h.hide();
a==13&&(f&&this.setSelected(f));
W();
qb()}}};











E.$keypress=function(b){
var a=fc();
return a<37||(a>40||a==13)};










E.$mousewheel=function(a){if(!this._uOptions.isShow()){

this.setSelected(sd(this,a.detail>0?1:-1));
return false}};










E.$pressend=function(a){
u.$pressend.call(this,a);

forcibly(this);
W(0,65534)};









E.$pressstart=function(a){
u.$pressstart.call(this,a);
this._uOptions.show();
Zc(this)};









E.$remove=function(a){
this._cSelect==a&&this.setSelected();
q.$remove.call(this,a)};









E.$setSize=function(b,a){
var c=this._uButton;if(this.$cache$position!="absolute"&&this.$cache$position!="relative")this.getBase().style.position=this.$cache$position="relative";





u.$setSize.call(this,b,a);
a=this.getBodyHeight();


b=this.getBodyWidth()-a;
this._uText.$setSize(b,a);


c.$setSize(a,a);
c.setPosition(b,0)};








E.getSelected=function(){
return this._cSelect||null};









E.setOptionSize=function(a){if(a>1){

this._nOptionSize=a;
this.$alterItems();
Zc(this)}};









E.setSelected=function(a){
var c=this._uText;if("number"==typeof a)a=this.getItems()[a];if(this._cSelect!=a){if(a){








var e=a.getBody(),b=a._sValue;


c.$setBodyHTML(e.innerHTML);
b=b!==d?b:Kc(e)}else{


c.$setBodyHTML("");
b=""}

u.setValue.call(this,b);
this._cSelect=a}};










E.setValue=function(c){

var d=0,b=this.getItems(),a;



this.change=lb;
for(;a=b[d++];)if(a._sValue==c){

this.setSelected(a);
break}




a||this.setSelected();
delete this.change};




































ge.$setSize=function(b,a){
E.$setSize.call(this,b,a);
this.getInput().style.width=this.$getSection("Text").getWidth()+"px"};





























Rc.$cache=function(b,e){
a.$cache.call(this,b,e);

for(var d=0,c=this._aItem;b=c[d++];)b.cache(false,true)};












Rc.getItem=function(a){
return this._aItem[a]};









kd.getIndex=function(){
return this._nIndex};







(function(){
for(var c=0,b=["focus","blur","click","mousedown","mouseover","mousemove","mouseout","mouseup","pressstart","pressover","pressmove","pressout","pressend"],a;a=b[c++];)kd[a]=new Function("e","var o=this,p=o.getParent();o.isEnabled()&&(p.on"+a+"&&p.on"+a+".call(o,e)===false||p.$"+a+".call(o,e))")})();







































function ae(c){
var b=this.getParent().getParent(),d=this._nDay;


a.$click.call(this,c);
b.ondateclick&&b.ondateclick(new Date(b._nYear,b._nMonth,d))}










Bb.$cache=function(b,c){
a.$cache.call(this,b,c);
this._uNames.cache(true,true);
this._uDate.cache(true,true)};










Bb.$setSize=function(b,j){
var d=this._uNames,h=this._uDate,c=0,f=d.getInvalidWidth(),e=T((b-f)/7),g=d.getHeight(),i=T((j-g)/6);






dateHeight=i*6;

b=e*7+f;
d.$setSize(b);
h.$setSize(b,dateHeight);

for(;c<7;)d.getItem(c++).$setSize(e);


for(c=0;c<42;)h.getItem(c++).$setSize(e,i);




a.$setSize.call(this,b+this.getInvalidWidth(true),g+dateHeight+this.getInvalidHeight(true))};












Bb.getMonth=function(){
return this._nMonth+1};








Bb.getYear=function(){
return this._nYear};









Bb.move=function(b){
var a=new Date(this._nYear,this._nMonth+b,1);
this.setDate(a.getFullYear(),a.getMonth()+1)};









Bb.setDate=function(b,a){
var c=new Date(),j=this._uDate,g=c.getFullYear(),b=b||g,h=c.getMonth(),a=a?a-1:h,k=h==a&&g==b;if(this._nYear!=b||this._nMonth!=a){








this._nYear=b;
this._nMonth=a;

c=c.getDate();if(f=this._cToday){

f.alterClass("today",true);
this._cToday=null}


for(var 

d=new Date(b,a,0),l=day=1-(d.getDay()+1)%7,i=d.getDate(),f=0,d=new Date(b,a+1,0),e=d.getDate();a=j.getItem(f++);){









b=day>0&&day<=e;
a.isEnabled()!=b&&a.setEnabled(b);
Nd(a.getBody(),b?day:day<=0?i+day:day-e);if(k&&(day==c&&day<=e)){


a.alterClass("today");
this._cToday=a}

a._nDay=day++}


this.change()}};


































function Pd(b){
a.$click.call(this,b);
this.getParent().hide()}








function Bd(c){
var b=this.getParent();

a.$click.call(this,c);
b.contain(Wb())||ab(b);
Rb(b,c);

c.preventDefault()}










db.$cache=function(b,c){
a.$cache.call(this,b,c);
this._uTitle.cache(true,true);
this.$cache$position=b.position};







db.$focus=function(){
var b=Y(Tb,this),c;


a.$focus.call(this);if(this.getOuter().style.zIndex<32768){



Tb.push(Tb.splice(b,1)[0]);
for(;c=Tb[b];)c.getOuter().style.zIndex=dd+b++}};










db.$init=function(){
a.$init.call(this);
this._bHide&&this.$hide()};









db.$setSize=function(g,f){
var b=this._nTitleAuto,e=this._uTitle,d=this.$getSection("VScroll"),c=this.$getSection("HScroll");if(this.$cache$position!="absolute"&&this.$cache$position!="relative")this.getBase().style.position=this.$cache$position="relative";








a.$setSize.call(this,g,f);

this._uTitle.setSize(b=="width"?this.getBodyWidth():0,b=="height"?this.getBodyHeight():0);if(d&&(!d.getOuter().style.display&&b=="width")){





b=e.getHeight();
d.setPosition(d.getX(),b);
d.$setSize(0,d.getHeight()-b)}else if(c&&(!c.getOuter().style.display&&b=="height")){


b=e.getWidth();
c.setPosition(b,c.getY());
c.$setSize(c.getWidth()-b)}};







db.center=function(){
var d=this.getOuter().offsetParent,h=d.tagName,f=this.getWidth(),e=this.getHeight();if(h=="BODY"||h=="HTML"){





var a=Eb(),c=a.left,b=a.top;


c+=g(a.right-c-e,0)/2;
b+=g(a.bottom-b-f,0)/2}else{


a=L(d);
c=g(d.offsetWidth-m(style.borderLeftWidth)-m(style.borderRightWidth)-f,0)/2;

b=g(d.offsetHeight-m(style.borderTopWidth)-m(style.borderBottomWidth)-e,0)/2}



this.setPosition(c,b)};







db.hide=function(){
a.hide.call(this);
this.getOuter().style.zIndex==32768&&W()};








db.setTitle=function(a){
this._uTitle.$setBodyHTML(a)};









db.show=function(){
var b=a.show.call(this);
this.contain(Wb())||ab(this);
return b};







db.showModal=function(){
this.show();
this.getOuter().style.zIndex=32768;
W(.05)};

































function _c(b,a){
a=b._eItems=a||t();
a.className=b.getType()+"-items "+b.getBaseClass()+"-items";
a.style.cssText="";
Gc(a,b);
return a}








function ic(a){
a.setClass(a.getBaseClass()+(a._aTree.length?a._eItems.style.display?"-fold":"":"-empty"))}











D.$click=function(e){
var b=this._eItems,c=this.getRoot(),d=c._cSelect;



a.$click.call(this,e);
b&&this.setFold(!(!b.offsetWidth));
d&&d.alterClass("select",true);
this.alterClass("select");
c._cSelect=this};











D.$createChild=function(c,a,b){
a.className=b.getType()+" "+(ob(a.className)||b.getBaseClass());
return k(this.constructor,a,b||null,c)};






D.$dispose=function(){
this._eItems=null;
a.$dispose.call(this)};






D.$cache=D.$resize=D.$setSize=lb;









D.add=function(a,d){
var c=a,b=this._aTree;if("string"==typeof a){



this._aTree.push(a=this.$createChild({base:this.getBaseClass()},t(),this));
a.$setBodyHTML(c)}else a.setParent(this);if(a.getParent()&&((c=b[d])&&c!=a)){






b.splice(d,0,b.pop());
b=a._eItems;
b&&Mc(b,U(a.getOuter(),c.getOuter()))}

return a};









D.getChildTrees=function(){
return[].concat(this._aTree)};








D.getFirst=function(){
return this._aTree[0]||null};








D.getLast=function(){
var a=this._aTree;
return a[a.length-1]||null};








D.getNext=function(){
var a=this.getParent();if(a instanceof sb){


a=a._aTree;
return a[Y(a,this)+1]||null}};









D.getPrev=function(){
var a=this.getParent();if(a instanceof sb){


a=a._aTree;
return a[Y(a,this)-1]||null}};









D.getRoot=function(){
for(var a=this,b;b=a.getParent();a=b);;
return a};








D.getSelected=function(){
return this.getRoot()._cSelect};









D.hide=function(){
var b=this._eItems,c=a.hide.call(this);if(c&&b){


b=b.style;
this._sItemsDisplay=b.display;
b.display="none"}

return c};









D.setFold=function(a){
a=a!==false;if(this._aTree.length){


this._eItems.style.display=a?"none":"";
this.change()}


ic(this)};









D.setParent=function(c){
var d=this.getParent(),e=c,f;if(!c||(c instanceof b?d!=c:l(this.getOuter())!=c)){if(d instanceof sb){






f=d._aTree;
Cb(f,this);
ic(d)}if(d=c instanceof sb){if(this._cSelect)this._cSelect.alterClass("select",true);







e=c._eItems||_c(c)}


a.setParent.call(this,e);if(d){


c._aTree.push(this);
ic(c)}if(e=this._eItems)c?Mc(e,this.getOuter()):J(e)}};
















D.show=function(){
var b=this._sItemsDisplay;if(a.show.call(this)&&b!==d){

this._eItems.style.display=b;
this._sItemsDisplay=d;
return true}};
































Ud.isChecked=function(){
return this._uCheckbox.isChecked()};




















































function ec(){
this.getControl=null;
k(fd,this,l(this).getControl());
return this.getControl()}








function jd(b){
for(var 
c=b.getParent()._aCol,g=c.length,f=b._aCol,a=0;a<g;a++)if(b=f[a]){







var e=m(b.getAttribute("colSpan"))||1,d=c[a].getWidth()-c[a].getInvalidWidth();

while(--e)d+=c[++a].getWidth();


b.style.width=d+"px"}}











function td(b){
var d=this.getValue(),c=this.getParent()[this instanceof qc?"_aRow":"_aCol"],e=c.length,a=1;




b=A(g(b,0),this.getTotal());if(b>d){for(;;a++)if(b<=c[a]._nPos){





d<c[a-1]._nPos&&a--;
break}}else if(b<d){for(a=e;a--;)if(b>=c[a]._nPos){







(a==e-1||d>c[a+1]._nPos)&&a++;
break}}else return;







z.setValue.call(this,c[a]._nPos)}









rb.$click=function(a){
var b=this.getParent();
b.onrowclick&&b.onrowclick(a)!==false||ecui.ui.Control.prototype.$click.call(this,a)};







rb.$dispose=function(){
this._aCol=null;
a.$dispose.call(this)};








rb.$getCols=function(){
return[].concat(this._aCol)};








rb.getCol=function(a){
a=this._aCol[a];
return a?a.getControl():null};








rb.getCols=function(){
for(var d=0,c=this._aCol,e=c.length,b=[],a;d<e;){
a=c[d++];
b.push(a?a.getControl():null)}


return b};











dc.$setStyles=function(j,k,g){
var m=0,d=this.getParent().getParent(),c=this.getBody(),e=d._aCol,n=d._aRow,h=Y(e,this),a=l(l(l(this.getBody()))).style,b;








c.style[j]=k;if(g)a.width=ub(d.getBody()).style.width=H(a.width)+g+"px";




for(;a=n[m++];){

c=a._aCol;
a=c[h];if(a&&c[h+1]!==null)a.style[j]=k;else if(g&&a!==false){for(b=h;;b--)if(a=c[b]){






var f=-e[b].getInvalidWidth(),i=0;

for(;;){if(!e[b].getOuter().style.display){

f+=e[b].getWidth();
i++}if(c[++b]!==null)break}





b=a.style;if(f>0){

b.display="";
b.width=f+"px";
a.setAttribute("colSpan",i)}else b.display="none";




break}}}if(g>0)d.resize();else{








d.cache(true,true);
d.paint()}};









dc.hide=function(){if(!this.getBody().style.display){

this.$setStyles("display","none",-this.getWidth());
return true}};









dc.setSize=function(a){
this.$setStyles("width",a-this.getInvalidWidth(true)+"px",a-this.getWidth());
this.$setSize(a)};








dc.show=function(){if(this.getBody().style.display){

this.$setStyles("display","",this.getWidth());
return true}};










mc.$click=function(a){
var b=this.getParent().getParent();
b.oncellclick&&b.oncellclick(a)!==false||ecui.ui.Control.prototype.$click.call(this,a)};








mc.getHeight=function(){
return this.getOuter().offsetHeight};








mc.getWidth=function(){
return this.getOuter().offsetWidth};










w.$cache=function(a,g){
var c=this._uHead,e=l(c.getBody()),i=l(e)==c.getBase().lastChild.lastChild,h=this._aRow,f=this._aCol,d=0,b=0;







K.$cache.call(this,a,g);
c.cache(false,true);


this.$cache$mainHeight-=(this.$cache$paddingTop=e.offsetHeight);
for(;a=h[d++];){
a._nPos=b;
a.cache(true,true);if(!a.getOuter().style.display)b+=a.getHeight()}




for(d=0,(b=0);a=f[d++];){
a._nPos=b;
a.cache(true,true);if(!a.getOuter().style.display)b+=a.getWidth()}




this.$cache$mainWidth=b};











w.$getCell=function(e,c){
var g=this._aRow,f=g[e],b=f&&f._aCol,a=b&&b[c];if(a===d)a=null;else if(!a){if(a===false)for(;(a=(b=g[--e]._aCol)[c])!==false;);;if(a===null)for(;!(a=b[--c]););}















return a};








w.$getRowClass=function(){
return ac};







w.$init=function(){
var b=this._uHead,c=this._aRow,d=this._aCol,a=0;




K.$init.call(this);

for(;o=d[a++];)o.$setSize(o.getWidth());


for(a=c.length;a--;)jd(c[a]);


U(l(b.getBody()),b.getBase().lastChild.lastChild.firstChild)};






w.$scroll=function(){
K.$scroll.call(this);
this._uHead.getBase().lastChild.style.left=this.getBody().style.left};









w.$setSize=function(c,b){
var q=this._uHead,k=this.getBody(),f=this._cVScroll,e=this._cHScroll,u=f&&f.getWidth(),t=e&&e.getHeight(),m=this.getInvalidWidth(true),s=this.getInvalidHeight(true),d=this.$cache$mainWidth,g=this.$cache$mainHeight,p=d+m,j=g+s,h=c-m,i=b-s,r=this.$cache$paddingTop,n=this._bAutoWidth,o=this._bAutoHeight,a;


















this.getBase().style.paddingTop=r+"px";
ub(k).style.width=q.getBase().lastChild.lastChild.style.width=d+"px";if(d<=h&&g<=i){if(n)c=p;if(o)b=j}else if(!(f&&(e&&(d>h-u&&g>i-t)))){if(n){












a=p+(!f||i>=g?0:u);
c=e?A(c,a):a}if(o){


a=j+(!e||h>=d?0:t);
b=f?A(b,a):a}}



K.$setSize.call(this,c,b);

q.$setSize(H(l(k).style.width),r)};














w.addCol=function(b,e){
var m=0,n=this._aRow,c=this._aCol,f=this.getType(),h=b.base||f,i=t(f+"-head "+h+"-head","","th"),g=k(wc,i,this._uHead),a=c[e],l=b.width,j;if(a)a=a.getOuter();else e=c.length;

















c.splice(e,0,g);
i.innerHTML=b.title||"";
this._uHead.getBody().insertBefore(i,a);

f=f+"-item "+h+"-item";
for(;j=n[m++];){
c=j._aCol;

b=c[e];if(b!==null){

for(h=e;!(a=c[h++]);)if(a===d){

a=null;
break}


j.getBody().insertBefore(b=t(f,"","td"),a);



b.getControl=ec}

c.splice(e,0,b)}


g.$setSize(l);
g.$setStyles("width",i.style.width,l);

return g};










w.addRow=function(g,f){
var l=this.getBody().lastChild.lastChild,o=this.getType(),a=0,p=1,h=this._aRow,n=this._aCol,q=n.length,b=t(),j=['<table><tbody><tr class="'+o+"-row "+this.getBaseClass()+'-row">'],e=[],d=h[f],i,c;













d||(f=h.length);

for(;a<q;)if(d&&d._aCol[a]===false||g[a]===false)e[a++]=false;else{




c=a;
for(;g[++a]===null;)e[a]=null;


e[c]=true;
i=n[c].getBaseClass();
j[p++]='<td class="'+o+"-item "+i.substring(0,i.length-5)+'-item" colSpan="'+(a-c)+'">'+g[c]+"</td>"}




j[p]="</tr></tbody></table>";
b.innerHTML=j.join("");
b=b.lastChild.lastChild.lastChild;

d=k(this.$getRowClass(),b,this);
l.insertBefore(b,I(l)[f]);
h.splice(f--,0,d);

for(a=0,(b=b.firstChild);a<q;a++)if(c=e[a]){

e[a]=b;
b.getControl=ec;
b=b.nextSibling}else if(c===false){


c=this.$getCell(f,a);
c.setAttribute("rowSpan",(m(c.getAttribute("rowSpan"))||1)+1)}



d._aCol=e;
jd(d);
this.cache(true,true);
this.paint();

return d};










w.getCell=function(a,b){
a=this._aRow[a];
return a&&a.getCol(b)};










w.getCol=function(a){
return this._aCol[a]||null};








w.getCols=function(){
return[].concat(this._aCol)};









w.getRow=function(a){
return this._aRow[a]||null};








w.getRows=function(){
return[].concat(this._aRow)};








w.removeCol=function(c){
var e=0,d=this._aRow,b=this._aCol,a=b[c];if(a){





a.hide();

J(a.getOuter());
hc(a);
b.splice(c,1);

for(;a=d[e++];){
b=a._aCol;if(a=b[c]){if(b[c+1]===null){


b.splice(c+1,1);
continue}

J(a);
a.getControl!=ec&&hc(a.getControl())}

b.splice(c,1)}}};










w.removeRow=function(f){
var k=this._aRow,h=k[f],l=[];if(h){




var g=h._aCol,b=0,n=g.length,i=k[f+1],j=i&&i._aCol,a;






for(;b<n;b++){
a=g[b];if(a===false){

a=this.$getCell(f-1,b);if(Y(l,a)<0){

a.setAttribute("rowSpan",m(a.getAttribute("rowSpan"))-1);
l.push(a)}}else if(a&&(e=m(a.getAttribute("rowSpan")))>1){



a.setAttribute("rowSpan",e-1);
g[b]=null;
j[b++]=a;
for(e=m(a.getAttribute("colSpan"))||1;--e;)j[++b]=g[b];


for(var e=b--,c;;){
c=j[e++];if(c===d){

c=null;
break}else if(c)break}






i.getBody().insertBefore(a,c);
a.getControl().$setParent(i)}}



J(h.getOuter());
hc(h);
k.splice(f,1)}};




(function(){
for(var b=["down","over","move","out","up"],c=0,a;a=b[c++];){
rb["$mouse"+a]=new Function("e","var p=this.getParent();p.onrow"+a+"&&p.onrow"+a+"(e)!==false||ecui.ui.Control.prototype.$mouse"+a+".call(this,e)");




mc["$mouse"+a]=new Function("e","var p=this.getParent().getParent();p.oncell"+a+"&&p.oncell"+a+"(e)!==false||ecui.ui.Control.prototype.$mouse"+a+".call(this,e)")}})();



















































Sc.$dispose=function(){
this._eFill=null;
rb.$dispose.call(this)};










fb.$cache=function(d,e){
var a=this.getCols(),b=this._nRightLock,h=0,c=0,f=this.getRows();





w.$cache.call(this,d,e);

this.$cache$paddingTop=g(this.$cache$paddingTop,this._uLockedHead.getBody().offsetHeight);
this.$cache$mainWidth-=((this.$cache$paddingLeft=a[this._nLeftLock]._nPos)+(this.$cache$paddingRight=b?this.$cache$mainWidth-a[a.length-b]._nPos:0));




for(;a=f[h++];){
a._nPos=c;
b=a._cJoint;
b.cache(true,true);
c+=g(a.getHeight(),b.getHeight())}

this.$cache$mainHeight=c};







fb.$dispose=function(){
this._uLockedHead._eFill=null;
w.$dispose.call(this)};








fb.$getRowClass=function(){
return Wc};







fb.$init=function(){
var a=0,j=0,d=I(this._uHead.getBody()),c=this._uLockedHead.getBody(),g=c.lastChild,h=this._nLeftLock,e=d.length,i=e-this._nRightLock,k=this.getRows(),f,b;











w.$init.call(this);

for(;a<e;a++){
b=d[a];if(a<h)U(b,g);else if(a>=i)c.appendChild(b)}








for(;f=k[j++];){
c=f._cJoint.getBody();
d=f.$getCols();
g=c.lastChild;
for(a=0;a<e;a++)if(b=d[a]){if(a<h)U(b,g);else if(a>=i)c.appendChild(b)}}};
















fb.$scroll=function(){
w.$scroll.call(this);
this._uLockedMain.getBody().style.top=this.getBody().style.top};









fb.$setSize=function(d,h){
var a=this.getBase().style,i=this._uHead,b=this._uLockedHead,c=this._uLockedMain,f=this._aLockedRow,j=0,e=this.$cache$paddingTop;







a.paddingLeft=this.$cache$paddingLeft+"px";
a.paddingRight=this.$cache$paddingRight+"px";

w.$setSize.call(this,d,h);

a=i.getWidth()+this.$cache$paddingLeft+this.$cache$paddingRight;
b.$setSize(0,e);
l(l(b.getBody())).style.height=e+"px";
c.$setSize(a,this.getBodyHeight());
l(l(b.getBody())).style.width=c.getBody().lastChild.style.width=a+"px";


d=l(this.getBody()).style.width;
b._eFill.style.width=d;


for(;b=f[j++];){
c=b._cJoint;
a=b._eFill.style;
a.width=d;
a.height=c.getBody().lastChild.style.height=g(b.getHeight(),c.getHeight())+"px"}};
















fb.addCol=function(b,a){
a>=0&&(a<this._nLeftLock&&this._nLeftLock++);
return w.addCol.call(this,b,a)};








fb.removeCol=function(a){
w.removeCol.call(this,a);
a>=0&&(a<this._nLeftLock&&this._nLeftLock--)};







(function(){
for(var 
c=0,b=["blur","focus","click","mousedown","mouseover","mousemove","mouseout","mouseup","pressstart","pressover","pressmove","pressout","pressend"],a;a=b[c++];)Sc["$"+a]=new Function("","(ecui.ui.Control.prototype.$"+a+").apply(this,arguments);ecui.ui.Control.prototype.$"+a+".apply(this._cJoint,arguments)")})();

















































function Gd(b){
a.$mousedown.call(this,b);
b.preventDefault()}






function Cd(){if(this.isShow()){

var a=this.getParent(),c=a._cInferior,e=a.getItems()[0].getHeight(),b=a.getBody().style,d=H(b.top);





c&&c.hide();if(d<this.getHeight())b.top=d+e+"px"}}










function ie(){if(this.isShow()){

var a=this.getParent(),e=a._cInferior,c=a.getItems()[0].getHeight(),b=a.getBody(),d=b.style,f=H(d.top);






e&&e.hide();if(a._nOptionSize*c-f+a._uPrev.getHeight()<b.offsetHeight)d.top=f-c+"px"}}












kb.$click=function(a){
O.$click.call(this,a);
this.getItems()[0]||_.$blur()},(kb.$mousedown=function(a){









O.$mousedown.call(this,a);
a.preventDefault()});








kb.$mouseout=function(a){
this.getItems()[0]||this.getParent().clearOvered()};








kb.$mouseover=function(i){
var a=this._cPopup,d=this.getParent(),e=d.getSuperior(),b=d._cInferior,h=tb(this.getOuter()),g=Eb();







O.$mouseover.call(this,i);if(b!=a){



b&&b.hide();if(a&&a.getItems()[0]){


a.setParent(true);


var c=h.left,f=a.getWidth();


b=c+this.getWidth()-4;
c-=f-4;if(e&&(e.getX()>d.getX()&&c>g.left)||b+f>g.right)b=c;







a.setPosition(b,h.top-4);
a.show()}}};










kb.$pressend=function(a){
O.$pressend.call(this,a);
a.getTarget()!=this&&_.$blur()};











kb.add=function(b,a){
return (this._cPopup=this._cPopup||k($b,t("ec-popup "+this.getParent().getBaseClass()),this)).add(b,a)};










kb.getItems=function(){
var a=this._cPopup;
return a?a.getItems():[]};









kb.remove=function(b){
var a=this._cPopup;
return a&&a.remove(b)};







S.$alterItems=function(){
var f=this.getParent(),i=this.getItems(),e=i.length;



f&&f.setClass(f.getBaseClass()+(e?"-complex":""));if(l(this.getOuter())){


var j=i[0],c=j&&j.getHeight(),g=this._nOptionSize||Number.MAX_VALUE,a=this._uPrev,b=this._uNext,d=this.getBodyWidth(),h=this.getBase().style;







this.setItemSize(d,c);

c*=A(g,e);if(e>g){

a.show();
b.show();
a.$setSize(d);
b.$setSize(d);


a=a.getHeight();
this.$cache$paddingTop=a;

b.setPosition(0,a+c);

b=b.getHeight();
this.$cache$paddingBottom=b}else{if(a){



a.hide();
b.hide()}

a=b=0}


h.paddingTop=this.getBody().style.top=a+"px";
h.paddingBottom=b+"px";
this.setBodySize(0,c)}};








S.$blur=function(){
for(var a=this,b;b=a._cSuperior;a=b);;
a.hide()};










S.$cache=function(c,b){
a.$cache.call(this,c,b);


(b=this._uPrev)&&b.cache(true,true);
(b=this._uNext)&&b.cache(true,true)};







S.$dispose=function(){
this.hide();
a.$dispose.call(this)};







S.$forcibly=function(){
_.$blur();
return false};










S.cache=function(c,b){if(l(this.getOuter()))a.cache.call(this,c,b)};











S.getSuperior=function(){
var a=this.getParent();
return a&&a.getParent()||null};









S.hide=function(){
var b=this._cSuperior,d=this._cInferior,c=a.hide.call(this);if(c){





this.clearOvered();
d&&d.hide();

_=b;
b?(b._cInferior=null):qb()}


return c};







S.paint=function(){if(l(this.getOuter()))a.paint.call(this)};












S.setParent=function(b){
var a=this.getOuter();if(b){if(!l(a)){


r.body.appendChild(a);
this.$alterItems()}}else{



this.hide();
J(a)}};










S.show=function(){
var c=this.getOuter(),b=Eb();


this.setParent(true);

var d=a.show.call(this),e=tb(c);if(d){




this.setPosition(A(g(e.left,b.left),b.right-this.getWidth()),A(g(e.top,b.top),b.bottom-this.getHeight()));if(_){






c.style.zIndex=m(L(_.getOuter(),"zIndex"))+1;
this._cSuperior=_;
_._cInferior=this}else{



c.style.zIndex=32768;
forcibly(this)}


_=this}


return d};


G(S,q);




























function xc(b){
var d=b.getParent(),e=d._cScroll,f=e.getStep(),a=wb(d),c=b._nTop;





b._nTop=a;if(a>d.getHeight()){if(a<c)a=0;else{








a=T((a-g(0,c))/3);

a?e.skip(a):(b._nTop=c)}

a+=b._nLastIndex}else if(a<0){if(a>c)a=0;else{








a=gb.ceil((a-A(0,c))/3);

a?e.skip(a):(b._nTop=c)}

a+=b._nLastIndex}else a=T((d.getScrollTop()+a)/f);





return g(0,A(a,d.getItems().length-1))}







mb.$dispose=function(){
this._eInput=null;
O.$dispose.call(this)};








mb.$mousedown=function(a){
O.$mousedown.call(this,a);
c.select(this,a,"listbox")};








mb.$select=function(){
var c=this._nStartIndex,b=this._nLastIndex,a=xc(this),h=this.getParent().getItems(),d=0,g=-1,e=0,f=-1;if(a>b)if(a<c){











d=b;
g=a-1}else if(b<c){



d=b;
g=c-1;
e=c+1;
f=a}else{



e=b+1;
f=a}else if(a<b)if(a>c){





d=a+1;
g=b}else if(b>c){



d=c+1;
g=b;
e=a;
f=c-1}else{



e=a;
f=b-1}



this._nLastIndex=a;


for(;d<=g;){
a=h[d++];
a.alterClass("selected",!a.isSelected())}



for(;e<=f;)h[e++].alterClass("selected")};








mb.$selectend=function(){
var b=this._nStartIndex,a=xc(this),d=this.getParent().getItems(),c=A(b,a),e=g(b,a);if(b==a)this.setSelected(!this.isSelected());else for(;c<=e;)d[c++].setSelected()};





















mb.$selectstart=function(){
this._nStartIndex=this._nLastIndex=xc(this);
this.alterClass("selected")};








mb.isSelected=function(){
return!this._eInput.disabled};








mb.setParent=function(a){
O.setParent.call(this,a);if(a=this.getParent())this._eInput=Hb(this._eInput,a._sName)};












mb.setSelected=function(a){
this.alterClass("selected",this._eInput.disabled=a===false)};







cb.$alterItems=function(){
var b=this.getItems(),c=b.length,d=this._cScroll,a=c&&b[0].getHeight();if(a){





d.setStep(a);
this.setItemSize(this.getBodyWidth()-((this.$cache$mainHeight=c*a)>this.getBodyHeight()?d.getWidth():0));



this.paint()}};











cb.$cache=function(b,a){
var d=0,c=this.getItems();


K.$cache.call(this,b,a);


for(;a=c[d++];)a.$cache(false,true)};









cb.$init=function(){
this.$alterItems()};









cb.$initItem=function(a,b){
var c=a.getBody(),e=b.value;


c.appendChild(a._eInput=Hb(null,this._sName,"hidden")).value=e===null||e===d?Kc(c):""+b.value;

a.setSelected(!(!b.selected))};









cb.getName=function(){
return this._sName};








cb.getSelected=function(){
for(var d=0,c=this.getItems(),a,b=[];a=c[d++];)a.isSelected()&&b.push(a);


return b};







cb.selectAll=function(){
for(var c=0,b=this.getItems(),a;a=b[c++];)a.setSelected()};











cb.setName=function(b){
for(var d=0,c=this.getItems(),a;a=c[d++];)a._eInput=Hb(a._eInput,b);



this._sName=b};


G(cb,q);























Zb.$cache=function(b,c){
a.$cache.call(this,b,c);
this.$cache$position=b.position};






Zb.$dispose=function(){
a.$dispose.call(this);
this._eText=this._eComplete=null};









Zb.$setSize=function(e,d){
var c=this._eText.style,b=this._eComplete.style;if(this.$cache$position!="absolute"&&this.$cache$position!="relative")this.getBase().style.position=this.$cache$position="relative";





a.$setSize.call(this,e,d);

c.width=b.width=this.getBodyWidth()+"px";
c.height=b.height=this.getBodyHeight()+"px"};









Zb.setText=function(a,c){
var b=this._eComplete;

a=g(A(a,1),0);
this._eText.innerHTML=b.innerHTML=c||a*100+"%";
b.style.clip="rect(0px,"+T(a*this.getBodyWidth())+"px,"+this.getBodyHeight()+"px,0px)"};























var Fb=c.Color=function(a){if("string"==typeof a)this.setRGB(H(a.substring(0,2),16),H(a.substring(2,4),16),H(a.substring(4,6),16));else this.setRGB(0,0,0)},B=Fb.prototype;























function pb(b,c,a){
a=a<0?a+1:a>1?a-1:a;
a=a<.5?A(6*a,1):g(4-6*a,0);
return gb.round(255*(b+(c-b)*a))}








B.getBlue=function(){
return this._nBlue};








B.getGreen=function(){
return this._nGreen};








B.getHue=function(){
return this._nHue};








B.getLight=function(){
return this._nLight};








B.getRGB=function(){
var a=this._nRed,c=this._nGreen,b=this._nBlue;



return((a<16?"0":"")+a.toString(16)+(c<16?"0":"")+c.toString(16)+(b<16?"0":"")+b.toString(16)).toUpperCase()};










B.getRed=function(){
return this._nRed};








B.getSaturation=function(){
return this._nSaturation};










B.setRGB=function(a,b,d){
this._nRed=a;
this._nGreen=b;
this._nBlue=d;

a/=255;
b/=255;
d/=255;

var h=A(a,b,d),f=g(a,b,d),e=f-h,c;




this._nLight=(f+h)/2;if(e){

c=a==f?(b-d)/6/e:b==f?.3333333333333333+(d-a)/6/e:.6666666666666666+(a-b)/6/e;


this._nHue=c<0?(c+=1):c>1?(c-=1):c;
this._nSaturation=this._nLight<.5?e/(f+h):e/(2-f-h)}else{




this._nHue=0;
this._nSaturation=0}};











B.setHSL=function(b,e,a){
var c=a+Math.min(a,1-a)*e,d=2*a-c;


this._nHue=b;
this._nSaturation=e;
this._nLight=a;

this._nRed=pb(d,c,b+.3333333333333333);
this._nGreen=pb(d,c,b);
this._nBlue=pb(d,c,b-.3333333333333333)};
































function gc(c,b){
for(var e=c._aValue,a=0;a<7;a++)if(b[a]!==d){

a||(c._uColor.getBase().style.backgroundColor="#"+b[a]);
e[a].setValue(b[a])}}












function wd(d,c,b){
for(var a=0,e=I(d._uLightbar.getBody());a<256;){
M.setHSL(c,b,1-a/255);
e[a++].style.backgroundColor="#"+M.getRGB()}}









function Xc(a){
var b=a._aValue,d=b[1].getValue(),c=b[3].getValue();



a._uCross.setPosition(d,255-c);
a._uArrow.getOuter().style.top=255-b[5].getValue()+"px";
wd(a,d/255,c/255)}








function zc(b){
var a=b._aValue;

M.setHSL(a[1].getValue()/255,a[3].getValue()/255,a[5].getValue()/255);
gc(b,[M.getRGB(),d,M.getRed(),d,M.getGreen(),d,M.getBlue()])}
















function _b(a){
var b=a._aValue;

M.setRGB(+b[2].getValue(),+b[4].getValue(),+b[6].getValue());
gc(a,[M.getRGB(),vc(M.getHue()*256)%256,d,vc(M.getSaturation()*255),d,vc(M.getLight()*255)]);








Xc(a)}








function he(d){
var b=this.getParent()._uCross,f=Xb(this),e=wb(this),c={};




a.$mousedown.call(this,d);
b.setPosition(f,e);
c.top=c.left=0;
c.right=255+b.getWidth();
c.bottom=255+b.getHeight();
Rb(b,d,c);
pd.call(b,d,f,e)}










function pd(e,d,a){
var b=this.getParent().getParent(),c=b._aValue;


a=255-a;
c[1].setValue(d);
c[3].setValue(a);

wd(b,d/255,a/255);
zc(b)}








function Xd(e){
var c=this.getParent()._uArrow,f=c.getOuter(),d=wb(this),b={};




a.$mousedown.call(this,e);if(d>=0&&d<=255){


f.style.top=d+"px";
b.top=0;
b.bottom=255+c.getHeight();
b.left=b.right=H(L(f).left);
Rb(c,e,b);
ud.call(c,e,0,d)}}











function ud(c,d,b){
var a=this.getParent().getParent();
a._aValue[5].setValue(255-b);

zc(a)}








function Hd(e){
var c=this.getParent(),f=c._aValue,b=od[this._nIndex];



a.$click.call(this,e);

gc(c,[d,d,H(b.substring(0,2),16),d,H(b.substring(2,4),16),d,H(b.substring(4),16)]);








_b(c)}








function ce(f){
var e=this.getParent(),c=this.getValue(),d=this.getSelectionStart(),b=this.getSelectionEnd(),a=fc();





Kb.$keydown.call(this,f);if(a!=37&&a!=39){if(d==b)b++;






a=String.fromCharCode(a).toUpperCase();if(a>="0"&&a<="9"||a>="A"&&a<="F"){

c=c.substring(0,d)+a+c.substring(b);if(c.length==6){

a=b+b%2;
e._aValue[a].setValue(H(c.substring(a-2,a),16));
_b(e);
this.setCaret(b)}}



return false}}







function be(){
this.restore()}






function Id(){
var a=this,c=a.getValue(),b=a.getParent(),d=b._aValue;if(!c){





a.setValue(0);
new xb(function(){
a.setCaret(1)},0)}else if(c.charAt(0)=="0")a.setValue(+c);if(a._nIndex%2)_b(b);else{










zc(b);
Xc(b)}}









function Ld(c){
var b=this.getParent();
b.onconfirm&&b.onconfirm();

a.$click.call(this,c)}










Ib.$cache=function(b,c){
a.$cache.call(this,b,c);

this._uMain.cache(false,true);
this._uLightbar.cache(true,true)};






Ib.$init=function(){
a.$init.call(this);
this.setColor(M)};










Ib.$setSize=function(d,c){
var e=this._aValue,b=1;


a.$setSize.call(this,d,c);
this._uMain.setBodySize(256,256);
this._uLightbar.setBodySize(0,256);

for(;b<7;)e[b++].paint()};










Ib.getColor=function(){
return new Fb(this._aValue[0].getValue())};








Ib.setColor=function(a){
gc(this,[d,d,a.getRed(),d,a.getGreen(),d,a.getBlue()]);








_b(this)};



















Pb.$create=function(){
this.isAvailable()?this.$load():new xb(this.$create,100,this)};






Pb.$load=lb;







Pb.getMovie=function(){
var a=this._sMovieId;
return r[a]||ib[a]};








Pb.isAvailable=function(){
var a=this.getMovie();
return!(!(a&&a.isAvailable))};








Lb.$load=function(){
Pb.$load.call(this);
this.connect(this._sUrl)};








Lb.$error=function(a){
this.onerror&&this.onerror(a)};








Lb.$receive=function(a){
this.onreceive&&this.onreceive(a)};








Lb.connect=function(a){
a=a||this._sUrl;
a&&this.getMovie().connect(this._sUrl=a)};






Lb.close=function(){
this.getMovie().close();
this._sUrl=""};












rd.restore=function(j,i){
var b=zd(this.getMovie().restore(j.substring(3)));if(b.form){



var a=b.name,l=b.elements,k=0,d=i||r[a];if(!d){





d=t("form",r.body);
d.setAttribute("name",a);
d.setAttribute("action",b.action);
d.setAttribute("method",b.method),d.setAttribute("target",b.target)}



a:for(;b=l[k++];){
var h=b.name,f=b.type,g=b.value,c=d[h],e=c?c.length:0;if(f=="radio"||f=="checkbox"){if(e)for(;e--;){








a=c[e];if(a.value==g&&a.type==f){

a.checked=true;
continue a}}else if(c.value==g&&c.type==f){




c.checked=true;
continue a}}else{if(e)for(;e--;){





a=c[e];if(a.id==b.id&&a.type==f){

c=a;
break}}else if(c&&c.type!=f)c=null;if(c){if(f!="select-multiple")c.value=g;else for(e=0;a=c.options[e++];)if(Y(b.values,a.value)>=0)a.selected=true;


















continue a}}if(f!="select-multiple")t('<input type="hidden" name="'+h+'">',d).value=g;else for(a=b.values,(e=a.length);e--;)t('<input type="hidden" name="'+h+'">',d).value=a[e]}}else d=b.data;
















return d};










rd.save=function(b){if(b.nodeType==1){

var a=b,b={},f=b.elements=[],h=a.elements,j=0,c;






b.name=a.getAttribute("name");
b.action=a.getAttribute("action");
b.method=a.getAttribute("method");
b.target=a.getAttribute("target");

for(;a=h[j++];){
c={};if(c.name=a.name){

switch(c.type=a.type){case"radio":case"checkbox":if(!a.checked)continue;case"hidden":case"textarea":case"text":case"select-one":case"password":










c.value=a.value;
break;case"select-multiple":for(var 


g=0,i=a.options,d,e=c.values=[];d=i[g++];)d.selected&&e.push(d.value)}





c.id=a.id;
f.push(c)}}


b.form=1}else b={data:b};




return"ec-"+this.getMovie().save(de(b))};























function Sb(b,a){
b.getOuter().appendChild(t(a,"position:absolute;top:0px;left:0px"))}









F.$alterClass=function(b,a){
(a?uc:Cc)(this._eOuter,this._sClass+"-"+b);
this._oInner.$alterClass(b,a,true)};










F.$cache=function(b,c){
a.$cache.call(this,L(this._eOuter),false);
this._oInner.$cache(b,c,true)};






F.$dispose=function(){
this._eOuter=null};









F.$setSize=function(c,b){
var g=this._eOuter.style,h=this._oInner,d=a.getInvalidWidth.call(this),e=a.getInvalidHeight.call(this),f=jc();





this._oInner.$setSize(c&&c-d,b&&b-e,true);





g.width=(c=h.getWidth(true))+(f?0:d)+"px";
g.height=(b=h.getHeight(true))+(f?0:e)+"px";

this._nWidth=c+d;
this._nHeight=b+e};










F.cache=function(b,a){
this._oInner.cache(b,a,true)};








F.getClass=function(){
return this._sClass};








F.getHeight=function(){
return this._nHeight=this._nHeight||this._oInner.getHeight(true)+a.getInvalidHeight.call(this)};









F.getInner=function(){
return this._oInner};








F.getInvalidHeight=function(){
return this._oInner.getInvalidHeight(true)+a.getInvalidHeight.call(this)};








F.getInvalidWidth=function(){
return this._oInner.getInvalidWidth(true)+a.getInvalidWidth.call(this)};








F.getOuter=function(){
return this._eOuter};








F.getWidth=function(){
return this._nWidth=this._nWidth||this._oInner.getWidth(true)+a.getInvalidWidth.call(this)};








F.init=function(){
this._oInner.init(true);
this.paint()};






F.paint=function(){
this._oInner.paint(true)};






yb.$dispose=function(){
this.clear();
this.$dispose()};






yb.clear=function(){for(a in yb)delete this[a];





var b=this.getUID(),a=R[b],c=a._eOuter;



U(this.getOuter(),c);
J(c);
for(;a!=this;a=a._oInner)a.$dispose();


delete R[b]};








yb.getOuter=function(){
return R[this.getUID()].getOuter()};


(function(){


for(var d=0,c=[["$setSize",2],["$alterClass",2],["$cache",2],["cache",2],["paint",0],["init",0],["getInvalidWidth",0],["getInvalidHeight",0],["getWidth",0],["getHeight",0]],b,a;b=c[d++];){






a=b[0];
yb[a]=new Function("var o=this,d=ecui.ext.Decorator[o.getUID()],r=arguments;return r["+b[1]+"]?o.constructor.prototype."+a+".apply(o,r):d."+a+".apply(d,r)")}})();

















f(Vd,R).$setSize=function(i,g){
var h=this.getOuter(),b=this.$cache$paddingTop+"px",f=this.$cache$paddingLeft,c=this.getInner(),e=c.getHeight(true)+"px",d=h.lastChild,a=d.style;







a.top=b;
a.left=f+c.getWidth(true)+"px";
a.width=this.$cache$paddingRight+"px";
a.height=e;

a=d.previousSibling.style;
a.top=b;
a.width=f+"px";
a.height=e;

F.$setSize.call(this,i,g)};













f(Sd,R).$setSize=function(i,g){
var h=this.getOuter(),b=this.$cache$paddingTop,f=this.$cache$paddingLeft+"px",d=this.getInner(),c=d.getWidth(true)+"px",e=h.lastChild,a=e.style;







a.top=b+d.getHeight(true)+"px";
a.left=f;
a.width=c;
a.height=this.$cache$paddingBottom+"px";

a=e.previousSibling.style;
a.left=f;
a.width=c;
a.height=b+"px";

F.$setSize.call(this,i,g)};













f(xd,R).$setSize=function(j,k){
var l=this.getOuter(),a=this.getInner(),c=9,e=this.$cache$paddingTop,g=this.$cache$paddingLeft,b=a.getWidth(true),d=a.getHeight(true),n=["0px",e+"px",e+d+"px"],m=["0px",g+"px",g+b+"px"],f=l.lastChild;










b=[g+"px",b+"px",this.$cache$paddingRight+"px"];
d=[e+"px",d+"px",this.$cache$paddingBottom+"px"];

for(;c--;)if(c!=4){

var i=T(c/3),h=c%3;



a=f.style;
a.top=n[i];
a.left=m[h];
a.width=b[h];
a.height=d[i];
f=f.previousSibling}



F.$setSize.call(this,j,k)}})()
