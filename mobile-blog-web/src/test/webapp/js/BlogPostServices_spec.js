describe('BlogPostServices', function() {

    beforeEach(module('BlogPostServices'));

    afterEach(function() {
        jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));
    });


    describe('BlogPostList', function() {
        var data = getJSONFixture('blog-post-list.json');

        beforeEach(inject(function(_$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('../rest/blog').respond(data);
        }));

        it('should send get request to "..rest/blog"', inject(function(BlogPostService) {
            BlogPostService.fetchBlogPosts();
            $httpBackend.flush();
        }));

        it("should fetch 2 blog posts", inject(function(BlogPostService) {
            var blogPosts;
            BlogPostService.fetchBlogPosts().success(function(data) {
                blogPosts = data;
            });
            $httpBackend.flush();
            expect(blogPosts.length).toEqual(2);
        }));
    });


    describe('BlogPost', function() {
        var data = getJSONFixture('blog-post.json');

        beforeEach(inject(function(_$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('../rest/blog/xyz').respond(data);
        }));

        it('should send get request to "../test/blog/xyz"', inject(function(BlogPostService) {
            BlogPostService.fetchBlogPost('xyz');
            $httpBackend.flush();
        }));

        it("should fetch 1 blog post", inject(function(BlogPostService) {
            var blogPost = [];
            expect(blogPost.length).toEqual(0);

            BlogPostService.fetchBlogPost('xyz').success(function(data) {
                blogPost = data;
            });
            $httpBackend.flush();

            expect(blogPost).toEqual(data);
        }));
    });


    describe('CommentList', function() {
        var data = getJSONFixture('comment-list.json');

        beforeEach(inject(function(_$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('../rest/blog/xyz/comment').respond(data);
        }));

        it('should send get request to "../rest/blog/xyz/comment"', inject(function(CommentService) {
            CommentService.fetchComments('xyz');
            $httpBackend.flush();
        }));

        it('should fetch 2 comments', inject(function(CommentService) {
            var comments = [];
            expect(comments.length).toEqual(0);

            CommentService.fetchComments('xyz').success(function(data) {
                comments = data;
            });
            $httpBackend.flush();

            expect(comments.length).toEqual(2);
        }));
    });

});
