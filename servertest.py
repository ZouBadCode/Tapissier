from flask import Flask, render_template , jsonify, request
from flask_socketio import SocketIO, emit
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)



@app.route('/insert')
def insert_page():
    return render_template('test_insert.html')
@app.route('/')
def index():
    return render_template('workspace.html')

@socketio.on('update content')
def handle_content(data):
    global html_content
    html_content = data
    emit('update content', data, broadcast=True)

@socketio.on('update position')
def handle_position(data):
    global div_position
    div_position = data
    emit('update position', data, broadcast=True)


def read_counters():
    with open('data.json', 'r') as file:
        data = json.load(file)
    return data.get('counters', {})

def update_counters(counters):
    with open('data.json', 'w') as file:
        json.dump({'counters': counters}, file)

@app.route('/get-id', methods=['GET'])
def get_id():
    value = request.args.get('value')
    counters = read_counters()
    counter = counters.get(value, 0) + 1
    counters[value] = counter
    update_counters(counters)
    return jsonify({'id': f'{counter}'})
if __name__ == '__main__':
    socketio.run(app, host="localhost", debug=True)
