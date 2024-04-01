import os

bind = '0.0.0.0:' + str(os.getenv('PORT', 8000))

workers = 4

threads = 2

max_requests = 1000

timeout = 30

# Logging settings
accesslog = '-'  # Log to stdout
errorlog = '-'   # Log to stdout

pythonpath = os.path.dirname(os.path.abspath(__file__))  # Get the current directory
app = 'flask_file:app'
