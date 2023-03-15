import { useState } from 'react';
import moment from 'moment';
import { getDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../utils/firebaseconfig'

import TurnosCont from '../components/client/turnosCont';
import Servicios from '../components/client/servicios';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Modal from '../components/client/modal';

export default function Turnos() {
  const fechaActual = moment()
  const diaDeHoy = fechaActual.format('DD-MM')

  const [fecha, setFecha] = useState(diaDeHoy)
  const [servicioSeleccionado, setServicioSeleccionado] = useState('')
  const [hora, setHora] = useState('')
  const [step, setStep] = useState(1)

  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState(false)


  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }
  const formularioStepToStep = () => {
    switch (step) {
      case 1:
        return <Servicios step={step} setStep={setStep} nextStep={nextStep} prevStep={prevStep} servicioSeleccionado={servicioSeleccionado} setServicioSeleccionado={setServicioSeleccionado} />
      case 2:
        return <TurnosCont setModal={setModal} step={step} nextStep={nextStep} prevStep={prevStep} fecha={fecha} setFecha={setFecha} hora={hora} setHora={setHora} loading={loading} setLoading={setLoading} />
      case 3:
        return console.log('seccion3')
      default:
        return <Servicios nextStep={nextStep} prevStep={prevStep} servicioSeleccionado={servicioSeleccionado} setServicioSeleccionado={setServicioSeleccionado} />
    }
  }
  const handleSubmit = async () => {
    
    // Comprobar si se rellenaron los campos
    if (hora === '') {
      console.log('Rellena los campos')
      return
    }
    // Actualizar la disponibilidad de la hora 
    const horaSeleccionada = doc(db, 'horarios', fecha)
    const horaFirebase = await getDoc(horaSeleccionada)
    const horas = horaFirebase.data()
    console.log(fecha)
    console.log(horas)
    const encontrarHora = horas.horariosLaborales.findIndex(obj => obj.hora === hora)
    if (encontrarHora !== -1) {
      horas.horariosLaborales[encontrarHora] = {
        ...horas.horariosLaborales[encontrarHora],
        disponible: false
      };
    }
    // Enviar datos del turno a la coleccion 'Turnos' y modificar el documento de la fecha seleccionada
    const docref = doc(db, 'Turnos', fecha)
    const turnoFirebase = await getDoc(docref)
    const turnos = turnoFirebase.data()
    console.log(turnos)
    turnos.turnos.push({
      hora: hora,
      cliente: 'Lucas Beltran',
      servicio: servicioSeleccionado
    })

    await updateDoc(horaSeleccionada, horas)
    await updateDoc(docref, turnos)
    setLoading(false)
    console.log('Turno reservado')
  }

  return (
    <main className='w-full min-h-screen mx-auto h-screen'>

      <form
        className='flex flex-col justify-between p-4 gap-y-10 h-full mx-auto '
        onSubmit={handleSubmit}
        >
        {
          modal && 
              <Modal
                setModal={setModal}
                fecha={fecha}
                hora={hora}
                servicioSeleccionado={servicioSeleccionado}
                handleSubmit={handleSubmit}
              />
        }

        <TransitionGroup>
          <CSSTransition
            key={step}
            timeout={500}
            classNames={{
              enter: 'fade-enter',
              enterActive: 'fade-enter-active',
              exit: 'fade-exit',
              exitActive: 'fade-exit-active'
            }}
          >

            {formularioStepToStep()}
          </CSSTransition>
        </TransitionGroup>
        {/* <input
          type="submit"
          value="¡Confirmar turno!"
          className='py-2 px-3 bg-slate-800 text-white font-semibold shadow hover:bg-slate-900 transition-all duration-300'
        /> */}
        {/*errores && Object.keys(errores).length > 0 && <Error>{Object.values(errores)}</Error>*/}
      </form>
    </main >
  )
}