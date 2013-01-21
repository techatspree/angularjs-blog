package de.akquinet.angularjs.common;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Version;
import javax.xml.bind.annotation.XmlTransient;

import org.codehaus.jackson.annotate.JsonIgnore;

@MappedSuperclass
public abstract class AbstractEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Version
	@Column(nullable = false)
	private Long version;

	public Long getId() {
		return id;
	}

	void setId(Long id) {
		this.id = id;
	}

	@XmlTransient
	@JsonIgnore
	public Long getVersion() {
		return version;
	}

}
