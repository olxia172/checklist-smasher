class CreateOccurrences < ActiveRecord::Migration[6.0]
  def change
    create_table :occurrences do |t|
      t.references :item, index: true
      t.datetime :occurs_at

      t.timestamps
    end

    add_index :occurrences, [:item_id, :occurs_at], unique: true
  end
end
