(window.webpackJsonp=window.webpackJsonp||[]).push([[9,6],{183:function(t,e,n){var content=n(186);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(66).default)("19b22b26",content,!0,{sourceMap:!1})},184:function(t,e,n){"use strict";var r=n(182);e.a={data:function(){return{width:void 0,height:void 0}},methods:{modalHandler:function(){this.$store.commit("SET_MODALTRIGGER",!this.$store.state.modalTrigger)},resizeHandler:function(){this.width=window.innerWidth,this.height=window.innerHeight},windowDimensions:function(){return window.addEventListener("resize",this.resizeHandler),this.resizeHandler(),{width:this.width,height:this.height}},fadingOutAndPushToRouterHandler:function(t){var e=this,n=t.element,element=void 0===n?[]:n,o=t.route,l=void 0===o?"/":o;r.a.timeline().to(element,1,{opacity:0}).to(element,{visibility:"hidden"}),setTimeout((function(){return e.$router.push("".concat(l,"/"))}),1e3)}}}},185:function(t,e,n){"use strict";n(183)},186:function(t,e,n){var r=n(65)(!1);r.push([t.i,".link[data-v-72276d85]{color:var(--text-color);text-decoration:none}.link[data-v-72276d85]:hover{color:var(--button);transition:color .4s ease-in-out}",""]),t.exports=r},187:function(t,e,n){"use strict";var r={name:"AnchorTag",props:["link","text"]},o=(n(185),n(33)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("a",{staticClass:"link",attrs:{href:t.link,noreferrer:"",noopener:"",target:"_blank"}},[t.text?[t._v(t._s(t.text))]:[t._t("default")]],2)}),[],!1,null,"72276d85",null);e.a=component.exports},188:function(t,e,n){var content=n(191);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(66).default)("1133f524",content,!0,{sourceMap:!1})},190:function(t,e,n){"use strict";n(188)},191:function(t,e,n){var r=n(65)(!1);r.push([t.i,".home-page[data-v-1d985b5f]{display:flex;align-items:center;justify-content:center;flex-direction:column;position:absolute;height:100%;width:100%;overflow:hidden;padding:6rem 0;transition:color .35s cubic-bezier(.645,.045,.355,1)}.home-page .content[data-v-1d985b5f]{position:relative;top:auto;left:auto;margin-bottom:1rem;transform:translateY(-12rem)}.home-page .content .header[data-v-1d985b5f]{font:400 3.6rem/4.4rem var(--font);color:var(--heading-color);position:relative;max-width:23rem;vertical-align:middle;margin:0 auto}@media (max-width:1100px){.home-page .content .header[data-v-1d985b5f]{max-width:15rem;font-size:2.4rem;line-height:3rem}}.home-page .content .header .header-part-two[data-v-1d985b5f]{display:block}.home-page .content .description[data-v-1d985b5f]{font:400 1.5rem/2.3rem var(--font);text-align:center;max-width:35rem;color:var(--text-color)}@media (max-width:1023px){.home-page .content .description[data-v-1d985b5f]{font-size:1.2rem;line-height:1.8rem;padding:0 4rem}}.home-page .viewport[data-v-1d985b5f]{display:flex;align-items:center;justify-content:center;flex-direction:column;grid-gap:2em;gap:2em}.home-page .viewport [class*=-pillar][data-v-1d985b5f]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;height:3.8rem;cursor:pointer}.home-page .viewport [class*=-pillar][data-disabled=true][data-v-1d985b5f]{cursor:default;pointer-events:none}.home-page .viewport [class*=-pillar][data-disabled=true] .pillar-title[data-v-1d985b5f]{color:var(--disabled-button-text);filter:blur(3px)}.home-page .viewport [class*=-pillar]:hover .bottom-border[data-v-1d985b5f]{width:50%}.home-page .viewport [class*=-pillar] .pillar-title[data-v-1d985b5f]{display:block;font:400 2.8rem/3rem var(--font);text-align:center;color:var(--text-color)}@media (max-width:1100px){.home-page .viewport [class*=-pillar] .pillar-title[data-v-1d985b5f]{font-size:2.2rem;line-height:2rem}}.home-page .viewport [class*=-pillar] .bottom-border[data-v-1d985b5f]{display:block;background-color:var(--button-hover);width:0;height:.3rem;margin:0 auto;transition:width .5s cubic-bezier(.645,.045,.355,1)}.home-page .viewport .yet-to-be-developed[data-v-1d985b5f]{display:flex;align-items:center;justify-content:center;flex-direction:column;grid-gap:1rem;gap:1rem;position:relative}.home-page .viewport .yet-to-be-developed .under-construction[data-v-1d985b5f]{display:flex;align-items:center;justify-content:center;position:absolute;font:600 2rem/2.3rem var(--font);text-align:center;color:var(--text-color);width:100%;height:100%}html[dir=ltr] .home-page .content .header .header-part-two[data-v-1d985b5f]{margin-right:-1.5rem;text-align:right}html[dir=rtl] .home-page .content .header .header-part-two[data-v-1d985b5f]{margin-left:-2rem;text-align:left}",""]),t.exports=r},202:function(t,e,n){"use strict";n.r(e);var r=n(182),o=n(184),l=n(187),d={name:"Stuff",mixins:[o.a],components:{AnchorTag:l.a},head:function(){return{title:this.$t("titles.stuff"),description:this.$t("descriptions.stuff")}},data:function(){return{activePillars:[{id:"about"},{id:"npm"},{id:"contribution"},{id:"hackernoon"}],pillars:[{id:"interactive"}]}},mounted:function(){this.$refs.header&&this.$refs.description&&this.$refs.viewport&&this.animatedStuff()},methods:{animatedStuff:function(){r.a.set(this.$refs.description,{y:150}),r.a.set([this.$refs.header,this.$refs.description,this.$refs.viewport],{opacity:0,visibility:"hidden"}),"en"===this.$i18n.locale?r.a.set(this.$refs.header,{x:150}):r.a.set(this.$refs.header,{x:-150}),r.a.timeline().to(this.$refs.header,1,{opacity:1,visibility:"inherit",x:0},"header").to(this.$refs.description,1,{opacity:1,visibility:"inherit",y:0}).to(this.$refs.viewport,.5,{opacity:1,visibility:"visible"})},pillarOnClickHandler:function(t){if("about"===t)this.fadingOutAndPushToRouterHandler({element:this.$refs.siteMain,route:t});else switch(t){case"npm":window.open("https://www.npmjs.com/~smakss","_blank");break;case"contribution":window.open("https://github.com/SMAKSS","_blank");break;case"hackernoon":window.open("https://hackernoon.com/u/smakss","_blank")}}}},c=(n(190),n(33)),component=Object(c.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",{ref:"siteMain",staticClass:"site-main"},[n("div",{staticClass:"home-page"},[n("div",{ref:"content",staticClass:"content"},[n("h1",{ref:"header",staticClass:"header"},[t._v("\n        "+t._s(t.$t("main.header.partOne"))+"\n        "),n("span",{staticClass:"header-part-two"},[t._v(t._s(t.$t("main.header.partTwo")))])]),t._v(" "),n("p",{ref:"description",staticClass:"description"},[t._v(t._s(t.$t("main.content")))])]),t._v(" "),n("div",{ref:"viewport",staticClass:"viewport"},[t._l(t.activePillars,(function(e){return n("div",{key:e.id,class:e.id+"-pillar",on:{click:function(n){return t.pillarOnClickHandler(e.id)}}},[n("span",{staticClass:"pillar-title"},[t._v("\n          "+t._s(t.$t("main.pillars.headings."+e.id))+"\n        ")]),t._v(" "),n("span",{staticClass:"bottom-border"})])})),t._v(" "),n("div",{staticClass:"blog-pillar"},[n("AnchorTag",{attrs:{link:this.$constants.blog}},[n("span",{staticClass:"pillar-title"},[t._v("\n            "+t._s(t.$t("main.pillars.headings.blog"))+"\n          ")])]),t._v(" "),n("span",{staticClass:"bottom-border"})],1),t._v(" "),n("div",{staticClass:"yet-to-be-developed"},[n("div",{staticClass:"under-construction"},[t._v("\n          "+t._s(t.$t("main.pillars.comingSoon"))+"\n        ")]),t._v(" "),t._l(t.pillars,(function(e){return n("div",{key:e.id,class:e.id+"-pillar",attrs:{"data-disabled":"true"},on:{click:function(n){return t.pillarOnClickHandler(e.id)}}},[n("span",{staticClass:"pillar-title"},[t._v("\n            "+t._s(t.$t("main.pillars.headings."+e.id))+"\n          ")]),t._v(" "),n("span",{staticClass:"bottom-border"})])}))],2)],2)])])}),[],!1,null,"1d985b5f",null);e.default=component.exports},247:function(t,e,n){"use strict";n.r(e);var r=n(202).default,o=n(33),component=Object(o.a)(r,undefined,undefined,!1,null,null,null);e.default=component.exports}}]);