from flask import Flask, url_for, render_template, redirect, request, jsonify
import json as js
import requests as rq
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
import sklearn.linear_model as linmod
from sklearn.svm import SVR
from sklearn import preprocessing
import numpy as np
from pprint import pprint
import re
scale_ = preprocessing.scale

app = Flask(__name__.split('.')[0])
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


@app.route('/')
def main_page():
	return render_template('index.html')


def split(ar):
	X = np.array([])
	for i in ar[1:]:
		X = np.append(X, float(i))
	return (X, float(ar[0]))


def formatX(X):
	s_x = str(X).replace('\n', '').replace('] [', '],[').replace(
		' ]', ']').replace('[ ', '[').replace('[[ ', '[[').replace('. ', '.0')
	v = re.sub(' +', ' ', s_x)
	v = re.sub(r'\[ +', '[', v)
	v = re.sub(' ', ',', v)
	v = v.replace(',]', ']')
	return v


def formaty(y):
	return str(y).replace('\n', '').replace('.', '.0,').replace('.0,]', '.0]')


@app.route('/predict/', methods=['POST'])
def predict():
	X = np.empty((4,), dtype='float64')
	y = np.array([], dtype='float64')
	if request.method == 'POST':
		sym = js.loads(request.data)['symbol'].upper()
		print sym
		d = rq.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol={}&interval=5min&apikey=6JPELGYIYAQB0HUP'.format(sym)).json()
		for data in d['Time Series (5min)'].values():
			s = split(data.values())
			X = np.vstack((X, s[0]))
			y = np.append(y, s[1])

		v = formatX(X[1:])
		s_y = formaty(y)
		X_train, X_test, y_train, y_test = train_test_split(X[1:], y)
		clf = SVR(C=1e4, epsilon=1e-9, kernel='linear', gamma=5e7)
		clf.fit(X_train, y_train)
		pred = clf.predict(X_test)
		pred = formatX(pred)
		print pred
		k = {'X': v, 'y': s_y, 'pred': pred}
		pprint(k)
		return jsonify(k)
