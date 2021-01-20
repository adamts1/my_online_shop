from flask import Blueprint, render_template, redirect, url_for, request, flash
from architecture.form_validation.main_validation import signupForm
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from .models import User

auth = Blueprint('auth', __name__)

@auth.route('/signup')
def signup():
    form = signupForm(request.form)
    return render_template('signup.html', form=form)


@auth.route('/signup', methods=['POST'])
def signup_post():
    form = signupForm(request.form)
    if request.method == 'POST' and form.validate():
        email = request.form.get('email_signup')
        username = request.form.get('username_signup')
        password = request.form.get('password_signup')
        user = User.query.filter_by(email=email).first()
        if user:  # if a user is found, we want to redirect back to signup page so user can try again
            flash('Email address already exists')
            return redirect(url_for('auth.signup'))
        # code to validate and add user to database goes here
        new_user = User(email=email, username=username, password=generate_password_hash(password, method='sha256'))
        db.session.add(new_user)
        db.session.commit()
        return render_template("index.html")
    return render_template('signup.html', form=form)

@auth.route('/logged-in', methods=['POST'])
def logged_in():
    return render_template('contact.html')


