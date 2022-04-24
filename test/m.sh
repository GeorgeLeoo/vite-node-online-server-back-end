#!/bin/bash
adminUsername='admin'
adminPassword='123456'
dbName=$1
username=$2
password=$3
echo "starting..."
docker exec -i mongo mongosh bash <<EOF
use admin
db.auth('$adminUsername','$adminPassword')
use $dbName
db.createUser({user: '$username', pwd: '$password', roles: [{role: 'dbAdmin', db: '$dbName'}, {role: 'dbOwner', db: '$dbName'}]});
db.auth('$username','$password')