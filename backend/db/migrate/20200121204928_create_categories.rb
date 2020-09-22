class CreateCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :categories do |t|
      t.string :name, index: true
      t.string :label
      t.string :icon_name

      t.timestamps
    end

    add_reference :checklists, :category, index: true
  end
end
