package de.akquinet.aerogear.dao;

import java.util.logging.Logger;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import de.akquinet.aerogear.User;
import de.akquinet.aerogear.User_;
import de.akquinet.aerogear.dao.common.AbstractDaoBean;

@Stateless
public class UserDaoBean extends AbstractDaoBean<User> implements UserDao {

	@Inject
	private Logger log;

	@Override
	public User findByUsername(final String username) {

		log.info("find user with username " + username);

		CriteriaBuilder builder = getCriteriaBuilder();
		CriteriaQuery<User> query = builder.createQuery(User.class);

		Root<User> user = query.from(User.class);

		query.where(builder.equal(user.get(User_.username), username));

		return getSingleResult(query);
	}

	@Override
	public Long countUserByEmail(final String email) {

		log.info("count user with email " + email);

		CriteriaBuilder builder = getCriteriaBuilder();
		CriteriaQuery<Long> query = builder.createQuery(Long.class);
		Root<User> user = query.from(User.class);
		query.select(builder.count(user));

		query.where(builder.equal(user.get(User_.email), email));

		return this.<Long> getTypedSingleResult(query);
	}
}
