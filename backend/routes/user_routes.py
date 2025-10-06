from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import User

user_bp = Blueprint('user', __name__, url_prefix='/user')

@user_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()

    if not user:
        return jsonify({"error": "Utilisateur non trouvé"}), 404

    profile = user.profile.__dict__ if user.profile else {}
    roles = [r.name for r in user.roles]

    return jsonify({
        "user": user.to_dict(),
        "profile": {k: v for k, v in profile.items() if not k.startswith('_')},
        "roles": roles
    })
