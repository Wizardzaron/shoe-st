import psycopg2
import os
from flask import Flask, render_template, request, redirect, url_for, session, abort, current_app,jsonify
from datetime import date, datetime, timedelta
from flask import send_from_directory
from functools import wraps
from email_validator import validate_email, EmailNotValidError
import sys
from flask_cors import CORS

import jwt
import logging

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'Sa_sa'
app.permanent_session_lifetime = timedelta(minutes=10)

# DB_HOST = 'ec2-34-236-56-112.compute-1.amazonaws.com'
# DB_PORT = '5432'
# DB_NAME = 'dc80807q62eqq9'
# DB_USER = 'pnkxipkftigyrv'
# DB_PASS = '8755f1e28e8285bdb7b03f7ea2d3c0dd33022ceceddbcc3cd44a647bb705d8a8'

# conn = psycopg2.connect(
#     host=DB_HOST,
#     port=DB_PORT,
#     dbname=DB_NAME,
#     user=DB_USER,
#     password=DB_PASS
# )

DATABASE_URL = os.environ.get('DATABASE_URL')

# if DATABASE_URL is None:
#     logging.error("DATABASE_URL is not set.")
# else:
#     logging.info("DATABASE_URL:", DATABASE_URL)

conn = psycopg2.connect(DATABASE_URL, sslmode='require')

@app.route('/updateshoe', methods=['PATCH'])
def shoedata_update():
    cur = conn.cursor()
    
    itemid = request.form.get('itemid')
    images = request.form.get('images')

    try:
        updateOldShoe = """UPDATE shoes SET images = %s WHERE item_id = %s"""
        cur.execute(updateOldShoe, [itemid, images])
        conn.commit()

    except Exception as err:
            
        msg = 'Query Failed: %s\nError: %s' % (updateOldShoe, str(err))
        #used to reset connection after bad query transaction
        conn.rollback()
        return jsonify ( msg)
            
    finally:
        cur.close()

    return jsonify('shoe updated successfully')

@app.route('/addshoe', methods=['POST'])
def shoedata_post():
    cur = conn.cursor()

    itemid = request.form.get('itemid')
    category = request.form.get('category')
    brand = request.form.get('brand')
    color = request.form.get('color')
    gender = request.form.get('gender')
    shoesize = request.form.get('shoesize')
    images = request.form.get('images')
    descript = request.form.get('descript')
    price = request.form.get('price')
    names = request.form.get('names')

    try:

        insertNewShoe = """INSERT INTO shoes (names, item_id, category, brand, color, gender, shoesize, price ,images, descript) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
        cur.execute(insertNewShoe, [names, itemid, category, brand, color, gender, shoesize, price ,images, descript])
        conn.commit()

    except Exception as err:
        
        msg = 'Query Failed: %s\nError: %s' % (insertNewShoe, str(err))
        #used to reset connection after bad query transaction
        conn.rollback()
        return jsonify ( msg)
        
    finally:
        cur.close()

    return jsonify('shoe created successfully')

@app.route('/shoedata', methods=['GET'])
def shoedata_get():
    cur = conn.cursor()
    rows = []
    try:

        getInfo =  '''SELECT names, item_id, category, brand, color, gender, shoesize, price ,images, descript FROM shoes WHERE shoesize = 7.3'''
        cur.execute(getInfo)
        info = cur.fetchall()

        columns = ('names', 'item_id', 'category', 'brand', 'color', 'gender', 'shoesize','price' ,'images', 'descript')

        # creating dictionary
        for row in info:
            print(f"trying to serve {row}", file=sys.stderr)
            rows.append({columns[i]: row[i] for i, _ in enumerate(columns)})
            print(f"trying to serve {rows[-1]}", file=sys.stderr)

    except Exception as e:
        msg = 'Query Failed: %s\nError: %s' % (getInfo, str(e))
        return jsonify(msg)

    return rows

@app.route('/login', methods=['GET'])
def login():
    cur = conn.cursor()
    
    try:

        username = request.form.get('username')
        passwd = request.form.get('passwd')

        #NOTE in sqlite and postgresql you use %s as placeholders instead of ?

        getCountByUsernameAndPassword = '''SELECT count(*) FROM customer WHERE username = %s AND passwd = %s'''
        cur.execute(getCountByUsernameAndPassword, [username, passwd])
            
            #print("Did execute")
            
        countOfUsernameAndPassword = cur.fetchone()

            #print("Did fetchone")

        if countOfUsernameAndPassword[0] == 0:
            print('setting logged in to False')
            session['loggedin'] = False
            #token = create_token(user_name, session['loggedin'])
            
            #return jsonify(token)
            print('about to return False')
            s = str(session['loggedin'])
            t = '{' + f'"loggedin":"{str(s)}"' + '}'
            print(t)
            return t        



        #session['Authorization'] = token
        # sessions carry data over the website
        session['loggedin'] = True

        session['username'] = username
            
        #token = create_token(user_name, session['loggedin'])
        print("at the end")
        print(f'at the end -- printing jsonify|{session["loggedin"]}|and more to go')
        s = str(session['loggedin'])
        t = '{' + f'"loggedin":"{str(s)}"' + '}'
        print(t)

        return t

    except Exception as e:
        print("An error occurred:", str(e))

@app.route('/userdata', methods=['GET'])
def userdata_get():

    cur = conn.cursor()
    rows = []
    try:
         
        id = request.args.get('id')
        getInfo =  '''SELECT firstname, lastname, username, passwd, email, streetaddress, zipcode FROM customer WHERE id = %s'''

        cur.execute(getInfo,(id, ))
        userInfo = cur.fetchall()

        columns = ('firstname', 'lastname', 'username', 'passwd', 'email', 'streetaddress', 'zipcode')

        # creating dictionary
        for row in userInfo:
            print(f"trying to serve {row}", file=sys.stderr)
            rows.append({columns[i]: row[i] for i, _ in enumerate(columns)})
            print(f"trying to serve {rows[-1]}", file=sys.stderr)

    except Exception as e:
        msg = 'Query Failed: %s\nError: %s' % (getInfo, str(e))
        return jsonify(msg)

    return rows

@app.route('/alluserdata', methods=['GET'])
def all_userdata_get():
    cur = conn.cursor()

    rows = []
    try:
        #getInfo =  '''SELECT * FROM customer'''
        getInfo =  '''SELECT firstname, lastname, username, passwd, email, streetaddress, zipcode, id, mtd, ytd FROM customer'''
        cur.execute(getInfo)
        info = cur.fetchall()

        columns = ('firstname', 'lastname', 'username', 'passwd', 'email', 'streetaddress', 'zipcode', 'id', 'mtd', 'ytd')

        # creating dictionary
        for row in info:
            print(f"trying to serve {row}", file=sys.stderr)
            rows.append({columns[i]: row[i] for i, _ in enumerate(columns)})
            print(f"trying to serve {rows[-1]}", file=sys.stderr)

    except Exception as e:
        msg = 'Query Failed: %s\nError: %s' % (getInfo, str(e))
        return jsonify(msg)

    return rows

@app.route('/ordercreate', methods=['POST'])
def order_post():

    cur = conn.cursor()

    brand = request.form.get('brand')
    itemname = request.form.get('itemname')
    price = request.form.get('price')
    quantity = request.form.get('quantity')
    customer_id = request.form.get('customer_id')
    today = date.today()
    dateoforder = today

    try:

        insertNewUser = """INSERT INTO orders (brand, customer_id, dateoforder, itemname, price, quantity) VALUES (%s,%s,%s,%s,%s,%s)"""
        cur.execute(insertNewUser, [brand, customer_id, dateoforder, itemname, price, quantity])
        conn.commit()

    except Exception as err:
        
        #return render_template('welcome.html', msg = str(err))

        msg = 'Query Failed: %s\nError: %s' % (insertNewUser, str(err))
        conn.rollback()
        return jsonify ( msg)
        #print('Query Failed: %s\nError: %s' % (insertNewUser, str(err)))
        
    finally:
        cur.close()

    return jsonify('order created successfully')

@app.route('/signup', methods=['POST'])
def signup_post():

    cur = conn.cursor()

    data = request.json

    firstname = data.get('firstname')
    lastname = data.get('lastname')
    username = data.get('username')
    email = data.get('email')
    zipcode = data.get('zipcode')
    streetaddress = data.get('streetaddress')
    passwd = data.get('passwd')

	#password must be between 4 and 255
    if len(passwd) < 4 or len(passwd) > 255:
        return jsonify ("password must be between 4 and 255")    
    
    #username must be between 4 and 255 
    if len(username) < 4 or len(username) > 255:
         return jsonify ("Username needs to be between 4 and 255 characters long.")
    
    #check if email is valid

    #another way of doing if else statement

    try:
        # Check that the email address is valid.
        validation = validate_email(email)  
        email = validation.email
    except EmailNotValidError as e:
        # Email is not valid.
        # The exception message is human-readable.
        return jsonify('Email not valid: ' + str(e))

    #username cannot include whitespace
    if any (char.isspace() for char in username):
         return jsonify ('Username cannot have spaces in it.')
    
    #email cannot include whitespace
    if any (char.isspace() for char in email):
         return jsonify('Email cannot have spaces in it.')
    
    # to select all column we will use
    getCountByUsername = '''SELECT COUNT(*) FROM customer WHERE username = %s'''
    cur.execute(getCountByUsername,[username])
    countOfUsername = cur.fetchone()

    if countOfUsername[0] != 0 :
         return jsonify('Username already exists.')
              

    #ready to insert into database
    try:

        insertNewUser = """INSERT INTO customer (email, firstname, lastname, passwd, streetaddress, username, zipcode) VALUES (%s,%s,%s,%s,%s,%s,%s)"""
        cur.execute(insertNewUser, [email, firstname, lastname, passwd, streetaddress, username, zipcode])
        conn.commit()

        msg = jsonify('Query inserted successfully')
        msg.headers['Access-Control-Allow-Methods'] = 'POST'
        msg.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        msg.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'


    except Exception as err:
        msg = 'Query Failed: %s\nError: %s' % (insertNewUser, str(err))
        conn.rollback()
        return jsonify ( msg)        
    finally:
        cur.close()

    return msg

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)