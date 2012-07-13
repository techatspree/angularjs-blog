package de.akquinet.aerogear.rest;

import static de.akquinet.aerogear.rest.deployment.TestWebArchiveDeployment.URL;

import javax.ws.rs.core.MediaType;

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
public class UserServiceTest {

	@Deployment(testable = false)
	public static WebArchive createDeployment() {
		return TestWebArchiveDeployment.WEB_ARCHIVE;
	}

	@Test
	public void testGetResultList_JSON() throws Exception {
		ClientRequest request = new ClientRequest(URL + "/user");
		request.accept(MediaType.APPLICATION_JSON);

		ClientResponse<String> response = request.get(String.class);

		Assert.assertEquals(200, response.getStatus());
	}


	@Test
	public void testFindUser_JSON() throws Exception {

		ClientRequest request = new ClientRequest(URL + "/user/2");
		request.accept(MediaType.APPLICATION_JSON);
		ClientResponse<String> response = request.get(String.class);

		Assert.assertEquals(200, response.getStatus());

		String entity = response.getEntity();
		System.out.println(entity);
	}


	@Test
	public void testUpdateUser_JSON() throws Exception {

//		ClientRequest request = new ClientRequest(URL + "/user/2");
//		request.accept(MediaType.APPLICATION_JSON);
//		ClientResponse<String> response = request.get(String.class);
//
//		Assert.assertEquals(200, response.getStatus());
	}

}
