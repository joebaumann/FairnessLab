from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment

from api.Home import Home
from api.FairnessMetrics import BaseRates, Fingerprint, Scores, FairnessMetricsAndSliderValues

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment
api = Api(app)

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

api.add_resource(Home,'/' , '/home')
api.add_resource(BaseRates, '/baserates')
api.add_resource(Fingerprint, '/fingerprint')
api.add_resource(Scores, '/scores')
api.add_resource(FairnessMetricsAndSliderValues, '/fairnessmetrics/<string:fairness_label>/<string:slider_value>')


if __name__ == '__main__':
    app.run(debug=True)