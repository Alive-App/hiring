class CsvProcessJob < ApplicationJob
  require 'smarter_csv'
  queue_as :default
  sidekiq_options retry: 5

  def perform(csv_upload)
    data = SmarterCSV.process(csv_upload.csv_on_disk)
    Smartphone.create(data)
  end
end
