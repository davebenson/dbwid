
export class DbwidPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add(pt) {
    return new DbwidPoint(this.x + pt.x, this.y + pt.y);
  }
  subtract(pt) {
    return new DbwidPoint(this.x - pt.x, this.y - pt.y);
  }
  componentMultiply(pt) {
    return new DbwidPoint(this.x * pt.x, this.y * pt.y);
  }
  componentDivide(pt) {
    return new DbwidPoint(this.x / pt.x, this.y / pt.y);
  }
  addXY(x,y) {
    return new DbwidPoint(this.x + x, this.y + y);
  }
  subtractXY(x,y) {
    return new DbwidPoint(this.x - x, this.y - y);
  }
  componentMultiplyXY(x,y) {
    return new DbwidPoint(this.x * x, this.y * y);
  }
  componentDivideXY(x,y) {
    return new DbwidPoint(this.x / x, this.y / y);
  }
  scale(f) {
    return new DbwidPoint(this.x * f, this.y * f);
  }
  normSquared() {
    return this.x * this.x + this.y * this.y;
  }
  norm() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  normalized() {
    const f = 1 / Math.sqrt(this.x * this.x + this.y * this.y);
    return new DbwidPoint(this.x * f, this.y * f);
  }
  distanceSquared(pt) {
    const dx = pt.x - this.x;
    const dy = pt.y - this.y;
    return dx * dx + dy * dy;
  }
  distance(pt) {
    const dx = pt.x - this.x;
    const dy = pt.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
  cross(pt) {
    return this.x * pt.y - this.y * pt.x;
  }
}
