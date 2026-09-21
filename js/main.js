/* ===========================================================================
   Rendering and behaviour. Content lives in site-data.js — you normally do
   not need to touch this file.

   What it does:
   1. Fills the homepage from window.SITE (the static HTML is the no-JS fallback)
   2. Points every marked link at the URLs in SITE.links
   3. Builds the "On this page" list on case-study pages
   4. Highlights the section you are reading
   5. Copy-to-clipboard for the email address
   =========================================================================== */
(function () {
  "use strict";

  var SITE = window.SITE || {};
  var links = SITE.links || {};

  /* -- helpers ----------------------------------------------------------- */
  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function setText(id, value) {
    var node = byId(id);
    if (node && value) node.textContent = value;
  }

  function setHtml(id, html) {
    var node = byId(id);
    if (node && html) node.innerHTML = html;
  }

  function each(selector, fn) {
    Array.prototype.forEach.call(document.querySelectorAll(selector), fn);
  }

  function plainEmail() {
    return (links.email || "").replace(/^mailto:/, "");
  }

  function plainPhone() {
    return (links.phone || "").replace(/^tel:/, "");
  }

  /* -- 1. links ---------------------------------------------------------- */
  [
    ["[data-resume-href]", links.resume],
    ["[data-github-href]", links.github],
    ["[data-linkedin-href]", links.linkedin],
    ["[data-email-href]", links.email],
    ["[data-phone-href]", links.phone],
  ].forEach(function (pair) {
    if (!pair[1]) return;
    each(pair[0], function (node) {
      node.setAttribute("href", pair[1]);
    });
  });

  /* -- 2. homepage ------------------------------------------------------- */
  setText("js-availability", SITE.availability);
  setText("js-name", SITE.name);
  setText("js-role", SITE.role);
  setHtml("js-tagline", SITE.taglineHtml);
  setHtml("js-about", (SITE.aboutHtml || []).join(""));

  if (SITE.name && SITE.role) {
    setText("js-footer-sig", SITE.name + " — " + SITE.role);
  }
  setText("js-footer-note", SITE.footerNote);
  setText("js-footer-email", plainEmail());
  setText("js-footer-phone", plainPhone());

  if (Array.isArray(SITE.proof)) {
    setHtml(
      "js-proof",
      SITE.proof
        .map(function (item) {
          return (
            '<div class="proof-item"><dt>' +
            esc(item.label) +
            "</dt><dd>" +
            esc(item.value) +
            "</dd></div>"
          );
        })
        .join("")
    );
  }

  if (Array.isArray(SITE.capabilities)) {
    setHtml(
      "js-capabilities",
      SITE.capabilities
        .map(function (cap) {
          var chips = (cap.chips || [])
            .map(function (c) {
              return '<span class="chip">' + esc(c) + "</span>";
            })
            .join("");
          return (
            '<article class="cap"><h3>' +
            esc(cap.title) +
            "</h3><p>" +
            esc(cap.text) +
            '</p><div class="chip-row">' +
            chips +
            '</div><a class="more" href="' +
            esc(cap.href) +
            '">' +
            esc(cap.linkText) +
            "</a></article>"
          );
        })
        .join("")
    );
  }

  if (Array.isArray(SITE.projects)) {
    setHtml(
      "js-projects",
      SITE.projects
        .map(function (proj) {
          var points = (proj.pointsHtml || [])
            .map(function (p) {
              return "<li>" + p + "</li>";
            })
            .join("");
          var chips = (proj.chips || [])
            .map(function (c) {
              return '<span class="chip">' + esc(c) + "</span>";
            })
            .join("");
          var repo = proj.repo
            ? '<a class="more" href="' + esc(proj.repo) + '">Source on GitHub →</a>'
            : '<span class="more muted">Source not public yet</span>';
          var problem = proj.problem
            ? '<p class="proj-problem"><b>Problem</b>' + esc(proj.problem) + "</p>"
            : "";
          return (
            '<article class="proj' +
            (proj.featured ? " featured" : "") +
            '"><div class="proj-top">' +
            '<a class="proj-title" href="' +
            esc(proj.href) +
            '">' +
            esc(proj.title) +
            '</a><span class="proj-tag">' +
            esc(proj.tag) +
            "</span></div>" +
            problem +
            '<p class="proj-blurb">' +
            esc(proj.blurb) +
            '</p><ul class="proj-points">' +
            points +
            '</ul><div class="chip-row">' +
            chips +
            '</div><div class="proj-links">' +
            '<a class="more" href="' +
            esc(proj.href) +
            '">Read the case study →</a>' +
            repo +
            "</div></article>"
          );
        })
        .join("")
    );
  }

  if (Array.isArray(SITE.experience)) {
    setHtml(
      "js-experience",
      SITE.experience
        .map(function (job) {
          var bullets = (job.bullets || [])
            .map(function (b) {
              return "<li>" + esc(b) + "</li>";
            })
            .join("");
          return (
            '<div class="tl-item"><div class="tl-top">' +
            '<p class="tl-role">' +
            esc(job.role) +
            '</p><p class="tl-date">' +
            esc(job.dates) +
            "</p></div>" +
            '<p class="tl-sub">' +
            esc(job.sub) +
            "</p><ul>" +
            bullets +
            "</ul></div>"
          );
        })
        .join("")
    );
  }

  if (Array.isArray(SITE.skills)) {
    setHtml(
      "js-skills",
      SITE.skills
        .map(function (group) {
          var lead = typeof group.lead === "number" ? group.lead : 0;
          var chips = group.items
            .map(function (item, index) {
              return (
                '<span class="chip' +
                (index < lead ? " primary" : "") +
                '">' +
                esc(item) +
                "</span>"
              );
            })
            .join("");
          return (
            '<div class="stack-group"><h4>' +
            esc(group.label) +
            '</h4><div class="chip-row">' +
            chips +
            "</div></div>"
          );
        })
        .join("")
    );
  }

  if (SITE.education) {
    setHtml(
      "js-education",
      '<div class="edu-card"><div class="edu-top">' +
        '<p class="edu-name">' +
        esc(SITE.education.school) +
        '</p><p class="edu-date">' +
        esc(SITE.education.dates) +
        "</p></div>" +
        '<p class="edu-sub">' +
        esc(SITE.education.detail) +
        '</p><p class="edu-sub">' +
        esc(SITE.education.secondary) +
        "</p></div>"
    );
  }

  if (Array.isArray(SITE.achievements)) {
    setHtml(
      "js-achievements",
      SITE.achievements
        .map(function (item) {
          return (
            '<div class="cert"><b>' + esc(item.title) + "</b>" + esc(item.detail) + "</div>"
          );
        })
        .join("")
    );
  }

  /* -- 3. coding profiles: only render when a real URL exists ------------- */
  var coding = byId("coding-profiles");
  if (coding) {
    var buttons = [];
    if (links.leetcode) {
      buttons.push('<a class="btn" href="' + esc(links.leetcode) + '">LeetCode</a>');
    }
    if (links.gfg) {
      buttons.push('<a class="btn" href="' + esc(links.gfg) + '">GeeksforGeeks</a>');
    }
    if (buttons.length) {
      coding.classList.remove("hidden");
      var slot = coding.querySelector(".coding-links");
      if (slot) slot.innerHTML = buttons.join("");
    } else {
      coding.classList.add("hidden");
    }
  }

  /* -- 4. case-study table of contents ----------------------------------- */
  var toc = byId("toc");
  var articleBody = document.querySelector(".article-body");
  if (toc && articleBody) {
    var headings = Array.prototype.slice.call(articleBody.querySelectorAll("h2"));
    if (headings.length > 2) {
      var items = headings
        .map(function (heading, index) {
          if (!heading.id) heading.id = "section-" + (index + 1);
          return '<li><a href="#' + heading.id + '">' + esc(heading.textContent) + "</a></li>";
        })
        .join("");
      toc.innerHTML =
        '<p class="toc-h">On this page</p><nav aria-label="On this page"><ol>' +
        items +
        "</ol></nav>";
      spy(headings, toc.querySelectorAll("a"));
    }
  }

  /* -- 5. highlight the section being read ------------------------------- */
  function spy(targets, linkNodes) {
    if (!("IntersectionObserver" in window) || !targets.length) return;
    var map = {};
    Array.prototype.forEach.call(linkNodes, function (a) {
      map[a.getAttribute("href").replace("#", "")] = a;
    });
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var active = map[entry.target.id];
          // Sections without a matching link leave the current highlight alone.
          if (!active) return;
          Array.prototype.forEach.call(linkNodes, function (a) {
            a.classList.remove("is-active");
          });
          active.classList.add("is-active");
        });
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );
    targets.forEach(function (target) {
      observer.observe(target);
    });
  }

  var homeSections = document.querySelectorAll("main > section[id]");
  if (homeSections.length) {
    var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    if (navLinks.length) spy(Array.prototype.slice.call(homeSections), navLinks);
  }

  /* -- 6. copy email ----------------------------------------------------- */
  each("[data-copy-email]", function (button) {
    button.addEventListener("click", function () {
      var address = plainEmail();
      if (!address || !navigator.clipboard) return;
      navigator.clipboard.writeText(address).then(function () {
        var original = button.textContent;
        button.textContent = "Copied";
        button.setAttribute("data-copied", "true");
        window.setTimeout(function () {
          button.textContent = original;
          button.removeAttribute("data-copied");
        }, 1600);
      });
    });
  });
})();
