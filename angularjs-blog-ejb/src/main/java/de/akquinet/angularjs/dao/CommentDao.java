package de.akquinet.angularjs.dao;

import java.util.List;

import javax.ejb.Local;

import de.akquinet.angularjs.BlogEntry;
import de.akquinet.angularjs.Comment;
import de.akquinet.angularjs.dao.common.Dao;

@Local
public interface CommentDao extends Dao<Comment> {

	List<Comment> findComments(BlogEntry blogEntry);

	List<Comment> findComments(Long blogEntryId);

}
