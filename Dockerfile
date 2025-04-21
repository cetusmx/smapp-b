FROM node:20.18.0

RUN mkdir -p /home/app

COPY . /home/app

EXPOSE 3002

CMD ["node","/home/app/src/index.js"]