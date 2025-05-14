# Build stage
FROM golang:1.19-alpine AS builder

WORKDIR /app

# Cache dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy source and build binary
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o muse .

# Final stage
FROM scratch

# Include CA certs to enable HTTPS requests from Go
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /app/muse /muse

EXPOSE 8080
ENTRYPOINT ["/muse"]