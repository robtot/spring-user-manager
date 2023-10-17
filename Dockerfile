FROM node:18-alpine as frontendBuild

COPY frontend/package*.json ./
RUN npm install --only=prod

COPY frontend/tsconfig.json ./
COPY frontend/public/ public/
COPY frontend/src/ src/

RUN npm run build

FROM eclipse-temurin:17-jdk-alpine as build

COPY mvnw mvnw
COPY .mvn .mvn
COPY pom.xml pom.xml
COPY src src

# Copy frontend app
COPY --from=frontendBuild build/ src/main/resources/static/

RUN ./mvnw package -DskipTests

FROM openjdk:17-oracle
COPY --from=build target/userManagment-0.0.1-SNAPSHOT.jar application.jar
ENTRYPOINT ["java", "-jar", "application.jar"]