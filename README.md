# Maintenance ticket plugin for an employee app

This is a student project for Metropolia UAC Mobile Project course.

Through the plugin the user can create a maintenance/safety/feedback ticket and pass it on to be reviewed by the admin.

As an admin you can modify the tickets you received from the users, set their state (open, processing, closed) and send messages to request more info from the person who posted the ticket.

This project uses ReactJS(Client), NodeJS/Express(Server), MySQL(Database) and myPhpAdmin(DB Admin).

## Installation

To use test the app as intended, you should download and install Docker Desktop. If you don't know what Docker is and what it's used for, check the links below.

The DB/Server/Client services run in separate containers from which specific ports are exposed for easy testing with localhost.

Clone the repository.

After making sure that Docker Desktop is running, navigate to the root of the project (where docker-compose.yml is located), open a terminal and type...

```bash
docker-compose up
```

## Usage

### User Client (default)

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Check the init.sql in the db-folder for login credentials.

### Database Admin (default)

Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

Check docker-compose.yml for user credentials.

## Contributing

## The Team (TMNS)
* Merili Elnadi
* Maiju Himberg [@maijuhimberg](https://github.com/maijuhimberg)
* Tatu Ihaksi [@taaatu](https://github.com/taaatu)
* Matti Stenvall [@stenvma81](https://github.com/stenvma81)

## License