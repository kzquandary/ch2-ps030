FROM php:8.2-fpm-alpine

RUN apk add --no-cache nginx wget

RUN mkdir -p /run/nginx

COPY docker/nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /app
COPY . /app
COPY ./Mitra /app

RUN sh -c "wget https://getcomposer.org/composer-stable.phar && chmod a+x composer-stable.phar && mv composer-stable.phar /usr/local/bin/composer"
RUN cd /app && /usr/local/bin/composer update --no-dev

RUN chown -R www-data: /app

CMD sh /app/docker/startup.sh
