import psycopg2
import os
from flask import Flask, render_template, request, redirect, url_for, session, abort, current_app,jsonify
from datetime import date, datetime
from flask import send_from_directory
from functools import wraps
from email_validator import validate_email, EmailNotValidError
import sys
from flask_cors import CORS

import jwt
import logging

app = Flask(__name__)
CORS(app)


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

@app.route('/userdata', methods=['GET'])
def userdata_get():
    cur = conn.cursor()

    rows = []
    try:
         
        getInfo =  '''SELECT firstname, lastname, username, passwd FROM customer'''
        cur.execute(getInfo)
        info = cur.fetchall()

        columns = ('firstname', 'lastname', 'username', 'passwd')

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
        return jsonify ( msg)
        #print('Query Failed: %s\nError: %s' % (insertNewUser, str(err)))
        
    finally:
        cur.close()

    return jsonify('order created successfully')

@app.route('/signup', methods=['POST'])
def signup_post():

    cur = conn.cursor()

    firstname = request.form.get('firstname')
    lastname = request.form.get('lastname')
    username = request.form.get('username')
    email = request.form.get('email')
    zipcode = request.form.get('zipcode')
    streetaddress = request.form.get('streetaddress')
    passwd = request.form.get('passwd')

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

        msg = jsonify('Query Successful')
        msg.headers['Access-Control-Allow-Origin'] = 'http://192.168.56.1:3000'
        msg.headers['Access-Control-Allow-Methods'] = 'POST'
        msg.headers['Access-Control-Allow-Headers'] = 'Content-Type'

    except Exception as err:
        
        #return render_template('welcome.html', msg = str(err))

        msg = 'Query Failed: %s\nError: %s' % (insertNewUser, str(err))
        return jsonify ( msg)
        #print('Query Failed: %s\nError: %s' % (insertNewUser, str(err)))
        
    finally:
        cur.close()

    return jsonify('User created successfully')

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)