import{_ as R,u as T,i as G,r as c,c as b,B as P,a as s,o as w,b as C,g as x,e as t,w as o,m as g,J as E,F as J,D as j,f as V,C as F}from"./index-077565e4.js";import{v as A,w as K}from"./adminapi-369833a9.js";import"./manage-1ae7ae30.js";const L={class:"main-form"},Q={class:"block"},W={key:1},X={__name:"HistoryOrder",setup(Z){T(),G();let f=c([]),D=c([{name:"娃娃菜",quantity:2,price:40,img:null},{name:"冬瓜",quantity:1,price:30,img:null},{name:"山药",quantity:1,price:50,img:null},{name:"五常米饭",quantity:2,price:15,img:null}]);const v=c(1),y=c(11);function Y(a){v.value=a}let S=b(()=>q.value.length),q=b(()=>f.value.filter(e=>{if(u.value==="")return r.value===""?!0:e.phonenumber.toString().includes(r.value);{const _=new Date(e.time).getMonth()+1,i=u.value.getMonth()+1,d=new Date(e.time).getFullYear(),m=u.value.getFullYear();return r.value===""?_===i&&d===m:_===i&&d===m&&e.phonenumber.toString().includes(r.value)}})),k=b(()=>{const a=(v.value-1)*y.value,e=a+y.value;return f.value.filter(i=>{if(u.value==="")return r.value===""?!0:i.phonenumber.toString().includes(r.value);{const d=new Date(i.time).getMonth()+1,m=u.value.getMonth()+1,n=new Date(i.time).getFullYear(),h=u.value.getFullYear();return r.value===""?d===m&&n===h:d===m&&n===h&&i.phonenumber.toString().includes(r.value)}}).slice(a,e)});const u=c(""),r=c("");let p=c(!1);function B(a){K({finishedorderid:a.finishedorderid}).then(e=>{D.value=e.data.data.items}),p.value=!0}const H=(a,e)=>e.comment==a,U=(a,e)=>{if(a==1)return e.money>0&&e.money<=100;if(a==2)return e.money>100&&e.money<=300;if(a==3)return e.money>300&&e.money<=500;if(a==4)return e.money>500&&e.money<=1e3;if(a==5)return e.money>1e3};return P(()=>{A().then(a=>{f.value=a.data.data}),console.log(k),console.log(f)}),(a,e)=>{const _=s("el-input"),i=s("el-form-item"),d=s("el-date-picker"),m=s("el-form"),n=s("el-table-column"),h=s("el-rate"),z=s("el-button"),O=s("el-table"),I=s("el-pagination"),N=s("el-dialog");return w(),C(J,null,[x("div",null,[x("div",L,[t(m,{class:"date-picker"},{default:o(()=>[t(i,{label:"查询手机号"},{default:o(()=>[t(_,{placeholder:"请输入手机号",modelValue:r.value,"onUpdate:modelValue":e[0]||(e[0]=l=>r.value=l)},null,8,["modelValue"])]),_:1}),t(i,{label:"选择月份",class:"month-pick-form"},{default:o(()=>[x("div",Q,[t(d,{modelValue:u.value,"onUpdate:modelValue":e[1]||(e[1]=l=>u.value=l),type:"month",placeholder:"选择查询月份"},null,8,["modelValue"])])]),_:1})]),_:1}),t(O,{data:g(k),stripe:"",class:"table",height:"590","row-style":{height:"50px"}},{default:o(()=>[t(n,{prop:"finishedorderid",fixed:"",label:"订单号",width:"140"}),t(n,{prop:"tableid",sortable:"",label:"桌号",width:"140"}),t(n,{prop:"phonenumber",label:"手机号",width:"220"}),t(n,{prop:"comment",label:"订单评价",width:"200",filters:[{text:"未评分",value:0},{text:"一星",value:1},{text:"二星",value:2},{text:"三星",value:3},{text:"四星",value:4},{text:"五星",value:5}],"filter-method":H},{default:o(l=>[l.row.comment>0?(w(),j(h,{key:0,modelValue:l.row.comment,"onUpdate:modelValue":M=>l.row.comment=M,disabled:"","show-score":"","text-color":"#ff9900"},null,8,["modelValue","onUpdate:modelValue"])):(w(),C("div",W," 未评分 "))]),_:1}),t(n,{prop:"time",label:"订单日期",width:"129"},{default:o(l=>[V(F(new Date(l.row.time).getFullYear()+"/"+(new Date(l.row.time).getMonth()+1)+"/"+new Date(l.row.time).getDate()),1)]),_:1}),t(n,{prop:"time",label:"订单时间",width:"129"},{default:o(l=>[V(F(new Date(l.row.time).getHours()+":"+new Date(l.row.time).getMinutes()+":"+new Date(l.row.time).getSeconds()),1)]),_:1}),t(n,{prop:"money",label:"总价",width:"100",filters:[{text:"0-100",value:1},{text:"100-300",value:2},{text:"300-500",value:3},{text:"500-1000",value:4},{text:"1000以上",value:5}],"filter-method":U}),t(n,{fixed:"right",label:"菜品详情",width:"100"},{default:o(l=>[t(z,{link:"",type:"primary",size:"small",onClick:M=>B(l.row)},{default:o(()=>[V("详情")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"]),t(I,{onCurrentChange:Y,"current-page":v.value,"page-size":y.value,total:g(S),layout:"->,total, prev, pager, next",class:"pagination-container",background:""},null,8,["current-page","page-size","total"])])]),t(N,{modelValue:g(p),"onUpdate:modelValue":e[2]||(e[2]=l=>E(p)?p.value=l:p=l),title:"订单菜品信息",class:"订单菜品",width:"400"},{default:o(()=>[t(O,{data:g(D),"show-summary":"",cla:""},{default:o(()=>[t(n,{property:"name",label:"菜品名",width:"150"}),t(n,{property:"quantity",label:"数量",width:"100"}),t(n,{property:"price",label:"价格",width:"100"})]),_:1},8,["data"])]),_:1},8,["modelValue"])],64)}}},le=R(X,[["__scopeId","data-v-27f5203c"]]);export{le as default};
