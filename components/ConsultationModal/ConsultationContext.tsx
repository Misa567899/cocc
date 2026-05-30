"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface ConsultationContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ConsultationContext = createContext<ConsultationContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ConsultationContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ConsultationContext.Provider>
  );
}

export function useConsultation() {
  return useContext(ConsultationContext);
}
