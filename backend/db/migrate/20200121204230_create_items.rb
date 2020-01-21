class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.string :name
      t.references :checklist, null: false, foreign_key: true, index: true
      t.date :to_do_on
      t.boolean :done
      t.boolean :cancelled
      t.references :item, foreign_key: true

      t.timestamps
    end
  end
end
