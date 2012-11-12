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
            BlogPostService.fetchBlogPosts();
            $httpBackend.flush();
            expect(BlogPostService.blogPosts.length).toEqual(2);
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
            var blogPost;
            BlogPostService.fetchBlogPost('xyz').then(function(response) {
                blogPost = response;
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
            CommentService.fetchComments('xyz');
            $httpBackend.flush();
            expect(CommentService.comments.length).toEqual(2);
        }));
    });

});
