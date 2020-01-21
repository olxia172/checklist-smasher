class CreateChecklists < ActiveRecord::Migration[6.0]
  def change
    create_table :checklists do |t|
      t.string :name
      t.references :enjoyer, null: false, foreign_key: true, index: true

      t.timestamps
    end
  end
end
