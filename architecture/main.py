from flask import Blueprint, render_template, request
from architecture.form_validation.main_validation import RegistrationForm
from . import db, create_app
import json
from .models import Order, Product

main = Blueprint('main', __name__)
db.create_all(app=create_app())


@main.route("/")
def index():
    return render_template("index.html")


@main.route("/tale")
def tale():
    return render_template("tale-grid.html")


@main.route("/contact")
def contact():
    return render_template("contact.html")


@main.route("/checkout")
def checkout():
    form = RegistrationForm(request.form)
    return render_template('checkout.html', form=form)


@main.route("/create", methods=['POST'])
def payment():
    form = RegistrationForm(request.form)
    if request.method == 'POST' and form.validate():
        s_comment = request.form.get('s_comment')
        cart_object = json.loads(request.form.get('cart_object'))

        new_order = Order(first_name=form.first_name.data, sure_name=form.sure_name.data, phone=form.phone.data, address= form.address.data, city=form.city.data,
                          s_first_name=form.s_first_name.data, s_sure_name=form.s_sure_name.data, s_address=form.s_address.data, s_phone=form.s_phone.data, s_city=form.s_city.data,
                          s_method=form.s_method.data, s_day=form.s_day.data, s_hour=form.s_hour.data, t_day=form.t_day.data, t_hour=form.t_hour.data,s_comment=s_comment, p_method =form.p_method.data)
        db.session.add(new_order)
        db.session.commit()
        for key, val in cart_object['item_names'].items():
            new_product = Product(product_id=key, order_id=new_order.id, product_name=val, amount=cart_object['cart_quantities'][key]  )
            db.session.add(new_product)
            db.session.commit()





        return render_template("payment.html")
    return render_template("checkout.html", form=form)

