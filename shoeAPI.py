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

cur = conn.cursor()

createCustomerTable = '''CREATE TABLE IF NOT EXISTS customer (id SERIAL PRIMARY KEY, firstname VARCHAR(255) NOT NULL, 
lastname VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL UNIQUE, passwd VARCHAR(255) NOT NULL UNIQUE, streetaddress VARCHAR(255), 
zipcode INTEGER, email VARCHAR(255) NOT NULL UNIQUE);'''

cur.execute(createCustomerTable)


createOrderTable = '''CREATE TABLE IF NOT EXISTS orders (orderid INTEGER NOT NULL UNIQUE, itemname VARCHAR(255) NOT NULL, price DOUBLE PRECISION, 
quantity INTEGER, customer_id INTEGER, FOREIGN KEY(customer_id) REFERENCES customer(id));'''

cur.execute(createOrderTable)