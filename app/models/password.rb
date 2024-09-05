class Password < ApplicationRecord
  belongs_to :user

  attr_encrypted :key, key: [ Rails.application.credentials.dig(:encryption_key, :secret) ].pack("H*")

  # Validaciones (puedes ajustarlas según tus necesidades)
  validates :name, presence: true
  validates :key, presence: true
end
