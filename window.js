
import DbwidWidget from 'widget.js';

export class DbwidWindow extends DbwidWidget {
  constructor(canvas) {
    this.canvas = canvas;
    const width = canvas.width;
    const height = canvas.height;
    super(new DbwidRect(0, 0, canvas.width, canvas.height));
    this.needsDisplayQuadtree = null;
  }

  quadnodeAddRect(x, y, w, h, r, quadtree) {
    if (quadtree === null)
      return r;
    if (quadtree instanceof DbwidRect) {
      const nr = unionIfRect(quadtree, r);
      if (nr !== null)
        return nr;
      const q = [null, null, null, null];
      -
    }
  }

  setNeedsDisplay(rect) {
    const r = rect.integralContainer().intersect(this._bounds);
    if (r === null)
      return;
  }
}
