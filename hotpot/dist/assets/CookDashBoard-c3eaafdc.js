import{_ as ve,r as h,c as w,a as i,o as r,b as y,g as t,e as a,w as s,m as p,K as ue,f as v,G as A,C as c,F as I,M as O,n as me,p as ge,l as ye,u as ze,i as Be,B as _e,E as ne,N as ae,O as oe,D as $,P as Ne,Q as Ve,k as Le}from"./index-077565e4.js";import{C as We,a as W,b as he,d as Ee,e as Fe}from"./cookapi-d617a930.js";import"./manage-1ae7ae30.js";const Ge="/assets/preview-78c067c2.jpg";const He=d=>(ge("data-v-f4a69cf9"),d=d(),ye(),d),Pe={class:"top"},je={key:0,class:"top_div hi_color"},Ke={key:1,class:"top_div hi_color"},Re={class:"top_time hi_color"},Ue={class:"midd"},Je={class:"midd_order_code"},Qe={class:"hi_color tag_bg"},Ye={class:"hi_color tag_bg"},Xe={class:"order_main"},Ze=He(()=>t("div",{class:"order_main_t"},"菜单",-1)),et={class:"order_dish_item_div"},tt={class:"alert-time"},nt={class:"btn_box"},at={__name:"OrderItem",props:{order:Object},setup(d){const D=d,g=h([]),x=b=>g.value.includes(b),E=w(()=>{var m;const b=(((m=D.order)==null?void 0:m.items)||[]).map((f,T)=>({...f,index:T}));return b.sort(f=>g.value.includes(f.name)?1:-1),b});function z(b){const m=new Date(b);return m.getHours().toString().padStart(2,"0")+":"+m.getMinutes().toString().padStart(2,"0")+":"+m.getSeconds().toString().padStart(2,"0")}return(b,m)=>{const f=i("el-icon"),T=i("el-checkbox"),F=i("el-checkbox-group"),G=i("el-scrollbar"),B=i("el-button");return r(),y("div",{class:me(["order_item",{commonOrder:d.order.emergency==0,emergencyOrder:d.order.emergency==1}])},[t("div",Pe,[d.order.emergency==0?(r(),y("div",je,[a(f,null,{default:s(()=>[a(p(ue))]),_:1}),v(" 订单信息 ")])):A("",!0),d.order.emergency==1?(r(),y("div",Ke,[a(f,null,{default:s(()=>[a(p(ue))]),_:1}),v(" 紧急订单信息 ")])):A("",!0),t("span",Re,"下单时间："+c(z(d.order.time)),1)]),t("div",Ue,[t("span",Je,[v("订单号："),t("span",Qe,c(d.order.orderid),1)]),t("span",null,[v("桌号："),t("span",Ye,c(d.order.tableid),1)])]),t("div",Xe,[Ze,a(G,{height:"130px"},{default:s(()=>[a(F,{modelValue:g.value,"onUpdate:modelValue":m[0]||(m[0]=q=>g.value=q)},{default:s(()=>[(r(!0),y(I,null,O(E.value,(q,N)=>(r(),y("div",{key:N,class:"order_dish_item"},[t("div",et,[a(T,{size:"large",label:q.name},{default:s(()=>[t("span",{class:me({del_span:x(q.name)})},c(q.name),3)]),_:2},1032,["label"]),t("span",tt,"x"+c(q.quantity),1)])]))),128))]),_:1},8,["modelValue"])]),_:1})]),t("div",nt,[a(B,{type:"primary",onClick:m[1]||(m[1]=q=>b.$emit("serveDish"))},{default:s(()=>[v("上菜")]),_:1})])],2)}}},pe=ve(at,[["__scopeId","data-v-f4a69cf9"]]);const M=d=>(ge("data-v-738b6923"),d=d(),ye(),d),ot={class:"background"},st={class:"user-icon"},lt={class:"welcome-label"},it=M(()=>t("i",{class:"icon icon-notification"},null,-1)),rt=M(()=>t("i",{class:"icon icon-order"},null,-1)),ct=M(()=>t("i",{class:"icon icon-schedule"},null,-1)),dt=M(()=>t("div",{class:"flex-grow"},null,-1)),ut={class:"time"},mt=M(()=>t("i",{class:"icon exit-icon"},null,-1)),_t={class:"alerts-view"},ht={class:"alert-header"},pt={class:"alert-title"},vt={class:"alert-time"},gt={class:"alert-content"},yt={class:"alert-header"},ft={class:"alert-title"},bt={class:"alert-time"},kt={class:"alert-content"},qt={class:"order_tatal"},Dt={class:"order_tatal_span"},wt={class:"list_box"},xt={class:"left_list"},St={key:1,class:"empty_div"},$t={class:"right_list"},Tt={class:"page_box"},Ct={class:"timetable-table"},It={class:"week"},Ot=["onClick"],At={key:0,class:"班"},Mt={__name:"CookDashBoard",setup(d){const D=h("");let g="";We();const x=h(2),E=ze();Be();const z=h(""),b=h(""),m=h(null),f=function(e){return e<10?`0${e}`:e},T=e=>{const n=new Date(e),l=n.getFullYear(),_=f(n.getMonth()+1),J=f(n.getDate()),Q=f(n.getHours()),Y=f(n.getMinutes()),X=f(n.getSeconds());return`${l}年${_}月${J}日 ${Q}:${Y}:${X}`},F=e=>{let n=new Date(e),l=new Date(e);const _=new Date(e).getDay()||7;return n.setDate(n.getDate()-_+1),l.setDate(l.getDate()-_+7),`${n.toLocaleDateString()}--${l.toLocaleDateString()}`};_e(()=>{setInterval(()=>{z.value=T(new Date),b.value=F(new Date)})}),h(""),window.onload=function(){window.document.onmousedown=function(){localStorage.setItem("lastTime",new Date().getTime())}};function G(){return u.value?u.value.length:"没有"}function B(e){if(e==0)return"warning";if(e==1)return"error"}function q(e){return new Date(e)}function N(e){if(e.time==1)return"早";if(e.time==2)return"中";if(e.time==3)return"晚"}const S=h("");function fe(e){e==1&&(D.value=""),x.value=e}function be(){E.push("/login")}function ke(){return"欢迎来到后厨系统,"+g}let V=h([]);const H=h(1),P=h(6);function qe(e){H.value=e}let De=w(()=>we.value.length),we=w(()=>V.value.filter(n=>S.value===""?!0:n.title.includes(S.value))),xe=w(()=>{const e=(H.value-1)*P.value,n=e+P.value;return V.value.filter(_=>S.value===""?!0:_.title.includes(S.value)).slice(e,n)}),C=h([]);const se=new Date,j=new Date;j.setDate(j.getDate()+(6-j.getDay()));let Se=w(()=>C.value.filter(n=>{const l=new Date,_=new Date().setDate(se.getDate()+2);return l.setMonth(n.month-1),l.setDate(n.date),l>=se&&l<=_}));function $e(e){if(C.value.find(n=>n.month===e.date.getMonth()+1&&n.date===e.date.getDate())){const n=C.value.filter(l=>l.month===e.date.getMonth()+1&&l.date===e.date.getDate());Ve.alert(n.map(l=>N(l)+"班"),"排班时间",{confirmButtonText:"OK"})}}const le=e=>{console.log(u),Fe({orderid:e}).then(n=>{W({number:g}).then(l=>{u.value=l.data.data}),Le({message:"上菜成功",type:"success"})})};let u=h([{orderid:1,tableid:2,time:"2023-09-01T17:21:45",phonenumber:"18551755238",cookid:1,conditions:1,emergency:1,items:[{name:"雪花勇闯天涯500ml",quantity:2},{name:"可口可乐（大）",quantity:3},{name:"椰汁",quantity:1},{name:"自选饮料",quantity:1},{name:"自选小料",quantity:1}]},{orderid:5,tableid:7,time:"2023-09-04T15:00:11",phonenumber:"13915962565",cookid:1,conditions:1,emergency:1,items:[{name:"脆皮肠",quantity:1},{name:"鹌鹑蛋",quantity:1},{name:"年糕",quantity:1},{name:"生鸡蛋",quantity:1}]},{orderid:9,tableid:4,time:"2023-09-08T15:00:21",phonenumber:"13915962565",cookid:1,conditions:1,emergency:1,items:[{name:"雪花松板肉",quantity:2},{name:"炸猪皮",quantity:2},{name:"猪脑花",quantity:3},{name:"血旺",quantity:3},{name:"捞派猪黄喉",quantity:2},{name:"鹌鹑蛋",quantity:1},{name:"脆皮肠",quantity:1},{name:"红薯苕皮",quantity:1},{name:"年糕",quantity:1},{name:"魔芋丝",quantity:1},{name:"水晶粉丝",quantity:1},{name:"豆腐皮",quantity:1},{name:"8秒劲道油豆皮",quantity:1},{name:"10秒腐竹",quantity:1},{name:"注心火锅油条",quantity:1}]},{orderid:10,tableid:4,time:"2023-09-07T15:00:23",phonenumber:"13915962565",cookid:1,conditions:1,emergency:1,items:[{name:"8秒劲道油豆皮",quantity:1},{name:"10秒腐竹",quantity:1},{name:"注心火锅油条",quantity:1}]},{orderid:45,tableid:14,time:"2023-09-06T22:31:58",phonenumber:null,cookid:1,conditions:1,emergency:0,items:[{name:"番茄火锅",quantity:3},{name:"真香锅",quantity:3},{name:"经典麻辣火锅",quantity:3}]},{orderid:47,tableid:14,time:"2023-09-07T11:58:37",phonenumber:null,cookid:1,conditions:1,emergency:0,items:[{name:"番茄火锅",quantity:3},{name:"真香锅",quantity:3},{name:"经典麻辣火锅",quantity:3}]},{orderid:49,tableid:14,time:"2023-09-07T12:25:33",phonenumber:null,cookid:1,conditions:1,emergency:1,items:[{name:"番茄火锅",quantity:3},{name:"真香锅",quantity:3},{name:"经典麻辣火锅",quantity:3}]},{orderid:51,tableid:14,time:"2023-09-07T14:13:36",phonenumber:null,cookid:1,conditions:1,emergency:0,items:[{name:"番茄火锅",quantity:3},{name:"真香锅",quantity:3},{name:"经典麻辣火锅",quantity:3}]},{orderid:53,tableid:1,time:"2023-09-07T14:45:29",phonenumber:null,cookid:1,conditions:1,emergency:1,items:[{name:"番茄火锅",quantity:3},{name:"真香锅",quantity:3},{name:"经典麻辣火锅",quantity:3}]},{orderid:55,tableid:1,time:"2023-09-07T14:47:24",phonenumber:null,cookid:1,conditions:1,emergency:0,items:[{name:"牛肉汤火锅",quantity:2}]},{orderid:57,tableid:1,time:"2023-09-07T17:34:07",phonenumber:null,cookid:1,conditions:1,emergency:0,items:[{name:"清油麻辣火锅",quantity:1}]},{orderid:59,tableid:14,time:"2023-09-08T15:48:48",phonenumber:null,cookid:1,conditions:1,emergency:0,items:[{name:"番茄火锅",quantity:3},{name:"真香锅",quantity:3},{name:"经典麻辣火锅",quantity:3}]},{orderid:61,tableid:14,time:"2023-09-08T15:51:11",phonenumber:null,cookid:1,conditions:1,emergency:0,items:[{name:"番茄火锅",quantity:3},{name:"真香锅",quantity:3},{name:"经典麻辣火锅",quantity:3}]}]);const K=h(1),R=h(6);function Te(e){K.value=e}let Ce=w(()=>u.value&&u.value.length?u.value.length:0),ie=w(()=>{const e=(K.value-1)*R.value,n=e+R.value;return u.value&&u.value.length?u.value.filter(_=>_.emergency==0).slice(e,n):new Array(0)}),U=w(()=>u.value&&u.value.length?u.value.filter(e=>e.emergency==1):new Array(0));return _e(()=>{g=localStorage.getItem("cookNumber")||"",W({number:g}).then(e=>{u.value=e.data.data,console.log(u)}),he().then(e=>{V.value=e.data.data}),Ee({number:g}).then(e=>{C.value=e.data.data}),m.value=new WebSocket("ws://192.168.121.155:8082/websocket"),m.value.onopen=()=>{console.log("WebSocket连接已建立")},m.value.onmessage=e=>{const n=JSON.parse(e.data);console.log(e.data),(n.number==g||n.number=="公告")&&(n.type==1?(W({number:g}).then(l=>{u.value=l.data.data}),ne({title:"订单变动",message:n.data,duration:0,type:"warning"})):n.type==2?(W({number:g}).then(l=>{u.value=l.data.data}),ne({title:"有新订单",message:n.data,duration:0,type:"success"})):n.type==3&&(D.value==""?D.value=1:D.value=D.value+1,he().then(l=>{V.value=l.data.data}),ne({title:"有新公告",message:n.data,duration:0})))},m.value.onclose=()=>{console.log("WebSocket连接已关闭")}}),(e,n)=>{const l=i("el-avatar"),_=i("el-menu-item"),J=i("el-badge"),Q=i("el-button"),Y=i("el-menu"),X=i("el-input"),L=i("el-form-item"),re=i("el-form"),Z=i("el-alert"),ee=i("el-scrollbar"),ce=i("el-pagination"),Ie=i("el-icon"),de=i("el-empty"),Oe=i("el-calendar"),te=i("el-col"),Ae=i("el-row");return r(),y("div",ot,[a(Y,{"default-active":x.value,class:"el-menu-demo",mode:"horizontal",onSelect:fe,ellipsis:!1},{default:s(()=>[t("li",st,[a(l,{size:"large",src:p(Ge),fit:"fill"},null,8,["src"])]),t("li",lt,c(ke()),1),a(J,{value:D.value,max:99,class:"item"},{default:s(()=>[a(_,{index:"1"},{default:s(()=>[it,v(" 通知公告")]),_:1})]),_:1},8,["value"]),a(_,{index:"2"},{default:s(()=>[rt,v(" 工作空间")]),_:1}),a(_,{index:"3"},{default:s(()=>[ct,v(" 排班表")]),_:1}),dt,t("div",ut,[a(Q,null,{default:s(()=>[t("span",null,c(z.value),1)]),_:1})]),a(_,{index:"4",onClick:be},{default:s(()=>[mt,v(" 退出 ")]),_:1})]),_:1},8,["default-active"]),ae(t("div",null,[t("div",_t,[a(re,{class:"search-form"},{default:s(()=>[a(L,{label:"查询标题"},{default:s(()=>[a(X,{placeholder:"请输入标题查询",modelValue:S.value,"onUpdate:modelValue":n[0]||(n[0]=o=>S.value=o)},null,8,["modelValue"])]),_:1})]),_:1}),a(ee,{"max-height":"630px",class:"alert-block"},{default:s(()=>[(r(!0),y(I,null,O(p(xe),(o,k)=>(r(),y("div",{key:k},[o.emergency==0?(r(),$(Z,{key:0,title:o.title,type:B(o.emergency),description:o.content,class:"custom-alert",closable:!1,effect:"dark"},{default:s(()=>[t("div",ht,[t("div",pt,c(o.title),1),t("div",vt,c(q(o.time)),1)]),t("div",gt,c(o.content),1)]),_:2},1032,["title","type","description"])):A("",!0),o.emergency==1?(r(),$(Z,{key:1,title:o.title,type:B(o.emergency),description:o.content,class:"custom-alert-emergency",closable:!1,effect:"dark"},{default:s(()=>[t("div",yt,[t("div",ft,c(o.title),1),t("div",bt,c(q(o.time)),1)]),t("div",kt,c(o.content),1)]),_:2},1032,["title","type","description"])):A("",!0)]))),128))]),_:1}),a(ce,{onCurrentChange:qe,"current-page":H.value,"page-size":P.value,total:p(De),layout:"total, prev, pager, next",background:""},null,8,["current-page","page-size","total"])])],512),[[oe,x.value==1]]),ae(t("div",null,[t("div",qt,[a(Ie,null,{default:s(()=>[a(p(Ne))]),_:1}),v("共有 "),t("span",Dt,c(G()),1),v(" 个订单待制作 ")]),t("div",wt,[t("div",xt,[p(ie).length>0?(r(!0),y(I,{key:0},O(p(ie),(o,k)=>(r(),$(pe,{order:o,key:k,onServeDish:Me=>le(o.orderid)},null,8,["order","onServeDish"]))),128)):(r(),y("div",St,[a(de,{description:"暂无订单"})]))]),t("div",$t,[p(U).length>0?(r(),$(ee,{key:0,height:"710px"},{default:s(()=>[(r(!0),y(I,null,O(p(U),(o,k)=>(r(),$(pe,{order:o,key:k,onServeDish:Me=>le(o.orderid)},null,8,["order","onServeDish"]))),128))]),_:1})):(r(),$(de,{key:1,description:"无紧急订单"}))])]),t("div",Tt,[a(ce,{onCurrentChange:Te,"current-page":K.value,"page-size":R.value,total:p(Ce)-p(U).length,layout:"prev, pager, next",class:"pagination-container",background:""},null,8,["current-page","page-size","total"])])],512),[[oe,x.value==2]]),ae(t("div",null,[a(Ae,{gutter:0},{default:s(()=>[a(te,{span:18},{default:s(()=>[t("div",Ct,[t("div",It,[t("span",null,c(b.value),1)]),a(Oe,{"first-day-of-week":1},{dateCell:s(({data:o})=>[t("div",{onClick:k=>$e(o)},[v(c(o.day.split("-").slice(2).join("-"))+" ",1),p(C).find(k=>k.month===o.date.getMonth()+1&&k.date===o.date.getDate())?(r(),y("p",At," 班 ")):A("",!0)],8,Ot)]),_:1})])]),_:1}),a(te,{span:5},{default:s(()=>[a(ee,{height:"630px","max-height":"630px"},{default:s(()=>[(r(!0),y(I,null,O(p(Se),(o,k)=>(r(),y("div",{key:k},[a(Z,{title:"近期排班信息",type:"success",closable:!1,class:"schedule-form-alert"}),a(re,{model:e.form,"label-width":"100px",class:"schedule-form"},{default:s(()=>[a(L,{label:"日期："},{default:s(()=>[v(c(o.month+"月"+o.date+"日"),1)]),_:2},1024),a(L,{label:"工号："},{default:s(()=>[v(c(p(g)),1)]),_:1}),a(L,{label:"时段："},{default:s(()=>[v(c(N(o)+"班"),1)]),_:2},1024)]),_:2},1032,["model"])]))),128))]),_:1})]),_:1}),a(te,{span:1})]),_:1})],512),[[oe,x.value==3]])])}}},Vt=ve(Mt,[["__scopeId","data-v-738b6923"]]);export{Vt as default};