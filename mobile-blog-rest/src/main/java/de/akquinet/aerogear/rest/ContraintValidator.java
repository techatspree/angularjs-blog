package de.akquinet.aerogear.rest;

import java.util.HashSet;
import java.util.Set;

import javax.inject.Inject;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Validator;

public class ContraintValidator {

	@Inject
	private Validator validator;

	public <T> void validate(final T entity) {
		final Set<ConstraintViolation<T>> constraintViolations = validator
				.validate(entity);
		if (!constraintViolations.isEmpty()) {
			throw new ConstraintViolationException(
					new HashSet<ConstraintViolation<?>>(constraintViolations));
		}
	}
}
