(function(){
    const grid = document.querySelector(".drink-grid");
    let drinks = Array.from(grid.querySelectorAll(".drink"));
    const correctIndex = "4";
    const popup = document.getElementById("popup");
    const popupCodeEl = document.getElementById("popupCode");

    function handleDrinkClick(target) {
        const el = target.closest(".drink");
        if (!el) return;
        const idx = el.dataset.index;
        if (idx === correctIndex) {
            showCode();
        } else {
            shuffleDrinks();
        }
    }

    grid.addEventListener("click", function(e){
        handleDrinkClick(e.target);
    });

    grid.addEventListener("keydown", function(e){
        if (e.key === "Enter" || e.key === " ") {
            handleDrinkClick(e.target);
            e.preventDefault();
        }
    });

    function shuffleDrinks() {
        for (let i = drinks.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [drinks[i], drinks[j]] = [drinks[j], drinks[i]];
        }
        grid.innerHTML = "";
        drinks.forEach(d => grid.appendChild(d));
    }

    window.showCode = function() {
        popupCodeEl.textContent = "425";
        popup.style.display = "flex";
        popup.setAttribute("aria-hidden", "false");
    };
    window.closePopup = function() {
        popup.style.display = "none";
        popup.setAttribute("aria-hidden", "true");
    };

    document.getElementById("submitBtn").addEventListener("click", function(){
        const correctCode = "425";
        const user = document.getElementById("codeInput").value.trim();
        const msg = document.getElementById("codeMessage");
        if (user === correctCode) {
            window.location.href = "blackJack.html";
        } else {
            msg.textContent = "Incorrect code. Try again.";
            msg.style.color = "red";
        }
    });

    const observer = new MutationObserver(() => { drinks = Array.from(grid.querySelectorAll(".drink")); });
    observer.observe(grid, { childList: true });
})();