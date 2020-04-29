# get node image from buster
FROM node:12.16.2

# work directory
WORKDIR /usr/src/wong-blog

# copies everything from our project root and moves it to the working directory
COPY ./ ./

# docker can execute many RUN steps to build the image we want
RUN yarn

# commands to run
# what to run in the container
# CMD is something that is executed by default when we launch/build the image
CMD ["/bin/bash"]