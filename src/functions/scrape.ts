export const getUserDisplayName = async () => {
  let data = fetchDetail() || {};
  return JSON.stringify(data);
};



function fetchDetail() {
  const overviewSection = document.querySelector<HTMLElement>(
    ".artdeco-card.org-page-details-module__card-spacing"
  );

  if (!overviewSection) {
    console.error("Overview section not found.");
    return;
  }

  const detailsObject: Record<string, string> = {};
  let logoContainer = document.querySelector<HTMLElement>(
    ".org-top-card-primary-content__logo-container"
  );

  if (logoContainer) {
    let logoImage = logoContainer.querySelector<HTMLImageElement>("img");
    if (logoImage) {
      let imageUrl = logoImage.getAttribute("src");
      detailsObject.img = imageUrl || "";
    } else {
    }
  } else {
  }

  const headings = overviewSection.querySelectorAll<HTMLElement>(
    ".text-heading-medium,.text-heading-xlarge"
  );

  const h1Element = document.querySelector<HTMLElement>(
    ".org-top-card-summary__title"
  );

  if (h1Element) {
    const h1Value = h1Element.textContent?.trim() || "";
    detailsObject.name = h1Value;
  } else {
    console.error("h1 element not found");
  }

  headings.forEach((heading, index) => {
    const headingText = heading.textContent?.trim() || "";
    const bodyElement = heading.nextElementSibling;

    if (bodyElement && bodyElement.classList.contains("text-body-medium")) {
      const bodyText = bodyElement.textContent?.trim() || "";
      detailsObject[headingText] = bodyText;
    }
  });

  // If you need to return the detailsObject, you can do so
  return detailsObject;
}
