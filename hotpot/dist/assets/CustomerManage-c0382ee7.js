import{d as O,r as u,j as q,c as L,B as F,a as s,o as i,b as _,e as a,w as t,g as m,m as z,C as c,D as b,G as p,f as J,H as K,p as Q,l as X,_ as Y}from"./index-077565e4.js";import{b as Z,c as $}from"./adminapi-369833a9.js";import"./manage-1ae7ae30.js";const B=k=>(Q("data-v-afd93ab8"),k=k(),X(),k),ee={class:"position"},oe={class:"表格"},ae={key:0},te={key:1},de={key:2},le={key:1},ne=B(()=>m("span",{id:"card-header"},[m("span",{id:"card-header-text"}," 心愿值排行榜 ")],-1)),re=B(()=>m("div",{id:"main1",style:{width:"30vw",height:"55vh"}},null,-1)),se=O({__name:"CustomerManage",setup(k){u(!1);const x=u(1),S=u(11),v=u(1),w=u(2),g=u(3),y=u(4),V=u(5),d=q({select:"",inputSearch:""}),T=r=>{x.value=r};let D=L(()=>C.value.length),M=L(()=>{const r=(x.value-1)*S.value,o=r+S.value;return C.value.filter(l=>{if(d.inputSearch===""&&d.select==="")return!0;if(d.select!=""&&d.inputSearch===""&&l.ranks==d.select)return l.ranks==d.select;if(d.inputSearch!=""&&d.select===""&&l.nickname.includes(d.inputSearch))return l.nickname.includes(d.inputSearch);if(d.select!=""&&d.inputSearch!="")return d.select="",l.nickname.includes(d.inputSearch)}).slice(r,o)}),C=u([{customerid:3,nickname:"张飞",ranks:"3",phonenumber:"18652936273",birthday:"1989-12-10",registerdate:"2021-10-9",food1:"food1",food2:"food2",food3:"food3"},{customerid:3,nickname:"张飞",ranks:"3",phonenumber:"18652936273",birthday:"1989-12-10",registerdate:"2021-10-9",food1:"food1",food2:"food2",food3:"food3"},{customerid:3,nickname:"张飞",ranks:"3",phonenumber:"18652936273",birthday:"1989-12-10",registerdate:"2021-10-9",food1:"food1",food2:"food2",food3:"food3"},{customerid:3,nickname:"张飞",ranks:"3",phonenumber:"18652936273",birthday:"1989-12-10",registerdate:"2021-10-9",food1:"food1",food2:"food2",food3:"food3"},{customerid:3,nickname:"张飞",ranks:"3",phonenumber:"18652936273",birthday:"1989-12-10",registerdate:"2021-10-9",food1:"food1",food2:"food2",food3:"food3"},{customerid:3,nickname:"张飞",ranks:"3",phonenumber:"18652936273",birthday:"1989-12-10",registerdate:"2021-10-9",food1:"food1",food2:"food2",food3:"food3"},{customerid:3,nickname:"张飞",ranks:"3",phonenumber:"18652936273",birthday:"1989-12-10",registerdate:"2021-10-9",food1:"food1",food2:"food2",food3:"food3"},{customerid:3,nickname:"张飞",ranks:"3",phonenumber:"18652936273",birthday:"1989-12-10",registerdate:"2021-10-9",food1:"food1",food2:"food2",food3:"food3"},{customerid:3,nickname:"张飞",ranks:"3",phonenumber:"18652936273",birthday:"1989-12-10",registerdate:"2021-10-9",food1:"food1",food2:"food2",food3:"food3"},{customerid:3,nickname:"张飞",ranks:"3",phonenumber:"18652936273",birthday:"1989-12-10",registerdate:"2021-10-9",food1:"food1",food2:"food2",food3:"food3"},{customerid:3,nickname:"张飞",ranks:"3",phonenumber:"18652936273",birthday:"1989-12-10",registerdate:"2021-10-9",food1:"food1",food2:"food2",food3:"food3"},{customerid:3,nickname:"张飞",ranks:"3",phonenumber:"18652936273",birthday:"1989-12-10",registerdate:"2021-10-9",food1:"food1",food2:"food2",food3:"food3"},{customerid:3,nickname:"张飞",ranks:"3",phonenumber:"18652936273",birthday:"1989-12-10",registerdate:"2021-10-9",food1:"food1",food2:"food2",food3:"food3"},{customerid:3,nickname:"张飞",ranks:"3",phonenumber:"18652936273",birthday:"1989-12-10",registerdate:"2021-10-9",food1:"food1",food2:"food2",food3:"food3"},{customerid:3,nickname:"张飞",ranks:"3",phonenumber:"18652936273",birthday:"1989-12-10",registerdate:"2021-10-9",food1:"food1",food2:"food2",food3:"food3"}]),U=u([]);const N=()=>{const r=K(document.getElementById("main1")),o={yAxis:{data:U.value.map(n=>n.food),axisLabel:{inside:!0,verticalAlign:"bottom",lineHeight:60,color:"#2193b0",fontSize:14},axisTick:{show:!1},axisLine:{show:!1},z:10,inverse:!0},xAxis:{type:"value",axisLine:{show:!1},axisTick:{show:!1},axisLabel:{color:"#999"},splitLine:{show:!1}},series:[{data:U.value.map(n=>n.totalRankedScore),type:"bar",itemStyle:{borderRadius:[3,20,20,3],color:function(n){return n.dataIndex===0?"#d84430":n.dataIndex===1?"#f38237":n.dataIndex===2?"#e2aa20":"#608289"}}}],tooltip:{trigger:"axis",axisPointer:{type:"shadow"},backgroundColor:"#fff",borderWidth:1,textStyle:{color:"#000",fontSize:14}}};r.setOption(o)};return F(()=>{Z().then(r=>{C.value=r.data.data,console.log(r.data.data)}),$().then(r=>{U.value=r.data.data,N()})}),(r,o)=>{const n=s("el-option"),l=s("el-rate"),A=s("el-select"),G=s("el-input"),h=s("el-table-column"),R=s("el-tag"),E=s("el-popover"),H=s("el-table"),P=s("el-pagination"),I=s("el-col"),W=s("el-card"),j=s("el-row");return i(),_("div",ee,[a(j,{gutter:"20"},{default:t(()=>[a(I,{span:18},{default:t(()=>[a(G,{modelValue:d.inputSearch,"onUpdate:modelValue":o[6]||(o[6]=e=>d.inputSearch=e),clearable:"",placeholder:"搜索关键字",class:"inputSearch"},{prepend:t(()=>[a(A,{modelValue:d.select,"onUpdate:modelValue":o[5]||(o[5]=e=>d.select=e),placeholder:"星级",style:{width:"120px"}},{default:t(()=>[a(n,{label:"全部星级",value:""}),a(n,{label:"麻辣探险家",value:"1"},{default:t(()=>[a(l,{modelValue:v.value,"onUpdate:modelValue":o[0]||(o[0]=e=>v.value=e),disabled:"","show-score":"","score-template":" 麻辣探险家"},null,8,["modelValue"])]),_:1}),a(n,{label:"热情火锅客",value:"2"},{default:t(()=>[a(l,{modelValue:w.value,"onUpdate:modelValue":o[1]||(o[1]=e=>w.value=e),disabled:"","show-score":"","score-template":" 热情火锅客"},null,8,["modelValue"])]),_:1}),a(n,{label:"湖底品鉴师",value:"3"},{default:t(()=>[a(l,{modelValue:g.value,"onUpdate:modelValue":o[2]||(o[2]=e=>g.value=e),disabled:"","show-score":"","score-template":" 湖底品鉴师"},null,8,["modelValue"])]),_:1}),a(n,{label:"湖底捞大师",value:"4"},{default:t(()=>[a(l,{modelValue:y.value,"onUpdate:modelValue":o[3]||(o[3]=e=>y.value=e),disabled:"","show-score":"","score-template":" 湖底捞大师"},null,8,["modelValue"])]),_:1}),a(n,{label:"湖底捞传奇",value:"5"},{default:t(()=>[a(l,{modelValue:V.value,"onUpdate:modelValue":o[4]||(o[4]=e=>V.value=e),disabled:"","show-score":"","score-template":" 湖底捞传奇"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["modelValue"]),m("div",oe,[a(H,{data:z(M),stripe:"",class:"table"},{default:t(()=>[a(h,{fixed:"",sortable:"",prop:"customerid",label:"顾客id",width:"90"},{default:t(e=>[m("span",null,c(e.row.customerid),1)]),_:1}),a(h,{prop:"nickname",label:"昵称",width:"100"},{default:t(e=>[m("span",null,c(e.row.nickname),1)]),_:1}),a(h,{prop:"ranks",label:"会员等级",width:"240"},{default:t(e=>[e.row.ranks==1?(i(),b(l,{key:0,modelValue:v.value,"onUpdate:modelValue":o[7]||(o[7]=f=>v.value=f),disabled:"","show-score":"","score-template":" 麻辣探险家"},null,8,["modelValue"])):p("",!0),e.row.ranks==2?(i(),b(l,{key:1,modelValue:w.value,"onUpdate:modelValue":o[8]||(o[8]=f=>w.value=f),disabled:"","show-score":"","score-template":" 热情火锅客"},null,8,["modelValue"])):p("",!0),e.row.ranks==3?(i(),b(l,{key:2,modelValue:g.value,"onUpdate:modelValue":o[9]||(o[9]=f=>g.value=f),disabled:"","show-score":"","score-template":" 湖底品鉴师"},null,8,["modelValue"])):p("",!0),e.row.ranks==4?(i(),b(l,{key:3,modelValue:y.value,"onUpdate:modelValue":o[10]||(o[10]=f=>y.value=f),disabled:"","show-score":"","score-template":" 湖底捞大师"},null,8,["modelValue"])):p("",!0),e.row.ranks==5?(i(),b(l,{key:4,modelValue:V.value,"onUpdate:modelValue":o[11]||(o[11]=f=>V.value=f),disabled:"","show-score":"","score-template":" 湖底捞传奇"},null,8,["modelValue"])):p("",!0)]),_:1}),a(h,{prop:"phonenumber",label:"联系方式",width:"140"},{default:t(e=>[m("span",null,c(e.row.phonenumber),1)]),_:1}),a(h,{prop:"birthday",label:"生日",width:"140"},{default:t(e=>[m("span",null,c(e.row.birthday),1)]),_:1}),a(h,{prop:"registerdate",label:"入会日期",width:"140"},{default:t(e=>[m("span",null,c(e.row.registerdate),1)]),_:1}),a(h,{prop:"wishLists",width:"100"},{default:t(e=>[e.row.food1||e.row.food2||e.row.food3?(i(),b(E,{key:0,placement:"top",title:"小心愿",width:300,trigger:"click"},{reference:t(()=>[a(R,{type:"",class:"bigger"},{default:t(()=>[J("小心愿")]),_:1})]),default:t(()=>[e.row.food1!=""?(i(),_("p",ae," 1. "+c(e.row.food1),1)):p("",!0),e.row.food2!=""?(i(),_("p",te," 2. "+c(e.row.food2),1)):p("",!0),e.row.food3!=""?(i(),_("p",de," 3. "+c(e.row.food3),1)):p("",!0)]),_:2},1024)):(i(),_("div",le))]),_:1})]),_:1},8,["data"]),a(P,{onCurrentChange:T,"current-page":x.value,"page-size":S.value,total:z(D),layout:"->,total, prev, pager, next",class:"pagination-container"},null,8,["current-page","page-size","total"])])]),_:1}),a(I,{span:6},{default:t(()=>[a(W,{id:"card-会员统计",shadow:"hover",class:"wish-card"},{header:t(()=>[ne]),default:t(()=>[re]),_:1})]),_:1})]),_:1})])}}});const me=Y(se,[["__scopeId","data-v-afd93ab8"]]);export{me as default};