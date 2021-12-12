Get started:

Backend and Frontend are deployed to MS Azure:

Backend(Port: 5000) including database(Port: 3306) and message-broker(Port: 8883) = 20.105.82.246

React-Frontend is running on 20.107.128.2

Local:
1. Clone repository on Raspberry PI
2. navigate to project directory "project-iot"
3. run "docker-compose up" to start the local services for the pi

Cloud-Backend:

1. navigate to cloud-services
2. run "docker-compose up" to start the cloud-services (backend, database, message-broker)

Cloud-Frontend:

1. navigate to cloud-services/frontend
2. run "docker build -t frontend ."
3. run "docker run -p 80:80 frontend"




