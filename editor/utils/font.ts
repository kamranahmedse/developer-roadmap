type LoadFont = (options: {
  fontFamily: string;
  fontURL: string;
}) => Promise<void>;

export const loadFont: LoadFont = async (options) => {
  const { fontFamily, fontURL } = options;

  const font = new FontFace(fontFamily!, `url(${fontURL})`);
  await font.load();

  if (document.fonts) {
    document?.fonts?.add(font);
  }
};
