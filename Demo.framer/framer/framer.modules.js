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
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

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

    function _Class(options) {
      var base, state;
      this.options = options != null ? options : {};
      _Class.__super__.constructor.call(this, this.options);
      this.props = Object.assign(component.props, {
        parent: this.options.parent
      });
      this.parent = (base = this.options).parent != null ? base.parent : base.parent = Screen.content;
      this.addChildren();
      this.setChildProps();
      this.addStateEvents();
      this.originalProps = this.props;
      this.setConstraints(this.options.constraints, component);
      this.props = this.options;
      this.setConstraints();
      if (this.options.state != null) {
        state = Layer.select(this.options.state + "_State_" + name + "*");
        if (state != null) {
          this.changeState(state);
        }
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
        parent[layer.name] = layer;
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

    _Class.prototype.addStateEvents = function() {
      var eventName, fn1, k, key, len2, results, state, stateComponents, states, value;
      stateComponents = Layer.selectAll("*State_" + name + "_*");
      if (stateComponents.length > 0) {
        states = {};
        eventName = "";
        this.stateIndex = 0;
        fn1 = (function(_this) {
          return function(state) {
            var stateName;
            eventName = state.name.replace("State_" + name + "_", "");
            if (eventName.includes("_")) {
              eventName = eventName.split("_")[1];
              if (states[eventName] == null) {
                states[eventName] = [];
              }
              stateName = state.name.replace("_State_" + name + "_" + eventName, "");
              return states[eventName].push(state);
            } else {
              if (Events[eventName] != null) {
                return _this.on(Events[eventName], function(event) {
                  return this.changeState(state);
                });
              }
            }
          };
        })(this);
        for (k = 0, len2 = stateComponents.length; k < len2; k++) {
          state = stateComponents[k];
          fn1(state);
        }
        if (Object.keys(states).length > 0) {
          results = [];
          for (key in states) {
            value = states[key];
            if (Events[key] != null) {
              results.push(this.on(Events[key], function(event) {
                return this.cycleStates(value);
              }));
            } else {
              results.push(void 0);
            }
          }
          return results;
        }
      }
    };

    _Class.prototype.changeState = function(state) {
      var child, k, l, len2, len3, prop, ref1, results, stateChild;
      for (k = 0, len2 = stateChangeProps.length; k < len2; k++) {
        prop = stateChangeProps[k];
        this[prop] = state[prop];
      }
      ref1 = this.selectAllChildren("*");
      results = [];
      for (l = 0, len3 = ref1.length; l < len3; l++) {
        child = ref1[l];
        stateChild = state.selectChild(child.name);
        results.push((function() {
          var len4, m, ref2, results1;
          ref2 = slice.call(stateChangeProps).concat(["frame"]);
          results1 = [];
          for (m = 0, len4 = ref2.length; m < len4; m++) {
            prop = ref2[m];
            results1.push(child[prop] = stateChild[prop]);
          }
          return results1;
        })());
      }
      return results;
    };

    _Class.prototype.cycleStates = function(states) {
      this.changeState(states[this.stateIndex]);
      if (this.stateIndex === states.length - 1) {
        return this.stateIndex = 0;
      } else {
        return this.stateIndex++;
      }
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

    function SliderComponent(options) {
      this.options = options != null ? options : {};
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

    function RangeSliderComponent(options) {
      this.options = options != null ? options : {};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NlYmFzdGlhbi9Eb2N1bWVudHMvUm9ndWUgT25lL0dpdEh1Yi9mcmFtZXItRGVzaWduQ29tcG9uZW50cy9EZW1vLmZyYW1lci9tb2R1bGVzL0Rlc2lnbkNvbXBvbmVudHMuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2ViYXN0aWFuL0RvY3VtZW50cy9Sb2d1ZSBPbmUvR2l0SHViL2ZyYW1lci1EZXNpZ25Db21wb25lbnRzL0RlbW8uZnJhbWVyL21vZHVsZXMvQ29uc3RyYWludHMuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJDb25zdHJhaW50cyA9IHJlcXVpcmUgXCJDb25zdHJhaW50c1wiXG5cbiMjI1xuLS0tLS0tLS0tLS0tLS0tLS0tXG5DVVNUT00gQ0xBU1NFU1xuLS0tLS0tLS0tLS0tLS0tLS0tXG4jIyNcblxua2l0ID0gTGF5ZXIuc2VsZWN0IFwiKlVJS2l0KlwiXG5pZiBraXQ/IHRoZW4ga2l0LnggPSBTY3JlZW4ud2lkdGggKiAxMDAwOyBraXQubmFtZSA9IFwiLlVJS2l0XCJcblxuZm9yIGxheWVyIGluIExheWVyLnNlbGVjdEFsbCBcIkAqXCJcblx0cGFyZW50ID0gbGF5ZXIucGFyZW50XG5cdG5hbWUgPSBsYXllci5uYW1lLnJlcGxhY2UgXCJAXCIsIFwiXCJcblx0cGFyZW50W25hbWVdID0gbGF5ZXJcblxuY3VzdG9tQ29tcG9uZW50cyA9IExheWVyLnNlbGVjdEFsbCBcIkN1c3RvbV8qXCJcblxuTGF5ZXI6OmFkZERlc2lnbkNoaWxkcmVuID0gKG9yaWdpbikgLT5cblx0aWYgIW9yaWdpbj8gdGhlbiBvcmlnaW4gPSBAXG5cdGZvciBjaGlsZCBpbiBvcmlnaW4uc2VsZWN0QWxsQ2hpbGRyZW4gKFwiKlwiKVxuXHRcdHBhcmVudCA9IGNoaWxkLnBhcmVudFxuXHRcdHBhcmVudFtjaGlsZC5uYW1lXSA9IGNoaWxkXG5cblxuc3RhdGVDaGFuZ2VQcm9wcyA9IFtcblx0XCJ3aWR0aFwiLCBcImhlaWdodFwiLFxuXHRcIm9wYWNpdHlcIixcblx0XCJzY2FsZVhcIiwgXCJzY2FsZVlcIiwgXCJzY2FsZVpcIiwgXCJzY2FsZVwiLFxuXHRcInNrZXdYXCIsIFwic2tld1lcIiwgXCJza2V3XCIsXG5cdFwicm90YXRpb25YXCIsIFwicm90YXRpb25ZXCIsIFwicm90YXRpb25aXCIsIFwicm90YXRpb25cIixcblx0XCJibHVyXCIsXG5cdFwiYnJpZ2h0bmVzc1wiLCBcInNhdHVyYXRlXCIsIFwiaHVlUm90YXRlXCIsIFwiY29udHJhc3RcIiwgXCJpbnZlcnRcIiwgXCJncmF5c2NhbGVcIiwgXCJzZXBpYVwiLCBcImJsZW5kaW5nXCIsXG5cdFwiYmFja2dyb3VuZEJsdXJcIiwgXCJiYWNrZ3JvdW5kQnJpZ2h0bmVzc1wiLCBcImJhY2tncm91bmRTYXR1cmF0ZVwiLCBcImJhY2tncm91bmRIdWVSb3RhdGVcIiwgXCJiYWNrZ3JvdW5kQ29udHJhc3RcIiwgXCJiYWNrZ3JvdW5kSW52ZXJ0XCIsIFwiYmFja2dyb3VuZEdyYXlzY2FsZVwiLCBcImJhY2tncm91bmRTZXBpYVwiLFxuXHRcInNoYWRvdzFcIiwgXCJzaGFkb3cyXCIsIFwic2hhZG93M1wiLCBcInNoYWRvdzRcIiwgXCJzaGFkb3c1XCIsIFwic2hhZG93NlwiLCBcInNoYWRvdzdcIiwgXCJzaGFkb3c4XCIsIFwic2hhZG93OVwiLFxuXHRcInNoYWRvd1hcIiwgXCJzaGFkb3dZXCIsIFwic2hhZG93Qmx1clwiLCBcInNoYWRvd1NwcmVhZFwiLCBcInNoYWRvd0NvbG9yXCIsIFwic2hhZG93VHlwZVwiLFxuXHRcInNoYWRvd3NcIixcblx0XCJiYWNrZ3JvdW5kQ29sb3JcIiwgXCJjb2xvclwiLFxuXHRcImJvcmRlclJhZGl1c1wiLCBcImJvcmRlckNvbG9yXCIsIFwiYm9yZGVyV2lkdGhcIiwgXCJib3JkZXJTdHlsZVwiLFxuXHRcImltYWdlXCIsIFwiZ3JhZGllbnRcIixcblx0XCJ0ZXh0XCJcbl1cblxuXG5cbmZvciBjb21wb25lbnQgaW4gY3VzdG9tQ29tcG9uZW50c1xuXG5cdG5hbWUgPSBjb21wb25lbnQubmFtZS5yZXBsYWNlIFwiQ3VzdG9tX1wiLCBcIlwiXG5cblx0ZG8gKGNvbXBvbmVudCwgbmFtZSkgLT5cblxuXHRcdGNsYXNzIGV4cG9ydHNbbmFtZV0gZXh0ZW5kcyBMYXllclxuXG5cdFx0XHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0XHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRcdFx0QHByb3BzID0gT2JqZWN0LmFzc2lnbiBjb21wb25lbnQucHJvcHMsIHtwYXJlbnQ6IEBvcHRpb25zLnBhcmVudH1cblx0XHRcdFx0QHBhcmVudCA9IEBvcHRpb25zLnBhcmVudCA/PSBTY3JlZW4uY29udGVudFxuXG5cdFx0XHRcdEBhZGRDaGlsZHJlbigpXG5cdFx0XHRcdEBzZXRDaGlsZFByb3BzKClcblx0XHRcdFx0XG5cdFx0XHRcdEBhZGRTdGF0ZUV2ZW50cygpXG5cblx0XHRcdFx0QG9yaWdpbmFsUHJvcHMgPSBAcHJvcHNcblxuXHRcdFx0XHRAc2V0Q29uc3RyYWludHMgQG9wdGlvbnMuY29uc3RyYWludHMsIGNvbXBvbmVudFxuXG5cdFx0XHRcdEBwcm9wcyA9IEBvcHRpb25zXG5cblx0XHRcdFx0QHNldENvbnN0cmFpbnRzKClcblxuXHRcdFx0XHRpZiBAb3B0aW9ucy5zdGF0ZT9cblx0XHRcdFx0XHRzdGF0ZSA9IExheWVyLnNlbGVjdCBcIiN7QG9wdGlvbnMuc3RhdGV9X1N0YXRlXyN7bmFtZX0qXCJcblx0XHRcdFx0XHRpZiBzdGF0ZT8gdGhlbiBAY2hhbmdlU3RhdGUgc3RhdGVcblxuXG5cdFx0XHRzZXRDaGlsZFByb3BzOiAocGFyZW50KSAtPlxuXG5cdFx0XHRcdGZvciBrZXksIHZhbHVlIG9mIEBvcHRpb25zXG5cdFx0XHRcdFx0aWYgQFtrZXldPyAmJiBAW2tleV0gaW5zdGFuY2VvZiBMYXllclxuXG5cdFx0XHRcdFx0XHRpZiBAW2tleV0uY29uc3RydWN0b3IubmFtZSA9PSBcIlRleHRMYXllclwiICYmIEBba2V5XS5hdXRvU2l6ZSAhPSB0cnVlXG5cdFx0XHRcdFx0XHRcdEBba2V5XS5wcm9wcyA9IHZhbHVlXG5cdFx0XHRcdFx0XHRcdHdpZHRoID0gQFtrZXldLndpZHRoXG5cdFx0XHRcdFx0XHRcdEBba2V5XS5hdXRvU2l6ZSA9IHRydWVcblx0XHRcdFx0XHRcdFx0QFtrZXldLndpZHRoID0gd2lkdGhcblx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0QFtrZXldLnByb3BzID0gdmFsdWVcblxuXG5cblx0XHRcdGFkZENoaWxkcmVuOiAocGFyZW50LCBvcmlnaW4pIC0+XG5cblx0XHRcdFx0aWYgIW9yaWdpbj8gdGhlbiBvcmlnaW4gPSBjb21wb25lbnRcblx0XHRcdFx0aWYgIXBhcmVudD8gdGhlbiBwYXJlbnQgPSBAXG5cblx0XHRcdFx0Zm9yIGNoaWxkIGluIG9yaWdpbi5jaGlsZHJlblxuXG5cdFx0XHRcdFx0bGF5ZXIgPSBjaGlsZC5jb3B5U2luZ2xlKClcblx0XHRcdFx0XHRsYXllci5wYXJlbnQgPSBwYXJlbnRcblxuXHRcdFx0XHRcdHBhcmVudFtsYXllci5uYW1lXSA9IGxheWVyXG5cblx0XHRcdFx0XHRpZiBAb3B0aW9uc1tsYXllci5uYW1lXT8uY29uc3RyYWludHM/XG5cdFx0XHRcdFx0XHRsYXllci5zZXRDb25zdHJhaW50cyBAb3B0aW9uc1tsYXllci5uYW1lXS5jb25zdHJhaW50cywgY2hpbGRcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRsYXllci5zZXRDb25zdHJhaW50cyB7fSwgY2hpbGRcblxuXHRcdFx0XHRcdGlmIGNoaWxkLmNoaWxkcmVuPyAmJiBjaGlsZC5jaGlsZHJlbi5sZW5ndGggPiAwXG5cdFx0XHRcdFx0XHRAYWRkQ2hpbGRyZW4gbGF5ZXIsIGNoaWxkXG5cblx0XHRcdGFkZFN0YXRlRXZlbnRzOiAtPlxuXG5cdFx0XHRcdHN0YXRlQ29tcG9uZW50cyA9IExheWVyLnNlbGVjdEFsbCBcIipTdGF0ZV8je25hbWV9XypcIlxuXG5cdFx0XHRcdGlmIHN0YXRlQ29tcG9uZW50cy5sZW5ndGggPiAwXG5cblx0XHRcdFx0XHRzdGF0ZXMgPSB7fVxuXHRcdFx0XHRcdGV2ZW50TmFtZSA9IFwiXCJcblx0XHRcdFx0XHRAc3RhdGVJbmRleCA9IDBcblxuXHRcdFx0XHRcdGZvciBzdGF0ZSBpbiBzdGF0ZUNvbXBvbmVudHNcblxuXHRcdFx0XHRcdFx0ZG8gKHN0YXRlKSA9PlxuXG5cdFx0XHRcdFx0XHRcdGV2ZW50TmFtZSA9IHN0YXRlLm5hbWUucmVwbGFjZSBcIlN0YXRlXyN7bmFtZX1fXCIsIFwiXCJcblxuXHRcdFx0XHRcdFx0XHRpZiBldmVudE5hbWUuaW5jbHVkZXMgXCJfXCJcblx0XHRcdFx0XHRcdFx0XHRldmVudE5hbWUgPSBldmVudE5hbWUuc3BsaXQoXCJfXCIpWzFdXG5cdFx0XHRcdFx0XHRcdFx0dW5sZXNzIHN0YXRlc1tldmVudE5hbWVdPyB0aGVuIHN0YXRlc1tldmVudE5hbWVdID0gW11cblx0XHRcdFx0XHRcdFx0XHRzdGF0ZU5hbWUgPSBzdGF0ZS5uYW1lLnJlcGxhY2UgXCJfU3RhdGVfI3tuYW1lfV8je2V2ZW50TmFtZX1cIiwgXCJcIlxuXHRcdFx0XHRcdFx0XHRcdHN0YXRlc1tldmVudE5hbWVdLnB1c2ggc3RhdGVcblx0XHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHRcdGlmIEV2ZW50c1tldmVudE5hbWVdP1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRAb24gRXZlbnRzW2V2ZW50TmFtZV0sIChldmVudCkgLT5cblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRAY2hhbmdlU3RhdGUgc3RhdGVcblxuXHRcdFx0XHRcdGlmIE9iamVjdC5rZXlzKHN0YXRlcykubGVuZ3RoID4gMFxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBzdGF0ZXNcblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdGlmIEV2ZW50c1trZXldP1xuXG5cdFx0XHRcdFx0XHRcdFx0QG9uIEV2ZW50c1trZXldLCAoZXZlbnQpIC0+XG5cblx0XHRcdFx0XHRcdFx0XHRcdEBjeWNsZVN0YXRlcyB2YWx1ZVxuXG5cblx0XHRcdGNoYW5nZVN0YXRlOiAoc3RhdGUpIC0+XG5cblx0XHRcdFx0Zm9yIHByb3AgaW4gc3RhdGVDaGFuZ2VQcm9wc1xuXHRcdFx0XHRcdEBbcHJvcF0gPSBzdGF0ZVtwcm9wXVxuXG5cdFx0XHRcdGZvciBjaGlsZCBpbiBAc2VsZWN0QWxsQ2hpbGRyZW4gXCIqXCJcblxuXHRcdFx0XHRcdHN0YXRlQ2hpbGQgPSBzdGF0ZS5zZWxlY3RDaGlsZCBjaGlsZC5uYW1lXG5cblx0XHRcdFx0XHRmb3IgcHJvcCBpbiBbc3RhdGVDaGFuZ2VQcm9wcy4uLiwgXCJmcmFtZVwiXVxuXHRcdFx0XHRcdFx0Y2hpbGRbcHJvcF0gPSBzdGF0ZUNoaWxkW3Byb3BdXG5cblx0XHRcdGN5Y2xlU3RhdGVzOiAoc3RhdGVzKSAtPlxuXHRcdFx0XHRAY2hhbmdlU3RhdGUgc3RhdGVzW0BzdGF0ZUluZGV4XVxuXHRcdFx0XHRpZiBAc3RhdGVJbmRleCA9PSBzdGF0ZXMubGVuZ3RoLTFcblx0XHRcdFx0XHRAc3RhdGVJbmRleCA9IDBcblx0XHRcdFx0ZWxzZSBAc3RhdGVJbmRleCsrXG5cblx0XHRcdEBkZWZpbmUgXCJjb25zdHJhaW50c1wiLFxuXHRcdFx0XHRnZXQ6IC0+IEBvcHRpb25zLmNvbnN0cmFpbnRzXG5cdFx0XHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0XHRcdEBvcHRpb25zLmNvbnN0cmFpbnRzID0gdmFsdWVcblx0XHRcdFx0XHRAZW1pdChcImNoYW5nZTpjb25zdHJhaW50c1wiLCBAb3B0aW9ucy5jb25zdHJhaW50cylcblx0XHRcdFx0XHRAc2V0Q29uc3RyYWludHMgdmFsdWVcblxuXG5cbmN1c3RvbVN0YXRlcyA9IExheWVyLnNlbGVjdEFsbCBcIlN0YXRlXypcIlxuXG5mb3IgY29tcG9uZW50U3RhdGUgaW4gY3VzdG9tU3RhdGVzXG5cblx0Y2xhc3NFdmVudE5hbWUgPSBjb21wb25lbnRTdGF0ZS5uYW1lLnJlcGxhY2UgXCJTdGF0ZV9cIiwgXCJcIlxuXHRpZiBjbGFzc0V2ZW50TmFtZS5pbmNsdWRlcyBcIl9cIlxuXHRcdGNsYXNzTmFtZSA9IGNsYXNzRXZlbnROYW1lLnNwbGl0KFwiX1wiKVswXVxuXHRcdGV2ZW50TmFtZSA9IGNsYXNzRXZlbnROYW1lLnNwbGl0KFwiX1wiKVsxXVxuXHRlbHNlXG5cdFx0Y2xhc3NOYW1lID0gY2xhc3NFdmVudE5hbWVcblxuXG4jIyNcbi0tLS0tLS0tLS0tLS0tLS0tLVxuRVhJU1RJTkcgQ0xBU1NFU1xuLS0tLS0tLS0tLS0tLS0tLS0tXG4jIyNcblxuXG5jb21wb25lbnRzID0gTGF5ZXIuc2VsZWN0QWxsIFwiXypcIlxuXG5leHRlbmRTbGlkZXIgPSAob3JpZ2luKSAtPlxuXHRjbGFzcyBleHBvcnRzLlNsaWRlckNvbXBvbmVudCBleHRlbmRzIFNsaWRlckNvbXBvbmVudFxuXG5cdFx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRcdEBrbm9iLnByb3BzID1cblx0XHRcdFx0c2hhZG93czogb3JpZ2luLmtub2Iuc2hhZG93c1xuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG9yaWdpbi5rbm9iLmJhY2tncm91bmRDb2xvclxuXHRcdFx0XHRib3JkZXJSYWRpdXM6IG9yaWdpbi5rbm9iLmJvcmRlclJhZGl1c1xuXHRcdFx0XHRmcmFtZTogb3JpZ2luLmtub2IuZnJhbWVcblxuXHRcdFx0QGZpbGwucHJvcHMgPVxuXHRcdFx0XHRzaGFkb3dzOiBvcmlnaW4uZmlsbC5zaGFkb3dzXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogb3JpZ2luLmZpbGwuYmFja2dyb3VuZENvbG9yXG5cdFx0XHRcdGJvcmRlclJhZGl1czogb3JpZ2luLmZpbGwuYm9yZGVyUmFkaXVzXG5cdFx0XHRcdGZyYW1lOiBvcmlnaW4uZmlsbC5mcmFtZVxuXG5cdFx0XHRAcHJvcHMgPVxuXHRcdFx0XHRzaGFkb3dzOiBvcmlnaW4uc2hhZG93c1xuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG9yaWdpbi5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdFx0Ym9yZGVyUmFkaXVzOiBvcmlnaW4uYm9yZGVyUmFkaXVzXG5cdFx0XHRcdHNpemU6IG9yaWdpbi5zaXplXG5cblx0XHRcdEB2YWx1ZSA9IFV0aWxzLm1vZHVsYXRlIG9yaWdpbi5rbm9iLm1pZFgsIFswLCBvcmlnaW4ud2lkdGhdLCBbQG1pbiwgQG1heF1cblxuXG5leHRlbmRSYW5nZVNsaWRlciA9IChvcmlnaW4pIC0+XG5cdGNsYXNzIGV4cG9ydHMuUmFuZ2VTbGlkZXJDb21wb25lbnQgZXh0ZW5kcyBSYW5nZVNsaWRlckNvbXBvbmVudFxuXG5cdFx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRcdEBtaW5Lbm9iLnByb3BzID1cblx0XHRcdFx0c2hhZG93czogb3JpZ2luLm1pbktub2Iuc2hhZG93c1xuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG9yaWdpbi5taW5Lbm9iLmJhY2tncm91bmRDb2xvclxuXHRcdFx0XHRib3JkZXJSYWRpdXM6IG9yaWdpbi5taW5Lbm9iLmJvcmRlclJhZGl1c1xuXHRcdFx0XHRmcmFtZTogb3JpZ2luLm1pbktub2IuZnJhbWVcblx0XHRcdEBtYXhLbm9iLnByb3BzID1cblx0XHRcdFx0c2hhZG93czogb3JpZ2luLm1heEtub2Iuc2hhZG93c1xuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG9yaWdpbi5tYXhLbm9iLmJhY2tncm91bmRDb2xvclxuXHRcdFx0XHRib3JkZXJSYWRpdXM6IG9yaWdpbi5tYXhLbm9iLmJvcmRlclJhZGl1c1xuXHRcdFx0XHRmcmFtZTogb3JpZ2luLm1heEtub2IuZnJhbWVcblxuXHRcdFx0QGZpbGwucHJvcHMgPVxuXHRcdFx0XHRzaGFkb3dzOiBvcmlnaW4uZmlsbC5zaGFkb3dzXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogb3JpZ2luLmZpbGwuYmFja2dyb3VuZENvbG9yXG5cdFx0XHRcdGJvcmRlclJhZGl1czogb3JpZ2luLmZpbGwuYm9yZGVyUmFkaXVzXG5cdFx0XHRcdGZyYW1lOiBvcmlnaW4uZmlsbC5mcmFtZVxuXG5cdFx0XHRAcHJvcHMgPVxuXHRcdFx0XHRzaGFkb3dzOiBvcmlnaW4uc2hhZG93c1xuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG9yaWdpbi5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdFx0Ym9yZGVyUmFkaXVzOiBvcmlnaW4uYm9yZGVyUmFkaXVzXG5cdFx0XHRcdHNpemU6IG9yaWdpbi5zaXplXG5cdFx0XHRcdFxuXHRcdFx0QG1pblZhbHVlID0gVXRpbHMubW9kdWxhdGUgb3JpZ2luLm1pbktub2IubWlkWCwgWzAsIG9yaWdpbi53aWR0aF0sIFtAbWluLCBAbWF4XVxuXHRcdFx0QG1heFZhbHVlID0gVXRpbHMubW9kdWxhdGUgb3JpZ2luLm1heEtub2IubWlkWCwgWzAsIG9yaWdpbi53aWR0aF0sIFtAbWluLCBAbWF4XVxuXG5cblxuZm9yIGNvbXBvbmVudCBpbiBjb21wb25lbnRzXG5cblx0dHlwZSA9IGNvbXBvbmVudC5uYW1lLnJlcGxhY2UgXCJfXCIsIFwiXCJcblxuXHRkbyAoY29tcG9uZW50KSAtPlxuXG5cdFx0Y29tcG9uZW50LmFkZERlc2lnbkNoaWxkcmVuKClcblxuXHRcdGlmIHR5cGUgPT0gXCJTbGlkZXJDb21wb25lbnRcIlxuXHRcdFx0ZXh0ZW5kU2xpZGVyIGNvbXBvbmVudFxuXHRcdGVsc2UgaWYgdHlwZSA9PSBcIlJhbmdlU2xpZGVyQ29tcG9uZW50XCJcblx0XHRcdGV4dGVuZFJhbmdlU2xpZGVyIGNvbXBvbmVudFxuXG5cblxuXG5cblxuXG5cblxuIiwiXG5tb3ZlRnJvbVJlZiA9IChsYXllciwgcmVmZXJlbmNlLCBtb3ZlUmVmLCBsYXllclJlZiwgcmVmVHlwZSkgLT5cblxuXHRvcmlnaW5hbENvbnN0cmFpbnRzID0gbGF5ZXIuY29uc3RyYWludFZhbHVlc1xuXG5cdG9yaWdpbmFsUmVmVmFsdWUgPSByZWZlcmVuY2VbbGF5ZXJSZWZdXG5cdG9yaWdpbmFsTGF5ZXJWYWx1ZSA9IGxheWVyW21vdmVSZWZdXG5cblx0bGF5ZXJbbW92ZVJlZl0gPSByZWZlcmVuY2VbbGF5ZXJSZWZdICsgbGF5ZXIuY29uc3RyYWludFZhbHVlc1tyZWZUeXBlXS52YWx1ZVxuXG5cdCMgcmVmZXJlbmNlLm9uQ2hhbmdlIGxheWVyUmVmLCAodmFsdWUpIC0+XG5cdCMgXHRsYXllclttb3ZlUmVmXSA9IG9yaWdpbmFsTGF5ZXJWYWx1ZSArICh2YWx1ZSAtIG9yaWdpbmFsUmVmVmFsdWUpXG5cblx0bGF5ZXIuY29uc3RyYWludFZhbHVlcyA9IG9yaWdpbmFsQ29uc3RyYWludHNcblxuXG5wdXNoUGFyZW50ID0gKGxheWVyLCBkaXJlY3Rpb24pIC0+XG5cblx0aWYgZGlyZWN0aW9uID09IFwiZG93blwiXG5cdFx0b3JpZ2luYWxZID0gbGF5ZXIueVxuXHRcdG9yaWdpbmFsSGVpZ2h0ID0gbGF5ZXIuaGVpZ2h0XG5cblx0XHRsYXllci5vbkNoYW5nZSBcInlcIiwgKHZhbHVlKSAtPlxuXHRcdFx0QHBhcmVudC5oZWlnaHQgKz0gdmFsdWUgLSBvcmlnaW5hbFlcblx0XHRcdG9yaWdpbmFsWSA9IHZhbHVlXG5cdFx0XHRvcmlnaW5hbEhlaWdodCA9IEBoZWlnaHRcblx0XHRsYXllci5vbkNoYW5nZSBcImhlaWdodFwiLCAodmFsdWUpIC0+XG5cdFx0XHRAcGFyZW50LmhlaWdodCArPSB2YWx1ZSAtIG9yaWdpbmFsSGVpZ2h0XG5cdFx0XHRvcmlnaW5hbFkgPSBAeVxuXHRcdFx0b3JpZ2luYWxIZWlnaHQgPSB2YWx1ZVxuXHRcblx0aWYgZGlyZWN0aW9uID09IFwicmlnaHRcIlxuXHRcdG9yaWdpbmFsWCA9IGxheWVyLnhcblx0XHRvcmlnaW5hbFdpZHRoIC0gbGF5ZXIud2lkdGhcblxuXHRcdGxheWVyLm9uQ2hhbmdlIFwieFwiLCAodmFsdWUpIC0+XG5cdFx0XHRAcGFyZW50LndpZHRoICs9IHZhbHVlIC0gb3JpZ2luYWxYXG5cdFx0XHRvcmlnaW5hbFggPSB2YWx1ZVxuXHRcdFx0b3JpZ2luYWxXaWR0aCA9IEB3aWR0aFxuXHRcdGxheWVyLm9uQ2hhbmdlIFwid2lkdGhcIiwgKHZhbHVlKSAtPlxuXHRcdFx0QHBhcmVudC53aWR0aCArPSB2YWx1ZSAtIG9yaWdpbmFsV2lkdGhcblx0XHRcdG9yaWdpbmFsWCA9IEB4XG5cdFx0XHRvcmlnaW5hbFdpZHRoID0gdmFsdWVcblxuXG5hZGRSZWZlcmVuY2VFdmVudHMgPSAobGF5ZXIpIC0+XG5cblx0b3JpZ2luYWxDb25zdHJhaW50cyA9IGxheWVyLmNvbnN0cmFpbnRWYWx1ZXNcblxuXHRpZiBsYXllci5jb25zdHJhaW50VmFsdWVzPy50b3BSZWY/LmxheWVyPyB8fCBsYXllci5jb25zdHJhaW50VmFsdWVzPy5ib3R0b21SZWY/LmxheWVyP1xuXG5cdFx0cmVmZXJlbmNlID0gbGF5ZXIuY29uc3RyYWludFZhbHVlcz8udG9wUmVmPy5sYXllciB8fCBsYXllci5jb25zdHJhaW50VmFsdWVzPy5ib3R0b21SZWY/LmxheWVyXG5cblx0XHRvcmlnaW5hbFlSZWYgPSByZWZlcmVuY2UueVxuXHRcdG9yaWdpbmFsSGVpZ2h0UmVmID0gcmVmZXJlbmNlLmhlaWdodFxuXHRcdG9yaWdpbmFsWSA9IGxheWVyLnlcblxuXHRcdHJlZmVyZW5jZS5vbkNoYW5nZSBcInlcIiwgKHZhbHVlKSAtPlxuXHRcdFx0bGF5ZXIueSA9IG9yaWdpbmFsWSArICh2YWx1ZSAtIG9yaWdpbmFsWVJlZilcblx0XHRcdG9yaWdpbmFsWVJlZiA9IHZhbHVlXG5cdFx0XHRvcmlnaW5hbFkgPSBsYXllci55XG5cblx0XHR1bmxlc3MgbGF5ZXIuY29uc3RyYWludFZhbHVlcz8udG9wUmVmPy5hbGlnbiA9PSBcInlcIlxuXHRcdFx0cmVmZXJlbmNlLm9uQ2hhbmdlIFwiaGVpZ2h0XCIsICh2YWx1ZSkgLT5cblx0XHRcdFx0bGF5ZXIueSA9IG9yaWdpbmFsWSArICh2YWx1ZSAtIG9yaWdpbmFsSGVpZ2h0UmVmKVxuXHRcdFx0XHRvcmlnaW5hbEhlaWdodFJlZiA9IHZhbHVlXG5cdFx0XHRcdG9yaWdpbmFsWSA9IGxheWVyLnlcblxuXHRcdGlmIGxheWVyLmNvbnN0cmFpbnRWYWx1ZXM/LnRvcFJlZj8gJiYgbGF5ZXIuY29uc3RyYWludFZhbHVlcz8uYm90dG9tUmVmP1xuXHRcdFx0cmVmZXJlbmNlLm9uQ2hhbmdlIFwiaGVpZ2h0XCIsICh2YWx1ZSkgLT5cblx0XHRcdFx0bGF5ZXIuaGVpZ2h0ID0gdmFsdWUgLSBsYXllci5jb25zdHJhaW50VmFsdWVzPy50b3BSZWYudmFsdWUgLSBsYXllci5jb25zdHJhaW50VmFsdWVzPy5ib3R0b21SZWYudmFsdWVcblx0XHRcdFx0bGF5ZXIueSA9IHJlZmVyZW5jZS55ICsgbGF5ZXIuY29uc3RyYWludFZhbHVlcz8udG9wUmVmLnZhbHVlXG5cdFx0XHRcdG9yaWdpbmFsSGVpZ2h0UmVmID0gdmFsdWVcblxuXHRpZiBsYXllci5jb25zdHJhaW50VmFsdWVzPy5sZWZ0UmVmPy5sYXllcj8gfHwgbGF5ZXIuY29uc3RyYWludFZhbHVlcz8ucmlnaHRSZWY/LmxheWVyP1xuXHRcdHJlZmVyZW5jZSA9IGxheWVyLmNvbnN0cmFpbnRWYWx1ZXM/LmxlZnRSZWY/LmxheWVyIHx8IGxheWVyLmNvbnN0cmFpbnRWYWx1ZXM/LnJpZ2h0UmVmPy5sYXllclxuXG5cdFx0b3JpZ2luYWxYUmVmID0gcmVmZXJlbmNlLnhcblx0XHRvcmlnaW5hbFdpZHRoUmVmID0gcmVmZXJlbmNlLndpZHRoXG5cdFx0b3JpZ2luYWxYID0gbGF5ZXIueFxuXG5cdFx0cmVmZXJlbmNlLm9uQ2hhbmdlIFwieFwiLCAodmFsdWUpIC0+XG5cdFx0XHRsYXllci54ID0gb3JpZ2luYWxYICsgKHZhbHVlIC0gb3JpZ2luYWxYUmVmKVxuXHRcdFx0b3JpZ2luYWxYUmVmID0gdmFsdWVcblx0XHRcdG9yaWdpbmFsWCA9IGxheWVyLnhcblxuXHRcdHVubGVzcyBsYXllci5jb25zdHJhaW50VmFsdWVzPy5sZWZ0Py5hbGlnbiA9PSBcInhcIlxuXHRcdFx0cmVmZXJlbmNlLm9uQ2hhbmdlIFwid2lkdGhcIiwgKHZhbHVlKSAtPlxuXHRcdFx0XHRsYXllci54ID0gb3JpZ2luYWxYICsgKHZhbHVlIC0gb3JpZ2luYWxXaWR0aFJlZilcblx0XHRcdFx0b3JpZ2luYWxXaWR0aFJlZiA9IHZhbHVlXG5cdFx0XHRcdG9yaWdpbmFsWCA9IGxheWVyLnhcblxuXHRcdGlmIGxheWVyLmNvbnN0cmFpbnRWYWx1ZXM/LmxlZnRSZWY/ICYmIGxheWVyLmNvbnN0cmFpbnRWYWx1ZXM/LnJpZ2h0UmVmP1xuXHRcdFx0cmVmZXJlbmNlLm9uQ2hhbmdlIFwid2lkdGhcIiwgKHZhbHVlKSAtPlxuXHRcdFx0XHRsYXllci53aWR0aCA9IHZhbHVlIC0gbGF5ZXIuY29uc3RyYWludFZhbHVlcz8ubGVmdFJlZi52YWx1ZSAtIGxheWVyLmNvbnN0cmFpbnRWYWx1ZXM/LnJpZ2h0UmVmLnZhbHVlXG5cdFx0XHRcdGxheWVyLnggPSByZWZlcmVuY2UueCArIGxheWVyLmNvbnN0cmFpbnRWYWx1ZXM/LmxlZnRSZWYudmFsdWVcblx0XHRcdFx0b3JpZ2luYWxXaWR0aFJlZiA9IHZhbHVlXG5cblxuTGF5ZXI6OnNldENvbnN0cmFpbnRzID0gKG9wdGlvbnM9e30sIG9yaWdpbikgLT5cblxuXHRAY29uc3RyYWludFZhbHVlcyA9XG5cdFx0dG9wOiBpZiB0eXBlb2Ygb3B0aW9ucy50b3AgPT0gXCJvYmplY3RcIiB0aGVuIG51bGwgZWxzZSBpZiBvcHRpb25zLnRvcD8gdGhlbiBvcHRpb25zLnRvcCBlbHNlIGlmIG9yaWdpbj8uY29uc3RyYWludFZhbHVlcz8gdGhlbiBvcmlnaW4uY29uc3RyYWludFZhbHVlcy50b3AgZWxzZSBudWxsXG5cdFx0bGVmdDogaWYgdHlwZW9mIG9wdGlvbnMubGVmdCA9PSBcIm9iamVjdFwiIHRoZW4gbnVsbCBlbHNlIGlmIG9wdGlvbnMubGVmdD8gdGhlbiBvcHRpb25zLmxlZnQgZWxzZSBpZiBvcmlnaW4/LmNvbnN0cmFpbnRWYWx1ZXM/IHRoZW4gb3JpZ2luLmNvbnN0cmFpbnRWYWx1ZXMubGVmdCBlbHNlIG51bGxcblx0XHRib3R0b206IGlmIHR5cGVvZiBvcHRpb25zLmJvdHRvbSA9PSBcIm9iamVjdFwiIHRoZW4gbnVsbCBlbHNlIGlmIG9wdGlvbnMucHVzaERvd24gdGhlbiBudWxsIGVsc2UgaWYgb3B0aW9ucy5ib3R0b20/IHRoZW4gb3B0aW9ucy5ib3R0b20gZWxzZSBpZiBvcmlnaW4/LmNvbnN0cmFpbnRWYWx1ZXM/IHRoZW4gb3JpZ2luLmNvbnN0cmFpbnRWYWx1ZXMuYm90dG9tIGVsc2UgbnVsbFxuXHRcdHJpZ2h0OiBpZiB0eXBlb2Ygb3B0aW9ucy5yaWdodCA9PSBcIm9iamVjdFwiIHRoZW4gbnVsbCBlbHNlIGlmIG9wdGlvbnMucHVzaFJpZ2h0IHRoZW4gbnVsbCAgZWxzZSBpZiBvcHRpb25zLnJpZ2h0PyB0aGVuIG9wdGlvbnMucmlnaHQgZWxzZSBpZiBvcmlnaW4/LmNvbnN0cmFpbnRWYWx1ZXM/IHRoZW4gb3JpZ2luLmNvbnN0cmFpbnRWYWx1ZXMucmlnaHQgZWxzZSBudWxsXG5cdFx0d2lkdGg6IEB3aWR0aFxuXHRcdGhlaWdodDogQGhlaWdodFxuXHRcdHdpZHRoRmFjdG9yOiBpZiBvcHRpb25zLnNjYWxlWD8gdGhlbiBvcHRpb25zLnNjYWxlWCBlbHNlIGlmIG9wdGlvbnMud2lkdGhGYWN0b3I/IHRoZW4gb3B0aW9ucy53aWR0aEZhY3RvciBlbHNlIG51bGxcblx0XHRoZWlnaHRGYWN0b3I6IGlmIG9wdGlvbnMuc2NhbGVZPyB0aGVuIG9wdGlvbnMuc2NhbGVZIGVsc2UgaWYgb3B0aW9ucy5oZWlnaHRGYWN0b3I/IHRoZW4gb3B0aW9ucy5oZWlnaHRGYWN0b3IgZWxzZSBudWxsXG5cdFx0Y2VudGVyQW5jaG9yWDogaWYgb3B0aW9ucy5jZW50ZXJYPyB0aGVuIG9wdGlvbnMuY2VudGVyWCBlbHNlIGlmIG9wdGlvbnMuY2VudGVyQW5jaG9yWD8gdGhlbiBvcHRpb25zLmNlbnRlckFuY2hvclggZWxzZSBudWxsXG5cdFx0Y2VudGVyQW5jaG9yWTogaWYgb3B0aW9ucy5jZW50ZXJZPyB0aGVuIG9wdGlvbnMuY2VudGVyWSBlbHNlIGlmIG9wdGlvbnMuY2VudGVyQW5jaG9yWT8gdGhlbiBvcHRpb25zLmNlbnRlckFuY2hvclkgZWxzZSBudWxsXG5cdFx0YXNwZWN0UmF0aW9Mb2NrZWQ6IGlmIG9wdGlvbnMuYXNwZWN0UmF0aW9Mb2NrZWQ/IHRoZW4gb3B0aW9ucy5hc3BlY3RSYXRpb0xvY2tlZCBlbHNlIGlmIG9yaWdpbj8uY29uc3RyYWludFZhbHVlcyB0aGVuIG9yaWdpbi5jb25zdHJhaW50VmFsdWVzLmFzcGVjdFJhdGlvTG9ja2VkIGVsc2UgZmFsc2VcblxuXHQjIHJlc2V0c1xuXHR2YWx1ZXMgPSBAY29uc3RyYWludFZhbHVlc1xuXHRpZiB2YWx1ZXMudG9wPyAmJiB2YWx1ZXMuYm90dG9tP1xuXHRcdEBjb25zdHJhaW50VmFsdWVzLmhlaWdodEZhY3RvciA9IG51bGxcblx0XHRAY29uc3RyYWludFZhbHVlcy5jZW50ZXJBbmNob3JZID0gbnVsbFxuXHRpZiB2YWx1ZXMubGVmdD8gJiYgdmFsdWVzLnJpZ2h0P1xuXHRcdEBjb25zdHJhaW50VmFsdWVzLndpZHRoRmFjdG9yID0gbnVsbFxuXHRcdEBjb25zdHJhaW50VmFsdWVzLmNlbnRlckFuY2hvclggPSBudWxsXG5cdGlmIHZhbHVlcy5sZWZ0PyAmJiB2YWx1ZXMucmlnaHQ/ICYmIHZhbHVlcy50b3A/ICYmIHZhbHVlcy5ib3R0b20/XG5cdFx0QGNvbnN0cmFpbnRWYWx1ZXMuYXNwZWN0UmF0aW9Mb2NrZWQgPSBmYWxzZVxuXG5cdGZvciByZWYgaW4gW1tcInRvcFwiLCBcInlcIiwgXCJtYXhZXCIsIFwidG9wUmVmXCIsIFwiYm90dG9tXCJdLCBbXCJsZWZ0XCIsIFwieFwiLCBcIm1heFhcIiwgXCJsZWZ0UmVmXCIsIFwicmlnaHRcIl0sIFtcImJvdHRvbVwiLCBcIm1heFlcIiwgXCJ5XCIsIFwiYm90dG9tUmVmXCIsIFwidG9wXCJdLCBbXCJyaWdodFwiLCBcIm1heFhcIiwgXCJ4XCIsIFwicmlnaHRSZWZcIiwgXCJsZWZ0XCJdXVxuXG5cdFx0aWYgdHlwZW9mIG9wdGlvbnNbcmVmWzBdXSA9PSBcIm9iamVjdFwiICYmIG9wdGlvbnNbcmVmWzBdXSAhPSBudWxsICYmICFvcHRpb25zW3JlZlszXV0/XG5cblx0XHRcdGlmIG9wdGlvbnNbcmVmWzBdXS5sYXllcj9cblx0XHRcdFx0aWYgQHBhcmVudD8gJiYgQHBhcmVudC5zZWxlY3RDaGlsZChvcHRpb25zW3JlZlswXV0ubGF5ZXIpP1xuXHRcdFx0XHRcdGxheWVyID0gQHBhcmVudC5zZWxlY3RDaGlsZCBvcHRpb25zW3JlZlswXV0ubGF5ZXJcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdGxheWVyID0gTGF5ZXIuc2VsZWN0IG9wdGlvbnNbcmVmWzBdXS5sYXllclxuXHRcdFx0ZWxzZSBsYXllciA9IEBwYXJlbnRcblxuXHRcdFx0YWxpZ24gPSBudWxsXG5cblx0XHRcdGlmICFvcHRpb25zW3JlZlswXV0udmFsdWU/ICYmIGxheWVyID09IEBwYXJlbnRcblx0XHRcdFx0dmFsdWUgPSBAW3JlZlsxXV1cblx0XHRcdGVsc2UgaWYgb3B0aW9uc1tyZWZbMF1dLmFsaWduPyAmJiBvcHRpb25zW3JlZlswXV0udmFsdWU/XG5cdFx0XHRcdHZhbHVlID0gb3B0aW9uc1tyZWZbMF1dLnZhbHVlXG5cdFx0XHRcdGFsaWduID0gb3B0aW9uc1tyZWZbMF1dLmFsaWduXG5cdFx0XHRlbHNlIGlmIG9wdGlvbnNbcmVmWzBdXS5hbGlnbj9cblx0XHRcdFx0dmFsdWUgPSAwXG5cdFx0XHRcdGFsaWduID0gb3B0aW9uc1tyZWZbMF1dLmFsaWduXG5cdFx0XHRlbHNlIGlmICFvcHRpb25zW3JlZlswXV0udmFsdWU/ICYmICFvcHRpb25zW3JlZlswXV0uYWxpZ24/XG5cdFx0XHRcdHZhbHVlID0gQFtyZWZbMV1dIC0gbGF5ZXJbcmVmWzJdXVxuXHRcdFx0XHRhbGlnbiA9IHJlZls0XVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR2YWx1ZSA9IG9wdGlvbnNbcmVmWzBdXS52YWx1ZVxuXHRcdFx0XHRhbGlnbiA9IHJlZls0XVxuXG5cdFx0XHRpZiBhbGlnbiA9PSBcImxlZnRcIiB0aGVuIGFsaWduID0gXCJ4XCJcblx0XHRcdGVsc2UgaWYgYWxpZ24gPT0gXCJyaWdodFwiIHRoZW4gYWxpZ24gPSBcIm1heFhcIlxuXHRcdFx0ZWxzZSBpZiBhbGlnbiA9PSBcInRvcFwiIHRoZW4gYWxpZ24gPSBcInlcIlxuXHRcdFx0ZWxzZSBpZiBhbGlnbiA9PSBcImJvdHRvbVwiIHRoZW4gYWxpZ24gPSBcIm1heFlcIlxuXG5cdFx0XHRAY29uc3RyYWludFZhbHVlc1tyZWZbM11dID1cblx0XHRcdFx0bGF5ZXI6IGxheWVyXG5cdFx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdFx0XHRhbGlnbjogYWxpZ25cblxuXHRcdFx0QGNvbnN0cmFpbnRWYWx1ZXNbcmVmWzBdXSA9IG51bGxcblx0XHRcdEBjb25zdHJhaW50VmFsdWVzW3JlZls0XV0gPSBudWxsXG5cblx0XHRcdCMgbW92ZUZyb21SZWYgQCwgbGF5ZXIsIHJlZlsxXSwgcmVmWzJdLCByZWZbM11cblxuXHRpZiBvcHRpb25zLnB1c2hEb3duP1xuXHRcdEBjb25zdHJhaW50VmFsdWVzLmJvdHRvbSA9IG51bGxcblx0XHRwdXNoUGFyZW50IEAsIFwiZG93blwiXG5cdGlmIG9wdGlvbnMucHVzaFJpZ2h0P1xuXHRcdEBjb25zdHJhaW50VmFsdWVzLnJpZ2h0ID0gbnVsbFxuXHRcdHB1c2hQYXJlbnQgQCwgXCJyaWdodFwiXG5cblx0dW5sZXNzIG9wdGlvbnMucHVzaERvd24gfHwgQGNvbnN0cmFpbnRWYWx1ZXMudG9wUmVmIHx8IEBjb25zdHJhaW50VmFsdWVzLmJvdHRvbVJlZlxuXHRcdEBjb25zdHJhaW50VmFsdWVzLmJvdHRvbSA9IGlmIG9wdGlvbnMuYm90dG9tPyB0aGVuIG9wdGlvbnMuYm90dG9tIGVsc2UgaWYgb3JpZ2luPy5jb25zdHJhaW50VmFsdWVzPyB0aGVuIG9yaWdpbi5jb25zdHJhaW50VmFsdWVzLmJvdHRvbSBlbHNlIG51bGxcblx0dW5sZXNzIG9wdGlvbnMucHVzaFJpZ2h0IHx8IEBjb25zdHJhaW50VmFsdWVzLmxlZnRSZWYgfHwgQGNvbnN0cmFpbnRWYWx1ZXMucmlnaHRSZWZcblx0XHRAY29uc3RyYWludFZhbHVlcy5yaWdodCA9IGlmIG9wdGlvbnMucmlnaHQ/IHRoZW4gb3B0aW9ucy5yaWdodCBlbHNlIGlmIG9yaWdpbj8uY29uc3RyYWludFZhbHVlcz8gdGhlbiBvcmlnaW4uY29uc3RyYWludFZhbHVlcy5yaWdodCBlbHNlIG51bGxcblxuXHRpZiBAY29uc3RyYWludFZhbHVlcy50b3AgPT0gbnVsbCAmJiBAY29uc3RyYWludFZhbHVlcy5ib3R0b20gPT0gbnVsbCAmJiBAY29uc3RyYWludFZhbHVlcy5jZW50ZXJBbmNob3JZID09IG51bGwgJiYgIUBjb25zdHJhaW50VmFsdWVzLnRvcFJlZiAmJiAhQGNvbnN0cmFpbnRWYWx1ZXMuYm90dG9tUmVmXG5cdFx0QGNvbnN0cmFpbnRWYWx1ZXMudG9wID0gQHlcblx0aWYgQGNvbnN0cmFpbnRWYWx1ZXMubGVmdCA9PSBudWxsICYmIEBjb25zdHJhaW50VmFsdWVzLnJpZ2h0ID09IG51bGwgJiYgQGNvbnN0cmFpbnRWYWx1ZXMuY2VudGVyQW5jaG9yWCA9PSBudWxsICYmICFAY29uc3RyYWludFZhbHVlcy5sZWZ0UmVmICYmICFAY29uc3RyYWludFZhbHVlcy5yaWdodFJlZlxuXHRcdEBjb25zdHJhaW50VmFsdWVzLmxlZnQgPSBAeFxuXG5cdEBhcHBseUNvbnN0cmFpbnRzKClcblxuXG5cbkxheWVyOjphcHBseUNvbnN0cmFpbnRzID0gLT5cblxuXHRyZXR1cm4gaWYgIUBjb25zdHJhaW50VmFsdWVzXG5cblx0dmFsdWVzID0gQGNvbnN0cmFpbnRWYWx1ZXNcblxuXHRpZiAhQHBhcmVudCB0aGVuIHBhcmVudCA9IFNjcmVlbiBlbHNlIHBhcmVudCA9IEBwYXJlbnRcblxuXHRhc3BlY3RSYXRpbyA9IEB3aWR0aCAvIEBoZWlnaHRcblxuXHQjIHBvc2l0aW9uXG5cdGlmIHZhbHVlcy50b3A/ICYmIHR5cGVvZiB2YWx1ZXMudG9wICE9IFwib2JqZWN0XCJcblx0XHRAeSA9IHZhbHVlcy50b3Bcblx0ZWxzZSBpZiB2YWx1ZXMudG9wID09IG51bGwgJiYgdmFsdWVzLnRvcFJlZj8ubGF5ZXI/XG5cdFx0QHkgPSB2YWx1ZXMudG9wUmVmLmxheWVyW3ZhbHVlcy50b3BSZWYuYWxpZ25dICsgdmFsdWVzLnRvcFJlZi52YWx1ZVxuXG5cdGlmIHZhbHVlcy5sZWZ0PyAmJiB0eXBlb2YgdmFsdWVzLmxlZnQgIT0gXCJvYmplY3RcIlxuXHRcdEB4ID0gdmFsdWVzLmxlZnRcblx0ZWxzZSBpZiB2YWx1ZXMubGVmdCA9PSBudWxsICYmIHZhbHVlcy5sZWZ0UmVmPy5sYXllcj9cblx0XHRAeCA9IHZhbHVlcy5sZWZ0UmVmLmxheWVyW3ZhbHVlcy5sZWZ0UmVmLmFsaWduXSArIHZhbHVlcy5sZWZ0UmVmLnZhbHVlXG5cblx0IyBzaXplXG5cdGlmIHZhbHVlcy5sZWZ0PyAmJiB2YWx1ZXMucmlnaHQ/XG5cdFx0QHdpZHRoID0gcGFyZW50LndpZHRoIC0gQHggLSB2YWx1ZXMucmlnaHRcblx0XHRpZiB2YWx1ZXMuYXNwZWN0UmF0aW9Mb2NrZWRcblx0XHRcdEBoZWlnaHQgPSBAd2lkdGggLyBhc3BlY3RSYXRpb1xuXHRpZiB2YWx1ZXMudG9wPyAmJiB2YWx1ZXMuYm90dG9tP1xuXHRcdEBoZWlnaHQgPSBwYXJlbnQuaGVpZ2h0IC0gQHkgLSB2YWx1ZXMuYm90dG9tXG5cdFx0aWYgdmFsdWVzLmFzcGVjdFJhdGlvTG9ja2VkXG5cdFx0XHRAd2lkdGggPSBAaGVpZ2h0ICogYXNwZWN0UmF0aW9cblxuXHQjIGlmIHZhbHVlcy5sZWZ0UmVmPyAmJiB2YWx1ZXMucmlnaHRSZWY/XG5cdCMgXHRAd2lkdGggPSBwYXJlbnQud2lkdGggLSB2YWx1ZXMubGVmdFJlZi52YWx1ZSAtIHZhbHVlcy5yaWdodFJlZi52YWx1ZVxuXHQjIGlmIHZhbHVlcy50b3BSZWY/ICYmIHZhbHVlcy5ib3R0b21SZWY/XG5cdCMgXHRAaGVpZ2h0ID0gcGFyZW50LmhlaWdodCAtIHZhbHVlcy50b3BSZWYudmFsdWUgLSB2YWx1ZXMuYm90dG9tUmVmLnZhbHVlXG5cblx0aWYgdmFsdWVzLndpZHRoRmFjdG9yP1xuXHRcdEB3aWR0aCA9IHBhcmVudC53aWR0aCAqIHZhbHVlcy53aWR0aEZhY3RvclxuXHRpZiB2YWx1ZXMuaGVpZ2h0RmFjdG9yP1xuXHRcdEBoZWlnaHQgPSBwYXJlbnQuaGVpZ2h0ICogdmFsdWVzLmhlaWdodEZhY3RvclxuXG5cdCMgbWF4IHBvc2l0aW9uXG5cdGlmIHZhbHVlcy5yaWdodD8gXG5cdFx0QG1heFggPSBwYXJlbnQud2lkdGggLSB2YWx1ZXMucmlnaHRcblx0ZWxzZSBpZiB2YWx1ZXMucmlnaHQgPT0gbnVsbCAmJiB2YWx1ZXMucmlnaHRSZWY/LmxheWVyP1xuXHRcdEBtYXhYID0gdmFsdWVzLnJpZ2h0UmVmLmxheWVyW3ZhbHVlcy5yaWdodFJlZi5hbGlnbl0gLSB2YWx1ZXMucmlnaHRSZWYudmFsdWVcblx0aWYgdmFsdWVzLmJvdHRvbT9cblx0XHRAbWF4WSA9IHBhcmVudC5oZWlnaHQgLSB2YWx1ZXMuYm90dG9tXG5cdGVsc2UgaWYgdmFsdWVzLmJvdHRvbSA9PSBudWxsICYmIHZhbHVlcy5ib3R0b21SZWY/LmxheWVyP1xuXHRcdEBtYXhZID0gdmFsdWVzLmJvdHRvbVJlZi5sYXllclt2YWx1ZXMuYm90dG9tUmVmLmFsaWduXSAtIHZhbHVlcy5ib3R0b21SZWYudmFsdWVcblxuXHQjIGNlbnRlciBwb3NpdGlvblxuXHRpZiAhdmFsdWVzLmxlZnQ/ICYmICF2YWx1ZXMucmlnaHQ/ICYmIHZhbHVlcy5jZW50ZXJBbmNob3JYP1xuXHRcdEBtaWRYID0gcGFyZW50LndpZHRoICogdmFsdWVzLmNlbnRlckFuY2hvclhcblx0aWYgIXZhbHVlcy50b3A/ICYmICF2YWx1ZXMuYm90dG9tPyAmJiB2YWx1ZXMuY2VudGVyQW5jaG9yWT9cblx0XHRAbWlkWSA9IHBhcmVudC5oZWlnaHQgKiB2YWx1ZXMuY2VudGVyQW5jaG9yWVxuXG5cdEBjb25zdHJhaW50VmFsdWVzID0gdmFsdWVzXG5cblx0YWRkUmVmZXJlbmNlRXZlbnRzKEApXG5cblxuXG5cblxuXG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KExheWVyLnByb3RvdHlwZSwgXCJjb25zdHJhaW50c1wiLCB7XG5cblx0Z2V0OiAtPiByZXR1cm4gQF9jb25zdHJhaW50c1xuXHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRAX2NvbnN0cmFpbnRzID0gdmFsdWVcblx0XHRAZW1pdCBcImNoYW5nZTpjb25zdHJhaW50c1wiLCB2YWx1ZVxuXHRcdEBzZXRDb25zdHJhaW50cyB2YWx1ZVxuXG59KVxuXG5cblxuXG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUVBQTtBRENBLElBQUE7O0FBQUEsV0FBQSxHQUFjLFNBQUMsS0FBRCxF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
