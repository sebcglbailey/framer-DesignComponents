require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Constraints":[function(require,module,exports){
var addReferenceEvents, moveFromRef, pushParent;

moveFromRef = function(layer, reference, moveRef, layerRef, refType) {
  var originalConstraints, originalLayerValue, originalRefValue;
  originalConstraints = layer.constraintValues;
  originalRefValue = reference[layerRef];
  originalLayerValue = layer[moveRef];
  layer[moveRef] = reference[layerRef] + layer.constraintValues[refType].value;
  return layer.constraintValues = originalConstraints;
};

pushParent = function(layer, direction) {
  var originalHeight, originalX, originalY;
  if (direction === "down") {
    originalY = layer.y;
    originalHeight = layer.height;
    layer.onChange("y", function(value) {
      this.parent.height += value - originalY;
      originalY = value;
      return originalHeight = this.height;
    });
    layer.onChange("height", function(value) {
      this.parent.height += value - originalHeight;
      originalY = this.y;
      return originalHeight = value;
    });
  }
  if (direction === "right") {
    originalX = layer.x;
    originalWidth - layer.width;
    layer.onChange("x", function(value) {
      var originalWidth;
      this.parent.width += value - originalX;
      originalX = value;
      return originalWidth = this.width;
    });
    return layer.onChange("width", function(value) {
      var originalWidth;
      this.parent.width += value - originalWidth;
      originalX = this.x;
      return originalWidth = value;
    });
  }
};

addReferenceEvents = function(layer) {
  var originalConstraints, originalHeightRef, originalWidthRef, originalX, originalXRef, originalY, originalYRef, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref18, ref19, ref2, ref20, ref21, ref22, ref23, ref24, ref3, ref4, ref5, ref6, ref7, ref8, ref9, reference;
  originalConstraints = layer.constraintValues;
  if ((((ref1 = layer.constraintValues) != null ? (ref2 = ref1.topRef) != null ? ref2.layer : void 0 : void 0) != null) || (((ref3 = layer.constraintValues) != null ? (ref4 = ref3.bottomRef) != null ? ref4.layer : void 0 : void 0) != null)) {
    reference = ((ref5 = layer.constraintValues) != null ? (ref6 = ref5.topRef) != null ? ref6.layer : void 0 : void 0) || ((ref7 = layer.constraintValues) != null ? (ref8 = ref7.bottomRef) != null ? ref8.layer : void 0 : void 0);
    originalYRef = reference.y;
    originalHeightRef = reference.height;
    originalY = layer.y;
    reference.onChange("y", function(value) {
      layer.y = originalY + (value - originalYRef);
      originalYRef = value;
      return originalY = layer.y;
    });
    if (((ref9 = layer.constraintValues) != null ? (ref10 = ref9.topRef) != null ? ref10.align : void 0 : void 0) !== "y") {
      reference.onChange("height", function(value) {
        layer.y = originalY + (value - originalHeightRef);
        originalHeightRef = value;
        return originalY = layer.y;
      });
    }
    if ((((ref11 = layer.constraintValues) != null ? ref11.topRef : void 0) != null) && (((ref12 = layer.constraintValues) != null ? ref12.bottomRef : void 0) != null)) {
      reference.onChange("height", function(value) {
        var ref13, ref14, ref15;
        layer.height = value - ((ref13 = layer.constraintValues) != null ? ref13.topRef.value : void 0) - ((ref14 = layer.constraintValues) != null ? ref14.bottomRef.value : void 0);
        layer.y = reference.y + ((ref15 = layer.constraintValues) != null ? ref15.topRef.value : void 0);
        return originalHeightRef = value;
      });
    }
  }
  if ((((ref13 = layer.constraintValues) != null ? (ref14 = ref13.leftRef) != null ? ref14.layer : void 0 : void 0) != null) || (((ref15 = layer.constraintValues) != null ? (ref16 = ref15.rightRef) != null ? ref16.layer : void 0 : void 0) != null)) {
    reference = ((ref17 = layer.constraintValues) != null ? (ref18 = ref17.leftRef) != null ? ref18.layer : void 0 : void 0) || ((ref19 = layer.constraintValues) != null ? (ref20 = ref19.rightRef) != null ? ref20.layer : void 0 : void 0);
    originalXRef = reference.x;
    originalWidthRef = reference.width;
    originalX = layer.x;
    reference.onChange("x", function(value) {
      layer.x = originalX + (value - originalXRef);
      originalXRef = value;
      return originalX = layer.x;
    });
    if (((ref21 = layer.constraintValues) != null ? (ref22 = ref21.left) != null ? ref22.align : void 0 : void 0) !== "x") {
      reference.onChange("width", function(value) {
        layer.x = originalX + (value - originalWidthRef);
        originalWidthRef = value;
        return originalX = layer.x;
      });
    }
    if ((((ref23 = layer.constraintValues) != null ? ref23.leftRef : void 0) != null) && (((ref24 = layer.constraintValues) != null ? ref24.rightRef : void 0) != null)) {
      return reference.onChange("width", function(value) {
        var ref25, ref26, ref27;
        layer.width = value - ((ref25 = layer.constraintValues) != null ? ref25.leftRef.value : void 0) - ((ref26 = layer.constraintValues) != null ? ref26.rightRef.value : void 0);
        layer.x = reference.x + ((ref27 = layer.constraintValues) != null ? ref27.leftRef.value : void 0);
        return originalWidthRef = value;
      });
    }
  }
};

Layer.prototype.setConstraints = function(options, origin) {
  var align, i, layer, len, ref, ref1, value, values;
  if (options == null) {
    options = {};
  }
  this.constraintValues = {
    top: typeof options.top === "object" ? null : options.top != null ? options.top : (origin != null ? origin.constraintValues : void 0) != null ? origin.constraintValues.top : null,
    left: typeof options.left === "object" ? null : options.left != null ? options.left : (origin != null ? origin.constraintValues : void 0) != null ? origin.constraintValues.left : null,
    bottom: typeof options.bottom === "object" ? null : options.pushDown ? null : options.bottom != null ? options.bottom : (origin != null ? origin.constraintValues : void 0) != null ? origin.constraintValues.bottom : null,
    right: typeof options.right === "object" ? null : options.pushRight ? null : options.right != null ? options.right : (origin != null ? origin.constraintValues : void 0) != null ? origin.constraintValues.right : null,
    width: this.width,
    height: this.height,
    widthFactor: options.scaleX != null ? options.scaleX : options.widthFactor != null ? options.widthFactor : null,
    heightFactor: options.scaleY != null ? options.scaleY : options.heightFactor != null ? options.heightFactor : null,
    centerAnchorX: options.centerX != null ? options.centerX : options.centerAnchorX != null ? options.centerAnchorX : null,
    centerAnchorY: options.centerY != null ? options.centerY : options.centerAnchorY != null ? options.centerAnchorY : null,
    aspectRatioLocked: options.aspectRatioLocked != null ? options.aspectRatioLocked : (origin != null ? origin.constraintValues : void 0) ? origin.constraintValues.aspectRatioLocked : false
  };
  values = this.constraintValues;
  if ((values.top != null) && (values.bottom != null)) {
    this.constraintValues.heightFactor = null;
    this.constraintValues.centerAnchorY = null;
  }
  if ((values.left != null) && (values.right != null)) {
    this.constraintValues.widthFactor = null;
    this.constraintValues.centerAnchorX = null;
  }
  if ((values.left != null) && (values.right != null) && (values.top != null) && (values.bottom != null)) {
    this.constraintValues.aspectRatioLocked = false;
  }
  ref1 = [["top", "y", "maxY", "topRef", "bottom"], ["left", "x", "maxX", "leftRef", "right"], ["bottom", "maxY", "y", "bottomRef", "top"], ["right", "maxX", "x", "rightRef", "left"]];
  for (i = 0, len = ref1.length; i < len; i++) {
    ref = ref1[i];
    if (typeof options[ref[0]] === "object" && options[ref[0]] !== null && (options[ref[3]] == null)) {
      if (options[ref[0]].layer != null) {
        if ((this.parent != null) && (this.parent.selectChild(options[ref[0]].layer) != null)) {
          layer = this.parent.selectChild(options[ref[0]].layer);
        } else {
          layer = Layer.select(options[ref[0]].layer);
        }
      } else {
        layer = this.parent;
      }
      align = null;
      if ((options[ref[0]].value == null) && layer === this.parent) {
        value = this[ref[1]];
      } else if ((options[ref[0]].align != null) && (options[ref[0]].value != null)) {
        value = options[ref[0]].value;
        align = options[ref[0]].align;
      } else if (options[ref[0]].align != null) {
        value = 0;
        align = options[ref[0]].align;
      } else if ((options[ref[0]].value == null) && (options[ref[0]].align == null)) {
        value = this[ref[1]] - layer[ref[2]];
        align = ref[4];
      } else {
        value = options[ref[0]].value;
        align = ref[4];
      }
      if (align === "left") {
        align = "x";
      } else if (align === "right") {
        align = "maxX";
      } else if (align === "top") {
        align = "y";
      } else if (align === "bottom") {
        align = "maxY";
      }
      this.constraintValues[ref[3]] = {
        layer: layer,
        value: value,
        align: align
      };
      this.constraintValues[ref[0]] = null;
      this.constraintValues[ref[4]] = null;
    }
  }
  if (options.pushDown != null) {
    this.constraintValues.bottom = null;
    pushParent(this, "down");
  }
  if (options.pushRight != null) {
    this.constraintValues.right = null;
    pushParent(this, "right");
  }
  if (!(options.pushDown || this.constraintValues.topRef || this.constraintValues.bottomRef)) {
    this.constraintValues.bottom = options.bottom != null ? options.bottom : (origin != null ? origin.constraintValues : void 0) != null ? origin.constraintValues.bottom : null;
  }
  if (!(options.pushRight || this.constraintValues.leftRef || this.constraintValues.rightRef)) {
    this.constraintValues.right = options.right != null ? options.right : (origin != null ? origin.constraintValues : void 0) != null ? origin.constraintValues.right : null;
  }
  if (this.constraintValues.top === null && this.constraintValues.bottom === null && this.constraintValues.centerAnchorY === null && !this.constraintValues.topRef && !this.constraintValues.bottomRef) {
    this.constraintValues.top = this.y;
  }
  if (this.constraintValues.left === null && this.constraintValues.right === null && this.constraintValues.centerAnchorX === null && !this.constraintValues.leftRef && !this.constraintValues.rightRef) {
    this.constraintValues.left = this.x;
  }
  return this.applyConstraints();
};

Layer.prototype.applyConstraints = function() {
  var aspectRatio, parent, ref1, ref2, ref3, ref4, values;
  if (!this.constraintValues) {
    return;
  }
  values = this.constraintValues;
  if (!this.parent) {
    parent = Screen;
  } else {
    parent = this.parent;
  }
  aspectRatio = this.width / this.height;
  if ((values.top != null) && typeof values.top !== "object") {
    this.y = values.top;
  } else if (values.top === null && (((ref1 = values.topRef) != null ? ref1.layer : void 0) != null)) {
    this.y = values.topRef.layer[values.topRef.align] + values.topRef.value;
  }
  if ((values.left != null) && typeof values.left !== "object") {
    this.x = values.left;
  } else if (values.left === null && (((ref2 = values.leftRef) != null ? ref2.layer : void 0) != null)) {
    this.x = values.leftRef.layer[values.leftRef.align] + values.leftRef.value;
  }
  if ((values.left != null) && (values.right != null)) {
    this.width = parent.width - this.x - values.right;
    if (values.aspectRatioLocked) {
      this.height = this.width / aspectRatio;
    }
  }
  if ((values.top != null) && (values.bottom != null)) {
    this.height = parent.height - this.y - values.bottom;
    if (values.aspectRatioLocked) {
      this.width = this.height * aspectRatio;
    }
  }
  if (values.widthFactor != null) {
    this.width = parent.width * values.widthFactor;
  }
  if (values.heightFactor != null) {
    this.height = parent.height * values.heightFactor;
  }
  if (values.right != null) {
    this.maxX = parent.width - values.right;
  } else if (values.right === null && (((ref3 = values.rightRef) != null ? ref3.layer : void 0) != null)) {
    this.maxX = values.rightRef.layer[values.rightRef.align] - values.rightRef.value;
  }
  if (values.bottom != null) {
    this.maxY = parent.height - values.bottom;
  } else if (values.bottom === null && (((ref4 = values.bottomRef) != null ? ref4.layer : void 0) != null)) {
    this.maxY = values.bottomRef.layer[values.bottomRef.align] - values.bottomRef.value;
  }
  if ((values.left == null) && (values.right == null) && (values.centerAnchorX != null)) {
    this.midX = parent.width * values.centerAnchorX;
  }
  if ((values.top == null) && (values.bottom == null) && (values.centerAnchorY != null)) {
    this.midY = parent.height * values.centerAnchorY;
  }
  this.constraintValues = values;
  return addReferenceEvents(this);
};

Object.defineProperty(Layer.prototype, "constraints", {
  get: function() {
    return this._constraints;
  },
  set: function(value) {
    this._constraints = value;
    this.emit("change:constraints", value);
    return this.setConstraints(value);
  }
});


},{}],"DesignComponents":[function(require,module,exports){
var Constraints, classEventName, className, component, componentState, components, customComponents, customStates, eventName, extendRangeSlider, extendSlider, fn, fn1, i, j, k, kit, l, layer, len, len1, len2, len3, name, parent, ref, stateChangeProps, type,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Constraints = require("Constraints");


/*
------------------
CUSTOM CLASSES
------------------
 */

kit = Layer.select("*UIKit*");

if (kit != null) {
  kit.x = Screen.width * 1000;
  kit.name = ".UIKit";
}

ref = Layer.selectAll("@*");
for (i = 0, len = ref.length; i < len; i++) {
  layer = ref[i];
  parent = layer.parent;
  name = layer.name.replace("@", "");
  parent[name] = layer;
}

customComponents = Layer.selectAll("Custom_*");

Layer.prototype.addDesignChildren = function(origin) {
  var child, j, len1, ref1, results;
  if (origin == null) {
    origin = this;
  }
  ref1 = origin.selectAllChildren("*");
  results = [];
  for (j = 0, len1 = ref1.length; j < len1; j++) {
    child = ref1[j];
    parent = child.parent;
    results.push(parent[child.name] = child);
  }
  return results;
};

stateChangeProps = ["width", "height", "opacity", "scaleX", "scaleY", "scaleZ", "scale", "skewX", "skewY", "skew", "rotationX", "rotationY", "rotationZ", "rotation", "blur", "brightness", "saturate", "hueRotate", "contrast", "invert", "grayscale", "sepia", "blending", "backgroundBlur", "backgroundBrightness", "backgroundSaturate", "backgroundHueRotate", "backgroundContrast", "backgroundInvert", "backgroundGrayscale", "backgroundSepia", "shadow1", "shadow2", "shadow3", "shadow4", "shadow5", "shadow6", "shadow7", "shadow8", "shadow9", "shadowX", "shadowY", "shadowBlur", "shadowSpread", "shadowColor", "shadowType", "shadows", "backgroundColor", "color", "borderRadius", "borderColor", "borderWidth", "borderStyle", "image", "gradient", "text"];

fn = function(component, name) {
  return exports[name] = (function(superClass) {
    extend(_Class, superClass);

    function _Class(options1) {
      var base;
      this.options = options1 != null ? options1 : {};
      _Class.__super__.constructor.call(this, this.options);
      this.props = Object.assign(component.props, {
        parent: this.options.parent
      });
      this.parent = (base = this.options).parent != null ? base.parent : base.parent = Screen.content;
      this.addChildren();
      this.setChildProps();
      this.stateComponents = Layer.selectAll("*State_" + name + "*");
      this.addStates();
      this.originalProps = this.props;
      this.setConstraints(this.options.constraints, component);
      this.props = this.options;
      this.setConstraints();
      if (this.options.state != null) {
        this.animateState(this.options.state, false);
      }
    }

    _Class.prototype.setChildProps = function(parent) {
      var key, ref1, results, value, width;
      ref1 = this.options;
      results = [];
      for (key in ref1) {
        value = ref1[key];
        if ((this[key] != null) && this[key] instanceof Layer) {
          if (this[key].constructor.name === "TextLayer" && this[key].autoSize !== true) {
            this[key].props = value;
            width = this[key].width;
            this[key].autoSize = true;
            results.push(this[key].width = width);
          } else {
            results.push(this[key].props = value);
          }
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    _Class.prototype.addChildren = function(parent, origin) {
      var child, k, len2, ref1, ref2, results;
      if (origin == null) {
        origin = component;
      }
      if (parent == null) {
        parent = this;
      }
      ref1 = origin.children;
      results = [];
      for (k = 0, len2 = ref1.length; k < len2; k++) {
        child = ref1[k];
        layer = child.copySingle();
        layer.parent = parent;
        this[layer.name] = layer;
        if (((ref2 = this.options[layer.name]) != null ? ref2.constraints : void 0) != null) {
          layer.setConstraints(this.options[layer.name].constraints, child);
        } else {
          layer.setConstraints({}, child);
        }
        if ((child.children != null) && child.children.length > 0) {
          results.push(this.addChildren(layer, child));
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    _Class.prototype.addStates = function() {
      var fn1, k, len2, ref1, state;
      this.customStates = {
        array: []
      };
      ref1 = this.stateComponents;
      fn1 = (function(_this) {
        return function(state) {
          var dec, l, len3, len4, m, prop, ref2, results, stateIndex, stateName, stateProps;
          stateIndex = state.name.indexOf("State");
          if (stateIndex > 0) {
            stateName = state.name.slice(0, stateIndex - 1);
          } else {
            stateName = state.name.split("State_" + name + "_")[1];
          }
          _this.customStates[stateName] = {};
          _this.customStates.array.push(stateName);
          stateProps = {};
          for (l = 0, len3 = stateChangeProps.length; l < len3; l++) {
            prop = stateChangeProps[l];
            stateProps[prop] = state[prop];
          }
          _this.states[stateName] = stateProps;
          ref2 = state.descendants;
          results = [];
          for (m = 0, len4 = ref2.length; m < len4; m++) {
            dec = ref2[m];
            results.push((function(dec) {
              var fn2, len5, n, thisStateProps;
              thisStateProps = {};
              fn2 = function(prop) {
                return thisStateProps[prop] = dec[prop];
              };
              for (n = 0, len5 = stateChangeProps.length; n < len5; n++) {
                prop = stateChangeProps[n];
                fn2(prop);
              }
              return _this[dec.name].states[stateName] = thisStateProps;
            })(dec));
          }
          return results;
        };
      })(this);
      for (k = 0, len2 = ref1.length; k < len2; k++) {
        state = ref1[k];
        fn1(state);
      }
      return this.addStateEvents();
    };

    _Class.prototype.addStateEvents = function() {
      var eventName, events, fn1, k, l, len2, len3, ref1, results, state;
      events = [];
      ref1 = this.stateComponents;
      fn1 = (function(_this) {
        return function(state) {
          var animate, eventName, stateName;
          if (state.name.includes("State_" + name + "_")) {
            if (state.name.includes("_State_" + name + "_")) {
              stateName = state.name.split("_State_" + name + "_")[0];
              eventName = state.name.split("_State_" + name + "_")[1];
            } else {
              eventName = state.name.replace("State_" + name + "_", "");
              stateName = eventName;
            }
            if (eventName.includes("_Animate" || eventName.includes("_true" || eventName.includes("_True")))) {
              animate = true;
              eventName = eventName.split("_")[0];
            } else {
              animate = false;
            }
            _this.customStates[stateName].animate = animate;
            if (!events.includes(eventName)) {
              return events.push(eventName);
            }
          }
        };
      })(this);
      for (k = 0, len2 = ref1.length; k < len2; k++) {
        state = ref1[k];
        fn1(state);
      }
      results = [];
      for (l = 0, len3 = events.length; l < len3; l++) {
        eventName = events[l];
        results.push((function(_this) {
          return function(eventName) {
            if ((Events[eventName] != null) && _this.customStates.array.includes(eventName)) {
              return _this.on(Events[eventName], function(event, layer) {
                var animate;
                animate = this.customStates[eventName].animate;
                this.stateSwitch(eventName, {
                  animate: animate
                });
                return this.animateChildren();
              });
            } else if (Events[eventName] != null) {
              return _this.on(Events[eventName], function() {
                var animate, currentIndex, nextIndex, nextState;
                currentIndex = this.customStates.array.indexOf(this.states.current.name);
                nextIndex = currentIndex + 1;
                if (nextIndex === this.customStates.array.length) {
                  nextIndex = 0;
                }
                animate = this.customStates[this.customStates.array[nextIndex]].animate;
                nextState = this.customStates.array[nextIndex];
                this.stateSwitch(nextState, {
                  animate: animate
                });
                return this.animateChildren();
              });
            }
          };
        })(this)(eventName));
      }
      return results;
    };

    _Class.prototype.animateChildren = function(stateName, animate, options) {
      var dec, k, len2, ref1, results;
      if (options == null) {
        options = {};
      }
      if (stateName == null) {
        stateName = this.states.current.name;
      }
      if (animate == null) {
        animate = this.customStates[stateName].animate;
      }
      if (!animate) {
        options.time = 0;
      }
      ref1 = this.descendants;
      results = [];
      for (k = 0, len2 = ref1.length; k < len2; k++) {
        dec = ref1[k];
        results.push((function(_this) {
          return function(dec) {
            return dec.stateSwitch(stateName, {
              animate: animate,
              options: options
            });
          };
        })(this)(dec));
      }
      return results;
    };

    _Class.prototype.animateState = function(state, animate, options) {
      var ref1, ref2;
      if (options == null) {
        options = {};
      }
      if ((state == null) || (((ref1 = this.customStates) != null ? ref1[state] : void 0) == null)) {
        return;
      }
      if ((animate == null) && (((ref2 = this.customStates) != null ? ref2[state] : void 0) != null)) {
        animate = this.customStates[state].animate;
      } else if (animate != null) {
        animate = animate;
      } else {
        animate = false;
      }
      if (!animate) {
        options.time = 0;
      }
      this.stateSwitch(state, {
        animate: animate,
        options: options
      });
      return this.animateChildren(state, animate, options);
    };

    _Class.define("constraints", {
      get: function() {
        return this.options.constraints;
      },
      set: function(value) {
        this.options.constraints = value;
        this.emit("change:constraints", this.options.constraints);
        return this.setConstraints(value);
      }
    });

    _Class.define("state", {
      get: function() {
        return this.options.state;
      },
      set: function(value) {
        this.options.state = value;
        this.emit("change:state", this.options.state);
        return this.animateState(value);
      }
    });

    return _Class;

  })(Layer);
};
for (j = 0, len1 = customComponents.length; j < len1; j++) {
  component = customComponents[j];
  name = component.name.replace("Custom_", "");
  fn(component, name);
}

customStates = Layer.selectAll("State_*");

for (k = 0, len2 = customStates.length; k < len2; k++) {
  componentState = customStates[k];
  classEventName = componentState.name.replace("State_", "");
  if (classEventName.includes("_")) {
    className = classEventName.split("_")[0];
    eventName = classEventName.split("_")[1];
  } else {
    className = classEventName;
  }
}


/*
------------------
EXISTING CLASSES
------------------
 */

components = Layer.selectAll("_*");

extendSlider = function(origin) {
  return exports.SliderComponent = (function(superClass) {
    extend(SliderComponent, superClass);

    function SliderComponent(options1) {
      this.options = options1 != null ? options1 : {};
      SliderComponent.__super__.constructor.call(this, this.options);
      this.knob.props = {
        shadows: origin.knob.shadows,
        backgroundColor: origin.knob.backgroundColor,
        borderRadius: origin.knob.borderRadius,
        frame: origin.knob.frame
      };
      this.fill.props = {
        shadows: origin.fill.shadows,
        backgroundColor: origin.fill.backgroundColor,
        borderRadius: origin.fill.borderRadius,
        frame: origin.fill.frame
      };
      this.props = {
        shadows: origin.shadows,
        backgroundColor: origin.backgroundColor,
        borderRadius: origin.borderRadius,
        size: origin.size
      };
      this.value = Utils.modulate(origin.knob.midX, [0, origin.width], [this.min, this.max]);
    }

    return SliderComponent;

  })(SliderComponent);
};

extendRangeSlider = function(origin) {
  return exports.RangeSliderComponent = (function(superClass) {
    extend(RangeSliderComponent, superClass);

    function RangeSliderComponent(options1) {
      this.options = options1 != null ? options1 : {};
      RangeSliderComponent.__super__.constructor.call(this, this.options);
      this.minKnob.props = {
        shadows: origin.minKnob.shadows,
        backgroundColor: origin.minKnob.backgroundColor,
        borderRadius: origin.minKnob.borderRadius,
        frame: origin.minKnob.frame
      };
      this.maxKnob.props = {
        shadows: origin.maxKnob.shadows,
        backgroundColor: origin.maxKnob.backgroundColor,
        borderRadius: origin.maxKnob.borderRadius,
        frame: origin.maxKnob.frame
      };
      this.fill.props = {
        shadows: origin.fill.shadows,
        backgroundColor: origin.fill.backgroundColor,
        borderRadius: origin.fill.borderRadius,
        frame: origin.fill.frame
      };
      this.props = {
        shadows: origin.shadows,
        backgroundColor: origin.backgroundColor,
        borderRadius: origin.borderRadius,
        size: origin.size
      };
      this.minValue = Utils.modulate(origin.minKnob.midX, [0, origin.width], [this.min, this.max]);
      this.maxValue = Utils.modulate(origin.maxKnob.midX, [0, origin.width], [this.min, this.max]);
    }

    return RangeSliderComponent;

  })(RangeSliderComponent);
};

fn1 = function(component) {
  component.addDesignChildren();
  if (type === "SliderComponent") {
    return extendSlider(component);
  } else if (type === "RangeSliderComponent") {
    return extendRangeSlider(component);
  }
};
for (l = 0, len3 = components.length; l < len3; l++) {
  component = components[l];
  type = component.name.replace("_", "");
  fn1(component);
}


},{"Constraints":"Constraints"}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NlYmFzdGlhbmJhaWxleS9Eb2N1bWVudHMvQ2xlYXJTY29yZS9Sb2d1ZSBPbmUvR2l0SHViL2ZyYW1lci1EZXNpZ25Db21wb25lbnRzL0RlbW8uZnJhbWVyL21vZHVsZXMvRGVzaWduQ29tcG9uZW50cy5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zZWJhc3RpYW5iYWlsZXkvRG9jdW1lbnRzL0NsZWFyU2NvcmUvUm9ndWUgT25lL0dpdEh1Yi9mcmFtZXItRGVzaWduQ29tcG9uZW50cy9EZW1vLmZyYW1lci9tb2R1bGVzL0NvbnN0cmFpbnRzLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiQ29uc3RyYWludHMgPSByZXF1aXJlIFwiQ29uc3RyYWludHNcIlxuXG4jIyNcbi0tLS0tLS0tLS0tLS0tLS0tLVxuQ1VTVE9NIENMQVNTRVNcbi0tLS0tLS0tLS0tLS0tLS0tLVxuIyMjXG5cbmtpdCA9IExheWVyLnNlbGVjdCBcIipVSUtpdCpcIlxuaWYga2l0PyB0aGVuIGtpdC54ID0gU2NyZWVuLndpZHRoICogMTAwMDsga2l0Lm5hbWUgPSBcIi5VSUtpdFwiXG5cbmZvciBsYXllciBpbiBMYXllci5zZWxlY3RBbGwgXCJAKlwiXG5cdHBhcmVudCA9IGxheWVyLnBhcmVudFxuXHRuYW1lID0gbGF5ZXIubmFtZS5yZXBsYWNlIFwiQFwiLCBcIlwiXG5cdHBhcmVudFtuYW1lXSA9IGxheWVyXG5cbmN1c3RvbUNvbXBvbmVudHMgPSBMYXllci5zZWxlY3RBbGwgXCJDdXN0b21fKlwiXG5cbkxheWVyOjphZGREZXNpZ25DaGlsZHJlbiA9IChvcmlnaW4pIC0+XG5cdGlmICFvcmlnaW4/IHRoZW4gb3JpZ2luID0gQFxuXHRmb3IgY2hpbGQgaW4gb3JpZ2luLnNlbGVjdEFsbENoaWxkcmVuIChcIipcIilcblx0XHRwYXJlbnQgPSBjaGlsZC5wYXJlbnRcblx0XHRwYXJlbnRbY2hpbGQubmFtZV0gPSBjaGlsZFxuXG5cbnN0YXRlQ2hhbmdlUHJvcHMgPSBbXG5cdFwid2lkdGhcIiwgXCJoZWlnaHRcIixcblx0XCJvcGFjaXR5XCIsXG5cdFwic2NhbGVYXCIsIFwic2NhbGVZXCIsIFwic2NhbGVaXCIsIFwic2NhbGVcIixcblx0XCJza2V3WFwiLCBcInNrZXdZXCIsIFwic2tld1wiLFxuXHRcInJvdGF0aW9uWFwiLCBcInJvdGF0aW9uWVwiLCBcInJvdGF0aW9uWlwiLCBcInJvdGF0aW9uXCIsXG5cdFwiYmx1clwiLFxuXHRcImJyaWdodG5lc3NcIiwgXCJzYXR1cmF0ZVwiLCBcImh1ZVJvdGF0ZVwiLCBcImNvbnRyYXN0XCIsIFwiaW52ZXJ0XCIsIFwiZ3JheXNjYWxlXCIsIFwic2VwaWFcIiwgXCJibGVuZGluZ1wiLFxuXHRcImJhY2tncm91bmRCbHVyXCIsIFwiYmFja2dyb3VuZEJyaWdodG5lc3NcIiwgXCJiYWNrZ3JvdW5kU2F0dXJhdGVcIiwgXCJiYWNrZ3JvdW5kSHVlUm90YXRlXCIsIFwiYmFja2dyb3VuZENvbnRyYXN0XCIsIFwiYmFja2dyb3VuZEludmVydFwiLCBcImJhY2tncm91bmRHcmF5c2NhbGVcIiwgXCJiYWNrZ3JvdW5kU2VwaWFcIixcblx0XCJzaGFkb3cxXCIsIFwic2hhZG93MlwiLCBcInNoYWRvdzNcIiwgXCJzaGFkb3c0XCIsIFwic2hhZG93NVwiLCBcInNoYWRvdzZcIiwgXCJzaGFkb3c3XCIsIFwic2hhZG93OFwiLCBcInNoYWRvdzlcIixcblx0XCJzaGFkb3dYXCIsIFwic2hhZG93WVwiLCBcInNoYWRvd0JsdXJcIiwgXCJzaGFkb3dTcHJlYWRcIiwgXCJzaGFkb3dDb2xvclwiLCBcInNoYWRvd1R5cGVcIixcblx0XCJzaGFkb3dzXCIsXG5cdFwiYmFja2dyb3VuZENvbG9yXCIsIFwiY29sb3JcIixcblx0XCJib3JkZXJSYWRpdXNcIiwgXCJib3JkZXJDb2xvclwiLCBcImJvcmRlcldpZHRoXCIsIFwiYm9yZGVyU3R5bGVcIixcblx0XCJpbWFnZVwiLCBcImdyYWRpZW50XCIsXG5cdFwidGV4dFwiXG5dXG5cblxuXG5mb3IgY29tcG9uZW50IGluIGN1c3RvbUNvbXBvbmVudHNcblxuXHRuYW1lID0gY29tcG9uZW50Lm5hbWUucmVwbGFjZSBcIkN1c3RvbV9cIiwgXCJcIlxuXG5cdGRvIChjb21wb25lbnQsIG5hbWUpIC0+XG5cblx0XHRjbGFzcyBleHBvcnRzW25hbWVdIGV4dGVuZHMgTGF5ZXJcblxuXHRcdFx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdFx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0XHRcdEBwcm9wcyA9IE9iamVjdC5hc3NpZ24gY29tcG9uZW50LnByb3BzLCB7cGFyZW50OiBAb3B0aW9ucy5wYXJlbnR9XG5cdFx0XHRcdEBwYXJlbnQgPSBAb3B0aW9ucy5wYXJlbnQgPz0gU2NyZWVuLmNvbnRlbnRcblxuXHRcdFx0XHRAYWRkQ2hpbGRyZW4oKVxuXHRcdFx0XHRAc2V0Q2hpbGRQcm9wcygpXG5cdFx0XHRcdFxuXHRcdFx0XHRAc3RhdGVDb21wb25lbnRzID0gTGF5ZXIuc2VsZWN0QWxsIFwiKlN0YXRlXyN7bmFtZX0qXCJcblx0XHRcdFx0QGFkZFN0YXRlcygpXG5cblx0XHRcdFx0QG9yaWdpbmFsUHJvcHMgPSBAcHJvcHNcblxuXHRcdFx0XHRAc2V0Q29uc3RyYWludHMgQG9wdGlvbnMuY29uc3RyYWludHMsIGNvbXBvbmVudFxuXG5cdFx0XHRcdEBwcm9wcyA9IEBvcHRpb25zXG5cblx0XHRcdFx0QHNldENvbnN0cmFpbnRzKClcblxuXHRcdFx0XHRpZiBAb3B0aW9ucy5zdGF0ZT9cblx0XHRcdFx0XHQjIHN0YXRlID0gTGF5ZXIuc2VsZWN0IFwiI3tAb3B0aW9ucy5zdGF0ZX1fU3RhdGVfI3tuYW1lfSpcIlxuXHRcdFx0XHRcdEBhbmltYXRlU3RhdGUgQG9wdGlvbnMuc3RhdGUsIGZhbHNlXG5cblxuXHRcdFx0c2V0Q2hpbGRQcm9wczogKHBhcmVudCkgLT5cblxuXHRcdFx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBAb3B0aW9uc1xuXHRcdFx0XHRcdGlmIEBba2V5XT8gJiYgQFtrZXldIGluc3RhbmNlb2YgTGF5ZXJcblxuXHRcdFx0XHRcdFx0aWYgQFtrZXldLmNvbnN0cnVjdG9yLm5hbWUgPT0gXCJUZXh0TGF5ZXJcIiAmJiBAW2tleV0uYXV0b1NpemUgIT0gdHJ1ZVxuXHRcdFx0XHRcdFx0XHRAW2tleV0ucHJvcHMgPSB2YWx1ZVxuXHRcdFx0XHRcdFx0XHR3aWR0aCA9IEBba2V5XS53aWR0aFxuXHRcdFx0XHRcdFx0XHRAW2tleV0uYXV0b1NpemUgPSB0cnVlXG5cdFx0XHRcdFx0XHRcdEBba2V5XS53aWR0aCA9IHdpZHRoXG5cdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdEBba2V5XS5wcm9wcyA9IHZhbHVlXG5cblxuXG5cdFx0XHRhZGRDaGlsZHJlbjogKHBhcmVudCwgb3JpZ2luKSAtPlxuXG5cdFx0XHRcdGlmICFvcmlnaW4/IHRoZW4gb3JpZ2luID0gY29tcG9uZW50XG5cdFx0XHRcdGlmICFwYXJlbnQ/IHRoZW4gcGFyZW50ID0gQFxuXG5cdFx0XHRcdGZvciBjaGlsZCBpbiBvcmlnaW4uY2hpbGRyZW5cblxuXHRcdFx0XHRcdGxheWVyID0gY2hpbGQuY29weVNpbmdsZSgpXG5cdFx0XHRcdFx0bGF5ZXIucGFyZW50ID0gcGFyZW50XG5cblx0XHRcdFx0XHRAW2xheWVyLm5hbWVdID0gbGF5ZXJcblxuXHRcdFx0XHRcdGlmIEBvcHRpb25zW2xheWVyLm5hbWVdPy5jb25zdHJhaW50cz9cblx0XHRcdFx0XHRcdGxheWVyLnNldENvbnN0cmFpbnRzIEBvcHRpb25zW2xheWVyLm5hbWVdLmNvbnN0cmFpbnRzLCBjaGlsZFxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdGxheWVyLnNldENvbnN0cmFpbnRzIHt9LCBjaGlsZFxuXG5cdFx0XHRcdFx0aWYgY2hpbGQuY2hpbGRyZW4/ICYmIGNoaWxkLmNoaWxkcmVuLmxlbmd0aCA+IDBcblx0XHRcdFx0XHRcdEBhZGRDaGlsZHJlbiBsYXllciwgY2hpbGRcblxuXG5cdFx0XHRhZGRTdGF0ZXM6ICgpIC0+XG5cblx0XHRcdFx0QGN1c3RvbVN0YXRlcyA9XG5cdFx0XHRcdFx0YXJyYXk6IFtdXG5cblx0XHRcdFx0Zm9yIHN0YXRlIGluIEBzdGF0ZUNvbXBvbmVudHNcblxuXHRcdFx0XHRcdGRvIChzdGF0ZSkgPT5cblxuXHRcdFx0XHRcdFx0c3RhdGVJbmRleCA9IHN0YXRlLm5hbWUuaW5kZXhPZihcIlN0YXRlXCIpXG5cdFx0XHRcdFx0XHRpZiBzdGF0ZUluZGV4ID4gMFxuXHRcdFx0XHRcdFx0XHRzdGF0ZU5hbWUgPSBzdGF0ZS5uYW1lLnNsaWNlIDAsIHN0YXRlSW5kZXgtMVxuXHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHRzdGF0ZU5hbWUgPSBzdGF0ZS5uYW1lLnNwbGl0KFwiU3RhdGVfI3tuYW1lfV9cIilbMV1cblxuXHRcdFx0XHRcdFx0QGN1c3RvbVN0YXRlc1tzdGF0ZU5hbWVdID0ge31cblx0XHRcdFx0XHRcdEBjdXN0b21TdGF0ZXMuYXJyYXkucHVzaCBzdGF0ZU5hbWVcblxuXHRcdFx0XHRcdFx0c3RhdGVQcm9wcyA9IHt9XG5cblx0XHRcdFx0XHRcdGZvciBwcm9wIGluIHN0YXRlQ2hhbmdlUHJvcHNcblx0XHRcdFx0XHRcdFx0c3RhdGVQcm9wc1twcm9wXSA9IHN0YXRlW3Byb3BdXG5cblx0XHRcdFx0XHRcdEBzdGF0ZXNbc3RhdGVOYW1lXSA9IHN0YXRlUHJvcHNcblxuXHRcdFx0XHRcdFx0Zm9yIGRlYyBpbiBzdGF0ZS5kZXNjZW5kYW50c1xuXHRcdFx0XHRcdFx0XHRkbyAoZGVjKSA9PlxuXHRcdFx0XHRcdFx0XHRcdHRoaXNTdGF0ZVByb3BzID0ge31cblx0XHRcdFx0XHRcdFx0XHRmb3IgcHJvcCBpbiBzdGF0ZUNoYW5nZVByb3BzXG5cdFx0XHRcdFx0XHRcdFx0XHRkbyAocHJvcCkgPT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpc1N0YXRlUHJvcHNbcHJvcF0gPSBkZWNbcHJvcF1cblx0XHRcdFx0XHRcdFx0XHRAW2RlYy5uYW1lXS5zdGF0ZXNbc3RhdGVOYW1lXSA9IHRoaXNTdGF0ZVByb3BzXG5cblx0XHRcdFx0QGFkZFN0YXRlRXZlbnRzKClcblxuXHRcdFx0YWRkU3RhdGVFdmVudHM6ICgpIC0+XG5cblx0XHRcdFx0ZXZlbnRzID0gW11cblxuXHRcdFx0XHRmb3Igc3RhdGUgaW4gQHN0YXRlQ29tcG9uZW50c1xuXG5cdFx0XHRcdFx0ZG8gKHN0YXRlKSA9PlxuXG5cdFx0XHRcdFx0XHRpZiBzdGF0ZS5uYW1lLmluY2x1ZGVzIFwiU3RhdGVfI3tuYW1lfV9cIlxuXG5cdFx0XHRcdFx0XHRcdGlmIHN0YXRlLm5hbWUuaW5jbHVkZXMgXCJfU3RhdGVfI3tuYW1lfV9cIlxuXHRcdFx0XHRcdFx0XHRcdHN0YXRlTmFtZSA9IHN0YXRlLm5hbWUuc3BsaXQoXCJfU3RhdGVfI3tuYW1lfV9cIilbMF1cblx0XHRcdFx0XHRcdFx0XHRldmVudE5hbWUgPSBzdGF0ZS5uYW1lLnNwbGl0KFwiX1N0YXRlXyN7bmFtZX1fXCIpWzFdXG5cdFx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0XHRldmVudE5hbWUgPSBzdGF0ZS5uYW1lLnJlcGxhY2UgXCJTdGF0ZV8je25hbWV9X1wiLCBcIlwiXG5cdFx0XHRcdFx0XHRcdFx0c3RhdGVOYW1lID0gZXZlbnROYW1lXG5cblx0XHRcdFx0XHRcdFx0aWYgZXZlbnROYW1lLmluY2x1ZGVzIFwiX0FuaW1hdGVcIiB8fCBldmVudE5hbWUuaW5jbHVkZXMgXCJfdHJ1ZVwiIHx8IGV2ZW50TmFtZS5pbmNsdWRlcyBcIl9UcnVlXCJcblx0XHRcdFx0XHRcdFx0XHRhbmltYXRlID0gdHJ1ZVxuXHRcdFx0XHRcdFx0XHRcdGV2ZW50TmFtZSA9IGV2ZW50TmFtZS5zcGxpdChcIl9cIilbMF1cblx0XHRcdFx0XHRcdFx0ZWxzZSBhbmltYXRlID0gZmFsc2VcblxuXHRcdFx0XHRcdFx0XHRAY3VzdG9tU3RhdGVzW3N0YXRlTmFtZV0uYW5pbWF0ZSA9IGFuaW1hdGVcblxuXHRcdFx0XHRcdFx0XHR1bmxlc3MgZXZlbnRzLmluY2x1ZGVzIGV2ZW50TmFtZSB0aGVuIGV2ZW50cy5wdXNoIGV2ZW50TmFtZVxuXG5cdFx0XHRcdGZvciBldmVudE5hbWUgaW4gZXZlbnRzXG5cblx0XHRcdFx0XHRkbyAoZXZlbnROYW1lKSA9PlxuXG5cdFx0XHRcdFx0XHRpZiBFdmVudHNbZXZlbnROYW1lXT8gJiYgQGN1c3RvbVN0YXRlcy5hcnJheS5pbmNsdWRlcyBldmVudE5hbWVcblxuXHRcdFx0XHRcdFx0XHRAb24gRXZlbnRzW2V2ZW50TmFtZV0sIChldmVudCwgbGF5ZXIpIC0+XG5cblx0XHRcdFx0XHRcdFx0XHRhbmltYXRlID0gQGN1c3RvbVN0YXRlc1tldmVudE5hbWVdLmFuaW1hdGVcblx0XHRcdFx0XHRcdFx0XHRAc3RhdGVTd2l0Y2goZXZlbnROYW1lLCB7YW5pbWF0ZTogYW5pbWF0ZX0pXG5cdFx0XHRcdFx0XHRcdFx0QGFuaW1hdGVDaGlsZHJlbigpXG5cblx0XHRcdFx0XHRcdGVsc2UgaWYgRXZlbnRzW2V2ZW50TmFtZV0/XG5cblx0XHRcdFx0XHRcdFx0QG9uIEV2ZW50c1tldmVudE5hbWVdLCAtPlxuXHRcdFx0XHRcdFx0XHRcdGN1cnJlbnRJbmRleCA9IEBjdXN0b21TdGF0ZXMuYXJyYXkuaW5kZXhPZihAc3RhdGVzLmN1cnJlbnQubmFtZSlcblx0XHRcdFx0XHRcdFx0XHRuZXh0SW5kZXggPSBjdXJyZW50SW5kZXggKyAxXG5cdFx0XHRcdFx0XHRcdFx0aWYgbmV4dEluZGV4ID09IEBjdXN0b21TdGF0ZXMuYXJyYXkubGVuZ3RoIHRoZW4gbmV4dEluZGV4ID0gMFxuXHRcdFx0XHRcdFx0XHRcdGFuaW1hdGUgPSBAY3VzdG9tU3RhdGVzW0BjdXN0b21TdGF0ZXMuYXJyYXlbbmV4dEluZGV4XV0uYW5pbWF0ZVxuXHRcdFx0XHRcdFx0XHRcdG5leHRTdGF0ZSA9IEBjdXN0b21TdGF0ZXMuYXJyYXlbbmV4dEluZGV4XVxuXHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdEBzdGF0ZVN3aXRjaChuZXh0U3RhdGUsIHthbmltYXRlOiBhbmltYXRlfSlcblx0XHRcdFx0XHRcdFx0XHRAYW5pbWF0ZUNoaWxkcmVuKClcblxuXHRcdFx0YW5pbWF0ZUNoaWxkcmVuOiAoc3RhdGVOYW1lLCBhbmltYXRlLCBvcHRpb25zPXt9KSAtPlxuXHRcdFx0XHR1bmxlc3Mgc3RhdGVOYW1lPyB0aGVuIHN0YXRlTmFtZSA9IEBzdGF0ZXMuY3VycmVudC5uYW1lXG5cdFx0XHRcdHVubGVzcyBhbmltYXRlPyB0aGVuIGFuaW1hdGUgPSBAY3VzdG9tU3RhdGVzW3N0YXRlTmFtZV0uYW5pbWF0ZVxuXHRcdFx0XHRpZiAhYW5pbWF0ZSB0aGVuIG9wdGlvbnMudGltZSA9IDBcblx0XHRcdFx0Zm9yIGRlYyBpbiBAZGVzY2VuZGFudHNcblx0XHRcdFx0XHRkbyAoZGVjKSA9PlxuXHRcdFx0XHRcdFx0ZGVjLnN0YXRlU3dpdGNoKHN0YXRlTmFtZSwge2FuaW1hdGU6IGFuaW1hdGUsIG9wdGlvbnM6IG9wdGlvbnN9KVxuXG5cdFx0XHRhbmltYXRlU3RhdGU6IChzdGF0ZSwgYW5pbWF0ZSwgb3B0aW9ucz17fSkgLT5cblxuXHRcdFx0XHRpZiAhc3RhdGU/IHx8ICFAY3VzdG9tU3RhdGVzP1tzdGF0ZV0/IHRoZW4gcmV0dXJuXG5cdFx0XHRcdGlmICFhbmltYXRlPyAmJiBAY3VzdG9tU3RhdGVzP1tzdGF0ZV0/IHRoZW4gYW5pbWF0ZSA9IEBjdXN0b21TdGF0ZXNbc3RhdGVdLmFuaW1hdGUgZWxzZSBpZiBhbmltYXRlPyB0aGVuIGFuaW1hdGUgPSBhbmltYXRlIGVsc2UgYW5pbWF0ZSA9IGZhbHNlXG5cdFx0XHRcdGlmICFhbmltYXRlIHRoZW4gb3B0aW9ucy50aW1lID0gMFxuXG5cdFx0XHRcdEBzdGF0ZVN3aXRjaChzdGF0ZSwge2FuaW1hdGU6IGFuaW1hdGUsIG9wdGlvbnM6IG9wdGlvbnN9KVxuXHRcdFx0XHRAYW5pbWF0ZUNoaWxkcmVuKHN0YXRlLCBhbmltYXRlLCBvcHRpb25zKVxuXG5cdFx0XHRAZGVmaW5lIFwiY29uc3RyYWludHNcIixcblx0XHRcdFx0Z2V0OiAtPiBAb3B0aW9ucy5jb25zdHJhaW50c1xuXHRcdFx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdFx0XHRAb3B0aW9ucy5jb25zdHJhaW50cyA9IHZhbHVlXG5cdFx0XHRcdFx0QGVtaXQoXCJjaGFuZ2U6Y29uc3RyYWludHNcIiwgQG9wdGlvbnMuY29uc3RyYWludHMpXG5cdFx0XHRcdFx0QHNldENvbnN0cmFpbnRzIHZhbHVlXG5cblx0XHRcdEBkZWZpbmUgXCJzdGF0ZVwiLFxuXHRcdFx0XHRnZXQ6IC0+IEBvcHRpb25zLnN0YXRlXG5cdFx0XHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0XHRcdEBvcHRpb25zLnN0YXRlID0gdmFsdWVcblx0XHRcdFx0XHRAZW1pdChcImNoYW5nZTpzdGF0ZVwiLCBAb3B0aW9ucy5zdGF0ZSlcblx0XHRcdFx0XHRAYW5pbWF0ZVN0YXRlIHZhbHVlXG5cblxuXG5jdXN0b21TdGF0ZXMgPSBMYXllci5zZWxlY3RBbGwgXCJTdGF0ZV8qXCJcblxuZm9yIGNvbXBvbmVudFN0YXRlIGluIGN1c3RvbVN0YXRlc1xuXG5cdGNsYXNzRXZlbnROYW1lID0gY29tcG9uZW50U3RhdGUubmFtZS5yZXBsYWNlIFwiU3RhdGVfXCIsIFwiXCJcblx0aWYgY2xhc3NFdmVudE5hbWUuaW5jbHVkZXMgXCJfXCJcblx0XHRjbGFzc05hbWUgPSBjbGFzc0V2ZW50TmFtZS5zcGxpdChcIl9cIilbMF1cblx0XHRldmVudE5hbWUgPSBjbGFzc0V2ZW50TmFtZS5zcGxpdChcIl9cIilbMV1cblx0ZWxzZVxuXHRcdGNsYXNzTmFtZSA9IGNsYXNzRXZlbnROYW1lXG5cblxuIyMjXG4tLS0tLS0tLS0tLS0tLS0tLS1cbkVYSVNUSU5HIENMQVNTRVNcbi0tLS0tLS0tLS0tLS0tLS0tLVxuIyMjXG5cblxuY29tcG9uZW50cyA9IExheWVyLnNlbGVjdEFsbCBcIl8qXCJcblxuZXh0ZW5kU2xpZGVyID0gKG9yaWdpbikgLT5cblx0Y2xhc3MgZXhwb3J0cy5TbGlkZXJDb21wb25lbnQgZXh0ZW5kcyBTbGlkZXJDb21wb25lbnRcblxuXHRcdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0XHRAa25vYi5wcm9wcyA9XG5cdFx0XHRcdHNoYWRvd3M6IG9yaWdpbi5rbm9iLnNoYWRvd3Ncblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBvcmlnaW4ua25vYi5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdFx0Ym9yZGVyUmFkaXVzOiBvcmlnaW4ua25vYi5ib3JkZXJSYWRpdXNcblx0XHRcdFx0ZnJhbWU6IG9yaWdpbi5rbm9iLmZyYW1lXG5cblx0XHRcdEBmaWxsLnByb3BzID1cblx0XHRcdFx0c2hhZG93czogb3JpZ2luLmZpbGwuc2hhZG93c1xuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG9yaWdpbi5maWxsLmJhY2tncm91bmRDb2xvclxuXHRcdFx0XHRib3JkZXJSYWRpdXM6IG9yaWdpbi5maWxsLmJvcmRlclJhZGl1c1xuXHRcdFx0XHRmcmFtZTogb3JpZ2luLmZpbGwuZnJhbWVcblxuXHRcdFx0QHByb3BzID1cblx0XHRcdFx0c2hhZG93czogb3JpZ2luLnNoYWRvd3Ncblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBvcmlnaW4uYmFja2dyb3VuZENvbG9yXG5cdFx0XHRcdGJvcmRlclJhZGl1czogb3JpZ2luLmJvcmRlclJhZGl1c1xuXHRcdFx0XHRzaXplOiBvcmlnaW4uc2l6ZVxuXG5cdFx0XHRAdmFsdWUgPSBVdGlscy5tb2R1bGF0ZSBvcmlnaW4ua25vYi5taWRYLCBbMCwgb3JpZ2luLndpZHRoXSwgW0BtaW4sIEBtYXhdXG5cblxuZXh0ZW5kUmFuZ2VTbGlkZXIgPSAob3JpZ2luKSAtPlxuXHRjbGFzcyBleHBvcnRzLlJhbmdlU2xpZGVyQ29tcG9uZW50IGV4dGVuZHMgUmFuZ2VTbGlkZXJDb21wb25lbnRcblxuXHRcdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0XHRAbWluS25vYi5wcm9wcyA9XG5cdFx0XHRcdHNoYWRvd3M6IG9yaWdpbi5taW5Lbm9iLnNoYWRvd3Ncblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBvcmlnaW4ubWluS25vYi5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdFx0Ym9yZGVyUmFkaXVzOiBvcmlnaW4ubWluS25vYi5ib3JkZXJSYWRpdXNcblx0XHRcdFx0ZnJhbWU6IG9yaWdpbi5taW5Lbm9iLmZyYW1lXG5cdFx0XHRAbWF4S25vYi5wcm9wcyA9XG5cdFx0XHRcdHNoYWRvd3M6IG9yaWdpbi5tYXhLbm9iLnNoYWRvd3Ncblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBvcmlnaW4ubWF4S25vYi5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdFx0Ym9yZGVyUmFkaXVzOiBvcmlnaW4ubWF4S25vYi5ib3JkZXJSYWRpdXNcblx0XHRcdFx0ZnJhbWU6IG9yaWdpbi5tYXhLbm9iLmZyYW1lXG5cblx0XHRcdEBmaWxsLnByb3BzID1cblx0XHRcdFx0c2hhZG93czogb3JpZ2luLmZpbGwuc2hhZG93c1xuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG9yaWdpbi5maWxsLmJhY2tncm91bmRDb2xvclxuXHRcdFx0XHRib3JkZXJSYWRpdXM6IG9yaWdpbi5maWxsLmJvcmRlclJhZGl1c1xuXHRcdFx0XHRmcmFtZTogb3JpZ2luLmZpbGwuZnJhbWVcblxuXHRcdFx0QHByb3BzID1cblx0XHRcdFx0c2hhZG93czogb3JpZ2luLnNoYWRvd3Ncblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBvcmlnaW4uYmFja2dyb3VuZENvbG9yXG5cdFx0XHRcdGJvcmRlclJhZGl1czogb3JpZ2luLmJvcmRlclJhZGl1c1xuXHRcdFx0XHRzaXplOiBvcmlnaW4uc2l6ZVxuXHRcdFx0XHRcblx0XHRcdEBtaW5WYWx1ZSA9IFV0aWxzLm1vZHVsYXRlIG9yaWdpbi5taW5Lbm9iLm1pZFgsIFswLCBvcmlnaW4ud2lkdGhdLCBbQG1pbiwgQG1heF1cblx0XHRcdEBtYXhWYWx1ZSA9IFV0aWxzLm1vZHVsYXRlIG9yaWdpbi5tYXhLbm9iLm1pZFgsIFswLCBvcmlnaW4ud2lkdGhdLCBbQG1pbiwgQG1heF1cblxuXG5cbmZvciBjb21wb25lbnQgaW4gY29tcG9uZW50c1xuXG5cdHR5cGUgPSBjb21wb25lbnQubmFtZS5yZXBsYWNlIFwiX1wiLCBcIlwiXG5cblx0ZG8gKGNvbXBvbmVudCkgLT5cblxuXHRcdGNvbXBvbmVudC5hZGREZXNpZ25DaGlsZHJlbigpXG5cblx0XHRpZiB0eXBlID09IFwiU2xpZGVyQ29tcG9uZW50XCJcblx0XHRcdGV4dGVuZFNsaWRlciBjb21wb25lbnRcblx0XHRlbHNlIGlmIHR5cGUgPT0gXCJSYW5nZVNsaWRlckNvbXBvbmVudFwiXG5cdFx0XHRleHRlbmRSYW5nZVNsaWRlciBjb21wb25lbnRcblxuXG5cblxuXG5cblxuXG5cbiIsIlxubW92ZUZyb21SZWYgPSAobGF5ZXIsIHJlZmVyZW5jZSwgbW92ZVJlZiwgbGF5ZXJSZWYsIHJlZlR5cGUpIC0+XG5cblx0b3JpZ2luYWxDb25zdHJhaW50cyA9IGxheWVyLmNvbnN0cmFpbnRWYWx1ZXNcblxuXHRvcmlnaW5hbFJlZlZhbHVlID0gcmVmZXJlbmNlW2xheWVyUmVmXVxuXHRvcmlnaW5hbExheWVyVmFsdWUgPSBsYXllclttb3ZlUmVmXVxuXG5cdGxheWVyW21vdmVSZWZdID0gcmVmZXJlbmNlW2xheWVyUmVmXSArIGxheWVyLmNvbnN0cmFpbnRWYWx1ZXNbcmVmVHlwZV0udmFsdWVcblxuXHQjIHJlZmVyZW5jZS5vbkNoYW5nZSBsYXllclJlZiwgKHZhbHVlKSAtPlxuXHQjIFx0bGF5ZXJbbW92ZVJlZl0gPSBvcmlnaW5hbExheWVyVmFsdWUgKyAodmFsdWUgLSBvcmlnaW5hbFJlZlZhbHVlKVxuXG5cdGxheWVyLmNvbnN0cmFpbnRWYWx1ZXMgPSBvcmlnaW5hbENvbnN0cmFpbnRzXG5cblxucHVzaFBhcmVudCA9IChsYXllciwgZGlyZWN0aW9uKSAtPlxuXG5cdGlmIGRpcmVjdGlvbiA9PSBcImRvd25cIlxuXHRcdG9yaWdpbmFsWSA9IGxheWVyLnlcblx0XHRvcmlnaW5hbEhlaWdodCA9IGxheWVyLmhlaWdodFxuXG5cdFx0bGF5ZXIub25DaGFuZ2UgXCJ5XCIsICh2YWx1ZSkgLT5cblx0XHRcdEBwYXJlbnQuaGVpZ2h0ICs9IHZhbHVlIC0gb3JpZ2luYWxZXG5cdFx0XHRvcmlnaW5hbFkgPSB2YWx1ZVxuXHRcdFx0b3JpZ2luYWxIZWlnaHQgPSBAaGVpZ2h0XG5cdFx0bGF5ZXIub25DaGFuZ2UgXCJoZWlnaHRcIiwgKHZhbHVlKSAtPlxuXHRcdFx0QHBhcmVudC5oZWlnaHQgKz0gdmFsdWUgLSBvcmlnaW5hbEhlaWdodFxuXHRcdFx0b3JpZ2luYWxZID0gQHlcblx0XHRcdG9yaWdpbmFsSGVpZ2h0ID0gdmFsdWVcblx0XG5cdGlmIGRpcmVjdGlvbiA9PSBcInJpZ2h0XCJcblx0XHRvcmlnaW5hbFggPSBsYXllci54XG5cdFx0b3JpZ2luYWxXaWR0aCAtIGxheWVyLndpZHRoXG5cblx0XHRsYXllci5vbkNoYW5nZSBcInhcIiwgKHZhbHVlKSAtPlxuXHRcdFx0QHBhcmVudC53aWR0aCArPSB2YWx1ZSAtIG9yaWdpbmFsWFxuXHRcdFx0b3JpZ2luYWxYID0gdmFsdWVcblx0XHRcdG9yaWdpbmFsV2lkdGggPSBAd2lkdGhcblx0XHRsYXllci5vbkNoYW5nZSBcIndpZHRoXCIsICh2YWx1ZSkgLT5cblx0XHRcdEBwYXJlbnQud2lkdGggKz0gdmFsdWUgLSBvcmlnaW5hbFdpZHRoXG5cdFx0XHRvcmlnaW5hbFggPSBAeFxuXHRcdFx0b3JpZ2luYWxXaWR0aCA9IHZhbHVlXG5cblxuYWRkUmVmZXJlbmNlRXZlbnRzID0gKGxheWVyKSAtPlxuXG5cdG9yaWdpbmFsQ29uc3RyYWludHMgPSBsYXllci5jb25zdHJhaW50VmFsdWVzXG5cblx0aWYgbGF5ZXIuY29uc3RyYWludFZhbHVlcz8udG9wUmVmPy5sYXllcj8gfHwgbGF5ZXIuY29uc3RyYWludFZhbHVlcz8uYm90dG9tUmVmPy5sYXllcj9cblxuXHRcdHJlZmVyZW5jZSA9IGxheWVyLmNvbnN0cmFpbnRWYWx1ZXM/LnRvcFJlZj8ubGF5ZXIgfHwgbGF5ZXIuY29uc3RyYWludFZhbHVlcz8uYm90dG9tUmVmPy5sYXllclxuXG5cdFx0b3JpZ2luYWxZUmVmID0gcmVmZXJlbmNlLnlcblx0XHRvcmlnaW5hbEhlaWdodFJlZiA9IHJlZmVyZW5jZS5oZWlnaHRcblx0XHRvcmlnaW5hbFkgPSBsYXllci55XG5cblx0XHRyZWZlcmVuY2Uub25DaGFuZ2UgXCJ5XCIsICh2YWx1ZSkgLT5cblx0XHRcdGxheWVyLnkgPSBvcmlnaW5hbFkgKyAodmFsdWUgLSBvcmlnaW5hbFlSZWYpXG5cdFx0XHRvcmlnaW5hbFlSZWYgPSB2YWx1ZVxuXHRcdFx0b3JpZ2luYWxZID0gbGF5ZXIueVxuXG5cdFx0dW5sZXNzIGxheWVyLmNvbnN0cmFpbnRWYWx1ZXM/LnRvcFJlZj8uYWxpZ24gPT0gXCJ5XCJcblx0XHRcdHJlZmVyZW5jZS5vbkNoYW5nZSBcImhlaWdodFwiLCAodmFsdWUpIC0+XG5cdFx0XHRcdGxheWVyLnkgPSBvcmlnaW5hbFkgKyAodmFsdWUgLSBvcmlnaW5hbEhlaWdodFJlZilcblx0XHRcdFx0b3JpZ2luYWxIZWlnaHRSZWYgPSB2YWx1ZVxuXHRcdFx0XHRvcmlnaW5hbFkgPSBsYXllci55XG5cblx0XHRpZiBsYXllci5jb25zdHJhaW50VmFsdWVzPy50b3BSZWY/ICYmIGxheWVyLmNvbnN0cmFpbnRWYWx1ZXM/LmJvdHRvbVJlZj9cblx0XHRcdHJlZmVyZW5jZS5vbkNoYW5nZSBcImhlaWdodFwiLCAodmFsdWUpIC0+XG5cdFx0XHRcdGxheWVyLmhlaWdodCA9IHZhbHVlIC0gbGF5ZXIuY29uc3RyYWludFZhbHVlcz8udG9wUmVmLnZhbHVlIC0gbGF5ZXIuY29uc3RyYWludFZhbHVlcz8uYm90dG9tUmVmLnZhbHVlXG5cdFx0XHRcdGxheWVyLnkgPSByZWZlcmVuY2UueSArIGxheWVyLmNvbnN0cmFpbnRWYWx1ZXM/LnRvcFJlZi52YWx1ZVxuXHRcdFx0XHRvcmlnaW5hbEhlaWdodFJlZiA9IHZhbHVlXG5cblx0aWYgbGF5ZXIuY29uc3RyYWludFZhbHVlcz8ubGVmdFJlZj8ubGF5ZXI/IHx8IGxheWVyLmNvbnN0cmFpbnRWYWx1ZXM/LnJpZ2h0UmVmPy5sYXllcj9cblx0XHRyZWZlcmVuY2UgPSBsYXllci5jb25zdHJhaW50VmFsdWVzPy5sZWZ0UmVmPy5sYXllciB8fCBsYXllci5jb25zdHJhaW50VmFsdWVzPy5yaWdodFJlZj8ubGF5ZXJcblxuXHRcdG9yaWdpbmFsWFJlZiA9IHJlZmVyZW5jZS54XG5cdFx0b3JpZ2luYWxXaWR0aFJlZiA9IHJlZmVyZW5jZS53aWR0aFxuXHRcdG9yaWdpbmFsWCA9IGxheWVyLnhcblxuXHRcdHJlZmVyZW5jZS5vbkNoYW5nZSBcInhcIiwgKHZhbHVlKSAtPlxuXHRcdFx0bGF5ZXIueCA9IG9yaWdpbmFsWCArICh2YWx1ZSAtIG9yaWdpbmFsWFJlZilcblx0XHRcdG9yaWdpbmFsWFJlZiA9IHZhbHVlXG5cdFx0XHRvcmlnaW5hbFggPSBsYXllci54XG5cblx0XHR1bmxlc3MgbGF5ZXIuY29uc3RyYWludFZhbHVlcz8ubGVmdD8uYWxpZ24gPT0gXCJ4XCJcblx0XHRcdHJlZmVyZW5jZS5vbkNoYW5nZSBcIndpZHRoXCIsICh2YWx1ZSkgLT5cblx0XHRcdFx0bGF5ZXIueCA9IG9yaWdpbmFsWCArICh2YWx1ZSAtIG9yaWdpbmFsV2lkdGhSZWYpXG5cdFx0XHRcdG9yaWdpbmFsV2lkdGhSZWYgPSB2YWx1ZVxuXHRcdFx0XHRvcmlnaW5hbFggPSBsYXllci54XG5cblx0XHRpZiBsYXllci5jb25zdHJhaW50VmFsdWVzPy5sZWZ0UmVmPyAmJiBsYXllci5jb25zdHJhaW50VmFsdWVzPy5yaWdodFJlZj9cblx0XHRcdHJlZmVyZW5jZS5vbkNoYW5nZSBcIndpZHRoXCIsICh2YWx1ZSkgLT5cblx0XHRcdFx0bGF5ZXIud2lkdGggPSB2YWx1ZSAtIGxheWVyLmNvbnN0cmFpbnRWYWx1ZXM/LmxlZnRSZWYudmFsdWUgLSBsYXllci5jb25zdHJhaW50VmFsdWVzPy5yaWdodFJlZi52YWx1ZVxuXHRcdFx0XHRsYXllci54ID0gcmVmZXJlbmNlLnggKyBsYXllci5jb25zdHJhaW50VmFsdWVzPy5sZWZ0UmVmLnZhbHVlXG5cdFx0XHRcdG9yaWdpbmFsV2lkdGhSZWYgPSB2YWx1ZVxuXG5cbkxheWVyOjpzZXRDb25zdHJhaW50cyA9IChvcHRpb25zPXt9LCBvcmlnaW4pIC0+XG5cblx0QGNvbnN0cmFpbnRWYWx1ZXMgPVxuXHRcdHRvcDogaWYgdHlwZW9mIG9wdGlvbnMudG9wID09IFwib2JqZWN0XCIgdGhlbiBudWxsIGVsc2UgaWYgb3B0aW9ucy50b3A/IHRoZW4gb3B0aW9ucy50b3AgZWxzZSBpZiBvcmlnaW4/LmNvbnN0cmFpbnRWYWx1ZXM/IHRoZW4gb3JpZ2luLmNvbnN0cmFpbnRWYWx1ZXMudG9wIGVsc2UgbnVsbFxuXHRcdGxlZnQ6IGlmIHR5cGVvZiBvcHRpb25zLmxlZnQgPT0gXCJvYmplY3RcIiB0aGVuIG51bGwgZWxzZSBpZiBvcHRpb25zLmxlZnQ/IHRoZW4gb3B0aW9ucy5sZWZ0IGVsc2UgaWYgb3JpZ2luPy5jb25zdHJhaW50VmFsdWVzPyB0aGVuIG9yaWdpbi5jb25zdHJhaW50VmFsdWVzLmxlZnQgZWxzZSBudWxsXG5cdFx0Ym90dG9tOiBpZiB0eXBlb2Ygb3B0aW9ucy5ib3R0b20gPT0gXCJvYmplY3RcIiB0aGVuIG51bGwgZWxzZSBpZiBvcHRpb25zLnB1c2hEb3duIHRoZW4gbnVsbCBlbHNlIGlmIG9wdGlvbnMuYm90dG9tPyB0aGVuIG9wdGlvbnMuYm90dG9tIGVsc2UgaWYgb3JpZ2luPy5jb25zdHJhaW50VmFsdWVzPyB0aGVuIG9yaWdpbi5jb25zdHJhaW50VmFsdWVzLmJvdHRvbSBlbHNlIG51bGxcblx0XHRyaWdodDogaWYgdHlwZW9mIG9wdGlvbnMucmlnaHQgPT0gXCJvYmplY3RcIiB0aGVuIG51bGwgZWxzZSBpZiBvcHRpb25zLnB1c2hSaWdodCB0aGVuIG51bGwgIGVsc2UgaWYgb3B0aW9ucy5yaWdodD8gdGhlbiBvcHRpb25zLnJpZ2h0IGVsc2UgaWYgb3JpZ2luPy5jb25zdHJhaW50VmFsdWVzPyB0aGVuIG9yaWdpbi5jb25zdHJhaW50VmFsdWVzLnJpZ2h0IGVsc2UgbnVsbFxuXHRcdHdpZHRoOiBAd2lkdGhcblx0XHRoZWlnaHQ6IEBoZWlnaHRcblx0XHR3aWR0aEZhY3RvcjogaWYgb3B0aW9ucy5zY2FsZVg/IHRoZW4gb3B0aW9ucy5zY2FsZVggZWxzZSBpZiBvcHRpb25zLndpZHRoRmFjdG9yPyB0aGVuIG9wdGlvbnMud2lkdGhGYWN0b3IgZWxzZSBudWxsXG5cdFx0aGVpZ2h0RmFjdG9yOiBpZiBvcHRpb25zLnNjYWxlWT8gdGhlbiBvcHRpb25zLnNjYWxlWSBlbHNlIGlmIG9wdGlvbnMuaGVpZ2h0RmFjdG9yPyB0aGVuIG9wdGlvbnMuaGVpZ2h0RmFjdG9yIGVsc2UgbnVsbFxuXHRcdGNlbnRlckFuY2hvclg6IGlmIG9wdGlvbnMuY2VudGVyWD8gdGhlbiBvcHRpb25zLmNlbnRlclggZWxzZSBpZiBvcHRpb25zLmNlbnRlckFuY2hvclg/IHRoZW4gb3B0aW9ucy5jZW50ZXJBbmNob3JYIGVsc2UgbnVsbFxuXHRcdGNlbnRlckFuY2hvclk6IGlmIG9wdGlvbnMuY2VudGVyWT8gdGhlbiBvcHRpb25zLmNlbnRlclkgZWxzZSBpZiBvcHRpb25zLmNlbnRlckFuY2hvclk/IHRoZW4gb3B0aW9ucy5jZW50ZXJBbmNob3JZIGVsc2UgbnVsbFxuXHRcdGFzcGVjdFJhdGlvTG9ja2VkOiBpZiBvcHRpb25zLmFzcGVjdFJhdGlvTG9ja2VkPyB0aGVuIG9wdGlvbnMuYXNwZWN0UmF0aW9Mb2NrZWQgZWxzZSBpZiBvcmlnaW4/LmNvbnN0cmFpbnRWYWx1ZXMgdGhlbiBvcmlnaW4uY29uc3RyYWludFZhbHVlcy5hc3BlY3RSYXRpb0xvY2tlZCBlbHNlIGZhbHNlXG5cblx0IyByZXNldHNcblx0dmFsdWVzID0gQGNvbnN0cmFpbnRWYWx1ZXNcblx0aWYgdmFsdWVzLnRvcD8gJiYgdmFsdWVzLmJvdHRvbT9cblx0XHRAY29uc3RyYWludFZhbHVlcy5oZWlnaHRGYWN0b3IgPSBudWxsXG5cdFx0QGNvbnN0cmFpbnRWYWx1ZXMuY2VudGVyQW5jaG9yWSA9IG51bGxcblx0aWYgdmFsdWVzLmxlZnQ/ICYmIHZhbHVlcy5yaWdodD9cblx0XHRAY29uc3RyYWludFZhbHVlcy53aWR0aEZhY3RvciA9IG51bGxcblx0XHRAY29uc3RyYWludFZhbHVlcy5jZW50ZXJBbmNob3JYID0gbnVsbFxuXHRpZiB2YWx1ZXMubGVmdD8gJiYgdmFsdWVzLnJpZ2h0PyAmJiB2YWx1ZXMudG9wPyAmJiB2YWx1ZXMuYm90dG9tP1xuXHRcdEBjb25zdHJhaW50VmFsdWVzLmFzcGVjdFJhdGlvTG9ja2VkID0gZmFsc2VcblxuXHRmb3IgcmVmIGluIFtbXCJ0b3BcIiwgXCJ5XCIsIFwibWF4WVwiLCBcInRvcFJlZlwiLCBcImJvdHRvbVwiXSwgW1wibGVmdFwiLCBcInhcIiwgXCJtYXhYXCIsIFwibGVmdFJlZlwiLCBcInJpZ2h0XCJdLCBbXCJib3R0b21cIiwgXCJtYXhZXCIsIFwieVwiLCBcImJvdHRvbVJlZlwiLCBcInRvcFwiXSwgW1wicmlnaHRcIiwgXCJtYXhYXCIsIFwieFwiLCBcInJpZ2h0UmVmXCIsIFwibGVmdFwiXV1cblxuXHRcdGlmIHR5cGVvZiBvcHRpb25zW3JlZlswXV0gPT0gXCJvYmplY3RcIiAmJiBvcHRpb25zW3JlZlswXV0gIT0gbnVsbCAmJiAhb3B0aW9uc1tyZWZbM11dP1xuXG5cdFx0XHRpZiBvcHRpb25zW3JlZlswXV0ubGF5ZXI/XG5cdFx0XHRcdGlmIEBwYXJlbnQ/ICYmIEBwYXJlbnQuc2VsZWN0Q2hpbGQob3B0aW9uc1tyZWZbMF1dLmxheWVyKT9cblx0XHRcdFx0XHRsYXllciA9IEBwYXJlbnQuc2VsZWN0Q2hpbGQgb3B0aW9uc1tyZWZbMF1dLmxheWVyXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRsYXllciA9IExheWVyLnNlbGVjdCBvcHRpb25zW3JlZlswXV0ubGF5ZXJcblx0XHRcdGVsc2UgbGF5ZXIgPSBAcGFyZW50XG5cblx0XHRcdGFsaWduID0gbnVsbFxuXG5cdFx0XHRpZiAhb3B0aW9uc1tyZWZbMF1dLnZhbHVlPyAmJiBsYXllciA9PSBAcGFyZW50XG5cdFx0XHRcdHZhbHVlID0gQFtyZWZbMV1dXG5cdFx0XHRlbHNlIGlmIG9wdGlvbnNbcmVmWzBdXS5hbGlnbj8gJiYgb3B0aW9uc1tyZWZbMF1dLnZhbHVlP1xuXHRcdFx0XHR2YWx1ZSA9IG9wdGlvbnNbcmVmWzBdXS52YWx1ZVxuXHRcdFx0XHRhbGlnbiA9IG9wdGlvbnNbcmVmWzBdXS5hbGlnblxuXHRcdFx0ZWxzZSBpZiBvcHRpb25zW3JlZlswXV0uYWxpZ24/XG5cdFx0XHRcdHZhbHVlID0gMFxuXHRcdFx0XHRhbGlnbiA9IG9wdGlvbnNbcmVmWzBdXS5hbGlnblxuXHRcdFx0ZWxzZSBpZiAhb3B0aW9uc1tyZWZbMF1dLnZhbHVlPyAmJiAhb3B0aW9uc1tyZWZbMF1dLmFsaWduP1xuXHRcdFx0XHR2YWx1ZSA9IEBbcmVmWzFdXSAtIGxheWVyW3JlZlsyXV1cblx0XHRcdFx0YWxpZ24gPSByZWZbNF1cblx0XHRcdGVsc2Vcblx0XHRcdFx0dmFsdWUgPSBvcHRpb25zW3JlZlswXV0udmFsdWVcblx0XHRcdFx0YWxpZ24gPSByZWZbNF1cblxuXHRcdFx0aWYgYWxpZ24gPT0gXCJsZWZ0XCIgdGhlbiBhbGlnbiA9IFwieFwiXG5cdFx0XHRlbHNlIGlmIGFsaWduID09IFwicmlnaHRcIiB0aGVuIGFsaWduID0gXCJtYXhYXCJcblx0XHRcdGVsc2UgaWYgYWxpZ24gPT0gXCJ0b3BcIiB0aGVuIGFsaWduID0gXCJ5XCJcblx0XHRcdGVsc2UgaWYgYWxpZ24gPT0gXCJib3R0b21cIiB0aGVuIGFsaWduID0gXCJtYXhZXCJcblxuXHRcdFx0QGNvbnN0cmFpbnRWYWx1ZXNbcmVmWzNdXSA9XG5cdFx0XHRcdGxheWVyOiBsYXllclxuXHRcdFx0XHR2YWx1ZTogdmFsdWVcblx0XHRcdFx0YWxpZ246IGFsaWduXG5cblx0XHRcdEBjb25zdHJhaW50VmFsdWVzW3JlZlswXV0gPSBudWxsXG5cdFx0XHRAY29uc3RyYWludFZhbHVlc1tyZWZbNF1dID0gbnVsbFxuXG5cdFx0XHQjIG1vdmVGcm9tUmVmIEAsIGxheWVyLCByZWZbMV0sIHJlZlsyXSwgcmVmWzNdXG5cblx0aWYgb3B0aW9ucy5wdXNoRG93bj9cblx0XHRAY29uc3RyYWludFZhbHVlcy5ib3R0b20gPSBudWxsXG5cdFx0cHVzaFBhcmVudCBALCBcImRvd25cIlxuXHRpZiBvcHRpb25zLnB1c2hSaWdodD9cblx0XHRAY29uc3RyYWludFZhbHVlcy5yaWdodCA9IG51bGxcblx0XHRwdXNoUGFyZW50IEAsIFwicmlnaHRcIlxuXG5cdHVubGVzcyBvcHRpb25zLnB1c2hEb3duIHx8IEBjb25zdHJhaW50VmFsdWVzLnRvcFJlZiB8fCBAY29uc3RyYWludFZhbHVlcy5ib3R0b21SZWZcblx0XHRAY29uc3RyYWludFZhbHVlcy5ib3R0b20gPSBpZiBvcHRpb25zLmJvdHRvbT8gdGhlbiBvcHRpb25zLmJvdHRvbSBlbHNlIGlmIG9yaWdpbj8uY29uc3RyYWludFZhbHVlcz8gdGhlbiBvcmlnaW4uY29uc3RyYWludFZhbHVlcy5ib3R0b20gZWxzZSBudWxsXG5cdHVubGVzcyBvcHRpb25zLnB1c2hSaWdodCB8fCBAY29uc3RyYWludFZhbHVlcy5sZWZ0UmVmIHx8IEBjb25zdHJhaW50VmFsdWVzLnJpZ2h0UmVmXG5cdFx0QGNvbnN0cmFpbnRWYWx1ZXMucmlnaHQgPSBpZiBvcHRpb25zLnJpZ2h0PyB0aGVuIG9wdGlvbnMucmlnaHQgZWxzZSBpZiBvcmlnaW4/LmNvbnN0cmFpbnRWYWx1ZXM/IHRoZW4gb3JpZ2luLmNvbnN0cmFpbnRWYWx1ZXMucmlnaHQgZWxzZSBudWxsXG5cblx0aWYgQGNvbnN0cmFpbnRWYWx1ZXMudG9wID09IG51bGwgJiYgQGNvbnN0cmFpbnRWYWx1ZXMuYm90dG9tID09IG51bGwgJiYgQGNvbnN0cmFpbnRWYWx1ZXMuY2VudGVyQW5jaG9yWSA9PSBudWxsICYmICFAY29uc3RyYWludFZhbHVlcy50b3BSZWYgJiYgIUBjb25zdHJhaW50VmFsdWVzLmJvdHRvbVJlZlxuXHRcdEBjb25zdHJhaW50VmFsdWVzLnRvcCA9IEB5XG5cdGlmIEBjb25zdHJhaW50VmFsdWVzLmxlZnQgPT0gbnVsbCAmJiBAY29uc3RyYWludFZhbHVlcy5yaWdodCA9PSBudWxsICYmIEBjb25zdHJhaW50VmFsdWVzLmNlbnRlckFuY2hvclggPT0gbnVsbCAmJiAhQGNvbnN0cmFpbnRWYWx1ZXMubGVmdFJlZiAmJiAhQGNvbnN0cmFpbnRWYWx1ZXMucmlnaHRSZWZcblx0XHRAY29uc3RyYWludFZhbHVlcy5sZWZ0ID0gQHhcblxuXHRAYXBwbHlDb25zdHJhaW50cygpXG5cblxuXG5MYXllcjo6YXBwbHlDb25zdHJhaW50cyA9IC0+XG5cblx0cmV0dXJuIGlmICFAY29uc3RyYWludFZhbHVlc1xuXG5cdHZhbHVlcyA9IEBjb25zdHJhaW50VmFsdWVzXG5cblx0aWYgIUBwYXJlbnQgdGhlbiBwYXJlbnQgPSBTY3JlZW4gZWxzZSBwYXJlbnQgPSBAcGFyZW50XG5cblx0YXNwZWN0UmF0aW8gPSBAd2lkdGggLyBAaGVpZ2h0XG5cblx0IyBwb3NpdGlvblxuXHRpZiB2YWx1ZXMudG9wPyAmJiB0eXBlb2YgdmFsdWVzLnRvcCAhPSBcIm9iamVjdFwiXG5cdFx0QHkgPSB2YWx1ZXMudG9wXG5cdGVsc2UgaWYgdmFsdWVzLnRvcCA9PSBudWxsICYmIHZhbHVlcy50b3BSZWY/LmxheWVyP1xuXHRcdEB5ID0gdmFsdWVzLnRvcFJlZi5sYXllclt2YWx1ZXMudG9wUmVmLmFsaWduXSArIHZhbHVlcy50b3BSZWYudmFsdWVcblxuXHRpZiB2YWx1ZXMubGVmdD8gJiYgdHlwZW9mIHZhbHVlcy5sZWZ0ICE9IFwib2JqZWN0XCJcblx0XHRAeCA9IHZhbHVlcy5sZWZ0XG5cdGVsc2UgaWYgdmFsdWVzLmxlZnQgPT0gbnVsbCAmJiB2YWx1ZXMubGVmdFJlZj8ubGF5ZXI/XG5cdFx0QHggPSB2YWx1ZXMubGVmdFJlZi5sYXllclt2YWx1ZXMubGVmdFJlZi5hbGlnbl0gKyB2YWx1ZXMubGVmdFJlZi52YWx1ZVxuXG5cdCMgc2l6ZVxuXHRpZiB2YWx1ZXMubGVmdD8gJiYgdmFsdWVzLnJpZ2h0P1xuXHRcdEB3aWR0aCA9IHBhcmVudC53aWR0aCAtIEB4IC0gdmFsdWVzLnJpZ2h0XG5cdFx0aWYgdmFsdWVzLmFzcGVjdFJhdGlvTG9ja2VkXG5cdFx0XHRAaGVpZ2h0ID0gQHdpZHRoIC8gYXNwZWN0UmF0aW9cblx0aWYgdmFsdWVzLnRvcD8gJiYgdmFsdWVzLmJvdHRvbT9cblx0XHRAaGVpZ2h0ID0gcGFyZW50LmhlaWdodCAtIEB5IC0gdmFsdWVzLmJvdHRvbVxuXHRcdGlmIHZhbHVlcy5hc3BlY3RSYXRpb0xvY2tlZFxuXHRcdFx0QHdpZHRoID0gQGhlaWdodCAqIGFzcGVjdFJhdGlvXG5cblx0IyBpZiB2YWx1ZXMubGVmdFJlZj8gJiYgdmFsdWVzLnJpZ2h0UmVmP1xuXHQjIFx0QHdpZHRoID0gcGFyZW50LndpZHRoIC0gdmFsdWVzLmxlZnRSZWYudmFsdWUgLSB2YWx1ZXMucmlnaHRSZWYudmFsdWVcblx0IyBpZiB2YWx1ZXMudG9wUmVmPyAmJiB2YWx1ZXMuYm90dG9tUmVmP1xuXHQjIFx0QGhlaWdodCA9IHBhcmVudC5oZWlnaHQgLSB2YWx1ZXMudG9wUmVmLnZhbHVlIC0gdmFsdWVzLmJvdHRvbVJlZi52YWx1ZVxuXG5cdGlmIHZhbHVlcy53aWR0aEZhY3Rvcj9cblx0XHRAd2lkdGggPSBwYXJlbnQud2lkdGggKiB2YWx1ZXMud2lkdGhGYWN0b3Jcblx0aWYgdmFsdWVzLmhlaWdodEZhY3Rvcj9cblx0XHRAaGVpZ2h0ID0gcGFyZW50LmhlaWdodCAqIHZhbHVlcy5oZWlnaHRGYWN0b3JcblxuXHQjIG1heCBwb3NpdGlvblxuXHRpZiB2YWx1ZXMucmlnaHQ/IFxuXHRcdEBtYXhYID0gcGFyZW50LndpZHRoIC0gdmFsdWVzLnJpZ2h0XG5cdGVsc2UgaWYgdmFsdWVzLnJpZ2h0ID09IG51bGwgJiYgdmFsdWVzLnJpZ2h0UmVmPy5sYXllcj9cblx0XHRAbWF4WCA9IHZhbHVlcy5yaWdodFJlZi5sYXllclt2YWx1ZXMucmlnaHRSZWYuYWxpZ25dIC0gdmFsdWVzLnJpZ2h0UmVmLnZhbHVlXG5cdGlmIHZhbHVlcy5ib3R0b20/XG5cdFx0QG1heFkgPSBwYXJlbnQuaGVpZ2h0IC0gdmFsdWVzLmJvdHRvbVxuXHRlbHNlIGlmIHZhbHVlcy5ib3R0b20gPT0gbnVsbCAmJiB2YWx1ZXMuYm90dG9tUmVmPy5sYXllcj9cblx0XHRAbWF4WSA9IHZhbHVlcy5ib3R0b21SZWYubGF5ZXJbdmFsdWVzLmJvdHRvbVJlZi5hbGlnbl0gLSB2YWx1ZXMuYm90dG9tUmVmLnZhbHVlXG5cblx0IyBjZW50ZXIgcG9zaXRpb25cblx0aWYgIXZhbHVlcy5sZWZ0PyAmJiAhdmFsdWVzLnJpZ2h0PyAmJiB2YWx1ZXMuY2VudGVyQW5jaG9yWD9cblx0XHRAbWlkWCA9IHBhcmVudC53aWR0aCAqIHZhbHVlcy5jZW50ZXJBbmNob3JYXG5cdGlmICF2YWx1ZXMudG9wPyAmJiAhdmFsdWVzLmJvdHRvbT8gJiYgdmFsdWVzLmNlbnRlckFuY2hvclk/XG5cdFx0QG1pZFkgPSBwYXJlbnQuaGVpZ2h0ICogdmFsdWVzLmNlbnRlckFuY2hvcllcblxuXHRAY29uc3RyYWludFZhbHVlcyA9IHZhbHVlc1xuXG5cdGFkZFJlZmVyZW5jZUV2ZW50cyhAKVxuXG5cblxuXG5cblxuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShMYXllci5wcm90b3R5cGUsIFwiY29uc3RyYWludHNcIiwge1xuXG5cdGdldDogLT4gcmV0dXJuIEBfY29uc3RyYWludHNcblx0c2V0OiAodmFsdWUpIC0+XG5cdFx0QF9jb25zdHJhaW50cyA9IHZhbHVlXG5cdFx0QGVtaXQgXCJjaGFuZ2U6Y29uc3RyYWludHNcIiwgdmFsdWVcblx0XHRAc2V0Q29uc3RyYWludHMgdmFsdWVcblxufSlcblxuXG5cblxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFFQUE7QURDQSxJQUFBOztBQUFBLFdBQUEsR0FBYyxTQUFDLEtBQUQsRUFBUSxTQUFSLEVBQW1CLE9BQW5CLEVBQTRCLFFBQTVCLEVBQXNDLE9BQXRDO0FBRWIsTUFBQTtFQUFBLG1CQUFBLEdBQXNCLEtBQUssQ0FBQztFQUU1QixnQkFBQSxHQUFtQixTQUFVLENBQUEsUUFBQTtFQUM3QixrQkFBQSxHQUFxQixLQUFNLENBQUEsT0FBQTtFQUUzQixLQUFNLENBQUEsT0FBQSxDQUFOLEdBQWlCLFNBQVUsQ0FBQSxRQUFBLENBQVYsR0FBc0IsS0FBSyxDQUFDLGdCQUFpQixDQUFBLE9BQUEsQ0FBUSxDQUFDO1NBS3ZFLEtBQUssQ0FBQyxnQkFBTixHQUF5QjtBQVpaOztBQWVkLFVBQUEsR0FBYSxTQUFDLEtBQUQsRUFBUSxTQUFSO0FBRVosTUFBQTtFQUFBLElBQUcsU0FBQSxLQUFhLE1BQWhCO0lBQ0MsU0FBQSxHQUFZLEtBQUss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
