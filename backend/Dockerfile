# Build stage
FROM golang:1.19-alpine AS builder

WORKDIR /app

# Cache dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy all source files
COPY . .

# Build the Go binary for Linux, static, named muse
RUN CGO_ENABLED=0 GOOS=linux go build -o muse main.go

# Final stage: minimal image
FROM scratch

# Copy CA certificates for HTTPS support
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

# Copy the binary from the builder
COPY --from=builder /app/muse /muse

# Expose port 8080
EXPOSE 8080

# Run the binary
ENTRYPOINT ["/muse"]