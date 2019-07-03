module.exports = (temp, show) => {
  let output = temp.replace(/{%TITLE%}/g, show.title);
  output = output.replace(/{%IMAGE%}/g, show.image);
  output = output.replace(/{%GENRES%}/g, show.genres);
  output = output.replace(/{%RELEASE-DATE%}/g, show.releasedate);
  output = output.replace(/{%STARS%}/g, show.stars);
  output = output.replace(/{%PRODUCER%}/g, show.producer);
  output = output.replace(/{%DESCRIPTION%}/g, show.description);
  output = output.replace(/{%ID%}/g, show.id);

  return output;
};
