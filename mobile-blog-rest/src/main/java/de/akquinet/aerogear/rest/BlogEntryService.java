package de.akquinet.aerogear.rest;

import de.akquinet.aerogear.BlogEntry;
import de.akquinet.aerogear.User;
import de.akquinet.aerogear.dao.BlogEntryDao;
import de.akquinet.aerogear.dao.UserDao;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.validation.ValidationException;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;
import java.util.logging.Logger;

@Stateless
@Path("/blog")
public class BlogEntryService {

	private static final int MAX_RESULTS = 1000;

	@Inject
	private Logger log;

	@Inject
	private BlogEntryDao blogEntryDao;

	@Inject
	private UserDao userDao;

	@Inject
	private ContraintValidator validator;



	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.TEXT_XML })
	public List<BlogEntry> getResultList(
			@QueryParam("firstResult") final int firstResult) {

		return blogEntryDao.find(MAX_RESULTS, firstResult);
	}

	@GET
	@Path("/{id:[1-9][0-9]*}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.TEXT_XML })
	public BlogEntry findBlogEntry(@PathParam("id") final long id) {
		BlogEntry blogEntry = blogEntryDao.find(id);
		log.info("findBlogEntry(" + id + ") " + blogEntry);
		return blogEntry;
	}

	@DELETE
	@Path("/{id:[1-9][0-9]*}")
	public void deleteBlogEntry(@PathParam("id") final long id) {
		log.info("delete blog entry " + id);
		blogEntryDao.remove(id);
	}

	@PUT
	@Path("/{id:[1-9][0-9]*}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.TEXT_XML })
	public BlogEntry updateBlogEntry(@PathParam("id") final long id,
			@FormParam("title") final String title,
			@FormParam("content") final String content)
			throws ValidationException {
		final BlogEntry entry = blogEntryDao.find(id);
		entry.setContent(content);
		entry.setTitle(title);
		validator.validate(entry);

		return entry;

	}

	@POST
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.TEXT_XML })
	@Produces({ MediaType.APPLICATION_JSON, MediaType.TEXT_XML })
	public BlogEntry saveBlogEntry(final BlogEntry blogEntry) {
		final Long id = blogEntry.getAuthor().getId();
		final User author = userDao.find(id);
		final BlogEntry newBlogEntry = new BlogEntry();
		newBlogEntry.setAuthor(author);
		newBlogEntry.setTitle(blogEntry.getTitle());
		newBlogEntry.setContent(blogEntry.getContent());

		blogEntryDao.persist(newBlogEntry);
		return newBlogEntry;
	}

}
