(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{119:function(e,t,o){var content=o(179);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(70).default)("3df9962a",content,!0,{sourceMap:!1})},120:function(e,t,o){var content=o(181);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(70).default)("1078b139",content,!0,{sourceMap:!1})},142:function(e,t,o){e.exports=o(143)},166:function(e,t,o){"use strict";o.r(t);o(94),o(44),o(45),o(95),o(47);t.default=function(e){var t=e.isHMR,o=e.app,n=e.store,r=e.route,l=e.params,c=e.error,d=e.redirect,h=o.i18n.fallbackLocale;if(!t){null!=l&&l.lang||(l.lang=n.state.locales.find((function(e){if(r.fullPath.indexOf(e)>-1)return e})));var f=l.lang||h;if(!n.state.locales.includes(f))return c({message:"This page could not be found.",statusCode:404});if(n.commit("SET_LANG",f),o.i18n.locale=n.state.locale,f===h&&0===r.fullPath.indexOf("/"+h)){var m="^/"+h+(0===r.fullPath.indexOf("/"+h+"/")?"/":""),w=new RegExp(m);return d(r.fullPath.replace(w,"/"))}}}},178:function(e,t,o){"use strict";o(119)},179:function(e,t,o){var n=o(69)(!1);n.push([e.i,".button[data-v-353914b0]{background:var(--button);color:var(--button-text);border-radius:.25rem;padding:0 2rem;transition:background .2s cubic-bezier(1,0,0,1);height:4.6rem;border:2px solid transparent;line-height:calc(4.6rem - 2px);display:inline-block;vertical-align:middle;text-align:center;font-size:0}.button[data-v-353914b0]:hover{background:var(--button-hover)}.button .label[data-v-353914b0]{vertical-align:middle;display:inline-block;white-space:nowrap;font:500 1.4rem/1 var(--font);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}@media (max-width:767px){.button .label[data-v-353914b0]{font-size:1.2rem}}",""]),e.exports=n},180:function(e,t,o){"use strict";o(120)},181:function(e,t,o){var n=o(69)(!1);n.push([e.i,".site-error[data-v-a0a77554]{display:flex;align-items:center;justify-content:center;flex-direction:column;position:relative;min-height:calc(100vh - 6.5rem)}.site-error .error[data-v-a0a77554]{font:400 3.6rem/4.4rem var(--font);width:80%;max-width:20.5em;margin:.75em auto 0;color:var(--heading-color)}@media (max-width:767px){.site-error .error[data-v-a0a77554]{font-size:2.4rem;line-height:3rem;width:calc(100% - 8rem)}}.site-error .button[data-v-a0a77554]{position:absolute;display:block;text-align:center;margin-bottom:4rem;bottom:0}",""]),e.exports=n},184:function(e,t,o){"use strict";o.r(t),o.d(t,"state",(function(){return n})),o.d(t,"mutations",(function(){return r}));o(44),o(45);var n=function(){return{locales:["en","fa"],locale:"en",modalTrigger:!1,colors:{light:{"background-color":"#ffffff","background-color-secondary":"#f3f5f4","text-color":"rgba(0, 0, 0, 0.67)","heading-color":"rgba(0, 0, 0, 0.87)",link:"#5f6368","link-hover":"#202124",button:"#1a73e8","button-hover":"#4185f4","button-text":"#ffffff","button-icon":"#f7f7f7","button-icon-hover":"#f2f2f2","footer-color":"#f8f9fb","border-color":"#ddd",mask:"rgba(0, 0, 0, 0.1)","light-glow":"#f0c420","settings-default":"#5f6368","settings-pillar-activated":"#5f6368","logo-color":"rgba(70, 70, 70, 0.75)","logo-linkedin":"#0077b7","logo-npm":"#231f20","logo-stackoverflow-task":"#ff9800","logo-stackoverflow-stack":"#757575"},dark:{"background-color":"#091a28","background-color-secondary":"#071521","text-color":"rgba(255, 255, 255, 0.5)","heading-color":"rgba(255, 255, 255, 1)",link:"#fdf9f3","link-hover":"#41b38a",button:"#158876","button-hover":"#41b38a","button-text":"#ffffff","button-icon":"#f7f7f7","button-icon-hover":"#f2f2f2","footer-color":"#071521","border-color":"#ddd",mask:"rgba(255, 255, 255, 0.1)","light-glow":"#f0c420","settings-default":"#5f6368","settings-pillar-activated":"#f3f5f4","logo-color":"rgba(255, 255, 255, 1)","logo-linkedin":"#0077b7","logo-npm":"#231f20","logo-stackoverflow-task":"#ff9800","logo-stackoverflow-stack":"#757575"}}}},r={SET_LANG:function(e,t){e.locales.includes(t)&&(e.locale=t)},SET_MODALTRIGGER:function(e,t){e.modalTrigger=t}}},204:function(e){e.exports=JSON.parse('{"buttons":{"close":"Close","goHome":"Go back to home","ok":"OK, got it","start":"Let\'s get started"},"contents":{"about":{"main":"Hi there, my full name is Seyed Mohammad Ali Kazemi Sheykh Shabani, which is too long but I like it. But for the sake of its longness, I chose a nickname for myself which is SMAKSS or a simpler version that I like the most is MAKSS. I assume my self a software engineer, I assumed it because I know nothing about it. Before I assumed myself a software engineer I used to play video games a lot, so I was kind of gamer 🎮. I learnt about PC, games, and other stuff since I was a lil kid (2-3 years old). Then nothing in the world was more desirable than games for me. I did not enjoy school at all, even the university years were more awful. I studied computer science at the university, I didn\'t have a clue about it and what is it at all, but with all of these disasters, I managed to start programming and since the second year of the undergraduate study (2013) I start working. In those days I just knew how to copy-paste previous codes that I have to create a new thing 😁😁. It may seem weird in the first place but honestly, it worked almost all the time. Later on, I managed to work with some utility software like Photoshop and Illustrator, and you may not believe that but I just work with them like how I code 😂. With all the applicable skills (Who cares about them 😎) I manage to work with some startups and even start my own one with a bunch of comrades (I\'m not a communist myself but I found Marx and some of the idea behind it reasonable). In all of those years, I struggle a lot and tried to make a better version of myself and finally, I could take an internship in Microsoft as a Software Engineer, it was about three though months of my life, but I learnt a lot in those months more than all the previous years. After that, I applied for some opportunities in that company and could pass the initial test in some of them but since I always loved gaming stuff I rather worked with ATG (Advanced Technology Group) team. I always enjoyed being into new things and experience some new stuff, so I decide to get into web developing area, I worked with WordPress before but I knew nothing about the whole thing. Like before I start educating myself with online courses, I really wanted to get into this area so I tried to apply some application in the Microsoft itself but it turns out I knew nothing about web developing at all, so I couldn\'t pass the initial test. Those days were too exhausting, after working with Microsoft for about one year I just resigned and quit my job (I was a kiddo and I missed those days a lot 😌). I was in the middle of nowhere but I decide to start working on something so I just joined some new startup in Iran and tried to learn how to develop a real web application, as I said I knew nothing about it but I start working on a health application as a Full-Stack web developer I call it Full-Stack because I worked with 3 different stacks, one in the Frontend, one in the Backend, and another in Serverside. I worked with those tools for about 8 months, I learnt a lot about web application but I didn\'t really love what I did there, all of those stuff sometimes made me uncomfortable and overwhelming so I resigned and quit my job once again. But this time I knew what I\'m going to do I just wanted to work with a single side of the application either Backend, Frontend or Server. So I applied for some other companies for each of the them separately. I do not know how to call it maybe fate or whatever, but I suddenly found myself within a cool-ish company as a Frontend Engineer, since then I obsessed with Frontend tools and I like to continue my journey in this area. And that is what it is."},"cookie":"I have to admit it, I\'m using cookie to provide a better user experience.","info":{"description":"First of all, thanks for paying me a visit. Well, unlike people common opinion, designing and implementing a website is hard, but doing all this on your own and producing a cool result is damn hard. I\'m not saying this is very cool (Who cares maybe it is!) but I tried my best on it. I built this all mostly for sharing my insights, also a showcase, and sharing new ideas. The whole source code of it (Its got many bugs right now 😁), is available on my GitHub page, so if you enjoyed it, you can fork it and create your own exclusive one, then you can buy me a coffee in return (Link is available in the very bottom of each page).","ps":"P.S.: You also may ask what the heck is going on with the quote thing? I have to say it is fun, cool, and maybe insightful. In addition, it is provided by","quotable":"Quotable service.","title":"You may ask what are all these about?"}},"descriptions":{"about":"Know more about me.","index":"Hi there, I\'m MAKSS a Software Engineer: Frontend, who seeks to move mankind one step forward. I will try to share my personal insights here.","stuff":"Well, this is about, getting to know my stuff."},"errors":{"404":"It\'s a shame, I can\'t find the page that you\'re looking for.","error":"Oops, it seems an error occurred."},"links":{"about":"About Me","donate":"Buy Me a Coffee","english":"English","persian":"Farsi","stuff":"Stuff"},"main":{"content":"You can check each pillar to know more about me and my stuff.","header":{"partOne":"Get to Know,","partTwo":"My Stuff"},"pillars":{"comingSoon":"Will be available soon!","content":{"summary":"My background is in computer science, and I\'ve always tried to create stuff. I am radically passionate about new things, especially in technology. I believe good people within a good and smart team is in a higher place in the order of power than a successful product. I love getting my hands dirty to create a seamless app to bring joy to whoever using it. Usually, I\'m overwhelmed at work, but I do like hiking, reading, video games, music, movies, and dogs.","summaryFinalThing":"I enjoy the path that I\'ve taken, and I\'m looking forward to the next step, I hope that I can take one small step for mankind."},"experience":{"coin-plus":{"company":"CoinPlus","description":"CoinPlus is a financial technology company with the main focus on offering Blockchain-related solutions to institutional and individual investors. I\'ve worked on two different products called Sarrafeh and TexToken and was responsible for analyzing and implementing new features also managing the front-end team and their work. I\'ve Built two separate apps for each of the products from the ground up and made it work with over 20+k users. I also Scaled up the existing features on both the client and admin sides. Upgrade and maintain the old admin panel to be faster.","duration":"Dec 2020 - Present","links":{"sarrafeh":{"name":"Sarrafeh"},"texToken":{"name":"TexToken"}},"location":"Tehran, Iran","role":"Frontend Engineer","stack":"HTML / CSS / SCSS / JavaScript / ReactJS / Redux"},"sana-gostar-sabz":{"company":"Sana Gostar Sabz","description":"Sana was the parent company of three different products like home services, transportation, and big data manipulation. I have worked on two different products called the Ubaar and the Achareh. I could maintain and scale up the codebase and make the old codebase work faster. I also create two different web apps for each product with over 2+m users, exclusive PWA for the Achareh experts, and some brand new landings and many more cool features for both the Ubaar and the Achareh.","duration":"Jan 2019 - Jan 2021","links":{"achareh":{"name":"Achareh"},"ubaar":{"name":"Ubaar"}},"location":"Tehran, Iran","role":"Frontend Engineer","stack":"HTML / CSS / SCSS / JavaScript / jQuery / VueJS / VueX / ReactJS / Redux / PM2 / Apache / NginX"},"pergas-it-solutions":{"company":"Pergas IT Solutions","description":"Pergas IT Solutions is an IT department that works beneath the Pergas Teb (Lá farrerr) company. Its purposes focused on web applications for the corporation. As a frontend engineer, I focused on managing and leading frontend team members, and also delivering and designing a best-suited platform that works fine for the colleagues and other related users that fulfil their job through the platform.","duration":"Dec 2019 - Apr 2020","location":"Tehran, Iran","role":"Frontend Engineer / Frontend Chapter Lead / Product Owner","stack":"HTML / CSS / SCSS / MaterialUI / JavaScript / ReactJS"}},"headings":{"about":"About Me","contribution":"Public Contribution","interactive":"Interactive Resume","npm":"NPM Packages"},"labels":{"techStack":"Technical stack","usefulLinks":"Useful links"},"sub-headings":{"summary":"Summary","work-experience":"Work Experience"}}},"quote":{"error":"I\'m truly ashamed! We got no quote for you today.","reason":"It may because the quote server is down at the moment.","title":{"author":"Search for author","content":"Quote of the day"}},"titles":{"about":"About me","contribution":"Public Contribution","cookieConsent":"Cookie consent","dark":"Dark","github":"GitHub","home":"Go to home","index":"SMAKSS","info":"More information","interactive":"Interactive Resume","light":"Light","linkedin":"LinkedIn","npm":"npmjs","stackoverflow":"Stack Overflow","stuff":"stuff","switcher":"Switcher","system":"Based on system preferences"}}')},205:function(e){e.exports=JSON.parse('{"buttons":{"close":"بستـن","goHome":"برگـردیم به صفحـه اصـلی","ok":"باشـه، فهمیـدم","start":"بـزن بـریم"},"contents":{"cookie":"مـن مـجبور شـدم بـرای ارائـه تـجربه کـاربری بهتـر از کوکـی اسـتفاده کـنم.","info":{"description":"خـب، اول از هـمه باید بگـم که برخـلاف نظر مشـترک خـیلی از مـردم طـراحی و پیـاده‌سازی یـه وبسایـت کار سخـتیه، اما انجـام دادن همه‌ اینـا بـا یـه خـروجی باحـال خیلـی سختتـره. نمیخـوام بگـم که این وبسایت باحـاله ولی خـب همه تلاشـمو براش کـردم. من اینجـارو بیشتـر بخاطر این طـراحی کردم که افـکار و دانستـه‌هامو به اشتـراک بـذارم. تمـام سـورس کـد ایـن پـروژه روی گیـت‌هـاب هسـت و قابـل دانـلود و شخـصی سـازیه، پـس اگـه باهـاش حـال کـردین و توانـاییشو داشتـید میتـونید منـو یه قـهوه مهمـون کنیـد (اگـه دوسـت داشتیـد کـمک مـالی هـم بکنیـد لینکـش تـه تـه همـه صفحـه‌ها هسـت).","ps":"پ.ن.: ممکنـه بـازم بپرسـید کـه نقـل قـول ایـن وسـط چـی میگـه؟ تـو جوابـش بایـد بگـم که صرفـا باحالـه و ممکنـه الهـام بخـش باشـه (نـقل قـول‌ها ترجـمه نـشدن کـه مفـاهیمـشون تغییـر نکنـه). بعـلاوه برای دستـرسی به ایـن امکـان میتونیـد مراجـعه کنیـد بـه","quotable":"سـرویس نقـل قـول.","title":"مـمکنه بپرسید، ایـنجا کـلن واسه چیه؟"}},"descriptions":{"about":"بیشـتر راجـع به مـن بدونـید.","index":"سلام من مکس هستم و مهندس نرم‌افزارم. به دنبال این هستم که اگه بشه، بشریت رو یه گام به جلوتر ببرم. در اینجا سعی دارم دانسته‌هام رو به اشتراک بذارم.","stuff":"در واقع اینجا قراره توانایی‌ و کار‌هامو ببینید."},"errors":{"404":"باعـث شرمنـدگیه، من نتـونستم صفحـه‌ای کـه دنبالشـی رو پیـدا کنم.","error":"اووه، به نظـر مشـکلی پیـش اومـده."},"links":{"about":"دربـاره مـن","donate":"کمـک مـالی","english":"انگلـیسی","persian":"فارسـی","stuff":"کـارهـا"},"main":{"content":"درواقـع، اینجـا با انتخـاب هر بخـش میتـونید، من، توانایی‌هام و کـارهام رو بیشتـر بشناسـید.","header":{"partOne":"من و کارهام رو،","partTwo":"بیشـتر بشناسیـد"},"pillars":{"comingSoon":"به زودی در دسترس قرار خواهد گرفت!","content":{"summary":"مـن توی دانـشگاه علوم کامپیـوتر خوندم و همیشـه سعیم بر خلـق کردن بوده. من به صـورت دیوانه‌واری به چیـزهای جدید علاقه دارم مخصوصـا اگر مربوط به تکنولوژی باشند. باور دارم آدم‌هـای خوب در تیـمهای درست حسابـی همیشه اولویت بالاتـری نسبت به محصول‌هـای موفق دارن. همیـشه سعی دارم تا اَپـهای بینظیـری خلـق کنم تا کاربـرا ازشون لذت ببرن. معمـولا غرق در کار هستـم اما به سفر، کتاب خـواندن، بازی‌های ویدیـویی، موزیک و فیلم علاقـه دارم.","summaryFinalThing":"از مسیـری که تا اینجا اومدم راضـی هستم و امیدوارم بتـونم قدم موثـری برای پیشـرفت همگـان بردارم."},"experience":{"coin-plus":{"company":"کویـن پـلاس","description":"کـویـن پلـاس شرکتـی فعـال در حوزه تکنـولوژی‌های مالـی علی الخـصوص بلاکچِـین است و راهـکارهای خـود در این زمیـنه را در دسترس مراکز تخصصی و افراد میگذارد. مـن در در این شرکـت بر روی دو محصول مختـلف به نـام‌هـای صرافـه و تکـس توکـن کار کردم و مسئـول ارزیـابی، پیـاده‌سـازی و مدیریت تیم فرانت‌انـد بودم. من برای هر دوی این محصولات اپلیکیشنـی مستقل از پایه پیاده سـازی کردم که هم اکنون با بیـش از ۲۰هزار کاربر مشفول فعالیـت هستند. همچـنین در این مدت تونستـم تا اپلیکشین موجود در سمـت ادمین رو بهـبود بدم.","duration":"دی ۱۳۹۹ - تاکـنون","links":{"sarrafeh":{"name":"صـرافـه"},"texToken":{"name":"تکـس توکـن"}},"location":"تـهران، ایـران","role":"Frontend Engineer","stack":"HTML / CSS / SCSS / JavaScript / ReactJS / Redux"},"sana-gostar-sabz":{"company":"سـانا گسـتر سبـز","description":"سـانا شرکت مادر سه محصـول مختلف ماننـد خدمات خانـگی، حمل و نقـل و دستکـاری کلان داده‌ها بود. من روی دو محصـول مختلف به نـام‌های اوبـار و آچـاره کار کرده‌ام. من تونستـم با نگهـداری و بهینه‌سـازی کدهای موجود سرعت اجـرا اون‌هـارو بالا ببـرم. من همچـنین تونستـم دوتا اپلیکیشـن مختـص هر کدوم از محصـولات پیاده‌سـازی کنم که هم اکنـون دارای بیش از ۲ میلیـون کاربر هسـت. در آخر هم با پیاده‌سـازی یه اپلیکیشن برای متخصصـان آچـاره و همچنین چندین صفحه لندینـگ باحال از جمله کارهـایی بوده که انجـام دادم.","duration":"دی ۱۳۹۷ - دی ۱۳۹۹","links":{"achareh":{"name":"آچـاره"},"ubaar":{"name":"اوبـار"}},"location":"تـهران، ایـران","role":"Frontend Engineer","stack":"HTML / CSS / SCSS / JavaScript / jQuery / VueJS / VueX / ReactJS / Redux / PM2 / Apache / NginX"},"pergas-it-solutions":{"company":"پِرگـاس","description":"پـرگاس یک بخش فناوری اطـلاعات است که زیر نظر شرکت پرگـاس طـب کار می کند. هدف پیدایشش ساخت برنامه‌های کاربـردی درون سازمانی بود. من در این مجموعـه مدیریـت و رهبری اعضای تیم فرانت‌اند، و همچنین ارائه و طراحی بهترین پلتفرم که برای همکـاران و سایر کاربران مرتبـط که کار خود را از طریق پلتفـرم انجام می‌دهنـد، تمرکـز کردم.","duration":"دی ۱۳۹۸ - فروردین ۱۳۹۹","location":"تـهران، ایـران","role":"Frontend Engineer / Frontend Chapter Lead / Product Owner","stack":"HTML / CSS / SCSS / MaterialUI / JavaScript / ReactJS"}},"headings":{"about":"دربـاره مـن","contribution":"هـمکـاری عـمومـی","interactive":"رزومـه تـعاملـی","npm":"پکـیج‌های اِن‌پـی‌اِم"},"labels":{"techStack":"ابـزارهـا","usefulLinks":"لینکـهای مـفیـد"},"sub-headings":{"summary":"خـلاصـه کوتـاه","work-experience":"تجـربـه کـاری"}}},"quote":{"error":"مـن واقـعا متاسفم! بـرای امـروز نـقل قـول نداریـم.","reason":"مـمکنه دلـیلش بـخاطر در دستـرس نـبودن سـرویس نـقل قـول‌هـا بـاشه.","title":{"author":"جستجـو نویسـنده","content":"نـقل قـول امـروز"}},"titles":{"about":"دربـاره مـن","contribution":"هـمکـاری عـمومـی","cookieConsent":"قبـول کـوکی","dark":"تـیره","github":"گیت‌هاب","home":"بازگشت به صفحه اصلی","index":"SMAKSS","info":"اطـلاعات بیشـتر","interactive":"رزومـه تـعاملـی","light":"روشـن","linkedin":"لینکداین","npm":"اِن‌پی‌اِم‌جِی‌اِس","stackoverflow":"استک اورفلو","stuff":"کارها","switcher":"تعویض کننده","system":"بـر اسـاس تنظیمات سیستم"}}')},26:function(e,t,o){"use strict";var n={name:"error",props:["error"],components:{Button:o(92).a},head:function(){return{htmlAttrs:{lang:this.$i18n.locale,dir:"en"===this.$i18n.locale?"ltr":"rtl"}}},mounted:function(){setTimeout((function(){document.querySelector(".site-settings .settings.localization-switcher .dropdown").style.pointerEvents="none"}),100)},beforeDestroy:function(){document.querySelector(".site-settings .settings.localization-switcher .dropdown").style.pointerEvents="all"},methods:{onClick:function(){this.$router.push({path:"/"})}}},r=(o(180),o(38)),component=Object(r.a)(n,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("main",{staticClass:"site-error"},[404===e.error.statusCode?o("h1",{staticClass:"error not-found"},[e._v("\n    "+e._s(e.$t("errors.404"))+"\n  ")]):o("h1",{staticClass:"error error-occurred"},[e._v(e._s(e.$t("errors.error")))]),e._v(" "),o("Button",{attrs:{title:e.$t("titles.home")},on:{onClick:e.onClick}},[e._v(e._s(e.$t("buttons.goHome")))])],1)}),[],!1,null,"a0a77554",null);t.a=component.exports},90:function(e,t,o){"use strict";var n=o(1),r=o(91);n.a.use(r.a),t.a=function(e){var t=e.app,n=e.store;t.i18n=new r.a({locale:n.state.locale,fallbackLocale:"en",messages:{en:o(204),fa:o(205)}}),t.i18n.path=function(link){return t.i18n.locale===t.i18n.fallbackLocale?"/".concat(link):"/".concat(t.i18n.locale,"/").concat(link)}}},92:function(e,t,o){"use strict";var n={name:"Button",props:["mainClass","title","ariaLabel","spanClass"],methods:{onClick:function(e){this.$emit("onClick",e)}}},r=(o(178),o(38)),component=Object(r.a)(n,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("button",{class:e.$props.mainClass||"button",attrs:{title:e.title,"aria-label":e.ariaLabel},on:{click:e.onClick}},[o("span",{class:e.spanClass||"label"},[e._t("default")],2)])}),[],!1,null,"353914b0",null);t.a=component.exports}},[[142,10,4,11]]]);