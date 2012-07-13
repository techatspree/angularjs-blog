package de.akquinet.aerogear;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.validator.constraints.NotEmpty;

import de.akquinet.aerogear.common.AbstractEntity;

@Entity
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class BlogEntry extends AbstractEntity {

	private static final long serialVersionUID = 1L;

	@NotEmpty
	@Column(nullable = false)
	private String title;

	@Lob
	@NotEmpty
	private String content;

	@NotNull
	@ManyToOne(optional = false)
	private User author;

	@NotNull
	@Temporal(TemporalType.TIMESTAMP)
	private Date created = new Date();

	@OneToMany(mappedBy = "blogEntry", cascade = { CascadeType.REMOVE,
			CascadeType.REFRESH })
	@XmlTransient
	@JsonIgnore
	private List<Comment> comments = new ArrayList<Comment>();

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getShortContent() {
		if (content != null && content.length() > 200) {
			return content.substring(0, 200) + "...";
		}
		return content;
	}

	public User getAuthor() {
		return author;
	}

	public void setAuthor(User author) {
		this.author = author;
	}

	public Date getCreated() {
		return created;
	}

	public List<Comment> getComments() {
		return Collections.unmodifiableList(comments);
	}

	public void addComment(Comment comment) {
		comments.add(comment);
	}

	public boolean removeComment(Comment comment) {
		return comments.remove(comment);
	}
}
