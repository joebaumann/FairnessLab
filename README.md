# FairnessLab

![Continuous Deployment](https://github.com/joebaumann/FairnessLab/workflows/Deploy/badge.svg)

The FairnessLab is an open-source tool for bias audits. It can be used to audit binary decision-making systems.
What sets the FairnessLab apart from existing tools: It allows you to create fairness metrics that are uniquely fit to your own application context. This is based on the idea that fairness is highly contextual, so the way we evaluate the fairness of the audited system has to be adapted to the context. This can only be done by clarifying what assumptions we make about the context in which the audited system will be deployed. The FairnessLab asks for these assumptions and derives a fairness metric that fits this context. This approach is based on our theoretical framework for unifying and extending existing definitions of group fairness [[Hertweck et al. (2022)](https://arxiv.org/abs/2206.02891), [Baumann et al. (2022)](https://arxiv.org/abs/2206.02897)]. The resulting context-specific fairness metrics alleviate many of the limitations of current group fairness metrics that have been criticized in the literate

The app is publicly available at [https://joebaumann.github.io/FairnessLab](https://joebaumann.github.io/FairnessLab/).

## Run WebApp locally:

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

## Deploy WebApp:

Make sure that you are in the frontend directory with:
```
cd frontend
```
Then, deploy the React app to gh-pages with:
```
npm run deploy
```
The app is available at [https://joebaumann.github.io/FairnessLab](https://joebaumann.github.io/FairnessLab/).
