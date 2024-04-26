# syntax=docker/dockerfile:1
FROM golang:1.21 as build
# Set destination for COPY
WORKDIR /app
# Download Go modules
COPY go.mod go.sum ./
RUN go mod download

# Copy the source code. Note the slash at the end, as explained in
# https://docs.docker.com/engine/reference/builder/#copy
COPY main.go main.go
COPY firebase-config.json ./
# Build
RUN CGO_ENABLED=0 GOOS=linux go build -o /new-cooker-api ./

FROM alpine:3.19
COPY --from=build /new-cooker-api /new-cooker-api
# Optional:
# To bind to a TCP port, runtime parameters must be supplied to the docker command.
# But we can document in the Dockerfile what ports
# the application is going to listen on by default.
# https://docs.docker.com/engine/reference/builder/#expose
EXPOSE 8080
# Run
CMD ["/new-cooker-api"]