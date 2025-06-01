import "./Modal.css"

interface ModalProps{
    isOpen:boolean;
    onClose: () => void;
    children: React.ReactNode
    header:string;
}

function Modal({isOpen, onClose, children, header}: ModalProps){
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-content-header">
                    <p>{header}</p>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                <div className="modal-content-main">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal