from flask import Flask, render_template, request, redirect, url_for, jsonify

app = Flask(__name__)

# Dummy data for the example
users = [
    {"id": 1, "name": "Alice", "email": "alice@example.com"},
    {"id": 2, "name": "Bob", "email": "bob@example.com"}
]
next_id = 3

@app.route('/')
def index():
    return render_template('index.html', users=users)

@app.route('/add', methods=['POST'])
def add_user():
    global next_id
    name = request.form.get('name')
    email = request.form.get('email')
    if name and email:
        users.append({"id": next_id, "name": name, "email": email})
        next_id += 1
    return redirect(url_for('index'))

@app.route('/delete/<int:user_id>', methods=['POST'])
def delete_user(user_id):
    global users
    users = [user for user in users if user['id'] != user_id]
    return '', 204

@app.route('/edit/<int:user_id>', methods=['GET', 'POST'])
def edit_user(user_id):
    user = next((user for user in users if user['id'] == user_id), None)
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        if name and email:
            user['name'] = name
            user['email'] = email
        return redirect(url_for('index'))
    return render_template('edit_user.html', user=user)

if __name__ == '__main__':
    app.run(debug=True)
