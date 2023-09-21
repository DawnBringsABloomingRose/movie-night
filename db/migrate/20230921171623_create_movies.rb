class CreateMovies < ActiveRecord::Migration[7.0]
  def change
    create_table :movies do |t|
      t.string :name, null: false, default: ''
      t.integer :year
      t.integer :length_in_mins
      t.integer :tmdb_ref
      t.boolean :halloween, default: false
      t.timestamps
    end

    add_index :movies, :name
    add_index :movies, :tmdb_ref, unique: true
  end
end
