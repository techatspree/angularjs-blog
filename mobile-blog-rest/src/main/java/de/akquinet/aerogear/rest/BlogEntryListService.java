package de.akquinet.aerogear.rest;

import java.util.List;
import java.util.logging.Logger;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import de.akquinet.aerogear.BlogEntry;
import de.akquinet.aerogear.dao.BlogEntryDao;

@Stateless
@Path("/blog")
public class BlogEntryListService {

	private static final int MAX_RESULTS = 5;

	@Inject
	private Logger log;

	@Inject
	private BlogEntryDao blogEntryDao;

	@GET
	@Produces({ MediaType.TEXT_XML, MediaType.APPLICATION_JSON })
	public List<BlogEntry> getResultList(
			@QueryParam("firstResult") final int firstResult) {

		return blogEntryDao.find(MAX_RESULTS, firstResult);

	}

}
