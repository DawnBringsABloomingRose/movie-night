class Suggestion < ApplicationRecord
  belongs_to :user
  belongs_to :movie
  has_many :likes, dependent: :destroy
  has_many :block_movies, through: :movie
  has_many :blocks, through: :block_movies

  def num_of_likes
    likes.count
  end
end
