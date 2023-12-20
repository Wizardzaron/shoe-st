import psycopg2
import os
from flask import Flask, render_template, request, redirect, url_for, session, abort, current_app,jsonify
from datetime import timedelta
import datetime
from flask import send_from_directory
from functools import wraps
from email_validator import validate_email, EmailNotValidError
import sys
import jwt

app = Flask(__name__)


DB_HOST = 'ec2-3-232-218-211.compute-1.amazonaws.com'
DB_PORT = '5432'
DB_NAME = 'd97oqnm7kdaeu4'
DB_USER = 'odufpptwrqlxck'
DB_PASS = '517454a1717232ca8718e7dc6ce3d0439d6380d169c2571a2ded23b853c89035'

conn = psycopg2.connect(
    host=DB_HOST,
    port=DB_PORT,
    dbname=DB_NAME,
    user=DB_USER,
    password=DB_PASS
)



@app.route('/signup', methods =['POST'])
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

    
    # cursor object
    cur = conn.cursor()
    
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

    except Exception as err:
        
        #return render_template('welcome.html', msg = str(err))

        msg = 'Query Failed: %s\nError: %s' % (insertNewUser, str(err))
        return jsonify ( msg)
        #print('Query Failed: %s\nError: %s' % (insertNewUser, str(err)))
        
    finally:
        cur.close()

    return jsonify('User created successfully')