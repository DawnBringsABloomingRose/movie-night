class Api::V1::SuggestionsController < ApplicationController
  before_action :set_suggestion, only: [:show, :edit, :update, :destroy]
  def index
    @suggestions = Suggestion.all.includes(:movie)
    render json: @suggestions, include: [:movie, :user]
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
    @suggestion = Suggestion.new(suggestion_params)

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
    @suggestion = Suggestion.find(params[:id]).includes(:movie, :user)
  end

  def suggestion_params
    params.require(:suggestion).permit(:user_id, :movie_id)
  end
end
