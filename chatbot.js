const toggleBtn = document.getElementById("chat-toggle");
  const chatbot = document.getElementById("chatbot");
  const chatBody = document.getElementById("chat-body");
  const chatInput = document.getElementById("chat-input");
  const sendBtn = document.getElementById("chat-send");

  // Toggle chatbot
  toggleBtn.addEventListener("click", () => {
    chatbot.style.display = chatbot.style.display === "flex" ? "none" : "flex";
  });

  // Add message
  function addMessage(text, sender) {
    const div = document.createElement("div");
    div.classList.add("message", sender);
    div.innerText = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // Translate with MyMemory API
  async function translate(text) {
    try {
      let res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|fr`
      );
      let data = await res.json();
      return data.responseData.translatedText;
    } catch (err) {
      return "⚠️ Error: Could not translate.";
    }
  }

  // Send message
  async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage(text, "user");
    chatInput.value = "";

    const translation = await translate(text);
    addMessage(translation, "bot");
  }

  sendBtn.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
  });