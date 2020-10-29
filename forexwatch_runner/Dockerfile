FROM stakater/java8-alpine
VOLUME /tmp
RUN apk update
RUN apk add tzdata
RUN cp /usr/share/zoneinfo/Europe/Helsinki /etc/localtime
RUN echo "Europe/Helsinki" >  /etc/timezone
RUN mkdir /var/forexwatch
RUN mkdir /var/forexwatch/strategies
WORKDIR /var/forexwatch
ADD target/forexwatchRunner.jar forexwatchRunner.jar
EXPOSE 8080
RUN sh -c 'touch forexwatchRunner.jar'
ENV JAVA_OPTS="-Dspring.profiles.active=docker -Xms512m -Xmx1536m"
ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar forexwatchRunner.jar" ]