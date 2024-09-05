class AddEncryptedKeyIvToPasswords < ActiveRecord::Migration[7.2]
  def change
    add_column :passwords, :encrypted_key_iv, :string
  end
end
