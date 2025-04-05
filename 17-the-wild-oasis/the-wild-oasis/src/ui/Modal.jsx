import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

//* This will Work fine but could be better improved like below:
// function Modal({ children, onClose }) {
//   return (
//     <Overlay>
//       <StyledModal>
//         <Button onClick={onClose}>
//           <HiXMark />
//         </Button>
//         <div>{children}</div>
//       </StyledModal>
//     </Overlay>
//   );
// }

//* to improve the above we can use a react portal to place the modal outside the dom tree while maintaining its position in the component tree and still having access to all the props and everything as if it is still in the normal position:
// the purpose of that could be to manage css overlap: example: we don't want css overflow hidden of the parent to apply to the modal
// function Modal({ children, onClose }) {
//   return createPortal(
//     <Overlay>
//       <StyledModal>
//         <Button onClick={onClose}>
//           <HiXMark />
//         </Button>

//         <div>{children}</div>
//       </StyledModal>
//     </Overlay>,
//     //* the second argument is for where we want to place it in the dom tree:
//     //* document.queryselector(...)
//     document.body
//   );
// }

/*  */
//*: to improve even further we can use the compound component pattern. the reason is to keep the state of isOpenModal encapsulated inide the Modal component

//1- create context
const ModalContext = createContext();

//2- create the parent component
function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

//3- create the children components
function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  // here we use cloneElement in order to be able to pass the props to the children. in essence we are creating a new element(s) that can accept the props we are passing. there could be other/better alternatives: check docs and lesson Q&A
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

//3- create the children components
function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    //the second argument is for where we want to place it in the dom tree:
    //document.queryselector(...)
    document.body
  );
}

//4- Add the properties to the parent function: this will make these properties children to the parent function:  link them all together
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
