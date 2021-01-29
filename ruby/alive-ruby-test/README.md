# REQUIREMENTS

To run this project, you will need:

- Ruby 3.0
- Rails 6.1
- Postgres 12.5

# SETUP

Clone the Project:

```
$ git clone https://github.com/lucasvieira7/hiring.git
```

And cd into the project folder:

```
$ cd hiring/ruby/alive-ruby-test
```

Install the gems used in the project:

```
$ bundle install
```

Run this command to open the credentials file and edit the postgres credentials:

```
$ EDITOR=nano bin/rails credentials:edit
```

Run the following command to create the database:

```
$ rake db:create
```

Then, run the migrations:

```
$ rake db:migrate
```

# Running server

To run the server, use:

```
$ rails s
```

# Runing tests

To run the automated tests, run:

```
$ rspec spec/requests
```

# Observations

- The `master.key` file has been committed only to simplify the process of editing the postgres credentials.

- The tests depend on the files located in the `/storage` directory
