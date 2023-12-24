function getNameFolder(image) {
   let idx = image.indexOf("-");
   image = image.includes(" ")
      ? image.substring(0, idx).replaceAll(" ", "-")
      : image.substring(0, idx);
   return image;
}

module.exports = getNameFolder;
