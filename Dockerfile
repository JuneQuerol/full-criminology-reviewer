# Dockerfile - Uses pre-built Next.js standalone output
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy the standalone output (pre-built locally)
COPY .next/standalone ./

# Copy static files
COPY .next/static ./.next/static

# Copy public folder
COPY public ./public

# Copy content folder (markdown files)
COPY content ./content

# Expose port 3000
EXPOSE 3000

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Start the server
CMD ["node", "server.js"]
