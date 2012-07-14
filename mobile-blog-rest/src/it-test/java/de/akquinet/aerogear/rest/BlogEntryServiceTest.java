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

		ClientResponse<String> response = request.get(String.class);

		Assert.assertEquals(200, response.getStatus());
	}

	@Test
	public void testFindBlogEntry_JSON() throws Exception {

		ClientRequest request = new ClientRequest(URL + "/blog/6");
		request.accept(MediaType.APPLICATION_JSON);
		ClientResponse<String> response = request.get(String.class);

		Assert.assertEquals(200, response.getStatus());
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
		ClientResponse<String> response = request.put(String.class);

		Assert.assertEquals(200, response.getStatus());

		String entity = response.getEntity();
		Assert.assertTrue(entity.contains(title));
		Assert.assertTrue(entity.contains(content));
	}

	@Test
	public void testUpdateBlogEntry_ConstraintViolations() throws Exception {

		ClientRequest request = new ClientRequest(URL + "/blog/6");
		request.accept(MediaType.APPLICATION_JSON);

		MultivaluedMap<String, String> formParameters = request
				.getFormParameters();

		final String title = "";
		final String content = "";
		formParameters.add("title", title);
		formParameters.add("content", content);

		ClientResponse<String> response = request.put(String.class);

		Assert.assertEquals(Status.CONFLICT.getStatusCode(), response.getStatus());
	}
}
