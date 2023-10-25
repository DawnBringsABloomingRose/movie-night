class Api::V1::MoviesController < ApplicationController
    def index
        @movies = Suggestion.includes(:movie).where(movie: {watched: true}).order(:updated_at).offset(params[:offset]*10).limit(10)
        render json: @movies, include: [:movie, :user, :likes, :blocks]
    end
end
