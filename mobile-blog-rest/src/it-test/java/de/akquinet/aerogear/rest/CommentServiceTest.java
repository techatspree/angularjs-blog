package de.akquinet.aerogear.rest;

import static de.akquinet.aerogear.rest.deployment.TestWebArchiveDeployment.URL;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response.Status;

import junit.framework.Assert;

import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.resteasy.client.ClientRequest;
import org.jboss.resteasy.client.ClientResponse;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.junit.Test;
import org.junit.runner.RunWith;

import de.akquinet.aerogear.Comment;
import de.akquinet.aerogear.rest.deployment.TestWebArchiveDeployment;

@RunWith(Arquillian.class)
public class CommentServiceTest {

	@Deployment(testable = false)
	public static WebArchive createDeployment() {
		return TestWebArchiveDeployment.WEB_ARCHIVE;
	}

	@Test
	public void testGetResultList_JSON() throws Exception {
		ClientRequest request = new ClientRequest(URL + "/blog/6/comment");
		request.accept(MediaType.APPLICATION_JSON);

		ClientResponse<Comment[]> response = request.get(Comment[].class);

		Assert.assertEquals(Status.OK.getStatusCode(), response.getStatus());

		Comment[] users = response.getEntity();
		Assert.assertEquals(2, users.length);
	}

	@Test
	public void testFindComment_JSON() throws Exception {
		ClientRequest request = new ClientRequest(URL + "/blog/6/comment/24");
		request.accept(MediaType.APPLICATION_JSON);
		ClientResponse<Comment> response = request.get(Comment.class);

		Assert.assertEquals(Status.OK.getStatusCode(), response.getStatus());
		Comment comment = response.getEntity();
		Assert.assertEquals(Long.valueOf(24), comment.getId());
		Assert.assertNotNull(comment.getAuthor());
	}

}
