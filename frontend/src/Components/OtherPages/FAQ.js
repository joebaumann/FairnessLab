import React from "react";
import Header from '../Header';
import './Pages.css'
import pareto_explanation from './pareto_explanation.png';

function FAQ() {
    return (
        <div>
        <Header title="FAQ"/>

        <div className="Content">
            <h3>What format should the uploaded dataset be in?</h3>
            <p>
            You can upload your dataset as either a CSV or a JSON file.
            You will need the following attributes:
            </p>
            <ul>
                <li><b>sensitive-attribute</b>: <i>binary (0 or 1)</i>, defines the salient groups that you want to compare. These could be groups based on gender, race, age, disability status, sexual orientation etc.</li>
                <li><b>Y</b>: <i>binary (0 or 1)</i>, the target variable, what the model tries to predict</li>
                <li><b>scores</b>: <i>continuous variable (between 0 and 1)</i>, what the model predicts as the probability of the individual having Y=1</li>
                <li><b>D</b>: <i>binary (0 or 1)</i>, the decision of the model</li>
            </ul>
            <p>
            Whether you upload a CSV or JSON file, you can always add more attributes to your file, but only the ones listed above will be considered. The order of the columns doesn't matter.
            </p>
            <p>
            If you want to upload your dataset as a <b>CSV</b> file, make sure to use a comma as the separator. The structure should look as follows:
            </p>
            <table>
                <thead>
                    <tr>
                        <th>sensitive-attribute</th>
                        <th>Y</th>
                        <th>scores</th>
                        <th>D</th>
                    </tr>
                </thead>
                <tbody>
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
                </tbody>
            </table>
            <p>
                If you want to upload a <b>JSON</b> file, make sure it looks like the following with one object per individual:
            </p>
            <p className="JSON">
                [&#123;'sensitive-attribute': 1, 'Y': 1, 'scores': 0.7, 'D': 1&#125;, &#123;'sensitive-attribute': 0, 'Y': 1, 'scores': 0.8, 'D': 1&#125;, &#123;'sensitive-attribute': 1, 'Y': 0, 'scores': 0.6, 'D': 1&#125;]
            </p>

            <h3 id="binary-classifier">My data is not from a binary classifier. Can I still use this auditing tool?</h3>
            <p>
                Potentially, yes. You will have to you convert your to a binary dataset, then you can use the FairnessLab. However, you should only do this if this makes sense in the context of your application.
                With ProPublica's COMPAS audit, for example, one could argue that it makes sense to audit the system through the lens of binary scores: high scores and low scores.
            </p>

            <h3>I don't have the scores that the model outputs ('scores'), only the final decisions ('D'). How does this affect the audit?</h3>
            <p>
                In that case, the Pareto plot only shows one point: the utility of the decision-maker and the fairness score for the decisions in the dataset (the column 'D').
                In the future, we will add more points that you can compare your decisions to, such as a decision rule that assigns D=1 to everyone or a perfect predictor, where D=Y.
            </p>

            <h3>What does the Pareto plot show?</h3>
            <p>
                What the Pareto plot shows depends on what data you provide.
            </p>
            <p>
                If 'scores' are available: the FairnessLab explores possible decision rules based on these scores, i.e., rules that turn a given score into a binary decision. It is known that decision rules that achieve the maximum possible utility for decision makers while leading to equal expected utilities across groups take the form of group-specific thresholds. Therefore, the FairnessLab tests different thresholds on the scores. Specifically, it goes over <i>n</i> thresholds for group 1 and over <i>n</i> thresholds for group 2, where <i>n</i> is the number of thresholds specified by the user. The combination of these thresholds leads to <i>n^2</i> threshold combinations. For each such threshold combination, the FairnessLab calculates the resulting fairness score and the utility of the decision maker. This is then plotted in a plot where the y-axis represents the decision-maker’s utility. The x-axis represents the fairness score, where fairness scores are adjusted in a way such that a higher scores mean the audited system is better aligned with the configured fairness metric. Each possible combination of thresholds is represented by a dot in the Pareto plot.
            </p>
            <p>
                If 'D' is available: The decisions represented by 'D' are evaluated with respect to their fairness and their utility for the decision maker. This is then shown as a diamond in the Pareto plot. Together with the dots from the 'scores,' this allows for a comparison of the current decision rule with other possible threshold-based decision rules.
            </p>
            <img src={pareto_explanation} alt="Visualization of how the Pareto plot is created: For every group, n thresholds are tested. For each the resulting n*n threshold combinations, the FairnessLab calculates the resulting decision maker’s utility and the fairness score." width="500" height="250"/>

            <h3>What makes the FairnessLab different from tools like Aequitas, AIF360 or FairLearn?</h3>
            <p>
                Compared to existing fairness audit tools (such as Fairlearn, AIF365, Aequitas), the overall structure of our tool is quite similar: It takes in a dataset, which represents previously taken decisions of the audited system. The tool evaluates the audited system’s fairness with respect to metrics which have been chosen by the user. The FairnessLab deviates from existing tools in the fairness metrics it offers to its users: We believe that fairness is highly contextual and so evaluating fairness is a context-specific task and there is no one size fits all solution. We developed a theoretical approach, which allows for the definition of context-specific fairness metrics. The FairnessLab is an implementation of this approach.
            </p>
        </div>
    </div>
  );
}

export default FAQ;