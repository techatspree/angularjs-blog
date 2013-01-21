package de.akquinet.angularjs.dao.common;

import java.util.List;

import de.akquinet.angularjs.common.AbstractEntity;

public interface Dao<E extends AbstractEntity> {

	void persist(E instance);

	E find(long id);

	void remove(E instance);

	E merge(E instance);

	List<E> findAll();

	void remove(long id);

}
