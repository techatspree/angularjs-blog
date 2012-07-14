package de.akquinet.aerogear.rest;

import java.util.List;
import java.util.logging.Logger;

import javax.ejb.Stateless;
import javax.inject.Inject;
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
import javax.ws.rs.core.MediaType;

import de.akquinet.aerogear.User;
import de.akquinet.aerogear.dao.UserDao;
import de.akquinet.aerogear.dao.validator.UserUniqueEmailValidator;

@Stateless
@Path("/user")
public class UserService {

	@Inject
	private Logger log;

	@Inject
	private UserDao userDao;

	@Inject
	private ContraintValidator validator;

	@Inject
	private UserUniqueEmailValidator uniqueEmailValidator;

	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.TEXT_XML })
	public List<User> getResultList() {
		return userDao.findAll();
	}

	@GET
	@Path("/{id:^[1-9][0-9]*}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.TEXT_XML })
	public User findUser(@PathParam("id") final long id) {
		User user = userDao.find(id);
		log.info("findUser(" + id + ") " + user);
		return user;
	}

	@DELETE
	@Path("/{id:^[1-9][0-9]*}")
	public void deleteBlogEntry(@PathParam("id") final long id) {
		userDao.remove(id);
	}

	@PUT
	@Path("/{id:^[1-9][0-9]*}")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.TEXT_XML })
	@Produces({ MediaType.APPLICATION_JSON, MediaType.TEXT_XML })
	public User updateUser(@PathParam("id") final long id, final User user)
			throws ValidationException {
		final User managedUser = userDao.find(id);
		managedUser.setEmail(user.getEmail());
		managedUser.setFirstname(user.getFirstname());
		managedUser.setPhone(user.getPhone());
		managedUser.setSurname(user.getSurname());
		log.info("update user " + managedUser);

		validator.validate(managedUser, uniqueEmailValidator);

		return managedUser;
	}

	@POST
	@Produces({ MediaType.APPLICATION_JSON, MediaType.TEXT_XML })
	public User saveUser(@FormParam("password") final String password,
			@FormParam("username") final String username,
			@FormParam("firstname") final String firstname,
			@FormParam("surname") final String surname,
			@FormParam("email") final String email,
			@FormParam("phone") final String phone) {
		final User user = new User();
		user.setUsername(username);
		user.setFirstname(firstname);
		user.setSurname(surname);
		user.setPassword(password);
		user.setEmail(email);
		user.setPhone(phone);
		validator.validate(user, uniqueEmailValidator);
		userDao.persist(user);
		return user;
	}

}
