require 'test_helper'

class CellPhonesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get cell_phones_index_url
    assert_response :success
  end

  test "should get import" do
    get cell_phones_import_url
    assert_response :success
  end

end
