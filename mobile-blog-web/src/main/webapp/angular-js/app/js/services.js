/**
 * @author Till Hermsen
 * @date 25.10.12
 */

'use strict';

angular.module('BlogPostServices', ['ngResource']).
    factory('BlogPost', function($resource){
        return $resource('../rest/blog/:blogPostId', {}, {});
    }).
    factory('Comment', function($resource) {
        return $resource('../rest/blog/:blogPostId/comment', {}, {});
    });

angular.module('UserServices', ['ngResource']).
    value('User', {
        isLoggedIn: function() {
            if (sessionStorage.getItem('user')) {
                return true;
            } else {
                return false;
            }
        }
    });

