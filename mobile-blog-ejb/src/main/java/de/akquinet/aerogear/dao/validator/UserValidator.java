package de.akquinet.aerogear.dao.validator;

import javax.ejb.Local;

import de.akquinet.aerogear.User;

@Local
public interface UserUniqueEmailValidator extends EntityValidator<User> {

}
