# Test de Docker de brocker rabbitmq

sudo -i
export AWS_PROJECT = agcon-rabbitmq

### CREATION DU GROUPE ###
aws ec2 create-security-group --group-name docksg$AWS_PROJECT --description dock-security-group-$AWS_PROJECT
# SSH
aws ec2 authorize-security-group-ingress --group-name docksg$AWS_PROJECT --protocol tcp --port 22 --cidr 0.0.0.0/0
# port par defaut de rabbitmq
aws ec2 authorize-security-group-ingress --group-name docksg$AWS_PROJECT --protocol tcp --port 5672 --cidr 0.0.0.0/0

### creation de la docker-machine ###
docker-machine create --driver amazonec2 \
--amazonec2-region us-east-1 \
--amazonec2-zone c \
--amazonec2-security-group docksg$AWS_PROJECT \
--amazonec2-tags project:$AWS_PROJECT dockinstance$AWS_PROJECT

#Recuperation de l'instance ID
export AWS_ID=`aws ec2 describe-instances --filters "Name=tag-value,Values=dockinstance$AWS_PROJECT" --output text --query 'Reservations[0].Instances[0].InstanceId'`
echo $AWS_ID

#### definit le variables d'env pour definir ce docker host par default
eval $(docker-machine env dockinstance$AWS_PROJECT)
################ docker machine ip
docker-machine ip dockinstance$AWS_PROJECT
################ docker machine shh
docker-machine ssh dockinstance$AWS_PROJECT

### build de l'image docker ###
docker build -t brocker .
docker-compose up -d

### suppression de la docker machine ###
docker-machine rm dockinstance$AWS_PROJECT

### suppression du security group ###
aws ec2 delete-security-group --group-name docksg$AWS_PROJECT
