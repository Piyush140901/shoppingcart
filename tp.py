# import smtplib
# server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
# server.login ("kolih453@gmail.com","Hpk@040902")
# a = int(input("Enter number:"))
# for i in range(a):
#     print("Succesfully")
#     server.sendmail("kolih453@gmail.com","yajagdale124@gmail.com","This is testing purpose")
# server.quit()
import sqlite3
from flask import Flask,render_template,flash, redirect,url_for,session,logging,request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
# from flask_script import Manager
# from flask_uploads import UploadSet, configure_uploads, IMAGES
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, HiddenField, SelectField
from flask_wtf.file import FileField, FileAllowed
import random
import smtplib
import numpy as np
import pandas
import matplotlib.pyplot as plt


app = Flask(__name__)

# photos = UploadSet('photos', IMAGES)

app.config['UPLOADED_PHOTOS_DEST'] = 'images'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///trendy.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'mysecret'



# configure_uploads(app, photos)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

class user(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80))
    email = db.Column(db.String(120))
    password = db.Column(db.String(80))

class Types(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True)
    description = db.Column(db.String(500))
    image = db.Column(db.String(100))
    

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True)
    price = db.Column(db.Integer)  # in cents
    stock = db.Column(db.Integer)
    description = db.Column(db.String(500))
    image = db.Column(db.String(100))
    type= db.Column(db.String(50))

    orders = db.relationship('Order_Item', backref='product', lazy=True)

    def in_stock(self):
        if session:
            item = []
            try:
                item = session['cart']
            except:
                pass
            inde = 0
            if len(item) > 0:
                for ind, it in enumerate(item):
                    if it.get('id') == self.id:
                        inde = ind
                return self.stock - item[inde].get('quantity')
            else:
                return self.stock
        else:
            return self.stock


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    reference = db.Column(db.String(5))
    first_name = db.Column(db.String(20))
    last_name = db.Column(db.String(20))
    phone_number = db.Column(db.Integer)
    email = db.Column(db.String(50))
    address = db.Column(db.String(100))
    city = db.Column(db.String(100))
    state = db.Column(db.String(20))
    country = db.Column(db.String(20))
    status = db.Column(db.String(10))
    payment_type = db.Column(db.String(10))
    items = db.relationship('Order_Item', backref='order', lazy=True)

    def order_total(self):
        return db.session.query(db.func.sum(Order_Item.quantity * Product.price)).join(Product).filter(Order_Item.order_id == self.id).scalar() + 1000

    def quantity_total(self):
        return db.session.query(db.func.sum(Order_Item.quantity)).filter(Order_Item.order_id == self.id).scalar()
    
   

class Order_Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    quantity = db.Column(db.Integer)


class AddProduct(FlaskForm):
    name = StringField('Name')
    price = IntegerField('Price')
    stock = IntegerField('Stock')
    description = TextAreaField('Description')
    image = FileField('Image')


class AddToCart(FlaskForm):
    quantity = IntegerField('Quantity')
    id = HiddenField('ID')


class Checkout(FlaskForm):
    first_name = StringField('First Name')
    last_name = StringField('Last Name')
    phone_number = StringField('Number')
    email = StringField('Email')
    address = StringField('Address')
    city = StringField('City')
    country = SelectField('Country', choices=[
                        ('India', 'India'), ('Pakistan', 'Pakistan'),('America','America')])
    state = SelectField('State', choices=[
                          ('Maharshtra', 'Maharashtra'), ('Gujarat', 'Gujarat'), ('AP', 'AP')])
    payment_type = SelectField('Payment Type', choices=[
                               ('CD', 'cash delivery'), ('UPI', 'UPI')])

    # server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
    # server.login ("kolih453@gmail.com","Hpk@040902")
    # for i in range(1):
    #     print("Succesfully")
    #     server.sendmail("kolih453@gmail.com",email,"This is testing purpose")
    # server.quit()

def handle_cart():
    products = []
    grand_total = 0
    index = 0
    quantity_total = 0
    cost=[]

    for item in session['cart']:
        product = Product.query.filter_by(id=item['id']).first()

        quantity = int(item['quantity'])
        total = quantity * product.price
        grand_total += total

        quantity_total += quantity
        cost.append(total)
        products.append({'id': product.id, 'name': product.name, 'price':  product.price,
                         'image': product.image, 'quantity': quantity, 'total': total, 'index': index})
        index += 1

    grand_total_plus_shipping = grand_total + 1000

    return products, grand_total, grand_total_plus_shipping, quantity_total



# @app.route('/dropdown', methods=['GET'])
# def dropdown():
#     types = ['Laptop', 'SSD', 'mouse', 'keyboard','RAM']
#     return render_template('index.html', types=types)

#  <select name= type method="GET" action="/dropdown">
# 	<option value="{{types[0]}}" selected>{{types[0]}}</option>
#     {% for type in types[1:] %}
#     <option value= "{{type}}" SELECTED>{{type}}</option>"
#     {% endfor %}
# </select> 

# <!-- <head>
# 	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
# 	<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
# 	<link rel="stylesheet" href="http://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
# 	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
# </head> -->
# <!-- {% block script %}https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js{% endscript %}
# {% block script %}http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js{% endscript %}
# {% block script %}https://code.jquery.com/ui/1.12.1/jquery-ui.js{% endscript %}
# {% block link %}http://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css{% endlink %} -->

# <!-- <script src="{% block script %}{% endscript %}"></script>
#         <link rel="stylesheet" href="{% block link %}{% endlink %}"> -->

# @app.route("/laptop")
# def laptop():
#     products=product.query.filter_by(type='laptop').first()
     

#     return render_template("laptop.html", products=products)