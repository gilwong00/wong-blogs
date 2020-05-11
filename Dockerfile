# get node image from buster
FROM node:12.16.2

# work directory
WORKDIR /usr/src/wong-blog

# only copy the package.json first. This way we reduce the amount of times we call yarn to install packages
COPY ./package.json ./

# docker can execute many RUN steps to build the image we want. This only gets called if we make changes to our package.json file
RUN yarn

# copies everything from our project root and moves it to the working directory
COPY ./ ./

# commands to run
# what to run in the container
# CMD is something that is executed by default when we launch/build the image
CMD ["/bin/bash"]