#!/bin/bash

# starts the Symfony local webserver in the background
symfony server:start -d --no-tls

tail -f /dev/null
