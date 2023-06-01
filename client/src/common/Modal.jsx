import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";

export default function ModalCustom({ visible, setVisible, config, children }) {
    return (
        <div>
            <Modal
                width="700px"
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={() => setVisible(false)}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        {config?.title || 'Titulo'}
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onPress={() => setVisible(false)}>
                        {config?.botones?.cancelar || 'Cancelar'}
                    </Button>
                    <Button auto onPress={config.function.aceptar}>
                        {config?.botones?.aceptar || 'Aceptar'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}