
export class DbwidRect {
  constructor(x, y, width, height) {
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
  }
  toString() { return `(${this._x},${this._y})x(${this._width,this._height})`; }
  get x() { return this._x; }
  get y() { return this._y; }
  get width() { return this._width; }
  get height() { return this._height; }
  get left() { return this._left; }
  get top() { return this._top; }
  get right() { return this._left + this._x; }
  get bottom() { return this._top + this._y; }
  get centerX() { return this._left + this._x / 2; }
  get centerY() { return this._top + this._y / 2; }

  get topLeft() { return new DbwidRect(this._x, this._y); }
  get topRight() { return new DbwidRect(this._x + this._width, this._y); }
  get bottomLeft() { return new DbwidRect(this._x, this._y + this._height); }
  get bottomRight() { return new DbwidRect(this._x + this._width, this._y + this._height); }
  get center() { return new DbwidRect(this._x + this._width / 2, this._y + this._height / 2); }

  get area() { return this._width * this._height; }

  fromNormalizedX(x) { return this._left + x * this._width; }
  fromNormalizedY(y) { return this._top + y * this._height; }
  fromNormalized(pt) { return new DbwidPoint(
    this._left + pt.x * this._width,
    this._top + pt.y * this._height
  ); }

  toNormalizedX(x) { return (x - this._left) / this._width; }
  toNormalizedY(y) { return (y - this._top) / this._height; }
  toNormalized(pt) { return new DbwidPoint(
    (pt.x - this._left) / this._width,
    (pt.y - this._top) / this._height
  ); }

  alignXY(x,y, alignWith, alignWithX, alignWithY) {
    return new DbwidRect(
      alignWith.x + alignWith.width * alignWithX - this._width * x,
      alignWith.y + alignWith.height * alignWithY - this._height * y,
      this._width,
      this._height
    );
  }
  insetXY(x,y) {
    return new DbwidRect(
      this._x + x,
      this._y + y,
      this._width - x * 2,
      this._height - y * 2
    );
  }
}

