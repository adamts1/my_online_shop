from flask_login import login_required, current_user, login_user, logout_user
from flask import Blueprint, render_template, redirect, url_for, request, flash ,session
from architecture.form_validation.main_validation import signupForm, RegistrationForm
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from .models import User

auth = Blueprint('auth', __name__)


@auth.route('/connect')
def connect():
    from_checkout = request.args.get('from_checkout')
    form = signupForm(request.form)
    return render_template('signup.html', form=form, from_checkout=from_checkout)


@auth.route('/signup', methods=['POST'])
def signup():
    form = signupForm(request.form)
    if request.method == 'POST' and form.validate():
        email = request.form.get('email_signup')
        username = request.form.get('username_signup')
        password = request.form.get('password_signup')
        user = User.query.filter_by(email=email).first()
        if user:  # if a user is found, we want to redirect back to signup page so user can try again
            error = 'כתובת אימייל קיימת במערכת'
            return render_template('signup.html', signup_error=error, form=form)
        # code to validate and add user to database goes here
        new_user = User(email=email, username=username, password=generate_password_hash(password, method='sha256'))
        db.session.add(new_user)
        db.session.commit()
        login_user(new_user, remember="true")
        # if user went from checkout redirect to checkout, if not redirect to index
        from_checkout = request.form.get('from_checkout')
        if from_checkout == 'True':
            form = RegistrationForm(request.form)
            return render_template('checkout.html', form=form, name=current_user.username)
        return redirect(url_for('main.index'))
    return render_template('signup.html', form=form)


@auth.route('/log_in', methods=['POST'])
def log_in():
    email = request.form.get('email')
    password = request.form.get('password')
    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        flash('נא בדוק את פרטי ההתחברות ונסה שוב')
        return redirect(url_for('auth.connect'))
    login_user(user, remember="true")
    # if user went from checkout redirect to checkout, if not redirect to index
    from_checkout = request.form.get('from_checkout')
    if from_checkout == 'True':
        form = RegistrationForm(request.form)
        return render_template('checkout.html', form=form, name=current_user.username)
    return redirect(url_for('main.index'))


@auth.route('/logout')
# @login_required
def logout():
    logout_user()
    # for key in list(session.keys()):
    #     session.pop(key)
    return redirect(url_for('main.index'))