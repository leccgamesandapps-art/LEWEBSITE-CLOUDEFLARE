// ===== LEWEBSITE - Improved DevTools Protection =====
// Stronger client-side protection against inspecting / stealing code

(function () {
  "use strict";

  // ================================
  // 1. Disable right-click
  // ================================
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    return false;
  });

  // ================================
  // 2. Block keyboard shortcuts
  // ================================
  document.addEventListener("keydown", function (e) {
    // F12
    if (e.keyCode === 123 || e.key === "F12") {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+Shift+I / J / C
    if (e.ctrlKey && e.shiftKey && [73, 74, 67].includes(e.keyCode)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode === 85) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+S (Save)
    if (e.ctrlKey && e.keyCode === 83) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+Shift+K (Firefox Console)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 75) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, true);

  // ================================
  // 3. Show warning screen
  // ================================
  function showWarning() {
    document.documentElement.innerHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Access Restricted</title>
        <style>
          body {
            margin: 0;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: #111;
            color: #fff;
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
          }
          h1 {
            color: #f1c40f;
            font-size: 28px;
            margin-bottom: 20px;
          }
          p {
            font-size: 16px;
            max-width: 420px;
            line-height: 1.6;
            color: #ccc;
          }
          .note {
            margin-top: 30px;
            font-size: 13px;
            color: #888;
          }
        </style>
      </head>
      <body>
        <h1>Access Restricted</h1>
        <p>
          Developer tools are not allowed on this website.<br><br>
          This site and its content are protected by copyright.<br>
          Please close DevTools and refresh the page.
        </p>
        <p class="note">LEWEBSITE © 2026 • All Rights Reserved</p>
      </body>
      </html>
    `;
  }

  // ================================
  // 4. Detect DevTools by size
  // ================================
  var threshold = 160;
  var alreadyBlocked = false;

  function checkSize() {
    var widthDiff = window.outerWidth - window.innerWidth > threshold;
    var heightDiff = window.outerHeight - window.innerHeight > threshold;

    if ((widthDiff || heightDiff) && !alreadyBlocked) {
      alreadyBlocked = true;
      showWarning();
    }
  }

  setInterval(checkSize, 400);

  // ================================
  // 5. Debugger detection
  // ================================
  setInterval(function () {
    var start = performance.now();
    debugger;
    if (performance.now() - start > 100 && !alreadyBlocked) {
      alreadyBlocked = true;
      showWarning();
    }
  }, 1200);

  // ================================
  // 6. Console detection (basic)
  // ================================
  var element = new Image();
  Object.defineProperty(element, "id", {
    get: function () {
      if (!alreadyBlocked) {
        alreadyBlocked = true;
        showWarning();
      }
    }
  });

  setInterval(function () {
    console.log(element);
    console.clear();
  }, 2000);

  // ================================
  // 7. Disable text selection & drag
  // ================================
  document.addEventListener("selectstart", function (e) {
    e.preventDefault();
    return false;
  });

  document.addEventListener("dragstart", function (e) {
    e.preventDefault();
    return false;
  });

})();