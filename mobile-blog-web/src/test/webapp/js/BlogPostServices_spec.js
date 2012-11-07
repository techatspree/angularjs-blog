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
            BlogPostService.getBlogPosts();
            $httpBackend.flush();
        }));

        it("should fetch 2 blog posts", inject(function(BlogPostService) {
            var blogPostList = BlogPostService.getBlogPosts();
            $httpBackend.flush();
            expect(blogPostList.length).toEqual(2);
        }));
    });


    describe('BlogPost', function() {
        var data = getJSONFixture('blog-post.json');

        beforeEach(inject(function(_$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('../rest/blog/xyz').respond(data);
        }));

        it('should send get request to "../test/blog/xyz"', inject(function(BlogPostService) {
            BlogPostService.getBlogPost('xyz');
            $httpBackend.flush();
        }));

        it("should fetch 1 blog post", inject(function(BlogPostService) {
            var blogPost = BlogPostService.getBlogPost('xyz');
            $httpBackend.flush();
            expect(blogPost).toEqualData(data);
        }));
    });


    describe('CommentList', function() {
        var data = getJSONFixture('comment-list.json');

        beforeEach(inject(function(_$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('../rest/blog/xyz/comment').respond(data);
        }));

        it('should send get request to "../rest/blog/xyz/comment"', inject(function(CommentService) {
            CommentService.getComments('xyz');
            $httpBackend.flush();
        }));

        it('should fetch 2 comments', inject(function(CommentService) {
            var commentList = CommentService.getComments('xyz');
            $httpBackend.flush();
            expect(commentList.length).toEqual(2);
        }));
    });

});
