require 'sinatra'
require 'mongoid'
require 'oj'
require 'sinatra/reloader' if development?

Mongoid.load!("mongoid.yml")

class Doc
	include Mongoid::Document
		field :name_first, type: String
		field :name_last, type: String
		field :twitter, type: String
		field :linked_in, type: String 
		field :website, type: String
		
		embeds_one :contact_infos
		embeds_many :experiences
		embeds_many :schools
		embeds_many :accomplishments
		embeds_many :skills


end


class ContactInfo
	include Mongoid::Document

	field :phone
	field :email

	embedded_in :doc
	embeds_one :street_address
end

class StreetAddress
	include Mongoid::Document

	field :street, type: String
	field :city, type: String
	field :state, type: String
	field :zip_code, type: String

	embedded_in :contact_info
end


class Experience
	include Mongoid::Document

	field :organization,		type: String
	field :project,				type: String
	field :role, 				type: String
	field :start_month_year, 	type: String
	field :end_month_year,		type: String
	field :location, 			type: String
	field :responsibilities,	type: Array

	embedded_in :docs

end

class School
	include Mongoid::Document
	field :name, 	type: String 
	field :degree, 	type: String 
	field :gpa, 	type: String 
	field :major, 	type: String 
	field :minor, 	type: String 	
	field :start_month_year, type: String 	
	field :end_month_year, 	type: String 		

	embedded_in :docs				

end

class Accomplishment
	include Mongoid::Document
	field :title, 	type: String 
	field :month_year, 	type: String 
	field :description, 	type: String 
	

	embedded_in :docs				

end


class Skill
	include Mongoid::Document
	field :title, type: String
	field :category, type: String
	field :experience, type: String 

	embedded_in :docs
end




get '/' do 
  content_type :json 
  docs = Doc.all
  docs.to_json
end

get '/:id' do 
	content_type :json
	docs = Doc.find params[:id] 
	docs.to_json
end

delete '/:id' do
	doc = Doc.find params[:id] 
	doc.destroy	
end

post '/' do 
	content_type :json
	data = JSON.parse(request.body.read)["resume"]
	puts data
	doc = Doc.create!(data)
	doc.to_json
end

put '/:id' do
	content_type :json
	doc = Doc.find(params[:id])
	data = JSON.parse(request.body.read)["resume"]
	doc.update_attributes!(data)
	doc.to_json
end




