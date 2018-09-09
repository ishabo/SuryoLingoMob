const colors = {
  // white
  white: '#ffffff',
  snow: '#fffafa',
  whiteSmoke: '#f5f5f5',
  azure: '#f0ffff',

  // black
  lightBlack: '#1C1C1C',
  black: '#000000',

  // red
  lightRed: '#E77979',
  red: '#DB3333',
  crimson: '#8C1818',

  // green
  lightGreen: '#C8EA6C',
  green: '#8AD61F',
  darkGreen: '#5F9315',

  // blue
  lightBlue: '#9fd2f2',
  blue: '#457FDE',
  darkBlue: '#1F55AD',
  violet: '#ee82ee',
  blueViolet: '#8a2be2',
  facebook: '#3B5998',
  // gray
  lightGray: '#D9D9D9',
  gray: '#B0B0B0',
  darkGray: '#8C8C8C',

  // yellow
  lemonChiffon: '#fffacd',
  darkYellow: '#ffcc33',
  lightYellow: '#ffe7a0',
  yellow: '#edc549',

  // orange
  orange: '#D15A00'

  // white: '#ffffff',
  // snow: '#fffafa',
  // whitesmoke: '#f5f5f5',
  // aliceblue: '#f0f8ff',
  // azure: '#f0ffff',
  // beige: '#f5f5dc',
  // antiquewhite: '#faebd7',
  // blanchedalmond: '#ffebcd',
  // bisque: '#ffe4c4',
  // gainsboro: '#dcdcdc',
  // floralwhite: '#fffaf0',
  // ghostwhite: '#f8f8ff',
  // aquamarine: '#7fffd4',
  // aqua: '#00ffff',
  // cyan: '#00ffff',
  // cornflowerblue: '#6495ed',
  // blue: '#0000ff',
  // darkslateblue: '#483d8b',
  // darkblue: '#00008b',
  // blueviolet: '#8a2be2',
  // darkmagenta: '#8b008b',
  // brown: '#a52a2a',
  // crimson: '#dc143c',
  // darkred: '#8b0000',
  // burlywood: '#deb887',
  // cadetblue: '#5f9ea0',
  // chartreuse: '#7fff00',
  // chocolate: '#d2691e',
  // coral: '#ff7f50',
  // cornsilk: '#fff8dc',
  // dodgerblue: '#1e90ff',
  // darkcyan: '#008b8b',
  // darkgoldenrod: '#b8860b',
  // darkgray: '#a9a9a9',
  // darkgreen: '#006400',
  // darkgrey: '#a9a9a9',
  // darkkhaki: '#bdb76b',
  // darkolivegreen: '#556b2f',
  // lightcoral: '#f08080',
  // darkorange: '#ff8c00',
  // fuchsia: '#ff00ff',
  // deeppink: '#ff1493',
  // darkorchid: '#9932cc',
  // darkviolet: '#9400d3',
  // firebrick: '#b22222',
  // darksalmon: '#e9967a',
  // darkseagreen: '#8fbc8f',
  // darkslategray: '#2f4f4f',
  // darkslategrey: '#2f4f4f',
  // darkturquoise: '#00ced1',
  // dimgray: '#696969',
  // dimgrey: '#696969',
  // forestgreen: '#228b22',
  // gold: '#ffd700',
  // goldenrod: '#daa520',
  // gray: '#808080',
  // green: '#008000',
  // greenyellow: '#adff2f',
  // grey: '#808080',
  // honeydew: '#f0fff0',
  // hotpink: '#ff69b4',
  // indianred: '#cd5c5c',
  // indigo: '#4b0082',
  // ivory: '#fffff0',
  // khaki: '#f0e68c',
  // lavender: '#e6e6fa',
  // lavenderblush: '#fff0f5',
  // lawngreen: '#7cfc00',
  // lemonchiffon: '#fffacd',
  // lightblue: '#add8e6',
  // lightcyan: '#e0ffff',
  // lightgoldenrodyellow: '#fafad2',
  // lightgray: '#d3d3d3',
  // lightgreen: '#90ee90',
  // lightgrey: '#d3d3d3',
  // lightpink: '#ffb6c1',
  // lightsalmon: '#ffa07a',
  // lightseagreen: '#20b2aa',
  // lightskyblue: '#87cefa',
  // lightslategray: '#778899',
  // lightslategrey: '#778899',
  // lightsteelblue: '#b0c4de',
  // lightyellow: '#ffffe0',
  // lime: '#00ff00',
  // limegreen: '#32cd32',
  // linen: '#faf0e6',
  // magenta: '#ff00ff',
  // maroon: '#800000',
  // mediumaquamarine: '#66cdaa',
  // mediumblue: '#0000cd',
  // violet: '#ee82ee',
  // mediumorchid: '#ba55d3',
  // mediumpurple: '#9370db',
  // mediumseagreen: '#3cb371',
  // mediumslateblue: '#7b68ee',
  // mediumspringgreen: '#00fa9a',
  // mediumturquoise: '#48d1cc',
  // mediumvioletred: '#c71585',
  // midnightblue: '#191970',
  // mintcream: '#f5fffa',
  // mistyrose: '#ffe4e1',
  // moccasin: '#ffe4b5',
  // navajowhite: '#ffdead',
  // navy: '#000080',
  // oldlace: '#fdf5e6',
  // olive: '#808000',
  // olivedrab: '#6b8e23',
  // orange: '#ffa500',
  // orangered: '#ff4500',
  // orchid: '#da70d6',
  // palegoldenrod: '#eee8aa',
  // palegreen: '#98fb98',
  // paleturquoise: '#afeeee',
  // palevioletred: '#db7093',
  // papayawhip: '#ffefd5',
  // peachpuff: '#ffdab9',
  // peru: '#cd853f',
  // pink: '#ffc0cb',
  // plum: '#dda0dd',
  // powderblue: '#b0e0e6',
  // purple: '#800080',
  // rebeccapurple: '#663399',
  // red: '#ff0000',
  // rosybrown: '#bc8f8f',
  // royalblue: '#4169e1',
  // saddlebrown: '#8b4513',
  // salmon: '#fa8072',
  // sandybrown: '#f4a460',
  // seagreen: '#2e8b57',
  // seashell: '#fff5ee',
  // sienna: '#a0522d',
  // silver: '#c0c0c0',
  // skyblue: '#87ceeb',
  // slateblue: '#6a5acd',
  // slategray: '#708090',
  // slategrey: '#708090',
  // springgreen: '#00ff7f',
  // steelblue: '#4682b4',
  // tan: '#d2b48c',
  // teal: '#008080',
  // thistle: '#d8bfd8',
  // tomato: '#ff6347',
  // turquoise: '#40e0d0',
  // wheat: '#f5deb3',
  // yellow: '#ffff00',
  // yellowgreen: '#9acd32',
  // black: '#000000'
};

export default colors;
