"use strict";(self.webpackChunkweb_booking=self.webpackChunkweb_booking||[]).push([[398],{29398:function(e,t,n){n.r(t),n.d(t,{default:function(){return f}});var o=n(72791),i=n(3444),a=n(74820),s=n(81724),r={body:"otp_body__UBHW1",form_btn:"otp_form_btn__83+hr",btn_send_telephone:"otp_btn_send_telephone__U+EHG",container_title:"otp_container_title__-vf4-"},l=n(79265),c=n(31970),h=n(7968),d=n(30627),p=n(33430),u=n(12978),m=n(15465),_=n(56608),g=n(19598),b=n(80184);window.confirmationResult=window.confirmationResult||{};var f=function(){const[e,t]=(0,o.useState)(1),[n,i]=(0,o.useState)({telephone:"",code:"",verification_id:""});return(0,b.jsx)(b.Fragment,{children:(0,b.jsxs)("div",{className:r.body,children:[1===e&&(0,b.jsx)(x,{data:n,setData:i,step:e,setStep:t}),2===e&&(0,b.jsx)(j,{data:n,setData:i,step:e,setStep:t})]})})};const x=e=>{const{data:t,setData:n,setStep:u}=e,{t:m}=(0,o.useContext)(h.I),{noti:_,firstLoad:g,resultLoad:f,onCloseNoti:x}=(0,d.D3)(),j=(0,l.TA)({initialValues:{telephone:t.telephone},validationSchema:s.Ry({telephone:s.Z_().required(m("form.please_enter_your_phone"))}),onSubmit:e=>{(async()=>{try{window.recaptchaVerifier?window.recaptchaVerifier.render():window.recaptchaVerifier=new a.lI("recaptcha-container",{size:"invisible",callback:e=>{},"expired-callback":()=>{}},a.m3)}catch(e){console.log(e)}})(),(async e=>{g();let o="+84"+e.telephone.toString().slice(1);try{const i=await(0,a.$g)(a.m3,o,window.recaptchaVerifier);n({...t,telephone:e.telephone,verification_id:i.verificationId}),f(""),u(2)}catch(i){console.log(i);let e=i.code,t=i.message;f("auth/quota-exceeded"===e||"auth/too-many-requests"===e?"S\u1ed1 \u0111i\u1ec7n tho\u1ea1i \u0111\xe3 \u0111\u1ea1t gi\u1edbi h\u1ea1n cho ph\xe9p g\u1eedi m\xe3 x\xe1c th\u1ef1c (OTP) trong ng\xe0y":"reCAPTCHA has already been rendered in this element"===t?"Qu\xe1 s\u1ed1 l\u1ea7n nh\u1eadn Otp t\u1ea3i l\u1ea1i trang \u0111\u1ec3 ti\u1ebfp t\u1ee5c ...":"Qu\xe1 s\u1ed1 l\u1ea7n nh\u1eadn Otp t\u1ea3i l\u1ea1i trang \u0111\u1ec3 ti\u1ebfp t\u1ee5c ..")}})(e)}});return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(i.Z,{title:"C\u1eadp nh\u1eadt th\xf4ng tin"}),(0,b.jsxs)("div",{className:r.container,children:[(0,b.jsx)("div",{id:"recaptcha-container"}),(0,b.jsxs)("form",{className:r.form_cnt,autoComplete:"off",onSubmit:j.handleSubmit,children:[(0,b.jsx)(c.II,{onChange:j.handleChange,name:"telephone",value:j.values.telephone,placeholder:m("pm.phone_number")}),j.errors.telephone&&j.touched.telephone&&(0,b.jsx)("span",{className:"for-pass-cnt__phone-err",children:j.errors.telephone}),(0,b.jsx)("div",{className:r.form_btn,children:(0,b.jsx)(c.Rb,{className:r.btn_send_telephone,title:"G\u1eedi m\xe3 x\xe1c nh\u1eadn",type:"submit",loading:_.load})})]}),(0,b.jsx)(p.CC,{open:_.openAlert,setOpen:x,title:"Th\xf4ng b\xe1o",content:_.message,children:(0,b.jsx)(c.Rb,{title:"\u0110\xe3 hi\u1ec3u",onClick:x})})]})]})},j=e=>{const t=(0,g.k6)(),n=(0,u.I0)(),{data:o}=e,{noti:a,firstLoad:h,resultLoad:f,onCloseNoti:x}=(0,d.D3)(),{USER:j}=(0,u.v9)((e=>e.USER)),v=(0,l.TA)({initialValues:{code:""},validationSchema:s.Ry({code:s.Z_().required("Vui l\xf2ng nh\u1eadp m\xe3 OTP")}),onSubmit:e=>{(async e=>{const i={...o,code:e.code};h();try{await m.I.putUserProfile(i)&&(n((0,_._W)({...j,telephone:o.telephone})),f("Thay \u0111\u1ed5i th\xf4ng tin th\xe0nh c\xf4ng",(0,b.jsx)(c.Rb,{title:"Tr\u1edf l\u1ea1i gi\u1ecf h\xe0ng",onClick:()=>t.goBack()})))}catch(s){var a;switch(null===(a=s.response)||void 0===a?void 0:a.status){case 301:return f("S\u1ed1 \u0111i\u1ec7n tho\u1ea1i \u0111\xe3 t\u1ed3n t\u1ea1i");case 502:return f("L\u1ed7i h\u1ec7 th\u1ed1ng g\u1eedi sms qu\xfd kh\xe1ch vui l\xf2ng th\u1eed l\u1ea1i sau!");default:return f("\u0110\xe3 c\xf3 l\u1ed7i x\u1ea3y ra vui l\xf2ng th\u1eed l\u1ea1i sau!")}}})(e)}});return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(i.Z,{title:"Nh\u1eadp m\xe3 OTP",onBack:()=>window.location.reload()}),(0,b.jsxs)("div",{className:r.container,children:[(0,b.jsxs)("div",{className:r.container_title,children:["M\xe3 OTP \u0111\xe3 \u0111\u01b0\u1ee3c g\u1eedi \u0111\u1ebfn s\u1ed1 \u0111i\u1ec7n tho\u1ea1i ",(0,b.jsx)("h4",{children:o.telephone})]}),(0,b.jsxs)("form",{className:r.form_cnt,autoComplete:"off",onSubmit:v.handleSubmit,children:[(0,b.jsx)(c.II,{onChange:v.handleChange,name:"code",value:v.values.code,placeholder:"Nh\u1eadp m\xe3 OTP"}),v.errors.code&&v.touched.code&&(0,b.jsx)("span",{className:"for-pass-cnt__phone-err",children:v.errors.code}),(0,b.jsx)("div",{className:r.form_btn,children:(0,b.jsx)(c.Rb,{className:r.btn_send_telephone,title:"C\u1eadp nh\u1eadt",type:"submit"})})]}),(0,b.jsx)(p.CC,{title:"Th\xf4ng b\xe1o",content:a.message,open:a.openAlert,setOpen:x,children:a.element})]})]})}}}]);
//# sourceMappingURL=398.ddaffeca.chunk.js.map