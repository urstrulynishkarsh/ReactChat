FROM node:20 as Base
WORKDIR /app
COPY package*.json  ./
RUN npm install

FROM base AS development
COPY . .
CMD ["npm", "run", "dev"]

FROM base AS production
COPY . .
RUN npm run build
RUN npm i -g serve
CMD ["serve", "-s", "build"]

