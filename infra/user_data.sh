#!/bin/bash

sudo su  # run as admin
yum update -y # update all packages 
yum install -y docker # install docker
service docker start # start docker service
usermod -a -G docker ec2-user # add ec2-user to docker group

docker run -p 80:8080 #{username_aws_account (marcelobracet)}/${docker_image_name}:${image_tag} # run the docker container