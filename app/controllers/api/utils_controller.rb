class Api::UtilsController < ApplicationController

  def search
    if (params[:review_search])
      @review_results = Review
        .review_search(params[:query])
        .includes(:business)
        .page(1)
      @business_results = Business
        .business_search(params[:query])
        .page(1)

      render :review_search
    else
      @search_results = PgSearch
        .multisearch(params[:query])
        .includes(:searchable)
        .page(1)
    end
  end


end
