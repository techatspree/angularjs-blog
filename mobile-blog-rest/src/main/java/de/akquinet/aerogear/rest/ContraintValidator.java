package de.akquinet.aerogear.rest;

import java.util.HashSet;
import java.util.Set;

import javax.inject.Inject;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Validator;

import de.akquinet.aerogear.dao.validator.EntityValidator;

public class ContraintValidator {

	@Inject
	private Validator validator;

	public <T> void validate(
			final T entity, @SuppressWarnings("rawtypes") final EntityValidator... validatorInstnaces) {
		final Set<ConstraintViolation<?>> constraintViolations = new HashSet<ConstraintViolation<?>>();

		for (EntityValidator<Object> entityValidator : validatorInstnaces) {
			constraintViolations.addAll(entityValidator.validate(entity));
		}

		constraintViolations.addAll(validator.validate(entity));

		if (!constraintViolations.isEmpty()) {
			throw new ConstraintViolationException(constraintViolations);
		}
	}
}
