FROM node:11
COPY . .
RUN npm install --unsafe-perm
run npm run-script build
EXPOSE 5000
CMD [ "node", "./dist/bundle.min.js" ]
