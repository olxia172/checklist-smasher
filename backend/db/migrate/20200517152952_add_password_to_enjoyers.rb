class AddPasswordToEnjoyers < ActiveRecord::Migration[6.0]
  def change
    add_column :enjoyers, :password_digest, :string, null: false, default: ''
  end
end
