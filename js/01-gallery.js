import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const gallery = document.querySelector(".gallery");

const markup = galleryItems
  .map(
    ({ preview, description, original }) => `<li class="gallery__item">
        <a href="" class="gallery__link"
          ><img
            src="${preview}"
            alt="${description}"
            class="gallery__image"
            data-source="${original}"
        /></a>
      </li>`
  )
  .join("");

gallery.insertAdjacentHTML("beforeend", markup);

gallery.addEventListener("click", imageClickHandler);

function imageClickHandler(e) {
  e.preventDefault();
  if (e.target.tagName !== "IMG") return;

  const instance = basicLightbox.create(
    `<img
            src="${e.target.dataset.source}"
            class="gallery__image__original"
        />
`,
    {
      onShow: () => {
        document.addEventListener("keydown", escapeKeyHandler);
      },
      onClose: () => {
        document.removeEventListener("keydown", escapeKeyHandler);
      },
    }
  );
  instance.show();

  function escapeKeyHandler(e) {
    if (e.code === "Escape") {
      instance.close();
    }
  }
}
