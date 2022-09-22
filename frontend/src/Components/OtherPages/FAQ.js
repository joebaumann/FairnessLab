import React from "react";
import Header from '../Header';
import './Pages.css'

function FAQ() {
    return (
        <div>
        <Header title="FAQ"/>

        <h3 className="faq">What format should the uploaded dataset be in?</h3>
        <p>
        You can upload your dataset as either a CSV or a JSON file.
        You will need the following attributes:
        <ul>
            <li><b>sensitive-attribute</b>: <i>binary (0 or 1)</i>, defines the salient groups that you want to compare. These could be groups based on gender, race, age, disability status, sexual orientation etc.</li>
            <li><b>Y</b>: <i>binary (0 or 1)</i>, the target variable, what the model tries to predict</li>
            <li><b>scores</b>: <i>continuous variable (between 0 and 1)</i>, what the model predicts as the probability of the individual having Y=1</li>
            <li><b>D</b>: <i>binary (0 or 1)</i>, the decision of the model</li>
        </ul>
        Whether you upload a CSV or JSON file, you can always add more attributes to your file, but only the ones listed above will be considered.
        </p>
        <p>
        If you want to upload your dataset as a <b>CSV</b> file, make sure to use a comma as the separator. The structure should look as follows:
        </p>
        <table>
            <tr>
                <th>sensitive-attribute</th>
                <th>Y</th>
                <th>scores</th>
                <th>D</th>
            </tr>
            <tr>
                <td>1</td>
                <td>1</td>
                <td>0.7</td>
                <td>1</td>
            </tr>
            <tr>
                <td>0</td>
                <td>1</td>
                <td>0.8</td>
                <td>1</td>
            </tr>
            <tr>
                <td>1</td>
                <td>0</td>
                <td>0.6</td>
                <td>1</td>
            </tr>
        </table>
        <p>
            If you want to upload a <b>JSON</b> file, make sure it looks like the following with one object per individual:
        </p>
        <p className="JSON">
            [&#123;'sensitive-attribute': 1, 'Y': 1, 'scores': 0.7, 'D': 1&#125;, &#123;'sensitive-attribute': 0, 'Y': 1, 'scores': 0.8, 'D': 1&#125;, &#123;'sensitive-attribute': 1, 'Y': 0, 'scores': 0.6, 'D': 1&#125;]
        </p>

        <h3 className="faq" id="binary-classifier">My data is not from a binary classifier. Can I still use this auditing tool?</h3>
        <p>
            Yes, if you convert it to a binary dataset. Only do this if this makes sense in the context of your application.
        </p>

        <h3 className="faq">I don't have the scores that the model outputs ('scores'), only the final decisions ('D'). How does this affect the audit?</h3>
        <p>
            No points from postprocessing in Pareto plot, only some basic points (like perfect predictor) to compare decisions against.
        </p>

        <h3 className="faq">What does the Pareto plot show?</h3>
        <p>
            If 'scores' are available:
            If 'D' is available:
            Always:
        </p>

        <h3 className="faq">What makes the FairnessLab different from tools like Aequitas, AIF360 or FairLearn?</h3>
        <p>
            Extension of standard group fairness metrics. Highlights assumptions of standard metrics.
        </p>
    </div>
  );
}

export default FAQ;