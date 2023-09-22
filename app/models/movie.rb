class Movie < ApplicationRecord
  has_many :likes
  has_many :block_movies
  has_many :blocks, through: :block_movies
  has_one :suggestion
  has_many :block_movies
  has_many :blocks, through: :block_movies
end
