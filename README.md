# CarCar

**Team:**
* Austin Hall - Service
* Anthony Nguyen - Sales

## Getting Started

**Requires Docker and Git**

1. Fork the repository here: https://gitlab.com/npcsloan/project-

2. Clone your forked directory to your local machine.
   `git clone https://gitlab.com/XXXXXXXnotThisLinkButYours

3. In your terminal `cd` to your forked directory. Build a docker volume and build the doceker containers. You should be on same level as the *docker-compose.yml* file.
```
docker volume create beta-data
docker-compose build
docker-compose up
```
* Docker has to be running prior to running the docker commands.

4.  Check to see if all your containers are running properly. The project should be viewable at:
   http://localhost:3000/

![img](https://s3.us-west-2.amazonaws.com/forge-production.galvanize.com/content/c04b6949bb5eb0b3c5e6d82eaff556f3.png)
## Design

CarCar is made up of three main microservices back-end and 1 react app front-end

**Back-end**
- *Inventory*
- *Sales*
- *Services*

![img](https://i.imgur.com/1UvMER4.png)

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
