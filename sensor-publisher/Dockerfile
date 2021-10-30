FROM node:14
WORKDIR /app

ENTRYPOINT []

RUN apt-get update
RUN apt-get -qy install curl 
RUN apt-get -y install sudo
RUN sudo apt-get -y install build-essential

RUN sudo apt -y install python-setuptools python3-setuptools
RUN apt-get -y install wget
RUN wget https://github.com/joan2937/pigpio/archive/master.zip
RUN apt-get -y install unzip
RUN unzip master.zip
WORKDIR /app/pigpio-master
RUN make
RUN sudo make install

WORKDIR /app

USER root

RUN curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
RUN sudo apt-get install -y nodejs python3

COPY package*.json ./

RUN npm install -g npm
RUN npm install
RUN npm rebuild
COPY . .
CMD ["node", "fakesensor.js"]