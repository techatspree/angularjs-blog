package de.akquinet.angularjs.dao;

import javax.ejb.Local;

import de.akquinet.angularjs.User;
import de.akquinet.angularjs.dao.common.Dao;

@Local
public interface UserDao extends Dao<User> {

	User findByUsername(String username);

	Long countUserByEmail(String email);

}
