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
import {
  tieneRol
} from "./seguridad.js";
const uidPersonal = firebase.auth().currentUser.uid
const fRecordaotrio =
  getFirestore().
    collection("Usuario").doc(uidPersonal).collection("Recordatorio");
const params =
  new URL(location.href).
    searchParams;
const id = params.get("id");
/** @type {HTMLFormElement} */
const forma = document["forma"];

getAuth().onAuthStateChanged(
  enviar, muestraError);


async function enviar() {
    busca();
}

/** Busca y muestra los datos que
 * corresponden al id recibido. */
async function busca() {
  try {
    const doc =
      await fRecordaotrio.
        doc(id).
        get();
    if (doc.exists) {
      /**
       * @type {
          import("./tipos.js").
                  Alumno} */
      const data = doc.data();
      forma.titulo.value = data.titulo || "";
      forma.recodatorio.value = data.recodatorio || "";
      forma.fecha.value = data.fecha || "";
      forma.addEventListener(
        "submit", guarda);
      forma.eliminar.
        addEventListener(
          "click", elimina);
    } else {
      throw new Error(
        "No se encontró.");
    }
  } catch (e) {
    muestraError(e);
    irRecordatorios();
  }
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
      doc(id).
      set(modelo);
    irRecordatorios();
  } catch (e) {
    muestraError(e);
  }
}

async function elimina() {
  try {
    if (confirm("Confirmar la " +
      "eliminación")) {
      await fRecordaotrio.
        doc(id).
        delete();
      irRecordatorios();
    }
  } catch (e) {
    muestraError(e);
  }
}

