/**
 * Lazy loading of images
 *
 * @param placeholderSrc path to the placeholder
 * @param imageSrc path to the desired image
 * @returns ref of the image src
 */
export default function lazyLoad(placeholderSrc: string, imageSrc: string) {

  const imgSrc = ref(placeholderSrc);

  // Preload image
  if (imageSrc) {
    if (useAppConfig().debug) {
      console.log("Lazy loading image ", imageSrc)
    }

    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      imgSrc.value = img.src; // Update only after the image fully loads
    };
  }

  return imgSrc;
}
