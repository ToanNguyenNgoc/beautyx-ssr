"use strict";(self.webpackChunkweb_booking=self.webpackChunkweb_booking||[]).push([[769,930],{18769:function(e,t,i){i.r(t),i.d(t,{default:function(){return N}});var _=i(10117),n=i(72791),a=i(82728),l=i(56598),d={container_large:"trends_container_large__B3usY",trend_list:"trends_trend_list__b0stv",video_item_cnt:"trends_video_item_cnt__Y04IM",trend_list_video_thumb:"trends_trend_list_video_thumb__fiLD0",trend_item_head:"trends_trend_item_head__bhL+j",trend_item_center:"trends_trend_item_center__LyHmS",trend_item_body:"trends_trend_item_body__pIhpM",trend_item_video_thumb:"trends_trend_item_video_thumb__QZNby",trend_item_bot_ex:"trends_trend_item_bot_ex__3tgm-",trend_item_desc:"trends_trend_item_desc__kPdxa",trend_item_bot_org:"trends_trend_item_bot_org__Alayd",trend_item_bot_org_img:"trends_trend_item_bot_org_img__XSgoS",trend_item_bot_org_name:"trends_trend_item_bot_org_name__FHDqR",trend_item_head_org:"trends_trend_item_head_org__j14Ob",trend_item_head_name:"trends_trend_item_head_name__RXuqV",org_name:"trends_org_name__0zme9",create_at:"trends_create_at__TG4lF",trend_item_bot:"trends_trend_item_bot__GH2bq",item_ex:"trends_item_ex__Jx-cl",item_ex_icon:"trends_item_ex_icon__zyDMA",item_ex_text:"trends_item_ex_text__FYVm1"},m=i(97892),s=i.n(m),r=i(40130),o=i.n(r),c=i(20181),v=i(19598),h=i(68915),u=i(29818),x=i(73930),g=i(80184);var j=function(e){const{open:t,setOpen:i,_id:_}=e;return(0,g.jsx)(u.Z,{fullScreen:!0,open:t,children:t&&(0,g.jsx)(x.default,{id:_,onClose:()=>i(!1)})})},p=i(24112),b=i(3444);s().extend(o());var N=function(){var e,t;const i=(0,v.k6)(),n=(0,a.oG)(),{response:m}=(0,a.ib)(!0,`${_.Z.API_NODE}/trends`,{limit:"20",include:"services|tiktok"}),s=null!==(e=null===m||void 0===m||null===(t=m.context)||void 0===t?void 0:t.data)&&void 0!==e?e:[];return(0,g.jsxs)(g.Fragment,{children:[n&&(0,g.jsx)(b.Z,{onBackFunc:()=>i.push("/homepage"),title:"Xu h\u01b0\u1edbng"}),(0,g.jsx)(l.Z,{children:(0,g.jsx)("div",{className:d.container_large,children:(0,g.jsx)("ul",{className:d.trend_list,children:s.map(((e,t)=>(0,g.jsx)("li",{className:d.trend_list_video_thumb,children:(0,g.jsx)(k,{item:e})},t)))})})})]})};const k=e=>{var t,i,_;const{item:l}=e,m=(0,v.k6)(),s=(0,n.useRef)(null),r=(0,n.useRef)(null),[o,u]=(0,n.useState)(!1),x=(0,a.oG)(),b=()=>{var e;x?(null===(e=s.current)||void 0===e||e.pause(),u(!0)):m.push(`/video/${l._id}`)},N=(0,a.W7)({root:null,rootMargin:"0px",threshold:.3},r);return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("div",{onClick:x?()=>{}:()=>b(),className:d.video_item_cnt,children:[(0,g.jsx)("div",{ref:r,className:d.trend_item_center}),(0,g.jsxs)("div",{onClick:()=>{m.push((0,h.Hs)(l.organization_id))},className:d.trend_item_head,children:[(0,g.jsx)("div",{className:d.trend_item_head_org,children:(0,g.jsx)("img",{src:l.organization_image,alt:""})}),(0,g.jsx)("div",{className:d.trend_item_head_name,children:(0,g.jsx)("p",{className:d.org_name,children:l.organization_name})})]}),(0,g.jsx)("div",{className:d.trend_item_body,children:(0,g.jsx)(p.Z,{className:d.trend_item_video_thumb,url:`${l.media_url}#t=0.001`,width:"100%",height:"100%",playing:N&&x,muted:!0,playsinline:!0,controls:!0})}),(0,g.jsxs)("div",{className:d.trend_item_bot,children:[(0,g.jsxs)("div",{onClick:b,className:d.trend_item_bot_ex,children:[(0,g.jsxs)("div",{className:d.item_ex,children:[(0,g.jsx)("img",{className:d.item_ex_icon,src:c.Z.heartBoldBlack,alt:""}),(0,g.jsx)("span",{className:d.item_ex_text,children:null===(t=l.tiktok)||void 0===t?void 0:t.digg_count})]}),(0,g.jsxs)("div",{className:d.item_ex,children:[(0,g.jsx)("img",{className:d.item_ex_icon,src:c.Z.commentBoldBlack,alt:""}),(0,g.jsx)("span",{className:d.item_ex_text,children:null===(i=l.tiktok)||void 0===i?void 0:i.comment_count})]}),(0,g.jsxs)("div",{className:d.item_ex,children:[(0,g.jsx)("img",{className:d.item_ex_icon,src:c.Z.shareBoldBlack,alt:""}),(0,g.jsx)("span",{className:d.item_ex_text,children:null===(_=l.tiktok)||void 0===_?void 0:_.share_count})]})]}),(0,g.jsx)("p",{className:d.trend_item_desc,children:l.content}),(0,g.jsxs)("div",{className:d.trend_item_bot_org,children:[(0,g.jsx)("div",{className:d.trend_item_bot_org_img,children:(0,g.jsx)("img",{src:l.organization_image,alt:""})}),(0,g.jsx)("span",{className:d.trend_item_bot_org_name,children:l.organization_name})]})]})]}),(0,g.jsx)(j,{open:o,setOpen:u,_id:l._id})]})}},73930:function(e,t,i){i.r(t),i.d(t,{default:function(){return j}});var _=i(10117),n=i(28162),a=i(20181),l=i(82728),d=i(19598),m=i(91523),s=i(68915),r={back_btn:"trend-detail_back_btn__cAjmb",container:"trend-detail_container__LW5aw",left:"trend-detail_left__zkPEH",video_container:"trend-detail_video_container__NJTaI",video_blur:"trend-detail_video_blur__BJ7VA",video_wrapper:"trend-detail_video_wrapper__16p74",video:"trend-detail_video__UtiV1",right:"trend-detail_right__zzi54",right_top:"trend-detail_right_top__s6Pbt",right_top_org:"trend-detail_right_top_org__W77YF",org_detail:"trend-detail_org_detail__NhzaH",org_detail_img:"trend-detail_org_detail_img__tYN5Z",org_detail_right:"trend-detail_org_detail_right__PcIwP",org_detail_name:"trend-detail_org_detail_name__iZmAq",time_late:"trend-detail_time_late__lC1tj",right_top_org_btn:"trend-detail_right_top_org_btn__mjg6i",org_btn_act:"trend-detail_org_btn_act__i2LnH",title:"trend-detail_title__2lUzd",content:"trend-detail_content__tKhqX",right_top_services:"trend-detail_right_top_services__ruvvm",service_link_text:"trend-detail_service_link_text__AU6Dx",interactive:"trend-detail_interactive__pKqNC",interactive_item:"trend-detail_interactive_item__z49BQ",interactive_icon_btn:"trend-detail_interactive_icon_btn__8ItPJ",interactive_item_text:"trend-detail_interactive_item_text__jwUkK",comment_container:"trend-detail_comment_container__fcxFH",comment_list:"trend-detail_comment_list__rx5JH",comment_item_cnt:"trend-detail_comment_item_cnt__-K1Rg",comment_item_par:"trend-detail_comment_item_par__C4g1p",comment_user_avatar:"trend-detail_comment_user_avatar__xmqjw",comment_item_par_right:"trend-detail_comment_item_par_right__RXhjR",comment_item_box:"trend-detail_comment_item_box__cXnYc",comment_text:"trend-detail_comment_text__lrFWT",comment_user_name:"trend-detail_comment_user_name__QaZjT",comment_bot:"trend-detail_comment_bot__sSat5",comment_bot_create:"trend-detail_comment_bot_create__zNGBX",comment_bot_reply:"trend-detail_comment_bot_reply__ueWEn",comment_item_child:"trend-detail_comment_item_child__grHQ+",comment_item_child_item:"trend-detail_comment_item_child_item__ZN2fE",comment_input:"trend-detail_comment_input__YOZCG",comment_input_cnt:"trend-detail_comment_input_cnt__Aq9mC",comment_input_wrap:"trend-detail_comment_input_wrap__pn1bC",comment_input_par:"trend-detail_comment_input_par__lCxpM",comment_img_thumb:"trend-detail_comment_img_thumb__yCjAm",img_thumb_list:"trend-detail_img_thumb_list__f5BgQ",img_thumb_list_item:"trend-detail_img_thumb_list_item__mCfTJ",img_thumb_item:"trend-detail_img_thumb_item__p5tKG",comment_input_child:"trend-detail_comment_input_child__HE4ot",comment_input_ctrl:"trend-detail_comment_input_ctrl__LYZ1H",comment_btn:"trend-detail_comment_btn__CLVZS",detail_comment_list:"trend-detail_detail_comment_list__Iz0Jf",load_item:"trend-detail_load_item__UZLN5",load_item_left:"trend-detail_load_item_left__5Lf8c",load_item_right:"trend-detail_load_item_right__aUnBa",comment_item_images:"trend-detail_comment_item_images__6Umg+",comment_item_image:"trend-detail_comment_item_image__eM+DV",comment_item_image_cnt:"trend-detail_comment_item_image_cnt__yjLz6"},o=i(2579),c=i(48398),v=i(32470),h=i(12978),u=i(72791),x=i(76012),g=i(80184);var j=function(e){var t,i,o,h,u,j,b;let{id:k,onClose:f}=e;const y=(0,d.UO)(),C=null!==k&&void 0!==k?k:null===y||void 0===y?void 0:y.id,Z=(0,d.k6)(),z=null===(t=(0,l.ib)(C,`${_.Z.API_NODE}/trends/${C}`,{include:"services|tiktok"}).response)||void 0===t?void 0:t.context,B=(0,l.YE)({API_URL:v.Z.ORG(null===z||void 0===z?void 0:z.organization_id),enable:null===z||void 0===z?void 0:z.organization_id}).response,{onToggleFavorite:R,favoriteSt:w}=(0,l.s4)({org_id:null===B||void 0===B?void 0:B.id,type:"ORG",count:null===B||void 0===B?void 0:B.favorites_count,favorite:null===B||void 0===B?void 0:B.is_favorite}),{resData:I,totalItem:A,isValidating:S}=(0,l.It)(C,`${_.Z.API_NODE}/tiktok/getCommentsByUrl`,{"filter[trend]":C}),E=null!==I&&void 0!==I?I:[],O={...x.BX,"filter[commentable_type]":"ORGANIZATION","filter[commentable_id]":null===B||void 0===B?void 0:B.id,limit:10},{comments:P,loadPost:F,postComment:H,totalComment:U}=(0,l.xe)(O);return z?(0,g.jsxs)("div",{className:r.container,children:[(0,g.jsx)(n.Rb,{onClick:()=>{f?f():Z.goBack()},className:r.back_btn,icon:a.Z.backWhite,iconSize:24}),(0,g.jsx)("div",{className:r.left,children:(0,g.jsxs)("div",{className:r.video_container,children:[(0,g.jsx)("video",{className:r.video_blur,src:`${z.media_url}#t=0.001`}),(0,g.jsx)("div",{className:r.video_wrapper,children:(0,g.jsx)("video",{className:r.video,loop:!0,controls:!0,"webkit-playsinline":"webkit-playsinline",playsInline:!0,children:(0,g.jsx)("source",{type:"video/mp4",src:`${z.media_url}#t=0.001`})})})]})}),(0,g.jsxs)("div",{className:r.right,children:[(0,g.jsxs)("div",{className:r.right_top,children:[(0,g.jsxs)("div",{className:r.right_top_org,children:[(0,g.jsxs)("div",{onClick:()=>{var e;return Z.push((0,s.Hs)(null!==(e=null===B||void 0===B?void 0:B.subdomain)&&void 0!==e?e:null===z||void 0===z?void 0:z.organization_id))},className:r.org_detail,children:[(0,g.jsx)("div",{className:r.org_detail_img,children:(0,g.jsx)("img",{src:z.organization_image,alt:""})}),(0,g.jsxs)("div",{className:r.org_detail_right,children:[(0,g.jsx)("p",{className:r.org_detail_name,children:z.organization_name}),(0,g.jsx)("p",{className:r.time_late,children:(0,c.wh)(z.createdAt)})]})]}),(0,g.jsx)(n.Rb,{onClick:R,className:w.is_favorite?r.right_top_org_btn:r.org_btn_act,title:w.is_favorite?"\u0110ang theo d\xf5i":"Theo d\xf5i"})]}),(0,g.jsxs)("div",{className:r.right_top_content,children:[(0,g.jsx)("p",{className:r.title,children:z.title}),(0,g.jsx)("p",{className:r.content,children:z.content})]}),(0,g.jsx)("div",{className:r.right_top_services,children:null===(i=z.services)||void 0===i?void 0:i.map((e=>(0,g.jsx)(m.rU,{to:{pathname:(0,s.ro)(e.id,z.organization_id,e.service_name)},children:(0,g.jsxs)("span",{className:r.service_link_text,children:["#",e.service_name]})},e.id)))}),(0,g.jsxs)("div",{className:r.interactive,children:[(0,g.jsxs)("div",{className:r.interactive_item,children:[(0,g.jsx)(n.Rb,{iconSize:16,className:r.interactive_icon_btn,icon:a.Z.eyeBoldBlack}),(0,g.jsx)("span",{className:r.interactive_item_text,children:null===z||void 0===z||null===(o=z.tiktok)||void 0===o?void 0:o.play_count})]}),(0,g.jsxs)("div",{className:r.interactive_item,children:[(0,g.jsx)(n.Rb,{iconSize:16,className:r.interactive_icon_btn,onClick:R,icon:w.is_favorite?a.Z.heartBoldRed:a.Z.heartBoldBlack}),(0,g.jsx)("span",{className:r.interactive_item_text,children:(null===z||void 0===z||null===(h=z.tiktok)||void 0===h?void 0:h.digg_count)+(null!==(u=w.favorite_count)&&void 0!==u?u:0)})]}),(0,g.jsxs)("div",{className:r.interactive_item,children:[(0,g.jsx)(n.Rb,{iconSize:16,className:r.interactive_icon_btn,icon:a.Z.commentBoldBlack}),(0,g.jsx)("span",{className:r.interactive_item_text,children:(null===z||void 0===z||null===(j=z.tiktok)||void 0===j?void 0:j.comment_count)+U})]}),(0,g.jsxs)("div",{className:r.interactive_item,children:[(0,g.jsx)(n.Rb,{iconSize:16,className:r.interactive_icon_btn,icon:a.Z.shareBoldBlack}),(0,g.jsx)("span",{className:r.interactive_item_text,children:null===z||void 0===z||null===(b=z.tiktok)||void 0===b?void 0:b.share_count})]})]})]}),1===A&&S&&(0,g.jsx)(N,{}),I&&(0,g.jsx)(p,{org_id:z.organization_id,comments:[...P,...E],postComment:H,loadPost:F})]})]}):(0,g.jsx)(g.Fragment,{})};const p=e=>{var t,i;const{loadPost:_,postComment:d}=e,m=e.org_id,s=(0,u.useRef)(null),o={commentable_type:"ORGANIZATION",commentable_id:m,organization_id:m,models:[],body:""},{USER:v}=(0,h.v9)((e=>e.USER)),[x,j]=(0,u.useState)(o),p=async()=>{var e;(""!==x.body||x.models.length>0)&&(await d({...x,media_ids:x.models.map((e=>e.model_id))}),j(o),s&&(null===(e=s.current)||void 0===e||e.scrollIntoView({behavior:"smooth"})))};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("div",{className:r.comment_container,children:(0,g.jsx)("ul",{ref:s,className:r.comment_list,children:null===(t=e.comments)||void 0===t?void 0:t.map(((e,t)=>(0,g.jsx)("li",{className:r.comment_list_item,children:(0,g.jsx)(b,{comment:e})},t)))})}),(0,g.jsxs)("div",{className:r.comment_input,children:[(0,g.jsx)("div",{className:r.comment_user_avatar,children:(0,g.jsx)("img",{src:null!==(i=null===v||void 0===v?void 0:v.avatar)&&void 0!==i?i:a.Z.userCircle,alt:"",onError:e=>(0,c.bW)(e)})}),(0,g.jsxs)("div",{className:r.comment_input_cnt,children:[(0,g.jsx)("div",{className:r.comment_img_thumb,children:(0,g.jsx)("ul",{className:r.img_thumb_list,children:x.models.map((e=>(0,g.jsxs)("li",{className:r.img_thumb_list_item,children:[(0,g.jsx)(n.Rb,{icon:a.Z.closeCircle,onClick:()=>{return t=e.model_id,void j({...x,models:x.models.filter((e=>e.model_id!==t))});var t}}),(0,g.jsx)("img",{className:r.img_thumb_item,src:e.original_url,alt:""})]},e.model_id)))})}),(0,g.jsxs)("div",{className:r.comment_input_wrap,children:[(0,g.jsx)(n.II,{value:x.body,onChange:e=>{j({...x,body:e.target.value})},classNamePar:r.comment_input_par,className:r.comment_input_child,placeholder:"Vi\u1ebft b\xecnh lu\u1eadn...",onKeyDown:p}),(0,g.jsxs)("div",{className:r.comment_input_ctrl,children:[(0,g.jsx)(n.IV,{onChange:async e=>{const{mediaList:t}=await(0,l.rN)(e);j({...x,models:t})},className:r.comment_btn,multiple:!0}),(0,g.jsx)(n.Rb,{icon:a.Z.sendBlack,className:r.comment_btn,onClick:p,loading:_})]})]})]})]})]})},b=e=>{var t,i,_,n,l;let{comment:d}=e,m=d.body;try{m=JSON.parse(d.body).text}catch(s){m=d.body}return(0,g.jsx)("div",{className:r.comment_item_cnt,children:(0,g.jsxs)("div",{className:r.comment_item_par,children:[(0,g.jsx)("div",{className:r.comment_user_avatar,children:(0,g.jsx)("img",{src:null!==(t=null===(i=d.user)||void 0===i?void 0:i.avatar)&&void 0!==t?t:a.Z.userCircle,onError:e=>(0,c.bW)(e),alt:""})}),(0,g.jsxs)("div",{className:r.comment_item_par_right,children:[(0,g.jsx)("div",{className:r.comment_item_box,children:(0,g.jsxs)("p",{className:r.comment_text,children:[(0,g.jsx)("span",{className:r.comment_user_name,children:null===(_=d.user)||void 0===_?void 0:_.fullname}),m]})}),(0,g.jsx)("ul",{className:r.comment_item_images,children:null===(n=d.media_url)||void 0===n?void 0:n.map(((e,t)=>(0,g.jsx)("li",{className:r.comment_item_image,children:(0,g.jsx)("div",{className:r.comment_item_image_cnt,children:(0,g.jsx)("img",{src:e,alt:""})})},t)))}),(0,g.jsx)("ul",{className:r.comment_item_child,children:null===(l=d.children)||void 0===l?void 0:l.map(((e,t)=>{var i,_,n;return(0,g.jsxs)("li",{className:r.comment_item_child_item,children:[(0,g.jsx)("div",{className:r.comment_user_avatar,children:(0,g.jsx)("img",{src:null!==(i=null===(_=e.user)||void 0===_?void 0:_.avatar)&&void 0!==i?i:a.Z.userCircle,alt:"",onError:e=>(0,c.bW)(e)})}),(0,g.jsx)("div",{className:r.comment_item_par_right,children:(0,g.jsx)("div",{style:{backgroundColor:"#EAE9F5"},className:r.comment_item_box,children:(0,g.jsxs)("p",{className:r.comment_text,children:[(0,g.jsx)("span",{className:r.comment_user_name,children:null===(n=e.user)||void 0===n?void 0:n.fullname}),e.body]})})})]},t)}))})]})]})})},N=()=>(0,g.jsx)("ul",{className:r.detail_comment_list,children:[1,2,3,4].map((e=>(0,g.jsxs)("li",{className:r.load_item,children:[(0,g.jsx)("div",{className:r.load_item_left,children:(0,g.jsx)(o.Z,{width:"100%",height:"100%",style:{borderRadius:"100%"}})}),(0,g.jsx)("div",{className:r.load_item_right,children:(0,g.jsx)(o.Z,{width:"100%",height:"100%"})})]},e)))})}}]);
//# sourceMappingURL=769.4e6b7c1f.chunk.js.map