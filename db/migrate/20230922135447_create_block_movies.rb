class CreateBlockMovies < ActiveRecord::Migration[7.0]
  def change
    create_table :block_movies do |t|
      t.references :block, null: false, foreign_key: true
      t.references :movie, null: false, foreign_key: true

      t.timestamps
    end
  end
end
