package de.akquinet.angularjs.testdata;

import javax.persistence.EntityManager;

import de.akquinet.angularjs.User;
import de.akquinet.jbosscc.needle.db.testdata.AbstractTestdataBuilder;

public class UserTestdataBuilder extends AbstractTestdataBuilder<User> {

	private static final String DEFAULT_PASSWORD = "secret";
	private String withUsername;
	private String withFirstname;
	private String withSurname;
	private String withEmail;

	public UserTestdataBuilder() {
		super();
	}

	public UserTestdataBuilder(EntityManager entityManager) {
		super(entityManager);
	}

	public UserTestdataBuilder withUsername(String username) {
		this.withUsername = username;
		return this;
	}

	public UserTestdataBuilder withFirstname(String firstname) {
		this.withFirstname = firstname;
		return this;
	}

	public UserTestdataBuilder withSurname(String surname) {
		this.withSurname = surname;
		return this;
	}

	public UserTestdataBuilder withEmail(String email) {
		this.withEmail = email;
		return this;
	}

	private String getFirstname() {
		return withFirstname != null ? withFirstname : "Max";
	}

	private String getSurname() {
		return withSurname != null ? withSurname : "Muster";
	}

	private String getUsername() {
		return withUsername != null ? withUsername : "mmuster" + getId();
	}

	private String getEmail() {
		return withEmail != null ? withEmail : "mmuster" + getId() + "@test.de";
	}

	@Override
	public User build() {
		final User user = new User();
		user.setUsername(getUsername());
		user.setFirstname(getFirstname());
		user.setSurname(getSurname());
		user.setEmail(getEmail());
		user.setPassword(DEFAULT_PASSWORD);

		return user;
	}

}
