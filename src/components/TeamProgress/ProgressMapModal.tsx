import { useRef, useState } from "preact/hooks";
import { ProgressMap, ProgressMapProps } from "./ProgressMap";
import CloseIcon from '../../icons/close.svg'
import { useOutsideClick } from "../../hooks/use-outside-click";

export function ProgressMapModal(props: ProgressMapProps) {
  const modelContentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  }

  useOutsideClick(modelContentRef, handleClose);
  return (
    <div>
      <button
        onClick={() => {
          setIsOpen(p => !p);
        }}
        className="hover:underline"
      >View Progress on Map</button>
      {
        isOpen && (
          <div className="bg-black/50 overflow-y-auto overflow-x-hidden fixed inset-0 z-50 h-full items-center justify-center">
            <div className="relative p-4 w-full md:max-w-[70vw] h-full md:h-auto mx-auto" ref={modelContentRef}>
              <div className="bg-white shadow-md rounded-md overflow-hidden p-10 min-h-[40vh] relative">
                <ProgressMap {...props} />
                <button
                  type='button'
                  onClick={handleClose}
                  class='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close'
                >
                  <img src={CloseIcon} alt='Close popup' className='w-4 h-4' />
                  <span class='sr-only'>Close popup</span>
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}
