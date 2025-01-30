from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit, join_room, leave_room
from flask_cors import CORS  # Importar CORS
from palabras import palabras
import random
import time

app = Flask(__name__)
CORS(app)  # Permitir CORS para todas las rutas
socketio = SocketIO(app, cors_allowed_origins="http://localhost:4200")  # Especificar el origen de tu frontend

# Diccionario para manejar las partidas
partidas = {}


# Función para crear un código de partida único
def generar_codigo():
    return str(random.randint(100000, 999999))

# Función para generar opciones de palabras
def obtener_palabras():
    return palabras

# Ruta para crear una partida
@app.route('/crear_partida', methods=['POST'])
def crear_partida():
    datos = request.json
    nombre_anfitrion = datos['nombre_anfitrion']

    # Generar código de partida único
    codigo_partida = generar_codigo()

    # Guardar la partida en memoria
    partidas[codigo_partida] = {
        'nombre_anfitrion': nombre_anfitrion,
        'jugadores': [],
        'tiempo_por_ronda': 0,
        'ronda_actual': 0,
        "rondas": 0,
        'estado': 'esperando',  # puede ser 'esperando', 'jugando', 'finalizado'
        'palabra': "",
        'dibujo': "",
        'adivinanza': "",
        'mensajes': [],
        'turno': None,  # El jugador que está dibujando
        'codigo_partida': codigo_partida,
    }
    #print(partidas[codigo_partida])

    return jsonify({'partida': partidas[codigo_partida]}), 200

@app.route('/palabras', methods=['GET'])
def get_opciones_palabras_route():
    opciones_palabras = random.sample(palabras, 3)
    return jsonify({'opciones': opciones_palabras}), 200



# Ruta para iniciar la partida
@app.route('/iniciar_partida', methods=['POST'])
def iniciar_partida():
    datos = request.json
    codigo_partida = datos['codigo_partida']

    if codigo_partida not in partidas:
        return jsonify({'error': 'Código de partida inválido'}), 400

    partida = partidas[codigo_partida]
    if len(partida['jugadores']) < 2:
        return jsonify({'error': 'Se necesitan al menos dos jugadores para comenzar'}), 400

    partida['estado'] = 'jugando'
    partida['ronda_actual'] = 1
    partida['turno'] = partida['jugadores'][0]  # El primer jugador es el que dibuja

    return jsonify({'mensaje': 'Partida iniciada'}), 200

# Evento de conexión (para manejar cuando un jugador se conecta)
@socketio.on('connect')
def handle_connect():
    print('Un jugador se ha conectado')

# Evento de desconexión (para manejar cuando un jugador se desconecta)
@socketio.on('disconnect')
def handle_disconnect():
    print('Un jugador se ha desconectado')

# Evento para unirse a una partida y unirse a la sala del juego
@socketio.on('unirse_partida_socket')
def unirse_partida_socket(codigo_partida, nombre_jugador, avatar_jugador):
    if codigo_partida not in partidas:
        emit('error', {'mensaje': 'Código de partida inválido'})
        return

    partida = partidas[codigo_partida]
    if len(partida['jugadores']) >= 9:
        emit('error', {'mensaje': 'La partida está llena'})
        return
    
    # Añadir jugadores y su avatar
    partida['jugadores'].append({'nombre': nombre_jugador, 'avatar': avatar_jugador })
    join_room(codigo_partida)  # Unir al jugador a la sala del juego
    emit('actualizar_jugadores', {'lista': partida['jugadores']}, room=codigo_partida)



#------------------------------------------------alv--------------------------------------------
# Ruta para obtener palabras y permitir selección
@app.route('/seleccionar_palabra', methods=['POST'])
def seleccionar_palabra():
    datos = request.json
    codigo_partida = datos['codigo_partida']
    palabra_seleccionada = datos['palabra']

    if codigo_partida not in partidas:
        return jsonify({'error': 'Código de partida inválido'}), 400

    partida = partidas[codigo_partida]
    partida['palabra'] = palabra_seleccionada  # Guardar la palabra seleccionada

    return jsonify({'mensaje': 'Palabra seleccionada correctamente'}), 200
    
# Evento para iniciar una ronda
@socketio.on('iniciar_ronda')
def iniciar_ronda(data):
    codigo_partida = data.get('codigo_partida')
    tiempo_por_ronda = data.get('tiempo_por_ronda')
    rondas = data.get('rondas')

    if codigo_partida not in partidas:
        emit('error', {'mensaje': 'Código de partida inválido'})
        return

    partida = partidas[codigo_partida]
    if partida['estado'] != 'jugando':
        emit('error', {'mensaje': 'La partida no está en estado de juego'})
        return

    # Configurar el tiempo por ronda y el número de rondas
    partida['tiempo_por_ronda'] = tiempo_por_ronda
    partida['rondas'] = rondas

    # Elegir una palabra para el dibujante
    palabra = partida['palabra']
    partida['dibujo'] = ""  # Limpiar dibujo
    partida['adivinanza'] = ""
    dibujante = partida['nombre_anfitrion']
    
    # Enviar la palabra al jugador que debe dibujar
    emit('tu_turno', {'palabra': palabra, 'dibujante': dibujante}, room=codigo_partida)

# Evento para manejar los dibujos en tiempo real
@socketio.on('actualizar_dibujo')
def actualizar_dibujo(data):
    codigo_partida = data["codigo_partida"]
    dibujo = data["dibujo"]
    jugador = data["nombre_jugador"]

    if codigo_partida not in partidas:
        return

    partida = partidas[codigo_partida]
    if partida['nombre_anfitrion'] != jugador:
        return
    
    partida['dibujo'] = dibujo
    emit('actualizar_dibujo', {'dibujo': dibujo}, room=codigo_partida)

#-------------------CHAT--------------------
# Evento para manejar los intentos de adivinanza
@socketio.on('adivinar')
def adivinar(codigo_partida,nombre, intento ):
    if codigo_partida not in partidas:
        return
    
    
    print('Corriendo funcion adivinar', codigo_partida)

    partida = partidas[codigo_partida] # Obtenemos los datos de la partida
    #comprobar si el intento (palabra ingresada) es igual a la palabra a adivinar (partida['palabra']) 
    if intento.lower() == partida['palabra'].lower():  
        #emit('acertado', {'mensaje': f'{request.sid} ha adivinado la palabra'}, room=codigo_partida)
        emit('mensaje_chat', {'nombre_jugador': nombre, 'mensaje': 'ha adivinado la palabra' } , room=codigo_partida)
        partida['adivinanza'] = intento
        return 
    
    print('Palabra a adivinar', partida['palabra'])

    agregarMensaje(nombre, intento, partida);
    emit('mensaje_chat', {'nombre_jugador': nombre, 'mensaje': intento } , room=codigo_partida)


        # Aquí puedes agregar la lógica de finalizar la ronda si la palabra es adivinada

# Evento que devuelve todo el chat
@socketio.on('obtener_todo_chat')
def obtener_todo_chat(codigo_partida):

    if codigo_partida not in partidas:
        return

    partida = partidas[codigo_partida]
    emit('todo_chat', list(partida['mensajes']) ,room= codigo_partida)


# Función para agregar mensajes
def agregarMensaje(nombre_jugador, mensaje, partida):
    # Al agregar un mensaje
    partida['mensajes'].append({'nombre_jugador': nombre_jugador, 'mensaje': mensaje})

# ------------------------------------------------


# Empezar el servidor
if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0', port=5000)