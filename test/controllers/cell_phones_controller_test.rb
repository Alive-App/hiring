require 'test_helper'

class CellPhonesControllerTest < ActionDispatch::IntegrationTest

  setup do
    @cellphone = cell_phones(:motorola)
  end

  test "should get index" do
    get cell_phones_index_url
      get cell_phones_url, params: {cell_phone:
          {manufacturer: Faker::Name.name, model: Faker::Name.name, carrier_plan_type: Faker::Name.name }
      }
    assert_response :success
  end

  test "should import cell_phone" do
    assert_difference('cell_phones.count') do
      post cell_phones_url, params: {cell_phone: {manufacturer: Faker::Name.name }}
    end

    assert_response :import
  end

end
