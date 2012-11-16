package de.akquinet.aerogear.e2etest;

import java.io.File;

public class MavenDependencyResolver {

    private static final int GROUP_ID_INDEX = 0;
    private static final int ARTIFACT_ID_INDEX = 1;
    private static final int VERSION_INDEX = 2;
    private static final int CLASSIFIER_INDEX = 3;

    private static final String LOCAL_MAVEN_REPO =
            System.getProperty("maven.repo.local") != null ?
                    System.getProperty("maven.repo.local") :
                    (System.getProperty("user.home") + File.separatorChar +
                            ".m2" + File.separatorChar + "repository");

    public static File resolve(final String groupId, final String artifactId, final String version) {
        return resolve(groupId, artifactId, version, null, "jar");
    }

    public static File resolve(final String groupId, final String artifactId, final String version,
                               final String classifier, String type) {
        return new File(LOCAL_MAVEN_REPO + File.separatorChar +
                groupId.replace(".", File.separator) + File.separatorChar +
                artifactId + File.separatorChar +
                version + File.separatorChar +
                artifactId + "-" + version + (classifier == null ? "" : "-" + classifier) + "." + type);
    }

    public static File resolve(final String qualifiedArtifactId) {
        String[] segments = qualifiedArtifactId.split(":");
        return resolve(segments[GROUP_ID_INDEX], segments[ARTIFACT_ID_INDEX], segments[VERSION_INDEX],
                segments.length > CLASSIFIER_INDEX ? segments[CLASSIFIER_INDEX] : null, "jar");
    }

    public static File[] resolve(final String[] qualifiedArtifactIds) {
        File[] files = new File[qualifiedArtifactIds.length];

        for (int i = 0; i < files.length; i++) {
            files[i] = resolve(qualifiedArtifactIds[i]);
        }

        return files;
    }
}
