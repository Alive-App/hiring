require 'rails_helper'

RSpec.describe "Products", type: :request do

  feature "Accessing /products/import" do
    scenario "returns http success" do
      visit "/products/import"
      expect(page).to have_http_status(:success)
    end

    scenario "pass 'valid_input.csv' with :fail_on_error checked and return the number of products that where saved" do
      visit "/products/import"

      attach_file :file, "#{Rails.root.join('storage', 'valid_input.csv')}"
      check :fail_on_error
      click_on "Save"

      expect(page).to have_http_status(:success)
      expect(current_path).to eq("/")
      expect(page).to have_css('div.notice', text: "Products successfully inserted")
    end

    scenario "pass 'storage/invalid_input.csv' with :fail_on_error checked and return error message" do
      visit "/products/import"

      attach_file :file, "#{Rails.root.join('storage', 'invalid_input.csv')}"
      check :fail_on_error
      click_on "Save"

      expect(page).to have_http_status(:success)
      expect(current_path).to eq("/products/import")
      expect(page).to have_css('div.warning', text: "An error occurred due to malformatted file or invalid input")
    end

    scenario "pass 'storage/invalid_input.csv' with :fail_on_error unchecked and return the number of products that where saved" do
      visit "/products/import"

      attach_file :file, "#{Rails.root.join('storage', 'invalid_input.csv')}"
      click_on "Save"

      expect(page).to have_http_status(:success)
      expect(current_path).to eq("/")
      expect(page).to have_css('div.notice', text: "Products successfully inserted")
    end
  end

end
