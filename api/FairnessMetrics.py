from flask_restful import Api, Resource, reqparse
import pickle


def load_data():
    with open('data/metric_values_slider_dict_PPV.txt', 'rb') as fp:
        metric_values_slider_dict = pickle.load(fp)
    
    with open('data/y_pred_aware.txt', 'rb') as fp:
        data = pickle.load(fp)
    
    ix_women = data['X_test']['gender'] == 0
    ix_men = data['X_test']['gender'] == 1
    s = data['s_test']

    return data, metric_values_slider_dict, ix_women, ix_men, s

class Shares(Resource):
    def get(self):
        data, metric_values_slider_dict, ix_women, ix_men, s = load_data()
        share_women = len(data['y_test'][ix_women])/len(data['y_test'])
        share_men = len(data['y_test'][ix_men])/len(data['y_test'])
        shares = {"statistic": [share_women, share_men], "labels": ["Women", "Men"]}
        return shares

class BaseRates(Resource):
    def get(self):
        data, metric_values_slider_dict, ix_women, ix_men, s = load_data()
        base_rate_women = (data['y_test'][ix_women] == 1).mean()
        base_rate_men = (data['y_test'][ix_men] == 1).mean()
        base_rates = {"statistic": [base_rate_women, base_rate_men], "labels": ["Women", "Men"]}
        return base_rates


class Fingerprint(Resource):
    def get(self):
        data, metric_values_slider_dict, ix_women, ix_men, s = load_data()
        # TODO: for now, we just return the data calculated for a sliderValue=0.0
        return {"metric_values_slider_dict": metric_values_slider_dict["acceptance"][0.0]}

class Scores(Resource):
    def get(self):
        data, metric_values_slider_dict, ix_women, ix_men, s = load_data()
        scores_men = s[ix_men].tolist()
        scores_women = s[ix_women].tolist()
        return {"scores_men": scores_men, "scores_women": scores_women}

class FairnessMetricsAndSliderValues(Resource):

    def get(self, fairness_label, slider_value):
        #parse slider value from string to float
        slider_value = float(slider_value)
        data, metric_values_slider_dict, ix_women, ix_men, s = load_data()
        return {"metric_values_slider_dict": metric_values_slider_dict[fairness_label][slider_value]}

    """
    def put(self, metric):
        todos[metric] = request.form['data']
        return {metric: todos[metric]}
    """

