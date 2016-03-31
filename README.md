# picasso

A simple JS/Canvas drawing app built on ember-cli with a Rails backend, 
* Uses ['paintr'](https://github.com/grese/paintr/)(a lightweight library that I developed to help quickly create drawing apps with Canvas).

## Installation:
* `git clone git@github.com:grese/picasso.git` #get the code
* `cd picasso/api`  #enter the rails app's root directory
* `bundle install` #run the rails installer
* `bundle exec rake ember:install` #run the ember app's installer
* `bundle exec rake db:setup` #setup the sqlite3 development DB

## Run
* `cd picasso/api` #enter rails app's root directory
* `rails s` #start the server

Screenshots coming soon :)