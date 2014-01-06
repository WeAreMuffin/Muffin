
/*******************************************************************************    
                                                      
        sssyhddmmmddhys                        
      dNNNNNmss  sssyhmNddms                   
     dNNNNmhs         dNNNNNs           
   sNd sy     mNNmdy   sdNNNNs        Muffin - v1.1.4     
   Nd        dNNNNNy      ysNm        ---------------
  sNh           ssy         mN                        
   mNymdhy          shddmy hNd       Sorti du four le 2014-01-06
   sdNNNNNmsssssssssmNNNNNNNh             
     syyhddddddddddddddhhyss         Copyright (c) 2014 André Aubin
    sNNm shhh shhh shhd smNN                    
     dNNssNNN yNNN sNNN hNNy         Code source sous licence Apache 2      
     sNNy NNN yNNN sNNm dNN                    
      hNh mNN yNNN sNNd mNy             
          ydd smmm sdds                 

*******************************************************************************/;(function(e){"use strict";function t(t){var r=t.data;t.isDefaultPrevented()||(t.preventDefault(),e(t.target).ajaxSubmit(r))}function r(t){var r=t.target,a=e(r);if(!a.is("[type=submit],[type=image]")){var n=a.closest("[type=submit]");if(0===n.length)return;r=n[0]}var i=this;if(i.clk=r,"image"==r.type)if(void 0!==t.offsetX)i.clk_x=t.offsetX,i.clk_y=t.offsetY;else if("function"==typeof e.fn.offset){var o=a.offset();i.clk_x=t.pageX-o.left,i.clk_y=t.pageY-o.top}else i.clk_x=t.pageX-r.offsetLeft,i.clk_y=t.pageY-r.offsetTop;setTimeout(function(){i.clk=i.clk_x=i.clk_y=null},100)}function a(){if(e.fn.ajaxSubmit.debug){var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}}var n={};n.fileapi=void 0!==e("<input type='file'/>").get(0).files,n.formdata=void 0!==window.FormData;var i=!!e.fn.prop;e.fn.attr2=function(){if(!i)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},e.fn.ajaxSubmit=function(t){function r(r){var a,n,i=e.param(r,t.traditional).split("&"),o=i.length,s=[];for(a=0;o>a;a++)i[a]=i[a].replace(/\+/g," "),n=i[a].split("="),s.push([decodeURIComponent(n[0]),decodeURIComponent(n[1])]);return s}function o(a){for(var n=new FormData,i=0;a.length>i;i++)n.append(a[i].name,a[i].value);if(t.extraData){var o=r(t.extraData);for(i=0;o.length>i;i++)o[i]&&n.append(o[i][0],o[i][1])}t.data=null;var s=e.extend(!0,{},e.ajaxSettings,t,{contentType:!1,processData:!1,cache:!1,type:u||"POST"});t.uploadProgress&&(s.xhr=function(){var r=e.ajaxSettings.xhr();return r.upload&&r.upload.addEventListener("progress",function(e){var r=0,a=e.loaded||e.position,n=e.total;e.lengthComputable&&(r=Math.ceil(100*(a/n))),t.uploadProgress(e,a,n,r)},!1),r}),s.data=null;var l=s.beforeSend;return s.beforeSend=function(e,r){r.data=t.formData?t.formData:n,l&&l.call(this,e,r)},e.ajax(s)}function s(r){function n(e){var t=null;try{e.contentWindow&&(t=e.contentWindow.document)}catch(r){a("cannot get iframe.contentWindow document: "+r)}if(t)return t;try{t=e.contentDocument?e.contentDocument:e.document}catch(r){a("cannot get iframe.contentDocument: "+r),t=e.document}return t}function o(){function t(){try{var e=n(g).readyState;a("state = "+e),e&&"uninitialized"==e.toLowerCase()&&setTimeout(t,50)}catch(r){a("Server abort: ",r," (",r.name,")"),s(k),j&&clearTimeout(j),j=void 0}}var r=f.attr2("target"),i=f.attr2("action");w.setAttribute("target",d),(!u||/post/i.test(u))&&w.setAttribute("method","POST"),i!=m.url&&w.setAttribute("action",m.url),m.skipEncodingOverride||u&&!/post/i.test(u)||f.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),m.timeout&&(j=setTimeout(function(){T=!0,s(D)},m.timeout));var o=[];try{if(m.extraData)for(var l in m.extraData)m.extraData.hasOwnProperty(l)&&(e.isPlainObject(m.extraData[l])&&m.extraData[l].hasOwnProperty("name")&&m.extraData[l].hasOwnProperty("value")?o.push(e('<input type="hidden" name="'+m.extraData[l].name+'">').val(m.extraData[l].value).appendTo(w)[0]):o.push(e('<input type="hidden" name="'+l+'">').val(m.extraData[l]).appendTo(w)[0]));m.iframeTarget||v.appendTo("body"),g.attachEvent?g.attachEvent("onload",s):g.addEventListener("load",s,!1),setTimeout(t,15);try{w.submit()}catch(c){var p=document.createElement("form").submit;p.apply(w)}}finally{w.setAttribute("action",i),r?w.setAttribute("target",r):f.removeAttr("target"),e(o).remove()}}function s(t){if(!x.aborted&&!F){if(M=n(g),M||(a("cannot access response document"),t=k),t===D&&x)return x.abort("timeout"),S.reject(x,"timeout"),void 0;if(t==k&&x)return x.abort("server abort"),S.reject(x,"error","server abort"),void 0;if(M&&M.location.href!=m.iframeSrc||T){g.detachEvent?g.detachEvent("onload",s):g.removeEventListener("load",s,!1);var r,i="success";try{if(T)throw"timeout";var o="xml"==m.dataType||M.XMLDocument||e.isXMLDoc(M);if(a("isXml="+o),!o&&window.opera&&(null===M.body||!M.body.innerHTML)&&--O)return a("requeing onLoad callback, DOM not available"),setTimeout(s,250),void 0;var u=M.body?M.body:M.documentElement;x.responseText=u?u.innerHTML:null,x.responseXML=M.XMLDocument?M.XMLDocument:M,o&&(m.dataType="xml"),x.getResponseHeader=function(e){var t={"content-type":m.dataType};return t[e.toLowerCase()]},u&&(x.status=Number(u.getAttribute("status"))||x.status,x.statusText=u.getAttribute("statusText")||x.statusText);var l=(m.dataType||"").toLowerCase(),c=/(json|script|text)/.test(l);if(c||m.textarea){var f=M.getElementsByTagName("textarea")[0];if(f)x.responseText=f.value,x.status=Number(f.getAttribute("status"))||x.status,x.statusText=f.getAttribute("statusText")||x.statusText;else if(c){var d=M.getElementsByTagName("pre")[0],h=M.getElementsByTagName("body")[0];d?x.responseText=d.textContent?d.textContent:d.innerText:h&&(x.responseText=h.textContent?h.textContent:h.innerText)}}else"xml"==l&&!x.responseXML&&x.responseText&&(x.responseXML=X(x.responseText));try{E=_(x,l,m)}catch(b){i="parsererror",x.error=r=b||i}}catch(b){a("error caught: ",b),i="error",x.error=r=b||i}x.aborted&&(a("upload aborted"),i=null),x.status&&(i=x.status>=200&&300>x.status||304===x.status?"success":"error"),"success"===i?(m.success&&m.success.call(m.context,E,"success",x),S.resolve(x.responseText,"success",x),p&&e.event.trigger("ajaxSuccess",[x,m])):i&&(void 0===r&&(r=x.statusText),m.error&&m.error.call(m.context,x,i,r),S.reject(x,"error",r),p&&e.event.trigger("ajaxError",[x,m,r])),p&&e.event.trigger("ajaxComplete",[x,m]),p&&!--e.active&&e.event.trigger("ajaxStop"),m.complete&&m.complete.call(m.context,x,i),F=!0,m.timeout&&clearTimeout(j),setTimeout(function(){m.iframeTarget?v.attr("src",m.iframeSrc):v.remove(),x.responseXML=null},100)}}}var l,c,m,p,d,v,g,x,b,y,T,j,w=f[0],S=e.Deferred();if(S.abort=function(e){x.abort(e)},r)for(c=0;h.length>c;c++)l=e(h[c]),i?l.prop("disabled",!1):l.removeAttr("disabled");if(m=e.extend(!0,{},e.ajaxSettings,t),m.context=m.context||m,d="jqFormIO"+(new Date).getTime(),m.iframeTarget?(v=e(m.iframeTarget),y=v.attr2("name"),y?d=y:v.attr2("name",d)):(v=e('<iframe name="'+d+'" src="'+m.iframeSrc+'" />'),v.css({position:"absolute",top:"-1000px",left:"-1000px"})),g=v[0],x={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var r="timeout"===t?"timeout":"aborted";a("aborting upload... "+r),this.aborted=1;try{g.contentWindow.document.execCommand&&g.contentWindow.document.execCommand("Stop")}catch(n){}v.attr("src",m.iframeSrc),x.error=r,m.error&&m.error.call(m.context,x,r,t),p&&e.event.trigger("ajaxError",[x,m,r]),m.complete&&m.complete.call(m.context,x,r)}},p=m.global,p&&0===e.active++&&e.event.trigger("ajaxStart"),p&&e.event.trigger("ajaxSend",[x,m]),m.beforeSend&&m.beforeSend.call(m.context,x,m)===!1)return m.global&&e.active--,S.reject(),S;if(x.aborted)return S.reject(),S;b=w.clk,b&&(y=b.name,y&&!b.disabled&&(m.extraData=m.extraData||{},m.extraData[y]=b.value,"image"==b.type&&(m.extraData[y+".x"]=w.clk_x,m.extraData[y+".y"]=w.clk_y)));var D=1,k=2,A=e("meta[name=csrf-token]").attr("content"),L=e("meta[name=csrf-param]").attr("content");L&&A&&(m.extraData=m.extraData||{},m.extraData[L]=A),m.forceSync?o():setTimeout(o,10);var E,M,F,O=50,X=e.parseXML||function(e,t){return window.ActiveXObject?(t=new ActiveXObject("Microsoft.XMLDOM"),t.async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!=t.documentElement.nodeName?t:null},C=e.parseJSON||function(e){return window.eval("("+e+")")},_=function(t,r,a){var n=t.getResponseHeader("content-type")||"",i="xml"===r||!r&&n.indexOf("xml")>=0,o=i?t.responseXML:t.responseText;return i&&"parsererror"===o.documentElement.nodeName&&e.error&&e.error("parsererror"),a&&a.dataFilter&&(o=a.dataFilter(o,r)),"string"==typeof o&&("json"===r||!r&&n.indexOf("json")>=0?o=C(o):("script"===r||!r&&n.indexOf("javascript")>=0)&&e.globalEval(o)),o};return S}if(!this.length)return a("ajaxSubmit: skipping submit process - no element selected"),this;var u,l,c,f=this;"function"==typeof t?t={success:t}:void 0===t&&(t={}),u=t.type||this.attr2("method"),l=t.url||this.attr2("action"),c="string"==typeof l?e.trim(l):"",c=c||window.location.href||"",c&&(c=(c.match(/^([^#]+)/)||[])[1]),t=e.extend(!0,{url:c,success:e.ajaxSettings.success,type:u||e.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},t);var m={};if(this.trigger("form-pre-serialize",[this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(t.beforeSerialize&&t.beforeSerialize(this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var p=t.traditional;void 0===p&&(p=e.ajaxSettings.traditional);var d,h=[],v=this.formToArray(t.semantic,h);if(t.data&&(t.extraData=t.data,d=e.param(t.data,p)),t.beforeSubmit&&t.beforeSubmit(v,this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[v,this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var g=e.param(v,p);d&&(g=g?g+"&"+d:d),"GET"==t.type.toUpperCase()?(t.url+=(t.url.indexOf("?")>=0?"&":"?")+g,t.data=null):t.data=g;var x=[];if(t.resetForm&&x.push(function(){f.resetForm()}),t.clearForm&&x.push(function(){f.clearForm(t.includeHidden)}),!t.dataType&&t.target){var b=t.success||function(){};x.push(function(r){var a=t.replaceTarget?"replaceWith":"html";e(t.target)[a](r).each(b,arguments)})}else t.success&&x.push(t.success);if(t.success=function(e,r,a){for(var n=t.context||this,i=0,o=x.length;o>i;i++)x[i].apply(n,[e,r,a||f,f])},t.error){var y=t.error;t.error=function(e,r,a){var n=t.context||this;y.apply(n,[e,r,a,f])}}if(t.complete){var T=t.complete;t.complete=function(e,r){var a=t.context||this;T.apply(a,[e,r,f])}}var j=e("input[type=file]:enabled",this).filter(function(){return""!==e(this).val()}),w=j.length>0,S="multipart/form-data",D=f.attr("enctype")==S||f.attr("encoding")==S,k=n.fileapi&&n.formdata;a("fileAPI :"+k);var A,L=(w||D)&&!k;t.iframe!==!1&&(t.iframe||L)?t.closeKeepAlive?e.get(t.closeKeepAlive,function(){A=s(v)}):A=s(v):A=(w||D)&&k?o(v):e.ajax(t),f.removeData("jqxhr").data("jqxhr",A);for(var E=0;h.length>E;E++)h[E]=null;return this.trigger("form-submit-notify",[this,t]),this},e.fn.ajaxForm=function(n){if(n=n||{},n.delegation=n.delegation&&e.isFunction(e.fn.on),!n.delegation&&0===this.length){var i={s:this.selector,c:this.context};return!e.isReady&&i.s?(a("DOM not ready, queuing ajaxForm"),e(function(){e(i.s,i.c).ajaxForm(n)}),this):(a("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)")),this)}return n.delegation?(e(document).off("submit.form-plugin",this.selector,t).off("click.form-plugin",this.selector,r).on("submit.form-plugin",this.selector,n,t).on("click.form-plugin",this.selector,n,r),this):this.ajaxFormUnbind().bind("submit.form-plugin",n,t).bind("click.form-plugin",n,r)},e.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")},e.fn.formToArray=function(t,r){var a=[];if(0===this.length)return a;var i=this[0],o=t?i.getElementsByTagName("*"):i.elements;if(!o)return a;var s,u,l,c,f,m,p;for(s=0,m=o.length;m>s;s++)if(f=o[s],l=f.name,l&&!f.disabled)if(t&&i.clk&&"image"==f.type)i.clk==f&&(a.push({name:l,value:e(f).val(),type:f.type}),a.push({name:l+".x",value:i.clk_x},{name:l+".y",value:i.clk_y}));else if(c=e.fieldValue(f,!0),c&&c.constructor==Array)for(r&&r.push(f),u=0,p=c.length;p>u;u++)a.push({name:l,value:c[u]});else if(n.fileapi&&"file"==f.type){r&&r.push(f);var d=f.files;if(d.length)for(u=0;d.length>u;u++)a.push({name:l,value:d[u],type:f.type});else a.push({name:l,value:"",type:f.type})}else null!==c&&c!==void 0&&(r&&r.push(f),a.push({name:l,value:c,type:f.type,required:f.required}));if(!t&&i.clk){var h=e(i.clk),v=h[0];l=v.name,l&&!v.disabled&&"image"==v.type&&(a.push({name:l,value:h.val()}),a.push({name:l+".x",value:i.clk_x},{name:l+".y",value:i.clk_y}))}return a},e.fn.formSerialize=function(t){return e.param(this.formToArray(t))},e.fn.fieldSerialize=function(t){var r=[];return this.each(function(){var a=this.name;if(a){var n=e.fieldValue(this,t);if(n&&n.constructor==Array)for(var i=0,o=n.length;o>i;i++)r.push({name:a,value:n[i]});else null!==n&&n!==void 0&&r.push({name:this.name,value:n})}}),e.param(r)},e.fn.fieldValue=function(t){for(var r=[],a=0,n=this.length;n>a;a++){var i=this[a],o=e.fieldValue(i,t);null===o||void 0===o||o.constructor==Array&&!o.length||(o.constructor==Array?e.merge(r,o):r.push(o))}return r},e.fieldValue=function(t,r){var a=t.name,n=t.type,i=t.tagName.toLowerCase();if(void 0===r&&(r=!0),r&&(!a||t.disabled||"reset"==n||"button"==n||("checkbox"==n||"radio"==n)&&!t.checked||("submit"==n||"image"==n)&&t.form&&t.form.clk!=t||"select"==i&&-1==t.selectedIndex))return null;if("select"==i){var o=t.selectedIndex;if(0>o)return null;for(var s=[],u=t.options,l="select-one"==n,c=l?o+1:u.length,f=l?o:0;c>f;f++){var m=u[f];if(m.selected){var p=m.value;if(p||(p=m.attributes&&m.attributes.value&&!m.attributes.value.specified?m.text:m.value),l)return p;s.push(p)}}return s}return e(t).val()},e.fn.clearForm=function(t){return this.each(function(){e("input,select,textarea",this).clearFields(t)})},e.fn.clearFields=e.fn.clearInputs=function(t){var r=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var a=this.type,n=this.tagName.toLowerCase();r.test(a)||"textarea"==n?this.value="":"checkbox"==a||"radio"==a?this.checked=!1:"select"==n?this.selectedIndex=-1:"file"==a?/MSIE/.test(navigator.userAgent)?e(this).replaceWith(e(this).clone(!0)):e(this).val(""):t&&(t===!0&&/hidden/.test(a)||"string"==typeof t&&e(this).is(t))&&(this.value="")})},e.fn.resetForm=function(){return this.each(function(){("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset()})},e.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},e.fn.selected=function(t){return void 0===t&&(t=!0),this.each(function(){var r=this.type;if("checkbox"==r||"radio"==r)this.checked=t;else if("option"==this.tagName.toLowerCase()){var a=e(this).parent("select");t&&a[0]&&"select-one"==a[0].type&&a.find("option").selected(!1),this.selected=t}})},e.fn.ajaxSubmit.debug=!1})("undefined"!=typeof jQuery?jQuery:window.Zepto);
/*! makeforms - v0.0.3 - 2013-11-14
* https://github.com/lambda2/MakeForms
* Copyright (c) 2013 André Aubin; Licensed Apache 2 */
(function(e){e.fn.makeForms=function(t){var o,n,a,r,i,l,p,s,u={},m={};t=e.extend({components:{},groupSize:1,selectMinSize:18,position:"before",templates:{}},t),t.templates=e.extend({item:"{{item}}",title:"<p>{{title}}</p>",group:"<div data-role='group'>{{group}}</div>",item_group:"<div class='item-group'>{{items}}</div>",label:'<label for="{{id}}">{{label}}</label>',radio:'<label for="{{id}}"><input type="radio" name="{{name}}"	id="{{id}}" value="{{value}}">{{label}}</label>',text:'<input type="text" name="{{name}}"	id="{{id}}" value="{{value}}">',input:'<input type="{{type}}" name="{{name}}"	id="{{id}}" value="{{value}}">',select:'<select id="{{id}}" name="{{name}}">{{options}}</select>',option:'<option id="{{id}}" value="{{value}}">{{label}}</option>'},t.templates);var c=function(e,t){var o,n;o=e;for(n in t)-1!==o.search("{{"+n+"}}")&&t.hasOwnProperty(n)&&(o=o.replace("{{"+n+"}}",t[n]),o=c(o,t));return o},f=function(e){var t,o;t=0;for(o in e)t+=1;return t},d=function(e){var o,n;return e.hasOwnProperty("type")?o=e.type:(n=f(e.choices),o=1>=n?"text":t.selectMinSize>n?"radio":"option"),o},h=function(e,o,n,a){var r,i="";for(r in e){var l,p,s,u,m,f;"group"!==r&&(l=e[r],f=l.hasOwnProperty("type")?t.templates[l.type]:P,p=o+"_"+a+"_"+r,s=t.templates.label,u="option"!==n&&"radio"!==n?c(s,{label:l.label,id:p}):"",l.hasOwnProperty("value")||(l.value=a+"_"+r),m=c(f,{name:o,id:p,value:l.value,label:l.label}),l.hasOwnProperty("before")&&(m=l.before+m),l.hasOwnProperty("after")&&(m+=l.after),i=i+u+m)}return i},v=function(o,n){var a,r,i=[];for(a in o[n]){var l=o[n][a].slice(1);for(r in t.components[l].choices)i.push("#"+l+"_"+r);e(i.join(", ")).show()}return i},b=function(e,t){var o=0;if(e.hasOwnProperty("enable")){t in u==!1&&(u["#"+t]=[]);for(o=0;e.enable.length>o;o++)u["#"+t].push("#"+e.enable[o])}if(e.hasOwnProperty("disable")){t in m==!1&&(m["#"+t]=[]);for(o=0;e.disable.length>o;o++)m["#"+t].push("#"+e.disable[o])}},y=function(e,o,n,a){var r,i=!1;for(r in e){var l,p,s,u,m,f;if(l=e[r],i=l.group,i!==!0)f=l.hasOwnProperty("type")?t.templates[l.type]:P,p=o+"_"+r,s=t.templates.label,u="option"!==a&&"radio"!==a?c(s,{label:l.label,id:p}):"",b(l,p),l.hasOwnProperty("value")||(l.value=r),m=c(f,{name:o,id:p,value:l.value,label:l.label}),l.hasOwnProperty("before")&&(m=l.before+m),l.hasOwnProperty("after")&&(m+=l.after),_=_+u+m;else if(i===!0){var d="",v=h(l,o,a,r);d+=v,_+=c(t.templates.item_group,{items:d});var y=o+"_"+r+"_all";b(l,y)}}return _};r=[],i=[],l=f(t.components),a=e(this),n=0;for(o in t.components){var g,w,O,P,j,_;_="",j="",s="",g=o,w=t.components[o].label,O=d(t.components[o]),P=t.templates[O],s=t.templates.group,t.components[o].hasOwnProperty("title")&&(t.components[o].hasOwnProperty("beforeTitle")&&(j+=t.components[o].beforeTitle),j+=c(t.templates.title,{title:t.components[o].title}),t.components[o].hasOwnProperty("afterTitle")&&(j+=t.components[o].afterTitle),r.push(j)),n+=1,y(t.components[o].choices,g,w,O),"option"===O&&(_=c(t.templates.select,{name:g,id:g,options:_})),r.push(_),_="",0===t.groupSize||0!==n%t.groupSize&&n!==l||(p=c(s,{group:r.join("\n")}),i.push(p),t.groupSize>0&&(r=[]))}0===t.groupSize&&(p=c(s,{group:r.join("\n")}),i.push(p)),"before"===t.position?a.html(i.join("\n")+a.html()):"after"===t.position?a.html(a.html()+i.join("\n")):a.html(i.join("\n"));var z,S,x;for(z in u)x=v(u,z),e(x.join(", ")).parents("div[data-role='group']").hide(),e(z).click(function(){e(x.join(", ")).parents("div[data-role='group']").show()});for(S in m)x=v(m,S),e(S).click(function(){e(x.join(", ")).parents("div[data-role='group']").hide()});return this}})(jQuery);
/*!
 * Smooth Scroll - v1.4.12 - 2013-09-19
 * https://github.com/kswedberg/jquery-smooth-scroll
 * Copyright (c) 2013 Karl Swedberg
 * Licensed MIT (https://github.com/kswedberg/jquery-smooth-scroll/blob/master/LICENSE-MIT)
 */
(function(t){function l(t){return t.replace(/(:|\.)/g,"\\$1")}var e="1.4.12",o={exclude:[],excludeWithin:[],offset:0,direction:"top",scrollElement:null,scrollTarget:null,beforeScroll:function(){},afterScroll:function(){},easing:"swing",speed:400,autoCoefficent:2,preventDefault:!0},n=function(l){var e=[],o=!1,n=l.dir&&"left"==l.dir?"scrollLeft":"scrollTop";return this.each(function(){if(this!=document&&this!=window){var l=t(this);l[n]()>0?e.push(this):(l[n](1),o=l[n]()>0,o&&e.push(this),l[n](0))}}),e.length||this.each(function(){"BODY"===this.nodeName&&(e=[this])}),"first"===l.el&&e.length>1&&(e=[e[0]]),e};t.fn.extend({scrollable:function(t){var l=n.call(this,{dir:t});return this.pushStack(l)},firstScrollable:function(t){var l=n.call(this,{el:"first",dir:t});return this.pushStack(l)},smoothScroll:function(e){e=e||{};var o=t.extend({},t.fn.smoothScroll.defaults,e),n=t.smoothScroll.filterPath(location.pathname);return this.unbind("click.smoothscroll").bind("click.smoothscroll",function(e){var r=this,s=t(this),c=o.exclude,i=o.excludeWithin,a=0,f=0,h=!0,u={},d=location.hostname===r.hostname||!r.hostname,m=o.scrollTarget||(t.smoothScroll.filterPath(r.pathname)||n)===n,p=l(r.hash);if(o.scrollTarget||d&&m&&p){for(;h&&c.length>a;)s.is(l(c[a++]))&&(h=!1);for(;h&&i.length>f;)s.closest(i[f++]).length&&(h=!1)}else h=!1;h&&(o.preventDefault&&e.preventDefault(),t.extend(u,o,{scrollTarget:o.scrollTarget||p,link:r}),t.smoothScroll(u))}),this}}),t.smoothScroll=function(l,e){var o,n,r,s,c=0,i="offset",a="scrollTop",f={},h={};"number"==typeof l?(o=t.fn.smoothScroll.defaults,r=l):(o=t.extend({},t.fn.smoothScroll.defaults,l||{}),o.scrollElement&&(i="position","static"==o.scrollElement.css("position")&&o.scrollElement.css("position","relative"))),o=t.extend({link:null},o),a="left"==o.direction?"scrollLeft":a,o.scrollElement?(n=o.scrollElement,/^(?:HTML|BODY)$/.test(n[0].nodeName)||(c=n[a]())):n=t("html, body").firstScrollable(o.direction),o.beforeScroll.call(n,o),r="number"==typeof l?l:e||t(o.scrollTarget)[i]()&&t(o.scrollTarget)[i]()[o.direction]||0,f[a]=r+c+o.offset,s=o.speed,"auto"===s&&(s=f[a]||n.scrollTop(),s/=o.autoCoefficent),h={duration:s,easing:o.easing,complete:function(){o.afterScroll.call(o.link,o)}},o.step&&(h.step=o.step),n.length?n.stop().animate(f,h):o.afterScroll.call(o.link,o)},t.smoothScroll.version=e,t.smoothScroll.filterPath=function(t){return t.replace(/^\//,"").replace(/(?:index|default).[a-zA-Z]{3,4}$/,"").replace(/\/$/,"")},t.fn.smoothScroll.defaults=o})(jQuery);
(function() {
  var formats, getOrderedMatches, hasMatches, isIE, isSafari, log, makeArray, safariSupport, stringToArgs, _log;
  if (!(window.console && window.console.log)) {
    return;
  }
  log = function() {
    var args;
    args = [];
    makeArray(arguments).forEach(function(arg) {
      if (typeof arg === 'string') {
        return args = args.concat(stringToArgs(arg));
      } else {
        return args.push(arg);
      }
    });
    return _log.apply(window, args);
  };
  _log = function() {
    return console.log.apply(console, makeArray(arguments));
  };
  makeArray = function(arrayLikeThing) {
    return Array.prototype.slice.call(arrayLikeThing);
  };
  formats = [
    {
      regex: /\*([^\*)]+)\*/,
      replacer: function(m, p1) {
        return "%c" + p1 + "%c";
      },
      styles: function() {
        return ['font-style: italic', ''];
      }
    }, {
      regex: /\_([^\_)]+)\_/,
      replacer: function(m, p1) {
        return "%c" + p1 + "%c";
      },
      styles: function() {
        return ['font-weight: bold', ''];
      }
    }, {
      regex: /\`([^\`)]+)\`/,
      replacer: function(m, p1) {
        return "%c" + p1 + "%c";
      },
      styles: function() {
        return ['background: rgb(255, 255, 219); padding: 1px 5px; border: 1px solid rgba(0, 0, 0, 0.1)', ''];
      }
    }, {
      regex: /\[c\=\"([^\")]+)\"\]([^\[)]+)\[c\]/,
      replacer: function(m, p1, p2) {
        return "%c" + p2 + "%c";
      },
      styles: function(match) {
        return [match[1], ''];
      }
    }
  ];
  hasMatches = function(str) {
    var _hasMatches;
    _hasMatches = false;
    formats.forEach(function(format) {
      if (format.regex.test(str)) {
        return _hasMatches = true;
      }
    });
    return _hasMatches;
  };
  getOrderedMatches = function(str) {
    var matches;
    matches = [];
    formats.forEach(function(format) {
      var match;
      match = str.match(format.regex);
      if (match) {
        return matches.push({
          format: format,
          match: match
        });
      }
    });
    return matches.sort(function(a, b) {
      return a.match.index - b.match.index;
    });
  };
  stringToArgs = function(str) {
    var firstMatch, matches, styles;
    styles = [];
    while (hasMatches(str)) {
      matches = getOrderedMatches(str);
      firstMatch = matches[0];
      str = str.replace(firstMatch.format.regex, firstMatch.format.replacer);
      styles = styles.concat(firstMatch.format.styles(firstMatch.match));
    }
    return [str].concat(styles);
  };
  isSafari = function() {
    return /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
  };
  isIE = function() {
    return /MSIE/.test(navigator.userAgent);
  };
  safariSupport = function() {
    var m;
    m = navigator.userAgent.match(/AppleWebKit\/(\d+)\.(\d+)(\.|\+|\s)/);
    if (!m) {
      return false;
    }
    return 537.38 >= parseInt(m[1], 10) + (parseInt(m[2], 10) / 100);
  };
  if ((isSafari() && !safariSupport()) || isIE()) {
    window.log = _log;
  } else {
    window.log = log;
  }
  window.log.l = _log;
}).call(this);

(function($)
{
    "use strict";
    var MagicSuggest = function(element, options)
    {
        var ms = this;

        /**
         * Initializes the MagicSuggest component
         * @param defaults - see config below
         */
        var defaults = {
            /**********  CONFIGURATION PROPERTIES ************/
            /**
             * @cfg {Boolean} allowFreeEntries
             * <p>Restricts or allows the user to validate typed entries.</p>
             * Defaults to <code>true</code>.
             */
            allowFreeEntries: true,

            /**
             * @cfg {String} cls
             * <p>A custom CSS class to apply to the field's underlying element.</p>
             * Defaults to <code>''</code>.
             */
            cls: '',

            /**
             * @cfg {Array / String / Function} data
             * JSON Data source used to populate the combo box. 3 options are available here:<br/>
             * <p><u>No Data Source (default)</u><br/>
             *    When left null, the combo box will not suggest anything. It can still enable the user to enter
             *    multiple entries if allowFreeEntries is * set to true (default).</p>
             * <p><u>Static Source</u><br/>
             *    You can pass an array of JSON objects, an array of strings or even a single CSV string as the
             *    data source.<br/>For ex. data: [* {id:0,name:"Paris"}, {id: 1, name: "New York"}]<br/>
             *    You can also pass any json object with the results property containing the json array.</p>
             * <p><u>Url</u><br/>
             *     You can pass the url from which the component will fetch its JSON data.<br/>Data will be fetched
             *     using a POST ajax request that will * include the entered text as 'query' parameter. The results
             *     fetched from the server can be: <br/>
             *     - an array of JSON objects (ex: [{id:...,name:...},{...}])<br/>
             *     - a string containing an array of JSON objects ready to be parsed (ex: "[{id:...,name:...},{...}]")<br/>
             *     - a JSON object whose data will be contained in the results property
             *      (ex: {results: [{id:...,name:...},{...}]</p>
             * <p><u>Function</u><br/>
             *     You can pass a function which returns an array of JSON objects  (ex: [{id:...,name:...},{...}])<br/>
             *     The function can return the JSON data or it can use the first argument as function to handle the data.<br/>
             *     Only one (callback function or return value) is needed for the function to succeed.<br/>
             *     See the following example:<br/>
             *     function (response) { var myjson = [{name: 'test', id: 1}]; response(myjson); return myjson; }</p>
             * Defaults to <b>null</b>
             */
            data: null,

            /**
             * @cfg {Object} dataParams
             * <p>Additional parameters to the ajax call</p>
             * Defaults to <code>{}</code>
             */
            dataUrlParams: {},

            /**
             * @cfg {Boolean} disabled
             * <p>Start the component in a disabled state.</p>
             * Defaults to <code>false</code>.
             */
            disabled: false,

            /**
             * @cfg {String} displayField
             * <p>name of JSON object property displayed in the combo list</p>
             * Defaults to <code>name</code>.
             */
            displayField: 'name',

            /**
             * @cfg {Boolean} editable
             * <p>Set to false if you only want mouse interaction. In that case the combo will
             * automatically expand on focus.</p>
             * Defaults to <code>true</code>.
             */
            editable: true,

            /**
             * @cfg {String} emptyText
             * <p>The default placeholder text when nothing has been entered</p>
             * Defaults to <code>'Type or click here'</code> or just <code>'Click here'</code> if not editable.
             */
            emptyText: function() {
                return cfg.editable ? 'Taggez votre compétence' : 'Click here';
            },

            /**
             * @cfg {String} emptyTextCls
             * <p>A custom CSS class to style the empty text</p>
             * Defaults to <code>'ms-empty-text'</code>.
             */
            emptyTextCls: 'ms-empty-text',

            /**
             * @cfg {Boolean} expanded
             * <p>Set starting state for combo.</p>
             * Defaults to <code>false</code>.
             */
            expanded: false,

            /**
             * @cfg {Boolean} expandOnFocus
             * <p>Automatically expands combo on focus.</p>
             * Defaults to <code>false</code>.
             */
            expandOnFocus: function() {
                return cfg.editable ? false : true;
            },

            /**
             * @cfg {String} groupBy
             * <p>JSON property by which the list should be grouped</p>
             * Defaults to null
             */
            groupBy: null,

            /**
             * @cfg {Boolean} hideTrigger
             * <p>Set to true to hide the trigger on the right</p>
             * Defaults to <code>false</code>.
             */
            hideTrigger: false,

            /**
             * @cfg {Boolean} highlight
             * <p>Set to true to highlight search input within displayed suggestions</p>
             * Defaults to <code>true</code>.
             */
            highlight: true,

            /**
             * @cfg {String} id
             * <p>A custom ID for this component</p>
             * Defaults to 'ms-ctn-{n}' with n positive integer
             */
            id: function() {
                return 'ms-ctn-' + $('div[id^="ms-ctn"]').length;
            },

            /**
             * @cfg {String} infoMsgCls
             * <p>A class that is added to the info message appearing on the top-right part of the component</p>
             * Defaults to ''
             */
            infoMsgCls: '',

            /**
             * @cfg {Object} inputCfg
             * <p>Additional parameters passed out to the INPUT tag. Enables usage of AngularJS's custom tags for ex.</p>
             * Defaults to <code>{}</code>
             */
            inputCfg: {},

            /**
             * @cfg {String} invalidCls
             * <p>The class that is applied to show that the field is invalid</p>
             * Defaults to ms-ctn-invalid
             */
            invalidCls: 'ms-ctn-invalid',

            /**
             * @cfg {Boolean} matchCase
             * <p>Set to true to filter data results according to case. Useless if the data is fetched remotely</p>
             * Defaults to <code>false</code>.
             */
            matchCase: false,

            /**
             * @cfg {Integer} maxDropHeight (in px)
             * <p>Once expanded, the combo's height will take as much room as the # of available results.
             *    In case there are too many results displayed, this will fix the drop down height.</p>
             * Defaults to 290 px.
             */
            maxDropHeight: 290,

            /**
             * @cfg {Integer} maxEntryLength
             * <p>Defines how long the user free entry can be. Set to null for no limit.</p>
             * Defaults to null.
             */
            maxEntryLength: null,

            /**
             * @cfg {String} maxEntryRenderer
             * <p>A function that defines the helper text when the max entry length has been surpassed.</p>
             * Defaults to <code>function(v){return 'Please reduce your entry by ' + v + ' character' + (v > 1 ? 's':'');}</code>
             */
            maxEntryRenderer: function(v) {
                return 'Please reduce your entry by ' + v + ' character' + (v > 1 ? 's':'');
            },

            /**
             * @cfg {Integer} maxSuggestions
             * <p>The maximum number of results displayed in the combo drop down at once.</p>
             * Defaults to null.
             */
            maxSuggestions: null,

            /**
             * @cfg {Integer} maxSelection
             * <p>The maximum number of items the user can select if multiple selection is allowed.
             *    Set to null to remove the limit.</p>
             * Defaults to 10.
             */
            maxSelection: 10,

            /**
             * @cfg {Function} maxSelectionRenderer
             * <p>A function that defines the helper text when the max selection amount has been reached. The function has a single
             *    parameter which is the number of selected elements.</p>
             * Defaults to <code>function(v){return 'You cannot choose more than ' + v + ' item' + (v > 1 ? 's':'');}</code>
             */
            maxSelectionRenderer: function(v) {
                return 'You cannot choose more than ' + v + ' item' + (v > 1 ? 's':'');
            },

            /**
             * @cfg {String} method
             * <p>The method used by the ajax request.</p>
             * Defaults to 'POST'
             */
            method: 'POST',

            /**
             * @cfg {Integer} minChars
             * <p>The minimum number of characters the user must type before the combo expands and offers suggestions.
             * Defaults to <code>0</code>.
             */
            minChars: 0,

            /**
             * @cfg {Function} minCharsRenderer
             * <p>A function that defines the helper text when not enough letters are set. The function has a single
             *    parameter which is the difference between the required amount of letters and the current one.</p>
             * Defaults to <code>function(v){return 'Please type ' + v + ' more character' + (v > 1 ? 's':'');}</code>
             */
            minCharsRenderer: function(v) {
                return 'Please type ' + v + ' more character' + (v > 1 ? 's':'');
            },

            /**
             * @cfg {String} name
             * <p>The name used as a form element.</p>
             * Defaults to 'null'
             */
            name: null,

            /**
             * @cfg {String} noSuggestionText
             * <p>The text displayed when there are no suggestions.</p>
             * Defaults to 'No suggestions"
             */
            noSuggestionText: 'Ce tag n\'existe pas encore',

            /**
             * @cfg {Boolean} preselectSingleSuggestion
             * <p>If a single suggestion comes out, it is preselected.</p>
             * Defaults to <code>true</code>.
             */
            preselectSingleSuggestion: true,

            /**
             * @cfg (function) renderer
             * <p>A function used to define how the items will be presented in the combo</p>
             * Defaults to <code>null</code>.
             */
            renderer: null,

            /**
             * @cfg {Boolean} required
             * <p>Whether or not this field should be required</p>
             * Defaults to false
             */
            required: false,

            /**
             * @cfg {Boolean} resultAsString
             * <p>Set to true to render selection as comma separated string</p>
             * Defaults to <code>false</code>.
             */
            resultAsString: false,

            /**
             * @cfg {String} resultsField
             * <p>Name of JSON object property that represents the list of suggested objets</p>
             * Defaults to <code>results</code>
             */
            resultsField: 'results',

            /**
             * @cfg {String} selectionCls
             * <p>A custom CSS class to add to a selected item</p>
             * Defaults to <code>''</code>.
             */
            selectionCls: '',

            /**
             * @cfg {String} selectionPosition
             * <p>Where the selected items will be displayed. Only 'right', 'bottom' and 'inner' are valid values</p>
             * Defaults to <code>'inner'</code>, meaning the selected items will appear within the input box itself.
             */
            selectionPosition: 'inner',

            /**
             * @cfg (function) selectionRenderer
             * <p>A function used to define how the items will be presented in the tag list</p>
             * Defaults to <code>null</code>.
             */
            selectionRenderer: null,

            /**
             * @cfg {Boolean} selectionStacked
             * <p>Set to true to stack the selectioned items when positioned on the bottom
             *    Requires the selectionPosition to be set to 'bottom'</p>
             * Defaults to <code>false</code>.
             */
            selectionStacked: false,

            /**
             * @cfg {String} sortDir
             * <p>Direction used for sorting. Only 'asc' and 'desc' are valid values</p>
             * Defaults to <code>'asc'</code>.
             */
            sortDir: 'asc',

            /**
             * @cfg {String} sortOrder
             * <p>name of JSON object property for local result sorting.
             *    Leave null if you do not wish the results to be ordered or if they are already ordered remotely.</p>
             *
             * Defaults to <code>null</code>.
             */
            sortOrder: null,

            /**
             * @cfg {Boolean} strictSuggest
             * <p>If set to true, suggestions will have to start by user input (and not simply contain it as a substring)</p>
             * Defaults to <code>false</code>.
             */
            strictSuggest: false,

            /**
             * @cfg {String} style
             * <p>Custom style added to the component container.</p>
             *
             * Defaults to <code>''</code>.
             */
            style: '',

            /**
             * @cfg {Boolean} toggleOnClick
             * <p>If set to true, the combo will expand / collapse when clicked upon</p>
             * Defaults to <code>false</code>.
             */
            toggleOnClick: false,


            /**
             * @cfg {Integer} typeDelay
             * <p>Amount (in ms) between keyboard registers.</p>
             *
             * Defaults to <code>400</code>
             */
            typeDelay: 400,

            /**
             * @cfg {Boolean} useTabKey
             * <p>If set to true, tab won't blur the component but will be registered as the ENTER key</p>
             * Defaults to <code>false</code>.
             */
            useTabKey: false,

            /**
             * @cfg {Boolean} useCommaKey
             * <p>If set to true, using comma will validate the user's choice</p>
             * Defaults to <code>true</code>.
             */
            useCommaKey: true,


            /**
             * @cfg {Boolean} useZebraStyle
             * <p>Determines whether or not the results will be displayed with a zebra table style</p>
             * Defaults to <code>true</code>.
             */
            useZebraStyle: true,

            /**
             * @cfg {String/Object/Array} value
             * <p>initial value for the field</p>
             * Defaults to <code>null</code>.
             */
            value: null,

            /**
             * @cfg {String} valueField
             * <p>name of JSON object property that represents its underlying value</p>
             * Defaults to <code>id</code>.
             */
            valueField: 'id',

            /**
             * @cfg {Integer} width (in px)
             * <p>Width of the component</p>
             * Defaults to underlying element width.
             */
            width: function() {
                return $(this).width();
            }
        };

        var conf = $.extend({},options);
        var cfg = $.extend(true, {}, defaults, conf);

        // some init stuff
        if ($.isFunction(cfg.emptyText)) {
            cfg.emptyText = cfg.emptyText.call(this);
        }
        if ($.isFunction(cfg.expandOnFocus)) {
            cfg.expandOnFocus = cfg.expandOnFocus.call(this);
        }
        if ($.isFunction(cfg.id)) {
            cfg.id = cfg.id.call(this);
        }

        /**********  PUBLIC METHODS ************/
        /**
         * Add one or multiple json items to the current selection
         * @param items - json object or array of json objects
         * @param isSilent - (optional) set to true to suppress 'selectionchange' event from being triggered
         */
        this.addToSelection = function(items, isSilent)
        {
            if (!cfg.maxSelection || _selection.length < cfg.maxSelection) {
                if (!$.isArray(items)) {
                    items = [items];
                }
                var valuechanged = false;
                $.each(items, function(index, json) {
                    if ($.inArray(json[cfg.valueField], ms.getValue()) === -1) {
                        _selection.push(json);
                        valuechanged = true;
                    }
                });
                if(valuechanged === true) {
                    self._renderSelection();
                    this.empty();
                    if (isSilent !== true) {
                        $(this).trigger('selectionchange', [this, this.getSelectedItems()]);
                    }
                }
            }
        };

        /**
         * Clears the current selection
         * @param isSilent - (optional) set to true to suppress 'selectionchange' event from being triggered
         */
        this.clear = function(isSilent)
        {
            this.removeFromSelection(_selection.slice(0), isSilent); // clone array to avoid concurrency issues
        };

        /**
         * Collapse the drop down part of the combo
         */
        this.collapse = function()
        {
            if (cfg.expanded === true) {
                this.combobox.detach();
                cfg.expanded = false;
                $(this).trigger('collapse', [this]);
            }
        };

        /**
         * Set the component in a disabled state.
         */
        this.disable = function()
        {
            this.container.addClass('ms-ctn-disabled');
            cfg.disabled = true;
            ms.input.attr('disabled', true);
        };

        /**
         * Empties out the combo user text
         */
        this.empty = function(){
            this.input.removeClass(cfg.emptyTextCls);
            this.input.val('');
        };

        /**
         * Set the component in a enable state.
         */
        this.enable = function()
        {
            this.container.removeClass('ms-ctn-disabled');
            cfg.disabled = false;
            ms.input.attr('disabled', false);
        };

        /**
         * Expand the drop drown part of the combo.
         */
        this.expand = function()
        {
            if (!cfg.expanded && (this.input.val().length >= cfg.minChars || this.combobox.children().size() > 0)) {
                this.combobox.appendTo(this.container);
                self._processSuggestions();
                cfg.expanded = true;
                $(this).trigger('expand', [this]);
            }
        };

        /**
         * Retrieve component enabled status
         */
        this.isDisabled = function()
        {
            return cfg.disabled;
        };

        /**
         * Checks whether the field is valid or not
         * @return {boolean}
         */
        this.isValid = function()
        {
            return cfg.required === false || _selection.length > 0;
        };

        /**
         * Gets the data params for current ajax request
         */
        this.getDataUrlParams = function()
        {
            return cfg.dataUrlParams;
        };

        /**
         * Gets the name given to the form input
         */
        this.getName = function()
        {
            return cfg.name;
        };

        /**
         * Retrieve an array of selected json objects
         * @return {Array}
         */
        this.getSelectedItems = function()
        {
            return _selection;
        };

        /**
         * Retrieve the current text entered by the user
         */
        this.getRawValue = function(){
            return ms.input.val() !== cfg.emptyText ? ms.input.val() : '';
        };

        /**
         * Retrieve an array of selected values
         */
        this.getValue = function()
        {
            return $.map(_selection, function(o) {
                return o[cfg.valueField];
            });
        };

        /**
         * Remove one or multiples json items from the current selection
         * @param items - json object or array of json objects
         * @param isSilent - (optional) set to true to suppress 'selectionchange' event from being triggered
         */
        this.removeFromSelection = function(items, isSilent)
        {
            if (!$.isArray(items)) {
                items = [items];
            }
            var valuechanged = false;
            $.each(items, function(index, json) {
                var i = $.inArray(json[cfg.valueField], ms.getValue());
                if (i > -1) {
                    _selection.splice(i, 1);
                    valuechanged = true;
                }
            });
            if (valuechanged === true) {
                self._renderSelection();
                if(isSilent !== true){
                    $(this).trigger('selectionchange', [this, this.getSelectedItems()]);
                }
                if(cfg.expandOnFocus){
                    ms.expand();
                }
                if(cfg.expanded) {
                    self._processSuggestions();
                }
            }
        };

        /**
         * Set up some combo data after it has been rendered
         * @param data
         */
        this.setData = function(data){
            cfg.data = data;
            self._processSuggestions();
        };

        /**
         * Sets the name for the input field so it can be fetched in the form
         * @param name
         */
        this.setName = function(name){
            cfg.name = name;
            if(ms._valueContainer){
                ms._valueContainer.name = name;
            }
        };

        /**
         * Sets a value for the combo box. Value must be a value or an array of value with data type matching valueField one.
         * @param data
         */
        this.setValue = function(data)
        {
            var values = data, items = [];
            if(!$.isArray(data)){
                if(typeof(data) === 'string'){
                    if(data.indexOf('[') > -1){
                        values = eval(data);
                    } else if(data.indexOf(',') > -1){
                        values = data.split(',');
                    }
                } else {
                    values = [data];
                }
            }

            $.each(_cbData, function(index, obj) {
                if($.inArray(obj[cfg.valueField], values) > -1) {
                    items.push(obj);
                }
            });
            if(items.length > 0) {
                this.addToSelection(items);
            }
        };

        /**
         * Sets data params for subsequent ajax requests
         * @param params
         */
        this.setDataUrlParams = function(params)
        {
            cfg.dataUrlParams = $.extend({},params);
        };

        /**********  PRIVATE ************/
        var _selection = [],      // selected objects
            _comboItemHeight = 0, // height for each combo item.
            _timer,
            _hasFocus = false,
            _groups = null,
            _cbData = [],
            _ctrlDown = false;

        var self = {

            /**
             * Empties the result container and refills it with the array of json results in input
             * @private
             */
            _displaySuggestions: function(data) {
                ms.combobox.empty();

                var resHeight = 0, // total height taken by displayed results.
                    nbGroups = 0;

                if(_groups === null) {
                    self._renderComboItems(data);
                    resHeight = _comboItemHeight * data.length;
                }
                else {
                    for(var grpName in _groups) {
                        nbGroups += 1;
                        $('<div/>', {
                            'class': 'ms-res-group',
                            html: grpName
                        }).appendTo(ms.combobox);
                        self._renderComboItems(_groups[grpName].items, true);
                    }
                    resHeight = _comboItemHeight * (data.length + nbGroups);
                }

                if(resHeight < ms.combobox.height() || resHeight <= cfg.maxDropHeight) {
                    ms.combobox.height(resHeight);
                }
                else if(resHeight >= ms.combobox.height() && resHeight > cfg.maxDropHeight) {
                    ms.combobox.height(cfg.maxDropHeight);
                }

                if(data.length === 1 && cfg.preselectSingleSuggestion === true) {
                    ms.combobox.children().filter(':last').addClass('ms-res-item-active');
                }

                if(data.length === 0 && ms.getRawValue() !== "") {
                    self._updateHelper(cfg.noSuggestionText);
                    ms.collapse();
                }
            },

            /**
             * Returns an array of json objects from an array of strings.
             * @private
             */
            _getEntriesFromStringArray: function(data) {
                var json = [];
                $.each(data, function(index, s) {
                    var entry = {};
                    entry[cfg.displayField] = entry[cfg.valueField] = $.trim(s);
                    json.push(entry);
                });
                return json;
            },

            /**
             * Replaces html with highlighted html according to case
             * @param html
             * @private
             */
            _highlightSuggestion: function(html) {
                var q = ms.input.val() !== cfg.emptyText ? ms.input.val() : '';
                if(q.length === 0) {
                    return html; // nothing entered as input
                }

                if(cfg.matchCase === true) {
                    html = html.replace(new RegExp('(' + q + ')(?!([^<]+)?>)','g'), '<em>$1</em>');
                }
                else {
                    html = html.replace(new RegExp('(' + q + ')(?!([^<]+)?>)','gi'), '<em>$1</em>');
                }
                return html;
            },

            /**
             * Moves the selected cursor amongst the list item
             * @param dir - 'up' or 'down'
             * @private
             */
            _moveSelectedRow: function(dir) {
                if(!cfg.expanded) {
                    ms.expand();
                }
                var list, start, active, scrollPos;
                list = ms.combobox.find(".ms-res-item");
                if(dir === 'down') {
                    start = list.eq(0);
                }
                else {
                    start = list.filter(':last');
                }
                active = ms.combobox.find('.ms-res-item-active:first');
                if(active.length > 0) {
                    if(dir === 'down') {
                        start = active.nextAll('.ms-res-item').first();
                        if(start.length === 0) {
                            start = list.eq(0);
                        }
                        scrollPos = ms.combobox.scrollTop();
                        ms.combobox.scrollTop(0);
                        if(start[0].offsetTop + start.outerHeight() > ms.combobox.height()) {
                            ms.combobox.scrollTop(scrollPos + _comboItemHeight);
                        }
                    }
                    else {
                        start = active.prevAll('.ms-res-item').first();
                        if(start.length === 0) {
                            start = list.filter(':last');
                            ms.combobox.scrollTop(_comboItemHeight * list.length);
                        }
                        if(start[0].offsetTop < ms.combobox.scrollTop()) {
                            ms.combobox.scrollTop(ms.combobox.scrollTop() - _comboItemHeight);
                        }
                    }
                }
                list.removeClass("ms-res-item-active");
                start.addClass("ms-res-item-active");
            },

            /**
             * According to given data and query, sort and add suggestions in their container
             * @private
             */
            _processSuggestions: function(source) {
                var json = null, data = source || cfg.data;
                if(data !== null) {
                    if(typeof(data) === 'function'){
                        data = data.call(ms);
                    }
                    if(typeof(data) === 'string' && data.indexOf(',') < 0) { // get results from ajax
                        $(ms).trigger('beforeload', [ms]);
                        var params = $.extend({query: ms.input.val()}, cfg.dataUrlParams);
                        $.ajax({
                            type: cfg.method,
                            url: data,
                            data: params,
                            success: function(asyncData){
                                json = typeof(asyncData) === 'string' ? JSON.parse(asyncData) : asyncData;
                                self._processSuggestions(json);
                                $(ms).trigger('load', [ms, json]);
                            },
                            error: function(){
                                throw("Could not reach server");
                            }
                        });
                        return;
                    } else if(typeof(data) === 'string' && data.indexOf(',') > -1) { // results from csv string
                        _cbData = self._getEntriesFromStringArray(data.split(','));
                    } else { // results from local array
                        if(data.length > 0 && typeof(data[0]) === 'string') { // results from array of strings
                            _cbData = self._getEntriesFromStringArray(data);
                        } else { // regular json array or json object with results property
                            _cbData = data[cfg.resultsField] || data;
                        }
                    }
                    self._displaySuggestions(self._sortAndTrim(_cbData));

                }
            },

            /**
             * Render the component to the given input DOM element
             * @private
             */
            _render: function(el) {
                $(ms).trigger('beforerender', [ms]);
                var w = $.isFunction(cfg.width) ? cfg.width.call(el) : cfg.width;
                // holds the main div, will relay the focus events to the contained input element.
                ms.container = $('<div/>', {
                    id: cfg.id,
                    'class': 'ms-ctn ' + cfg.cls +
                        (cfg.disabled === true ? ' ms-ctn-disabled' : '') +
                        (cfg.editable === true ? '' : ' ms-ctn-readonly'),
                    style: cfg.style
                }).width(w);
                ms.container.focus($.proxy(handlers._onFocus, this));
                ms.container.blur($.proxy(handlers._onBlur, this));
                ms.container.keydown($.proxy(handlers._onKeyDown, this));
                ms.container.keyup($.proxy(handlers._onKeyUp, this));

                // holds the input field
                ms.input = $('<input/>', $.extend({
                    id: 'ms-input-' + $('input[id^="ms-input"]').length,
                    type: 'text',
                    'class': cfg.emptyTextCls + (cfg.editable === true ? '' : ' ms-input-readonly'),
                    value: cfg.emptyText,
                    readonly: !cfg.editable,
                    disabled: cfg.disabled
                }, cfg.inputCfg)).width(w - (cfg.hideTrigger ? 16 : 42));

                ms.input.focus($.proxy(handlers._onInputFocus, this));
                ms.input.click($.proxy(handlers._onInputClick, this));

                // holds the trigger on the right side
                if(cfg.hideTrigger === false) {
                    ms.trigger = $('<div/>', {
                        id: 'ms-trigger-' + $('div[id^="ms-trigger"]').length,
                        'class': 'ms-trigger',
                        html: '<div class="ms-trigger-ico"></div>'
                    });
                    ms.trigger.click($.proxy(handlers._onTriggerClick, this));
                    ms.container.append(ms.trigger);
                }

                // holds the suggestions. will always be placed on focus
                ms.combobox = $('<div/>', {
                    id: 'ms-res-ctn-' + $('div[id^="ms-res-ctn"]').length,
                    'class': 'ms-res-ctn '
                }).width(w).height(cfg.maxDropHeight);

                // bind the onclick and mouseover using delegated events (needs jQuery >= 1.7)
                ms.combobox.on('click', 'div.ms-res-item', $.proxy(handlers._onComboItemSelected, this));
                ms.combobox.on('mouseover', 'div.ms-res-item', $.proxy(handlers._onComboItemMouseOver, this));

                ms.selectionContainer = $('<div/>', {
                    id: 'ms-sel-ctn-' +  $('div[id^="ms-sel-ctn"]').length,
                    'class': 'ms-sel-ctn'
                });
                ms.selectionContainer.click($.proxy(handlers._onFocus, this));

                if(cfg.selectionPosition === 'inner') {
                    ms.selectionContainer.append(ms.input);
                }
                else {
                    ms.container.append(ms.input);
                }

                ms.helper = $('<div/>', {
                    'class': 'ms-helper ' + cfg.infoMsgCls
                });
                self._updateHelper();
                ms.container.append(ms.helper);


                // Render the whole thing
                $(el).replaceWith(ms.container);

                switch(cfg.selectionPosition) {
                    case 'bottom':
                        ms.selectionContainer.insertAfter(ms.container);
                        if(cfg.selectionStacked === true) {
                            ms.selectionContainer.width(ms.container.width());
                            ms.selectionContainer.addClass('ms-stacked');
                        }
                        break;
                    case 'right':
                        ms.selectionContainer.insertAfter(ms.container);
                        ms.container.css('float', 'left');
                        break;
                    default:
                        ms.container.append(ms.selectionContainer);
                        break;
                }

                self._processSuggestions();
                if(cfg.value !== null) {
                    ms.setValue(cfg.value);
                    self._renderSelection();
                }

                $(ms).trigger('afterrender', [ms]);
                $("body").click(function(e) {
                    if(ms.container.hasClass('ms-ctn-bootstrap-focus') &&
                        ms.container.has(e.target).length === 0 &&
                        e.target.className.indexOf('ms-res-item') < 0 &&
                        e.target.className.indexOf('ms-close-btn') < 0 &&
                        ms.container[0] !== e.target) {
                        handlers._onBlur();
                    }
                });

                if(cfg.expanded === true) {
                    cfg.expanded = false;
                    ms.expand();
                }
            },

            _renderComboItems: function(items, isGrouped) {
                var ref = this, html = '';
                $.each(items, function(index, value) {
                    var displayed = cfg.renderer !== null ? cfg.renderer.call(ref, value) : value[cfg.displayField];
                    var resultItemEl = $('<div/>', {
                        'class': 'ms-res-item ' + (isGrouped ? 'ms-res-item-grouped ':'') +
                            (index % 2 === 1 && cfg.useZebraStyle === true ? 'ms-res-odd' : ''),
                        html: cfg.highlight === true ? self._highlightSuggestion(displayed) : displayed,
                        'data-json': JSON.stringify(value)
                    });
                    resultItemEl.click($.proxy(handlers._onComboItemSelected, ref));
                    resultItemEl.mouseover($.proxy(handlers._onComboItemMouseOver, ref));
                    html += $('<div/>').append(resultItemEl).html();
                });
                ms.combobox.append(html);
                _comboItemHeight = ms.combobox.find('.ms-res-item:first').outerHeight();
            },

            /**
             * Renders the selected items into their container.
             * @private
             */
            _renderSelection: function() {
                var ref = this, w = 0, inputOffset = 0, items = [],
                    asText = cfg.resultAsString === true && !_hasFocus;

                ms.selectionContainer.find('.ms-sel-item').remove();
                if(ms._valueContainer !== undefined) {
                    ms._valueContainer.remove();
                }

                $.each(_selection, function(index, value){

                    var selectedItemEl, delItemEl,
                        selectedItemHtml = cfg.selectionRenderer !== null ? cfg.selectionRenderer.call(ref, value) : value[cfg.displayField];
                    // tag representing selected value
                    if(asText === true) {
                        selectedItemEl = $('<div/>', {
                            'class': 'ms-sel-item ms-sel-text ' + cfg.selectionCls,
                            html: selectedItemHtml + (index === (_selection.length - 1) ? '' : ',')
                        }).data('json', value);
                    }
                    else {
                        selectedItemEl = $('<div/>', {
                            'class': 'ms-sel-item ' + cfg.selectionCls,
                            html: selectedItemHtml
                        }).data('json', value);

                        if(cfg.disabled === false){
                            // small cross img
                            delItemEl = $('<span/>', {
                                'class': 'ms-close-btn'
                            }).data('json', value).appendTo(selectedItemEl);

                            delItemEl.click($.proxy(handlers._onTagTriggerClick, ref));
                        }
                    }

                    items.push(selectedItemEl);
                });

                ms.selectionContainer.prepend(items);
                ms._valueContainer = $('<input/>', {
                    type: 'hidden',
                    name: cfg.name,
                    value: JSON.stringify(ms.getValue())
                });
                ms._valueContainer.appendTo(ms.selectionContainer);

                if(cfg.selectionPosition === 'inner') {
                    ms.input.width(0);
                    inputOffset = ms.input.offset().left - ms.selectionContainer.offset().left;
                    w = ms.container.width() - inputOffset - 42;
                    ms.input.width(w);
                    ms.container.height(ms.selectionContainer.height());
                }

                if(_selection.length === cfg.maxSelection){
                    self._updateHelper(cfg.maxSelectionRenderer.call(this, _selection.length));
                } else {
                    ms.helper.hide();
                }
            },

            /**
             * Select an item either through keyboard or mouse
             * @param item
             * @private
             */
            _selectItem: function(item) {
                if(cfg.maxSelection === 1){
                    _selection = [];
                }
                ms.addToSelection(item.data('json'));
                item.removeClass('ms-res-item-active');
                if(cfg.expandOnFocus === false || _selection.length === cfg.maxSelection){
                    ms.collapse();
                }
                if(!_hasFocus){
                    ms.input.focus();
                } else if(_hasFocus && (cfg.expandOnFocus || _ctrlDown)){
                    self._processSuggestions();
                    if(_ctrlDown){
                        ms.expand();
                    }
                }
            },

            /**
             * Sorts the results and cut them down to max # of displayed results at once
             * @private
             */
            _sortAndTrim: function(data) {
                var q = ms.getRawValue(),
                    filtered = [],
                    newSuggestions = [],
                    selectedValues = ms.getValue();
                // filter the data according to given input
                if(q.length > 0) {
                    $.each(data, function(index, obj) {
                        var name = obj[cfg.displayField];
                        if((cfg.matchCase === true && name.indexOf(q) > -1) ||
                            (cfg.matchCase === false && name.toLowerCase().indexOf(q.toLowerCase()) > -1)) {
                            if(cfg.strictSuggest === false || name.toLowerCase().indexOf(q.toLowerCase()) === 0) {
                                filtered.push(obj);
                            }
                        }
                    });
                }
                else {
                    filtered = data;
                }
                // take out the ones that have already been selected
                $.each(filtered, function(index, obj) {
                    if($.inArray(obj[cfg.valueField], selectedValues) === -1) {
                        newSuggestions.push(obj);
                    }
                });
                // sort the data
                if(cfg.sortOrder !== null) {
                    newSuggestions.sort(function(a,b) {
                        if(a[cfg.sortOrder] < b[cfg.sortOrder]) {
                            return cfg.sortDir === 'asc' ? -1 : 1;
                        }
                        if(a[cfg.sortOrder] > b[cfg.sortOrder]) {
                            return cfg.sortDir === 'asc' ? 1 : -1;
                        }
                        return 0;
                    });
                }
                // trim it down
                if(cfg.maxSuggestions && cfg.maxSuggestions > 0) {
                    newSuggestions = newSuggestions.slice(0, cfg.maxSuggestions);
                }
                // build groups
                if(cfg.groupBy !== null) {
                    _groups = {};
                    $.each(newSuggestions, function(index, value) {
                        if(_groups[value[cfg.groupBy]] === undefined) {
                            _groups[value[cfg.groupBy]] = {title: value[cfg.groupBy], items: [value]};
                        }
                        else {
                            _groups[value[cfg.groupBy]].items.push(value);
                        }
                    });
                }
                return newSuggestions;
            },

            /**
             * Update the helper text
             * @private
             */
            _updateHelper: function(html) {
                ms.helper.html(html);
                if(!ms.helper.is(":visible")) {
                    ms.helper.fadeIn();
                }
            }
        };

        var handlers = {
            /**
             * Triggered when blurring out of the component
             * @private
             */
            _onBlur: function() {
                ms.container.removeClass('ms-ctn-bootstrap-focus');
                ms.collapse();
                _hasFocus = false;
                if(ms.getRawValue() !== '' && cfg.allowFreeEntries === true){
                    var obj = {};
                    obj[cfg.displayField] = obj[cfg.valueField] = ms.getRawValue();
                    ms.addToSelection(obj);
                }
                self._renderSelection();

                if(ms.isValid() === false) {
                    ms.container.addClass('ms-ctn-invalid');
                }

                if(ms.input.val() === '' && _selection.length === 0) {
                    ms.input.addClass(cfg.emptyTextCls);
                    ms.input.val(cfg.emptyText);
                }
                else if(ms.input.val() !== '' && cfg.allowFreeEntries === false) {
                    ms.empty();
                    self._updateHelper('');
                }

                if(ms.input.is(":focus")) {
                    $(ms).trigger('blur', [ms]);
                }
            },

            /**
             * Triggered when hovering an element in the combo
             * @param e
             * @private
             */
            _onComboItemMouseOver: function(e) {
                ms.combobox.children().removeClass('ms-res-item-active');
                $(e.currentTarget).addClass('ms-res-item-active');
            },

            /**
             * Triggered when an item is chosen from the list
             * @param e
             * @private
             */
            _onComboItemSelected: function(e) {
                self._selectItem($(e.currentTarget));
            },

            /**
             * Triggered when focusing on the container div. Will focus on the input field instead.
             * @private
             */
            _onFocus: function() {
                ms.input.focus();
            },

            /**
             * Triggered when clicking on the input text field
             * @private
             */
            _onInputClick: function(){
                if (ms.isDisabled() === false && _hasFocus) {
                    if (cfg.toggleOnClick === true) {
                        if (cfg.expanded){
                            ms.collapse();
                        } else {
                            ms.expand();
                        }
                    }
                }
            },

            /**
             * Triggered when focusing on the input text field.
             * @private
             */
            _onInputFocus: function() {
                if(ms.isDisabled() === false && !_hasFocus) {
                    _hasFocus = true;
                    ms.container.addClass('ms-ctn-bootstrap-focus');
                    ms.container.removeClass(cfg.invalidCls);

                    if(ms.input.val() === cfg.emptyText) {
                        ms.empty();
                    }

                    var curLength = ms.getRawValue().length;
                    if(cfg.expandOnFocus === true){
                        ms.expand();
                    }

                    if(_selection.length === cfg.maxSelection) {
                        self._updateHelper(cfg.maxSelectionRenderer.call(this, _selection.length));
                    } else if(curLength < cfg.minChars) {
                        self._updateHelper(cfg.minCharsRenderer.call(this, cfg.minChars - curLength));
                    }

                    self._renderSelection();
                    $(ms).trigger('focus', [ms]);
                }
            },

            /**
             * Triggered when the user presses a key while the component has focus
             * This is where we want to handle all keys that don't require the user input field
             * since it hasn't registered the key hit yet
             * @param e keyEvent
             * @private
             */
            _onKeyDown: function(e) {
                // check how tab should be handled
                var active = ms.combobox.find('.ms-res-item-active:first'),
                    freeInput = ms.input.val() !== cfg.emptyText ? ms.input.val() : '';
                $(ms).trigger('keydown', [ms, e]);

                if(e.keyCode === 9 && (cfg.useTabKey === false ||
                    (cfg.useTabKey === true && active.length === 0 && ms.input.val().length === 0))) {
                    handlers._onBlur();
                    return;
                }
                switch(e.keyCode) {
                    case 8: //backspace
                        if(freeInput.length === 0 && ms.getSelectedItems().length > 0 && cfg.selectionPosition === 'inner') {
                            _selection.pop();
                            self._renderSelection();
                            $(ms).trigger('selectionchange', [ms, ms.getSelectedItems()]);
                            ms.input.focus();
                            e.preventDefault();
                        }
                        break;
                    case 9: // tab
                    case 188: // esc
                    case 13: // enter
                        e.preventDefault();
                        break;
                    case 17: // ctrl
                        _ctrlDown = true;
                        break;
                    case 40: // down
                        e.preventDefault();
                        self._moveSelectedRow("down");
                        break;
                    case 38: // up
                        e.preventDefault();
                        self._moveSelectedRow("up");
                        break;
                    default:
                        if(_selection.length === cfg.maxSelection) {
                            e.preventDefault();
                        }
                        break;
                }
            },

            /**
             * Triggered when a key is released while the component has focus
             * @param e
             * @private
             */
            _onKeyUp: function(e) {
                var freeInput = ms.getRawValue(),
                    inputValid = $.trim(ms.input.val()).length > 0 && ms.input.val() !== cfg.emptyText &&
                        (!cfg.maxEntryLength || $.trim(ms.input.val()).length <= cfg.maxEntryLength),
                    selected,
                    obj = {};

                $(ms).trigger('keyup', [ms, e]);

                clearTimeout(_timer);

                // collapse if escape, but keep focus.
                if(e.keyCode === 27 && cfg.expanded) {
                    ms.combobox.height(0);
                }
                // ignore a bunch of keys
                if((e.keyCode === 9 && cfg.useTabKey === false) || (e.keyCode > 13 && e.keyCode < 32)) {
                    if(e.keyCode === 17){
                        _ctrlDown = false;
                    }
                    return;
                }
                switch(e.keyCode) {
                    case 40:case 38: // up, down
                    e.preventDefault();
                    break;
                    case 13:case 9:case 188:// enter, tab, comma
                    if(e.keyCode !== 188 || cfg.useCommaKey === true) {
                        e.preventDefault();
                        if(cfg.expanded === true){ // if a selection is performed, select it and reset field
                            selected = ms.combobox.find('.ms-res-item-active:first');
                            if(selected.length > 0) {
                                self._selectItem(selected);
                                return;
                            }
                        }
                        // if no selection or if freetext entered and free entries allowed, add new obj to selection
                        if(inputValid === true && cfg.allowFreeEntries === true) {
                            obj[cfg.displayField] = obj[cfg.valueField] = freeInput;
                            ms.addToSelection(obj);
                            ms.collapse(); // reset combo suggestions
                            ms.input.focus();
                        }
                        break;
                    }
                    default:
                        if(_selection.length === cfg.maxSelection){
                            self._updateHelper(cfg.maxSelectionRenderer.call(this, _selection.length));
                        }
                        else {
                            if(freeInput.length < cfg.minChars) {
                                self._updateHelper(cfg.minCharsRenderer.call(this, cfg.minChars - freeInput.length));
                                if(cfg.expanded === true) {
                                    ms.collapse();
                                }
                            }
                            else if(cfg.maxEntryLength && freeInput.length > cfg.maxEntryLength) {
                                self._updateHelper(cfg.maxEntryRenderer.call(this, freeInput.length - cfg.maxEntryLength));
                                if(cfg.expanded === true) {
                                    ms.collapse();
                                }
                            }
                            else {
                                ms.helper.hide();
                                if(cfg.minChars <= freeInput.length){
                                    _timer = setTimeout(function() {
                                        if(cfg.expanded === true) {
                                            self._processSuggestions();
                                        } else {
                                            ms.expand();
                                        }
                                    }, cfg.typeDelay);
                                }
                            }
                        }
                        break;
                }
            },

            /**
             * Triggered when clicking upon cross for deletion
             * @param e
             * @private
             */
            _onTagTriggerClick: function(e) {
                ms.removeFromSelection($(e.currentTarget).data('json'));
            },

            /**
             * Triggered when clicking on the small trigger in the right
             * @private
             */
            _onTriggerClick: function() {
                if(ms.isDisabled() === false && !(cfg.expandOnFocus === true && _selection.length === cfg.maxSelection)) {
                    $(ms).trigger('triggerclick', [ms]);
                    if(cfg.expanded === true) {
                        ms.collapse();
                    } else {
                        var curLength = ms.getRawValue().length;
                        if(curLength >= cfg.minChars){
                            ms.input.focus();
                            ms.expand();
                        } else {
                            self._updateHelper(cfg.minCharsRenderer.call(this, cfg.minChars - curLength));
                        }
                    }
                }
            }
        };

        // startup point
        if(element !== null) {
            self._render(element);
        }
    };

    $.fn.magicSuggest = function(options) {
        var obj = $(this);

        if(obj.size() === 1 && obj.data('magicSuggest')) {
            return obj.data('magicSuggest');
        }

        obj.each(function(i) {
            // assume $(this) is an element
            var cntr = $(this);

            // Return early if this element already has a plugin instance
            if(cntr.data('magicSuggest')){
                return;
            }

            if(this.nodeName.toLowerCase() === 'select'){ // rendering from select
                options.data = [];
                options.value = [];
                $.each(this.children, function(index, child){
                    if(child.nodeName && child.nodeName.toLowerCase() === 'option'){
                        options.data.push({id: child.value, name: child.text});
                        if(child.selected){
                            options.value.push(child.value);
                        }
                    }
                });

            }

            var def = {};
            // set values from DOM container element
            $.each(this.attributes, function(i, att){
                def[att.name] = att.value;
            });
            var field = new MagicSuggest(this, $.extend(options, def));
            cntr.data('magicSuggest', field);
            field.container.data('magicSuggest', field);
        });

        if(obj.size() === 1) {
            return obj.data('magicSuggest');
        }
        return obj;
    };

//    $.fn.magicSuggest.defaults = {};
})(jQuery);
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
+function ($) { "use strict";

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd'
    , 'MozTransition'    : 'transitionend'
    , 'OTransition'      : 'oTransitionEnd otransitionend'
    , 'transition'       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

}(jQuery);

+function ($) { "use strict";

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent.trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one($.support.transition.end, removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

+function ($) { "use strict";

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element = $(element)
    this.options  = $.extend({}, Button.DEFAULTS, options)
  }

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (!data.resetText) $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d);
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons"]')
    var changed = true

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') === 'radio') {
        // see if clicking on current one
        if ($input.prop('checked') && this.$element.hasClass('active'))
          changed = false
        else
          $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
    e.preventDefault()
  })

}(jQuery);

+function ($) { "use strict";

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.DEFAULTS = {
    interval: 5000
  , pause: 'hover'
  , wrap: true
  }

  Carousel.prototype.cycle =  function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getActiveIndex = function () {
    this.$active = this.$element.find('.item.active')
    this.$items  = this.$active.parent().children()

    return this.$items.index(this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getActiveIndex()

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) })
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition.end) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    this.sliding = true

    isCycling && this.pause()

    var e = $.Event('slide.bs.carousel', { relatedTarget: $next[0], direction: direction })

    if ($next.hasClass('active')) return

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      this.$element.one('slid.bs.carousel', function () {
        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
        $nextIndicator && $nextIndicator.addClass('active')
      })
    }

    if ($.support.transition && this.$element.hasClass('slide')) {
      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid.bs.carousel') }, 0)
        })
        .emulateTransitionEnd(600)
    } else {
      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger('slid.bs.carousel')
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this   = $(this), href
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      $carousel.carousel($carousel.data())
    })
  })

}(jQuery);

+function ($) { "use strict";

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      actives.collapse('hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')
      [dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('in')
        [dimension]('auto')
      this.transitioning = 0
      this.$element.trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
      [dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element
      [dimension](this.$element[dimension]())
      [0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    $target.collapse(option)
  })

}(jQuery);

+function ($) { "use strict";

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle=dropdown]'
  var Dropdown = function (element) {
    var $el = $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      $parent.trigger(e = $.Event('show.bs.dropdown'))

      if (e.isDefaultPrevented()) return

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown')

      $this.focus()
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).focus()
      return $this.click()
    }

    var $items = $('[role=menu] li:not(.divider):visible a', $parent)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index=0

    $items.eq(index).focus()
  }

  function clearMenus() {
    $(backdrop).remove()
    $(toggle).each(function (e) {
      var $parent = getParent($(this))
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown'))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('dropdown')

      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(jQuery);

+function ($) { "use strict";

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options   = options
    this.$element  = $(element)
    this.$backdrop =
    this.isShown   = null

    if (this.options.remote) this.$element.load(this.options.remote)
  }

  Modal.DEFAULTS = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.escape()

    this.$element.on('click.dismiss.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body) // don't move modals dom position
      }

      that.$element.show()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one($.support.transition.end, function () {
            that.$element.focus().trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.focus().trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one($.support.transition.end, $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.focus()
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.removeBackdrop()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that    = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      this.$element.on('click.dismiss.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade')?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (callback) {
      callback()
    }
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  var old = $.fn.modal

  $.fn.modal = function (option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    var option  = $target.data('modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .modal(option, this)
      .one('hide', function () {
        $this.is(':visible') && $this.focus()
      })
  })

  $(document)
    .on('show.bs.modal',  '.modal', function () { $(document.body).addClass('modal-open') })
    .on('hidden.bs.modal', '.modal', function () { $(document.body).removeClass('modal-open') })

}(jQuery);

+function ($) { "use strict";

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.DEFAULTS = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover focus'
  , title: ''
  , delay: 0
  , html: false
  , container: false
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled  = true
    this.type     = type
    this.$element = $(element)
    this.options  = this.getOptions(options)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focus'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay
      , hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.'+ this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      var $tip = this.tip()

      this.setContent()

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var $parent = this.$element.parent()

        var orgPlacement = placement
        var docScroll    = document.documentElement.scrollTop || document.body.scrollTop
        var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth()
        var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
        var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left

        placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
                    placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)
      this.$element.trigger('shown.bs.' + this.type)
    }
  }

  Tooltip.prototype.applyPlacement = function(offset, placement) {
    var replace
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    $tip
      .offset(offset)
      .addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      replace = true
      offset.top = offset.top + height - actualHeight
    }

    if (/bottom|top/.test(placement)) {
      var delta = 0

      if (offset.left < 0) {
        delta       = offset.left * -2
        offset.left = 0

        $tip.offset(offset)

        actualWidth  = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight
      }

      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, 'top')
    }

    if (replace) $tip.offset(offset)
  }

  Tooltip.prototype.replaceArrow = function(delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one($.support.transition.end, complete)
        .emulateTransitionEnd(150) :
      complete()

    this.$element.trigger('hidden.bs.' + this.type)

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function () {
    var el = this.$element[0]
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
      width: el.offsetWidth
    , height: el.offsetHeight
    }, this.$element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.tip = function () {
    return this.$tip = this.$tip || $(this.options.template)
  }

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  var old = $.fn.tooltip

  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

+function ($) { "use strict";

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.DEFAULTS = $.extend({} , $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow')
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

+function ($) { "use strict";

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var href
    var process  = $.proxy(this.process, this)

    this.$element       = $(element).is('body') ? $(window) : $(element)
    this.$body          = $('body')
    this.$scrollElement = this.$element.on('scroll.bs.scroll-spy.data-api', process)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.offsets        = $([])
    this.targets        = $([])
    this.activeTarget   = null

    this.refresh()
    this.process()
  }

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = this.$element[0] == window ? 'offset' : 'position'

    this.offsets = $([])
    this.targets = $([])

    var self     = this
    var $targets = this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#\w/.test(href) && $(href)

        return ($href
          && $href.length
          && [[ $href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
    var maxScroll    = scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets.last()[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate( targets[i] )
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parents('.active')
      .removeClass('active')

    var selector = this.selector
      + '[data-target="' + target + '"],'
      + this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length)  {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(jQuery);

+function ($) { "use strict";

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.parent('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab'
      , relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one($.support.transition.end, next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(jQuery);

+function ($) { "use strict";

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)
    this.$window = $(window)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element = $(element)
    this.affixed  =
    this.unpin    = null

    this.checkPosition()
  }

  Affix.RESET = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$window.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top()
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin) this.$element.css('top', '')

    this.affixed = affix
    this.unpin   = affix == 'bottom' ? position.top - scrollTop : null

    this.$element.removeClass(Affix.RESET).addClass('affix' + (affix ? '-' + affix : ''))

    if (affix == 'bottom') {
      this.$element.offset({ top: document.body.offsetHeight - offsetBottom - this.$element.height() })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      $spy.affix(data)
    })
  })

}(jQuery);


(function($) {

	window.muffin = {};

	/*
	 * ============================================================================
	 * Step-00 Connexion
	 * ============================================================================
	 */
	muffin.displaceElt = function(disap, displace)
	{
		var height = displace.offset().top - disap.offset().top;
		disap.addClass("disappear");
		displace.attr("style", "position: relative;top: -" + height + "px;");
	};

	muffin.envoyerCode = function(login)
	{
		NProgress.start();
		$.ajax({
			type: "GET",
			url: "Login/register/" + login
		}).done(function(e)
		{
			if (e.toString()[0] === "1")
			{
				NProgress.inc();
				$.get("Home/loginnew/" + login, function(data) {
					$("#input-login").attr("disabled", "disabled");
					$("#input-login + button").attr("disabled", "disabled")
						.html("<span class='icon-checkmark'></span>");
					data = $(data);
					data.addClass("loading");
					$("div[data-role='container']").append(data);
					setTimeout(function() {
						$.smoothScroll({offset: ($(window).height() / 2), scrollElement: null, scrollTarget: '#input-code'});
						NProgress.done();
						data.addClass("complete");
						muffin.displaceElt($("[data-content='login'] header"), $("[data-content='login'] form"));
					}, 200);
				});
			}
			else if (e.toString().slice(0, 2) === "-1")
			{
				NProgress.inc();
				$.get("Home/loginExists/" + login, function(data) {
					$("#input-login").attr("disabled", "disabled");
					$("#input-login + button").attr("disabled", "disabled")
						.html("<span class='icon-checkmark'></span>");
					data = $(data);
					data.addClass("loading");
					$("div[data-role='container']").append(data);
					setTimeout(function() {

						$.smoothScroll({offset: ($(window).height() / 2), scrollElement: null, scrollTarget: '#input-code'});
						NProgress.done();
						data.addClass("complete");
						muffin.displaceElt($("[data-content='login'] header"), $("[data-content='login'] form"));
					}, 200);
				});
			}
			else if (e.toString().slice(0, 2) === "-2")
			{
				NProgress.done();
				$("[data-content='login'] div[role='title'] > p").first().html("Vous devez être un étudiant de 42");
				$("#input-login + button").html('<span style="color: #C02942;" class="icon-warning-sign"></span> <span class="icon-repeat"></span>');
			}
		});
	};


	/*
	 * ============================================================================
	 * Step-01 exists Passw
	 * ============================================================================
	 */


	muffin.changeName = function(name)
	{
		$("[data-content='login']").addClass("disappear")
			.queue("fx", function() {
				$(this).html("<h1 class='entered-login'><i>" + name + "</i></h1>").dequeue();
			}).addClass("appear");
	};

	muffin.verifierCode = function(code, login)
	{
		$.ajax({
			type: "POST",
			data: {code: code, login: login},
			url: "Login/checkCode"
		}).done(function(e)
		{
			if (e.toString()[0] === "1")
			{
				{
					$.get("User/index",
						function(data) {
							$("#input-code").attr("disabled", "disabled");
							$("#input-code + button").attr("disabled", "disabled")
								.html("<span class='icon-checkmark'></span>");
							data = $(data);
							data.addClass("loading");
							$("div[data-role='container']").children().slideUp();
							$("div[data-role='container']").html(data);
							reloadHandlers();
							setTimeout(function() {
								NProgress.done();
								data.addClass("complete");
							}, 200);
						});
				}
			}
			else
			{
				$("#form-passphrase").parent().parent().find("div[role='title'] > p").first().html("Mot de passe incorrect");
				$("#input-passphrase").attr("style", "color: #C02942");
				$("#form-passphrase").find("button")
					.html('<span style="color: #C02942;" class="icon-warning-sign"></span> <span class="icon-repeat"></span> ');
			}
		});
	};

	muffin.renvoyerCode = function(login)
	{
		var button = $("#re-send-mail");
		var span = button.find("span").first();
		span.removeClass("icon-repeat").addClass("icon-time");
		$.ajax({
			type: "GET",
			url: "Login/update/" + login
		}).done(function(e)
		{

			NProgress.done();
			if (e.toString()[0] === "1")
			{
				button.html("Mail envoyé ! <span class='icon-checkmark'></span>");
			}
			else
			{
				button.html("Une erreur s'est produite <span class='icon-warning-outline'></span>");
			}
		});
	};


	/*
	 * ============================================================================
	 * Search for user data
	 * ============================================================================
	 */

	 muffin.autoSearchUser = function(name)
	{
		var max_results = 5;
		var container = $("#search_user_results");
		var field = $("#search_comp_uid");
		if(name != "" && name != undefined)
		{
			$.getJSON("Search/users/" + name, function(data)
			{
				var a, i;
				container.parent().show();
				container.empty();
			  	for (i in data) {
			  		if ( i < max_results)
			  		{
			  			console.log(i);
				  		a = $("<li><a>" + data[i] + "</a></li>");
				  		a.click(function() {
				  			field.val($(this).text());
				  			muffin.searchUSerData();
				  		});
						container.append(a);
					}
				}
			});
		}
		else
		{
			container.parent().hide();
			container.empty();
		}
	}

	muffin.searchUSerData = function()
	{
		var login = $("#search_comp_uid").val();
		var button = $("#btn_search_comp_uid");
		var span = button.find("span").first();
		var status = $("#status_search_comp_uid");
		var modal = ("#modal-explore");
		if (login)
		{
			span.removeClass("icon-uniF488").addClass("icon-clock3");
			$.ajax({
				type: "GET",
				url: "Search/user/" + login
			}).done(function(e)
			{

				NProgress.done();
				if (e.toString()[0] === "0")
				{
					span.removeClass("icon-clock3").addClass("icon-multiply");
					status.html("Il semblerait que l'uid n'existe pas, ou que ses compétences ne soient pas publiques.");
				}
				else
				{
					span.removeClass("icon-clock3").addClass("icon-uniF488");
					$(modal).modal('hide');
		  			$("#search_comp_uid").val("");
		  			muffin.autoSearchUser();
					e = $(e);
						e.addClass("loading");
						$("div[data-role='form-container']").children().slideUp();
						$("div[data-role='form-container']").html(e);
						setTimeout(function() {
							NProgress.done();
							e.addClass("complete");
							reloadHandlers();
						}, 200);
				}
			});
		}
		else
		{
			status.html("Vous devez rentrer un uid");
		}

	};


})(jQuery);

$(document).ready(function()
{
	initalizeForm();
	reloadHandlers();
	$.bind("ajaxComplete", function() {
		reloadHandlers();
	});

	/**
	 * Json calls to Github Api
	 * @type @exp;$@call;getJSON
	 */
	$.getJSON("https://api.github.com/repos/lambda2/Muffin/tags", function(dataT)
	{
		var lastSha = dataT[0].commit.sha;
		$.getJSON("https://api.github.com/repos/lambda2/Muffin/commits/" + lastSha, function(dataC)
		{
			var lastCommit = dataC;
			var cDate = lastCommit.commit.committer.date.slice(0, 10);
			var cAdd = lastCommit.stats.additions;
			var cDel = lastCommit.stats.deletions;
			var cStats = "<span class='icon-flow-tree'></span> <span class='git-add'>+" + cAdd + "</span>  <span class='git-del'>-" + cDel + "</span>";
			$("div[role='git-info']").html("<p>\n\
				<a href='https://github.com/lambda2/Muffin'><span class='icon-github'></span>\n\
				v" + dataT[0].name + " datant du " + cDate + "  ─  " + cStats + "</a> </p>");
		});
	});
});

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

function bindAjaxEvents()
{
    $('[data-load-target]').each(function()
	    {
		var urlToGo = $(this).attr("data-load-target");
		$(this).click(function()
		    {
			$.get(urlToGo,
			    function(data) {
				data = $(data);
				data.addClass("loading");
				$("div[data-role='form-container']").children().slideUp();
				$("div[data-role='form-container']").html(data);
				setTimeout(function() {
				    NProgress.done();
				    data.addClass("complete");
				    reloadHandlers();
				}, 200);
			    });
		    });
	    });
}

function addCheckHandler(toCheck)
{
    $("div[data-role='form-container'] form .radio input, div[data-role='form-container'] form input[type='checkbox']").change(function() {
	console.log("change");
	$(this).parents("form").trigger("submit");
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
    window.ioptions = {
	target: '#form-result', // target element(s) to be updated with server response 
	beforeSubmit: showRequest, // pre-submit callback 
	success: showResponse, // post-submit callback 
	url: "User/updatecompetence",
	type: "post"       // 'get' or 'post', override for form's 'method' attribute 
    };

    $('div[data-role="form-container"] form').submit(function() {
	// inside event callbacks 'this' is the DOM element so we first 
	// wrap it in a jQuery object and then invoke ajaxSubmit 
	$(this).ajaxSubmit(window.ioptions);

	// !!! Important !!! 
	// always return false to prevent standard browser submit and page navigation 
	return false;
    });
    addClearItems();

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
    var ctn = $("div[data-role='form-container'] > ul.items-panels");
    var type = $("#form-add-competence .radio-group input:checked").val();
    if (type == "1")
	type = "3";
    else if (type == "3")
	type = "1";
    console.log("type = " + type);
    ctn.find("li[data-index='"+type+"']").append(a);
    addCheckHandler(window.toCheck);
    a.submit(function() {
	$(this).ajaxSubmit(window.ioptions);
	return false;
    });
    addClearItems();
    setTimeout(function() {
	$.smoothScroll({offset: ($(window).height() / 2), scrollElement: null, scrollTarget: a});
	NProgress.done();
	a.addClass("complete").removeClass("preparing");
    }, 1000);
}

var initalizeAddForm = function() {
    var options = {
	target: '#form-result', // target element(s) to be updated with server response 
	beforeSubmit: showAddRequest, // pre-submit callback 
	success: showAddResponse, // post-submit callback 
	url: "User/addcompetence",
	type: "post"        // 'get' or 'post', override for form's 'method' attribute 
    };

    $('#form-add-competence').submit(function() {
	// inside event callbacks 'this' is the DOM element so we first 
	// wrap it in a jQuery object and then invoke ajaxSubmit 
	console.log("initialized");
	var e = document.getElementById('form-add-competence');
	if (e.checkValidity())
    {
	$(this).ajaxSubmit(options);
    }
	else
    {

    }
    // !!! Important !!! 
    // always return false to prevent standard browser submit and page navigation 
    return false;
    });
};

var initializePanelMenu = function()
{
    $("#panel-menu > li[data-index-toggle]").click(function()
	    {
		var index = $(this).attr("data-index-toggle");
		$("#panel-menu > li[data-index-toggle]").removeClass("active");
		$(this).addClass("active");
		$(".items-panels > li[data-index!='" + index + "']").hide();
		$(".items-panels > li[data-index='" + index + "']").show();
		treatResize();
	    });
};

var initializeHelpMenu = function()
{
    $("#exchange-panel > li[data-index]").hide();
    $("#exchange-panel > li[data-index='1']").show();
    $("#exchange-menu > li[data-index-toggle]").click(function()
	    {
		var index = $(this).attr("data-index-toggle");
		$("#exchange-menu > li[data-index-toggle]").removeClass("active");
		$(this).addClass("active");
		$("#exchange-panel > li[data-index!='" + index + "']").hide();
		$("#exchange-panel > li[data-index='" + index + "']").show();
		treatResize();
	    });
    $("#load-expired-nhelp--button").click(function()
	    {
		var b = $(this);
		b.html("Chargement...");
		$.get("Echanges/oldneed", function(e)
		    {
			$("#exchange-panel li[data-index='2'] ul[data-role='liste-competences']").append(e);
			b.hide();
			queryUserStatus();
		    });
	    });
    $("#load-expired-help--button").click(function()
	    {
		var b = $(this);
		b.html("Chargement...");
		$.get("Echanges/oldhelp", function(e)
		    {
			$("#exchange-panel li[data-index='1'] ul[data-role='liste-competences']").append(e);
			b.hide();
			queryUserStatus();
		    });
	    });
};

var queryUserStatus = function()
{
    $("[data-locate]").each(function()
	    {
		var ct = $(this);
		var login = $(this).attr("data-login");
		$.ajax({
		    url: "User/getstatus",
		    type: 'POST',
		    data: { login : login },
		    dataType: "json"
		}).done(function(e)
		    {
			if (e.error == undefined)
		{
		    ct.attr("style", "");
		    ct.addClass("online");
		    ct.html(e.last_host.replace(".42.fr", ""));
		}
			else
		{
		    ct.removeClass("online");
		    ct.addClass("offline");
		    ct.attr("style", "color: #D95B43;");
		}
		    });
	    });
}

var addClearItems = function()
{
    /**
     * On met les icones de supression, teach & learn
     */
    $('div[data-role="form-container"] fieldset').each(function() {
	var fieldset = $(this);
	var radioElt = fieldset.find(".radio input").first();
	if (fieldset.find(".clear-all").length === 0)
    {
	fieldset.append("<a class='clear-all' data-items='"
	    + radioElt.attr("name")
	    + "'><span class='icon-multiply'></span></a>");
    }
    });

    /**
     * On bind le clic sur les boutons de supression à une requete ajax
     * pour supprimer le niveau
     */
    $("div[data-role='form-container'] form fieldset a.clear-all").click(function() {
	var item = $(this);
	var concerned = item.parent().find(".radio input[name='niveau']");
	$.ajax({
	    url: "User/deletecompetence",
	    type: 'POST',
	    data: {
		id_competence: item.parent().parent().find("input[name='id_competence']").val(),
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

var afterUserUpdate = function(responseText, statusText, xhr, $form) {
    console.log("after");
    if (responseText[0] == "1")
    {
	$('a[role="indicator"]').html("<span class='icon-checkmark2'></span> Paramètres mis à jour");
	$("#status_public_icon").removeClass("icon-clock3").addClass("icon-checkmark2");
	$('#modal-params').modal('hide');
    }
    else
    {
	$("#status_public_icon").removeClass("icon-clock3").addClass("icon-multiply");
	$("#status_update_uid").html(responseText);
    }
};

var initFormComportement = function()
{
    $('#form_search_uid').submit(function(e) {
	e.stopImmediatePropagation();
	window.muffin.searchUSerData();
	return false;
    });

    $('#form_params').submit(function() {

	var options = {
	    target: '#form-result', // target element(s) to be updated with server response 
	beforeSubmit: function() {
	    $("#status_public_icon").removeClass("icon-uniF488")
	.removeClass("icon-multiply")
	.removeClass("icon-checkmark2")
	.addClass("icon-clock3");
	}, // pre-submit callback 
	success: afterUserUpdate, // post-submit callback 
	url: "User/update",
	type: "post"        // 'get' or 'post', override for form's 'method' attribute 
	};

	console.log("update");
	$(this).ajaxSubmit(options);

	return false;
    });
};


var reloadHandlers = function()
{
    NProgress.configure({showSpinner: false});
    $("a").smoothScroll();

    treatResize();
    $(window).resize(treatResize);
    bindAjaxEvents();
    initFormComportement();
    initializePanelMenu();
    initializeHelpMenu();
    try
    {
	queryUserStatus();
    }
    catch(e)
    {
	;
    }
    $("[data-toggle='tooltip']").tooltip({container: "body", placement: "auto bottom"});
    $('aside.side-menu > ul').affix({
	offset: {
	    top: 231
	, bottom: function() {
	    return (this.bottom = $('.footer-container').outerHeight(true));
	}
	}
    });
};


