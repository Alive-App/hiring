class SmartphonesController < ApplicationController
  def index
    @smartphones = Smartphone.all
  end
end
