/**
 * @author Till Hermsen
 * @date 25.10.12
 */

'use strict';

angular.module('BlogPostFilters', []).

    filter('previewText', function() {
        return function(input) {
            if (input.length > 300) {
                input = $.trim(input).substring(0, 300)
                    .split(" ").slice(0, -1).join(" ") + "...";
            }
            return input;
        };
    }).
    filter('addLineBreaks', function() {
        return function(input) {
            console.log(input);

            return input.replace(/\n/g, '<br />');
        }
    });
