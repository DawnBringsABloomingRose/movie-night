class Api::V1::SuggestionsController < ApplicationController
  before_action :set_suggestion, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  def index
    @suggestions = Suggestion.all.includes(:movie, :blocks).where(movie: {watched: [false, nil]} )

    if params[:order_by] == 'likes'
      @suggestions = @suggestions.left_joins(:likes).group("suggestions.id, movie.id, blocks.id").order("COUNT(likes.id) #{params[:direction]}, suggestions.created_at #{params[:direction]}")
    elsif params[:order_by] == 'age'
      @suggestions = @suggestions.order("suggestions.created_at #{params[:direction]}")
    end

    if params[:halloween] == 'true'
      # group by in postgres requires all ids included in the select to either the group by statement or in an aggregate function
      # therefore we include all of them in the group by statement...
      # does this or the requirement make sense? no. does it work? seemingly so
      @suggestions = @suggestions.where(movie: {halloween: true} ).group("movie.id, suggestions.id, blocks.id")
    end

    if params[:tags] != 'undefined' and defined?(params[:tags])
      @suggestions = @suggestions.where(blocks: {id: params[:tags]}).group("movie.id, suggestions.id, blocks.id") unless params[:halloween] == 'true'
      @suggestions = @suggestions.where(blocks: {id: params[:tags]}).group("movie.id, suggestions.id, blocks.id") if params[:halloween] == 'true'
    end

    @suggestions = @suggestions.offset(10*params[:offset].to_i).limit(10)
    render json: @suggestions, include: [:movie, :user, :likes, :blocks]
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
    @movie = Movie.where(tmdb_ref: params[:tmdb_ref]).first if params[:tmdb_ref]
    @movie = Movie.new(name: params[:name], year: params[:year], tmdb_ref: params[:tmdb_ref], halloween: params[:halloween], length_in_mins: params[:length_in_mins], image: params[:image], link: params[:link]) unless @movie
    if @movie.save
      @suggestion = Suggestion.new(movie_id: @movie.id, user_id: current_user.id)
    end
    #@suggestion = Suggestion.new(suggestion_params)
    if params[:blocks]
      puts "hello"
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
