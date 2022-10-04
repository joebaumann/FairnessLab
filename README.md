# :balance_scale: FairnessLab

![Continuous Deployment](https://github.com/joebaumann/FairnessLab/workflows/Deploy/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The FairnessLab is an open-source tool for bias audits. It can be used to audit binary decision-making systems.
What sets the FairnessLab apart from existing tools is that it allows you to create fairness metrics that are uniquely fit to your own application context. This is based on the idea that fairness is highly contextual, so the way we evaluate the fairness of the audited system has to be adapted to the context. This can only be done by clarifying what assumptions we make about the context in which the audited system will be deployed. The FairnessLab asks for these assumptions and derives a fairness metric that fits this context. This approach is based on our theoretical framework for unifying and extending existing definitions of group fairness [[Hertweck et al. (2022)](https://arxiv.org/abs/2206.02891), [Baumann et al. (2022)](https://arxiv.org/abs/2206.02897)]. The resulting context-specific fairness metrics alleviate many of the limitations of current group fairness metrics that have been criticized.

## Demo

The app is publicly available at [https://joebaumann.github.io/FairnessLab](https://joebaumann.github.io/FairnessLab/).

You can see the FairnessLab in action if you read through this audit of the COMPAS algorithm that provides new insights into the COMPAS bias discussions.

![FairnessLabDemo](demo/demo.gif)

## Run WebApp locally

```
git clone https://github.com/joebaumann/FairnessLab.git
cd FairnessLab
```
Then, start frontend development server with:
```
cd frontend
npm install
npm start
```
This should automatically open the WebApp at <http://localhost:3000/>.

## Limitations and future extensions

Any bias audit tool comes with limitations. Here are the main ones of the FairnessLab:
- Can currently only audit _binary_ decision-making systems
- Can currently only audit one model at a time
- Can currently only build utility functions using Y, D and the sensitive attribute but no other features yet
- Can currently only configure one fairness metric at a time
- Should in the future show error bars in Pareto plot to assess statistical significance of efficiency-fairness tradeoffs

More features will be added in the future to better reflect the flexibility of our theoretical approach.

## Get in touch

Do you want to audit a model using the FairnessLab or our approach and want to discuss this with us? Do you have ideas for how to improve the FairnessLab? Then don't hesitate to reach out to us: [Corinna](corinna.hertweck@uzh.ch) and [Joe](baumann@ifi.uzh.ch).