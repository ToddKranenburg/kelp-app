# Kelp

## Welcome!
Welcome to Kelp, Yelp for fish! Users of Kelp can:

- [ ] Create accounts
- [ ] Sign in and sign out
- [ ] Write reviews the aquatic (or terrestrial) businesses of their choice
- [ ] Read reviews by others and themselves
- [ ] Create their own business pages using Google Places and Google Maps data and API
- [ ] Upload photos for businesses and for user profiles

To use Kelp you must have an account. If you just want to peruse the app without making an account, there is a "Demo" button on the sign-up page that lets you login as a demo-user.

Take a swim around the site [here][heroku].
[heroku]: https://kelp-app.herokuapp.com/

For more information on the app, check out the [docs][documents].
[documents]: ./docs/readme.md


## Things to run on clone:

- [ ] bundle install
- [ ] npm install
- [ ] webpack --watch
- [ ] bundle exec figaro install (and add keys)
- [ ] bundle exec rake db:reset

## Things to push to heroku:

- [ ] heroku login
- [ ] rm ~/.ssh/id_*  (only on a/A computers)
- [ ] heroku keys:add  (only on a/A computers)
- [ ] git remote add heroku https://git.heroku.com/kelp-app.git
- [ ] git push heroku master
- [ ] figaro heroku:set -e production
- [ ] heroku run bundle exec rake db:reset (resets full database! Don't do this if you want to save anything.)
