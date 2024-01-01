import psycopg2
from flask import jsonify
from time import strftime
import os
import sys

# DATABASE_URL = os.environ.get('DATABASE_URL')

# if DATABASE_URL is None:
#     print("DATABASE_URL is not set.")
# else:
#     print("DATABASE_URL:", DATABASE_URL)

# conn = psycopg2.connect(DATABASE_URL, sslmode='require')

DB_HOST = 'ec2-34-236-56-112.compute-1.amazonaws.com'
DB_PORT = '5432'
DB_NAME = 'dc80807q62eqq9'
DB_USER = 'pnkxipkftigyrv'
DB_PASS = '8755f1e28e8285bdb7b03f7ea2d3c0dd33022ceceddbcc3cd44a647bb705d8a8'

conn = psycopg2.connect(
    host=DB_HOST,
    port=DB_PORT,
    dbname=DB_NAME,
    user=DB_USER,
    password=DB_PASS
)

cur = conn.cursor()

rows = []
try:
         
    getOrderDetails =  '''SELECT price, customer_id, dateoforder FROM orders  ORDER BY customer_id'''
    cur.execute(getOrderDetails)
    orders = cur.fetchall()

    columns = ('price', 'customer_id', 'dateoforder')

    # creating dictionary/hash table, will have O(1) for searching, and inserting
    for row in orders:
        print(f"trying to serve {row}", file=sys.stderr)
        #enumerate(columns) goes through each tuple of orders and organizes it based on the columns then it appends to rows
        #once that's done it goes to the next tuple and repeates the process until we've went through all of the orders
        rows.append({columns[i]: row[i] for i, _ in enumerate(columns)})
        print(f"trying to serve {rows[-1]}", file=sys.stderr)
    #print ("hello world")
    #print(rows[0]["price"])
    currentYear = strftime("%Y") 

    prevCustomer = rows[0]["customer_id"]

    #print(prevCustomer)
    priceSum = 0

    # fixColum = """ALTER TABLE customer ALTER COLUMN ytd TYPE FLOAT"""
    # cur.execute(fixColum)
    # conn.commit()
    for index, p in enumerate(rows):

        currentOrdersOfYear = p["dateoforder"].strftime("%Y")

        #print("Year: ", currentOrdersOfYear)

        #print(p["price"])
        #print(currentYear)
        if currentOrdersOfYear == currentYear:
            #print("Hello")
            if p["customer_id"] == prevCustomer or prevCustomer is None:
                priceSum += p["price"]
                prevCustomer = p["customer_id"]
                #print(priceSum)
            else:
                yearToDate = """UPDATE customer SET ytd = %s WHERE id = %s"""
                cur.execute(yearToDate, [priceSum, prevCustomer])
                conn.commit()
                print("Insert Successful")
                print("Sum: ", priceSum)
                priceSum = p["price"]
                prevCustomer = p["customer_id"]

        if index == len(rows) - 1:
            #print(priceSum)
            yearToDate = """UPDATE customer SET ytd = %s WHERE id = %s"""
            cur.execute(yearToDate, [priceSum, p["customer_id"]])
            conn.commit()
            print("Insert Successful2")
            print("Sum: ", priceSum)


except Exception as e:
    print('Query Failed: %s\nError: %s' % (getOrderDetails, str(e)))
    

