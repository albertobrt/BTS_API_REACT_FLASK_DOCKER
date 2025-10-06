from models.role import Role
from extensions import db

def init_roles():
    roles = [
        {'name': 'user', 'description': 'Utilisateur standard'},
        {'name': 'admin', 'description': 'Administrateur système'},
        {'name': 'moderator', 'description': 'Modérateur'}
    ]
    for role_data in roles:
        if not Role.query.filter_by(name=role_data['name']).first():
            db.session.add(Role(**role_data))
    db.session.commit()
