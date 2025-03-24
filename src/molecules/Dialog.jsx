import { useEffect, useRef } from 'react'
import { getDialogContent } from '../pages/Wordle/WordleHelpers'

export default function Dialog({answer, contentKey, isOpen, onCloseModal}) {
  const ref = useRef();

  useEffect(() => {
    if(!isOpen) {
      return;
    }

    const dialog = ref.current;
    dialog.showModal()
    return () => {
      dialog.close()
    }
  }, [isOpen])

  return <>
    <dialog className="absolute bg-slate-800 left-1/2 p-5 rounded-xl shadow-2xl text-white transform -translate-x-1/2 top-1/5 w-1/2 backdrop:bg-slate-950/70" ref={ref}>
      <div className="flex justify-end">
        <button className="bg-cyan-700 text-sm text-white p-2 rounded-md uppercase hover:bg-cyan-800" onClick={() => onCloseModal()}>
          Close
        </button>
      </div>
      <p className="my-5 text-2xl">
        {getDialogContent(contentKey, answer)}
      </p>
    </dialog>
  </>
}