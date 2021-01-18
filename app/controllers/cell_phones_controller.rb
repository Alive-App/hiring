class CellPhonesController < ApplicationController
  def index
    unless @cellphones&.empty?
    @cellphones = CellPhone.all
    @cellphones = @cellphones.filter_by_manufacturer(params[:manufacturer]) if params[:manufacturer].present?
    @cellphones = @cellphones.filter_by_model(params[:model]) if params[:model].present?
    @cellphones = @cellphones.filter_by_carrier_plan_type(params[:carrier_plan_type]) if params[:carrier_plan_type].present?
    end
  end

  def show
  end

  def import
    begin
      CellPhone.import(params[:file])
      flash[:notice] = "ok"
      redirect_to cell_phones_index_path, notice: "Tabela importada com sucesso"
    rescue
      flash[:notice] = "error"
      redirect_to cell_phones_index_path, notice: "Erro ao importar tabela"
      return
    end
  end
end
