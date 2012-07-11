package de.akquinet.aerogear.rest;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.logging.Logger;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.ValidationException;
import javax.validation.Validator;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import de.akquinet.aerogear.BlogEntry;
import de.akquinet.aerogear.dao.BlogEntryDao;

@Stateless
@Path("/blog")
public class BlogEntryService {

	private static final int MAX_RESULTS = 5;

	@Inject
	private Logger log;

	@Inject
	private BlogEntryDao blogEntryDao;

	@Inject
	private Validator validator;

	@GET
	@Produces({ MediaType.TEXT_XML, MediaType.APPLICATION_JSON })
	public List<BlogEntry> getResultList(
			@QueryParam("firstResult") final int firstResult) {

		return blogEntryDao.find(MAX_RESULTS, firstResult);
	}

	@GET
	@Path("/{id:^[1-9][0-9]*}")
	@Produces({ MediaType.TEXT_XML, MediaType.APPLICATION_JSON })
	public BlogEntry findBlogEntry(@PathParam("id") final long id) {
		BlogEntry blogEntry = blogEntryDao.find(id);
		log.info("findBlogEntry( " + id + ") " + blogEntry);
		return blogEntry;
	}

	@DELETE
	@Path("/{id:^[1-9][0-9]*}")
	public void deleteBlogEntry(@PathParam("id") final long id) {
		blogEntryDao.remove(id);
	}

	@PUT
	@Path("/{id:^[1-9][0-9]*}")
	@Produces({ MediaType.TEXT_XML, MediaType.APPLICATION_JSON })
	public BlogEntry updateBlogEntry(@PathParam("id") final long id,
			@FormParam("title") final String title,
			@FormParam("content") final String content)
			throws ValidationException {
		final BlogEntry entry = blogEntryDao.find(id);
		entry.setContent(content);
		entry.setTitle(title);
		validate(entry);

		return entry;

	}

	@POST
	@Consumes({ MediaType.TEXT_XML, MediaType.APPLICATION_JSON })
	@Produces({ MediaType.TEXT_XML, MediaType.APPLICATION_JSON })
	public BlogEntry saveBlogEntry(final BlogEntry blogEntry){
		return null;
	}

	private void validate(final BlogEntry entry) {
		final Set<ConstraintViolation<BlogEntry>> constraintViolations = validator
				.validate(entry);
		if (!constraintViolations.isEmpty()) {
			throw new ConstraintViolationException(
					new HashSet<ConstraintViolation<?>>(constraintViolations));
		}
	}
}
