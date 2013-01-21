package de.akquinet.angularjs.rest.exception;

import java.util.HashMap;
import java.util.Map;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class ValidationExceptionMapper implements
		ExceptionMapper<ConstraintViolationException> {

	/**
	 * Creates a JAX-RS "Conflict - 409" response including a map of all
	 * violation fields, and their message. This can then be used by clients to
	 * show violations.
	 *
	 * @param violations
	 *            A set of violations that needs to be reported
	 * @return JAX-RS response containing all violations
	 */
	@Override
	public Response toResponse(ConstraintViolationException exception) {
		final Map<String, String> responseBody = new HashMap<String, String>();

		for (ConstraintViolation<?> violation : exception
				.getConstraintViolations()) {
			responseBody.put(violation.getPropertyPath().toString(),
					violation.getMessage());
		}

		return Response.status(Status.CONFLICT).entity(responseBody).build();
	}
}
