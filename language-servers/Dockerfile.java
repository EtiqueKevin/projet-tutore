# Java Language Server Dockerfile
FROM eclipse-temurin:17-jdk

WORKDIR /usr/src

RUN curl -o jdt-language-server.tar.gz -L \
    https://download.eclipse.org/jdtls/snapshots/jdt-language-server-latest.tar.gz && \
    tar -xvzf jdt-language-server.tar.gz && rm jdt-language-server.tar.gz

EXPOSE 3001

CMD ["java", "-Declipse.application=org.eclipse.jdt.ls.core.id1", "-Dosgi.bundles.defaultStartLevel=4", "-Declipse.product=org.eclipse.jdt.ls.core.product", "-Dlog.level=ALL", "-jar", "/usr/src/plugins/org.eclipse.equinox.launcher_*.jar", "-data", "/workspace", "--tcpPort", "3001"]
