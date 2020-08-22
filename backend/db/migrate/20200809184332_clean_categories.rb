class CleanCategories < ActiveRecord::Migration[6.0]
  def change
    remove_reference :categories, :checklist
    add_reference :checklists, :category, index: true
  end
end
