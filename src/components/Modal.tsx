import { ReactNode } from "react";
import { Dialog } from "@headlessui/react";

interface ModalProp {
  isOpen: boolean;
  setIsOpen: Function;
  title?: string;
  children: ReactNode;
  onDismiss?: Function;
  className?: string;
}

const Modal = ({
  isOpen,
  setIsOpen,
  title,
  children,
  onDismiss,
  className,
}: ModalProp) => {
  function closeModal() {
    setIsOpen(false);
    onDismiss && onDismiss();
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        closeModal();
      }}
      as="div"
      className={`fixed inset-0 z-10 flex items-center justify-center overflow-y-auto ${
        isOpen && "bg-gray-900 bg-opacity-30"
      }`}
    >
      <div
        className={`flex flex-col rounded-md bg-white md:w-1/2 lg:w-1/4  ${className}`}
      >
        <Dialog.Overlay />
        <Dialog.Panel className={"p-6"}>{children}</Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Modal;
