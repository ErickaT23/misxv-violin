import { eventData } from './config.js';

document.addEventListener('DOMContentLoaded', () => {

  // --- Apertura del sobre ---
  const envelopeimage = document.getElementById('envelopeimage');
  const envelope = document.getElementById('envelope');
  const mainContent = document.querySelector('.main-content');
  const audioPlayer = document.getElementById('audioPlayer');
  const playPauseButton = document.getElementById('playPauseButton');

  envelopeimage.addEventListener('click', () => {
    envelope.classList.add('open');
    setTimeout(() => {
      envelope.style.display = 'none';
      mainContent.classList.remove('hidden');
      audioPlayer.play();
      playPauseButton.innerText = 'Pause';
    }, 1000);
  });

  // Cargar datos generales del hero
document.getElementById('couple-names').innerText = eventData.couple.names;
document.getElementById('couple-last').innerText = eventData.couple.last;


  // --- Música ---
  audioPlayer.src = eventData.song.file;
  document.getElementById('song-title').innerText = eventData.song.title;

  const progressBar = document.getElementById('progress-bar');
  const currentTime = document.getElementById('current-time');
  const durationTime = document.getElementById('duration-time');

  playPauseButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
      audioPlayer.play();
      playPauseButton.innerText = 'Pause';
    } else {
      audioPlayer.pause();
      playPauseButton.innerText = 'Play';
    }
  });

  audioPlayer.addEventListener('loadedmetadata', () => {
    durationTime.textContent = formatTime(audioPlayer.duration);
  });

  audioPlayer.addEventListener('timeupdate', () => {
    progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    currentTime.textContent = formatTime(audioPlayer.currentTime);
  });

  progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
  });

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

//--- Botón para añadir al calendario ---
window.addToCalendar = function () {
  const calendarURL = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mis+Quince+Valentina+Mor%C3%A1n+Lira&dates=20251213/20251214&details=Te+espero+para+celebrar+mis+quince+años&location=Retalhuleu%2C+Guatemala";
  window.open(calendarURL, "_blank");
}


  // --- Itinerario ---
  // --- Ceremonia ---
  document.getElementById('ceremony-place').innerText = eventData.ceremony.place;
  document.getElementById('ceremony-address').innerText = eventData.ceremony.address;
  document.getElementById('ceremony-date').innerText = eventData.ceremony.date;
  document.getElementById('ceremony-time').innerText = eventData.ceremony.time;
  document.getElementById('ceremony-map').onclick = () => window.open(eventData.ceremony.mapLink, '_blank');

    // --- Recepción ---
  document.getElementById('reception-place').innerText = eventData.reception.place;
  document.getElementById('reception-address').innerText = eventData.reception.address;
  document.getElementById('reception-date').innerText = eventData.reception.date;
  document.getElementById('reception-time').innerText = eventData.reception.time;
  document.getElementById('reception-map').onclick = () => window.open(eventData.reception.mapLink, '_blank');

  // --- Lluvia de sobres ---
  document.getElementById('abroad-gift-message').innerText = eventData.abroadGiftMessage;
  

  // --- Playlist ---
  document.getElementById('playlist-description').innerText = eventData.playlistDescription;
  document.getElementById('playlist-button').onclick = () => window.open(eventData.playlistLink, '_blank');

  // --- Dress Code ---
  // DRESS CODE dinámico
const dresscode = eventData.dresscode;

document.getElementById('dresscode-details').innerHTML = `
  <p>${dresscode.description}</p>
`;

document.getElementById('dresscode-inspo').innerHTML = `
  <button onclick="window.open('${dresscode.inspiration.women}', '_blank')">Inspiración para Mujeres</button>
  <button onclick="window.open('${dresscode.inspiration.men}', '_blank')">Inspiración para Hombres</button>
`;


  // --- Álbum (QR + link) ---
  document.getElementById('qr-album').src = eventData.album.qrImage;
  document.getElementById('upload-photos').href = eventData.album.uploadLink;
  document.getElementById('upload-description').innerText = eventData.album.uploadDescription;
  document.getElementById('event-hashtag').innerText = eventData.album.hashtag;

//BUENOS DESEOS
// script.js (normal, sin import)
document.getElementById('send-wish').addEventListener('click', () => {
  document.getElementById('wish-form').classList.toggle('hidden');
});

document.getElementById('submit-wish').addEventListener('click', () => {
  const name = document.getElementById('wish-name').value.trim();
  const message = document.getElementById('wish-message').value.trim();

  if (name && message) {
    guardarDeseo(name, message)
      .then(() => {
        alert("¡Deseo enviado!");
        document.getElementById('wish-name').value = '';
        document.getElementById('wish-message').value = '';
        document.getElementById('wish-form').classList.add('hidden');
      })
      .catch(err => console.error("❌ Error al guardar el deseo:", err));
  } else {
    alert("Por favor, completá ambos campos.");
  }
});

document.getElementById('show-wishes').addEventListener('click', () => {
  const container = document.getElementById('wishes-container');
  container.classList.toggle('hidden');

  if (!container.classList.contains('hidden')) {
    escucharDeseos((lista) => {
      container.innerHTML = '';
      lista.forEach(deseo => {
        const p = document.createElement("p");
        p.innerHTML = `<strong>${deseo.nombre}</strong>: ${deseo.mensaje}`;
        container.appendChild(p);
      });
    });
  }
});


  // --- Final: Foto y Frase ---
  document.getElementById('final-message').innerText = eventData.finalMessage;

  // --- Confirmaciones ---
  document.getElementById('rsvp-message').innerText = "Para nosotros es muy importante que confirmes tu asistencia antes del 25 de noviembre, o bien indicarnos si no podrás acompañarnos.";
  document.getElementById('whatsapp-confirm').onclick = () => window.open(eventData.rsvp.whatsapp, '_blank');

  // --- Footer (redes sociales) ---
  const socialIcons = document.getElementById('social-icons');

socialIcons.innerHTML = `
  <a href="${eventData.footer.social.whatsapp}" target="_blank" aria-label="Whatsapp">
    <i class="fab fa-whatsapp"></i>
  </a>
  <a href="${eventData.footer.social.facebook}" target="_blank" aria-label="Facebook">
    <i class="fab fa-facebook"></i>
  </a>
  <a href="${eventData.footer.social.instagram}" target="_blank" aria-label="Instagram">
    <i class="fab fa-instagram"></i>
  </a>
`;

document.getElementById('footer-logo').src = eventData.footer.logo;


  // --- Animaciones Scroll (fade-in) ---
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    observer.observe(section);
  });

  // --- Contador regresivo ---
  const [day, month, year] = eventData.couple.date.split('.').map(s => s.trim());
  const weddingDate = new Date(`${year}-${month}-${day}T00:00:00`);
  const countdown = setInterval(() => {
    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      clearInterval(countdown);
      document.getElementById('countdown').innerHTML = "<h2>¡Hoy es el gran día!</h2>";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;
  }, 1000);

});
// Mostrar y ocultar popup de cuenta bancaria
const popup = document.getElementById('account-popup');
document.getElementById('show-account').addEventListener('click', () => {
  popup.classList.remove('hidden');
});

document.getElementById('close-popup').addEventListener('click', () => {
  popup.classList.add('hidden');
});


//musica
function createMusicNote() {
  const hero = document.querySelector("#hero");
  if (!hero) return;

  const rect = hero.getBoundingClientRect();

  // Solo si el hero está visible en pantalla
  const heroVisible = rect.bottom > 0 && rect.top < window.innerHeight;
  if (!heroVisible) return;

  const note = document.createElement("div");
  note.className = "music-note";

  const notes = ["♪", "♫", "♩"];
  note.textContent = notes[Math.floor(Math.random() * notes.length)];

  // X aleatorio dentro del ancho del hero (en pantalla)
  const x = Math.random() * Math.max(50, rect.width - 20) + rect.left;

  // Y nace por la parte baja del hero (pero no hasta el footer)
  const y = Math.min(window.innerHeight - 80, rect.bottom - 60);

  note.style.left = Math.floor(x) + "px";
  note.style.top  = Math.floor(y) + "px";

  document.body.appendChild(note);
  note.addEventListener("animationend", () => note.remove());
}


