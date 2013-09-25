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

(function($) {

  var indexed = []; // List of all dom elements already applied.

  $.fn.stalactite = function(customOptions) {

    var resizing = false;
    var options = $.extend({}, $.fn.stalactite.defaultOptions, customOptions);
        options.cssSelector = options.cssPrefix + '-loaded';

    return this.each(function() {

      var $this = $(this);
      var packTimeout = null;
      var $newElems = prep($this, options);
      appendLoader($this);

      var prevThisIndex = index($this);
      var params = {
        row: 0,
        prevMinIndex: 0,
        prevMaxIndex: 0,
        i: 0
      };

      // Check for elements already packed.
      if (prevThisIndex >= 0) {

        if ($this.children().index($newElems[0]) > 0) {
          params = indexed[prevThisIndex];
        }

      }

      var row = params.row;

      // Bind events for window resizing
      if (options.fluid) {
        $this.css('width', 'auto');
        $(window).bind('resize', function() {
          if (packTimeout) {
            clearTimeout(packTimeout);
          } else {
            appendLoader($this);
          }
          resizing = true;
          packTimeout = setTimeout(function() {
            resizing = false;
            packTimeout = null;
            row = 0;
            params = {
              row: 0,
              prevMinIndex: 0,
              prevMaxIndex: 0,
              i: 0
            };
            indexed = [];
            pack($this, calculateOffset, params, options);
          }, 2000);
        });
      }

      // Gather all assets in the element
      var selector = 'img, embed, iframe, audio, video, div';
      var $assets = $this
        .children()
        .not(options.cssSelector)
        .find(selector);
      var $content = $this
        .find(':not(' + selector + ')');

      // var loadedImgs = 0;
      // Make sure all the elements are loaded before we start packing
      // if ($assets.length > 0) {
      //   $assets.each(function(i) {
      //     console.log('loading');
      //     var $asset = $(this).bind('load', function() {
      //       animateIn($asset);
      //       loadedImgs++;
      //       console.log(loadedImgs, $assets.length);
      //       if (loadedImgs >= $assets.length) {
      //         pack($this, calculateOffset, params, options);
      //       }
      //     });
      //   });
      // } else {
      //   console.log('no need to load');
      pack($this, calculateOffset, params, options);
      // }

      // This measures the distance between the current child element and the
      // element `relative`ly above it. Then animates to the pack.
      function calculateOffset($content, origin, prevMinIndex, prevMaxIndex, i) {

        if (i >= $content.length) {
          if (indexed[prevThisIndex]) { // update
            indexed[prevThisIndex] = $.extend(indexed[prevThisIndex], params);
          } else {  // push a new instance
            indexed.push($.extend({ dom: $content.parent('div')[0] }, params));
          }
          options.complete.apply(this);
          removeLoader(options);
          return;
        } else if (resizing && options.fluid) {
          removeLoader(options);
          return;
        }

        var $this = $($content[i]); 
        var $prev = $($content[i - 1]);

        var outerWidth = $this.outerWidth(true);
        var outerHeight = $this.outerHeight(true);

        var hMargin = outerWidth - $this.outerWidth();
        var vMargin = outerHeight - $this.outerHeight();

        var x1 = $this.offset().left - hMargin, x2 = x1 + outerWidth,
            y1 = $this.offset().top - vMargin, y2 = y1 + outerHeight;

        if ($prev.length > 0) {
          if (x1 < $prev.offset().left && i > 0 && i !== params.i) {
            row++;
            params.row = row;
            params.prevMinIndex = prevMinIndex = prevMaxIndex;
            params.prevMaxIndex = prevMaxIndex = i - 1;
            params.i = i;
          }
        }

        var offsetY = 0;

        if (row > 0) {

          for (var j = prevMaxIndex; j >= prevMinIndex; j--) {

            var $prev = $($content[j]);

            outerWidth = $prev.outerWidth(true);
            outerHeight = $prev.outerHeight(true);

            hMargin = outerWidth - $prev.outerWidth();
            vMargin = outerHeight - $prev.outerHeight();

            var a1 = $prev.offset().left - hMargin, a2 = a1 + outerWidth,
                b1 = $prev.offset().top - vMargin, b2 = b1 + outerHeight;

            if (a1 >= x2 || a2 <= x1) {
              continue;
            } else if (offsetY < b2) {
              offsetY = b2;
            }

          }

          offsetY = offsetY - y1;

        } else {
          offsetY = - parseInt($this.css('margin-top').toString().replace('px', ''));
        }

        animateIn($this, {
          opacity: 1,
          marginTop: '+=' + offsetY
        }, function() {
          calculateOffset($content, origin, prevMinIndex, prevMaxIndex, i + 1);
        });

      }

    });

    // Appends a custom loader to the body and places at the top left corner of
    // the element invoking the plugin.
    function appendLoader($dom) {

      var origin = {
        x: $dom.offset().left + ($dom.outerWidth() - $dom.width()) / 2,
        y: $dom.offset().top + ($dom.outerHeight() - $dom.height()) / 2
      };

      var $loader = $('#stalactite-loader');
      if ($loader.length <= 0) {
        $loader = $('<p class="stalactite-loader" style="display: none;"/>');
      }
      $loader
        .css({
          position: 'absolute',
          top: origin.y,
          left: origin.x
        })
        .html(options.loader)
        .appendTo('body');

      $loader
        .find('img')
        .bind('load', function() {
          $loader.fadeIn();
        });

    }

    function animateIn($dom, params, callback) {
      var args = $.extend({}, params, options.styles);
      if (args.opacity == $dom.css('opacity')) {  // Weird bug.
        delete args.opacity;
      }
      $dom.css('z-index', 'auto').stop().animate(args,
        options.duration, options.easing, callback);
    }

  };

  function index($dom) {
    var dom = $dom[0];
    var iterator = -1;
    for (var i = 0; i < indexed.length; i++) {
      var d = indexed[i].dom;
      if (dom === d) {
        iterator = i;
        break;
      }
    }
    return iterator;
  }

  function removeLoader(options) {
    $((options.cssPrefix + '-loader')).fadeOut();
  }

  // Before all assets are loaded, lets make sure that all children elements
  // within stalactite have the same structural css styling.
  function prep($dom, options) {

    var result = $dom
      .children()
      .not(options.cssSelector);

    if (options.cssPrep) {
      result
        .css({
          position: 'relative',
          display: 'inline-block',
          verticalAlign: 'top',
          opacity: 0,
          zIndex: -1
        });
    }

    return result;

  }

  // As we go through and pack each element, let's make sure that they're marked
  // so as not to have to repeat packing logic.
  function pack($dom, callback, params, options) {

    var $content = $dom.children().addClass(options.cssSelector);

    var vMargin = $dom.outerHeight(true) - $dom.outerHeight();
    var hMargin = $dom.outerWidth(true) - $dom.outerWidth();

    var origin = {
      x: $dom.offset().left - hMargin + ($dom.outerWidth(true) - $dom.width()) / 2,
      y: $dom.offset().top - vMargin + ($dom.outerHeight(true) - $dom.height()) / 2
    };

    callback.apply(this, [$content, origin, params.prevMinIndex, params.prevMaxIndex, params.i]);

  }

  $.fn.stalactite.defaultOptions = {
    duration: 150,
    easing: 'swing',
    cssPrefix: '.stalactite',
    cssPrep: true,
    fluid: true,
    loader: '<img src="data:image/gif;base64, R0lGODlhEAAQAPQAAP///zMzM/n5+V9fX5ycnDc3N1FRUd7e3rm5uURERJGRkYSEhOnp6aysrNHR0WxsbHd3dwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla+KIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAkKAAAALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK+o2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkECQoAAAAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC+0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU/NXcDBHwkaw1cKQ8MiyEAIfkECQoAAAAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK+kCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm/4AhACH5BAkKAAAALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAkKAAAALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg+boUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC+RAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA==" />',
    styles: {},
    complete: function(value) { return value; }
  };

})(jQuery);
