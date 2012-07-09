package de.akquinet.aerogear.dao;

import javax.ejb.Local;

import de.akquinet.aerogear.User;
import de.akquinet.aerogear.dao.common.Dao;

@Local
public interface UserDao extends Dao<User> {

	User findByUsername(String username);

}
