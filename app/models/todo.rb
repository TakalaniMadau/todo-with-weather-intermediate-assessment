class Todo < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true

  scope :completed, -> { where(status: true) }
  scope :todo, -> { where(status: false) }
end
