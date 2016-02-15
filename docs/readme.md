
Kelp is a web application for fish that brings together users with aquatic
business that they trust, inspired by the mammal's equivalent: Yelp. Kelp uses
the Ruby on Rails and React.js development frameworks and allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create an account
- [ ] Sign in and sign out
- [ ] Write, edit, and destroy reviews as well as read the reviews of others
- [ ] Add other users to their "school"
- [ ] View a map with pins for their reviews and the reviews of those in their school
- [ ] Comment on and like another's reviews
- [ ] Search for reviews and users


## Things to run once cloned to get the server running:

- [ ] bundle install
- [ ] npm install (npm must be installed)
- [ ] webpack --watch (webpack also must be installed)
- [ ] bundle exec figaro install (and add keys)
- [ ] bundle exec rake db:reset (postgres must be installed)
- [ ] rails s

## Things to push to heroku:

- [ ] heroku login
- [ ] rm ~/.ssh/id_*  (only on a/A computers)
- [ ] heroku keys:add  (only on a/A computers)
- [ ] git remote add heroku https://git.heroku.com/kelp-app.git
- [ ] git push heroku master
- [ ] figaro heroku:set -e production
- [ ] heroku run bundle exec rake db:reset (resets full database! Don't do this if you want to save anything.)


## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./views.md
[schema]: ./schema.md

## Implementation Timeline

### Phase 1: User Authentication and Review Model (1 day)


The first step will be to build user authentication component of the app, with
sign in, sign up, and sign out actions. Any user of the site who is not signed
in will be redirected to the sign in page and can navigate to the sign up page.
I will also build the review model and controller, with API JSON views for
create, index, and show.


[Details][phase-one]

### Phase 2: Complete Flux Architecture for Reviews (3 days)

By the end of phase 2, a user should be able to create, update, destroy, and
view reviews (both individual reviews and indices of reviews). Only authors
should have authority to update and destroy reviews, and users must be signed
in to perform any CRUD action. To complete the flux architecture, I will create
a UserReview store with the appropriate actions and data storage to show the
reviews. Additionally, to put the reviews on the webpage, I will need to build
the necessary React components: the 'App', 'Profile', 'ReviewsIndex',
'ReviewsIndexItem', and 'Review' components. For now, users will only be able
to see an index of their own reviews on their profile page. At this point, I
plan on styling enough for the views to start resembling my wireframes.

[Details][phase-two]

### Phase 3: Businesses (1 day)

Once reviews are fully functional, I will create the business component. Users
can create businesses and reviews are associated with businesses. This will
require the creation of 'Business' and 'BusinessForm' components.

[Details][phase-three]

### Phase 4: Comments and Likes (1.5 days)

In phase 4 I plan on implementing the comment and like features. This will
require making models and controllers for both. Likes will need create and
destroy methods and comments will need create, update, destroy, and index
methods. I will also need to create 'CommentsIndex', 'CommentsIndexItem', and
'CommentForm' components. These components need an additional store for
comments, which will hold comments indexed by their associated review's id.
Some basic styling should also be applied to these new components.

[Details][phase-four]

### Phase 5: Schools and Map (2 days)

Phase 5 will begin with the creation of the school component of Kelp, allowing
users to create a network of other users whose reviews they are following. I
will create a school_membership model and controller, with create and destroy
actions. To display the reviews of members of a school, I will need a
'SchoolReviewsIndex' component as well as a 'SchoolReview' store. Once the
schools feature is complete, I will create a 'Map' component and a 'Marker'
store. In this phase I also plan on adding lat and lng columns to the reviews
table and the reviews JSON views.

[Details][phase-five]

### Phase 6: SearchBar (1 day)

Phase 6 will focus on creating the search bar feature. This will include
SearchBar, SearchesIndex, and SearchesIndexItem components. Additionally, I will
need to include a Search store to keep track of search items.

[Details][phase-six]


### Bonus Features (TBD)
- [ ] Save and share maps of different cities.
- [ ] Sign up / Sign in with Facebook.
- [ ] Tagging reviews and searching by tags
- [ ] Multiple sessions

[phase-one]: ./phases/phase1.md
[phase-two]: ./phases/phase2.md
[phase-three]: ./phases/phase3.md
[phase-four]: ./phases/phase4.md
[phase-five]: ./phases/phase5.md
