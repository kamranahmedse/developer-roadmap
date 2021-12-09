import {
  getRGBFromDecimalColor,
  makeSVGElement,
  removeSortingInfo,
} from './utils';
import {
  ARROW_WIDTH,
  BORDER_WIDTH,
  DEFAULT_COLORS,
  RECT_RADIUS,
} from './constants';

export class Renderer {
  private svgRoot: SVGElement;
  private readonly fontFamily: string;
  private canvasRenderingContext2D: CanvasRenderingContext2D;

  constructor(svgRoot: SVGElement, fontFamily: string) {
    this.svgRoot = svgRoot;
    this.fontFamily = fontFamily;
    this.canvasRenderingContext2D = document
      .createElement('canvas')
      .getContext('2d')!;
  }

  render(control: any, container: any) {
    let typeID = control.typeID;
    if (typeID in this) {
      (this as any)[typeID](control, container);
    } else {
      console.log(`'${typeID}' control type not implemented`);
    }
  }

  parseColor(color: any, defaultColor: any) {
    return color === undefined
      ? `rgb(${defaultColor})`
      : getRGBFromDecimalColor(color);
  }

  parseFontProperties(control: any) {
    return {
      style: control.properties?.italic ? 'italic' : 'normal',
      weight: control.properties?.bold ? 'bold' : 'normal',
      size: control.properties?.size ? control.properties.size + 'px' : '13px',
      family: this.fontFamily,
    };
  }

  measureText(text: string, font: string) {
    this.canvasRenderingContext2D.font = font;

    return this.canvasRenderingContext2D.measureText(text);
  }

  drawRectangle(control: any, container: HTMLElement | undefined) {
    makeSVGElement(
      'rect',
      {
        x: parseInt(control.x) + BORDER_WIDTH / 2,
        y: parseInt(control.y) + BORDER_WIDTH / 2,
        width: parseInt(control.w ?? control.measuredW) - BORDER_WIDTH,
        height: parseInt(control.h ?? control.measuredH) - BORDER_WIDTH,
        rx: RECT_RADIUS,
        fill: this.parseColor(control.properties?.color, '255,255,255'),
        'fill-opacity': control.properties?.backgroundAlpha ?? 1,
        stroke: this.parseColor(control.properties?.borderColor, '0,0,0'),
        'stroke-width': BORDER_WIDTH,
      },
      container
    );
  }

  addText(
    control: {
      properties: { text: string };
      x: string;
      y: string;
      w: any;
      measuredW: any;
      measuredH: number;
    },
    container: HTMLElement | undefined,
    textColor: string,
    align: string
  ) {
    let text = control.properties.text ?? '';
    let x = parseInt(control.x);
    let y = parseInt(control.y);

    let font = this.parseFontProperties(control);
    let textMetrics = this.measureText(
      text,
      `${font.style} ${font.weight} ${font.size} ${font.family}`
    );

    let textX =
      align === 'center'
        ? x + (control.w ?? control.measuredW) / 2 - textMetrics.width / 2
        : x;
    let textY =
      y + control.measuredH / 2 + textMetrics.actualBoundingBoxAscent / 2;

    let textElement = makeSVGElement(
      'text',
      {
        x: textX,
        y: textY,
        fill: textColor,
        'font-style': font.style,
        'font-weight': font.weight,
        'font-size': font.size,
      },
      container
    );

    if (!text.includes('{color:')) {
      let tspan = makeSVGElement('tspan', {}, textElement);
      tspan.textContent = text;

      return;
    }

    let split = text.split(/{color:|{color}/);
    split.forEach((str) => {
      if (str.includes('}')) {
        let [color, textPart] = str.split('}');

        if (!color.startsWith('#')) {
          let index = parseInt(color.slice(-1));
          color = isNaN(index)
            ? DEFAULT_COLORS[color][0]
            : DEFAULT_COLORS[color][index];
        }

        let tspan = makeSVGElement('tspan', { fill: color }, textElement);
        tspan.textContent = textPart;
      } else {
        let tspan = makeSVGElement('tspan', {}, textElement);
        tspan.textContent = str;
      }
    });
  }

  TextArea(control: any, container: HTMLElement | undefined) {
    this.drawRectangle(control, container);
  }

  Canvas(control: any, container: HTMLElement | undefined) {
    this.drawRectangle(control, container);
  }

  Label(control: any, container: HTMLElement | undefined) {
    this.addText(
      control,
      container,
      this.parseColor(control.properties?.color, '0,0,0'),
      'left'
    );
  }

  TextInput(control: any, container: any) {
    this.drawRectangle(control, container);

    this.addText(
      control,
      container,
      this.parseColor(control.properties?.textColor, '0,0,0'),
      'center'
    );
  }

  Arrow(control: any, container: any) {
    let x = parseInt(control.x);
    let y = parseInt(control.y);
    let { p0, p1, p2 } = control.properties;

    let lineDash;
    if (control.properties?.stroke === 'dotted') lineDash = '0.8 12';
    else if (control.properties?.stroke === 'dashed') lineDash = '28 46';

    let xVector = { x: (p2.x - p0.x) * p1.x, y: (p2.y - p0.y) * p1.x };

    makeSVGElement(
      'path',
      {
        d: `M${x + p0.x} ${y + p0.y}Q${
          x + p0.x + xVector.x + xVector.y * p1.y * 3.6
        } ${y + p0.y + xVector.y + -xVector.x * p1.y * 3.6} ${x + p2.x} ${
          y + p2.y
        }`,
        fill: 'none',
        stroke: this.parseColor(control.properties?.color, '0,0,0'),
        'stroke-width': ARROW_WIDTH,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-dasharray': lineDash,
      },
      container
    );
  }

  Icon(control: any, container: any) {
    let x = parseInt(control.x);
    let y = parseInt(control.y);
    let radius = 10;

    makeSVGElement(
      'circle',
      {
        cx: x + radius,
        cy: y + radius,
        r: radius,
        fill: this.parseColor(control.properties?.color, '0,0,0'),
      },
      container
    );

    if (control.properties.icon.ID !== 'check-circle') {
      return;
    }

    makeSVGElement(
      'path',
      {
        d: `M${x + 4.5} ${y + radius}L${x + 8.5} ${y + radius + 4} ${x + 15} ${
          y + radius - 2.5
        }`,
        fill: 'none',
        stroke: '#fff',
        'stroke-width': 3.5,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
      },
      container
    );
  }

  HRule(control: any, container: any) {
    let x = parseInt(control.x);
    let y = parseInt(control.y);

    let lineDash;
    if (control.properties?.stroke === 'dotted') lineDash = '0.8, 8';
    else if (control.properties?.stroke === 'dashed') lineDash = '18, 30';

    makeSVGElement(
      'path',
      {
        d: `M${x} ${y}L${x + parseInt(control.w ?? control.measuredW)} ${y}`,
        fill: 'none',
        stroke: this.parseColor(control.properties?.color, '0,0,0'),
        'stroke-width': BORDER_WIDTH,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-dasharray': lineDash,
      },
      container
    );
  }

  __group__(control: any, container: any) {
    const controlName = control?.properties?.controlName;
    const groupId = removeSortingInfo(controlName);
    const isDone = localStorage.getItem(groupId) === 'done';

    let group = makeSVGElement(
      'g',
      {
        ...(controlName
          ? {
              class: `clickable-group ${isDone ? 'done' : ''}`,
              'data-group-id': controlName,
            }
          : {}),
      },
      container
    );

    control.children.controls.control
      .sort((a: any, b: any) => {
        return a.zOrder - b.zOrder;
      })
      .forEach((childControl: any) => {
        childControl.x = parseInt(childControl.x, 10) + parseInt(control.x, 10);
        childControl.y = parseInt(childControl.y, 10) + parseInt(control.y, 10);

        this.render(childControl, group);
      });
  }
}
