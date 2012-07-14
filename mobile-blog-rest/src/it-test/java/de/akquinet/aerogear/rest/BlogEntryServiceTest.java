package de.akquinet.aerogear.rest;

import static de.akquinet.aerogear.rest.deployment.TestWebArchiveDeployment.URL;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response.Status;

import junit.framework.Assert;

import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.resteasy.client.ClientRequest;
import org.jboss.resteasy.client.ClientResponse;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.junit.Test;
import org.junit.runner.RunWith;

import de.akquinet.aerogear.BlogEntry;
import de.akquinet.aerogear.rest.deployment.TestWebArchiveDeployment;

@RunWith(Arquillian.class)
public class BlogEntryServiceTest {

	@Deployment(testable = false)
	public static WebArchive createDeployment() {
		return TestWebArchiveDeployment.WEB_ARCHIVE;
	}

	@Test
	public void testGetResultList_JSON() throws Exception {
		ClientRequest request = new ClientRequest(URL + "/blog?firstResult=0");
		request.accept(MediaType.APPLICATION_JSON);

		ClientResponse<BlogEntry[]> response = request.get(BlogEntry[].class);

		Assert.assertEquals(Status.OK.getStatusCode(), response.getStatus());

		BlogEntry[] users = response.getEntity();
		Assert.assertEquals(5, users.length);
	}

	@Test
	public void testFindBlogEntry_JSON() throws Exception {

		ClientRequest request = new ClientRequest(URL + "/blog/6");
		request.accept(MediaType.APPLICATION_JSON);
		ClientResponse<BlogEntry> response = request.get(BlogEntry.class);

		BlogEntry blogEntry = response.getEntity();
		Assert.assertEquals(Long.valueOf(6), blogEntry.getId());
		Assert.assertNotNull(blogEntry.getAuthor());
	}

	@Test
	public void testUpdateBlogEntry() throws Exception {

		ClientRequest request = new ClientRequest(URL + "/blog/6");
		request.accept(MediaType.APPLICATION_JSON);
		MultivaluedMap<String, String> formParameters = request
				.getFormParameters();
		final String title = "new title";
		final String content = "new content";
		formParameters.add("title", title);
		formParameters.add("content", content);
		ClientResponse<BlogEntry> response = request.put(BlogEntry.class);

		Assert.assertEquals(Status.OK.getStatusCode(), response.getStatus());

		BlogEntry entity = response.getEntity();
		Assert.assertEquals(title, entity.getTitle());
		Assert.assertEquals(content, entity.getContent());
	}

	@Test
	public void testUpdateBlogEntry_ConstraintViolations() throws Exception {

		ClientRequest request = new ClientRequest(URL + "/blog/6");
		request.accept(MediaType.APPLICATION_JSON);

		final MultivaluedMap<String, String> formParameters = request
				.getFormParameters();

		final String title = "";
		final String content = "";
		formParameters.add("title", title);
		formParameters.add("content", content);

		ClientResponse<String> response = request.put(String.class);

		Assert.assertEquals(Status.CONFLICT.getStatusCode(), response.getStatus());
	}


	@Test
	public void testDeleteBlogEntry() throws Exception {
		ClientRequest request = new ClientRequest(URL + "/blog/15");
		request.accept(MediaType.APPLICATION_JSON);

		ClientResponse<BlogEntry> response = request.get(BlogEntry.class);

		Assert.assertEquals(Status.OK.getStatusCode(), response.getStatus());
		BlogEntry blogEntry = response.getEntity();

		ClientRequest deleteRequest = new ClientRequest(URL + "/blog/" + blogEntry.getId());
		ClientResponse<?> deleteResponse = deleteRequest.delete();

		Assert.assertEquals(Status.NO_CONTENT.getStatusCode(), deleteResponse.getStatus());
	}
}
