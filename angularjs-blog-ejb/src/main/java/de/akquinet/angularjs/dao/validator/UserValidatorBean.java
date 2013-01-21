package de.akquinet.angularjs.dao.validator;

import java.util.HashSet;
import java.util.Set;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.validation.ConstraintViolation;

import org.hibernate.validator.constraints.impl.EmailValidator;
import org.hibernate.validator.constraints.impl.NotNullValidator;
import org.hibernate.validator.engine.ConstraintViolationImpl;
import org.hibernate.validator.engine.PathImpl;

import de.akquinet.angularjs.User;
import de.akquinet.angularjs.dao.UserDao;

@Stateless
public class UserValidatorBean implements UserValidator {

	@EJB
	private UserDao userDao;

	@Override
	public Set<ConstraintViolation<?>> validate(final User entity) {
		final Set<ConstraintViolation<?>> constraintViolations = new HashSet<ConstraintViolation<?>>();

		final ConstraintViolation<?> validateUniqueEmail = validateUniqueEmail(entity);
		if (validateUniqueEmail != null)
			constraintViolations.add(validateUniqueEmail);

		final ConstraintViolation<?> validateUniqueUsername = validateUniqueUsername(entity);
		if (validateUniqueUsername != null) {
			constraintViolations.add(validateUniqueUsername);
		}

		return constraintViolations;

	}

	private ConstraintViolation<?> validateUniqueUsername(final User entity) {
		final NotNullValidator validator = new NotNullValidator();

		if (entity != null && validator.isValid(entity.getUsername(), null)) {
			final String username = entity.getUsername();
			final User user = userDao.findByUsername(username);

			if (user != null && user.getId() != entity.getId()) {
				return new ConstraintViolationImpl<User>("username exist",
						"username exist", User.class, entity, null, username,
						PathImpl.createPathFromString("username"), null, null);
			}
		}

		return null;
	}

	private ConstraintViolation<?> validateUniqueEmail(final User entity) {
		final EmailValidator emailValidator = new EmailValidator();
		if (entity != null && emailValidator.isValid(entity.getEmail(), null)) {
			final String email = entity.getEmail();
			final Long count = userDao.countUserByEmail(email);

			if (count > 0 + (entity.getId() != null ? 1 : 0)) {
				return new ConstraintViolationImpl<User>("email exist",
						"email exist", User.class, entity, null, email,
						PathImpl.createPathFromString("email"), null, null);
			}
		}

		return null;
	}
}
