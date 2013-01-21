package de.akquinet.angularjs.rest.util;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.ext.MessageBodyReader;
import javax.ws.rs.ext.MessageBodyWriter;

import org.jboss.resteasy.spi.ResteasyProviderFactory;

import de.akquinet.angularjs.User;

public class TestMarschallingUtil {

	private static final ResteasyProviderFactory REST_EASY_PROVIDER_FACTORY = ResteasyProviderFactory
			.getInstance();

	private TestMarschallingUtil() {
		super();
	}

	public static <T> String marshalling(MediaType mediaType, Class<T> type,
			T object) throws Exception {
		MessageBodyWriter<T> messageBodyWriter = REST_EASY_PROVIDER_FACTORY
				.getMessageBodyWriter(type, null, null, mediaType);
		ByteArrayOutputStream stream = new ByteArrayOutputStream();
		messageBodyWriter.writeTo(object, User.class, null, null, mediaType,
				null, stream);

		return new String(stream.toByteArray());

	}

	public static <T> T unmarshalling(MediaType mediaType, Class<T> type,
			T object, InputStream entityStream) throws Exception {
		MessageBodyReader<T> messageBodyReader = ResteasyProviderFactory
				.getInstance().getMessageBodyReader(type, null, null,
						MediaType.APPLICATION_JSON_TYPE);

		return messageBodyReader.readFrom(type, null, null, mediaType, null,
				entityStream);
	}
}
