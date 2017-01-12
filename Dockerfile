FROM mhart/alpine-node:6

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

# If you need npm, don't use a base tag
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
