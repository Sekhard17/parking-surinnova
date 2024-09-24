from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client

app = Flask(__name__)
CORS(app)

url = "https://sobtccfqqbopvqhnjsaz.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvYnRjY2ZxcWJvcHZxaG5qc2F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcyMTgyMDcsImV4cCI6MjA0Mjc5NDIwN30.PnA6j9I0_K38vkdB2_wqp8EO0atrs9eCnpNMdjKpiC4"
supabase: Client = create_client(url, key)

@app.route('/registro', methods=['POST', 'OPTIONS'])
def registro():
    if request.method == 'OPTIONS':
        return jsonify({"message": "OK"}), 200

    try:
        data = request.json
        print("Datos recibidos:", data)

        rut = data.get('rut')
        nombre = data.get('nombre')
        password = data.get('password')
        confirmPassword = data.get('confirmPassword')
        rol = data.get('rol')

        # Validación de campos
        if not all([rut, nombre, password, confirmPassword, rol]):
            return jsonify({"error": "Todos los campos son obligatorios."}), 400

        if password != confirmPassword:
            return jsonify({"error": "Las contraseñas no coinciden."}), 400

        # Insertar usuario en la tabla 'usuarios'
        insert_data = {
            'rut': rut,
            'nombre': nombre,
            'contrasena': password,
            'rol': rol,
            # Omite 'fecha_registro'; la base de datos lo manejará
        }
        print("Datos a insertar:", insert_data)

        response = supabase.table('usuarios').insert(insert_data).execute()
        print("Respuesta de Supabase:", response)

        # Manejar respuesta de Supabase
        if response.status_code == 201:
            return jsonify({"message": "Registro con éxito"}), 200
        else:
            return jsonify({"error": response.data.get('message', 'Error desconocido.')}), 400

    except Exception as e:
        print(f"Se produjo un error: {str(e)}")
        return jsonify({"error": "Se produjo un error en el servidor."}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
