from sqlalchemy import ForeignKey, Integer
from flask_login import UserMixin


from . import db


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True) # primary keys are required by SQLAlchemy
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    username = db.Column(db.String(1000))


class Order(db.Model):
    __tablename__ = 'order'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100))
    sure_name = db.Column(db.String(100))
    phone = db.Column(db.String(100))
    address = db.Column(db.String(100))
    city = db.Column(db.String(100))
    s_first_name = db.Column(db.String(100))
    s_sure_name = db.Column(db.String(100))
    s_address = db.Column(db.String(1000))
    s_phone = db.Column(db.String(1000))
    s_city = db.Column(db.String(1000))
    s_method = db.Column(db.String(1000))
    s_day = db.Column(db.Date())
    s_hour = db.Column(db.String(1000))
    t_day = db.Column(db.Date())
    t_hour = db.Column(db.String(1000))
    s_comment = db.Column(db.String(1000))
    p_method = db.Column(db.String(1000))


class Product(db.Model):
    __tablename__ = 'product'
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.String(100))
    order_id = db.Column(Integer, ForeignKey('order.id')) # ForeignKey from Order
    product_name = db.Column(db.String(1000))
    amount = db.Column(Integer)