/**
 * @author Till Hermsen
 * @date 25.10.12
 */

'use strict';

angular.module('router', ['BlogPostServices', 'BlogPostFilters']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/blog',
                {templateUrl: 'app/views/blog-post-list.html', controller: BlogPostListCtrl}
            ).
            when('/blog/:blogPostId',
                {templateUrl: 'app/views/blog-post.html', controller: BlogPostCtrl}
            ).
            otherwise({redirectTo: '/blog'});
    }]);
