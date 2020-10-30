class CsvUpload < ApplicationRecord
  has_one_attached :csv

  validates :csv, presence: true, blob: { content_type: ['text/csv'] }

  def csv_on_disk
    ActiveStorage::Blob.service.send(:path_for, self.csv.key)
  end
end
