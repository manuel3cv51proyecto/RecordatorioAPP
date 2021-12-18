import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  getString,
  muestraError
} from "../lib/util.js";
import {
  irRecordatorios
} from "./navegacion.js";
const uidPersonal = firebase.auth().currentUser.uid
const fRecordaotrio =
  getFirestore().
  collection("Usuario").doc(uidPersonal).collection("Recordatorio");
/** @type {HTMLFormElement} */
const forma = document["forma"];
getAuth().onAuthStateChanged(
  enviar, muestraError);


async function enviar() {

    forma.addEventListener(
      "submit", guarda);

}

/** @param {Event} evt */
async function guarda(evt) {
  try {
    evt.preventDefault();
    const formData =
      new FormData(forma);
    const titulo = getString(formData, "titulo").trim();  
    const recodatorio = getString(formData, "recodatorio").trim();
    const fecha = getString(formData, "fecha").trim();

    const modelo = {
      titulo,
      recodatorio,
      fecha 
    };
    await fRecordaotrio.
      add(modelo);
    irRecordatorios();
  } catch (e) {
    muestraError(e);
  }
}

