package de.akquinet.aerogear.dao.validator;

import java.util.Set;

import javax.validation.ConstraintViolation;

public interface EntityValidator<T> {

	Set<ConstraintViolation<?>> validate(T entity);

}
