/**
* jQuery Stalactite : Lightweight Element Packing
* Examples and documentation at: http://jonobr1.github.com/stalactite
* Copyright (c) 2011 Jono Brandel
* Version: 0.1 (8-SEPTEMBER-2011)
* Requires: jQuery v1.6.2 or later
*
* Copyright 2011 jonobr1
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

(function(a){function D(h){h=h[0];for(var a=0;a<l.length;a++)if(h===l[a].dom)return a;return-1}function E(a,f){var n=a.children().not(f.cssSelector);f.cssPrep&&n.css({position:"relative",display:"inline-block",verticalAlign:"top",opacity:0,zIndex:-1});return n}function B(a,f,n,r){r=a.children().addClass(r.cssSelector);var c=(a.outerHeight(!0)-a.outerHeight())/2,d=(a.outerWidth(!0)-a.outerWidth())/2;a={x:a.offset().left-d,y:a.offset().top-c};f.call(this,r,a,n.prevMinIndex,n.prevMaxIndex,n.i)}var l=
[];a.fn.stalactite=function(h){function f(d){var b=d.offset().left+(d.outerWidth()-d.width())/2;d=d.offset().top+(d.outerHeight()-d.height())/2;var e=a("#stalactite-loader");0>=e.length&&(e=a('<p class="stalactite-loader" style="display: none;"/>'));e.css({position:"absolute",top:d,left:b}).html(c.loader).appendTo("body");e.find("img").bind("load",function(){e.fadeIn()})}function n(d,b,e){b=a.extend({},b,c.styles);b.opacity==d.css("opacity")&&delete b.opacity;d.css("z-index","auto").stop().animate(b,
c.duration,c.easing,e)}var r=!1,c=a.extend({},a.fn.stalactite.defaultOptions,h);c.cssSelector=c.cssPrefix+"-loaded";return this.each(function(){function d(b,e,h,f,p){if(p>=b.length)c.complete.apply(this),a(c.cssPrefix+"-loader").fadeOut();else if(r&&c.fluid)a(c.cssPrefix+"-loader").fadeOut();else{var q=a(b[p]),g=a(b[p-1]),l=q.outerWidth(!0),t=q.outerHeight(!0),m=q.outerWidth(),w=q.outerHeight(),u=Math.max(l,m),y=Math.max(t,w),v=l-m,z=t-w,t=q.offset().left-v,w=t+u,l=q.offset().top-z;0<g.length&&t<
g.offset().left&&0<p&&p!==k.i&&(x++,k.row=x,k.prevMinIndex=h=f,k.prevMaxIndex=f=p-1,k.i=p);m=0;if(0<x){for(var A=f;A>=h;A--)g=a(b[A]),u=g.outerWidth(!0),y=g.outerHeight(!0),v=u-g.outerWidth(),z=y-g.outerHeight(),v=g.offset().left-v,u=v+u,g=g.offset().top-z+y,v>=w||u<=t||m<g&&(m=g);m-=l}else m=-parseInt(q.css("margin-top").toString().replace("px",""));n(q,{opacity:1,marginTop:m},function(){d(b,e,h,f,p+1)})}}this._stalactite||(this._stalactite={});var b=a(this),e=null,h=E(b,c);f(b);var C=D(b),k={row:0,
prevMinIndex:0,prevMaxIndex:0,i:0};0<=C&&0<b.children().index(h[0])&&(k=l[C]);var x=k.row;c.fluid&&!this._stalactite.listening?(b.css("width","auto"),this._stalactite.packTimeout=function(){r=!1;e=null;x=0;k={row:0,prevMinIndex:0,prevMaxIndex:0,i:0};l=[];B(b,d,k,c)},this._stalactite.resize=function(){e?clearTimeout(e):f(b);r=!0;e=setTimeout(b[0]._stalactite.packTimeout,2E3)},a(window).bind("resize",this._stalactite.resize),this._stalactite.listening=!0):!c.fluid&&this._stalactite.listening&&a(window).unbind(this._stalactite.resize);
b.children().not(c.cssSelector).find("img, embed, iframe, audio, video, div");b.find(":not(img, embed, iframe, audio, video, div)");B(b,d,k,c)})};a.fn.stalactite.defaultOptions={duration:150,easing:"swing",cssPrefix:".stalactite",cssPrep:!0,fluid:!0,loader:'<img src="data:image/gif;base64, R0lGODlhEAAQAPQAAP///zMzM/n5+V9fX5ycnDc3N1FRUd7e3rm5uURERJGRkYSEhOnp6aysrNHR0WxsbHd3dwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla+KIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAkKAAAALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK+o2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkECQoAAAAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC+0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU/NXcDBHwkaw1cKQ8MiyEAIfkECQoAAAAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK+kCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm/4AhACH5BAkKAAAALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAkKAAAALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg+boUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC+RAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA==" />',
styles:{},complete:function(a){return a}}})(jQuery);