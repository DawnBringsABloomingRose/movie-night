class Api::V1::SuggestionsController < ApplicationController
  before_action :set_suggestion, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token
  def index
    @suggestions = Suggestion.all.includes(:movie)
    render json: @suggestions, include: [:movie, :user, :likes]
  end

  def show 
    if @suggestion
      render json: @suggestion, include: [:movie, :user]
    else
      render json: @suggestion.errors
    end
  end

  def new
    @suggestion = Suggestion.new
  end

  def edit
  end

  def create
    @movie = Movie.where(tmdb_ref: params[:tmdb_ref]).first
    @movie = Movie.new(name: params[:name], year: params[:year], tmdb_ref: params[:tmdb_ref], halloween: params[:halloween], length_in_mins: params[:length_in_minutes]) unless @movie
    if @movie.save
      @suggestion = Suggestion.new(movie_id: @movie.id, user_id: current_user.id)
    end
    #@suggestion = Suggestion.new(suggestion_params)
    if params[:block]
    params[:blocks].each do |block|
      @movie.block_movies.build(block_id: block).save
    end
    end

    if @suggestion.save
      render json: @suggestion, include: [:movie, :user]
    else
      render json: @suggestion.errors
    end
  end

  def update
  end

  def destroy
    @suggestion.destroy
    render json: { notice: 'Suggestion eliminated' }
  end

  private

  def set_suggestion
    @suggestion = Suggestion.find(params[:id])
  end

  def suggestion_params
    params.require(:suggestion).permit(:user_id, :movie_id, :tmdb_ref, :run_time, :year, :name)
  end
end
