from flask import Flask, url_for, render_template, redirect, request, jsonify
from flask_cors import CORS
from bson.json_util import dumps
from flask_pymongo import PyMongo
import json as js
import requests as rq
from pprint import pprint
from Crypto.Cipher import AES
app = Flask(__name__)
CORS(app)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.config['MONGO_DBNAME']='news'
#app.config['MONGO_URI']='mongo://prakhar@localhost:2701/newdb'
mongo=None
users=None
with app.app_context():
	global mongo,users
	mongo=PyMongo(app)
	users=mongo.db.newdb.find()
class Admin:
	def __init__(self):
		print 'New Admin logged in'
	def edit_news():
		print 'edit news'
	def push_to_database(collection=None,contentType=None):
		print 'push a news to the database'
	def push_to_web():
		print 'publish a news to website'
	def add_user():
		print 'Add a new user'
	def review_news():
		print 'reviewing news'
	def delete_news():
		print 'deleting a news'
	def delete_user():
		print 'deleting user'
class Moderator:
	def __init__(self):
		print 'new moderator logon'
	def push_to_database(collection=None,contentType=None):
		print 'push a news to the database'
	def push_to_web():
		print 'publish a news to website'
	def review_news():
		print 'reviewing news'
	def delete_news():
		print 'deleting a news'
	def edit_news():
		print 'edit news'
	def write_news():
		print 'writing a new news'
class Client:
	def __init__(self):
		print 'new client login'
	def show_news(step=0):
		print 'showing paginated news with page {}'.format(step)
	def push_to_database(collection=None,contentType=None):
		print 'push a news to be verified'
	def write_news():
		print 'writing a new news'
class Editor:
	def __init__(slef):
		print 'new editor logon'
	def show_news(step=0):
		print 'showing paginated news with page {}'.format(step)
	def push_to_database(collection=None,contentType=None):
		print 'push a news to be verified'
	def write_news():
		print 'writing a new news'
	def push_to_web():
		print 'publish a news to website'
	def review_news():
		print 'reviewing news'

class NewUser:
	def __init__(self):
		self.data={
			'name':'Anonumous User',
			'mode':-1
		}
		print 'an anonymous visitor'
	def show_news(step=0):
		print 'showing paginated news with page {}'.format(step)
	def sign_up():
		print 'creating a new account'
	

def decode_key(ar):
	first_garbage=ar[0]==49
	read_from=len(ar)/2+ar[1] if first_garbage else 2+ar[1]
	#read_from=first_garbage?ar.length/2+ar[1]:2+ar[1]
	s=''
	for i in range(len(ar)/2-ar[1]):
		s+=chr(ar[read_from+i])
	next=read_from-ar[1]
	while next < read_from :
		s+=chr(ar[next])
		next+=1
	return s

@app.route('/')
def main_page():
	usr=NewUser()
	return jsonify(usr.data)


@app.route('/users/<username>',methods=['POST'])
def user_info(username):
	if request.method=='POST':
		if(username=='anonym'):
			return jsonify(NewUser().data)
		global mongo
		data=dict(js.loads(request.data))
		print type(data)
		pprint(data)
		print decode_key(data[u'key'])
		usr=mongo.db.users.find_one({'userID':username})
		meta=mongo.db.users_meta.find_one({'userID':username})
		usr_d=dumps(usr)
		#print 'Type of usr is: {} and type of usr_d is: {}'.format(type(usr),type(usr_d))
		#pprint(usr)
		#print usr_d
		return jsonify(js.loads(usr_d))

