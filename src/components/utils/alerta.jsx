import React from 'react'

export default function Alerta({ 
        titulo, 
        texto, 
        txtBtnCancelar, 
        txtBtnConfirmar, 
        cancelar, 
        confirmar 
    }) {
    return (
        <div className='fixed h-screen w-screen top-0 left-0 flex flex-col justify-center items-center bg-black/50 z-40 '>
            <div className='w-[644px] h-[351px] py-8 px-6 bg-[#474747] rounded-lg flex flex-col items-center gap-[40px]'>
                <div className='flex flex-col items-center gap-3 text-[#fdfffc]'>
                    <img src="https://i.ibb.co/hm2YPzj/delete.png" alt="icono eliminar" />
                    <p className='font-semibold text-[28px] '>{titulo}</p>
                </div>
                <p className='font-light text-base text-center text-[#FDFFFC]'>
                    {texto}
                </p>
                <div className='flex items-center gap-8'>
                    <button
                        onClick={cancelar} 
                        className='
                            w-[282px] h-[52px] py-[15px] px-6 flex justify-center gap-[10px] items-center
                            bg-transparent rounded-lg font-semibold text-lg border border-white text-white'>
                        {txtBtnCancelar}
                    </button>
                    <button
                        onClick={confirmar} 
                        className='
                        w-[282px] h-[52px] py-[15px] px-6 flex justify-center gap-[10px] items-center 
                        bg-white rounded-lg font-semibold text-lg
                    '>
                        {txtBtnConfirmar}
                    </button>

                </div>
            </div>
        </div>
    )
}
