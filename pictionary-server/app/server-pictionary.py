from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit, join_room, leave_room
from flask_cors import CORS  # Importar CORS
import random
import time

app = Flask(__name__)
socketio = SocketIO(app)

app = Flask(__name__)
CORS(app)  # Permitir CORS para todas las rutas

socketio = SocketIO(app, cors_allowed_origins="*")  # Especificar el origen de tu frontend


# Diccionario para manejar las partidas
partidas = {}

# Función para crear un código de partida único
def generar_codigo():
    return str(random.randint(100000, 999999))

# Función para generar opciones de palabras
def obtener_palabras():
    return ["casa", "gato", "avión", "pelota", "árbol", "flor", "ratón", "nube"]

# Ruta para crear una partida
@app.route('/crear_partida', methods=['POST'])
def crear_partida():
    datos = request.json
    nombre_anfitrion = datos['nombre_anfitrion']
    tiempo_por_ronda = datos['tiempo_por_ronda']

    # Generar código de partida único
    codigo_partida = generar_codigo()

    # Guardar la partida en memoria
    partidas[codigo_partida] = {
        'nombre_anfitrion': nombre_anfitrion,
        'jugadores': [nombre_anfitrion],
        'tiempo_por_ronda': tiempo_por_ronda,
        'ronda_actual': 0,
        'estado': 'esperando',  # puede ser 'esperando', 'jugando', 'finalizado'
        'palabra': "palabra para adivinar test",
        'dibujo': "",
        'adivinanza': "",
        'mensajes': [],
        'turno': None,  # El jugador que está dibujando
        'codigo_partida': codigo_partida
    }
    #print(partidas[codigo_partida])

    return jsonify({'partida': partidas[codigo_partida]}), 200



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
def unirse_partida_socket(codigo_partida, nombre_jugador):
    if codigo_partida not in partidas:
        emit('error', {'mensaje': 'Código de partida inválido'})
        return

    partida = partidas[codigo_partida]
    if len(partida['jugadores']) >= 9:
        emit('error', {'mensaje': 'La partida está llena'})
        return

    partida['jugadores'].append(nombre_jugador)
    join_room(codigo_partida)  # Unir al jugador a la sala del juego
    emit('actualizar_jugadores', {'lista': f'{partida['jugadores']}'}, room=codigo_partida)
    print(partida['jugadores'])
    
# Evento para iniciar una ronda
@socketio.on('iniciar_ronda')
def iniciar_ronda(codigo_partida):
    if codigo_partida not in partidas:
        emit('error', {'mensaje': 'Código de partida inválido'})
        return

    partida = partidas[codigo_partida]
    if partida['estado'] != 'jugando':
        emit('error', {'mensaje': 'La partida no está en estado de juego'})
        return

    # Elegir una palabra para el dibujante
    palabra = random.choice(obtener_palabras())
    partida['palabra'] = palabra
    partida['dibujo'] = ""  # Limpiar dibujo
    partida['adivinanza'] = ""
    
    # Enviar la palabra al jugador que debe dibujar
    emit('tu_turno', {'palabra': palabra}, room=codigo_partida)

# Evento para manejar los dibujos en tiempo real
@socketio.on('actualizar_dibujo')
def actualizar_dibujo(codigo_partida, dibujo):
    if codigo_partida not in partidas:
        return

    partida = partidas[codigo_partida]
    if partida['estado'] != 'jugando' or partida['turno'] != request.sid:
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
    socketio.run(app, debug=True)