from flask import Flask, redirect, url_for, session, Blueprint, request, render_template
from flask_login import login_required, current_user, login_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
from architecture.form_validation.main_validation import signupForm, RegistrationForm

from . import oauth, db
from .models import User


# App config
o_auth = Blueprint('oauth', __name__)


# @o_auth.route('/aaa')
# # @login_required
# def hello_world():
#     email = dict(session)['profile']['email']
#     return f'Hello, you are logge in as {email}!'
#     # return 'Hello world'


@o_auth.route('/login')
def login():
    from_checkout = request.args.get('from_checkout')
    print(from_checkout)
    google = oauth.create_client('google')  # create the google oauth client
    redirect_uri = url_for('oauth.authorize', _external=True)
    return google.authorize_redirect(redirect_uri)


@o_auth.route('/authorize')
def authorize():
    google = oauth.create_client('google')  # create the google oauth client
    token = google.authorize_access_token()  # Access token from google (needed to get user info)
    resp = google.get('userinfo', token=token)  # userinfo contains stuff u specificed in the scrope
    user_info = resp.json()
    # user = oauth.google.userinfo()  # uses openid endpoint to fetch user info
    # # Here you use the profile/user data that you got and query your database find/register the user
    # # and set ur own data in the session not the profile from google
    session['profile'] = user_info

    user = User.query.filter_by(email=user_info['email']).first()
    if user:
        login_user(user, remember="true")
    else:
        email = user_info['email']
        username = user_info['name']
        password = user_info['id']
        new_user = User(email=email, username=username, password=generate_password_hash(password, method='sha256'))
        db.session.add(new_user)
        db.session.commit()
        login_user(new_user, remember="true")
    return redirect(url_for('main.index'))


@o_auth.route('/logout_auth')
def logout1():
    for key in list(session.keys()):
        session.pop(key)
    return redirect('/')