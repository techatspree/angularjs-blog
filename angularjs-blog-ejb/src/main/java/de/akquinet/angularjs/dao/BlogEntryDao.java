package de.akquinet.angularjs.dao;

import java.util.List;

import javax.ejb.Local;

import de.akquinet.angularjs.BlogEntry;
import de.akquinet.angularjs.dao.common.Dao;

@Local
public interface BlogEntryDao extends Dao<BlogEntry> {

	List<BlogEntry> find(int maxresults, int firstresult);

	Long count();

}
