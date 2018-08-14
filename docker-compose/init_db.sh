#!/bin/sh
export RAP_VERSION=0.14.1
export MYSQL_DATA_DIR=/var/lib/mysql/data
export MYSQL_INIT_SQL_DIR=/var/lib/mysql/init
mkdir -p $MYSQL_DATA_DIR
mkdir -p $MYSQL_INIT_SQL_DIR
if [ ! -f "$MYSQL_INIT_SQL_DIR/initialize.sql" ]; then
wget -O $MYSQL_INIT_SQL_DIR/initialize.sql  https://raw.githubusercontent.com/thx/RAP/release/src/main/resources/database/initialize.sql
fi
