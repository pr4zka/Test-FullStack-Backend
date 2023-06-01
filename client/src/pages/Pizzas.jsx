import { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import ModalCustom from "../common/Modal";
import { toast } from "react-toastify";
import { Formik } from "formik";
import { Input } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPizzas, createPizza } from "../feactures/pizzas/pizzasSlice";

function Pizzas() {
  const [show, setShow] = useState();
  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState({});
  const [action, setAction] = useState("created");

  const dispatch = useDispatch();

  const pizzas = useSelector((state) => state.pizzas);

  const handleChanged = (e) => {
    if (e.target.id === "p_venta" && isNaN(e.target.value)) {
      toast.error("El limite de credito debe ser un numero", {
        position: "top-center",
      });
      return;
    }

    setProduct({ ...product, [e.target.id]: e.target.value });
  };

  const handleCreatePizza = () => {};

  const handleEditPizza = () => {};

  const createdAndEditPizza = () => {
    return (
      <>
        <Formik
          initialValues={{ nombre: "", precio: "", estado: "" }}
          onSubmit={(values, { setSubmitting }) => {}}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <Input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  onChange={handleChange}
                  value={values.nombre}
                  className="mt-1 block w-full border-0 p-1"
                />
                <Input
                  type="text"
                  name="precio"
                  placeholder="Precio"
                  onChange={handleChange}
                  value={values.precio}
                  className="mt-1 block w-full border-0 p-1"
                />
                <select
                  name="estado"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.estado}
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="" disabled>
                    Seleccione el estado
                  </option>
                  <option value="1">Activo</option>
                  <option value="0">Inactivo</option>
                </select>
              </div>
            </form>
          )}
        </Formik>
      </>
    );
  };

  const handleOpen = () => {
    setVisible(true);
  };

  useEffect(() => {
    dispatch(fetchPizzas());
  }, []);
  return (
    <>
      <div className="w-full sm:px-6">
        <div className="px-4 md:px-10 py-4 my-3 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Pizzas
            </p>
            <div>
              <button
                className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
                onClick={handleOpen}
              >
                <IoIosAddCircleOutline className="text-white text-[1.2rem] mr-2 mt-[-2px]" />
                <p className="text-sm font-medium leading-none text-white">
                  Agregar Pizza
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        {pizzas &&
          pizzas.map((pizza, i) => (
            <div key={i} className="px-2">
              <div className="bg-indigo-100 w-full rounded-lg shadow-lg shadow-gray-400 p-4 mb-2 hover:bg-slate-700 cursor-pointer px-10 py-10 mx-16 my-10">
                <div>
                  <h1 className="py-2">{pizza.nombre}</h1>
                  <h1>{pizza.precio} Gs</h1>
                  <h1 className="py-2">{pizza.estado}</h1>
                </div>
              </div>
            </div>
          ))}
      </div>
      <ModalCustom
        visible={visible}
        setVisible={setVisible}
        config={{
          title: "Agregar Pizza",
          botones: {
            aceptar: "Guardar",
            cancelar: "Cancelar",
          },
          function: {
            aceptar: () => {
              handleCreatePizza();
            },
            cancelar: () => {
              console.log("cancelar");
            },
          },
        }}
      >
        {createdAndEditPizza()}
      </ModalCustom>
    </>
  );
}
export default Pizzas;
