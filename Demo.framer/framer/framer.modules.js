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
    if (typeof options[ref[0]] === "object") {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NlYmFzdGlhbi9Eb2N1bWVudHMvUm9ndWUgT25lL0dpdEh1Yi9mcmFtZXItRGVzaWduQ29tcG9uZW50cy9EZW1vLmZyYW1lci9tb2R1bGVzL0Rlc2lnbkNvbXBvbmVudHMuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2ViYXN0aWFuL0RvY3VtZW50cy9Sb2d1ZSBPbmUvR2l0SHViL2ZyYW1lci1EZXNpZ25Db21wb25lbnRzL0RlbW8uZnJhbWVyL21vZHVsZXMvQ29uc3RyYWludHMuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJDb25zdHJhaW50cyA9IHJlcXVpcmUgXCJDb25zdHJhaW50c1wiXG5cbiMjI1xuLS0tLS0tLS0tLS0tLS0tLS0tXG5DVVNUT00gQ0xBU1NFU1xuLS0tLS0tLS0tLS0tLS0tLS0tXG4jIyNcblxua2l0ID0gTGF5ZXIuc2VsZWN0IFwiKlVJS2l0KlwiXG5pZiBraXQ/IHRoZW4ga2l0LnggPSBTY3JlZW4ud2lkdGggKiAxMDAwOyBraXQubmFtZSA9IFwiLlVJS2l0XCJcblxuZm9yIGxheWVyIGluIExheWVyLnNlbGVjdEFsbCBcIkAqXCJcblx0cGFyZW50ID0gbGF5ZXIucGFyZW50XG5cdG5hbWUgPSBsYXllci5uYW1lLnJlcGxhY2UgXCJAXCIsIFwiXCJcblx0cGFyZW50W25hbWVdID0gbGF5ZXJcblxuY3VzdG9tQ29tcG9uZW50cyA9IExheWVyLnNlbGVjdEFsbCBcIkN1c3RvbV8qXCJcblxuTGF5ZXI6OmFkZERlc2lnbkNoaWxkcmVuID0gKG9yaWdpbikgLT5cblx0aWYgIW9yaWdpbj8gdGhlbiBvcmlnaW4gPSBAXG5cdGZvciBjaGlsZCBpbiBvcmlnaW4uc2VsZWN0QWxsQ2hpbGRyZW4gKFwiKlwiKVxuXHRcdHBhcmVudCA9IGNoaWxkLnBhcmVudFxuXHRcdHBhcmVudFtjaGlsZC5uYW1lXSA9IGNoaWxkXG5cblxuc3RhdGVDaGFuZ2VQcm9wcyA9IFtcblx0XCJ3aWR0aFwiLCBcImhlaWdodFwiLFxuXHRcIm9wYWNpdHlcIixcblx0XCJzY2FsZVhcIiwgXCJzY2FsZVlcIiwgXCJzY2FsZVpcIiwgXCJzY2FsZVwiLFxuXHRcInNrZXdYXCIsIFwic2tld1lcIiwgXCJza2V3XCIsXG5cdFwicm90YXRpb25YXCIsIFwicm90YXRpb25ZXCIsIFwicm90YXRpb25aXCIsIFwicm90YXRpb25cIixcblx0XCJibHVyXCIsXG5cdFwiYnJpZ2h0bmVzc1wiLCBcInNhdHVyYXRlXCIsIFwiaHVlUm90YXRlXCIsIFwiY29udHJhc3RcIiwgXCJpbnZlcnRcIiwgXCJncmF5c2NhbGVcIiwgXCJzZXBpYVwiLCBcImJsZW5kaW5nXCIsXG5cdFwiYmFja2dyb3VuZEJsdXJcIiwgXCJiYWNrZ3JvdW5kQnJpZ2h0bmVzc1wiLCBcImJhY2tncm91bmRTYXR1cmF0ZVwiLCBcImJhY2tncm91bmRIdWVSb3RhdGVcIiwgXCJiYWNrZ3JvdW5kQ29udHJhc3RcIiwgXCJiYWNrZ3JvdW5kSW52ZXJ0XCIsIFwiYmFja2dyb3VuZEdyYXlzY2FsZVwiLCBcImJhY2tncm91bmRTZXBpYVwiLFxuXHRcInNoYWRvdzFcIiwgXCJzaGFkb3cyXCIsIFwic2hhZG93M1wiLCBcInNoYWRvdzRcIiwgXCJzaGFkb3c1XCIsIFwic2hhZG93NlwiLCBcInNoYWRvdzdcIiwgXCJzaGFkb3c4XCIsIFwic2hhZG93OVwiLFxuXHRcInNoYWRvd1hcIiwgXCJzaGFkb3dZXCIsIFwic2hhZG93Qmx1clwiLCBcInNoYWRvd1NwcmVhZFwiLCBcInNoYWRvd0NvbG9yXCIsIFwic2hhZG93VHlwZVwiLFxuXHRcInNoYWRvd3NcIixcblx0XCJiYWNrZ3JvdW5kQ29sb3JcIiwgXCJjb2xvclwiLFxuXHRcImJvcmRlclJhZGl1c1wiLCBcImJvcmRlckNvbG9yXCIsIFwiYm9yZGVyV2lkdGhcIiwgXCJib3JkZXJTdHlsZVwiLFxuXHRcImltYWdlXCIsIFwiZ3JhZGllbnRcIixcblx0XCJ0ZXh0XCJcbl1cblxuXG5cbmZvciBjb21wb25lbnQgaW4gY3VzdG9tQ29tcG9uZW50c1xuXG5cdG5hbWUgPSBjb21wb25lbnQubmFtZS5yZXBsYWNlIFwiQ3VzdG9tX1wiLCBcIlwiXG5cblx0ZG8gKGNvbXBvbmVudCwgbmFtZSkgLT5cblxuXHRcdGNsYXNzIGV4cG9ydHNbbmFtZV0gZXh0ZW5kcyBMYXllclxuXG5cdFx0XHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0XHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRcdFx0QHByb3BzID0gT2JqZWN0LmFzc2lnbiBjb21wb25lbnQucHJvcHMsIHtwYXJlbnQ6IEBvcHRpb25zLnBhcmVudH1cblx0XHRcdFx0QHBhcmVudCA9IEBvcHRpb25zLnBhcmVudCA/PSBTY3JlZW4uY29udGVudFxuXG5cdFx0XHRcdEBhZGRDaGlsZHJlbigpXG5cdFx0XHRcdEBzZXRDaGlsZFByb3BzKClcblx0XHRcdFx0XG5cdFx0XHRcdEBhZGRTdGF0ZUV2ZW50cygpXG5cblx0XHRcdFx0QG9yaWdpbmFsUHJvcHMgPSBAcHJvcHNcblxuXHRcdFx0XHRAc2V0Q29uc3RyYWludHMgQG9wdGlvbnMuY29uc3RyYWludHMsIGNvbXBvbmVudFxuXG5cdFx0XHRcdEBwcm9wcyA9IEBvcHRpb25zXG5cblx0XHRcdFx0aWYgQG9wdGlvbnMuc3RhdGU/XG5cdFx0XHRcdFx0c3RhdGUgPSBMYXllci5zZWxlY3QgXCIje0BvcHRpb25zLnN0YXRlfV9TdGF0ZV8je25hbWV9KlwiXG5cdFx0XHRcdFx0aWYgc3RhdGU/IHRoZW4gQGNoYW5nZVN0YXRlIHN0YXRlXG5cblxuXHRcdFx0c2V0Q2hpbGRQcm9wczogKHBhcmVudCkgLT5cblxuXHRcdFx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBAb3B0aW9uc1xuXHRcdFx0XHRcdGlmIEBba2V5XT8gJiYgQFtrZXldIGluc3RhbmNlb2YgTGF5ZXJcblxuXHRcdFx0XHRcdFx0aWYgQFtrZXldLmNvbnN0cnVjdG9yLm5hbWUgPT0gXCJUZXh0TGF5ZXJcIiAmJiBAW2tleV0uYXV0b1NpemUgIT0gdHJ1ZVxuXHRcdFx0XHRcdFx0XHRAW2tleV0ucHJvcHMgPSB2YWx1ZVxuXHRcdFx0XHRcdFx0XHR3aWR0aCA9IEBba2V5XS53aWR0aFxuXHRcdFx0XHRcdFx0XHRAW2tleV0uYXV0b1NpemUgPSB0cnVlXG5cdFx0XHRcdFx0XHRcdEBba2V5XS53aWR0aCA9IHdpZHRoXG5cdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdEBba2V5XS5wcm9wcyA9IHZhbHVlXG5cblxuXG5cdFx0XHRhZGRDaGlsZHJlbjogKHBhcmVudCwgb3JpZ2luKSAtPlxuXG5cdFx0XHRcdGlmICFvcmlnaW4/IHRoZW4gb3JpZ2luID0gY29tcG9uZW50XG5cdFx0XHRcdGlmICFwYXJlbnQ/IHRoZW4gcGFyZW50ID0gQFxuXG5cdFx0XHRcdGZvciBjaGlsZCBpbiBvcmlnaW4uY2hpbGRyZW5cblxuXHRcdFx0XHRcdGxheWVyID0gY2hpbGQuY29weVNpbmdsZSgpXG5cdFx0XHRcdFx0bGF5ZXIucGFyZW50ID0gcGFyZW50XG5cblx0XHRcdFx0XHRwYXJlbnRbbGF5ZXIubmFtZV0gPSBsYXllclxuXG5cdFx0XHRcdFx0aWYgQG9wdGlvbnNbbGF5ZXIubmFtZV0/LmNvbnN0cmFpbnRzP1xuXHRcdFx0XHRcdFx0bGF5ZXIuc2V0Q29uc3RyYWludHMgQG9wdGlvbnNbbGF5ZXIubmFtZV0uY29uc3RyYWludHMsIGNoaWxkXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0bGF5ZXIuc2V0Q29uc3RyYWludHMge30sIGNoaWxkXG5cblx0XHRcdFx0XHRpZiBjaGlsZC5jaGlsZHJlbj8gJiYgY2hpbGQuY2hpbGRyZW4ubGVuZ3RoID4gMFxuXHRcdFx0XHRcdFx0QGFkZENoaWxkcmVuIGxheWVyLCBjaGlsZFxuXG5cdFx0XHRhZGRTdGF0ZUV2ZW50czogLT5cblxuXHRcdFx0XHRzdGF0ZUNvbXBvbmVudHMgPSBMYXllci5zZWxlY3RBbGwgXCIqU3RhdGVfI3tuYW1lfV8qXCJcblxuXHRcdFx0XHRpZiBzdGF0ZUNvbXBvbmVudHMubGVuZ3RoID4gMFxuXG5cdFx0XHRcdFx0c3RhdGVzID0ge31cblx0XHRcdFx0XHRldmVudE5hbWUgPSBcIlwiXG5cdFx0XHRcdFx0QHN0YXRlSW5kZXggPSAwXG5cblx0XHRcdFx0XHRmb3Igc3RhdGUgaW4gc3RhdGVDb21wb25lbnRzXG5cblx0XHRcdFx0XHRcdGRvIChzdGF0ZSkgPT5cblxuXHRcdFx0XHRcdFx0XHRldmVudE5hbWUgPSBzdGF0ZS5uYW1lLnJlcGxhY2UgXCJTdGF0ZV8je25hbWV9X1wiLCBcIlwiXG5cblx0XHRcdFx0XHRcdFx0aWYgZXZlbnROYW1lLmluY2x1ZGVzIFwiX1wiXG5cdFx0XHRcdFx0XHRcdFx0ZXZlbnROYW1lID0gZXZlbnROYW1lLnNwbGl0KFwiX1wiKVsxXVxuXHRcdFx0XHRcdFx0XHRcdHVubGVzcyBzdGF0ZXNbZXZlbnROYW1lXT8gdGhlbiBzdGF0ZXNbZXZlbnROYW1lXSA9IFtdXG5cdFx0XHRcdFx0XHRcdFx0c3RhdGVOYW1lID0gc3RhdGUubmFtZS5yZXBsYWNlIFwiX1N0YXRlXyN7bmFtZX1fI3tldmVudE5hbWV9XCIsIFwiXCJcblx0XHRcdFx0XHRcdFx0XHRzdGF0ZXNbZXZlbnROYW1lXS5wdXNoIHN0YXRlXG5cdFx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0XHRpZiBFdmVudHNbZXZlbnROYW1lXT9cblxuXHRcdFx0XHRcdFx0XHRcdFx0QG9uIEV2ZW50c1tldmVudE5hbWVdLCAoZXZlbnQpIC0+XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0QGNoYW5nZVN0YXRlIHN0YXRlXG5cblx0XHRcdFx0XHRpZiBPYmplY3Qua2V5cyhzdGF0ZXMpLmxlbmd0aCA+IDBcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0Zm9yIGtleSwgdmFsdWUgb2Ygc3RhdGVzXG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRpZiBFdmVudHNba2V5XT9cblxuXHRcdFx0XHRcdFx0XHRcdEBvbiBFdmVudHNba2V5XSwgKGV2ZW50KSAtPlxuXG5cdFx0XHRcdFx0XHRcdFx0XHRAY3ljbGVTdGF0ZXMgdmFsdWVcblxuXG5cdFx0XHRjaGFuZ2VTdGF0ZTogKHN0YXRlKSAtPlxuXG5cdFx0XHRcdGZvciBwcm9wIGluIHN0YXRlQ2hhbmdlUHJvcHNcblx0XHRcdFx0XHRAW3Byb3BdID0gc3RhdGVbcHJvcF1cblxuXHRcdFx0XHRmb3IgY2hpbGQgaW4gQHNlbGVjdEFsbENoaWxkcmVuIFwiKlwiXG5cblx0XHRcdFx0XHRzdGF0ZUNoaWxkID0gc3RhdGUuc2VsZWN0Q2hpbGQgY2hpbGQubmFtZVxuXG5cdFx0XHRcdFx0Zm9yIHByb3AgaW4gW3N0YXRlQ2hhbmdlUHJvcHMuLi4sIFwiZnJhbWVcIl1cblx0XHRcdFx0XHRcdGNoaWxkW3Byb3BdID0gc3RhdGVDaGlsZFtwcm9wXVxuXG5cdFx0XHRjeWNsZVN0YXRlczogKHN0YXRlcykgLT5cblx0XHRcdFx0QGNoYW5nZVN0YXRlIHN0YXRlc1tAc3RhdGVJbmRleF1cblx0XHRcdFx0aWYgQHN0YXRlSW5kZXggPT0gc3RhdGVzLmxlbmd0aC0xXG5cdFx0XHRcdFx0QHN0YXRlSW5kZXggPSAwXG5cdFx0XHRcdGVsc2UgQHN0YXRlSW5kZXgrK1xuXG5cdFx0XHRAZGVmaW5lIFwiY29uc3RyYWludHNcIixcblx0XHRcdFx0Z2V0OiAtPiBAb3B0aW9ucy5jb25zdHJhaW50c1xuXHRcdFx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdFx0XHRAb3B0aW9ucy5jb25zdHJhaW50cyA9IHZhbHVlXG5cdFx0XHRcdFx0QGVtaXQoXCJjaGFuZ2U6Y29uc3RyYWludHNcIiwgQG9wdGlvbnMuY29uc3RyYWludHMpXG5cdFx0XHRcdFx0QHNldENvbnN0cmFpbnRzIHZhbHVlXG5cblxuXG5jdXN0b21TdGF0ZXMgPSBMYXllci5zZWxlY3RBbGwgXCJTdGF0ZV8qXCJcblxuZm9yIGNvbXBvbmVudFN0YXRlIGluIGN1c3RvbVN0YXRlc1xuXG5cdGNsYXNzRXZlbnROYW1lID0gY29tcG9uZW50U3RhdGUubmFtZS5yZXBsYWNlIFwiU3RhdGVfXCIsIFwiXCJcblx0aWYgY2xhc3NFdmVudE5hbWUuaW5jbHVkZXMgXCJfXCJcblx0XHRjbGFzc05hbWUgPSBjbGFzc0V2ZW50TmFtZS5zcGxpdChcIl9cIilbMF1cblx0XHRldmVudE5hbWUgPSBjbGFzc0V2ZW50TmFtZS5zcGxpdChcIl9cIilbMV1cblx0ZWxzZVxuXHRcdGNsYXNzTmFtZSA9IGNsYXNzRXZlbnROYW1lXG5cblxuIyMjXG4tLS0tLS0tLS0tLS0tLS0tLS1cbkVYSVNUSU5HIENMQVNTRVNcbi0tLS0tLS0tLS0tLS0tLS0tLVxuIyMjXG5cblxuY29tcG9uZW50cyA9IExheWVyLnNlbGVjdEFsbCBcIl8qXCJcblxuZXh0ZW5kU2xpZGVyID0gKG9yaWdpbikgLT5cblx0Y2xhc3MgZXhwb3J0cy5TbGlkZXJDb21wb25lbnQgZXh0ZW5kcyBTbGlkZXJDb21wb25lbnRcblxuXHRcdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0XHRAa25vYi5wcm9wcyA9XG5cdFx0XHRcdHNoYWRvd3M6IG9yaWdpbi5rbm9iLnNoYWRvd3Ncblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBvcmlnaW4ua25vYi5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdFx0Ym9yZGVyUmFkaXVzOiBvcmlnaW4ua25vYi5ib3JkZXJSYWRpdXNcblx0XHRcdFx0ZnJhbWU6IG9yaWdpbi5rbm9iLmZyYW1lXG5cblx0XHRcdEBmaWxsLnByb3BzID1cblx0XHRcdFx0c2hhZG93czogb3JpZ2luLmZpbGwuc2hhZG93c1xuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG9yaWdpbi5maWxsLmJhY2tncm91bmRDb2xvclxuXHRcdFx0XHRib3JkZXJSYWRpdXM6IG9yaWdpbi5maWxsLmJvcmRlclJhZGl1c1xuXHRcdFx0XHRmcmFtZTogb3JpZ2luLmZpbGwuZnJhbWVcblxuXHRcdFx0QHByb3BzID1cblx0XHRcdFx0c2hhZG93czogb3JpZ2luLnNoYWRvd3Ncblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBvcmlnaW4uYmFja2dyb3VuZENvbG9yXG5cdFx0XHRcdGJvcmRlclJhZGl1czogb3JpZ2luLmJvcmRlclJhZGl1c1xuXHRcdFx0XHRzaXplOiBvcmlnaW4uc2l6ZVxuXG5cdFx0XHRAdmFsdWUgPSBVdGlscy5tb2R1bGF0ZSBvcmlnaW4ua25vYi5taWRYLCBbMCwgb3JpZ2luLndpZHRoXSwgW0BtaW4sIEBtYXhdXG5cblxuZXh0ZW5kUmFuZ2VTbGlkZXIgPSAob3JpZ2luKSAtPlxuXHRjbGFzcyBleHBvcnRzLlJhbmdlU2xpZGVyQ29tcG9uZW50IGV4dGVuZHMgUmFuZ2VTbGlkZXJDb21wb25lbnRcblxuXHRcdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0XHRAbWluS25vYi5wcm9wcyA9XG5cdFx0XHRcdHNoYWRvd3M6IG9yaWdpbi5taW5Lbm9iLnNoYWRvd3Ncblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBvcmlnaW4ubWluS25vYi5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdFx0Ym9yZGVyUmFkaXVzOiBvcmlnaW4ubWluS25vYi5ib3JkZXJSYWRpdXNcblx0XHRcdFx0ZnJhbWU6IG9yaWdpbi5taW5Lbm9iLmZyYW1lXG5cdFx0XHRAbWF4S25vYi5wcm9wcyA9XG5cdFx0XHRcdHNoYWRvd3M6IG9yaWdpbi5tYXhLbm9iLnNoYWRvd3Ncblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBvcmlnaW4ubWF4S25vYi5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdFx0Ym9yZGVyUmFkaXVzOiBvcmlnaW4ubWF4S25vYi5ib3JkZXJSYWRpdXNcblx0XHRcdFx0ZnJhbWU6IG9yaWdpbi5tYXhLbm9iLmZyYW1lXG5cblx0XHRcdEBmaWxsLnByb3BzID1cblx0XHRcdFx0c2hhZG93czogb3JpZ2luLmZpbGwuc2hhZG93c1xuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG9yaWdpbi5maWxsLmJhY2tncm91bmRDb2xvclxuXHRcdFx0XHRib3JkZXJSYWRpdXM6IG9yaWdpbi5maWxsLmJvcmRlclJhZGl1c1xuXHRcdFx0XHRmcmFtZTogb3JpZ2luLmZpbGwuZnJhbWVcblxuXHRcdFx0QHByb3BzID1cblx0XHRcdFx0c2hhZG93czogb3JpZ2luLnNoYWRvd3Ncblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBvcmlnaW4uYmFja2dyb3VuZENvbG9yXG5cdFx0XHRcdGJvcmRlclJhZGl1czogb3JpZ2luLmJvcmRlclJhZGl1c1xuXHRcdFx0XHRzaXplOiBvcmlnaW4uc2l6ZVxuXHRcdFx0XHRcblx0XHRcdEBtaW5WYWx1ZSA9IFV0aWxzLm1vZHVsYXRlIG9yaWdpbi5taW5Lbm9iLm1pZFgsIFswLCBvcmlnaW4ud2lkdGhdLCBbQG1pbiwgQG1heF1cblx0XHRcdEBtYXhWYWx1ZSA9IFV0aWxzLm1vZHVsYXRlIG9yaWdpbi5tYXhLbm9iLm1pZFgsIFswLCBvcmlnaW4ud2lkdGhdLCBbQG1pbiwgQG1heF1cblxuXG5cbmZvciBjb21wb25lbnQgaW4gY29tcG9uZW50c1xuXG5cdHR5cGUgPSBjb21wb25lbnQubmFtZS5yZXBsYWNlIFwiX1wiLCBcIlwiXG5cblx0ZG8gKGNvbXBvbmVudCkgLT5cblxuXHRcdGNvbXBvbmVudC5hZGREZXNpZ25DaGlsZHJlbigpXG5cblx0XHRpZiB0eXBlID09IFwiU2xpZGVyQ29tcG9uZW50XCJcblx0XHRcdGV4dGVuZFNsaWRlciBjb21wb25lbnRcblx0XHRlbHNlIGlmIHR5cGUgPT0gXCJSYW5nZVNsaWRlckNvbXBvbmVudFwiXG5cdFx0XHRleHRlbmRSYW5nZVNsaWRlciBjb21wb25lbnRcblxuXG5cblxuXG5cblxuXG5cbiIsIlxubW92ZUZyb21SZWYgPSAobGF5ZXIsIHJlZmVyZW5jZSwgbW92ZVJlZiwgbGF5ZXJSZWYsIHJlZlR5cGUpIC0+XG5cblx0b3JpZ2luYWxDb25zdHJhaW50cyA9IGxheWVyLmNvbnN0cmFpbnRWYWx1ZXNcblxuXHRvcmlnaW5hbFJlZlZhbHVlID0gcmVmZXJlbmNlW2xheWVyUmVmXVxuXHRvcmlnaW5hbExheWVyVmFsdWUgPSBsYXllclttb3ZlUmVmXVxuXG5cdGxheWVyW21vdmVSZWZdID0gcmVmZXJlbmNlW2xheWVyUmVmXSArIGxheWVyLmNvbnN0cmFpbnRWYWx1ZXNbcmVmVHlwZV0udmFsdWVcblxuXHQjIHJlZmVyZW5jZS5vbkNoYW5nZSBsYXllclJlZiwgKHZhbHVlKSAtPlxuXHQjIFx0bGF5ZXJbbW92ZVJlZl0gPSBvcmlnaW5hbExheWVyVmFsdWUgKyAodmFsdWUgLSBvcmlnaW5hbFJlZlZhbHVlKVxuXG5cdGxheWVyLmNvbnN0cmFpbnRWYWx1ZXMgPSBvcmlnaW5hbENvbnN0cmFpbnRzXG5cblxucHVzaFBhcmVudCA9IChsYXllciwgZGlyZWN0aW9uKSAtPlxuXG5cdGlmIGRpcmVjdGlvbiA9PSBcImRvd25cIlxuXHRcdG9yaWdpbmFsWSA9IGxheWVyLnlcblx0XHRvcmlnaW5hbEhlaWdodCA9IGxheWVyLmhlaWdodFxuXG5cdFx0bGF5ZXIub25DaGFuZ2UgXCJ5XCIsICh2YWx1ZSkgLT5cblx0XHRcdEBwYXJlbnQuaGVpZ2h0ICs9IHZhbHVlIC0gb3JpZ2luYWxZXG5cdFx0XHRvcmlnaW5hbFkgPSB2YWx1ZVxuXHRcdFx0b3JpZ2luYWxIZWlnaHQgPSBAaGVpZ2h0XG5cdFx0bGF5ZXIub25DaGFuZ2UgXCJoZWlnaHRcIiwgKHZhbHVlKSAtPlxuXHRcdFx0QHBhcmVudC5oZWlnaHQgKz0gdmFsdWUgLSBvcmlnaW5hbEhlaWdodFxuXHRcdFx0b3JpZ2luYWxZID0gQHlcblx0XHRcdG9yaWdpbmFsSGVpZ2h0ID0gdmFsdWVcblx0XG5cdGlmIGRpcmVjdGlvbiA9PSBcInJpZ2h0XCJcblx0XHRvcmlnaW5hbFggPSBsYXllci54XG5cdFx0b3JpZ2luYWxXaWR0aCAtIGxheWVyLndpZHRoXG5cblx0XHRsYXllci5vbkNoYW5nZSBcInhcIiwgKHZhbHVlKSAtPlxuXHRcdFx0QHBhcmVudC53aWR0aCArPSB2YWx1ZSAtIG9yaWdpbmFsWFxuXHRcdFx0b3JpZ2luYWxYID0gdmFsdWVcblx0XHRcdG9yaWdpbmFsV2lkdGggPSBAd2lkdGhcblx0XHRsYXllci5vbkNoYW5nZSBcIndpZHRoXCIsICh2YWx1ZSkgLT5cblx0XHRcdEBwYXJlbnQud2lkdGggKz0gdmFsdWUgLSBvcmlnaW5hbFdpZHRoXG5cdFx0XHRvcmlnaW5hbFggPSBAeFxuXHRcdFx0b3JpZ2luYWxXaWR0aCA9IHZhbHVlXG5cblxuYWRkUmVmZXJlbmNlRXZlbnRzID0gKGxheWVyKSAtPlxuXG5cdG9yaWdpbmFsQ29uc3RyYWludHMgPSBsYXllci5jb25zdHJhaW50VmFsdWVzXG5cblx0aWYgbGF5ZXIuY29uc3RyYWludFZhbHVlcz8udG9wUmVmPy5sYXllcj8gfHwgbGF5ZXIuY29uc3RyYWludFZhbHVlcz8uYm90dG9tUmVmPy5sYXllcj9cblx0XHRyZWZlcmVuY2UgPSBsYXllci5jb25zdHJhaW50VmFsdWVzPy50b3BSZWY/LmxheWVyIHx8IGxheWVyLmNvbnN0cmFpbnRWYWx1ZXM/LmJvdHRvbVJlZj8ubGF5ZXJcblxuXHRcdG9yaWdpbmFsWVJlZiA9IHJlZmVyZW5jZS55XG5cdFx0b3JpZ2luYWxIZWlnaHRSZWYgPSByZWZlcmVuY2UuaGVpZ2h0XG5cdFx0b3JpZ2luYWxZID0gbGF5ZXIueVxuXG5cdFx0cmVmZXJlbmNlLm9uQ2hhbmdlIFwieVwiLCAodmFsdWUpIC0+XG5cdFx0XHRsYXllci55ID0gb3JpZ2luYWxZICsgKHZhbHVlIC0gb3JpZ2luYWxZUmVmKVxuXHRcdFx0b3JpZ2luYWxZUmVmID0gdmFsdWVcblx0XHRcdG9yaWdpbmFsWSA9IGxheWVyLnlcblxuXHRcdHVubGVzcyBsYXllci5jb25zdHJhaW50VmFsdWVzPy50b3BSZWY/LmFsaWduID09IFwieVwiXG5cdFx0XHRyZWZlcmVuY2Uub25DaGFuZ2UgXCJoZWlnaHRcIiwgKHZhbHVlKSAtPlxuXHRcdFx0XHRsYXllci55ID0gb3JpZ2luYWxZICsgKHZhbHVlIC0gb3JpZ2luYWxIZWlnaHRSZWYpXG5cdFx0XHRcdG9yaWdpbmFsSGVpZ2h0UmVmID0gdmFsdWVcblx0XHRcdFx0b3JpZ2luYWxZID0gbGF5ZXIueVxuXG5cdFx0aWYgbGF5ZXIuY29uc3RyYWludFZhbHVlcz8udG9wUmVmPyAmJiBsYXllci5jb25zdHJhaW50VmFsdWVzPy5ib3R0b21SZWY/XG5cdFx0XHRyZWZlcmVuY2Uub25DaGFuZ2UgXCJoZWlnaHRcIiwgKHZhbHVlKSAtPlxuXHRcdFx0XHRsYXllci5oZWlnaHQgPSB2YWx1ZSAtIGxheWVyLmNvbnN0cmFpbnRWYWx1ZXM/LnRvcFJlZi52YWx1ZSAtIGxheWVyLmNvbnN0cmFpbnRWYWx1ZXM/LmJvdHRvbVJlZi52YWx1ZVxuXHRcdFx0XHRsYXllci55ID0gcmVmZXJlbmNlLnkgKyBsYXllci5jb25zdHJhaW50VmFsdWVzPy50b3BSZWYudmFsdWVcblx0XHRcdFx0b3JpZ2luYWxIZWlnaHRSZWYgPSB2YWx1ZVxuXG5cdGlmIGxheWVyLmNvbnN0cmFpbnRWYWx1ZXM/LmxlZnRSZWY/LmxheWVyPyB8fCBsYXllci5jb25zdHJhaW50VmFsdWVzPy5yaWdodFJlZj8ubGF5ZXI/XG5cdFx0cmVmZXJlbmNlID0gbGF5ZXIuY29uc3RyYWludFZhbHVlcz8ubGVmdFJlZj8ubGF5ZXIgfHwgbGF5ZXIuY29uc3RyYWludFZhbHVlcz8ucmlnaHRSZWY/LmxheWVyXG5cblx0XHRvcmlnaW5hbFhSZWYgPSByZWZlcmVuY2UueFxuXHRcdG9yaWdpbmFsV2lkdGhSZWYgPSByZWZlcmVuY2Uud2lkdGhcblx0XHRvcmlnaW5hbFggPSBsYXllci54XG5cblx0XHRyZWZlcmVuY2Uub25DaGFuZ2UgXCJ4XCIsICh2YWx1ZSkgLT5cblx0XHRcdGxheWVyLnggPSBvcmlnaW5hbFggKyAodmFsdWUgLSBvcmlnaW5hbFhSZWYpXG5cdFx0XHRvcmlnaW5hbFhSZWYgPSB2YWx1ZVxuXHRcdFx0b3JpZ2luYWxYID0gbGF5ZXIueFxuXG5cdFx0dW5sZXNzIGxheWVyLmNvbnN0cmFpbnRWYWx1ZXM/LmxlZnQ/LmFsaWduID09IFwieFwiXG5cdFx0XHRyZWZlcmVuY2Uub25DaGFuZ2UgXCJ3aWR0aFwiLCAodmFsdWUpIC0+XG5cdFx0XHRcdGxheWVyLnggPSBvcmlnaW5hbFggKyAodmFsdWUgLSBvcmlnaW5hbFdpZHRoUmVmKVxuXHRcdFx0XHRvcmlnaW5hbFdpZHRoUmVmID0gdmFsdWVcblx0XHRcdFx0b3JpZ2luYWxYID0gbGF5ZXIueFxuXG5cdFx0aWYgbGF5ZXIuY29uc3RyYWludFZhbHVlcz8ubGVmdFJlZj8gJiYgbGF5ZXIuY29uc3RyYWludFZhbHVlcz8ucmlnaHRSZWY/XG5cdFx0XHRyZWZlcmVuY2Uub25DaGFuZ2UgXCJ3aWR0aFwiLCAodmFsdWUpIC0+XG5cdFx0XHRcdGxheWVyLndpZHRoID0gdmFsdWUgLSBsYXllci5jb25zdHJhaW50VmFsdWVzPy5sZWZ0UmVmLnZhbHVlIC0gbGF5ZXIuY29uc3RyYWludFZhbHVlcz8ucmlnaHRSZWYudmFsdWVcblx0XHRcdFx0bGF5ZXIueCA9IHJlZmVyZW5jZS54ICsgbGF5ZXIuY29uc3RyYWludFZhbHVlcz8ubGVmdFJlZi52YWx1ZVxuXHRcdFx0XHRvcmlnaW5hbFdpZHRoUmVmID0gdmFsdWVcblxuXG5cblxuTGF5ZXI6OnNldENvbnN0cmFpbnRzID0gKG9wdGlvbnM9e30sIG9yaWdpbikgLT5cblxuXHRAY29uc3RyYWludFZhbHVlcyA9XG5cdFx0dG9wOiBpZiB0eXBlb2Ygb3B0aW9ucy50b3AgPT0gXCJvYmplY3RcIiB0aGVuIG51bGwgZWxzZSBpZiBvcHRpb25zLnRvcD8gdGhlbiBvcHRpb25zLnRvcCBlbHNlIGlmIG9yaWdpbj8uY29uc3RyYWludFZhbHVlcz8gdGhlbiBvcmlnaW4uY29uc3RyYWludFZhbHVlcy50b3AgZWxzZSBudWxsXG5cdFx0bGVmdDogaWYgdHlwZW9mIG9wdGlvbnMubGVmdCA9PSBcIm9iamVjdFwiIHRoZW4gbnVsbCBlbHNlIGlmIG9wdGlvbnMubGVmdD8gdGhlbiBvcHRpb25zLmxlZnQgZWxzZSBpZiBvcmlnaW4/LmNvbnN0cmFpbnRWYWx1ZXM/IHRoZW4gb3JpZ2luLmNvbnN0cmFpbnRWYWx1ZXMubGVmdCBlbHNlIG51bGxcblx0XHRib3R0b206IGlmIHR5cGVvZiBvcHRpb25zLmJvdHRvbSA9PSBcIm9iamVjdFwiIHRoZW4gbnVsbCBlbHNlIGlmIG9wdGlvbnMucHVzaERvd24gdGhlbiBudWxsIGVsc2UgaWYgb3B0aW9ucy5ib3R0b20/IHRoZW4gb3B0aW9ucy5ib3R0b20gZWxzZSBpZiBvcmlnaW4/LmNvbnN0cmFpbnRWYWx1ZXM/IHRoZW4gb3JpZ2luLmNvbnN0cmFpbnRWYWx1ZXMuYm90dG9tIGVsc2UgbnVsbFxuXHRcdHJpZ2h0OiBpZiB0eXBlb2Ygb3B0aW9ucy5yaWdodCA9PSBcIm9iamVjdFwiIHRoZW4gbnVsbCBlbHNlIGlmIG9wdGlvbnMucHVzaFJpZ2h0IHRoZW4gbnVsbCAgZWxzZSBpZiBvcHRpb25zLnJpZ2h0PyB0aGVuIG9wdGlvbnMucmlnaHQgZWxzZSBpZiBvcmlnaW4/LmNvbnN0cmFpbnRWYWx1ZXM/IHRoZW4gb3JpZ2luLmNvbnN0cmFpbnRWYWx1ZXMucmlnaHQgZWxzZSBudWxsXG5cdFx0d2lkdGg6IEB3aWR0aFxuXHRcdGhlaWdodDogQGhlaWdodFxuXHRcdHdpZHRoRmFjdG9yOiBpZiBvcHRpb25zLnNjYWxlWD8gdGhlbiBvcHRpb25zLnNjYWxlWCBlbHNlIGlmIG9wdGlvbnMud2lkdGhGYWN0b3I/IHRoZW4gb3B0aW9ucy53aWR0aEZhY3RvciBlbHNlIG51bGxcblx0XHRoZWlnaHRGYWN0b3I6IGlmIG9wdGlvbnMuc2NhbGVZPyB0aGVuIG9wdGlvbnMuc2NhbGVZIGVsc2UgaWYgb3B0aW9ucy5oZWlnaHRGYWN0b3I/IHRoZW4gb3B0aW9ucy5oZWlnaHRGYWN0b3IgZWxzZSBudWxsXG5cdFx0Y2VudGVyQW5jaG9yWDogaWYgb3B0aW9ucy5jZW50ZXJYPyB0aGVuIG9wdGlvbnMuY2VudGVyWCBlbHNlIGlmIG9wdGlvbnMuY2VudGVyQW5jaG9yWD8gdGhlbiBvcHRpb25zLmNlbnRlckFuY2hvclggZWxzZSBudWxsXG5cdFx0Y2VudGVyQW5jaG9yWTogaWYgb3B0aW9ucy5jZW50ZXJZPyB0aGVuIG9wdGlvbnMuY2VudGVyWSBlbHNlIGlmIG9wdGlvbnMuY2VudGVyQW5jaG9yWT8gdGhlbiBvcHRpb25zLmNlbnRlckFuY2hvclkgZWxzZSBudWxsXG5cdFx0YXNwZWN0UmF0aW9Mb2NrZWQ6IGlmIG9wdGlvbnMuYXNwZWN0UmF0aW9Mb2NrZWQ/IHRoZW4gb3B0aW9ucy5hc3BlY3RSYXRpb0xvY2tlZCBlbHNlIGlmIG9yaWdpbj8uY29uc3RyYWludFZhbHVlcyB0aGVuIG9yaWdpbi5jb25zdHJhaW50VmFsdWVzLmFzcGVjdFJhdGlvTG9ja2VkIGVsc2UgZmFsc2VcblxuXHQjIHJlc2V0c1xuXHR2YWx1ZXMgPSBAY29uc3RyYWludFZhbHVlc1xuXHRpZiB2YWx1ZXMudG9wPyAmJiB2YWx1ZXMuYm90dG9tP1xuXHRcdEBjb25zdHJhaW50VmFsdWVzLmhlaWdodEZhY3RvciA9IG51bGxcblx0XHRAY29uc3RyYWludFZhbHVlcy5jZW50ZXJBbmNob3JZID0gbnVsbFxuXHRpZiB2YWx1ZXMubGVmdD8gJiYgdmFsdWVzLnJpZ2h0P1xuXHRcdEBjb25zdHJhaW50VmFsdWVzLndpZHRoRmFjdG9yID0gbnVsbFxuXHRcdEBjb25zdHJhaW50VmFsdWVzLmNlbnRlckFuY2hvclggPSBudWxsXG5cdGlmIHZhbHVlcy5sZWZ0PyAmJiB2YWx1ZXMucmlnaHQ/ICYmIHZhbHVlcy50b3A/ICYmIHZhbHVlcy5ib3R0b20/XG5cdFx0QGNvbnN0cmFpbnRWYWx1ZXMuYXNwZWN0UmF0aW9Mb2NrZWQgPSBmYWxzZVxuXG5cdGZvciByZWYgaW4gW1tcInRvcFwiLCBcInlcIiwgXCJtYXhZXCIsIFwidG9wUmVmXCIsIFwiYm90dG9tXCJdLCBbXCJsZWZ0XCIsIFwieFwiLCBcIm1heFhcIiwgXCJsZWZ0UmVmXCIsIFwicmlnaHRcIl0sIFtcImJvdHRvbVwiLCBcIm1heFlcIiwgXCJ5XCIsIFwiYm90dG9tUmVmXCIsIFwidG9wXCJdLCBbXCJyaWdodFwiLCBcIm1heFhcIiwgXCJ4XCIsIFwicmlnaHRSZWZcIiwgXCJsZWZ0XCJdXVxuXHRcdGlmIHR5cGVvZiBvcHRpb25zW3JlZlswXV0gPT0gXCJvYmplY3RcIlxuXG5cdFx0XHRpZiBvcHRpb25zW3JlZlswXV0ubGF5ZXI/XG5cdFx0XHRcdGlmIEBwYXJlbnQ/ICYmIEBwYXJlbnQuc2VsZWN0Q2hpbGQob3B0aW9uc1tyZWZbMF1dLmxheWVyKT9cblx0XHRcdFx0XHRsYXllciA9IEBwYXJlbnQuc2VsZWN0Q2hpbGQgb3B0aW9uc1tyZWZbMF1dLmxheWVyXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRsYXllciA9IExheWVyLnNlbGVjdCBvcHRpb25zW3JlZlswXV0ubGF5ZXJcblx0XHRcdGVsc2UgbGF5ZXIgPSBAcGFyZW50XG5cblx0XHRcdGFsaWduID0gbnVsbFxuXG5cdFx0XHRpZiAhb3B0aW9uc1tyZWZbMF1dLnZhbHVlPyAmJiBsYXllciA9PSBAcGFyZW50XG5cdFx0XHRcdHZhbHVlID0gQFtyZWZbMV1dXG5cdFx0XHRlbHNlIGlmIG9wdGlvbnNbcmVmWzBdXS5hbGlnbj8gJiYgb3B0aW9uc1tyZWZbMF1dLnZhbHVlP1xuXHRcdFx0XHR2YWx1ZSA9IG9wdGlvbnNbcmVmWzBdXS52YWx1ZVxuXHRcdFx0XHRhbGlnbiA9IG9wdGlvbnNbcmVmWzBdXS5hbGlnblxuXHRcdFx0ZWxzZSBpZiBvcHRpb25zW3JlZlswXV0uYWxpZ24/XG5cdFx0XHRcdHZhbHVlID0gMFxuXHRcdFx0XHRhbGlnbiA9IG9wdGlvbnNbcmVmWzBdXS5hbGlnblxuXHRcdFx0ZWxzZSBpZiAhb3B0aW9uc1tyZWZbMF1dLnZhbHVlPyAmJiAhb3B0aW9uc1tyZWZbMF1dLmFsaWduP1xuXHRcdFx0XHR2YWx1ZSA9IEBbcmVmWzFdXSAtIGxheWVyW3JlZlsyXV1cblx0XHRcdFx0YWxpZ24gPSByZWZbNF1cblx0XHRcdGVsc2Vcblx0XHRcdFx0dmFsdWUgPSBvcHRpb25zW3JlZlswXV0udmFsdWVcblx0XHRcdFx0YWxpZ24gPSByZWZbNF1cblxuXHRcdFx0aWYgYWxpZ24gPT0gXCJsZWZ0XCIgdGhlbiBhbGlnbiA9IFwieFwiXG5cdFx0XHRlbHNlIGlmIGFsaWduID09IFwicmlnaHRcIiB0aGVuIGFsaWduID0gXCJtYXhYXCJcblx0XHRcdGVsc2UgaWYgYWxpZ24gPT0gXCJ0b3BcIiB0aGVuIGFsaWduID0gXCJ5XCJcblx0XHRcdGVsc2UgaWYgYWxpZ24gPT0gXCJib3R0b21cIiB0aGVuIGFsaWduID0gXCJtYXhZXCJcblxuXHRcdFx0QGNvbnN0cmFpbnRWYWx1ZXNbcmVmWzNdXSA9XG5cdFx0XHRcdGxheWVyOiBsYXllclxuXHRcdFx0XHR2YWx1ZTogdmFsdWVcblx0XHRcdFx0YWxpZ246IGFsaWduXG5cblx0XHRcdEBjb25zdHJhaW50VmFsdWVzW3JlZlswXV0gPSBudWxsXG5cdFx0XHRAY29uc3RyYWludFZhbHVlc1tyZWZbNF1dID0gbnVsbFxuXG5cdFx0XHQjIG1vdmVGcm9tUmVmIEAsIGxheWVyLCByZWZbMV0sIHJlZlsyXSwgcmVmWzNdXG5cblx0aWYgb3B0aW9ucy5wdXNoRG93bj9cblx0XHRAY29uc3RyYWludFZhbHVlcy5ib3R0b20gPSBudWxsXG5cdFx0cHVzaFBhcmVudCBALCBcImRvd25cIlxuXHRpZiBvcHRpb25zLnB1c2hSaWdodD9cblx0XHRAY29uc3RyYWludFZhbHVlcy5yaWdodCA9IG51bGxcblx0XHRwdXNoUGFyZW50IEAsIFwicmlnaHRcIlxuXG5cdHVubGVzcyBvcHRpb25zLnB1c2hEb3duIHx8IEBjb25zdHJhaW50VmFsdWVzLnRvcFJlZiB8fCBAY29uc3RyYWludFZhbHVlcy5ib3R0b21SZWZcblx0XHRAY29uc3RyYWludFZhbHVlcy5ib3R0b20gPSBpZiBvcHRpb25zLmJvdHRvbT8gdGhlbiBvcHRpb25zLmJvdHRvbSBlbHNlIGlmIG9yaWdpbj8uY29uc3RyYWludFZhbHVlcz8gdGhlbiBvcmlnaW4uY29uc3RyYWludFZhbHVlcy5ib3R0b20gZWxzZSBudWxsXG5cdHVubGVzcyBvcHRpb25zLnB1c2hSaWdodCB8fCBAY29uc3RyYWludFZhbHVlcy5sZWZ0UmVmIHx8IEBjb25zdHJhaW50VmFsdWVzLnJpZ2h0UmVmXG5cdFx0QGNvbnN0cmFpbnRWYWx1ZXMucmlnaHQgPSBpZiBvcHRpb25zLnJpZ2h0PyB0aGVuIG9wdGlvbnMucmlnaHQgZWxzZSBpZiBvcmlnaW4/LmNvbnN0cmFpbnRWYWx1ZXM/IHRoZW4gb3JpZ2luLmNvbnN0cmFpbnRWYWx1ZXMucmlnaHQgZWxzZSBudWxsXG5cblx0aWYgQGNvbnN0cmFpbnRWYWx1ZXMudG9wID09IG51bGwgJiYgQGNvbnN0cmFpbnRWYWx1ZXMuYm90dG9tID09IG51bGwgJiYgQGNvbnN0cmFpbnRWYWx1ZXMuY2VudGVyQW5jaG9yWSA9PSBudWxsICYmICFAY29uc3RyYWludFZhbHVlcy50b3BSZWYgJiYgIUBjb25zdHJhaW50VmFsdWVzLmJvdHRvbVJlZlxuXHRcdEBjb25zdHJhaW50VmFsdWVzLnRvcCA9IEB5XG5cdGlmIEBjb25zdHJhaW50VmFsdWVzLmxlZnQgPT0gbnVsbCAmJiBAY29uc3RyYWludFZhbHVlcy5yaWdodCA9PSBudWxsICYmIEBjb25zdHJhaW50VmFsdWVzLmNlbnRlckFuY2hvclggPT0gbnVsbCAmJiAhQGNvbnN0cmFpbnRWYWx1ZXMubGVmdFJlZiAmJiAhQGNvbnN0cmFpbnRWYWx1ZXMucmlnaHRSZWZcblx0XHRAY29uc3RyYWludFZhbHVlcy5sZWZ0ID0gQHhcblxuXHRAYXBwbHlDb25zdHJhaW50cygpXG5cblxuXG5MYXllcjo6YXBwbHlDb25zdHJhaW50cyA9IC0+XG5cblx0cmV0dXJuIGlmICFAY29uc3RyYWludFZhbHVlc1xuXG5cdHZhbHVlcyA9IEBjb25zdHJhaW50VmFsdWVzXG5cblx0aWYgIUBwYXJlbnQgdGhlbiBwYXJlbnQgPSBTY3JlZW4gZWxzZSBwYXJlbnQgPSBAcGFyZW50XG5cblx0YXNwZWN0UmF0aW8gPSBAd2lkdGggLyBAaGVpZ2h0XG5cblx0IyBwb3NpdGlvblxuXHRpZiB2YWx1ZXMudG9wPyAmJiB0eXBlb2YgdmFsdWVzLnRvcCAhPSBcIm9iamVjdFwiXG5cdFx0QHkgPSB2YWx1ZXMudG9wXG5cdGVsc2UgaWYgdmFsdWVzLnRvcCA9PSBudWxsICYmIHZhbHVlcy50b3BSZWY/LmxheWVyP1xuXHRcdEB5ID0gdmFsdWVzLnRvcFJlZi5sYXllclt2YWx1ZXMudG9wUmVmLmFsaWduXSArIHZhbHVlcy50b3BSZWYudmFsdWVcblxuXHRpZiB2YWx1ZXMubGVmdD8gJiYgdHlwZW9mIHZhbHVlcy5sZWZ0ICE9IFwib2JqZWN0XCJcblx0XHRAeCA9IHZhbHVlcy5sZWZ0XG5cdGVsc2UgaWYgdmFsdWVzLmxlZnQgPT0gbnVsbCAmJiB2YWx1ZXMubGVmdFJlZj8ubGF5ZXI/XG5cdFx0QHggPSB2YWx1ZXMubGVmdFJlZi5sYXllclt2YWx1ZXMubGVmdFJlZi5hbGlnbl0gKyB2YWx1ZXMubGVmdFJlZi52YWx1ZVxuXG5cdCMgc2l6ZVxuXHRpZiB2YWx1ZXMubGVmdD8gJiYgdmFsdWVzLnJpZ2h0P1xuXHRcdEB3aWR0aCA9IHBhcmVudC53aWR0aCAtIEB4IC0gdmFsdWVzLnJpZ2h0XG5cdFx0aWYgdmFsdWVzLmFzcGVjdFJhdGlvTG9ja2VkXG5cdFx0XHRAaGVpZ2h0ID0gQHdpZHRoIC8gYXNwZWN0UmF0aW9cblx0aWYgdmFsdWVzLnRvcD8gJiYgdmFsdWVzLmJvdHRvbT9cblx0XHRAaGVpZ2h0ID0gcGFyZW50LmhlaWdodCAtIEB5IC0gdmFsdWVzLmJvdHRvbVxuXHRcdGlmIHZhbHVlcy5hc3BlY3RSYXRpb0xvY2tlZFxuXHRcdFx0QHdpZHRoID0gQGhlaWdodCAqIGFzcGVjdFJhdGlvXG5cblx0IyBpZiB2YWx1ZXMubGVmdFJlZj8gJiYgdmFsdWVzLnJpZ2h0UmVmP1xuXHQjIFx0QHdpZHRoID0gcGFyZW50LndpZHRoIC0gdmFsdWVzLmxlZnRSZWYudmFsdWUgLSB2YWx1ZXMucmlnaHRSZWYudmFsdWVcblx0IyBpZiB2YWx1ZXMudG9wUmVmPyAmJiB2YWx1ZXMuYm90dG9tUmVmP1xuXHQjIFx0QGhlaWdodCA9IHBhcmVudC5oZWlnaHQgLSB2YWx1ZXMudG9wUmVmLnZhbHVlIC0gdmFsdWVzLmJvdHRvbVJlZi52YWx1ZVxuXG5cdGlmIHZhbHVlcy53aWR0aEZhY3Rvcj9cblx0XHRAd2lkdGggPSBwYXJlbnQud2lkdGggKiB2YWx1ZXMud2lkdGhGYWN0b3Jcblx0aWYgdmFsdWVzLmhlaWdodEZhY3Rvcj9cblx0XHRAaGVpZ2h0ID0gcGFyZW50LmhlaWdodCAqIHZhbHVlcy5oZWlnaHRGYWN0b3JcblxuXHQjIG1heCBwb3NpdGlvblxuXHRpZiB2YWx1ZXMucmlnaHQ/IFxuXHRcdEBtYXhYID0gcGFyZW50LndpZHRoIC0gdmFsdWVzLnJpZ2h0XG5cdGVsc2UgaWYgdmFsdWVzLnJpZ2h0ID09IG51bGwgJiYgdmFsdWVzLnJpZ2h0UmVmPy5sYXllcj9cblx0XHRAbWF4WCA9IHZhbHVlcy5yaWdodFJlZi5sYXllclt2YWx1ZXMucmlnaHRSZWYuYWxpZ25dIC0gdmFsdWVzLnJpZ2h0UmVmLnZhbHVlXG5cdGlmIHZhbHVlcy5ib3R0b20/XG5cdFx0QG1heFkgPSBwYXJlbnQuaGVpZ2h0IC0gdmFsdWVzLmJvdHRvbVxuXHRlbHNlIGlmIHZhbHVlcy5ib3R0b20gPT0gbnVsbCAmJiB2YWx1ZXMuYm90dG9tUmVmPy5sYXllcj9cblx0XHRAbWF4WSA9IHZhbHVlcy5ib3R0b21SZWYubGF5ZXJbdmFsdWVzLmJvdHRvbVJlZi5hbGlnbl0gLSB2YWx1ZXMuYm90dG9tUmVmLnZhbHVlXG5cblx0IyBjZW50ZXIgcG9zaXRpb25cblx0aWYgIXZhbHVlcy5sZWZ0PyAmJiAhdmFsdWVzLnJpZ2h0PyAmJiB2YWx1ZXMuY2VudGVyQW5jaG9yWD9cblx0XHRAbWlkWCA9IHBhcmVudC53aWR0aCAqIHZhbHVlcy5jZW50ZXJBbmNob3JYXG5cdGlmICF2YWx1ZXMudG9wPyAmJiAhdmFsdWVzLmJvdHRvbT8gJiYgdmFsdWVzLmNlbnRlckFuY2hvclk/XG5cdFx0QG1pZFkgPSBwYXJlbnQuaGVpZ2h0ICogdmFsdWVzLmNlbnRlckFuY2hvcllcblxuXHRAY29uc3RyYWludFZhbHVlcyA9IHZhbHVlc1xuXG5cdGFkZFJlZmVyZW5jZUV2ZW50cyhAKVxuXG5cblxuXG5cblxuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShMYXllci5wcm90b3R5cGUsIFwiY29uc3RyYWludHNcIiwge1xuXG5cdGdldDogLT4gcmV0dXJuIEBfY29uc3RyYWludHNcblx0c2V0OiAodmFsdWUpIC0+XG5cdFx0QF9jb25zdHJhaW50cyA9IHZhbHVlXG5cdFx0QGVtaXQgXCJjaGFuZ2U6Y29uc3RyYWludHNcIiwgdmFsdWVcblx0XHRAc2V0Q29uc3RyYWludHMgdmFsdWVcblxufSlcblxuXG5cblxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFFQUE7QURDQSxJQUFBOztBQUFBLFdBQUEsR0FBYyxTQUFDLEtBQUQsRUFBUSxTQUFSLEVBQW1CLE9BQW5CLEVBQTRCLFFBQTVCLEVBQXNDLE9BQXRDO0FBRWIsTUFBQTtFQUFBLG1CQUFBLEdBQXNCLEtBQUss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
