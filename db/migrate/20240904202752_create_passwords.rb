class CreatePasswords < ActiveRecord::Migration[7.2]
  def change
    create_table :passwords do |t|
      t.string :name
      t.string :key_digest
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
