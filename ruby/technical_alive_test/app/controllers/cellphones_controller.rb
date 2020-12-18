class CellphonesController < ApplicationController
  def index
    @cellphones = Cellphone.all

    unless @cellphones&.empty?
      @carrier_plan_types = @cellphones.map(&:carrier_plan_type).uniq.sort_by(&:downcase)
    end

    if params[:manufacturer].present?
      @cellphones = @cellphones.filter_by_manufacturer(params[:manufacturer])
    end
    if params[:model].present?
      @cellphones = @cellphones.filter_by_model(params[:model])
    end
    if params[:carrier_plan_type].present?
      @cellphones = @cellphones.filter_by_carrier_plan_type(params[:carrier_plan_type])
    end
  end

  def import
  end

  def import_csv
    @cellphone = Cellphone.new file: params[:file]

    if @cellphone.import
      redirect_to cellphones_index_path, notice: 'Cellphone data successfully imported!'
    else
      flash[:import_errors] = @cellphone.import_errors
      redirect_to cellphones_index_path
    end
  end
end
