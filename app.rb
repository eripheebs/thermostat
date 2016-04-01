require 'sinatra/base'
require_relative 'temperature.rb'

class Thermostat < Sinatra::Base
  set :public_folder, proc { File.join(root) }

  get "/" do
    send_file "index.html"
  end

  get "/temperature" do
    current_temp = Temperature.last.temperature
    Temperature.last.destroy
    return current_temp.to_s
  end

  post "/temperature" do
    Temperature.create(temperature: params[:temperature].to_i)
  end

  run! if app_file == $0
end
