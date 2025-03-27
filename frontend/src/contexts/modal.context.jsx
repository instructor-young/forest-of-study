import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export function ModalProvider({ children }) {
  const [modalElement, setModalElement] = useState(null);

  const open = useCallback((modalElement) => {
    setModalElement(modalElement);
  }, []);

  const close = useCallback(() => {
    setModalElement(null);
  }, []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modalElement}
    </ModalContext.Provider>
  );
}
