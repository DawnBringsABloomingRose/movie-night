class BlockMovie < ApplicationRecord
  belongs_to :block
  belongs_to :movie
end
