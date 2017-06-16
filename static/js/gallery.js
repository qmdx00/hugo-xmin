(function () {
  "use strict";

  var activeImage = null;

  function getCaption(image) {
    var figure = image.closest("figure");
    var caption = figure && figure.querySelector("figcaption");
    return caption ? caption.textContent.trim() : image.alt.trim();
  }

  function createLightbox() {
    var lightbox = document.createElement("div");
    lightbox.className = "gallery-lightbox";
    lightbox.hidden = true;
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Image preview");
    lightbox.innerHTML = [
      '<button class="gallery-lightbox-close" type="button" aria-label="Close image preview">&times;</button>',
      '<img class="gallery-lightbox-image" alt="">',
      '<p class="gallery-lightbox-caption"></p>'
    ].join("");
    document.body.appendChild(lightbox);
    return lightbox;
  }

  function initGalleryLightbox() {
    var images = Array.prototype.slice.call(document.querySelectorAll(".gallery img"));

    if (!images.length) {
      return;
    }

    var lightbox = createLightbox();
    var preview = lightbox.querySelector(".gallery-lightbox-image");
    var caption = lightbox.querySelector(".gallery-lightbox-caption");
    var closeButton = lightbox.querySelector(".gallery-lightbox-close");

    function closeLightbox() {
      lightbox.hidden = true;
      preview.removeAttribute("src");
      document.body.classList.remove("gallery-lightbox-open");

      if (activeImage) {
        activeImage.focus();
        activeImage = null;
      }
    }

    function openImage(image) {
      var text = getCaption(image);
      activeImage = image;
      preview.src = image.currentSrc || image.src;
      preview.alt = image.alt || "";
      caption.textContent = text;
      caption.hidden = !text;
      lightbox.hidden = false;
      document.body.classList.add("gallery-lightbox-open");
      closeButton.focus();
    }

    images.forEach(function (image) {
      image.tabIndex = 0;
      image.setAttribute("role", "button");
      image.setAttribute("aria-label", image.alt ? "Open image preview: " + image.alt : "Open image preview");

      image.addEventListener("click", function () {
        openImage(image);
      });

      image.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openImage(image);
        }
      });
    });

    closeButton.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !lightbox.hidden) {
        closeLightbox();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGalleryLightbox);
  } else {
    initGalleryLightbox();
  }
})();
