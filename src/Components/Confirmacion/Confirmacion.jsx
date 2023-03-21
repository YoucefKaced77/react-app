import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useContext } from 'react';
import { CestaContext } from '../../App';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Confirmacion() {

  const {cesta1} = useContext(CestaContext);
  const setCesta1 = useContext(CestaContext).setCesta1;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const totalCarrito = () => {
    return cesta1.reduce((total, producto) => total + producto.precio, 0);
  };


  return (
    <div>
      <Button onClick={handleOpen}>REALIZAR PEDIDO</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div>
              {cesta1.map((producto) => (
                <div className="producto">
                  <p>{producto.nombre}</p>
                  <p>${producto.precio}</p>
                </div>
              ))}
              <div className="total">
                <p>Total:</p>
                <p>${totalCarrito()}</p>
              </div>
        </div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            ¿ Estás seguro ? YA NO HABRÁ VUELTA ATRÁS 
          </Typography>
          <Button href="/Formulario" onClick={handleClose}>TRAMITAR PEDIDO</Button>
        </Box>
      </Modal>
    </div>
  );
}
