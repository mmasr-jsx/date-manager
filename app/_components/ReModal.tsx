'use client';

import '../../styles/modal.css';
import { useRef, useEffect } from 'react';
import ReactPortal from './ReactPortal';
import MascotaForm from './MascotaForm';

type Props = {
  title: string;
  onClose: () => void;
  showModal: boolean;
  children: JSX.Element;
};

export default function ReModal({
  onClose,
  showModal,
  children,
  title,
}: Props) {
  //Close modal on escape key press
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === 'Escape' ? onClose() : null;
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [onClose]);

  //Disable scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return (): void => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  if (!showModal) return null;

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <>
        <div className="fixed top-0 left-0 w-screen h-screen z-40 bg-neutral-500 opacity-50" />
        <div className="fixed rounded flex flex-col box-border min-w-fit overflow-hidden p-8 bg-white inset-y-auto inset-x-12 sm:inset-x-24 md:inset-x-1/4 top-1/2 -translate-y-1/2 z-50 opacity-100">
          <div className="w-full min-h-[10%] flex flex-nowrap items-center mb-4 p-3 shadow-lg">
            <div className="flex-1 grid place-items-center">
              <h1 className="text-4xl text-background-50 font-semibold">
                {title}
              </h1>
            </div>
            <div className="flex-1 grid justify-items-end place-items-center px-5">
              <button
                className="py-2 px-4 bg-red-600 hover:bg-red-800 rounded font-semibold text-lg text-white"
                onClick={onClose}
              >
                X
              </button>
            </div>
          </div>
          <div className="w-full flex gap-3 items-center justify-center">
            {children}
          </div>
        </div>
      </>
    </ReactPortal>
  );
}
