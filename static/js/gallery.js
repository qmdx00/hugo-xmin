(function () {
  function closeLightbox(lightbox) {
    lightbox.hidden = true;
    document.body.classList.remove("gallery-lightbox-open");
  }

  function createLightbox() {
    var lightbox = document.createElement("div");
    lightbox.className = "gallery-lightbox";
    lightbox.hidden = true;
    lightbox.innerHTML = [
      '<button class="gallery-lightbox-close" type="button" aria-label="Close image preview">&times;</button>',
      '<img class="gallery-lightbox-image" alt="">',
      '<p class="gallery-lightbox-caption"></p>'
    ].join("");

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox || event.target.classList.contains("gallery-lightbox-close")) {
        closeLightbox(lightbox);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !lightbox.hidden) {
        closeLightbox(lightbox);
      }
    });

    document.body.appendChild(lightbox);
    return lightbox;
  }

  function initGalleryLightbox() {
    var galleries = document.querySelectorAll(".gallery");
    var images = document.querySelectorAll(".gallery img");

    if (!images.length) {
      return;
    }

    var lightbox = createLightbox();
    var preview = lightbox.querySelector(".gallery-lightbox-image");
    var caption = lightbox.querySelector(".gallery-lightbox-caption");

    function openImage(image) {
      preview.src = image.currentSrc || image.src;
      preview.alt = image.alt || "";
      caption.textContent = image.alt || "";
      caption.hidden = !image.alt;
      lightbox.hidden = false;
      document.body.classList.add("gallery-lightbox-open");
      lightbox.querySelector(".gallery-lightbox-close").focus();
    }

    galleries.forEach(function (gallery) {
      gallery.addEventListener("click", function (event) {
        var figure = event.target.closest("figure");
        var image = event.target.closest("img") || (figure && figure.querySelector("img"));

        if (image && gallery.contains(image)) {
          openImage(image);
        }
      });
    });

    images.forEach(function (image) {
      image.tabIndex = 0;
      image.setAttribute("role", "button");
      image.setAttribute("aria-label", "Open image preview");

      image.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openImage(image);
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGalleryLightbox);
  } else {
    initGalleryLightbox();
  }
})();
