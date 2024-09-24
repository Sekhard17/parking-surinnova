from flask import Flask
from flask_cors import CORS  # Importa CORS
from registro import registro

app = Flask(__name__)
CORS(app)  # Habilita CORS para toda la aplicación

app.register_blueprint(registro)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
