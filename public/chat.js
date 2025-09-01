(() => {
  // 1) Garantir login
  const nickname = localStorage.getItem("nickname");
  if (!nickname) {
    window.location.href = "index.html";
    return;
  }

  // 2) Elementos principais
  const socket = io();
  const messagesEl = document.getElementById("messages");
  const inputEl = document.getElementById("input");
  const sendBtn = document.getElementById("sendBtn");

  // 3) Normalizar qualquer mensagem recebida
  function toDisplayString(msg) {
    if (typeof msg === "string") return msg;

    if (typeof msg === "object") {
      const user = msg.nickname || msg.user || "Anônimo";
      const text = msg.message || msg.text || "";
      return text ? `${user}: ${text}` : JSON.stringify(msg);
    }

    return String(msg);
  }

  // 4) Renderizar no chat
  function renderMessage(msg, { italic = false, prefix = "" } = {}) {
    const line = prefix + toDisplayString(msg);
    if (!messagesEl) return;

    const li = document.createElement("li");
    li.textContent = line;
    if (italic) li.style.fontStyle = "italic";

    messagesEl.appendChild(li);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  // 5) Enviar mensagem
  function sendMessage() {
    if (!inputEl) return;
    const text = (inputEl.value || "").trim();
    if (!text) return;

    socket.emit("chat message", { nickname, message: text });
    inputEl.value = "";
  }

  // 6) Listeners de UI
  if (sendBtn) {
    sendBtn.addEventListener("click", (e) => {
      e.preventDefault();
      sendMessage();
    });
  }

  if (inputEl) {
    inputEl.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  // 7) Eventos do socket

  socket.on("chat message", (msg) => {
    renderMessage(msg);
  });

  // Eventos opcionais do servidor
  socket.on("user connected", (user) => {
    renderMessage(user, { italic: true, prefix: "🔵 " });
  });

  socket.on("user disconnected", (user) => {
    renderMessage(user, { italic: true, prefix: "🔴 " });
  });
})();
