FROM openjdk:17-jdk-slim
RUN apt-get update && apt-get install -y git
RUN git clone --branch main https://github.com/KarimAter/Qutoof-Spring-BE.git

WORKDIR ./

COPY .mvn .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw
RUN ./mvnw dependency:resolve

COPY src ./src
RUN ./mvnw clean package

EXPOSE 8888

CMD ["./mvnw", "spring-boot:run"]
#CMD ["java", "-jar", "target/Qutoof-0.0.1-SNAPSHOT.jar"]