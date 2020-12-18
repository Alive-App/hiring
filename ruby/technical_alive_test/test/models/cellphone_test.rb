require 'test_helper'

class CellphoneTest < ActiveSupport::TestCase
  test 'should import a valid file' do
    cellphone = Cellphone.new file: valid_file

    assert cellphone.import
    assert_empty cellphone.import_errors
  end

  test 'should not import an invalid file' do
    cellphone = Cellphone.new file: invalid_file

    assert_not cellphone.import
    assert_not_empty cellphone.import_errors
  end

  private

    def valid_file
      ActionDispatch::Http::UploadedFile.new(
        type: 'text/csv',
        tempfile: File.new(Rails.root.join(fixture_path, 'files', 'input_valid.csv'))
      )
    end

    def invalid_file
      ActionDispatch::Http::UploadedFile.new(
        type: 'text/csv',
        tempfile: File.new(Rails.root.join(fixture_path, 'files', 'input_invalid.csv'))
      )
    end
end
