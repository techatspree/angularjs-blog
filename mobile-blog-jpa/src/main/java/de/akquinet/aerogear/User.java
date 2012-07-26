package de.akquinet.aerogear;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;
import org.jasypt.util.password.BasicPasswordEncryptor;

import de.akquinet.aerogear.common.AbstractEntity;

@Entity
@XmlRootElement
@Table(name = "BLOG_USER")
public class User extends AbstractEntity {

	private static final long serialVersionUID = 1L;

	@NotEmpty
	@Column(nullable = false)
	private String firstname;

	@NotEmpty
	@Column(nullable = false)
	private String surname;

	@Email
	@Column(nullable = false, unique = true)
	private String email;

	@NotEmpty
	@Column(nullable = false, unique = true)
	private String username;

	@NotEmpty
	@Column(nullable = false)
	@XmlTransient
	private String password;

	private String phone;

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}


	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}


	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public void setPassword(String password) {
		this.password = new BasicPasswordEncryptor().encryptPassword(password);
	}

	public boolean verifyPassword(String password) {
		return new BasicPasswordEncryptor().checkPassword(password,
				this.password);
	}

}
