package de.akquinet.aerogear.rest;

import java.util.List;
import java.util.logging.Logger;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.validation.ValidationException;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import de.akquinet.aerogear.BlogEntry;
import de.akquinet.aerogear.Comment;
import de.akquinet.aerogear.User;
import de.akquinet.aerogear.dao.BlogEntryDao;
import de.akquinet.aerogear.dao.CommentDao;
import de.akquinet.aerogear.dao.UserDao;

@Stateless
@Path("/blog/{blogId:[1-9][0-9]*}/comment")
public class CommentService {

	@Inject
	private Logger log;

	@Inject
	private BlogEntryDao blogEntryDao;

	@Inject
	private CommentDao commentDao;

	@Inject
	private UserDao userDao;

	@Inject
	private ContraintValidator validator;

	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.TEXT_XML })
	public List<Comment> getResultList(@PathParam("blogId") final long blogId) {
		return commentDao.findComments(blogId);
	}

	@GET
	@Path("{commentId:[1-9][0-9]*}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.TEXT_XML })
	public Comment findComment(@PathParam("commentId") final long id) {
		final Comment comment = commentDao.find(id);
		log.info("findComment(" + id + ") " + comment);
		return comment;
	}

	@DELETE
	@Path("/{commentId:[1-9][0-9]*}")
	public void deleteComment(@PathParam("commentId") final long id) {
		log.info("delete comment " + id);
		commentDao.remove(id);
	}

	@PUT
	@Path("/{commentId:[1-9][0-9]*}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.TEXT_XML })
	public Comment updateBlogEntry(@PathParam("commentId") final long id,
			@FormParam("content") final String content)
			throws ValidationException {
		final Comment comment = commentDao.find(id);
		comment.setContent(content);
		validator.validate(comment);

		return comment;

	}

	@POST
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.TEXT_XML })
	@Produces({ MediaType.APPLICATION_JSON, MediaType.TEXT_XML })
	public Comment saveCommentEntry(@PathParam("blogId") final long blogEntryId, final Comment comment) {
		final BlogEntry blogEntry = blogEntryDao.find(blogEntryId);
		final Long id = comment.getAuthor().getId();
		final User author = userDao.find(id);
		final Comment newComment = new Comment();
		newComment.setAuthor(author);
		newComment.setBlogEntry(blogEntry);
		newComment.setContent(comment.getContent());

		commentDao.persist(newComment);
		return newComment;
	}

}
