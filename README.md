# FairnessLab

## Run WebApp locally:

```
git clone https://github.com/joebaumann/FairnessLab.git
cd FairnessLab
```
Create a conda virtual environment and install the necessary packages:
```
conda create --name <env> --file requirements.txt
conda activate <env>
```
Then, start the flask development server with enabed debug mode:
```
python app.py
```
Alternatively start flask production server with:
```
flask run
```
Then, start frontend development server with:
```
cd frontend
npm install
npm start
```
This should automatically open the WebApp at <http://localhost:3000/>.

## Deploy WebApp:

...
