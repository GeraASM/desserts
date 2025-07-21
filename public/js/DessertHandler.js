var desserts = [];
function whatImage(options) {
    var images = document.querySelectorAll(".desserts__img");
    images.forEach(function (img, index) {
        if (img) {
            if (window.innerWidth < 768) {
                img.src = options[index].image.mobile;
            }
            else if (1024 > window.innerWidth && window.innerWidth >= 768) {
                img.src = options[index].image.tablet;
            }
            else {
                img.src = options[index].image.desktop;
            }
        }
    });
}
document.addEventListener('DOMContentLoaded', function () {
    var dessertsContent = document.getElementById("dessertsContent");
    if (!dessertsContent)
        return;
    fetch("/desserts.json")
        .then(function (response) {
        if (!response.ok) {
            throw new Error("Not found dresserts");
        }
        return response.json();
    })
        .then(function (data) {
        desserts = data;
        data.forEach(function (dessert) {
            var section = document.createElement("section");
            section.className = "desserts__option";
            section.innerHTML = "\n          <figure class=\"desserts__picture relative\">\n              <img class=\"desserts__img w-full rounded-[8px]\" src=\"".concat(dessert.image.mobile, "\" alt=\"").concat(dessert.title, "\">\n              <div class=\"desserts__add-remove flex items-center justify-center gap-2 border-[1px] border-rose-400 bg-white rounded-4xl w-[160px] py-3 absolute bottom-0 left-[50%] -translate-x-[50%] translate-y-[50%]\">\n                  <img src=\"/images/icon-add-to-cart.svg\" alt=\"Add Cart\">\n                  <p class=\"desserts__text-add font-semibold text-[14px] text-rose-900\">Add to Cart</p>\n              </div>\n          </figure>\n          <div class=\"desserts__information mt-[44px]\">\n              <h4 class=\"desserts__subtitle text-[14px] font-normal text-rose-500\">").concat(dessert.subtitle, "</h4>\n              <h3 class=\"desserts__title font-semibold text-[16px] text-rose-900\">").concat(dessert.title, "</h3>\n              <h3 class=\"desserts__price font-semibold text-[16px] text-red\">$").concat(dessert.price, "</h3>\n          </div>\n        ");
            dessertsContent.appendChild(section);
        });
        // Llama a whatImage después de renderizar
        whatImage(desserts);
        // Solo agrega el listener ahora
        window.addEventListener("resize", function () { return whatImage(desserts); });
    })
        .catch(function (err) {
        console.error("Error loading desserts:", err);
    });
});
