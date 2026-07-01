/* =========================================================
   Dra. Rafaela Simões — Scripts
   Menu mobile, rolagem suave, ano do rodapé e envio do
   formulário de contato para o WhatsApp.
   ========================================================= */

(function () {
  "use strict";

  var WHATSAPP_NUMBER = "5516997864686"; // (16) 99786-4686

  /* ---------- Menu mobile (hambúrguer) ---------- */
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");

  function closeMenu() {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    });

    // Fecha o menu ao clicar em um link
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // Fecha ao redimensionar para desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 900) closeMenu();
    });

    // Fecha com a tecla Esc
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- Ano automático no rodapé ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Formulário de contato -> WhatsApp ---------- */
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var nome = form.nome.value.trim();
      var telefone = form.telefone.value.trim();
      var assunto = form.assunto.value;
      var mensagem = form.mensagem.value.trim();

      // Validação simples: nome é obrigatório
      if (!nome) {
        form.nome.classList.add("invalid");
        form.nome.focus();
        return;
      }
      form.nome.classList.remove("invalid");

      // Monta a mensagem para o WhatsApp
      var linhas = [
        "Olá! Meu nome é " + nome + ".",
        "Assunto: " + assunto + ".",
      ];
      if (telefone) linhas.push("Telefone: " + telefone + ".");
      if (mensagem) linhas.push("Mensagem: " + mensagem);

      var texto = encodeURIComponent(linhas.join("\n"));
      var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + texto;

      window.open(url, "_blank", "noopener");
    });

    // Remove destaque de erro ao digitar
    form.nome.addEventListener("input", function () {
      form.nome.classList.remove("invalid");
    });
  }
})();
