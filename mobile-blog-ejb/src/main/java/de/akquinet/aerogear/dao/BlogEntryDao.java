package de.akquinet.aerogear.dao;

import java.util.List;

import javax.ejb.Local;

import de.akquinet.aerogear.BlogEntry;
import de.akquinet.aerogear.dao.common.Dao;

@Local
public interface BlogEntryDao extends Dao<BlogEntry> {

	List<BlogEntry> find(int maxresults, int firstresult);

	Long count();

}
