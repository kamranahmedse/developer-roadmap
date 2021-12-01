import { Renderer } from './renderer';
import { makeSVGElement } from './utils';

/**
 * @param {Object} wireframe - Wireframe JSON
 * @param {Object} options - Config object
 * @param {number} [options.padding=5] - Padding for the SVG element
 * @param {string} [options.fontFamily=balsamiq]
 * @param {string} [options.fontURL=https://fonts.gstatic.com/s/balsamiqsans/v3/P5sEzZiAbNrN8SB3lQQX7Pncwd4XIA.woff2]
 * @returns {Promise} Resolves SVG element
 */
export async function wireframeJSONToSVG(
  wireframe: any,
  options: { padding?: number; fontFamily?: string; fontURL?: string } = {}
) {
  options = {
    padding: 5,
    fontFamily: 'balsamiq',
    fontURL: '/fonts/balsamiq.woff2',
    ...options,
  };

  if (options.fontURL) {
    let font = new FontFace(options.fontFamily!, `url(${options.fontURL})`);
    await font.load();
    document.fonts.add(font);
  }

  let mockup = wireframe.mockup;

  let x = mockup.measuredW - mockup.mockupW - options.padding!;
  let y = mockup.measuredH - mockup.mockupH - options.padding!;
  let width = parseInt(mockup.mockupW) + options.padding! * 2;
  let height = parseInt(mockup.mockupH) + options.padding! * 2;

  let svgRoot = makeSVGElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
    viewBox: `${x} ${y} ${width} ${height}`,
    style: 'font-family: balsamiq',
  });

  let renderer = new Renderer(svgRoot, options.fontFamily!);

  mockup.controls.control
    .sort((a: any, b: any) => {
      return a.zOrder - b.zOrder;
    })
    .forEach((control: any) => {
      renderer.render(control, svgRoot);
    });

  return svgRoot;
}
