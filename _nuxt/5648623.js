(window.webpackJsonp=window.webpackJsonp||[]).push([[9,6],{183:function(t,e,r){var content=r(186);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(66).default)("19b22b26",content,!0,{sourceMap:!1})},184:function(t,e,r){"use strict";var n=r(182);e.a={data:function(){return{width:void 0,height:void 0}},methods:{modalHandler:function(){this.$store.commit("SET_MODALTRIGGER",!this.$store.state.modalTrigger)},resizeHandler:function(){this.width=window.innerWidth,this.height=window.innerHeight},windowDimensions:function(){return window.addEventListener("resize",this.resizeHandler),this.resizeHandler(),{width:this.width,height:this.height}},fadingOutAndPushToRouterHandler:function(t){var e=this,r=t.element,element=void 0===r?[]:r,o=t.route,l=void 0===o?"/":o;n.a.timeline().to(element,1,{opacity:0}).to(element,{visibility:"hidden"}),setTimeout((function(){return e.$router.push("".concat(l,"/"))}),1e3)}}}},185:function(t,e,r){"use strict";r(183)},186:function(t,e,r){var n=r(65)(!1);n.push([t.i,".link[data-v-72276d85]{color:var(--text-color);text-decoration:none}.link[data-v-72276d85]:hover{color:var(--button);transition:color .4s ease-in-out}",""]),t.exports=n},187:function(t,e,r){"use strict";var n={name:"AnchorTag",props:["link","text"]},o=(r(185),r(33)),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("a",{staticClass:"link",attrs:{href:t.link,noreferrer:"",noopener:"",target:"_blank"}},[t.text?[t._v(t._s(t.text))]:[t._t("default")]],2)}),[],!1,null,"72276d85",null);e.a=component.exports},188:function(t,e,r){var content=r(191);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(66).default)("2cd6d53e",content,!0,{sourceMap:!1})},190:function(t,e,r){"use strict";r(188)},191:function(t,e,r){var n=r(65)(!1);n.push([t.i,".home-page[data-v-bd3a59fe]{display:flex;align-items:center;justify-content:center;flex-direction:column;position:absolute;height:100%;width:100%;overflow:hidden;padding:6rem 0;transition:color .35s cubic-bezier(.645,.045,.355,1)}.home-page .content[data-v-bd3a59fe]{position:relative;top:auto;left:auto;margin-bottom:1rem;transform:translateY(-12rem)}.home-page .content .header[data-v-bd3a59fe]{font:400 3.6rem/4.4rem var(--font);color:var(--heading-color);position:relative;max-width:23rem;vertical-align:middle;margin:0 auto}@media (max-width:1100px){.home-page .content .header[data-v-bd3a59fe]{max-width:15rem;font-size:2.4rem;line-height:3rem}}.home-page .content .header .header-part-two[data-v-bd3a59fe]{display:block}.home-page .content .description[data-v-bd3a59fe]{font:400 1.5rem/2.3rem var(--font);text-align:center;max-width:35rem;color:var(--text-color)}@media (max-width:1023px){.home-page .content .description[data-v-bd3a59fe]{font-size:1.2rem;line-height:1.8rem;padding:0 4rem}}.home-page .viewport[data-v-bd3a59fe]{display:flex;align-items:center;justify-content:center;flex-direction:column;grid-gap:2em;gap:2em}.home-page .viewport [class*=-pillar][data-v-bd3a59fe]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;height:3.8rem;cursor:pointer}.home-page .viewport [class*=-pillar][data-disabled=true][data-v-bd3a59fe]{cursor:default;pointer-events:none}.home-page .viewport [class*=-pillar][data-disabled=true] .pillar-title[data-v-bd3a59fe]{color:var(--disabled-button-text);filter:blur(3px)}.home-page .viewport [class*=-pillar]:hover .bottom-border[data-v-bd3a59fe]{width:50%}.home-page .viewport [class*=-pillar] .pillar-title[data-v-bd3a59fe]{display:block;font:400 2.8rem/3rem var(--font);text-align:center;color:var(--text-color)}@media (max-width:1100px){.home-page .viewport [class*=-pillar] .pillar-title[data-v-bd3a59fe]{font-size:2.2rem;line-height:2rem}}.home-page .viewport [class*=-pillar] .bottom-border[data-v-bd3a59fe]{display:block;background-color:var(--button-hover);width:0;height:.3rem;margin:0 auto;transition:width .5s cubic-bezier(.645,.045,.355,1)}.home-page .viewport .yet-to-be-developed[data-v-bd3a59fe]{display:flex;align-items:center;justify-content:center;flex-direction:column;grid-gap:1rem;gap:1rem;position:relative}.home-page .viewport .yet-to-be-developed .under-construction[data-v-bd3a59fe]{display:flex;align-items:center;justify-content:center;position:absolute;font:600 2rem/2.3rem var(--font);text-align:center;color:var(--text-color);width:100%;height:100%}html[dir=ltr] .home-page .content .header .header-part-two[data-v-bd3a59fe]{margin-right:-1.5rem;text-align:right}html[dir=rtl] .home-page .content .header .header-part-two[data-v-bd3a59fe]{margin-left:-2rem;text-align:left}",""]),t.exports=n},202:function(t,e,r){"use strict";r.r(e);var n=r(182),o=r(184),l=r(187),d={name:"Stuff",mixins:[o.a],components:{AnchorTag:l.a},head:function(){return{title:this.$t("titles.stuff"),description:this.$t("descriptions.stuff")}},data:function(){return{activePillars:[{id:"about"}],pillars:[{id:"npm"},{id:"interactive"},{id:"contribution"}]}},mounted:function(){this.$refs.header&&this.$refs.description&&this.$refs.viewport&&this.animatedStuff()},methods:{animatedStuff:function(){n.a.set(this.$refs.description,{y:150}),n.a.set([this.$refs.header,this.$refs.description,this.$refs.viewport],{opacity:0,visibility:"hidden"}),"en"===this.$i18n.locale?n.a.set(this.$refs.header,{x:150}):n.a.set(this.$refs.header,{x:-150}),n.a.timeline().to(this.$refs.header,1,{opacity:1,visibility:"inherit",x:0},"header").to(this.$refs.description,1,{opacity:1,visibility:"inherit",y:0}).to(this.$refs.viewport,.5,{opacity:1,visibility:"visible"})},pillarOnClickHandler:function(t){this.fadingOutAndPushToRouterHandler({element:this.$refs.siteMain,route:t})}}},c=(r(190),r(33)),component=Object(c.a)(d,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("main",{ref:"siteMain",staticClass:"site-main"},[r("div",{staticClass:"home-page"},[r("div",{ref:"content",staticClass:"content"},[r("h1",{ref:"header",staticClass:"header"},[t._v("\n        "+t._s(t.$t("main.header.partOne"))+"\n        "),r("span",{staticClass:"header-part-two"},[t._v(t._s(t.$t("main.header.partTwo")))])]),t._v(" "),r("p",{ref:"description",staticClass:"description"},[t._v(t._s(t.$t("main.content")))])]),t._v(" "),r("div",{ref:"viewport",staticClass:"viewport"},[t._l(t.activePillars,(function(e){return r("div",{key:e.id,class:e.id+"-pillar",on:{click:function(r){return t.pillarOnClickHandler(e.id)}}},[r("span",{staticClass:"pillar-title"},[t._v("\n          "+t._s(t.$t("main.pillars.headings."+e.id))+"\n        ")]),t._v(" "),r("span",{staticClass:"bottom-border"})])})),t._v(" "),r("div",{staticClass:"blog-pillar"},[r("AnchorTag",{attrs:{link:this.$constants.blog}},[r("span",{staticClass:"pillar-title"},[t._v("\n            "+t._s(t.$t("main.pillars.headings.blog"))+"\n          ")])]),t._v(" "),r("span",{staticClass:"bottom-border"})],1),t._v(" "),r("div",{staticClass:"yet-to-be-developed"},[r("div",{staticClass:"under-construction"},[t._v("\n          "+t._s(t.$t("main.pillars.comingSoon"))+"\n        ")]),t._v(" "),t._l(t.pillars,(function(e){return r("div",{key:e.id,class:e.id+"-pillar",attrs:{"data-disabled":"true"},on:{click:function(r){return t.pillarOnClickHandler(e.id)}}},[r("span",{staticClass:"pillar-title"},[t._v("\n            "+t._s(t.$t("main.pillars.headings."+e.id))+"\n          ")]),t._v(" "),r("span",{staticClass:"bottom-border"})])}))],2)],2)])])}),[],!1,null,"bd3a59fe",null);e.default=component.exports},247:function(t,e,r){"use strict";r.r(e);var n=r(202).default,o=r(33),component=Object(o.a)(n,undefined,undefined,!1,null,null,null);e.default=component.exports}}]);