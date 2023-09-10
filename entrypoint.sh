#!/bin/sh

#
# Copyright (c) 2023 by MoonSphere Systems
# Originally developed by Miłosz Gilga <https://miloszgilga.pl>
#

a2enmod headers
a2enmod rewrite

apache2ctl -DFOREGROUND
