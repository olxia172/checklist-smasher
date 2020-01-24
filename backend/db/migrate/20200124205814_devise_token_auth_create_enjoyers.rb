class DeviseTokenAuthCreateEnjoyers < ActiveRecord::Migration[6.0]
  def change
    ## Required
    add_column :enjoyers,:provider, :string, :null => false, :default => "email"
    add_column :enjoyers,:uid, :string, :null => false, :default => ""

    ## Database authenticatable
    add_column :enjoyers, :encrypted_password, :string, :null => false, :default => ""

    ## Recoverable
    add_column :enjoyers, :reset_password_token, :string
    add_column :enjoyers, :reset_password_sent_at, :datetime
    add_column :enjoyers, :allow_password_change, :boolean, default: false

    ## Rememberable
    add_column :enjoyers, :remember_created_at, :datetime

    ## Confirmable
    add_column :enjoyers, :confirmation_token, :string
    add_column :enjoyers, :confirmed_at, :datetime
    add_column :enjoyers, :confirmation_sent_at, :datetime
    add_column :enjoyers, :unconfirmed_email, :string # Only if using reconfirmable

    ## Lockable
    # t.integer  :failed_attempts, :default => 0, :null => false # Only if lock strategy is :failed_attempts
    # t.string   :unlock_token # Only if unlock strategy is :email or :both
    # t.datetime :locked_at

    ## User Info
    add_column :enjoyers, :nickname, :string
    add_column :enjoyers, :image, :string

    ## Tokens
    add_column :enjoyers, :tokens, :json

    add_index :enjoyers, :email,                unique: true
    add_index :enjoyers, [:uid, :provider],     unique: true
    add_index :enjoyers, :reset_password_token, unique: true
    add_index :enjoyers, :confirmation_token,   unique: true
    # add_index :enjoyers, :unlock_token,       unique: true
  end
end
