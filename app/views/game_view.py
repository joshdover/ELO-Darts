import json

import flask
from flask.ext.login import login_required

from app import app, db
from app.views.handlers.game_handler import add_game, delete_game


@app.route('/games/add', methods=['POST'])
@login_required
def add_game_post():
    session = db.session

    data = flask.request.json

    game = add_game(session, data['winner_id'], data['loser_id'], flask.g.user.id)

    session.commit()
    return flask.Response(json.dumps({
        'id': game.id,
        'success': True
    }), mimetype=u'application/json')


@app.route('/game/delete/<game_id>', methods=['DELETE'])
@login_required
def delete_game_post(game_id):
    session = db.session

    delete_game(session, game_id)

    session.commit()
    return flask.Response(json.dumps({
        'success': True
    }), mimetype=u'application/json')
