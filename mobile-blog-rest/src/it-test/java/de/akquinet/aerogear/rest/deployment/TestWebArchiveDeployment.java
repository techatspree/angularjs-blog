package de.akquinet.aerogear.rest.deployment;

import org.jboss.shrinkwrap.api.ArchivePath;
import org.jboss.shrinkwrap.api.Filter;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.jboss.shrinkwrap.resolver.api.DependencyResolvers;
import org.jboss.shrinkwrap.resolver.api.maven.MavenDependencyResolver;

public interface TestWebArchiveDeployment {

	String URL = "http://localhost:8180/test/rest";

	Filter<ArchivePath> TEST_CLASSES_FILTER = new Filter<ArchivePath>() {
		@Override
		public boolean include(ArchivePath object) {
			final String name = object.get();
			return name.contains("Test") && !name.contains("Testdata") ? false
					: true;
		}
	};

	WebArchive WEB_ARCHIVE = ShrinkWrap
			.create(WebArchive.class, "test.war")
			.addAsLibraries(
					DependencyResolvers.use(MavenDependencyResolver.class)
							.goOffline().artifact("org.jasypt:jasypt:1.9.0")
							.resolveAsFiles())
			.addPackages(true, TEST_CLASSES_FILTER, "de.akquinet.aerogear")
			.addAsWebInfResource(EmptyAsset.INSTANCE, "beans.xml")
			.addAsResource("META-INF/persistence.xml",
					"META-INF/persistence.xml");

}
