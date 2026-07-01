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
    // Máscara de telefone: (16) 90000-0000
    function maskPhone(v) {
      var d = v.replace(/\D/g, "").slice(0, 11);
      if (!d) return "";
      if (d.length < 3) return "(" + d;
      var ddd = d.slice(0, 2);
      var rest = d.slice(2);
      if (rest.length <= 4) return "(" + ddd + ") " + rest;
      if (rest.length <= 8) return "(" + ddd + ") " + rest.slice(0, 4) + "-" + rest.slice(4);
      return "(" + ddd + ") " + rest.slice(0, 5) + "-" + rest.slice(5);
    }
    form.telefone.addEventListener("input", function () {
      form.telefone.value = maskPhone(form.telefone.value);
      form.telefone.classList.remove("invalid");
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var nome = form.nome.value.trim();
      var telefone = form.telefone.value.trim();
      var assunto = form.assunto.value;
      var mensagem = form.mensagem.value.trim();

      // Validação: nome é obrigatório
      if (!nome) {
        form.nome.classList.add("invalid");
        form.nome.focus();
        return;
      }
      form.nome.classList.remove("invalid");

      // Validação: telefone obrigatório (mínimo 10 dígitos — DDD + número)
      if (telefone.replace(/\D/g, "").length < 10) {
        form.telefone.classList.add("invalid");
        form.telefone.focus();
        return;
      }
      form.telefone.classList.remove("invalid");

      // Monta a mensagem para o WhatsApp
      var linhas = [
        "Olá! Meu nome é " + nome + ".",
        "Assunto: " + assunto + ".",
        "Telefone: " + telefone + ".",
      ];
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

  /* ---------- Destaque da seção ativa na navegação (scrollspy) ---------- */
  (function () {
    var navLinks = Array.prototype.slice.call(
      document.querySelectorAll('.nav__list .nav__link')
    );
    if (!navLinks.length || !("IntersectionObserver" in window)) return;

    var linkById = {};
    var sections = [];
    navLinks.forEach(function (link) {
      var id = (link.getAttribute("href") || "").replace("#", "");
      var sec = id && document.getElementById(id);
      if (sec) { linkById[id] = link; sections.push(sec); }
    });

    function setActive(id) {
      navLinks.forEach(function (link) { link.removeAttribute("aria-current"); });
      if (linkById[id]) linkById[id].setAttribute("aria-current", "page");
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sections.forEach(function (sec) { observer.observe(sec); });
  })();

  /* ---------- Avaliações / Carrossel ---------- */

  // Link do perfil no Google (botão "Ver todas no Google").
  var GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/4hHeU2MEiDsw6Vtj9";

  // === Avaliações reais (edite esta lista para adicionar/trocar) ===
  // Cada item: { name: "Nome", rating: 1..5, text: "Comentário" }
  var REVIEWS = [
    {
      name: "Rodrigo Martins",
      rating: 5,
      text: "Dra. Rafaela é uma dentista fantástica. Atenciosa, muito experiente e com muita paciência para explicar todo o processo. Vim dos Estados Unidos para me tratar com ela. Nota Dez!"
    },
    {
      name: "Marinna Lodi",
      rating: 5,
      text: "A Rafa é uma profissional incrível, amei a consulta com ela. Com toda certeza indico, me passou segurança e cuidado. Gratidão, Rafa, que seu caminho continue sendo incrivelmente maravilhoso."
    },
    {
      name: "Danúbio Luis Velazquez Hermida",
      rating: 5,
      text: "Excelente profissional, simpática e atenciosa. Recomendo 100%. Gostei demais dela. Parabéns e obrigado por tudo."
    },
    {
      name: "Guto Itonaga",
      rating: 5,
      text: "Excelente dentista, fez as reparações dos meus dentes com cuidado e qualidade, também me tirou as dúvidas referente a clareamento, que também fiz com ela e fiquei satisfeito com os resultados. Podem escolher ela tranquilamente."
    },
    {
      name: "Ana Paula Padovani",
      rating: 5,
      text: "Maravilhosa ✨ Profissional muito eficiente!! Me senti muito acolhida e confortável."
    }
  ];

  var carousel = document.getElementById("reviewCarousel");
  var track = document.getElementById("reviewTrack");

  if (carousel && track && REVIEWS.length) {
    var prevBtn = document.getElementById("reviewPrev");
    var nextBtn = document.getElementById("reviewNext");
    var dotsWrap = document.getElementById("reviewDots");
    var googleLink = document.getElementById("reviewsGoogleLink");
    if (googleLink) googleLink.setAttribute("href", GOOGLE_REVIEWS_URL);

    var index = 0;
    var total = REVIEWS.length;
    var autoTimer = null;
    var AUTO_MS = 6000;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function esc(str) {
      var d = document.createElement("div");
      d.textContent = str;
      return d.innerHTML;
    }

    function stars(n) {
      var full = Math.max(0, Math.min(5, n));
      return "★★★★★".slice(0, full) + "☆☆☆☆☆".slice(0, 5 - full);
    }

    // Renderiza os slides
    REVIEWS.forEach(function (r, i) {
      var li = document.createElement("li");
      li.className = "review";
      li.setAttribute("role", "group");
      li.setAttribute("aria-roledescription", "avaliação");
      li.setAttribute("aria-label", (i + 1) + " de " + total);
      li.innerHTML =
        '<div class="review__card">' +
          '<div class="review__stars" aria-label="' + r.rating + ' de 5 estrelas">' + stars(r.rating) + "</div>" +
          '<p class="review__text">' + esc(r.text) + "</p>" +
          '<p class="review__author">' + esc(r.name) + "</p>" +
          '<span class="review__source">via <b><span class="g-blue">G</span><span class="g-red">o</span><span class="g-yellow">o</span><span class="g-blue">g</span><span class="g-green">l</span><span class="g-red">e</span></b></span>' +
        "</div>";
      track.appendChild(li);
    });

    // Cria os indicadores (dots)
    var dots = [];
    if (dotsWrap && total > 1) {
      for (var d = 0; d < total; d++) {
        (function (di) {
          var dot = document.createElement("button");
          dot.type = "button";
          dot.className = "review-dot";
          dot.setAttribute("role", "tab");
          dot.setAttribute("aria-label", "Ir para avaliação " + (di + 1));
          dot.addEventListener("click", function () { goTo(di); restartAuto(); });
          dotsWrap.appendChild(dot);
          dots.push(dot);
        })(d);
      }
    }

    function update() {
      track.style.transform = "translateX(" + (-index * 100) + "%)";
      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === index);
        dot.setAttribute("aria-selected", i === index ? "true" : "false");
      });
    }

    function goTo(i) { index = (i + total) % total; update(); }
    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    // Se houver só 1 avaliação, oculta navegação
    if (total <= 1) {
      if (prevBtn) prevBtn.style.display = "none";
      if (nextBtn) nextBtn.style.display = "none";
      if (dotsWrap) dotsWrap.style.display = "none";
    } else {
      if (nextBtn) nextBtn.addEventListener("click", function () { next(); restartAuto(); });
      if (prevBtn) prevBtn.addEventListener("click", function () { prev(); restartAuto(); });

      // Navegação por teclado
      carousel.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") { prev(); restartAuto(); }
        if (e.key === "ArrowRight") { next(); restartAuto(); }
      });

      // Swipe no celular
      var startX = 0, dx = 0, dragging = false;
      track.addEventListener("touchstart", function (e) {
        startX = e.touches[0].clientX; dx = 0; dragging = true; stopAuto();
      }, { passive: true });
      track.addEventListener("touchmove", function (e) {
        if (dragging) dx = e.touches[0].clientX - startX;
      }, { passive: true });
      track.addEventListener("touchend", function () {
        if (dragging && Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
        dragging = false; startAuto();
      });

      // Autoavanço (respeita preferência de movimento reduzido)
      startAuto();
      carousel.addEventListener("mouseenter", stopAuto);
      carousel.addEventListener("mouseleave", startAuto);
      carousel.addEventListener("focusin", stopAuto);
      carousel.addEventListener("focusout", startAuto);
    }

    function startAuto() {
      if (reduceMotion || total <= 1 || autoTimer) return;
      autoTimer = window.setInterval(next, AUTO_MS);
    }
    function stopAuto() {
      if (autoTimer) { window.clearInterval(autoTimer); autoTimer = null; }
    }
    function restartAuto() { stopAuto(); startAuto(); }

    update();
  }
})();
