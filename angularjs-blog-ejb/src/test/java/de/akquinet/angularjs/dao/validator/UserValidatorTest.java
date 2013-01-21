package de.akquinet.angularjs.dao.validator;

import java.util.Set;

import javax.ejb.EJB;
import javax.validation.ConstraintViolation;

import junit.framework.Assert;

import org.easymock.EasyMock;
import org.junit.Rule;
import org.junit.Test;

import de.akquinet.angularjs.User;
import de.akquinet.angularjs.dao.UserDao;
import de.akquinet.angularjs.testdata.UserTestdataBuilder;
import de.akquinet.jbosscc.needle.annotation.ObjectUnderTest;
import de.akquinet.jbosscc.needle.junit.DatabaseRule;
import de.akquinet.jbosscc.needle.junit.NeedleRule;
import de.akquinet.jbosscc.needle.mock.EasyMockProvider;

public class UserValidatorTest {

	@Rule
	public NeedleRule needleRule = new NeedleRule();

	@Rule
	public DatabaseRule databaseRule = new DatabaseRule();

	@ObjectUnderTest
	private UserValidatorBean userValidator;

	@EJB
	private UserDao userDaoMock;

	private EasyMockProvider mockProvider = needleRule.getMockProvider();

	@Test
	public void testTransinetUserNonUniqueEmail() {
		User user = new UserTestdataBuilder().build();

		EasyMock.expect(userDaoMock.countUserByEmail(user.getEmail()))
				.andReturn(1L);

		mockProvider.replayAll();
		Set<ConstraintViolation<?>> validate = userValidator.validate(user);
		Assert.assertFalse(validate.isEmpty());

		mockProvider.verifyAll();
	}

	@Test
	public void testPersistedUniqueUser() {
		User user = new UserTestdataBuilder(databaseRule.getEntityManager())
				.buildAndSave();

		EasyMock.expect(userDaoMock.countUserByEmail(user.getEmail()))
				.andReturn(1L);

		mockProvider.replayAll();
		Set<ConstraintViolation<?>> validate = userValidator.validate(user);
		Assert.assertTrue(validate.isEmpty());
		mockProvider.verifyAll();
	}

	@Test
	public void testPersistedUserNonUniqueEmail() {
		User user = new UserTestdataBuilder(databaseRule.getEntityManager())
				.buildAndSave();

		EasyMock.expect(userDaoMock.countUserByEmail(user.getEmail()))
				.andReturn(2L);

		mockProvider.replayAll();
		Set<ConstraintViolation<?>> validate = userValidator.validate(user);
		Assert.assertFalse(validate.isEmpty());
		mockProvider.verifyAll();
	}

	@Test
	public void testPersistedUserNonUniqueUsername() {
		User user1 = new UserTestdataBuilder(databaseRule.getEntityManager())
				.buildAndSave();
		User user2 = new UserTestdataBuilder(databaseRule.getEntityManager())
				.buildAndSave();

		EasyMock.expect(userDaoMock.countUserByEmail(user2.getEmail()))
				.andReturn(1L);
		EasyMock.expect(userDaoMock.findByUsername(user2.getUsername()))
				.andReturn(user1);

		mockProvider.replayAll();
		Set<ConstraintViolation<?>> validate = userValidator.validate(user2);
		Assert.assertFalse(validate.isEmpty());
		mockProvider.verifyAll();
	}

	@Test
	public void testTransientUserUniqueUsername() {
		User user1 = new UserTestdataBuilder().build();

		EasyMock.expect(userDaoMock.countUserByEmail(user1.getEmail()))
				.andReturn(0L);

		mockProvider.replayAll();
		Set<ConstraintViolation<?>> validate = userValidator.validate(user1);
		Assert.assertTrue(validate.isEmpty());
		mockProvider.verifyAll();
	}

}
