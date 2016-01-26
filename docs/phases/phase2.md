# Phase 2: Complete Flux Architecture for Reviews (3 days)

## Rails
### Models

### Controllers

### Views

## Flux
### Views (React Components)
* App
* Profile
* UserReviewsIndex
  - ReviewsIndexItem
* Review

### Stores
* UserReview

### Actions
* ApiActions.receiveAllReviews -> triggered by ApiUtil
* ApiActions.deleteReview
* ReviewActions.fetchAllUserReviews -> triggers ApiUtil
* ReviewActions.fetchSingleReview
* ReviewActions.createReview
* ReviewActions.editReview
* ReviewActions.destroyReview

### ApiUtil
* ApiUtil.fetchAllUserReviews
* ApiUtil.fetchSingleReview
* ApiUtil.createReview
* ApiUtil.editReview
* ApiUtil.destroyReview

## Gems/Libraries
* Flux Dispatcher (npm)
* Facebook React
