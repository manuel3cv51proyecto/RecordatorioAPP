import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  cod,
  muestraError
} from "../lib/util.js";

/** @type {HTMLUListElement} */
const lista = document.
  querySelector("#lista");
const fRecordaotrio =
  getFirestore().
    collection("Usuario").doc(uidPersonal).collection("Recordatorio");

getAuth().
  onAuthStateChanged(
    enviar, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function enviar() {

  
    consulta();
  
}

function consulta() {
  fRecordaotrio.
    orderBy("titulo")
    .onSnapshot(
      htmlLista, errConsulta);
}

/**
 * @param {import(
    "../lib/tiposFire.js").
    QuerySnapshot} snap */
function htmlLista(snap) {
  let html = "";
  if (snap.size > 0) {
    snap.forEach(doc =>
      html += htmlFila(doc));
  } else {
    html += /* html */
      `<li class="vacio">
        -- No hay recordatorios
        anotados. --
      </li>`;
  }
  lista.innerHTML = html;
}

/**
 * @param {import(
    "../lib/tiposFire.js").
    DocumentSnapshot} doc */
function htmlFila(doc) {
  /**
   * @type {import("./tipos.js").
                  Alumno} */
  const data = doc.data();
  const titulo = cod(data.titulo);
  const descripcion = cod(data.descripcion);
  var fsf= cod(data.fecha);
  var fecha = new Date(fsf);
  var espacio="[   -   ]";
  var dformat = [fecha.getDate()+1, fecha.getMonth()+1, fecha.getFullYear()].join('/');
  const parámetros =
    new URLSearchParams();
  parámetros.append("id", doc.id);
  return ( /* html */
    `<li>
      <a class="fila" href=
  "alumno.html?${parámetros}">
          <span class="texto">
          <strong
              class="primario">
            ${titulo}
          </strong>
          <span
              class="secundario">
            ${descripcion}<br>
            ${dformat}
          </span>
        </span>
      </a>
     
    </li>`);
}

/** @param {Error} e */
function errConsulta(e) {
  muestraError(e);
  consulta();
}

