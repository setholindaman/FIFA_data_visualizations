import json
import requests
import pymongo
from flask import Flask, render_template, redirect, jsonify
import pandas as pd
import time

app = Flask(__name__)
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
client.drop_database('fifa')

fifa_db = client.fifa
fifa_data = fifa_db.data

fifa_country_data = fifa_db.country_data

csvfile = 'resources/FIFA_data.csv'
csv_read = pd.read_csv(csvfile)
country_csvfile = 'resources/countryCoords.csv'
country_read = pd.read_csv(country_csvfile)

fifa_data.insert_many(csv_read.to_dict('records'))
fifa_country_data.insert_many(country_read.to_dict('records'))


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/geomap')
def geomap():

    countries_list = fifa_data.find({})

    countries_list_db = pd.DataFrame(list(countries_list))[['Nationality', 'Overall']].groupby('Nationality').mean()
    
    countries_with_coords = fifa_country_data.find({}, {'name':1, 'latitude':1, 'longitude':1, '_id':0})

    name_list = []
    latitude_list = []
    longitude_list = []

    for country in countries_with_coords:
        name_list.append(country['name'])
        latitude_list.append(country['latitude'])
        longitude_list.append(country['longitude'])

    countries_with_coords_db = pd.DataFrame({
        'Nationality': name_list,
        'Latitude': latitude_list,
        'Longitude': longitude_list
    })

    final_db = pd.merge(countries_list_db, countries_with_coords_db, on = 'Nationality')
    final_dict = final_db.to_dict('records')


    return jsonify(final_dict)


if __name__ == "__main__":
    app.run(debug=True)
