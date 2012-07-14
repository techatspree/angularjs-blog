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

	@Test
	public void testUpdateComment() throws Exception {

		ClientRequest request = new ClientRequest(URL + "/blog/6/comment/24");
		request.accept(MediaType.APPLICATION_JSON);
		MultivaluedMap<String, String> formParameters = request
				.getFormParameters();

		final String content = "new content";
		formParameters.add("content", content);

		ClientResponse<Comment> response = request.put(Comment.class);

		Assert.assertEquals(Status.OK.getStatusCode(), response.getStatus());

		Comment entity = response.getEntity();
		Assert.assertEquals(content, entity.getContent());
	}

	@Test
	public void testUpdateComment_ConstraintViolations() throws Exception {

		ClientRequest request = new ClientRequest(URL + "/blog/6/comment/24");
		request.accept(MediaType.APPLICATION_JSON);

		final MultivaluedMap<String, String> formParameters = request
				.getFormParameters();

		final String content = "";
		formParameters.add("content", content);

		ClientResponse<Comment> response = request.put(Comment.class);

		Assert.assertEquals(Status.CONFLICT.getStatusCode(), response.getStatus());
	}


	@Test
	public void testDeleteBlogEntry() throws Exception {
		ClientRequest request = new ClientRequest(URL + "/blog/7/comment/26");
		request.accept(MediaType.APPLICATION_JSON);

		ClientResponse<Comment> response = request.get(Comment.class);

		Assert.assertEquals(Status.OK.getStatusCode(), response.getStatus());
		Comment comment = response.getEntity();

		ClientRequest deleteRequest = new ClientRequest(URL + "/blog/7/comment/" + comment.getId());
		ClientResponse<?> deleteResponse = deleteRequest.delete();

		Assert.assertEquals(Status.NO_CONTENT.getStatusCode(), deleteResponse.getStatus());
	}


}
