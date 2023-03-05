import { useEffect, useState } from "react"

export default function ModalConfirm ({ aksi, handleClickConfirm, handleClickConfirmAction }) {

    return (
        <div className="w-full h-full fixed top-0 left-0">
            <button className="w-full h-full top-0 left-0 bg-black bg-opacity-70 absolute -z-10" onClick={()=>handleClickConfirm(aksi)}></button>
            <div className="w-fit h-fit p-10 rounded-lg bg-white right-1/2 top-1/2 absolute transdiv  translate-x-1/2 -translate-y-1/2 shadow-lg">
                <div className="space-y-3">
                    <h2 className="text-2xl font-semibold text-center">Caution !</h2>
                    <p className="text-center text-lg">Yakin untuk {aksi} Item ? </p>
                    <div className="w-full flex flex-center gap-4 justify-center items-center">
                        <button className="flex-1 bg-yellow-200 px-3 py-1 hover:bg-yellow-400 rounded-lg" onClick={()=>handleClickConfirmAction(aksi)}>Yes</button>
                        <button className="flex-1 bg-yellow-200 px-3 py-1 hover:bg-yellow-400 rounded-lg" onClick={()=>handleClickConfirm(aksi)}>No</button>
                    </div>
                </div>
            </div>
        </div>
    )
}