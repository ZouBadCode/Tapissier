from flask import Flask, render_template
from flask_socketio import SocketIO, emit

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

if __name__ == '__main__':
    socketio.run(app, debug=True)
