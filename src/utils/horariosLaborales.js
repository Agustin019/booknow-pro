import { format } from 'date-fns';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseconfig';


export const horariosLaborales = [{
        hora: '10:00',
        disponible: true,
        periodo: 'mañana'
    },
    {
        hora: '10:30',
        disponible: true,
        periodo: 'mañana'
    },
    {
        hora: '11:00',
        disponible: true,
        periodo: 'mañana'
    },
    {
        hora: '11:30',
        disponible: true,
        periodo: 'mañana'
    },
    {
        hora: '12:00',
        disponible: true,
        periodo: 'mañana'
    },
    {
        hora: '12:30',
        disponible: true,
        periodo: 'mañana'
    },

    {
        hora: '13:00',
        disponible: true,
        periodo: 'tarde'
    },
    {
        hora: '13:30',
        disponible: true,
        periodo: 'tarde'
    },
    {
        hora: '14:00',
        disponible: true,
        periodo: 'tarde'
    },
    {
        hora: '14:30',
        disponible: true,
        periodo: 'tarde'
    },
    {
        hora: '15:00',
        disponible: true,
        periodo: 'tarde'
    },
    {
        hora: '15:30',
        disponible: true,
        periodo: 'tarde'
    },
    {
        hora: '16:00',
        disponible: true,
        periodo: 'tarde'
    },
    {
        hora: '16:30',
        disponible: true,
        periodo: 'tarde'
    },
    {
        hora: '17:00',
        disponible: true,
        periodo: 'tarde'
    },
    {
        hora: '17:30',
        disponible: true,
        periodo: 'tarde'
    },
]





export async function generarDocumentoPorCadaDiaDisponible() {

    // crear arreglo con las fechas formateadas del dia actual hasta 30 dias adelante
    const currentDate = new Date();
    const thirtyDaysLater = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 30);


    const availableDates = [];
    for (let date = currentDate; date <= thirtyDaysLater; date.setDate(date.getDate() + 1)) {
        if (date.getDay() !== 0) { // Verificar si el día no es domingo (0: domingo, 1: lunes, ..., 6: sábado)
            const formattedDate = format(date, 'dd-MM');
            availableDates.push(formattedDate);
        }
    }


    for (let i = 0; i < availableDates.length; i++) {
        const fecha = availableDates[i];
        const docRef = doc(db, 'horarios', fecha);
        try {
            const documento = await getDoc(docRef)
            if (!documento.exists()) {
                await setDoc(docRef, {
                    horariosLaborales
                })
            }
        } catch (e) {
            console.log(`Error en la fecha ${fecha}`, e)
        }

    }
}


// Genera un documento con un arreglo vacio llamado "turnos" por cada dia de turnos disponible
export async function generarDocumentoPorCadaDiaDeTurnosDisponible() {

    // crear arreglo con las fechas formateadas del dia actual hasta 30 dias adelante
    const currentDate = new Date();
    const thirtyDaysLater = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 30);


    const availableDates = [];
    const turnos = []
    for (let date = currentDate; date <= thirtyDaysLater; date.setDate(date.getDate() + 1)) {
        if (date.getDay() !== 0) { // Verificar si el día no es domingo (0: domingo, 1: lunes, ..., 6: sábado)
            const formattedDate = format(date, 'dd-MM');
            availableDates.push(formattedDate);
        }
    }


    for (let i = 0; i < availableDates.length; i++) {
        const fecha = availableDates[i];
        const docRef = doc(db, 'Turnos', fecha);
        try {
            const documento = await getDoc(docRef)
            if (!documento.exists()) {
                await setDoc(docRef, {
                    turnos
                })
            }
        } catch (e) {
            console.log(`Error en la fecha ${fecha}`, e)
        }

    }
}
