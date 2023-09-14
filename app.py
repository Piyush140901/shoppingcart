# from flask import Flask, render_template, redirect, url_for, session
from email import message
# import os
import sys
from importlib import reload
import sqlite3
from unicodedata import name
from flask import Flask,render_template,flash, redirect,url_for,session,logging,request,jsonify
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
# import pandas
# import matplotlib.pyplot as plt
import json

reload(sys)
app = Flask(__name__)
# app.secret_key = 'some_secret'
# data = []




app.config['UPLOADED_PHOTOS_DEST'] = 'images'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///trendy.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'mysecret'



# configure_uploads(app, photos)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# manager = Manager(app)
# manager.add_command('db', MigrateCommand)
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


@app.route("/")
def index1():
    return render_template("index1.html")

# @app.route("/harry")
# def harry():
#     return render_template("harry.html")

@app.route("/login",methods=["GET", "POST"])
def login():
    if request.method == "POST":
        uname = request.form["uname"]
        passw = request.form["passw"]
        
        login = user.query.filter_by(username=uname, password=passw).first()
        if login is not None:
            return redirect(url_for("index"))
    return render_template("login.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        uname = request.form['uname']
        mail = request.form['mail']
        passw = request.form['passw']

        register = user(username = uname, email = mail, password = passw)
        db.session.add(register)
        db.session.commit()

        server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
        server.login ("kolih453@gmail.com","Hpk@040902")
        for i in range(1):
            print("Succesfully")
            server.sendmail("kolih453@gmail.com",mail,"you are being registered")
        server.quit()

        return redirect(url_for("login"))
    return render_template("register.html")

@app.route("/query", methods=["GET", "POST"])
def query():
    if request.method == "POST":
       
        mail = request.form['mail']
        passw = request.form['passw']
        mess= request.form['mess']

        

        server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
        server.login (mail,passw)
        for i in range(1):
            print("Succesfully")
            server.sendmail(mail,"kolih453@gmail.com",mess)
        server.quit()

        return redirect(url_for("index"))
    return render_template("query.html")


@app.route('/index')
def index():
    products = Product.query.all()
    
    return render_template('index.html', products=products )




# @app.route("/fetchrecords",methods=["POST","GET"])
# def fetchrecords():
#     con = sqlite3.connect("trendy.db")
#     cur = con.cursor()
    
#     if request.method == 'POST':
#         query = request.form['action']
#         minimum_price = request.form['minimum_price']
#         maximum_price = request.form['maximum_price']
#         #print(query)
#         if query == '':
#             cur.execute("SELECT * FROM product ORDER BY id ASC")
#             productlist = cur.fetchall()
#             print('all list')
#         else:
#             cur.execute("SELECT * FROM product WHERE price BETWEEN (?) AND (?)", t)
#             t=(minimum_price,maximum_price)
#             productlist = cur.fetchall()  
#     return jsonify({'htmlresponse': render_template('response.html', productlist=productlist)})


@app.route("/laptop")
def laptop():
    lapto=Product.query.filter_by(type='laptop').all()
     

    return render_template("laptop.html", products=lapto)

@app.route("/ssd")
def ssd():
    ss=Product.query.filter_by(type='SSD').all()
     

    return render_template("SSD.html", products=ss)

@app.route("/mouse")
def mouse():
    mouse=Product.query.filter_by(type='mouse').all()
     

    return render_template("mouse.html", products=mouse)

@app.route("/keyboard")
def keyboard():
    keyboard=Product.query.filter_by(type='keyboard').all()
     

    return render_template("mouse.html", products=keyboard)

@app.route("/ram")
def ram():
    ram=Product.query.filter_by(type='RAM').all()
     

    return render_template("mouse.html", products=ram)


@app.route('/product/<id>')
def product(id):
    product = Product.query.filter_by(id=id).first()

    form = AddToCart()

    return render_template('view-product.html', product=product, form=form)


@app.route('/quick-add/<id>')
def quick_add(id):
    if 'cart' not in session:
        session['cart'] = []

    session['cart'].append({'id': id, 'quantity': 1})
    session.modified = True

    return redirect(url_for('index'))


@app.route('/add-to-cart', methods=['POST'])
def add_to_cart():
    if 'cart' not in session:
        session['cart'] = []

    form = AddToCart()

    if form.validate_on_submit():

        session['cart'].append(
            {'id': form.id.data, 'quantity': form.quantity.data})
        session.modified = True

    return redirect(url_for('index'))


@app.route('/cart')
def cart():
    products, grand_total, grand_total_plus_shipping, quantity_total = handle_cart()
    # lnprice=np.log(cost)
    # plt.plot(lnprice)
    return render_template('cart.html',products=products, grand_total=grand_total, grand_total_plus_shipping=grand_total_plus_shipping, quantity_total=quantity_total)

@app.route('/graph')
def graph():
    products = handle_cart()

    label=[]
    price=[]
    quantity=[]
    labels=list(products)
    # print(len(labels[0]))
    # for i in products:
    #     labels.append(i)
    for i in range(0,len(labels[0])):
        label.append(labels[0][i]['name'])
        price.append(labels[0][i]['price'])
        quantity.append(labels[0][i]['quantity'])
    # print(labels[0][1]['name'])  
    print(quantity)
    # for j in cost:
    #     price.append(j)
    
    
    # labels=[row[0] for row in data]
    # values=[row[1] for row in data]

    return render_template('graph.html',
    labels=json.dumps(label),price=json.dumps(price),quantity=json.dumps(quantity))

@app.route('/remove-from-cart/<index>')
def remove_from_cart(index):
    del session['cart'][int(index)]
    session.modified = True
    return redirect(url_for('cart'))


@app.route('/checkout', methods=['GET', 'POST'])
def checkout():
    form = Checkout()

    products, grand_total, grand_total_plus_shipping, quantity_total = handle_cart()
    # mail=register()

    if form.validate_on_submit():

        order = Order()
        form.populate_obj(order)
        order.reference = ''.join([random.choice('ABCDE') for _ in range(5)])
        order.status = 'PENDING'

        # server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
        # server.login ("kolih453@gmail.com","Hpk@040902")
        
        # print("successful")
        # server.sendmail("kolih453@gmail.com","kolih453@gmail.com","Your order is placed succesfully")
        # server.quit()

        session['cart'] = []
        session.modified = True

        for product in products:
            order_item = Order_Item(
                quantity=product['quantity'], product_id=product['id'])
            order.items.append(order_item)

            product = Product.query.filter_by(id=product['id']).update(
                {'stock': Product.stock - product['quantity']})

        db.session.add(order)
        db.session.commit()

        server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
        server.login("kolih453@gmail.com","Hpk@040902")
        
        print("successful")
        server.sendmail("kolih453@gmail.com","kolih453@gmail.com","Your order is placed succesfully")
        server.quit()

        # session['cart'] = []
        # session.modified = True

        return redirect(url_for('index'))

    return render_template('checkout.html', form=form, grand_total=grand_total, grand_total_plus_shipping=grand_total_plus_shipping, quantity_total=quantity_total)


@app.route('/admin')
def admin():
    products = Product.query.all()
    products_in_stock = Product.query.filter(Product.stock > 0).count()

    orders = Order.query.all()

    return render_template('admin/index.html', admin=True, products=products, products_in_stock=products_in_stock, orders=orders)


@app.route('/admin/add', methods=['GET', 'POST'])
def add():
    form = AddProduct()

    if form.validate_on_submit():
        # image_url = photos.url(photos.save(form.image.data))

        new_product = Product(name=form.name.data, price=form.price.data,
                            stock=form.stock.data, description=form.description.data)
# , image=image_url
        db.session.add(new_product)
        db.session.commit()

        return redirect(url_for('admin'))

    return render_template('admin/add-product.html', admin=True, form=form)


@app.route('/admin/order/<order_id>')
def order(order_id):
    order = Order.query.filter_by(id=int(order_id)).first()

    return render_template('admin/view-order.html', order=order, admin=True)















# def write_to_file(filename, data):
#     with open(filename, "a+") as file:
#         file.writelines(data)



# def riddle():
#     riddles = []
#     with open("data/-riddles.txt", "r") as e:
#         lines = e.read().splitlines()
#     for line in lines:
#         riddles.append(line)
#     return riddles



# def riddle_answers():
#     answers = []
#     with open("data/-answers.txt", "r") as e:
#         lines = e.read().splitlines()
#     for line in lines:
#         answers.append(line)
#     return answers



# def clear_guesses(usernam):
#     with open("data/user-" + usernam + "-guesses.txt", "w"):
#         return

# def clear_score(usernam):
#     with open("data/user-" + usernam + "-score.txt", "w"):
#         return


# def store_all_attempts(usernam):
#     attempts = []
#     with open("data/user-" + usernam + "-guesses.txt", "r") as incorrect_attempts:
#         attempts = incorrect_attempts.readlines()
#     return attempts

# def num_of_attempts():
#     attempts = store_all_attempts(usernam)
#     return len(attempts)

# def attempts_remaining():
#     remaining_attempts = 3 - num_of_attempts()
#     return remaining_attempts


# def add_to_score():
#     round_score = 4 - num_of_attempts()
#     return round_score

# def end_score(usernam):
#     with open("data/user-" + usernam + "-score.txt", "r") as numbers_file:
#         total = 0
#         for line in numbers_file:
#             try:
#                 total += int(line)
#             except ValueError:
#                 pass
#     return total

# def final_score(usernam):
#     score = str(end_score(usernam))

#     if usernam != "" and score != "":
#         with open("data/-highscores.txt", "a") as file:
#                 file.writelines(usernam + "\n")
#                 file.writelines(score + "\n")
#     else:
#         return

# def get_scores():
#     usernames = []
#     scores = []

#     with open("data/-highscores.txt", "r") as file:
#         lines = file.read().splitlines()
#     for i, text in enumerate(lines):
#         if i%2 ==0:
#             usernames.append(text)
#         else:
#             scores.append(text)
#     usernames_and_scores = sorted(zip(usernames, scores), key=lambda x: x[1], reverse=True)
#     return usernames_and_scores




# @app.route('/index2', methods=["GET", "POST"])
# def index2():
#     if request.method == "POST":
#         global usernam
#         usernam = request.form['username'].lower()
#         if usernam == "":
#             return render_template("index.html", page_title="Home", username=usernam)
#         else:
#             return redirect(url_for('user', username=usernam))
#     return render_template("index2.html", page_title="Home")



# @app.route('/<usernam>', methods=["GET", "POST"])
# def user(usernam):

#     open("data/user-" + usernam + "-score.txt", 'a').close()
#     clear_score(usernam)
#     open("data/user-" + usernam + "-guesses.txt", 'a').close()
#     clear_guesses(usernam)

#     if request.method =="POST":
#         return redirect(url_for('game', username=usernam))

#     return render_template("welcome.html",
#                             username=usernam)


# @app.route('/<usernam>/game', methods=["GET", "POST"])
# def game(usernam):

#     remaining_attempts = 3
#     riddles = riddle()
#     riddle_index = 0
#     answers = riddle_answers()
#     score = 0

#     if request.method == "POST":

#         riddle_index = int(request.form["riddle_index"])
#         user_response = request.form["answer"].title()

#         write_to_file("data/user-" + usernam + "-guesses.txt", user_response + "\n")

#         if answers[riddle_index] == user_response:
#             if riddle_index < 9:
#                 write_to_file("data/user-" + usernam + "-score.txt", str(add_to_score()) + "\n")
#                 clear_guesses(usernam)
#                 riddle_index += 1
#             else:
#                 write_to_file("data/user-" + usernam + "-score.txt", str(add_to_score()) + "\n")
#                 final_score(usernam)
#                 return redirect(url_for('congrats', username=usernam, score=end_score(usernam)))

#         else:
#             if attempts_remaining() > 0:
#                 riddle_index = riddle_index
#             else:
#                 return redirect(url_for('gameover', username=usernam))

#     return render_template("game.html",
#                             username=usernam, riddle_index=riddle_index, riddles=riddles,
#                             answers=answers, attempts=store_all_attempts(usernam), remaining_attempts=attempts_remaining(), score=end_score(usernam))


# @app.route('/<usernam>/gameover', methods=["GET", "POST"])
# def gameover(username):

#     clear_guesses(usernam)
#     clear_score(usernam)

#     rem_attempts = 3
#     riddles = riddle()
#     riddle_index = 0
#     answers = riddle_answers()
#     score = 0

#     if request.method =="POST":

#         return redirect(url_for('game', username=usernam))

#     return render_template("gameover.html",
#                             username=usernam)


# @app.route('/<usernam>/congratulations', methods=["GET", "POST"])
# def congrats(usernam):

#     clear_guesses(usernam)

#     if request.method =="POST":
#         usernames_and_scores = get_scores()
#         return redirect(url_for('highscores', usernames_and_scores=usernames_and_scores))

#     return render_template("congratulations.html",
#                             username=usernam, score=end_score(usernam))


# @app.route('/about')
# def about():
#     return render_template("about.html", page_title="About")


# @app.route('/highscores')
# def highscores():

#     usernames_and_scores = get_scores()

#     return render_template("highscores.html", page_title="Highscores", usernames_and_scores=usernames_and_scores)



if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
