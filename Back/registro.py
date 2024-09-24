from flask import Flask, flash, redirect, render_template, request, jsonify, url_for
import os
from supabase import create_client, Client

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'your_secret_key')

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

@app.route('/registro', methods=['GET', 'POST'])
def registro():
    if request.method == 'POST':
        rut = request.form.get('rut')
        nombre = request.form.get('nombre')
        password = request.form.get('password')
        confirmPassword = request.form.get('confirmPassword')
        rol = request.form.get('rol')

        # Validación de la contraseña
        if password != confirmPassword:
            flash('Las contraseñas no coinciden.')
            return redirect(url_for('registro'))

        response = supabase.auth.sign_up({'rut': rut, 'password': password, 'data': {'nombre': nombre, 'rol': rol}})
        error = response.get('error')
        
        if error:
            flash('Registro fallido: ' + error['message'])
            return redirect(url_for('registro'))
        else:
            flash('Registro con éxito')
            return redirect(url_for('login'))
            
    return render_template('registro.html')