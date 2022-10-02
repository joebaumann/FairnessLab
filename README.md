# FairnessLab

![Continuous Deployment](https://github.com/joebaumann/FairnessLab/workflows/Deploy/badge.svg)

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
