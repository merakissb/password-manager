class RenameKeyDigestToEncryptedKeyInPasswords < ActiveRecord::Migration[7.2]
  def change
    rename_column :passwords, :key_digest, :encrypted_key
  end
end
