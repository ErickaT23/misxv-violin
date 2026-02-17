/**************** RSVP CONFIG ****************/
const RSVP_ENDPOINT =
  "PEGARLINKAQUI"; // Reemplazar con el endpoint real de la API

/**************** HELPERS ****************/
const $ = s => document.querySelector(s);

function showMsg(el, text, type="ok") {
  el.textContent = text;
  el.className = `rsvp-msg ${type}`;
  el.style.display = "block";
}

function hideMsg(el) {
  el.style.display = "none";
  el.textContent = "";
}

/**************** MODAL ****************/
function openRsvpModal() {
  const b = $("#rsvpBackdrop");
  b.style.display = "flex";
  setTimeout(() => b.classList.add("show"), 100);
}

function closeRsvpModal() {
  const b = $("#rsvpBackdrop");
  b.classList.remove("show");
  setTimeout(() => b.style.display = "none", 250);
}

/**************** API ****************/
async function apiCheck(id) {
  const r = await fetch(`${RSVP_ENDPOINT}?guestId=${id}`);
  const j = await r.json();
  return j.alreadyConfirmed;
}

async function apiSend(data) {
  const body = new URLSearchParams(data).toString();
  const r = await fetch(RSVP_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  });
  return r.json();
}

/**************** INIT ****************/
document.addEventListener("DOMContentLoaded", async () => {
  const invitado = window.__invitadoActual;
  if (!invitado) return;

  $("#rsvpNombre").value = invitado.nombre;
  $("#rsvpPases").value = invitado.pases;

  $("#btnConfirmarRsvp").addEventListener("click", async () => {
    openRsvpModal();
    if (await apiCheck(invitado.id)) {
      showMsg($("#rsvpMsgModal"), "Gracias, ya has enviado tu confirmación.", "ok");
      setTimeout(closeRsvpModal, 900);
    }
  });

  async function confirmar(respuesta) {
    const msgSi = "Gracias por confirmar tu asistencia y hacer este día aún más especial.";
    const msgNo = "Lamentamos que no puedas acompañarnos en esta ocasión y agradecemos tu respuesta.";

    showMsg($("#rsvpMsgModal"), respuesta==="SI"?msgSi:msgNo, "ok");

    await apiSend({
      guestId: invitado.id,
      nombre: invitado.nombre,
      pases: invitado.pases,
      respuesta
    });

    setTimeout(closeRsvpModal, 800);
  }

  $("#btnRsvpSi").onclick = () => confirmar("SI");
  $("#btnRsvpNo").onclick = () => confirmar("NO");
});
