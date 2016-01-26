# Phase 3: Businesses (1 day)

## Rails
### Models
* Business

### Controllers
* Api::BusinessesController (create, destroy, update)

### Views
* businesses/create.json.jbuilder
* businesses/update.json.jbuilder

## Flux
### Views (React Components)
* Business
* BusinessForm

### Stores

### Actions
* BusinessActions.fetchAllBusinessReviews -> triggers ApiUtil
* BusinessActions.createBusiness
* BusinessActions.editBusiness
* BusinessActions.destroyBusiness

### ApiUtil
* ApiUtil.fetchAllBusinessReviews
* ApiUtil.createBusiness
* ApiUtil.editBusiness
* ApiUtil.destroyBusiness

## Gems/Libraries
