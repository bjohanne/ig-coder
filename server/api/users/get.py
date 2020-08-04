from models.user import get_user


def get(user_id):
    user = get_user(user_id)
    if user:
        return user, 200
    else:
        return 400
