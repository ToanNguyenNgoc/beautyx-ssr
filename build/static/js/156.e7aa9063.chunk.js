"use strict";(self.webpackChunkweb_booking=self.webpackChunkweb_booking||[]).push([[156],{25485:function(e,i,s){s.r(i),s.d(i,{default:function(){return b}});var t=s(89861),a=s(60220),o=s(56598),l=s(28162),r=s(3444),n=s(34088),_=s(82728),c=s(13392),d=s(20029),m=s(72791),p=s(12978),u=s(19598),h=s(26454),g={container:"group-detail_container__Wx2LZ",cover:"group-detail_cover__Q3oVa",cover_image_bg:"group-detail_cover_image_bg__wqniT",cover_image:"group-detail_cover_image__rUavc",detail_cnt:"group-detail_detail_cnt__zofGn",detail:"group-detail_detail__H02MO",group_name:"group-detail_group_name__5XwMh",group_member:"group-detail_group_member__3PplR",group_member_count:"group-detail_group_member_count__M7mGm",detail_right_join_btn:"group-detail_detail_right_join_btn__G4wqK",title:"group-detail_title__46Jcf",body:"group-detail_body__F1l4Q",body_left:"group-detail_body_left__Btm2i",group_post_inp:"group-detail_group_post_inp__wyKJu",desc:"group-detail_desc__PKFR7",desc_cnt:"group-detail_desc_cnt__E0QQs",information:"group-detail_information__kIGBi",info_wrapper:"group-detail_info_wrapper__6qy7b",info_section:"group-detail_info_section__UGqh5",info_section_title:"group-detail_info_section_title__bNN04",info_section_desc:"group-detail_info_section_desc__4v-az",info_section_other:"group-detail_info_section_other__docWG",info_section_other_item:"group-detail_info_section_other_item__ZN4Os",info_member_item:"group-detail_info_member_item__fwn9J",info_member_item_avt:"group-detail_info_member_item_avt__OT2dp",info_member_item_name:"group-detail_info_member_item_name__EvIxQ",head_mobile:"group-detail_head_mobile__Q0ZLz",head_mobile_back:"group-detail_head_mobile_back__gk9-b",post_list_item:"group-detail_post_list_item__pfxCE"},v=s(29818),x=s(20181),j=s(80184);var f=function(e){const{open:i,setOpen:s,group:t,postListCount:a}=e,o=(0,_.oG)(),l=[];for(var n=0;n<20;n++){const e={id:n,fullname:`Full name ${n}`,avatar:`https://picsum.photos/id/1${n}/100/100`};l.push(e)}return(0,j.jsx)(j.Fragment,{children:(0,j.jsxs)(v.Z,{fullScreen:o,open:i,onClose:()=>s(!1),children:[o&&(0,j.jsx)(r.Z,{onBackFunc:()=>s(!1),title:null===t||void 0===t?void 0:t.name}),(0,j.jsx)("div",{className:g.information,children:(0,j.jsxs)("div",{className:g.info_wrapper,children:[(0,j.jsxs)("div",{className:g.info_section,children:[(0,j.jsx)("p",{className:g.info_section_title,children:"Th\xf4ng tin chung"}),(0,j.jsx)("div",{className:g.info_section_desc,children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin laoreet elit purus, et gravida libero. Lorem ipsum dolor sit amet ...Xem th\xeam"}),(0,j.jsxs)("ul",{className:g.info_section_other,children:[(0,j.jsxs)("li",{className:g.info_section_other_item,children:[(0,j.jsx)("img",{src:x.Z.userGray,alt:""}),"200 th\xe0nh vi\xean"]}),(0,j.jsxs)("li",{className:g.info_section_other_item,children:[(0,j.jsx)("img",{src:x.Z.postGray,alt:""}),a," b\xe0i vi\u1ebft"]}),(0,j.jsxs)("li",{className:g.info_section_other_item,children:[(0,j.jsx)("img",{src:x.Z.createAtGray,alt:""}),"T\u1ea1o ng\xe0y 01/12/2022"]})]})]}),(0,j.jsxs)("div",{className:g.info_section,children:[(0,j.jsx)("p",{className:g.info_section_title,children:"Quy \u0111\u1ecbnh nh\xf3m"}),(0,j.jsx)("div",{className:g.info_section_desc,children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin laoreet elit purus, et gravida libero. Lorem ipsum dolor sit amet ...Xem th\xeam"})]}),(0,j.jsxs)("div",{className:g.info_section,children:[(0,j.jsx)("p",{className:g.info_section_title,children:"Th\xe0nh vi\xean nh\xf3m"}),(0,j.jsx)("ul",{className:g.info_member_list,children:l.map((e=>(0,j.jsxs)("li",{className:g.info_member_item,children:[(0,j.jsx)("div",{className:g.info_member_item_avt,children:(0,j.jsx)("img",{src:e.avatar,alt:""})}),(0,j.jsx)("div",{className:g.info_member_item_name,children:e.fullname})]},e.id)))})]})]})})]})})};var b=function(){const{id:e}=(0,u.UO)(),i=(0,_.oG)(),s=(0,u.k6)(),[v,x]=(0,m.useState)(!1),b=h.Xx.find((i=>i.id===parseInt(e)));(0,m.useEffect)((()=>{e&&b||s.replace("/error")}),[]);const{posts:N}=(0,p.v9)((e=>e.COMMUNITY)),Z=N.filter((i=>i.group.id===parseInt(e)));return window.addEventListener("scroll",(()=>{const e=document.getElementById("head_mobile"),i=window.scrollY;e&&(e.style.backgroundColor=`rgb(255 255 255 / ${i}%)`)})),(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(n.Z,{title:null===b||void 0===b?void 0:b.name}),i&&(0,j.jsx)(r.Z,{className:g.head_mobile,classNameInput:g.head_mobile_back,title:""}),(0,j.jsx)(o.Z,{children:(0,j.jsxs)("div",{className:g.container,children:[(0,j.jsxs)("div",{className:g.cover,children:[(0,j.jsx)("img",{src:null===b||void 0===b?void 0:b.image_url,className:g.cover_image_bg,alt:""}),(0,j.jsx)("div",{className:g.cover_image,children:(0,j.jsx)("img",{src:null===b||void 0===b?void 0:b.image_url,alt:""})}),(0,j.jsx)("div",{className:g.detail_cnt,children:(0,j.jsxs)("div",{className:g.detail,children:[(0,j.jsxs)("div",{className:g.detail_left,children:[(0,j.jsx)("p",{className:g.group_name,children:null===b||void 0===b?void 0:b.name}),(0,j.jsxs)("div",{className:g.group_member,children:[(0,j.jsxs)(t.Z,{max:4,children:[(0,j.jsx)(a.Z,{alt:"Remy Sharp",src:c.Z.avatar}),(0,j.jsx)(a.Z,{alt:"Travis Howard",src:c.Z.avatar}),(0,j.jsx)(a.Z,{alt:"Cindy Baker",src:c.Z.avatar}),(0,j.jsx)(a.Z,{alt:"Agnes Walker",src:c.Z.avatar}),(0,j.jsx)(a.Z,{alt:"Trevor Henderson",src:c.Z.avatar})]}),(0,j.jsx)("span",{className:g.group_member_count,children:"200 th\xe0nh vi\xean"})]})]}),(0,j.jsx)("div",{className:g.detail_right,children:(0,j.jsx)(l.Rb,{className:g.detail_right_join_btn,title:"Tham gia ngay"})})]})})]}),(0,j.jsxs)("div",{className:g.body,children:[(0,j.jsxs)("div",{className:g.body_left,children:[(0,j.jsxs)("div",{className:g.group_post_inp,children:[(0,j.jsx)("p",{className:g.title,children:"T\u1ea1o b\xe0i vi\u1ebft"}),b&&(0,j.jsx)(d.V,{group:b})]}),(0,j.jsxs)("div",{className:g.group_posts,children:[(0,j.jsxs)("p",{className:g.title,children:["B\xe0i vi\u1ebft (",null===Z||void 0===Z?void 0:Z.length,")"]}),(0,j.jsx)("ul",{className:g.post_list,children:null===Z||void 0===Z?void 0:Z.map(((e,i)=>(0,j.jsx)("li",{className:g.post_list_item,children:(0,j.jsx)(d.y,{post:e})},i)))})]})]}),(0,j.jsxs)("div",{className:g.desc,children:[(0,j.jsx)("p",{className:g.title,children:"Gi\u1edbi thi\u1ec7u nh\xf3m"}),(0,j.jsxs)("div",{className:g.desc_cnt,children:["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin laoreet elit purus, et gravida libero Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin laoreet elit purus, et gravida libero ...",(0,j.jsx)("span",{onClick:()=>x(!0),children:"Xem th\xeam"})]})]})]})]})}),b&&(0,j.jsx)(f,{open:v,setOpen:x,group:b,postListCount:null===Z||void 0===Z?void 0:Z.length})]})}}}]);
//# sourceMappingURL=156.e7aa9063.chunk.js.map