"use strict";(self.webpackChunkweb_booking=self.webpackChunkweb_booking||[]).push([[566],{41566:function(e,i,_){_.r(i),_.d(i,{default:function(){return y}});_(72791);var t={voucher_page:"style_voucher_page__NITQi",voucher_list:"style_voucher_list__T4qqB",voucher_item_cnt:"style_voucher_item_cnt__p+O+I",voucher_item:"style_voucher_item__NDeFh",voucher_item_left:"style_voucher_item_left__mgl01",voucher_item_right:"style_voucher_item_right__JXzaR",voucher_item_img:"style_voucher_item_img__diAC2",voucher_item_expiry:"style_voucher_item_expiry__nM2HP",voucher_info_name:"style_voucher_info_name__zJOCu",voucher_info_price:"style_voucher_info_price__N4nji",voucher_item_btn:"style_voucher_item_btn__iEB7o","infinite-scroll-component":"style_infinite-scroll-component__ZPNFf",vouvher_loadmore_wrap:"style_vouvher_loadmore_wrap__8CgmP",load_item_cnt:"style_load_item_cnt__auGQh",load_item_left:"style_load_item_left__eYwCT",load_item_right:"style_load_item_right__fD8wU",load_item_right_item:"style_load_item_right_item__CksjV",voucher_loadmore_btn:"style_voucher_loadmore_btn__f0YXy"},l=_(54676),o=_(3444),s=_(10266),c=_(32117),r=_(76012),d=_(21272),n=_(22546),a=_(71269),u=_(19598),v=_(80527),h=_(61424),m=_(68915),p=_(97892),x=_.n(p),j=_(2579),g=_(14771),f=_(80184);function y(){const e=(0,l.oG)(),i=(0,d.E)(),_={...r.F0,limit:30,sort:"TIKI"===i?"-priority":""},{resData:c,totalItem:n,onLoadMore:a}=(0,l.H9)(!0,"/discounts",_),u=null!==c&&void 0!==c?c:[],v=u.map((e=>e.items.map((i=>({...i,discount:e}))).flat())).flat();return(0,f.jsxs)("div",{children:[e&&(0,f.jsx)(o.Z,{title:"Voucher"}),(0,f.jsx)(s.Z,{children:(0,f.jsx)("div",{className:t.voucher_page,children:(0,f.jsxs)(g.Z,{dataLength:u.length,hasMore:!0,loader:(0,f.jsx)(f.Fragment,{}),next:()=>{c.length<n&&a()},children:[(0,f.jsx)("div",{className:t.voucher_list,children:v.map(((e,i)=>(0,f.jsx)(N,{item:e},i)))}),c.length<n&&(0,f.jsx)(b,{})]})})})]})}const N=e=>{var i,_,l,o,s,r,d,p,j,g,y,N,b;let{item:C}=e;const w=(0,u.k6)();return(0,f.jsx)("div",{className:t.voucher_item_cnt,children:(0,f.jsxs)("div",{className:t.voucher_item,children:[(0,f.jsx)("div",{className:t.voucher_item_left,children:(0,f.jsx)("div",{className:t.voucher_item_img,children:(0,f.jsx)("img",{src:null!==C&&void 0!==C&&null!==(i=C.productable)&&void 0!==i&&i.image?null===(_=C.productable)||void 0===_?void 0:_.image_url:null===(l=C.organization)||void 0===l?void 0:l.image_url,alt:""})})}),(0,f.jsxs)("div",{className:t.voucher_item_right,children:[(0,f.jsxs)("div",{className:t.voucher_item_info,children:[(0,f.jsx)("div",{className:t.voucher_info_name,children:(0,f.jsx)("span",{children:(null===C||void 0===C||null===(o=C.productable)||void 0===o?void 0:o.service_name)||(null===C||void 0===C||null===(s=C.productable)||void 0===s?void 0:s.product_name)})}),(0,f.jsxs)("div",{className:t.voucher_info_price,children:[(0,f.jsxs)("p",{children:[(0,a.Z)((null===C||void 0===C||null===(r=C.productable)||void 0===r?void 0:r.price)||(null===C||void 0===C||null===(d=C.productable)||void 0===d?void 0:d.retail_price)),"\u0111"]}),(0,f.jsxs)("p",{children:["Gi\u1ea3m c\xf2n:"," ",(0,f.jsx)("span",{children:(null===(p=C.discount)||void 0===p?void 0:p.discount_type)===n.uH.FINAL_PRICE.key?`${(0,a.Z)(null===(j=C.discount)||void 0===j?void 0:j.discount_value)}\u0111`:`${(0,a.Z)(null===C||void 0===C?void 0:C.view_price)}\u0111`})]})]}),(0,f.jsx)("div",{className:t.voucher_item_expiry,children:(0,f.jsxs)("p",{children:["HSD:"," ",(null===(g=C.discount)||void 0===g?void 0:g.valid_from)&&x()(null===(y=C.discount)||void 0===y?void 0:y.valid_from).format("DD/MM/YYYY")," ","- ",(null===(N=C.discount)||void 0===N?void 0:N.valid_util)&&x()(null===(b=C.discount)||void 0===b?void 0:b.valid_util).format("DD/MM/YYYY")]})})]}),(0,f.jsx)(c.Rb,{onClick:()=>((e,i)=>{v.ZP.DISCOOUNT_ITEM_CLICK(e.organization.id,"khuy\u1ebfn m\xe3i hot",e.discount_id),(0,h.Kz)(h.co,"detail_discount",{service:e.productable.product_name,merchant:e.organization.name}),w.push((0,m.s$)(i,e))})(C,C.discount),title:"Chi ti\u1ebft",className:`${t.voucher_item_btn}`})]})]})})},b=()=>(0,f.jsx)("div",{className:t.voucher_list,children:[1,2,3,4,5,6,7,8].map((e=>(0,f.jsxs)("div",{className:t.load_item_cnt,children:[(0,f.jsx)("div",{className:t.load_item_left,children:(0,f.jsx)(j.Z,{width:"100%",height:"100%"})}),(0,f.jsxs)("div",{className:t.load_item_right,children:[(0,f.jsx)("div",{className:t.load_item_right_item,children:(0,f.jsx)(j.Z,{width:"100%",height:"100%"})}),(0,f.jsx)("div",{className:t.load_item_right_item,children:(0,f.jsx)(j.Z,{width:"100%",height:"100%"})})]})]},e)))})}}]);
//# sourceMappingURL=566.e84d83f4.chunk.js.map