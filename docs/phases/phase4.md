# Phase 4: Comments and Likes (1.5 days)

## Rails
### Models
* Like
* Comment

### Controllers
* Api::CommentsController (create, destroy, index, update)
* Api::LikesController (create, destroy)

### Views
* comments/index.json.jbuilder

## Flux
### Views (React Components)
* CommentsIndex
  - CommentIndexItem
  - CommentForm
* SearchIndex

### Stores
* Comment

### Actions
* ApiActions.receiveAllReviewComments -> triggered by ApiUtil
* ApiActions.deleteComment
* CommentActions.fetchAllReviewComments -> triggers ApiUtil
* CommentActions.createComment
* CommentActions.editComment
* CommentActions.destroyComment
* LikeActions.createLike
* LikeActions.destroyLike

### ApiUtil
* ApiUtil.fetchAllReviewComments
* ApiUtil.createComment
* ApiUtil.editComment
* ApiUtil.destroyComment

## Gems/Libraries
