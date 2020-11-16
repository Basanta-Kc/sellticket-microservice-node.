# base image
FROM node:alpine 

# set the working directory to /app
# all cmds will be issued relative to this dir
WORKDIR /app

# at first we copy only package.json
COPY package.json .

# install dependencies
RUN npm install --only=prod

# copy remaining src code
COPY . .

# cmd to run when the
# container starts up
CMD ["npm", "start"]