class CreateEnjoyers < ActiveRecord::Migration[6.0]
  def change
    create_table :enjoyers do |t|
      t.string :name, null: false, index: true
      t.string :email, null: false, index: true
      t.string :password_digest, null: false, default: ''

      t.timestamps
    end
  end
end
