// ===== LEWEBSITE DevTools Blocker =====
// Basic protection against opening browser DevTools

(function () {
  "use strict";

  // Disable right-click
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    return false;
  });

  // Disable common DevTools shortcuts
  document.addEventListener("keydown", function (e) {
    // F12
    if (e.key === "F12") {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "C" || e.key === "c")) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+U (View Source)
    if (e.ctrlKey && (e.key === "U" || e.key === "u")) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+S (Save Page)
    if (e.ctrlKey && (e.key === "S" || e.key === "s")) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  });

  // Detect DevTools by window size difference
  var threshold = 160;
  var devtoolsOpen = false;

  function checkDevTools() {
    var widthThreshold = window.outerWidth - window.innerWidth > threshold;
    var heightThreshold = window.outerHeight - window.innerHeight > threshold;

    if (widthThreshold || heightThreshold) {
      if (!devtoolsOpen) {
        devtoolsOpen = true;
        handleDevToolsOpen();
      }
    } else {
      devtoolsOpen = false;
    }
  }

  function handleDevToolsOpen() {
    // Clear the page and show warning
    document.body.innerHTML = `
      <div style="
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        height:100vh;
        background:#1a1a1a;
        color:#fff;
        font-family:Arial,sans-serif;
        text-align:center;
        padding:20px;
      ">
        <h1 style="color:#f1c40f;margin-bottom:20px;">Access Restricted</h1>
        <p style="font-size:18px;max-width:400px;line-height:1.5;">
          Developer tools are not allowed on this website.<br><br>
          Please close DevTools and refresh the page.
        </p>
      </div>
    `;
  }

  // Check every 500ms
  setInterval(checkDevTools, 500);

  // Also try debugger detection (works in some browsers)
  setInterval(function () {
    var start = performance.now();
    debugger;
    var end = performance.now();
    if (end - start > 100) {
      handleDevToolsOpen();
    }
  }, 1000);

})();