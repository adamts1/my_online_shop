from flask_login import current_user
from flask import Blueprint, render_template, request, redirect, url_for
from architecture.form_validation.main_validation import RegistrationForm
from . import db, create_app
import json
from .models import Order, Product, User

main = Blueprint('main', __name__)
db.create_all(app=create_app())


@main.route("/")
def index():
    if current_user.is_authenticated:
        return render_template("index.html", name=current_user.username)
    else:
        return render_template("index.html")


@main.route("/tale")
def tale():
    if current_user.is_authenticated:
        return render_template("tale-grid.html", name=current_user.username)
    else:
        return render_template("tale-grid.html")


@main.route("/contact")
def contact():
    if current_user.is_authenticated:
        return render_template("contact.html", name=current_user.username)
    else:
        return render_template("contact.html")


@main.route("/checkout")
def checkout():
    if current_user.is_authenticated:
        form = RegistrationForm(request.form)
        return render_template('checkout.html', form=form, name=current_user.username)
    return redirect(url_for('auth.signup', from_checkout=True))


@main.route("/create", methods=['POST'])
def payment():
    form = RegistrationForm(request.form)
    if request.method == 'POST' and form.validate():
        s_comment = request.form.get('s_comment')
        cart_object = json.loads(request.form.get('cart_object'))
        new_order = Order(first_name=form.first_name.data, user_id=current_user.id, sure_name=form.sure_name.data, phone=form.phone.data, address= form.address.data, city=form.city.data,
                          s_first_name=form.s_first_name.data, s_sure_name=form.s_sure_name.data, s_address=form.s_address.data, s_phone=form.s_phone.data, s_city=form.s_city.data,
                          s_method=form.s_method.data, s_day=form.s_day.data, s_hour=form.s_hour.data, t_day=form.t_day.data, t_hour=form.t_hour.data,s_comment=s_comment, p_method =form.p_method.data)
        db.session.add(new_order)
        db.session.commit()
        for key, val in cart_object['item_names'].items():
            new_product = Product(product_id=key, order_id=new_order.id, product_name=val, amount=cart_object['cart_quantities'][key])
            db.session.add(new_product)
            db.session.commit()
        return render_template("payment.html")
    return render_template("checkout.html", form=form)

@main.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r

