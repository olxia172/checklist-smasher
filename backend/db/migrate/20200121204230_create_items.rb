class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.string :name, null: false
      t.references :checklist, null: false, foreign_key: true, index: true

      t.timestamps
    end
  end
end
