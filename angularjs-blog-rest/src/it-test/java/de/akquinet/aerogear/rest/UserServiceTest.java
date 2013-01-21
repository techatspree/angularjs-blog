package de.akquinet.angularjs.rest;

import static de.akquinet.angularjs.rest.deployment.TestWebArchiveDeployment.URL;

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

import de.akquinet.angularjs.User;
import de.akquinet.angularjs.rest.deployment.TestWebArchiveDeployment;
import de.akquinet.angularjs.rest.util.TestMarschallingUtil;

@RunWith(Arquillian.class)
public class UserServiceTest {

	@Deployment(testable = false)
	public static WebArchive createDeployment() {
		return TestWebArchiveDeployment.WEB_ARCHIVE;
	}

	@Test
	public void testGetResultList_JSON() throws Exception {
		ClientRequest request = new ClientRequest(URL + "/user");
		request.accept(MediaType.APPLICATION_JSON);

		ClientResponse<User[]> response = request.get(User[].class);

		Assert.assertEquals(Status.OK.getStatusCode(), response.getStatus());

		User[] users = response.getEntity();
		Assert.assertEquals(3, users.length);

	}

	@Test
	public void testFindUser_JSON() throws Exception {

		ClientRequest request = new ClientRequest(URL + "/user/2");
		request.accept(MediaType.APPLICATION_JSON);

		ClientResponse<User> response = request.get(User.class);

		Assert.assertEquals(Status.OK.getStatusCode(), response.getStatus());

		User user = response.getEntity();
		Assert.assertEquals(Long.valueOf(2), user.getId());

	}

	@Test
	public void testUpdateUser_JSON() throws Exception {
		ClientRequest request = new ClientRequest(URL + "/user/2");
		request.accept(MediaType.APPLICATION_JSON);

		ClientResponse<User> response = request.get(User.class);

		Assert.assertEquals(Status.OK.getStatusCode(), response.getStatus());

		User user = response.getEntity();

		String firstname = "new fistname";
		String phone = "12343242342";

		user.setFirstname(firstname);
		user.setPhone(phone);

		String requestBody = TestMarschallingUtil.marshalling(
				MediaType.APPLICATION_JSON_TYPE, User.class, user);

		request.body(MediaType.APPLICATION_JSON_TYPE, requestBody);

		ClientResponse<User> putResponse = request.put(User.class);

		Assert.assertEquals(Status.OK.getStatusCode(), response.getStatus());
		User updatedUser = putResponse.getEntity();

		Assert.assertEquals(firstname, updatedUser.getFirstname());
		Assert.assertEquals(phone, updatedUser.getPhone());

	}

	@Test
	public void testSaveUser() throws Exception {
		ClientRequest request = new ClientRequest(URL + "/user");
		request.accept(MediaType.APPLICATION_JSON);

		MultivaluedMap<String, String> formParameters = request
				.getFormParameters();
		formParameters.add("username", "username1");
		formParameters.add("firstname", "firstname");
		formParameters.add("surname", "surname");
		formParameters.add("email", "jboss@akquinet.de");
		formParameters.add("password", "secret");

		ClientResponse<User> response = request.post(User.class);

		Assert.assertEquals(Status.OK.getStatusCode(), response.getStatus());
		User newUser = response.getEntity();

		Assert.assertNotNull(newUser.getId());
	}

	@Test
	public void testSaveUser_ConstraintViolation() throws Exception {
		ClientRequest request = new ClientRequest(URL + "/user");
		request.accept(MediaType.APPLICATION_JSON);

		MultivaluedMap<String, String> formParameters = request
				.getFormParameters();
		formParameters.add("surname", "surname");
		formParameters.add("email", "jfrancis@akquinet.de");

		ClientResponse<String> response = request.post(String.class);

		Assert.assertEquals(Status.CONFLICT.getStatusCode(),
				response.getStatus());
	}

	@Test
	public void testDeleteUser() throws Exception {
		ClientRequest request = new ClientRequest(URL + "/user");
		request.accept(MediaType.APPLICATION_JSON);

		MultivaluedMap<String, String> formParameters = request
				.getFormParameters();
		formParameters.add("username", "usernameX");
		formParameters.add("firstname", "firstname");
		formParameters.add("surname", "surname");
		formParameters.add("email", "aerogera@jboss.org");
		formParameters.add("password", "secret");

		ClientResponse<User> response = request.post(User.class);

		Assert.assertEquals(Status.OK.getStatusCode(), response.getStatus());
		User user = response.getEntity();
		ClientRequest deleteRequest = new ClientRequest(URL + "/user/" + user.getId());
		ClientResponse<?> deleteResponse = deleteRequest.delete();

		Assert.assertEquals(Status.NO_CONTENT.getStatusCode(), deleteResponse.getStatus());
	}
}
