# Recipe Finder Website

## Motivation
I have seen many repositories on recipe-finder websites, but none of them were based on ingredients search. And all of them used some or the other API like edamam etc. In-order to make it a challenge, I decided to not use an API.

## Overview
Instead of searching for a dish according to it's name, I am asking for some ingredients and suggesting possible dishes that can be made using these ingredients. 
For this project I am using the Recipe Dataset (over 2M) Food publicly available on kaggle. 
https://www.kaggle.com/datasets/wilmerarltstrmberg/recipe-dataset-over-2m/data
Since the dataset file size is very big I couldn't include it here, you can clone my repo and download the dataset from above link. 
Make sure to name the file as recipes_data.csv
I am instead using a smaller version of the dataset within 25mb.

## Deployment using WSGI server
For local deployment running the flask app is enough, but to deploy on netlify, I used Gunicorn. The gunicorn.conf file serves for the important configurations and location of my flask app.
I added the Gunicorn command to a startup script or Procfile.
For local testing of gunicorn on windows, you can refer to https://stackoverflow.com/questions/62788628/modulenotfounderror-no-module-named-fcntl
Basically u can use waitress for running on windows.
