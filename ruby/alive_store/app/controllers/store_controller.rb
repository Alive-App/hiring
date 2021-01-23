class StoreController < ApplicationController
  def index
    @q = Store.ransack(params[:q])
    @stores = @q.result(distinct: true)
  end

  def new
  	@stores = Store.new
  end
  
  def file_upload
     csv = UtilService.read_csv(params['anexo'])
     if csv
      flash.alert = "Anexado com sucesso"
      redirect_to root_path
     else
      flash.notice = "Arquivo invalido ou não anexado"
      redirect_to root_path
     end
  end

end
