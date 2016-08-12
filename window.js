
import DbwidWidget from 'widget.js';

export class DbwidWindow extends DbwidWidget {
  constructor(canvas) {
    this.canvas = canvas;
    this.frame = this.bounds = new DbwidRect(0, 0, canvas.width, canvas.height);
    super();
  }
}
