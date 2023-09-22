class Block < ApplicationRecord
  has_many :block_movies
  has_many :movies, through: :block_movies
end
