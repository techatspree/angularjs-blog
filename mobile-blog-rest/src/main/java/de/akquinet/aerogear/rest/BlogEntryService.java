package de.akquinet.aerogear.rest;

import java.util.List;
import java.util.logging.Logger;

import javax.annotation.Resource;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.jms.*;
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
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import de.akquinet.aerogear.BlogEntry;
import de.akquinet.aerogear.User;
import de.akquinet.aerogear.dao.BlogEntryDao;
import de.akquinet.aerogear.dao.UserDao;

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

    @Resource(mappedName = "java:/ConnectionFactory")
    private ConnectionFactory connectionFactory;

    @Resource(mappedName = "java:/topic/test")
    private Topic topic;

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

        Connection connection = null;
        try {
            connection = connectionFactory.createConnection();
            Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
            MessageProducer messageProducer = session.createProducer(topic);
            connection.start();
            TextMessage replyMessage = session.createTextMessage(blogEntry.getContent());
            messageProducer.send(replyMessage);
        } catch (JMSException e) {
            e.printStackTrace();
        }finally {
            if (connection != null) {
                try {
                    connection.close();
                } catch (JMSException e) {
                }
            }
        }

		blogEntryDao.persist(newBlogEntry);
		return newBlogEntry;
	}

}
