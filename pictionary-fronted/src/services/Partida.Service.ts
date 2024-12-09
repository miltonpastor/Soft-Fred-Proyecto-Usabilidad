// partidaService.js
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Reemplaza con la URL de tu servidor de sockets

export const obtenerJugadores = async () => {
  const response = await fetch('http://localhost:5000'); // Reemplaza con la URL de tu API
  const data = await response.json();
  return data;
};

export const enviarMensajeChat = (codigoPartida: string, mensaje: string) => {
  socket.emit('mensaje_chat', { codigoPartida, mensaje });
};