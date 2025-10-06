from flask import Blueprint, request, jsonify
from extensions import db, bcrypt
from flask_jwt_extended import create_access_token
from models import User, Role

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    if not data or not data.get('username') or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Données incomplètes"}), 400

    if User.query.filter_by(username=data['username']).first():
        return jsonify({"error": "Nom d'utilisateur déjà existant"}), 409

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User(username=data['username'], email=data['email'], password=hashed_password)

    default_role = Role.query.filter_by(name='user').first()
    if default_role:
        user.roles.append(default_role)

    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "Utilisateur créé avec succès"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or not data.get('username') or not data.get('password'):
        return jsonify({"error": "Données de connexion invalides"}), 400

    user = User.query.filter_by(username=data['username']).first()

    if user and bcrypt.check_password_hash(user.password, data['password']):
        token = create_access_token(identity=user.username)
        return jsonify(access_token=token), 200

    return jsonify({"error": "Identifiants incorrects"}), 401


@auth_bp.route('/', methods=['GET'])
def index():
    return jsonify({"message": "Bienvenue dans l'API d'authentification"}), 200
