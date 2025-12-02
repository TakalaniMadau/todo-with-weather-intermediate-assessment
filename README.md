# README

This is a todo application with weather integration.

## Features

- Create and manage todo items
- View current weather information

## Technologies

- Ruby on Rails (backend framework)
- Tailwind CSS (styling)
- PostgreSQL (database)
- Stimulus.js (frontend interactivity)
- Turbo (fast, seamless navigation)
- Rspec & Factory Bot (testing)
- Weather API (OpenWeatherMap)
- RuboCop (code linting)

## Getting Started

### Prerequisites

- Ruby 3.4.7
- Rails 7.2.3
- Node 22.11.0
- Yarn 1.22.22 or npm 10.9.0

### Installation

1. Clone the repository: `git clone git@github.com:TakalaniMadau/todo-with-weather-intermediate-assessment.git`
2. Run `bundle install`

### Configuration

- Database creation

- Run `rails db:create` to create the database

- Database initialization

- Run `rails db:migrate` to run migrations

- How to run the test suite

- Run `rails test` to run the test suite

### Run Application

- Run `bin/dev` to start the development server
  OR
- Run `rails server` to start the server

The application will be available at http://localhost:3000

### Run Tests

- Run `rspec` to run the RSpec test suite
- Run `bundle exec rubocop -a` to run code linting and auto-correct
