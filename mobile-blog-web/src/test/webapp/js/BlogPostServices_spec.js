describe('BlogPostServices', function() {

    beforeEach(module('BlogPostServices'));

    beforeEach(function(){
        this.addMatchers({
            toEqualData: function(expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });


    afterEach(function() {
        jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));
    });


    describe('BlogPostList', function() {
        beforeEach(inject(function(_$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('../rest/blog').
                respond([
                {
                    "id":1, "author":{"firstname":"Elvis", "surname":"Presley"},
                    "title":"Lorem ipsum dolor sit amet", "content":"Lorem ipsum dolor sit amet",
                    "created":"2012-07-12T00:19:32.146+02:00"
                },
                {
                    "id":2, "author":{"firstname":"John", "surname":"Doe"},
                    "title":"Lorem ipsum dolor sit amet", "content":"Lorem ipsum dolor sit amet",
                    "created":"2012-07-12T00:19:32.146+02:00"
                }
            ]);
        }));

        it("should fetch 2 blog posts", inject(function(BlogPostService) {
            var blogPostList = BlogPostService.getBlogPosts();
            $httpBackend.flush();
            expect(blogPostList.length).toEqual(2);
        }));
    });


    describe('BlogPost', function() {
        beforeEach(inject(function(_$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('../rest/blog/1').respond(blogPostData());
        }));

        var blogPostData = function() {
            return {
                "id":1, "author":{"firstname":"John", "surname":"Doe"},
                "title":"Lorem ipsum dolor sit amet", "content":"Lorem ipsum dolor sit amet",
                "created":"2012-07-12T00:19:32.146+02:00"
            };
        };

        it("should fetch 1 blog post", inject(function(BlogPostService) {
            var blogPost = BlogPostService.getBlogPost(1);
            $httpBackend.flush();
            expect(blogPost).toEqualData(blogPostData());
        }));
    });


    describe('CommentList', function() {
        beforeEach(inject(function(_$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('../rest/blog/xyz/comment').respond([
                {
                    "id":1, "author":{"firstname":"Elvis", "surname":"Presley"},
                    "content":"Lorem ipsum dolor sit amet",
                    "created":"2012-07-12T00:19:32.146+02:00"
                },
                {
                    "id":2, "author":{"firstname":"John", "surname":"Doe"},
                    "content":"Lorem ipsum dolor sit amet",
                    "created":"2012-07-12T00:19:32.146+02:00"
                }
            ]);
        }));

        it('should fetch 2 comments', inject(function(CommentService) {
            var commentList = CommentService.getComments('xyz');
            $httpBackend.flush();
            expect(commentList.length).toEqual(2);
        }));
    });



});
