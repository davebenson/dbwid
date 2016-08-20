// currently implemented as a simple bounding rectangle.
// todo: switch to an array of disjoint bounding rectangles?

export class MutableRegion {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.bounds = null;
  }
  addRect(x,y,w,h) {
    if (this.bounds === null) {
      this.bounds = {
        min_x: x,
        min_y: y,
        max_x: x + w,
        max_y: y + h
      };
    } else {
      if (x < this.bounds.min_x) this.bounds.min_x = x;
      if (y < this.bounds.min_y) this.bounds.min_y = y;
      if (x + w < this.bounds.max_x) this.bounds.max_x = x + w;
      if (y + h < this.bounds.max_y) this.bounds.max_y = y + h;
    }
  }
  getRegionAsBoxes() {
    if (this.bounds === null)
      return [];
    else {
      const b = this.bounds;
      const width = b.max_x - b.min_x;
      const height = b.max_y - b.min_y;
      const rect = new DbwidRect(b.min_x, b.min_y, width, height);
      return [rect];
    }
  }
}
