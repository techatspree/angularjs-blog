package de.akquinet.aerogear.dao.validator;

import java.util.HashSet;
import java.util.Set;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.validation.ConstraintViolation;

import org.hibernate.validator.constraints.impl.EmailValidator;
import org.hibernate.validator.engine.ConstraintViolationImpl;
import org.hibernate.validator.engine.PathImpl;

import de.akquinet.aerogear.User;
import de.akquinet.aerogear.dao.UserDao;

@Stateless
public class UserUniqueEmailValidatorBean implements UserUniqueEmailValidator {

	@EJB
	private UserDao userDao;

	@Override
	public Set<ConstraintViolation<?>> validate(User entity) {
		final Set<ConstraintViolation<?>> constraintViolations = new HashSet<ConstraintViolation<?>>();

		final EmailValidator emailValidator = new EmailValidator();
		if (entity != null && emailValidator.isValid(entity.getEmail(), null)) {
			final String email = entity.getEmail();
			final Long count = userDao.countUserByEmail(email);

			if (count > 0 + (entity.getId() != null ? 1 : 0)) {
				constraintViolations.add(new ConstraintViolationImpl<User>(
						"email exist", "email exist", User.class, entity, null,
						email, PathImpl.createPathFromString("email"), null,
						null));
			}
		}
		return constraintViolations;

	}
}
