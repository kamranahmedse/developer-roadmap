type DownloadImageProps = {
  url: string;
  name: string;
  extension?: 'png' | 'jpg';
  scale?: number;
};

export async function downloadImage({
  url,
  name,
  extension = 'png',
  scale = 1,
}: DownloadImageProps) {
  try {
    const res = await fetch(url);
    const svg = await res.text();

    const image = `data:image/svg+xml;base64,${window.btoa(svg)}`;
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      const png = canvas.toDataURL('image/png', 1.0); // Increase the quality by setting a higher value (0.0 - 1.0)
      const a = document.createElement('a');
      a.href = png;
      a.download = `${name}.${extension}`;
      a.click();
    };
  } catch (error) {
    alert('Error downloading image');
  }
}

export async function downloadGeneratedRoadmapImage(
  name: string,
  node: HTMLElement,
) {
  // Append a watermark to the bottom right of the image
  const watermark = document.createElement('div');
  watermark.className = 'flex justify-end absolute top-4 right-4 gap-2';
  watermark.innerHTML = `
    <span
      class='rounded-md bg-black py-2 px-2 text-white'
    >
      roadmap.sh
    </span>
  `;
  node.insertAdjacentElement('afterbegin', watermark);

  const domtoimage = (await import('dom-to-image')).default;
  if (!domtoimage) {
    throw new Error('Unable to download image');
  }

  const dataUrl = await domtoimage.toJpeg(node, {
    bgcolor: 'white',
    quality: 1,
  });
  node?.removeChild(watermark);
  const link = document.createElement('a');
  link.download = `${name}-roadmap.jpg`;
  link.href = dataUrl;
  link.click();
}
