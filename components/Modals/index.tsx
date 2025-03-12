import React from 'react';

import {
  Modal as ModalUI,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { useTheme } from 'next-themes';

type ModalProps = {
  children: React.ReactNode;
  buttonLabel?: React.ReactNode;
};

const Modal = ({ children, buttonLabel = 'Ver Vídeo' }: ModalProps) => {
  const { theme } = useTheme();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const bgTheme = theme === 'light' ? 'bg-gray-100' : 'bg-gray-900';

  return (
    <>
      <Button className="cta-watch-video p-0" onClick={onOpen}>
        {buttonLabel}
      </Button>
      <ModalUI
        size="2xl"
        placement="center"
        backdrop="opaque"
        className={`${bgTheme} px-0`}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={true}
      >
        <ModalContent>
          {() => (
            <>
              <ModalBody>{children}</ModalBody>
            </>
          )}
        </ModalContent>
      </ModalUI>
    </>
  );
};

export default Modal;
