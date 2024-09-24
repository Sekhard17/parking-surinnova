from flask import Flask, app, flash, redirect, render_template, request, jsonify, url_for
import os
from supabase import create_client, Client
import supabase

url: str = os.environ.get("https://csbuohbxmfkhpyzhnqil.supabase.co")
key: str = os.environ.get("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzYnVvaGJ4bWZraHB5emhucWlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcxMjMzMTcsImV4cCI6MjA0MjY5OTMxN30.SXW_D28eAvgmUX9fO5-xEJeKKt3tdRi6mZNLqAFNvtE")
supabase: Client = create_client(url, key)

@app.router('/registro', methods=['GET','POST'])
def registro():
    if request.method == 'POST':
        rut = request.form.get('rut')
        nombre = request.form.get('nombre')
        password = request.form.get('password')
        confirmPassword = request.form.get('confirmPassword')
        rol = request.form.get('rol')

        
        error= supabase.auth.sign_up({'rut': rut, 'password': password, 'data': {'nombre': nombre, 'rol': rol}})
        if error:
            flash('Resgistro con Exito')
            return redirect(url_for('login'))
        else:
            flash('Registro fallido')
            return redirect(url_for('registro'))
    return render_template('registro.tsx')
        
