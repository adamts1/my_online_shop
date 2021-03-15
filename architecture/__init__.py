from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from datetime import timedelta
from authlib.integrations.flask_client import OAuth
import os

# init SQLAlchemy so we can use it later in our models
db = SQLAlchemy()



def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'secret-key-goes-here'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = 'False'

    db.init_app(app)
    # session config for google
    app.secret_key = os.getenv("APP_SECRET_KEY")
    app.config['SESSION_COOKIE_NAME'] = 'google-login-session'

    login_manager = LoginManager()
    login_manager.login_view = 'auth.logged_in'
    login_manager.init_app(app)

    # oAuth Setup
    global oauth
    oauth = OAuth(app)
    oauth.register(
        name='google',
        client_id=os.getenv("GOOGLE_CLIENT_ID"),
        client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
        access_token_url='https://accounts.google.com/o/oauth2/token',
        access_token_params=None,
        authorize_url='https://accounts.google.com/o/oauth2/auth',
        authorize_params=None,
        api_base_url='https://www.googleapis.com/oauth2/v1/',
        userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',
        client_kwargs={'scope': 'openid email profile'},
    )


    from .models import User

    @login_manager.user_loader
    def load_user(user_id):
        # since the user_id is just the primary key of our user table, use it in the query for the user
        return User.query.get(int(user_id))

    # blueprint for non-auth parts of app
    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    # import architecture.auth
    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    # import architecture.oAuth
    from .oauth import o_auth as oauth_blueprint
    app.register_blueprint(oauth_blueprint)


    return app