class CreateCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :categories do |t|
      t.string :name, index: true
      t.string :label
      t.references :checklist, null: false, foreign_key: true, index: true

      t.timestamps
    end
  end
end
