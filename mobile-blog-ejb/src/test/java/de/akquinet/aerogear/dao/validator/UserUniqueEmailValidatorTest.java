package de.akquinet.aerogear.dao.validator;

import java.util.Set;

import javax.ejb.EJB;
import javax.validation.ConstraintViolation;

import junit.framework.Assert;

import org.easymock.EasyMock;
import org.junit.Rule;
import org.junit.Test;

import de.akquinet.aerogear.User;
import de.akquinet.aerogear.dao.UserDao;
import de.akquinet.aerogear.testdata.UserTestdataBuilder;
import de.akquinet.jbosscc.needle.annotation.ObjectUnderTest;
import de.akquinet.jbosscc.needle.junit.DatabaseRule;
import de.akquinet.jbosscc.needle.junit.NeedleRule;
import de.akquinet.jbosscc.needle.mock.EasyMockProvider;

public class UserUniqueEmailValidatorTest {

	@Rule
	public NeedleRule needleRule = new NeedleRule();

	@Rule
	public DatabaseRule databaseRule = new DatabaseRule();

	@ObjectUnderTest
	private UserUniqueEmailValidatorBean userUniqueEmailValidator;

	@EJB
	private UserDao userDaoMock;

	private EasyMockProvider mockProvider = needleRule.getMockProvider();

	@Test
	public void testTransinetNonUniqueUser() {
		User user = new UserTestdataBuilder().build();

		EasyMock.expect(userDaoMock.countUserByEmail(user.getEmail()))
				.andReturn(1L);

		mockProvider.replayAll();
		Set<ConstraintViolation<?>> validate = userUniqueEmailValidator.validate(user);
		Assert.assertFalse(validate.isEmpty());

		mockProvider.verifyAll();
	}

	@Test
	public void testPersistedUniqueUser() {
		User user = new UserTestdataBuilder(databaseRule.getEntityManager()).buildAndSave();

		EasyMock.expect(userDaoMock.countUserByEmail(user.getEmail()))
				.andReturn(1L);

		mockProvider.replayAll();
		Set<ConstraintViolation<?>> validate = userUniqueEmailValidator.validate(user);
		Assert.assertTrue(validate.isEmpty());
		mockProvider.verifyAll();
	}

	@Test
	public void testPersistedNonUniqueUser() {
		User user = new UserTestdataBuilder(databaseRule.getEntityManager()).buildAndSave();

		EasyMock.expect(userDaoMock.countUserByEmail(user.getEmail()))
				.andReturn(2L);

		mockProvider.replayAll();
		Set<ConstraintViolation<?>> validate = userUniqueEmailValidator.validate(user);
		Assert.assertFalse(validate.isEmpty());
		mockProvider.verifyAll();
	}

}
