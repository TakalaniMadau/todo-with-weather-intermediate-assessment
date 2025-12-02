class Todo < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :status, inclusion: { in: [true, false] }

  scope :completed, -> { where(status: true) }
  scope :incomplete, -> { where(status: false) }
end
