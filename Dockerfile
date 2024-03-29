# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=20.11.1

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production


WORKDIR /usr/src/app

# Download dependencies as a separate step to take advantage of Docker's caching.
# Use the official Node.js image as a base
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) files to install dependencies
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN npm run build

# Expose the port the application runs on
EXPOSE 5173

# Run the React app when the container starts
CMD ["npm", "run", "dev"]
