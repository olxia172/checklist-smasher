class CreateItemFormulas < ActiveRecord::Migration[6.0]
  def change
    create_table :item_formulas do |t|
      t.string :name, null: false
      t.references :checklist, null: false, foreign_key: true, index: true
      t.references :schedule, null: false, foreign_key: true, index: true
      t.boolean :cancelled, default: false

      t.timestamps
    end

    remove_reference :items, :formula, foreign_key: { to_table: :items }
    add_reference :items, :item_formula, foreign_key: true, index: true
    remove_column :items, :to_do_on, :date
    remove_column :items, :mode, :integer
    remove_column :items, :cancelled, :boolean
  end
end
