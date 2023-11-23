class Api::V1::MoviesController < ApplicationController
    skip_before_action :verify_authenticity_token
    def index
        @movies = Suggestion.includes(:movie).where(movie: {watched: true}).order(:updated_at).offset(params[:offset]*10).limit(10)
        render json: @movies, include: [:movie, :user, :likes, :blocks]
    end

    def update
        @movie = Movie.find(params[:id])
        if params[:watched]
            @movie.watched = true 
        else
            @movie.update(name: params[:name], length_in_mins: params[:length_in_mins], year: params[:year], link: params[:link], image: params[:image], halloween: params[:halloween])
        end
        
        @movie.image = params[:image] if params[:image]


        @movie.save
    end
end
