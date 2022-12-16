# Maintenance ticket plugin for an employee app

This is a student project for Metropolia UAC Mobile Project course. The goal of the course was to work in tandem with a corporate client to produce a mobile and/or desktop based application or tool.

## Table of Contents

- Overview
- App features
- Tech stack
- Back-end and API service
- Installation
- Usage & screenshots
- The team

## Overview

Through the plugin the user can create a maintenance/safety/feedback ticket and pass it on to be reviewed by the admin.

As an admin you can modify the tickets you received from the users, set their state (open, processing, closed) and send messages to request more info from the person who posted the ticket.

## Features:

- Add and view maintenance tickets
- Attach an image and/or an on-site location to a ticket
- Send/receive messages
- Review and change ticket state (open/processing/closed)
- Modify tickets/messages

## Tech Stack:

- React (employee & user client)
- NodeJS/Express (API server)
- MySQL (database)
- PhpMyAdmin (database interface)
- Docker (local deployment)

## Backend and API doc:

The app stores users and postsin a mySQL database. Post-related images are stored on the server.  

Api documentation can be found [here](https://documenter.getpostman.com/view/19111686/2s8YzUxMFN) and is created with Postman.

## Installation

To use test the app as intended, you should download and install [Docker Desktop](https://www.docker.com/products/docker-desktop/). More info on Docker and its functions can be found at [Docker docs](https://docs.docker.com/).

The DB/Server/Client services run in separate containers from which specific ports are exposed for easy testing with localhost.

Clone this repository (main branch).

After making sure that Docker Desktop is running, navigate to the root of the project (where docker-compose.yml is located), open a terminal and type...

```bash
docker-compose up
```

## Usage

### User Client (default)

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Check the init.sql in the db-folder for login credentials. By default, the login-names are...

Admin view:
* Pirjo Mäkinen

<img
  src="https://github.com/stenvma81/mobileproject/tree/TMNS-140_Final_code_checkup/screenshots/adminmain.png"
  alt="Admin main view with some maintenance tickets"
  title="Admin main view"
  style="display: inline-block; margin: 0 auto; width: 640px">

Employee view: 
* Merili Elnadi 
* Matti Stenvall
* Tatu Ihaksi

...which all use the same password (somePW).

New users can be added by modifying init.sql and rebuilding the docker images with

```bash
docker-compose down
```

```bash
docker-compose build
```

### Database Admin (default)

Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

DB ser credentials are found in docker-compose.yml.

## Contributing

Open an issue to discuss contributing to the repo.

## The Team (TMNS)

* Merili Elnadi
* Maiju Himberg [@maijuhimberg](https://github.com/maijuhimberg)
* Tatu Ihaksi [@taaatu](https://github.com/taaatu)
* Matti Stenvall [@stenvma81](https://github.com/stenvma81)
