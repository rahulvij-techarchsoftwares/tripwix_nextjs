export interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  contentLabel: string;
  children: React.ReactNode;
  overlayClassName?: string;
  extraClasses?: string;
}
