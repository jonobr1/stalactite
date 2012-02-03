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

(function(a){function u(h){for(var h=h[0],a=-1,c=0;c<d.length;c++)if(h===d[c].dom){a=c;break}return a}function x(a,d){var c=a.children().not(d.cssSelector);d.cssPrep&&c.css({position:"relative",display:"inline-block",verticalAlign:"top",opacity:0,zIndex:-1});return c}function k(a,d,c,l){l=a.children().addClass(l.cssSelector);a={x:a.offset().left+(a.outerWidth()-a.width())/2,y:a.offset().top+(a.outerHeight()-a.height())/2};d.apply(this,[l,a,c.prevMinIndex,c.prevMaxIndex,c.i])}var d=[];a.fn.stalactite=
function(h){function q(f){var b=f.offset().left+(f.outerWidth()-f.width())/2,f=f.offset().top+(f.outerHeight()-f.height())/2,c=a("#stalactite-loader");0>=c.length&&(c=a('<p class="stalactite-loader" style="display: none;"/>'));c.css({position:"absolute",top:f,left:b}).html(e.loader).appendTo("body");c.find("img").load(function(){c.fadeIn()})}function c(c,b,d){b=a.extend({},b,e.styles);b.opacity==c.css("opacity")&&delete b.opacity;c.css("z-index","auto").stop().animate(b,e.duration,e.easing,d)}var l=
!1,e=a.extend({},a.fn.stalactite.defaultOptions,h);e.cssSelector=e.cssPrefix+"-loaded";return this.each(function(){function f(b,h,k,r,j){if(j>=b.length)d[p]?d[p]=a.extend(d[p],g):d.push(a.extend({dom:b.parent("div")[0]},g)),e.complete.apply(this),a(e.cssPrefix+"-loader").fadeOut();else if(l&&e.fluid)a(e.cssPrefix+"-loader").fadeOut();else{var n=a(b[j]),i=a(b[j-1]),m=n.offset().left,q=m+n.outerWidth(),t=n.offset().top;n.outerHeight();0<i.length&&m<i.offset().left&&0<j&&j!==g.i&&(s++,g.row=s,g.prevMinIndex=
k=r,g.prevMaxIndex=r=j-1,g.i=j);var o=0;if(0<s){for(var v=r;v>=k;v--){var i=a(b[v]),w=i.offset().left,u=w+i.outerWidth(),i=i.offset().top+i.outerHeight();w>=q||u<=m||o<i&&(o=i)}o-=t}else o=-parseInt(n.css("margin-top").toString().replace("px",""));c(n,{opacity:1,marginTop:"+="+o},function(){f(b,h,k,r,j+1)})}}var b=a(this),h=null,y=x(b,e);q(b);var p=u(b),g={row:0,prevMinIndex:0,prevMaxIndex:0,i:0};0<=p&&0<b.children().index(y[0])&&(g=d[p]);var s=g.row;e.fluid&&(b.css("width","auto"),a(window).bind("resize",
function(){h?clearTimeout(h):q(b);l=!0;h=setTimeout(function(){l=!1;h=null;s=0;g={row:0,prevMinIndex:0,prevMaxIndex:0,i:0};d=[];k(b,f,g,e)},2E3)}));var m=b.children().not(e.cssSelector).find("img, embed, iframe, audio, video, div");b.find(":not(img, embed, iframe, audio, video, div)");var t=0;0<m.length?m.each(function(){var d=a(this).load(function(){c(d);t++;t>=m.length&&k(b,f,g,e)})}):k(b,f,g,e)})};a.fn.stalactite.defaultOptions={duration:150,easing:"swing",cssPrefix:".stalactite",cssPrep:!0,fluid:!0,
loader:'<img src="data:image/gif;base64, R0lGODlhEAAQAPQAAP///zMzM/n5+V9fX5ycnDc3N1FRUd7e3rm5uURERJGRkYSEhOnp6aysrNHR0WxsbHd3dwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla+KIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAkKAAAALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK+o2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkECQoAAAAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC+0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU/NXcDBHwkaw1cKQ8MiyEAIfkECQoAAAAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK+kCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm/4AhACH5BAkKAAAALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAkKAAAALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg+boUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC+RAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA==" />',
styles:{},complete:function(a){return a}}})(jQuery);