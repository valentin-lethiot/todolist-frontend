# Build stage
FROM node:20-alpine AS build-stage

WORKDIR /app

# Install Python and build dependencies for the canvas library used for the lottie animations
RUN apk add --no-cache python3 make g++ gcc libc-dev linux-headers \
    pkgconfig pixman-dev cairo-dev pango-dev \
    jpeg-dev giflib-dev

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 