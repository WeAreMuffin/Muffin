
/*******************************************************************************    
                                                      
        sssyhddmmmddhys                        
      dNNNNNmss  sssyhmNddms                   
     dNNNNmhs         dNNNNNs           
   sNd sy     mNNmdy   sdNNNNs        Muffin - v1.1.4     
   Nd        dNNNNNy      ysNm        ---------------
  sNh           ssy         mN                        
   mNymdhy          shddmy hNd       Sorti du four le 2013-11-17
   sdNNNNNmsssssssssmNNNNNNNh             
     syyhddddddddddddddhhyss         Copyright (c) 2013 André Aubin
    sNNm shhh shhh shhd smNN                    
     dNNssNNN yNNN sNNN hNNy         Code source sous licence Apache 2      
     sNNy NNN yNNN sNNm dNN                    
      hNh mNN yNNN sNNd mNy             
          ydd smmm sdds                 

*******************************************************************************//*!
 * Smooth Scroll - v1.4.12 - 2013-09-19
 * https://github.com/kswedberg/jquery-smooth-scroll
 * Copyright (c) 2013 Karl Swedberg
 * Licensed MIT (https://github.com/kswedberg/jquery-smooth-scroll/blob/master/LICENSE-MIT)
 */
(function(t){function l(t){return t.replace(/(:|\.)/g,"\\$1")}var e="1.4.12",o={exclude:[],excludeWithin:[],offset:0,direction:"top",scrollElement:null,scrollTarget:null,beforeScroll:function(){},afterScroll:function(){},easing:"swing",speed:400,autoCoefficent:2,preventDefault:!0},n=function(l){var e=[],o=!1,n=l.dir&&"left"==l.dir?"scrollLeft":"scrollTop";return this.each(function(){if(this!=document&&this!=window){var l=t(this);l[n]()>0?e.push(this):(l[n](1),o=l[n]()>0,o&&e.push(this),l[n](0))}}),e.length||this.each(function(){"BODY"===this.nodeName&&(e=[this])}),"first"===l.el&&e.length>1&&(e=[e[0]]),e};t.fn.extend({scrollable:function(t){var l=n.call(this,{dir:t});return this.pushStack(l)},firstScrollable:function(t){var l=n.call(this,{el:"first",dir:t});return this.pushStack(l)},smoothScroll:function(e){e=e||{};var o=t.extend({},t.fn.smoothScroll.defaults,e),n=t.smoothScroll.filterPath(location.pathname);return this.unbind("click.smoothscroll").bind("click.smoothscroll",function(e){var r=this,s=t(this),c=o.exclude,i=o.excludeWithin,a=0,f=0,h=!0,u={},d=location.hostname===r.hostname||!r.hostname,m=o.scrollTarget||(t.smoothScroll.filterPath(r.pathname)||n)===n,p=l(r.hash);if(o.scrollTarget||d&&m&&p){for(;h&&c.length>a;)s.is(l(c[a++]))&&(h=!1);for(;h&&i.length>f;)s.closest(i[f++]).length&&(h=!1)}else h=!1;h&&(o.preventDefault&&e.preventDefault(),t.extend(u,o,{scrollTarget:o.scrollTarget||p,link:r}),t.smoothScroll(u))}),this}}),t.smoothScroll=function(l,e){var o,n,r,s,c=0,i="offset",a="scrollTop",f={},h={};"number"==typeof l?(o=t.fn.smoothScroll.defaults,r=l):(o=t.extend({},t.fn.smoothScroll.defaults,l||{}),o.scrollElement&&(i="position","static"==o.scrollElement.css("position")&&o.scrollElement.css("position","relative"))),o=t.extend({link:null},o),a="left"==o.direction?"scrollLeft":a,o.scrollElement?(n=o.scrollElement,/^(?:HTML|BODY)$/.test(n[0].nodeName)||(c=n[a]())):n=t("html, body").firstScrollable(o.direction),o.beforeScroll.call(n,o),r="number"==typeof l?l:e||t(o.scrollTarget)[i]()&&t(o.scrollTarget)[i]()[o.direction]||0,f[a]=r+c+o.offset,s=o.speed,"auto"===s&&(s=f[a]||n.scrollTop(),s/=o.autoCoefficent),h={duration:s,easing:o.easing,complete:function(){o.afterScroll.call(o.link,o)}},o.step&&(h.step=o.step),n.length?n.stop().animate(f,h):o.afterScroll.call(o.link,o)},t.smoothScroll.version=e,t.smoothScroll.filterPath=function(t){return t.replace(/^\//,"").replace(/(?:index|default).[a-zA-Z]{3,4}$/,"").replace(/\/$/,"")},t.fn.smoothScroll.defaults=o})(jQuery);
/*! makeforms - v0.0.3 - 2013-11-14
* https://github.com/lambda2/MakeForms
* Copyright (c) 2013 André Aubin; Licensed Apache 2 */
(function(e){e.fn.makeForms=function(t){var o,n,a,r,i,l,p,s,u={},m={};t=e.extend({components:{},groupSize:1,selectMinSize:18,position:"before",templates:{}},t),t.templates=e.extend({item:"{{item}}",title:"<p>{{title}}</p>",group:"<div data-role='group'>{{group}}</div>",item_group:"<div class='item-group'>{{items}}</div>",label:'<label for="{{id}}">{{label}}</label>',radio:'<label for="{{id}}"><input type="radio" name="{{name}}"	id="{{id}}" value="{{value}}">{{label}}</label>',text:'<input type="text" name="{{name}}"	id="{{id}}" value="{{value}}">',input:'<input type="{{type}}" name="{{name}}"	id="{{id}}" value="{{value}}">',select:'<select id="{{id}}" name="{{name}}">{{options}}</select>',option:'<option id="{{id}}" value="{{value}}">{{label}}</option>'},t.templates);var c=function(e,t){var o,n;o=e;for(n in t)-1!==o.search("{{"+n+"}}")&&t.hasOwnProperty(n)&&(o=o.replace("{{"+n+"}}",t[n]),o=c(o,t));return o},f=function(e){var t,o;t=0;for(o in e)t+=1;return t},d=function(e){var o,n;return e.hasOwnProperty("type")?o=e.type:(n=f(e.choices),o=1>=n?"text":t.selectMinSize>n?"radio":"option"),o},h=function(e,o,n,a){var r,i="";for(r in e){var l,p,s,u,m,f;"group"!==r&&(l=e[r],f=l.hasOwnProperty("type")?t.templates[l.type]:P,p=o+"_"+a+"_"+r,s=t.templates.label,u="option"!==n&&"radio"!==n?c(s,{label:l.label,id:p}):"",l.hasOwnProperty("value")||(l.value=a+"_"+r),m=c(f,{name:o,id:p,value:l.value,label:l.label}),l.hasOwnProperty("before")&&(m=l.before+m),l.hasOwnProperty("after")&&(m+=l.after),i=i+u+m)}return i},v=function(o,n){var a,r,i=[];for(a in o[n]){var l=o[n][a].slice(1);for(r in t.components[l].choices)i.push("#"+l+"_"+r);e(i.join(", ")).show()}return i},b=function(e,t){var o=0;if(e.hasOwnProperty("enable")){t in u==!1&&(u["#"+t]=[]);for(o=0;e.enable.length>o;o++)u["#"+t].push("#"+e.enable[o])}if(e.hasOwnProperty("disable")){t in m==!1&&(m["#"+t]=[]);for(o=0;e.disable.length>o;o++)m["#"+t].push("#"+e.disable[o])}},y=function(e,o,n,a){var r,i=!1;for(r in e){var l,p,s,u,m,f;if(l=e[r],i=l.group,i!==!0)f=l.hasOwnProperty("type")?t.templates[l.type]:P,p=o+"_"+r,s=t.templates.label,u="option"!==a&&"radio"!==a?c(s,{label:l.label,id:p}):"",b(l,p),l.hasOwnProperty("value")||(l.value=r),m=c(f,{name:o,id:p,value:l.value,label:l.label}),l.hasOwnProperty("before")&&(m=l.before+m),l.hasOwnProperty("after")&&(m+=l.after),_=_+u+m;else if(i===!0){var d="",v=h(l,o,a,r);d+=v,_+=c(t.templates.item_group,{items:d});var y=o+"_"+r+"_all";b(l,y)}}return _};r=[],i=[],l=f(t.components),a=e(this),n=0;for(o in t.components){var g,w,O,P,j,_;_="",j="",s="",g=o,w=t.components[o].label,O=d(t.components[o]),P=t.templates[O],s=t.templates.group,t.components[o].hasOwnProperty("title")&&(t.components[o].hasOwnProperty("beforeTitle")&&(j+=t.components[o].beforeTitle),j+=c(t.templates.title,{title:t.components[o].title}),t.components[o].hasOwnProperty("afterTitle")&&(j+=t.components[o].afterTitle),r.push(j)),n+=1,y(t.components[o].choices,g,w,O),"option"===O&&(_=c(t.templates.select,{name:g,id:g,options:_})),r.push(_),_="",0===t.groupSize||0!==n%t.groupSize&&n!==l||(p=c(s,{group:r.join("\n")}),i.push(p),t.groupSize>0&&(r=[]))}0===t.groupSize&&(p=c(s,{group:r.join("\n")}),i.push(p)),"before"===t.position?a.html(i.join("\n")+a.html()):"after"===t.position?a.html(a.html()+i.join("\n")):a.html(i.join("\n"));var z,S,x;for(z in u)x=v(u,z),e(x.join(", ")).parents("div[data-role='group']").hide(),e(z).click(function(){e(x.join(", ")).parents("div[data-role='group']").show()});for(S in m)x=v(m,S),e(S).click(function(){e(x.join(", ")).parents("div[data-role='group']").hide()});return this}})(jQuery);
;(function(e){"use strict";function t(t){var r=t.data;t.isDefaultPrevented()||(t.preventDefault(),e(t.target).ajaxSubmit(r))}function r(t){var r=t.target,a=e(r);if(!a.is("[type=submit],[type=image]")){var n=a.closest("[type=submit]");if(0===n.length)return;r=n[0]}var i=this;if(i.clk=r,"image"==r.type)if(void 0!==t.offsetX)i.clk_x=t.offsetX,i.clk_y=t.offsetY;else if("function"==typeof e.fn.offset){var o=a.offset();i.clk_x=t.pageX-o.left,i.clk_y=t.pageY-o.top}else i.clk_x=t.pageX-r.offsetLeft,i.clk_y=t.pageY-r.offsetTop;setTimeout(function(){i.clk=i.clk_x=i.clk_y=null},100)}function a(){if(e.fn.ajaxSubmit.debug){var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}}var n={};n.fileapi=void 0!==e("<input type='file'/>").get(0).files,n.formdata=void 0!==window.FormData;var i=!!e.fn.prop;e.fn.attr2=function(){if(!i)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},e.fn.ajaxSubmit=function(t){function r(r){var a,n,i=e.param(r,t.traditional).split("&"),o=i.length,s=[];for(a=0;o>a;a++)i[a]=i[a].replace(/\+/g," "),n=i[a].split("="),s.push([decodeURIComponent(n[0]),decodeURIComponent(n[1])]);return s}function o(a){for(var n=new FormData,i=0;a.length>i;i++)n.append(a[i].name,a[i].value);if(t.extraData){var o=r(t.extraData);for(i=0;o.length>i;i++)o[i]&&n.append(o[i][0],o[i][1])}t.data=null;var s=e.extend(!0,{},e.ajaxSettings,t,{contentType:!1,processData:!1,cache:!1,type:u||"POST"});t.uploadProgress&&(s.xhr=function(){var r=e.ajaxSettings.xhr();return r.upload&&r.upload.addEventListener("progress",function(e){var r=0,a=e.loaded||e.position,n=e.total;e.lengthComputable&&(r=Math.ceil(100*(a/n))),t.uploadProgress(e,a,n,r)},!1),r}),s.data=null;var l=s.beforeSend;return s.beforeSend=function(e,r){r.data=t.formData?t.formData:n,l&&l.call(this,e,r)},e.ajax(s)}function s(r){function n(e){var t=null;try{e.contentWindow&&(t=e.contentWindow.document)}catch(r){a("cannot get iframe.contentWindow document: "+r)}if(t)return t;try{t=e.contentDocument?e.contentDocument:e.document}catch(r){a("cannot get iframe.contentDocument: "+r),t=e.document}return t}function o(){function t(){try{var e=n(g).readyState;a("state = "+e),e&&"uninitialized"==e.toLowerCase()&&setTimeout(t,50)}catch(r){a("Server abort: ",r," (",r.name,")"),s(k),j&&clearTimeout(j),j=void 0}}var r=f.attr2("target"),i=f.attr2("action");w.setAttribute("target",d),(!u||/post/i.test(u))&&w.setAttribute("method","POST"),i!=m.url&&w.setAttribute("action",m.url),m.skipEncodingOverride||u&&!/post/i.test(u)||f.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),m.timeout&&(j=setTimeout(function(){T=!0,s(D)},m.timeout));var o=[];try{if(m.extraData)for(var l in m.extraData)m.extraData.hasOwnProperty(l)&&(e.isPlainObject(m.extraData[l])&&m.extraData[l].hasOwnProperty("name")&&m.extraData[l].hasOwnProperty("value")?o.push(e('<input type="hidden" name="'+m.extraData[l].name+'">').val(m.extraData[l].value).appendTo(w)[0]):o.push(e('<input type="hidden" name="'+l+'">').val(m.extraData[l]).appendTo(w)[0]));m.iframeTarget||v.appendTo("body"),g.attachEvent?g.attachEvent("onload",s):g.addEventListener("load",s,!1),setTimeout(t,15);try{w.submit()}catch(c){var p=document.createElement("form").submit;p.apply(w)}}finally{w.setAttribute("action",i),r?w.setAttribute("target",r):f.removeAttr("target"),e(o).remove()}}function s(t){if(!x.aborted&&!F){if(M=n(g),M||(a("cannot access response document"),t=k),t===D&&x)return x.abort("timeout"),S.reject(x,"timeout"),void 0;if(t==k&&x)return x.abort("server abort"),S.reject(x,"error","server abort"),void 0;if(M&&M.location.href!=m.iframeSrc||T){g.detachEvent?g.detachEvent("onload",s):g.removeEventListener("load",s,!1);var r,i="success";try{if(T)throw"timeout";var o="xml"==m.dataType||M.XMLDocument||e.isXMLDoc(M);if(a("isXml="+o),!o&&window.opera&&(null===M.body||!M.body.innerHTML)&&--O)return a("requeing onLoad callback, DOM not available"),setTimeout(s,250),void 0;var u=M.body?M.body:M.documentElement;x.responseText=u?u.innerHTML:null,x.responseXML=M.XMLDocument?M.XMLDocument:M,o&&(m.dataType="xml"),x.getResponseHeader=function(e){var t={"content-type":m.dataType};return t[e.toLowerCase()]},u&&(x.status=Number(u.getAttribute("status"))||x.status,x.statusText=u.getAttribute("statusText")||x.statusText);var l=(m.dataType||"").toLowerCase(),c=/(json|script|text)/.test(l);if(c||m.textarea){var f=M.getElementsByTagName("textarea")[0];if(f)x.responseText=f.value,x.status=Number(f.getAttribute("status"))||x.status,x.statusText=f.getAttribute("statusText")||x.statusText;else if(c){var d=M.getElementsByTagName("pre")[0],h=M.getElementsByTagName("body")[0];d?x.responseText=d.textContent?d.textContent:d.innerText:h&&(x.responseText=h.textContent?h.textContent:h.innerText)}}else"xml"==l&&!x.responseXML&&x.responseText&&(x.responseXML=X(x.responseText));try{E=_(x,l,m)}catch(b){i="parsererror",x.error=r=b||i}}catch(b){a("error caught: ",b),i="error",x.error=r=b||i}x.aborted&&(a("upload aborted"),i=null),x.status&&(i=x.status>=200&&300>x.status||304===x.status?"success":"error"),"success"===i?(m.success&&m.success.call(m.context,E,"success",x),S.resolve(x.responseText,"success",x),p&&e.event.trigger("ajaxSuccess",[x,m])):i&&(void 0===r&&(r=x.statusText),m.error&&m.error.call(m.context,x,i,r),S.reject(x,"error",r),p&&e.event.trigger("ajaxError",[x,m,r])),p&&e.event.trigger("ajaxComplete",[x,m]),p&&!--e.active&&e.event.trigger("ajaxStop"),m.complete&&m.complete.call(m.context,x,i),F=!0,m.timeout&&clearTimeout(j),setTimeout(function(){m.iframeTarget?v.attr("src",m.iframeSrc):v.remove(),x.responseXML=null},100)}}}var l,c,m,p,d,v,g,x,b,y,T,j,w=f[0],S=e.Deferred();if(S.abort=function(e){x.abort(e)},r)for(c=0;h.length>c;c++)l=e(h[c]),i?l.prop("disabled",!1):l.removeAttr("disabled");if(m=e.extend(!0,{},e.ajaxSettings,t),m.context=m.context||m,d="jqFormIO"+(new Date).getTime(),m.iframeTarget?(v=e(m.iframeTarget),y=v.attr2("name"),y?d=y:v.attr2("name",d)):(v=e('<iframe name="'+d+'" src="'+m.iframeSrc+'" />'),v.css({position:"absolute",top:"-1000px",left:"-1000px"})),g=v[0],x={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var r="timeout"===t?"timeout":"aborted";a("aborting upload... "+r),this.aborted=1;try{g.contentWindow.document.execCommand&&g.contentWindow.document.execCommand("Stop")}catch(n){}v.attr("src",m.iframeSrc),x.error=r,m.error&&m.error.call(m.context,x,r,t),p&&e.event.trigger("ajaxError",[x,m,r]),m.complete&&m.complete.call(m.context,x,r)}},p=m.global,p&&0===e.active++&&e.event.trigger("ajaxStart"),p&&e.event.trigger("ajaxSend",[x,m]),m.beforeSend&&m.beforeSend.call(m.context,x,m)===!1)return m.global&&e.active--,S.reject(),S;if(x.aborted)return S.reject(),S;b=w.clk,b&&(y=b.name,y&&!b.disabled&&(m.extraData=m.extraData||{},m.extraData[y]=b.value,"image"==b.type&&(m.extraData[y+".x"]=w.clk_x,m.extraData[y+".y"]=w.clk_y)));var D=1,k=2,A=e("meta[name=csrf-token]").attr("content"),L=e("meta[name=csrf-param]").attr("content");L&&A&&(m.extraData=m.extraData||{},m.extraData[L]=A),m.forceSync?o():setTimeout(o,10);var E,M,F,O=50,X=e.parseXML||function(e,t){return window.ActiveXObject?(t=new ActiveXObject("Microsoft.XMLDOM"),t.async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!=t.documentElement.nodeName?t:null},C=e.parseJSON||function(e){return window.eval("("+e+")")},_=function(t,r,a){var n=t.getResponseHeader("content-type")||"",i="xml"===r||!r&&n.indexOf("xml")>=0,o=i?t.responseXML:t.responseText;return i&&"parsererror"===o.documentElement.nodeName&&e.error&&e.error("parsererror"),a&&a.dataFilter&&(o=a.dataFilter(o,r)),"string"==typeof o&&("json"===r||!r&&n.indexOf("json")>=0?o=C(o):("script"===r||!r&&n.indexOf("javascript")>=0)&&e.globalEval(o)),o};return S}if(!this.length)return a("ajaxSubmit: skipping submit process - no element selected"),this;var u,l,c,f=this;"function"==typeof t?t={success:t}:void 0===t&&(t={}),u=t.type||this.attr2("method"),l=t.url||this.attr2("action"),c="string"==typeof l?e.trim(l):"",c=c||window.location.href||"",c&&(c=(c.match(/^([^#]+)/)||[])[1]),t=e.extend(!0,{url:c,success:e.ajaxSettings.success,type:u||e.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},t);var m={};if(this.trigger("form-pre-serialize",[this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(t.beforeSerialize&&t.beforeSerialize(this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var p=t.traditional;void 0===p&&(p=e.ajaxSettings.traditional);var d,h=[],v=this.formToArray(t.semantic,h);if(t.data&&(t.extraData=t.data,d=e.param(t.data,p)),t.beforeSubmit&&t.beforeSubmit(v,this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[v,this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var g=e.param(v,p);d&&(g=g?g+"&"+d:d),"GET"==t.type.toUpperCase()?(t.url+=(t.url.indexOf("?")>=0?"&":"?")+g,t.data=null):t.data=g;var x=[];if(t.resetForm&&x.push(function(){f.resetForm()}),t.clearForm&&x.push(function(){f.clearForm(t.includeHidden)}),!t.dataType&&t.target){var b=t.success||function(){};x.push(function(r){var a=t.replaceTarget?"replaceWith":"html";e(t.target)[a](r).each(b,arguments)})}else t.success&&x.push(t.success);if(t.success=function(e,r,a){for(var n=t.context||this,i=0,o=x.length;o>i;i++)x[i].apply(n,[e,r,a||f,f])},t.error){var y=t.error;t.error=function(e,r,a){var n=t.context||this;y.apply(n,[e,r,a,f])}}if(t.complete){var T=t.complete;t.complete=function(e,r){var a=t.context||this;T.apply(a,[e,r,f])}}var j=e("input[type=file]:enabled",this).filter(function(){return""!==e(this).val()}),w=j.length>0,S="multipart/form-data",D=f.attr("enctype")==S||f.attr("encoding")==S,k=n.fileapi&&n.formdata;a("fileAPI :"+k);var A,L=(w||D)&&!k;t.iframe!==!1&&(t.iframe||L)?t.closeKeepAlive?e.get(t.closeKeepAlive,function(){A=s(v)}):A=s(v):A=(w||D)&&k?o(v):e.ajax(t),f.removeData("jqxhr").data("jqxhr",A);for(var E=0;h.length>E;E++)h[E]=null;return this.trigger("form-submit-notify",[this,t]),this},e.fn.ajaxForm=function(n){if(n=n||{},n.delegation=n.delegation&&e.isFunction(e.fn.on),!n.delegation&&0===this.length){var i={s:this.selector,c:this.context};return!e.isReady&&i.s?(a("DOM not ready, queuing ajaxForm"),e(function(){e(i.s,i.c).ajaxForm(n)}),this):(a("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)")),this)}return n.delegation?(e(document).off("submit.form-plugin",this.selector,t).off("click.form-plugin",this.selector,r).on("submit.form-plugin",this.selector,n,t).on("click.form-plugin",this.selector,n,r),this):this.ajaxFormUnbind().bind("submit.form-plugin",n,t).bind("click.form-plugin",n,r)},e.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")},e.fn.formToArray=function(t,r){var a=[];if(0===this.length)return a;var i=this[0],o=t?i.getElementsByTagName("*"):i.elements;if(!o)return a;var s,u,l,c,f,m,p;for(s=0,m=o.length;m>s;s++)if(f=o[s],l=f.name,l&&!f.disabled)if(t&&i.clk&&"image"==f.type)i.clk==f&&(a.push({name:l,value:e(f).val(),type:f.type}),a.push({name:l+".x",value:i.clk_x},{name:l+".y",value:i.clk_y}));else if(c=e.fieldValue(f,!0),c&&c.constructor==Array)for(r&&r.push(f),u=0,p=c.length;p>u;u++)a.push({name:l,value:c[u]});else if(n.fileapi&&"file"==f.type){r&&r.push(f);var d=f.files;if(d.length)for(u=0;d.length>u;u++)a.push({name:l,value:d[u],type:f.type});else a.push({name:l,value:"",type:f.type})}else null!==c&&c!==void 0&&(r&&r.push(f),a.push({name:l,value:c,type:f.type,required:f.required}));if(!t&&i.clk){var h=e(i.clk),v=h[0];l=v.name,l&&!v.disabled&&"image"==v.type&&(a.push({name:l,value:h.val()}),a.push({name:l+".x",value:i.clk_x},{name:l+".y",value:i.clk_y}))}return a},e.fn.formSerialize=function(t){return e.param(this.formToArray(t))},e.fn.fieldSerialize=function(t){var r=[];return this.each(function(){var a=this.name;if(a){var n=e.fieldValue(this,t);if(n&&n.constructor==Array)for(var i=0,o=n.length;o>i;i++)r.push({name:a,value:n[i]});else null!==n&&n!==void 0&&r.push({name:this.name,value:n})}}),e.param(r)},e.fn.fieldValue=function(t){for(var r=[],a=0,n=this.length;n>a;a++){var i=this[a],o=e.fieldValue(i,t);null===o||void 0===o||o.constructor==Array&&!o.length||(o.constructor==Array?e.merge(r,o):r.push(o))}return r},e.fieldValue=function(t,r){var a=t.name,n=t.type,i=t.tagName.toLowerCase();if(void 0===r&&(r=!0),r&&(!a||t.disabled||"reset"==n||"button"==n||("checkbox"==n||"radio"==n)&&!t.checked||("submit"==n||"image"==n)&&t.form&&t.form.clk!=t||"select"==i&&-1==t.selectedIndex))return null;if("select"==i){var o=t.selectedIndex;if(0>o)return null;for(var s=[],u=t.options,l="select-one"==n,c=l?o+1:u.length,f=l?o:0;c>f;f++){var m=u[f];if(m.selected){var p=m.value;if(p||(p=m.attributes&&m.attributes.value&&!m.attributes.value.specified?m.text:m.value),l)return p;s.push(p)}}return s}return e(t).val()},e.fn.clearForm=function(t){return this.each(function(){e("input,select,textarea",this).clearFields(t)})},e.fn.clearFields=e.fn.clearInputs=function(t){var r=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var a=this.type,n=this.tagName.toLowerCase();r.test(a)||"textarea"==n?this.value="":"checkbox"==a||"radio"==a?this.checked=!1:"select"==n?this.selectedIndex=-1:"file"==a?/MSIE/.test(navigator.userAgent)?e(this).replaceWith(e(this).clone(!0)):e(this).val(""):t&&(t===!0&&/hidden/.test(a)||"string"==typeof t&&e(this).is(t))&&(this.value="")})},e.fn.resetForm=function(){return this.each(function(){("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset()})},e.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},e.fn.selected=function(t){return void 0===t&&(t=!0),this.each(function(){var r=this.type;if("checkbox"==r||"radio"==r)this.checked=t;else if("option"==this.tagName.toLowerCase()){var a=e(this).parent("select");t&&a[0]&&"select-one"==a[0].type&&a.find("option").selected(!1),this.selected=t}})},e.fn.ajaxSubmit.debug=!1})("undefined"!=typeof jQuery?jQuery:window.Zepto);
/*!
 * CSS Modal
 * http://drublic.github.com/css-modal
 *
 * @author Hans Christian Reinl - @drublic
 * @version 1.0.4
 */

(function (global) {

	'use strict';

	// Storage variable
	var modal = {};

	// Store for currently active element
	modal.lastActive = undefined;
	modal.activeElement = undefined;

	// Polyfill addEventListener for IE8 (only very basic)
	modal._addEventListener = function (element, event, callback) {
		if (element.addEventListener) {
			element.addEventListener(event, callback, false);
		} else {
			element.attachEvent('on' + event, callback);
		}
	};

	// Hide overlay when ESC is pressed
	modal._addEventListener(document, 'keyup', function (event) {
		var hash = window.location.hash.replace('#', '');

		// If hash is not set
		if (hash === '' || hash === '!') {
			return;
		}

		// If key ESC is pressed
		if (event.keyCode === 27) {
			window.location.hash = '!';

			if (modal.lastActive) {
				return false;
			}

			// Unfocus
			modal.removeFocus();
		}
	}, false);

	// Convenience function to trigger event
	modal._dispatchEvent = function (event, modal) {
		var eventTigger;

		if (!document.createEvent) {
			return;
		}

		eventTigger = document.createEvent('Event');

		eventTigger.initEvent(event, true, true);
		eventTigger.customData = { 'modal': modal };

		document.dispatchEvent(eventTigger);
	};


	// When showing overlay, prevent background from scrolling
	modal.mainHandler = function () {
		var hash = window.location.hash.replace('#', '');
		var modalElement = document.getElementById(hash);
		var htmlClasses = document.documentElement.className;
		var modalChild;
		var oldModal;

		// If the hash element exists
		if (modalElement) {

			// Get first element in selected element
			modalChild = modalElement.children[0];

			// When we deal with a modal and body-class `has-overlay` is not set
			if (modalChild && modalChild.className.match(/modal-inner/)) {
				if (!htmlClasses.match(/has-overlay/)) {

					// Set an html class to prevent scrolling
					document.documentElement.className += ' has-overlay';
				}

				// Unmark previous active element
				if (modal.activeElement) {
					oldModal = modal.activeElement;
					oldModal.className = oldModal.className.replace(' is-active', '');
				}
				// Mark modal as active
				modalElement.className += ' is-active';
				modal.activeElement = modalElement;

				// Set the focus to the modal
				modal.setFocus(hash);

				// Fire an event
				modal._dispatchEvent('cssmodal:show', modal.activeElement);
			}
		} else {
			document.documentElement.className =
					htmlClasses.replace(' has-overlay', '');

			// If activeElement is already defined, delete it
			if (modal.activeElement) {
				modal.activeElement.className =
						modal.activeElement.className.replace(' is-active', '');

				// Fire an event
				modal._dispatchEvent('cssmodal:hide', modal.activeElement);

				// Reset active element
				modal.activeElement = null;

				// Unfocus
				modal.removeFocus();
			}
		}
	};

	modal._addEventListener(window, 'hashchange', modal.mainHandler);
	modal._addEventListener(window, 'load', modal.mainHandler);

	/*
	 * Accessibility
	 */

	// Focus modal
	modal.setFocus = function () {
		if (modal.activeElement) {

			// Set element with last focus
			modal.lastActive = document.activeElement;

			// New focussing
			modal.activeElement.focus();
		}
	};

	// Unfocus
	modal.removeFocus = function () {
		if (modal.lastActive) {
			modal.lastActive.focus();
		}
	};

	// Export CSSModal into global space
	global.CSSModal = modal;

}(window));

/*! NProgress (c) 2013, Rico Sta. Cruz
 *  http://ricostacruz.com/nprogress */

;(function(factory) {

  if (typeof module === 'function') {
    module.exports = factory(this.jQuery || require('jquery'));
  } else if (typeof define === 'function' && define.amd) {
    define(['jquery'], function($) {
      return factory($);
    });
  } else {
    this.NProgress = factory(this.jQuery);
  }

})(function($) {
  var NProgress = {};

  NProgress.version = '0.1.2';

  var Settings = NProgress.settings = {
    minimum: 0.08,
    easing: 'ease',
    positionUsing: '',
    speed: 200,
    trickle: true,
    trickleRate: 0.02,
    trickleSpeed: 800,
    showSpinner: true,
    template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
  };

  /**
   * Updates configuration.
   *
   *     NProgress.configure({
   *       minimum: 0.1
   *     });
   */
  NProgress.configure = function(options) {
    $.extend(Settings, options);
    return this;
  };

  /**
   * Last number.
   */

  NProgress.status = null;

  /**
   * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
   *
   *     NProgress.set(0.4);
   *     NProgress.set(1.0);
   */

  NProgress.set = function(n) {
    var started = NProgress.isStarted();

    n = clamp(n, Settings.minimum, 1);
    NProgress.status = (n === 1 ? null : n);

    var $progress = NProgress.render(!started),
        $bar      = $progress.find('[role="bar"]'),
        speed     = Settings.speed,
        ease      = Settings.easing;

    $progress[0].offsetWidth; /* Repaint */

    $progress.queue(function(next) {
      // Set positionUsing if it hasn't already been set
      if (Settings.positionUsing === '') Settings.positionUsing = NProgress.getPositioningCSS();

      // Add transition
      $bar.css(barPositionCSS(n, speed, ease));

      if (n === 1) {
        // Fade out
        $progress.css({ transition: 'none', opacity: 1 });
        $progress[0].offsetWidth; /* Repaint */

        setTimeout(function() {
          $progress.css({ transition: 'all '+speed+'ms linear', opacity: 0 });
          setTimeout(function() {
            NProgress.remove();
            next();
          }, speed);
        }, speed);
      } else {
        setTimeout(next, speed);
      }
    });

    return this;
  };

  NProgress.isStarted = function() {
    return typeof NProgress.status === 'number';
  };

  /**
   * Shows the progress bar.
   * This is the same as setting the status to 0%, except that it doesn't go backwards.
   *
   *     NProgress.start();
   *
   */
  NProgress.start = function() {
    if (!NProgress.status) NProgress.set(0);

    var work = function() {
      setTimeout(function() {
        if (!NProgress.status) return;
        NProgress.trickle();
        work();
      }, Settings.trickleSpeed);
    };

    if (Settings.trickle) work();

    return this;
  };

  /**
   * Hides the progress bar.
   * This is the *sort of* the same as setting the status to 100%, with the
   * difference being `done()` makes some placebo effect of some realistic motion.
   *
   *     NProgress.done();
   *
   * If `true` is passed, it will show the progress bar even if its hidden.
   *
   *     NProgress.done(true);
   */

  NProgress.done = function(force) {
    if (!force && !NProgress.status) return this;

    return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
  };

  /**
   * Increments by a random amount.
   */

  NProgress.inc = function(amount) {
    var n = NProgress.status;

    if (!n) {
      return NProgress.start();
    } else {
      if (typeof amount !== 'number') {
        amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
      }

      n = clamp(n + amount, 0, 0.994);
      return NProgress.set(n);
    }
  };

  NProgress.trickle = function() {
    return NProgress.inc(Math.random() * Settings.trickleRate);
  };

  /**
   * Waits for all supplied jQuery promises and
   * increases the progress as the promises resolve.
   * 
   * @param $promise jQUery Promise
   */
  (function() {
    var initial = 0, current = 0;
    
    NProgress.promise = function($promise) {
      if (!$promise || $promise.state() == "resolved") {
        return this;
      }
      
      if (current == 0) {
        NProgress.start();
      }
      
      initial++;
      current++;
      
      $promise.always(function() {
        current--;
        if (current == 0) {
            initial = 0;
            NProgress.done();
        } else {
            NProgress.set((initial - current) / initial);
        }
      });
      
      return this;
    };
    
  })();

  /**
   * (Internal) renders the progress bar markup based on the `template`
   * setting.
   */

  NProgress.render = function(fromStart) {
    if (NProgress.isRendered()) return $("#nprogress");
    $('html').addClass('nprogress-busy');

    var $el = $("<div id='nprogress'>")
      .html(Settings.template);

    var perc = fromStart ? '-100' : toBarPerc(NProgress.status || 0);

    $el.find('[role="bar"]').css({
      transition: 'all 0 linear',
      transform: 'translate3d('+perc+'%,0,0)'
    });

    if (!Settings.showSpinner)
      $el.find('[role="spinner"]').remove();

    $el.appendTo(document.body);

    return $el;
  };

  /**
   * Removes the element. Opposite of render().
   */

  NProgress.remove = function() {
    $('html').removeClass('nprogress-busy');
    $('#nprogress').remove();
  };

  /**
   * Checks if the progress bar is rendered.
   */

  NProgress.isRendered = function() {
    return ($("#nprogress").length > 0);
  };

  /**
   * Determine which positioning CSS rule to use.
   */

  NProgress.getPositioningCSS = function() {
    // Sniff on document.body.style
    var bodyStyle = document.body.style;

    // Sniff prefixes
    var vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit' :
                       ('MozTransform' in bodyStyle) ? 'Moz' :
                       ('msTransform' in bodyStyle) ? 'ms' :
                       ('OTransform' in bodyStyle) ? 'O' : '';

    if (vendorPrefix + 'Perspective' in bodyStyle) {
      // Modern browsers with 3D support, e.g. Webkit, IE10
      return 'translate3d';
    } else if (vendorPrefix + 'Transform' in bodyStyle) {
      // Browsers without 3D support, e.g. IE9
      return 'translate';
    } else {
      // Browsers without translate() support, e.g. IE7-8
      return 'margin';
    }
  };

  /**
   * Helpers
   */

  function clamp(n, min, max) {
    if (n < min) return min;
    if (n > max) return max;
    return n;
  }

  /**
   * (Internal) converts a percentage (`0..1`) to a bar translateX
   * percentage (`-100%..0%`).
   */

  function toBarPerc(n) {
    return (-1 + n) * 100;
  }


  /**
   * (Internal) returns the correct CSS for changing the bar's
   * position given an n percentage, and speed and ease from Settings
   */

  function barPositionCSS(n, speed, ease) {
    var barCSS;

    if (Settings.positionUsing === 'translate3d') {
      barCSS = { transform: 'translate3d('+toBarPerc(n)+'%,0,0)' };
    } else if (Settings.positionUsing === 'translate') {
      barCSS = { transform: 'translate('+toBarPerc(n)+'%,0)' };
    } else {
      barCSS = { 'margin-left': toBarPerc(n)+'%' };
    }

    barCSS.transition = 'all '+speed+'ms '+ease;

    return barCSS;
  }

  return NProgress;
});


(function(){function t(e,t){return[].slice.call((t||document).querySelectorAll(e))}if(!window.addEventListener)return;var e=window.StyleFix={link:function(t){try{if(t.rel!=="stylesheet"||t.hasAttribute("data-noprefix"))return}catch(n){return}var r=t.href||t.getAttribute("data-href"),i=r.replace(/[^\/]+$/,""),s=(/^[a-z]{3,10}:/.exec(i)||[""])[0],o=(/^[a-z]{3,10}:\/\/[^\/]+/.exec(i)||[""])[0],u=/^([^?]*)\??/.exec(r)[1],a=t.parentNode,f=new XMLHttpRequest,l;f.onreadystatechange=function(){f.readyState===4&&l()};l=function(){var n=f.responseText;if(n&&t.parentNode&&(!f.status||f.status<400||f.status>600)){n=e.fix(n,!0,t);if(i){n=n.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi,function(e,t,n){return/^([a-z]{3,10}:|#)/i.test(n)?e:/^\/\//.test(n)?'url("'+s+n+'")':/^\//.test(n)?'url("'+o+n+'")':/^\?/.test(n)?'url("'+u+n+'")':'url("'+i+n+'")'});var r=i.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g,"\\$1");n=n.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)"+r,"gi"),"$1")}var l=document.createElement("style");l.textContent=n;l.media=t.media;l.disabled=t.disabled;l.setAttribute("data-href",t.getAttribute("href"));a.insertBefore(l,t);a.removeChild(t);l.media=t.media}};try{f.open("GET",r);f.send(null)}catch(n){if(typeof XDomainRequest!="undefined"){f=new XDomainRequest;f.onerror=f.onprogress=function(){};f.onload=l;f.open("GET",r);f.send(null)}}t.setAttribute("data-inprogress","")},styleElement:function(t){if(t.hasAttribute("data-noprefix"))return;var n=t.disabled;t.textContent=e.fix(t.textContent,!0,t);t.disabled=n},styleAttribute:function(t){var n=t.getAttribute("style");n=e.fix(n,!1,t);t.setAttribute("style",n)},process:function(){t('link[rel="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link);t("style").forEach(StyleFix.styleElement);t("[style]").forEach(StyleFix.styleAttribute)},register:function(t,n){(e.fixers=e.fixers||[]).splice(n===undefined?e.fixers.length:n,0,t)},fix:function(t,n,r){for(var i=0;i<e.fixers.length;i++)t=e.fixers[i](t,n,r)||t;return t},camelCase:function(e){return e.replace(/-([a-z])/g,function(e,t){return t.toUpperCase()}).replace("-","")},deCamelCase:function(e){return e.replace(/[A-Z]/g,function(e){return"-"+e.toLowerCase()})}};(function(){setTimeout(function(){t('link[rel="stylesheet"]').forEach(StyleFix.link)},10);document.addEventListener("DOMContentLoaded",StyleFix.process,!1)})()})();(function(e){function t(e,t,r,i,s){e=n[e];if(e.length){var o=RegExp(t+"("+e.join("|")+")"+r,"gi");s=s.replace(o,i)}return s}if(!window.StyleFix||!window.getComputedStyle)return;var n=window.PrefixFree={prefixCSS:function(e,r,i){var s=n.prefix;n.functions.indexOf("linear-gradient")>-1&&(e=e.replace(/(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/ig,function(e,t,n,r){return t+(n||"")+"linear-gradient("+(90-r)+"deg"}));e=t("functions","(\\s|:|,)","\\s*\\(","$1"+s+"$2(",e);e=t("keywords","(\\s|:)","(\\s|;|\\}|$)","$1"+s+"$2$3",e);e=t("properties","(^|\\{|\\s|;)","\\s*:","$1"+s+"$2:",e);if(n.properties.length){var o=RegExp("\\b("+n.properties.join("|")+")(?!:)","gi");e=t("valueProperties","\\b",":(.+?);",function(e){return e.replace(o,s+"$1")},e)}if(r){e=t("selectors","","\\b",n.prefixSelector,e);e=t("atrules","@","\\b","@"+s+"$1",e)}e=e.replace(RegExp("-"+s,"g"),"-");e=e.replace(/-\*-(?=[a-z]+)/gi,n.prefix);return e},property:function(e){return(n.properties.indexOf(e)?n.prefix:"")+e},value:function(e,r){e=t("functions","(^|\\s|,)","\\s*\\(","$1"+n.prefix+"$2(",e);e=t("keywords","(^|\\s)","(\\s|$)","$1"+n.prefix+"$2$3",e);return e},prefixSelector:function(e){return e.replace(/^:{1,2}/,function(e){return e+n.prefix})},prefixProperty:function(e,t){var r=n.prefix+e;return t?StyleFix.camelCase(r):r}};(function(){var e={},t=[],r={},i=getComputedStyle(document.documentElement,null),s=document.createElement("div").style,o=function(n){if(n.charAt(0)==="-"){t.push(n);var r=n.split("-"),i=r[1];e[i]=++e[i]||1;while(r.length>3){r.pop();var s=r.join("-");u(s)&&t.indexOf(s)===-1&&t.push(s)}}},u=function(e){return StyleFix.camelCase(e)in s};if(i.length>0)for(var a=0;a<i.length;a++)o(i[a]);else for(var f in i)o(StyleFix.deCamelCase(f));var l={uses:0};for(var c in e){var h=e[c];l.uses<h&&(l={prefix:c,uses:h})}n.prefix="-"+l.prefix+"-";n.Prefix=StyleFix.camelCase(n.prefix);n.properties=[];for(var a=0;a<t.length;a++){var f=t[a];if(f.indexOf(n.prefix)===0){var p=f.slice(n.prefix.length);u(p)||n.properties.push(p)}}n.Prefix=="Ms"&&!("transform"in s)&&!("MsTransform"in s)&&"msTransform"in s&&n.properties.push("transform","transform-origin");n.properties.sort()})();(function(){function i(e,t){r[t]="";r[t]=e;return!!r[t]}var e={"linear-gradient":{property:"backgroundImage",params:"red, teal"},calc:{property:"width",params:"1px + 5%"},element:{property:"backgroundImage",params:"#foo"},"cross-fade":{property:"backgroundImage",params:"url(a.png), url(b.png), 50%"}};e["repeating-linear-gradient"]=e["repeating-radial-gradient"]=e["radial-gradient"]=e["linear-gradient"];var t={initial:"color","zoom-in":"cursor","zoom-out":"cursor",box:"display",flexbox:"display","inline-flexbox":"display",flex:"display","inline-flex":"display",grid:"display","inline-grid":"display","min-content":"width"};n.functions=[];n.keywords=[];var r=document.createElement("div").style;for(var s in e){var o=e[s],u=o.property,a=s+"("+o.params+")";!i(a,u)&&i(n.prefix+a,u)&&n.functions.push(s)}for(var f in t){var u=t[f];!i(f,u)&&i(n.prefix+f,u)&&n.keywords.push(f)}})();(function(){function s(e){i.textContent=e+"{}";return!!i.sheet.cssRules.length}var t={":read-only":null,":read-write":null,":any-link":null,"::selection":null},r={keyframes:"name",viewport:null,document:'regexp(".")'};n.selectors=[];n.atrules=[];var i=e.appendChild(document.createElement("style"));for(var o in t){var u=o+(t[o]?"("+t[o]+")":"");!s(u)&&s(n.prefixSelector(u))&&n.selectors.push(o)}for(var a in r){var u=a+" "+(r[a]||"");!s("@"+u)&&s("@"+n.prefix+u)&&n.atrules.push(a)}e.removeChild(i)})();n.valueProperties=["transition","transition-property"];e.className+=" "+n.prefix;StyleFix.register(n.prefixCSS)})(document.documentElement);
var niveaux = function(enable) {
	var n;
	if (enable === null || enable === undefined
		|| enable === "")
	{
		n = {low: {label: ""}, med: {label: ""}, high: {label: ""}};
	}
	else
	{
		n = {
			low: {enable: enable, label: ""},
			med: {enable: enable, label: ""},
			high: {enable: enable, label: ""}
		};
	}
	return n;
};




// Avoid `console` errors in browsers that lack a console.
(function() {
	var method;
	var noop = function() {
	};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}
}());

window.formChanged = false;

var saveToDatabase = function()
{
	if (window.formChanged)
	{
		$("#form-competences").trigger('submit');
	}
	window.formChanged = false;
};

function addCheckHandler(toCheck)
{
	$(".radio input").change(function() {
		console.log("change !");
		window.formChanged = true;
	});

	// Mise à jour des champs
	for (elt in toCheck)
	{
		$("input#" + toCheck[elt]).attr("checked", "checked");
	}
}
;

// pre-submit callback 
function showRequest(formData, jqForm, options) {
	NProgress.start();
	$('a[role="indicator"]').html("<span class='icon-hourglass'></span> Enregistrement...");
	//var queryString = $.param(formData);
	return true;
}

// post-submit callback 
function showResponse(responseText, statusText, xhr, $form) {
	NProgress.done();
	$('a[role="indicator"]').html("<span class='icon-checkmark2'></span> Enregistré.");
}

var initalizeForm = function() {
	var options = {
		target: '#form-result', // target element(s) to be updated with server response 
		beforeSubmit: showRequest, // pre-submit callback 
		success: showResponse, // post-submit callback 
		url: "modules/updatecompetence.php",
		type: "post"        // 'get' or 'post', override for form's 'method' attribute 
	};

	$('#form-competences').submit(function() {
		// inside event callbacks 'this' is the DOM element so we first 
		// wrap it in a jQuery object and then invoke ajaxSubmit 
		$(this).ajaxSubmit(options);

		// !!! Important !!! 
		// always return false to prevent standard browser submit and page navigation 
		return false;
	});
	addClearItems();

	// La sauvegarde auto
	setInterval(saveToDatabase, 5000);
};

// pre-submit callback 
function showAddRequest(formData, jqForm, options) {
	NProgress.start();
	$('a[role="indicator"]').html("<span class='icon-hourglass'></span> Ajout...");
	$("#input-nom-comp + button").html("<span class='icon-time'></span>");
	//var queryString = $.param(formData);
	return true;
}

// post-submit callback 
function showAddResponse(responseText, statusText, xhr, $form) {
	$('a[role="indicator"]').html("<span class='icon-checkmark2'></span> Ajouté.");
	$("#input-nom-comp + button").html("<span class='icon-chevron-right'></span>");
	console.log("responseText:", responseText);
	console.log("statusText:", statusText);
	var a = $(responseText);
	a.addClass("preparing");
	$("#form-competences > div").first().append(a);
	addCheckHandler(window.toCheck);
	setTimeout(function() {
		$.smoothScroll({ offset: ($(window).height()/2), scrollElement: null, scrollTarget: a });
		NProgress.done();
		a.addClass("complete").removeClass("preparing");
	}, 1000);
}

var initalizeAddForm = function() {
	var options = {
		target: '#form-result', // target element(s) to be updated with server response 
		beforeSubmit: showAddRequest, // pre-submit callback 
		success: showAddResponse, // post-submit callback 
		url: "modules/addcompetence.php",
		type: "post"        // 'get' or 'post', override for form's 'method' attribute 
	};

	$('#form-add-competence').submit(function() {
		// inside event callbacks 'this' is the DOM element so we first 
		// wrap it in a jQuery object and then invoke ajaxSubmit 
		console.log("initialized");
		$(this).ajaxSubmit(options);

		// !!! Important !!! 
		// always return false to prevent standard browser submit and page navigation 
		return false;
	});
};

var addClearItems = function()
{
	$('#form-competences fieldset').each(function() {
		var fieldset = $(this);
		var radioElt = fieldset.find(".radio input").first();
		if (fieldset.find(".clear-all").length == 0)
		{
			fieldset.append("<a class='clear-all' data-items='"
				+ radioElt.attr("name")
				+ "'><span class='icon-remove-circle'></span></a>");
		}
	});
	$("#form-competences fieldset a.clear-all").click(function() {
		var item = $(this);
		var concerned = item.parent().find("input[name='" + item.attr("data-items") + "']");
		$.ajax({
			url: "modules/deletecompetence.php",
			type: 'POST',
			data: {
				login: $("#form-login").val(),
				code: $("#form-code").val(),
				comp: item.attr("data-items")
			}
		}).done(function(data) {
			concerned.each(function() {
				if ($(this).is(":checked"))
				{
					$(this).removeAttr("checked");
				}
			});
		});
	});
};

var createFormCompetences = function()
{
	console.log("form competences");
	$("#form-competences div").makeForms({
		components: window.items,
		groupSize: 1,
		templates:
			{
				title: "<h4>{{title}}</h4>",
				group: '<fieldset>{{group}}</fieldset>',
				label: '<label for="{{id}}">{{label}}</label>',
				radio: '<div class="radio"><input type="radio" name="{{name}}"\
	id="{{id}}" value="{{value}}">{{label}}<label for="{{id}}"></label></div>',
				input: '<input class="form-control" type="{{type}}" name="{{name}}"\
	id="{{id}}" value="{{value}}">',
				text: '<input class="form-control" type="text" name="{{name}}"\
	id="{{id}}" value="{{value}}">',
				select: '<select class="form-control" id="{{id}}" name="{{name}}">\n\
	<option id="{{id}}" value="">Aucun</option>{{options}}</select>',
				option: '<option id="{{id}}" value="{{value}}">{{label}}</option>'
			}
	});
	/*$("div.radio input + label").click(function()
	 {
	 console.log("ok");
	 var elt = $(this).parent().children("input");
	 if(elt.is(":checked"))
	 {
	 elt.prop('checked', false);
	 }
	 });*/
};

var treatResize = function()
{
	if ($("div[data-role='container']").height() >= $(window).height())
	{
		$(".footer-container").addClass("nofix");
	}
	else
	{
		$(".footer-container").removeClass("nofix");
	}
};

window.createFormCompetences = createFormCompetences;




$(document).ready(function()
{
	initalizeForm();
	$("input").change(function() {
		console.log("change !");
	});
	NProgress.configure({showSpinner: false});
	$("a").smoothScroll();

	treatResize();
	$(window).resize(treatResize);

	/**
	 * Json calls to Github Api
	 * @type @exp;$@call;getJSON
	 */
	$.getJSON("https://api.github.com/repos/lambda2/Muffin/tags", function(dataT)
	{
		console.log(dataT);
		var lastSha = dataT[0].commit.sha;
		$.getJSON("https://api.github.com/repos/lambda2/Muffin/commits/" + lastSha, function(dataC)
		{
			var lastCommit = dataC;
			var cDate = lastCommit.commit.committer.date.slice(0, 10);
			var cAdd = lastCommit.stats.additions;
			var cDel = lastCommit.stats.deletions;
			var cTot = lastCommit.stats.additions;
			var cStats = "<span class='icon-flow-tree'></span> <span class='git-add'>+" + cAdd + "</span>  <span class='git-del'>-" + cDel + "</span>";
			$("div[role='git-info']").html("<p>\n\
				<a href='https://github.com/lambda2/Muffin'><span class='icon-github'></span>\n\
				v" + dataT[0].name + " datant du " + cDate + "  ─  " + cStats + "</a> </p>")
		});
	});
});
