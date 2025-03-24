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
    <dialog className="absolute bg-slate-800 left-1/2 p-6 rounded-xl shadow-2xl text-white transform -translate-x-1/2 top-1/5 w-1/3 backdrop:bg-slate-950/70" ref={ref}>
      <p className="mt-2 text-2xl">
        {getDialogContent(contentKey, answer)}
      </p>
      <button className="button-primary !px-3 mt-5" onClick={() => onCloseModal()}>
        Close
      </button>
    </dialog>
  </>
}