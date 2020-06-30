require 'jwt'

class Session < ApplicationRecord
  belongs_to :enjoyer

  before_create :generate_key

  def generate_key
    hmac_secret = ENV['HMAC_SECRET']
    exp = Time.now.to_i + 4 * 3600
    alg = 'HS256'
    payload = { enjoyer_id: enjoyer.id, exp: exp }
    self.key = JWT.encode payload, hmac_secret, alg
  end
end
