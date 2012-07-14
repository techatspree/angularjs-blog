package de.akquinet.aerogear.dao;

import java.util.List;

import javax.ejb.Local;

import de.akquinet.aerogear.BlogEntry;
import de.akquinet.aerogear.Comment;
import de.akquinet.aerogear.dao.common.Dao;

@Local
public interface CommentDao extends Dao<Comment> {

	List<Comment> findComments(BlogEntry blogEntry);

	List<Comment> findComments(Long blogEntryId);

}
