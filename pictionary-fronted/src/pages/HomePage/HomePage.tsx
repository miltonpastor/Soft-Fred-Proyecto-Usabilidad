import { useEffect, useRef } from "react"
import { Footer } from "../../components/Footer"
import { Header } from "../../components/Header"
import { InfoSection } from "../../components/InfoSection"
import { LoginCard } from "../../components/LoginCard"
import './HomePage.css'
import usePartidaService from "../../hooks/usePartidaService"

const HomePage = () => {
    const { crearPartida, iniciarPartida } = usePartidaService();
    // save the partida code with useRef
    const codigoPartida = useRef<string>(""); //

    useEffect(() => {
        const createGame = async () => {
            try {
                const response = await crearPartida("admin", 30);
                console.log('Partida creada:', response.data);
                codigoPartida.current = response.data.partida.codigo_partida;
            } catch (error) {
                console.error('Error al crear partida:', error);
            }
        };
        createGame();
    }, [])

    return (
        <div className="homePage bg-blue01">
            <Header />

            <main className=" w-full flex-1 flex flex-col justify-center items-center gap-10 py-10">
                <LoginCard codigoPartida={codigoPartida.current} />
                <InfoSection />
            </main>

            <Footer />

        </div>
    )
}

export default HomePage
