
FROM maven:3.8.6-openjdk-18 AS build

COPY pom.xml ./
COPY src ./src

RUN mvn install 

FROM openjdk:17-jdk-slim
ARG JAR_FILE=target/*.jar
COPY --from=build ./target/medicine-0.0.1-SNAPSHOT.jar app.jar
ENV SPRING_PROFILES_ACTIVE=prod
COPY . .

ENTRYPOINT ["java", "-jar", "/app.jar"]