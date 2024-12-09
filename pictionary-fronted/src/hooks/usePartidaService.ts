import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import axios, { AxiosResponse } from 'axios';

const apiUrl = "http://localhost:5000";
const socketUrl = "http://localhost:5000";

interface Partida {
  // Define the properties of Partida based on your model
}

const usePartidaService = () => {
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io(socketUrl);

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  const crearPartida = (nombreAnfitrion: string, tiempoPorRonda: number): Promise<AxiosResponse<any>> => {
    return axios.post(`${apiUrl}/crear_partida`, {
      nombre_anfitrion: nombreAnfitrion,
      tiempo_por_ronda: tiempoPorRonda
    });
  };

  const unirsePartida = (codigoPartida: string, nombreJugador: string): Promise<AxiosResponse<any>> => {
    return axios.post(`${apiUrl}/unirse_partida`, {
      codigo_partida: codigoPartida,
      nombre_jugador: nombreJugador
    });
  };

  const iniciarPartida = (codigoPartida: string): Promise<AxiosResponse<any>> => {
    return axios.post(`${apiUrl}/iniciar_partida`, {
      codigo_partida: codigoPartida
    });
  };

  const actualizarDibujo = (codigoPartida: string, dibujo: string): void => {
    socket.current?.emit('actualizar_dibujo', codigoPartida, dibujo);
  };

  const recibirDibujo = (callback: (dibujo: string) => void): void => {
    socket.current?.on('actualizar_dibujo', (data: { dibujo: string }) => {
      callback(data.dibujo);
    });
  };

  const adivinar = (codigoPartida: string, intento: string): void => {
    socket.current?.emit('adivinar', codigoPartida, intento);
  };

  const recibirAdivinanza = (callback: (mensaje: string) => void): void => {
    socket.current?.on('acertado', (data: { mensaje: string }) => {
      callback(data.mensaje);
    });
  };

  const obtenerEstadoPartida = (codigoPartida: string): Promise<AxiosResponse<Partida>> => {
    return axios.get(`${apiUrl}/estado_partida/${codigoPartida}`);
  };

  const unirseASala = (codigoPartida: string, nombreJugador: string): void => {
    socket.current?.emit('unirse_partida_socket', codigoPartida, nombreJugador);
  };

  const salirDeSala = (codigoPartida: string): void => {
    socket.current?.emit('salir_partida_socket', codigoPartida);
  };

  const escucharErrores = (callback: (error: any) => void): void => {
    socket.current?.on('error', (error: any) => {
      callback(error);
    });
  };

  const iniciarRonda = (codigoPartida: string): void => {
    socket.current?.emit('iniciar_ronda', codigoPartida);
  };

  const escucharInicioPartida = (callback: (data: any) => void): void => {
    socket.current?.on('tu_turno', (data: any) => {
      callback(data);
    });
  };

  const escucharDibujo = (callback: (data: any) => void): void => {
    socket.current?.on('actualizar_dibujo', (data: any) => {
      callback(data);
    });
  };

  const escucharChat = (callback: (mensaje: string) => void): void => {
    socket.current?.on('mensaje_chat', (data: { mensaje: string }) => {
      callback(data.mensaje);
    });
  };

  const escucharUnirsePartida = (callback: (jugadores: string[]) => void): void => {
    socket.current?.on('actualizar_jugadores', (response: { lista: string }) => {
      try {
        const jugadores = JSON.parse(response.lista);
        if (Array.isArray(jugadores)) {
          callback(jugadores);
        } else {
          throw new Error('La respuesta no contiene una lista válida de jugadores');
        }
      } catch (error) {
        console.error('Error al parsear la lista de jugadores', error);
        const jugadores = response.lista.split(',').map(jugador => jugador.trim());
        callback(jugadores);
      }
    });
  };

  const enviarMensajeChat = (codigoPartida: string, mensaje: string): void => {
    socket.current?.emit('mensaje_chat', { codigoPartida, mensaje });
  };

  return {
    crearPartida,
    unirsePartida,
    iniciarPartida,
    actualizarDibujo,
    recibirDibujo,
    adivinar,
    recibirAdivinanza,
    obtenerEstadoPartida,
    unirseASala,
    salirDeSala,
    escucharErrores,
    iniciarRonda,
    escucharInicioPartida,
    escucharDibujo,
    escucharChat,
    escucharUnirsePartida,
    enviarMensajeChat
  };
};

export default usePartidaService;