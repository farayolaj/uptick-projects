# Uptick Projects

This repository contains projects worked on during my time in Uptick Fellowship.

Looking for the latest task? [Look here](#week-7).

## Task Results

### Week 1

#### Task

Implement a simple Node.js application using the MVC architectural pattern. For example, create a basic task management application with models, views, and controllers.

#### Result

1. I implemented a simple recipe storage app. It was deployed to Heroku (Since then, I have taken it down due to cost).
2. This project can be found in the [`/recipe-bag`](https://github.com/farayolaj/uptick-projects/tree/main/recipe-bag) directory.
3. I submitted the link to the deployed app (now inactive) and the link to this repository.

### Week 2

#### Task

Create a simple distributed chat application using WebSocket technology. Users can join chat rooms and exchange messages in real-time.

#### Result

1. This task led me to create a simple chat application that can be found in the [`/chat-app`](https://github.com/farayolaj/uptick-projects/tree/main/chat-app) directory.
2. The project was also deployed on Heroku (I have also taken it down for the same reason as the recipe app).
3. I submitted the link to the deployed app (now inactive) and the link to this repository.

### Week 3

#### Task

Deploy your project in week 2 to a cloud platform like AWS or Heroku.

#### Result

1. I had already done this the week before.
2. I submitted the link to the deployed app (now inactive).

### Week 4

There was no task for this week.

### Week 5

#### Task

Containerize your application from week 2 using docker and docker-compose in that same docker-compose file, containerize your Database and ensure it connects to your containerized backend application. You're to submit your docker-compose file.
For extra credits, you can implement load balancing with nginx and docker and modify your docker-compose file to spin up 2-3 instances of your containerized application behind the load balancer when run.Could you upload your finished project to a registry and provide the link?

#### Result

1. This was quite straight forward, I dockerised the entire app. I also used docker compose to set up the database.
2. I used docker secret to safely pass sensitive environment variables to the containers.
3. I also set up nginx as a load balancer for 4 instances of the chat app.
4. I initially faced a challenge with passing websocket connections through the load balancer, but a quick google search helped with that.
5. Finally, I pushed the image to Dockerhub and referenced it in my compose file.
6. I submitted the link to the Dockerhub repo and the compose file.

### Week 6

#### Task

Set up a normalized database (any of your choice) and a NoSQL (any of your choice) using docker. You can set up a sample app (in any language and/or framework of your choice) to connect to your 2 databases and create a sample API that synchronizes writing to both databases. Tip: you can choose to utilize your application from weeks 2-3.

#### Result

1. This task was handled by cloning the chat app project into the [`/db-sync-chat-app`](https://github.com/farayolaj/uptick-projects/tree/main/db-sync-chat-app) directory.
2. I added a new service to the compose config to provide a mongo database.
3. I also updated the code to sync all writes to the mongo db.
4. I submitted the compose config file, the link to the new Dockerhub repository and the link to this repository (which contained a mistake, and so is invalid 🙈).

### Week 7

#### Task

Add automated tests to your application from Week 6, Setup a CI/CD pipeline using GitHub that runs your tests and ensures it works before automatically deploying to your server. What to submit? - the public GitHub repo of your project with your CI/CD integrations, files, and whatever else you set up.

#### Result

1. This took a long while, mostly because I had a lot of school work to do at the same time. This led to a lack of focus and coherent thoughts, leading to wasted hours (and a late submission).
2. I first added some tests to the application.
3. I had to first plan the CI/CD pipeline before I was able to finally work on it. It turned out to be a simple plan.
4. First, I used Github Actions to test, build a docker image and push it to Dockerhub.
5. Then I use scp to copy the compose file to the server (together with relevant files - nginx.conf) and use ssh to run docker compose up on the server.
6. To do that, I provisioned a server (free tier) on GCP Compute Engine.
7. Then, I wrote the Github Actions workflow that can be found [here](https://github.com/farayolaj/uptick-projects/blob/main/.github/workflows/deploy-chat-app-to-gce.yaml).
8. I made a mistake with configuring the application port so the application was not loading on the first successful deployment. It took me a while to notice it, but just a second to fix.
9. I submitted the link to this repository and the link to the deployed application.

### Week 8

#### Task

Set up and implement a logging (performance monitoring) system in your app from W7.

**Extra credits:** Monitor more than just application logs.

#### Result

1. I used Prometheus and Grafana for this task.
2. It took a while to get used to Grafana's interface. At first, there seemed to be a lot going on. But once I knew what I wanted to do, it became easier.
3. I used [prom-client](https://www.npmjs.com/package/prom-client) to expose a nodejs exporter for prometheus.
4. I also used Grafana Loki for log management. To connect it to my app, I used [winston-loki](https://www.npmjs.com/package/winston-loki) to create a custom winston transporter.
5. I submitted a [loom recording](https://www.loom.com/share/67c6645e8a30448c80148c01c646b919?sid=d014e8cf-1d7e-4195-a05c-9e248382aa0f) showing the grafana dashboard and logs. I also submitted the link to this repository.
