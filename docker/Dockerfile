FROM php:7.4-cli

RUN apt-get update && \
    apt-get install -y git libzip-dev make nano net-tools wget zip zlib1g-dev

RUN docker-php-ext-install zip

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# add custom PHP.ini settings
RUN mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"
COPY ./custom.ini /usr/local/etc/php/conf.d/custom.ini

RUN wget https://get.symfony.com/cli/installer -O - | bash
RUN mv /root/.symfony/bin/symfony /usr/local/bin/symfony

RUN mkdir /var/www/symfony
WORKDIR /var/www/symfony/

# adds user "prixel", adds him to group "www-data" and sets his home folder
# for more background information see:
# https://medium.com/@mccode/understanding-how-uid-and-gid-work-in-docker-containers-c37a01d01cf
RUN useradd -r --home /home/prixel -u 1000 prixel
RUN usermod -a -G www-data prixel
RUN mkdir /home/prixel
RUN chown prixel:www-data /home/prixel

# otherwise the server wont start and we receive a permission denied.
# the problem here is, that .symfony folder belongs to root:root
RUN mkdir /tmp/.symfony
RUN chown -R prixel:www-data /tmp/.symfony

COPY ./run.sh /run.sh
RUN chmod +x /run.sh

CMD ["/run.sh"]
