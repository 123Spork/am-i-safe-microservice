FROM node:11
COPY . .
RUN npm install --unsafe-perm
run npm run-script build
EXPOSE 1337
CMD [ "node", "./build/server.js" ]
