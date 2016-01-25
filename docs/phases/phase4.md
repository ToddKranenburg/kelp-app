# Phase 4: Schools and Map (2 days)

## Rails
### Models
* school_membership

### Controllers
* School_Memberships_Controller

### Views


## Flux
### Views (React Components)
* SchoolReviewsIndex
* Map

### Stores
* SchoolReview
* Marker

### Actions
* ApiActions.receiveAllSchoolReviews -> triggered by ApiUtil
* ApiActions.receiveAllMarkers
* ReviewActions.fetchAllSchoolReviews -> triggers ApiUtil
* MarkerActions.fetchAllMarkers

### ApiUtil
* ApiUtil.fetchAllSchoolReviews
* ApiUtil.fetchAllMarkers

## Gems/Libraries
* google.maps
