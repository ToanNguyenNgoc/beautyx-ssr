"use strict";(self.webpackChunkweb_booking=self.webpackChunkweb_booking||[]).push([[930],{73930:function(e,t,i){i.r(t),i.d(t,{default:function(){return h}});var _=i(10117),n=i(32117),a=i(26395),l=i(54676),c=(i(72791),i(19598)),s=i(91523),d=i(68915),r={back_btn:"trend-detail_back_btn__cAjmb",container:"trend-detail_container__LW5aw",left:"trend-detail_left__zkPEH",video_container:"trend-detail_video_container__NJTaI",video_blur:"trend-detail_video_blur__BJ7VA",video_wrapper:"trend-detail_video_wrapper__16p74",video:"trend-detail_video__UtiV1",right:"trend-detail_right__zzi54",right_top:"trend-detail_right_top__s6Pbt",right_top_org:"trend-detail_right_top_org__W77YF",org_detail:"trend-detail_org_detail__NhzaH",org_detail_img:"trend-detail_org_detail_img__tYN5Z",org_detail_right:"trend-detail_org_detail_right__PcIwP",org_detail_name:"trend-detail_org_detail_name__iZmAq",time_late:"trend-detail_time_late__lC1tj",right_top_org_btn:"trend-detail_right_top_org_btn__mjg6i",title:"trend-detail_title__2lUzd",content:"trend-detail_content__tKhqX",right_top_services:"trend-detail_right_top_services__ruvvm",service_link_text:"trend-detail_service_link_text__AU6Dx",interactive:"trend-detail_interactive__pKqNC",interactive_item:"trend-detail_interactive_item__z49BQ",interactive_icon_btn:"trend-detail_interactive_icon_btn__8ItPJ",interactive_item_text:"trend-detail_interactive_item_text__jwUkK",comment_container:"trend-detail_comment_container__fcxFH",comment_list:"trend-detail_comment_list__rx5JH",comment_item_cnt:"trend-detail_comment_item_cnt__-K1Rg",comment_item_par:"trend-detail_comment_item_par__C4g1p",comment_user_avatar:"trend-detail_comment_user_avatar__xmqjw",comment_item_par_right:"trend-detail_comment_item_par_right__RXhjR",comment_item_box:"trend-detail_comment_item_box__cXnYc",comment_text:"trend-detail_comment_text__lrFWT",comment_user_name:"trend-detail_comment_user_name__QaZjT",comment_bot:"trend-detail_comment_bot__sSat5",comment_bot_create:"trend-detail_comment_bot_create__zNGBX",comment_bot_reply:"trend-detail_comment_bot_reply__ueWEn",comment_item_child:"trend-detail_comment_item_child__grHQ+",comment_item_child_item:"trend-detail_comment_item_child_item__ZN2fE",comment_input:"trend-detail_comment_input__YOZCG",detail_comment_list:"trend-detail_detail_comment_list__Iz0Jf",load_item:"trend-detail_load_item__UZLN5",load_item_left:"trend-detail_load_item_left__5Lf8c",load_item_right:"trend-detail_load_item_right__aUnBa"},m=i(2579),o=i(96755),v=i(80184);var h=function(e){var t,i,m,h,j,u;let{id:N,onClose:p}=e;const b=(0,c.UO)(),k=null!==N&&void 0!==N?N:null===b||void 0===b?void 0:b.id,f=(0,c.k6)(),z=null===(t=(0,l.ib)(k,`${_.Z.API_NODE}/trends/${k}`,{include:"services|tiktok"}).response)||void 0===t?void 0:t.context,{resData:Z,totalItem:w,isValidating:B}=(0,l.It)(k,`${_.Z.API_NODE}/tiktok/getCommentsByUrl`,{"filter[trend]":k}),y=null!==Z&&void 0!==Z?Z:[];return z?(0,v.jsxs)("div",{className:r.container,children:[(0,v.jsx)(n.Rb,{onClick:()=>{p?p():f.goBack()},className:r.back_btn,icon:a.Z.backWhite,iconSize:24}),(0,v.jsx)("div",{className:r.left,children:(0,v.jsxs)("div",{className:r.video_container,children:[(0,v.jsx)("video",{className:r.video_blur,src:`${z.media_url}#t=0.001`}),(0,v.jsx)("div",{className:r.video_wrapper,children:(0,v.jsx)("video",{className:r.video,loop:!0,controls:!0,"webkit-playsinline":"webkit-playsinline",playsInline:!0,children:(0,v.jsx)("source",{type:"video/mp4",src:`${z.media_url}#t=0.001`})})})]})}),(0,v.jsxs)("div",{className:r.right,children:[(0,v.jsxs)("div",{className:r.right_top,children:[(0,v.jsxs)("div",{className:r.right_top_org,children:[(0,v.jsxs)("div",{onClick:()=>f.push((0,d.Hs)(null===z||void 0===z?void 0:z.organization_id)),className:r.org_detail,children:[(0,v.jsx)("div",{className:r.org_detail_img,children:(0,v.jsx)("img",{src:z.organization_image,alt:""})}),(0,v.jsxs)("div",{className:r.org_detail_right,children:[(0,v.jsx)("p",{className:r.org_detail_name,children:z.organization_name}),(0,v.jsx)("p",{className:r.time_late,children:(0,o.wh)(z.createdAt)})]})]}),(0,v.jsx)(n.Rb,{className:r.right_top_org_btn,title:"\u0110ang theo d\xf5i"})]}),(0,v.jsxs)("div",{className:r.right_top_content,children:[(0,v.jsx)("p",{className:r.title,children:z.title}),(0,v.jsx)("p",{className:r.content,children:z.content})]}),(0,v.jsx)("div",{className:r.right_top_services,children:null===(i=z.services)||void 0===i?void 0:i.map((e=>(0,v.jsx)(s.rU,{to:{pathname:(0,d.ro)(e.id,z.organization_id,e.service_name)},children:(0,v.jsxs)("span",{className:r.service_link_text,children:["#",e.service_name]})},e.id)))}),(0,v.jsxs)("div",{className:r.interactive,children:[(0,v.jsxs)("div",{className:r.interactive_item,children:[(0,v.jsx)(n.Rb,{iconSize:16,className:r.interactive_icon_btn,icon:a.Z.eyeBoldBlack}),(0,v.jsx)("span",{className:r.interactive_item_text,children:null===z||void 0===z||null===(m=z.tiktok)||void 0===m?void 0:m.play_count})]}),(0,v.jsxs)("div",{className:r.interactive_item,children:[(0,v.jsx)(n.Rb,{iconSize:16,className:r.interactive_icon_btn,icon:a.Z.heartBoldBlack}),(0,v.jsx)("span",{className:r.interactive_item_text,children:null===z||void 0===z||null===(h=z.tiktok)||void 0===h?void 0:h.digg_count})]}),(0,v.jsxs)("div",{className:r.interactive_item,children:[(0,v.jsx)(n.Rb,{iconSize:16,className:r.interactive_icon_btn,icon:a.Z.commentBoldBlack}),(0,v.jsx)("span",{className:r.interactive_item_text,children:null===z||void 0===z||null===(j=z.tiktok)||void 0===j?void 0:j.comment_count})]}),(0,v.jsxs)("div",{className:r.interactive_item,children:[(0,v.jsx)(n.Rb,{iconSize:16,className:r.interactive_icon_btn,icon:a.Z.shareBoldBlack}),(0,v.jsx)("span",{className:r.interactive_item_text,children:null===z||void 0===z||null===(u=z.tiktok)||void 0===u?void 0:u.share_count})]})]})]}),1===w&&B&&(0,v.jsx)(g,{}),Z&&(0,v.jsx)(x,{comments:y})]})]}):(0,v.jsx)(v.Fragment,{})};const x=e=>{const{comments:t}=e;return(0,v.jsx)(v.Fragment,{children:(0,v.jsx)("div",{className:r.comment_container,children:(0,v.jsx)("ul",{className:r.comment_list,children:null===t||void 0===t?void 0:t.map(((e,t)=>(0,v.jsx)("li",{className:r.comment_list_item,children:(0,v.jsx)(j,{comment:e})},t)))})})})},j=e=>{var t,i,_,n;let{comment:l}=e;return(0,v.jsx)("div",{className:r.comment_item_cnt,children:(0,v.jsxs)("div",{className:r.comment_item_par,children:[(0,v.jsx)("div",{className:r.comment_user_avatar,children:(0,v.jsx)("img",{src:null!==(t=null===(i=l.user)||void 0===i?void 0:i.avatar)&&void 0!==t?t:a.Z.userCircle,alt:""})}),(0,v.jsxs)("div",{className:r.comment_item_par_right,children:[(0,v.jsx)("div",{className:r.comment_item_box,children:(0,v.jsxs)("p",{className:r.comment_text,children:[(0,v.jsx)("span",{className:r.comment_user_name,children:null===(_=l.user)||void 0===_?void 0:_.fullname}),l.body]})}),(0,v.jsx)("ul",{className:r.comment_item_child,children:null===(n=l.children)||void 0===n?void 0:n.map(((e,t)=>{var i,_,n;return(0,v.jsxs)("li",{className:r.comment_item_child_item,children:[(0,v.jsx)("div",{className:r.comment_user_avatar,children:(0,v.jsx)("img",{src:null!==(i=null===(_=e.user)||void 0===_?void 0:_.avatar)&&void 0!==i?i:a.Z.userCircle,alt:""})}),(0,v.jsx)("div",{className:r.comment_item_par_right,children:(0,v.jsx)("div",{style:{backgroundColor:"#EAE9F5"},className:r.comment_item_box,children:(0,v.jsxs)("p",{className:r.comment_text,children:[(0,v.jsx)("span",{className:r.comment_user_name,children:null===(n=e.user)||void 0===n?void 0:n.fullname}),e.body]})})})]},t)}))})]})]})})},g=()=>(0,v.jsx)("ul",{className:r.detail_comment_list,children:[1,2,3,4].map((e=>(0,v.jsxs)("li",{className:r.load_item,children:[(0,v.jsx)("div",{className:r.load_item_left,children:(0,v.jsx)(m.Z,{width:"100%",height:"100%",style:{borderRadius:"100%"}})}),(0,v.jsx)("div",{className:r.load_item_right,children:(0,v.jsx)(m.Z,{width:"100%",height:"100%"})})]},e)))})}}]);
//# sourceMappingURL=930.befd70b4.chunk.js.map