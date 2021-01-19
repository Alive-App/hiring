require 'test_helper'
require 'csv'

class CellPhonesControllerTest < ActionDispatch::IntegrationTest

  setup do
    @valid = fixture_file_upload('input_valid.csv', 'text/csv')
    @invalid = fixture_file_upload('input_invalid.csv', 'text/csv')
  end

  test "should get index" do
    get cell_phones_index_path
    assert_response :success
  end

  test 'should import valid file' do
    import = CSV.read(@valid.tempfile).length

    assert_no_changes 'cell_phones.count', import do
      post cell_phones_import_path, params: { file: @valid }
    end

    assert_redirected_to cell_phones_index_path
  end

  test 'should not import invalid file' do
    assert_no_changes 'cell_phones.count' do
      post cell_phones_import_path, params: { file: @invalid }
    end
    assert_redirected_to cell_phones_index_path
  end

end
