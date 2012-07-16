package de.akquinet.aerogear.rest;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import de.akquinet.aerogear.User;
import de.akquinet.aerogear.dao.UserDao;

@Stateless
@Path("authentication")
public class AuthenticationService {

	@Inject
	private UserDao userDao;

	@POST
	@Produces({ MediaType.APPLICATION_JSON, MediaType.TEXT_XML })
	public User authenticate(@FormParam("username") String username,
			@FormParam("password") String password) {
		final User user = userDao.findByUsername(username);
		boolean verifyPassword = user.verifyPassword(password);

		if (!verifyPassword) {
			//TODO throw UnauthorizedException
			throw new RuntimeException();
		}

		return user;
	}
}
