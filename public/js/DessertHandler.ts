type Option = {
  mobile: string;
  tablet: string;
  desktop: string;
}
type Dessert = {
  title: string;
  subtitle: string;
  price: number;
  image: Option;
}

let desserts: Dessert[] = [];
function whatImage(options: Dessert[]) {
  let images = document.querySelectorAll<HTMLImageElement>(".desserts__img");
  images.forEach((img, index) => {
    if (img) {
      if (window.innerWidth < 768) {
          img.src = options[index].image.mobile;
      } else if (1024 > window.innerWidth && window.innerWidth >= 768 ) {
          img.src = options[index].image.tablet;
      } else {
          img.src = options[index].image.desktop;
      }
    }
    
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const dessertsContent = document.getElementById("dessertsContent");

  if (!dessertsContent) return;

  fetch("/desserts.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Not found dresserts");
      }
      return response.json();
    })
    .then((data) => {
      desserts = data;
      data.forEach((dessert: any) => {
        const section = document.createElement("section");
        section.className = "desserts__option";
        section.innerHTML = `
          <figure class="desserts__picture relative">
              <img class="desserts__img w-full rounded-[8px]" src="${dessert.image.mobile}" alt="${dessert.title}">
              <div class="desserts__add-remove flex items-center justify-center gap-2 border-[1px] border-rose-400 bg-white rounded-4xl w-[160px] py-3 absolute bottom-0 left-[50%] -translate-x-[50%] translate-y-[50%]">
                  <img src="/images/icon-add-to-cart.svg" alt="Add Cart">
                  <p class="desserts__text-add font-semibold text-[14px] text-rose-900">Add to Cart</p>
              </div>
          </figure>
          <div class="desserts__information mt-[44px]">
              <h4 class="desserts__subtitle text-[14px] font-normal text-rose-500">${dessert.subtitle}</h4>
              <h3 class="desserts__title font-semibold text-[16px] text-rose-900">${dessert.title}</h3>
              <h3 class="desserts__price font-semibold text-[16px] text-red">$${dessert.price}</h3>
          </div>
        `;
        dessertsContent.appendChild(section);
      });
      // Llama a whatImage después de renderizar
      whatImage(desserts);

      // Solo agrega el listener ahora
      window.addEventListener("resize", () => whatImage(desserts));
    })
    .catch((err) => {
      console.error("Error loading desserts:", err);
    });
});
