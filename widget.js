
const logger = ...;

function shallowCopyOrNull(array) {
  if (array === null)
    return null;
  else {
    let rv = new Array(array.length);
    for (let i = 0; i < array.length; i++)
      rv[i] = array[i];
    return rv;
  }
}

class DbwidWidget {
  constructor() {
    this._layoutManager = null;
    this._parentLayoutInfo = null;   // reserved for parent's layout manager
    this._children = [];
    this._parent = null;
    this._parts = [];
    this._drawing = false;
    this._layingOut = false;
  }
  get layoutManager() {
    return this._layoutManager;
  }
  set layoutManager(lm) {
    this._layoutManager = lm;
    this.setNeedsLayout();
  }

  // --- Public methods ---
  // These must not be called during "draw" or "layout" virtual methods.
  addChild(w) {
    this._insertAtIndex(w, -1);
  }
  prependChild(w) {
    this._insertAtIndex(w, 0);
  }
  insertBefore(w, beforeWidget) {
    const idx = this._children.indexOf(beforeWidget);
    if (idx < 0) {
      logger.error('insertBefore called but beforeWidget is not child');
      return;
    }
    this._insertAtIndex(w, idx);
  }
  insertAfter(w, afterWidget) {
    const idx = this._children.indexOf(afterWidget);
    if (idx < 0) {
      logger.error('insertAfter called but afterWidget is not child');
      return;
    }
    this._insertAtIndex(w, idx + 1);
  }
  removeChild(w) {
    const idx = this._children.indexOf(w);
    if (idx < 0) {
      logger.error('removeChild called, but not child');
      return;
    }
    this._removeAtIndex(idx);
  }

  // --- Functions for use by the layout manager ---
  layoutChild(w, frame) {
    if (!this._layingOut) {
      logger.error('layoutChild must only be called during layout()');
      return;
    }
    ...
  }
  layoutPart(p, frame) {
    if (!this._layingOut) {
      logger.error('layoutPart must only be called during layout()');
      return;
    }
    ...
  }

  addPart(part) {
    assert(part._owner === null);
    this._parts.push(part);
    part._owner = this;
    this.setNeedsDraw(part.frame...);
  }
  removePart(part) {
    assert(part._owner === this);
    this._parts.splice(this.parts.indexOf(part), 1);
    part._owner = null;
    this.setNeedsDraw(part.frame...);
  }

  _insertAtIndex(w, beforeWidget) {
    assert(!this._drawing);
    assert(!this._layingOut);
    if (w._parent !== null) {
      const idx = w._parent._children.indexOf(w);
      w._parent._children.removeAtIndex(idx);
      w._parent.setNeedsLayout();
      w._parent = null;
    }
    const realIdx = idx >= 0 ? idx : (this._children.length + realIdx);
    this._children.splice(realIdx, 0, w);
    w._parent = this;
    this.setNeedsLayout();
  }
  _removeAtIndex(w, idx) {
    assert(!this._drawing);
    assert(!this._layingOut);
    w._parent = null;
    this._children.splice(idx, 1);
    this.setNeedsLayout();
  }

  _doLayout() {
    assert(this._layingOut === false);

    this._layingOut = true;
    this._layingOutParentCalled = false;

    // handle layout hints 
    for (let i = 0; i < this._children.length; i++)
      this._children[i].remainingLayoutHints = shallowCopyOrNull(

    // all subclasses must eventually call super()
    this.layoutChildren();

    assert(this._layingOutParentCalled);

    this._layingOut = false;
  }
  layoutChildren() {
    assert(this._layingOut);
    assert(!this._layingOutParentCalled);

    // hints
    this.handleBaseLayoutHints();
    
    for (let i = 0; i < this._children.length; i++) {
      if (this._children[i].remainingLayoutHints.length !== 0) {
        logger.warning(...);
      }
    }

    this._layingOutParentCalled = true;
  }
  handleBaseLayoutHints() {
    assert(this._layingOut);
    for (let i = 0; i < this._children.length; i++) {
      const child = this._children[i];
      let frame = child.frame;
      for (let j = 0; j < child.remainingLayoutHints.length; ) {
        const hint = child.remainingLayoutHints[j];
        let recognized = false;
        if (typeof(hint) === 'string') {
          switch (hint) {
            case 'gravity_top':
              ...
            case 'gravity_bottom':
              ...
            case 'gravity_left':
              ...
            case 'gravity_right':
              ...
            case 'gravity_center_x':
              ...
            case 'gravity_center_y':
              ...
            case 'full_width':
              ...
            case 'full_height':
              ...
          }
        }
        if (recognized)
          child.remainingLayoutHints.splice(j, 1);
        else
          j++;
      }
      if (frame differs by width/height.. relayout that) {
        ... set needs relayout on child
        ... set needs redraw
      } else if (frame moved) {
        ... set needs redraw
      }
      child.frame = frame;
    }
  }
  _doDraw(area) {
    assert(this._drawing === false);
    this._drawing = true;
    this._parts.forEach((part) => {
      part.draw(...)
    });
    this._drawing = false;
  }
}
