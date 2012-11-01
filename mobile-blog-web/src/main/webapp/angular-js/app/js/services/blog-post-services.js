/**
 * @author Till Hermsen
 * @date 31.10.12
 */

'use strict';

angular.module('blogPost.services', ['ngResource']).

    factory('post', function($resource){
        return $resource('../rest/blog/:blogPostId', {}, {});
    }).

    factory('comment', function($resource) {
        return $resource('../rest/blog/:blogPostId/comment', {}, {});
    });
