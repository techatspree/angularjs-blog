package de.akquinet.angularjs.dao;

import java.util.List;
import java.util.logging.Logger;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.ListJoin;
import javax.persistence.criteria.Root;

import de.akquinet.angularjs.BlogEntry;
import de.akquinet.angularjs.BlogEntry_;
import de.akquinet.angularjs.Comment;
import de.akquinet.angularjs.Comment_;
import de.akquinet.angularjs.dao.common.AbstractDaoBean;

@Stateless
public class CommentDaoBean extends AbstractDaoBean<Comment> implements
		CommentDao {

	@Inject
	private Logger log;

	@Override
	public List<Comment> findComments(final BlogEntry blogEntry) {
		log.info("find comment for blog entry " + blogEntry);

		CriteriaBuilder builder = getCriteriaBuilder();
		CriteriaQuery<Comment> query = builder.createQuery(Comment.class);

		Root<Comment> from = query.from(Comment.class);
		query.select(from)
				.where(builder.equal(from.get(Comment_.blogEntry), blogEntry))
				.orderBy(builder.asc(from.get(Comment_.created)));
		return getResultList(query);
	}

	@Override
	public List<Comment> findComments(final Long blogEntryId) {
		CriteriaBuilder builder = getCriteriaBuilder();
		CriteriaQuery<Comment> query = builder.createQuery(Comment.class);
		Root<BlogEntry> from = query.from(BlogEntry.class);
		ListJoin<BlogEntry, Comment> join = from.join(
				BlogEntry_.comments);

		query.select(join)
				.where(builder.equal(from.get(BlogEntry_.id), blogEntryId))
				.orderBy(builder.asc(join.get(Comment_.created)));

		return getResultList(query);
	}
}
