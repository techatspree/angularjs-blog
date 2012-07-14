package de.akquinet.aerogear;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import org.hibernate.validator.constraints.NotEmpty;

import de.akquinet.aerogear.common.AbstractEntity;

@Entity
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class Comment extends AbstractEntity {

	private static final long serialVersionUID = 1L;

	@NotNull
	@ManyToOne(optional = false)
	private User author;

	@NotNull
	@ManyToOne(optional = false)
	private BlogEntry blogEntry;

	@Lob
	@NotEmpty
	private String content;

	@NotNull
	@Temporal(TemporalType.TIMESTAMP)
	private Date created = new Date();

	public User getAuthor() {
		return author;
	}

	public void setAuthor(User author) {
		this.author = author;
	}

	public BlogEntry getBlogEntry() {
		return blogEntry;
	}

	public void setBlogEntry(BlogEntry blogEntry) {
		this.blogEntry = blogEntry;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getCreated() {
		return created;
	}

	void setCreated(Date created) {
		this.created = created;
	}

}
