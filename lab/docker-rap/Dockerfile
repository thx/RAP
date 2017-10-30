FROM tomcat:8.0-jre8
#https://github.com/docker-library/tomcat

ENV PATH $CATALINA_HOME/bin:$PATH

LABEL version="0.14.16"
LABEL desc="RAP docker image official"


# Copy to images tomcat path
ADD ROOT.war $CATALINA_HOME/webapps/

RUN /bin/bash -c 'rm -rf $CATALINA_HOME/webapps/ROOT'
RUN /bin/bash -c 'ls $CATALINA_HOME/webapps/'

EXPOSE 80

CMD ["catalina.sh", "run"]
