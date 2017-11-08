Constraints = require "Constraints"

###
------------------
CUSTOM CLASSES
------------------
###

kit = Layer.select "*UIKit*"
if kit? then kit.x = Screen.width * 1000; kit.name = ".UIKit"

for layer in Layer.selectAll "@*"
	parent = layer.parent
	name = layer.name.replace "@", ""
	parent[name] = layer

customComponents = Layer.selectAll "Custom_*"

Layer::addDesignChildren = (origin) ->
	if !origin? then origin = @
	for child in origin.selectAllChildren ("*")
		parent = child.parent
		parent[child.name] = child


stateChangeProps = [
	"width", "height",
	"opacity",
	"scaleX", "scaleY", "scaleZ", "scale",
	"skewX", "skewY", "skew",
	"rotationX", "rotationY", "rotationZ", "rotation",
	"blur",
	"brightness", "saturate", "hueRotate", "contrast", "invert", "grayscale", "sepia", "blending",
	"backgroundBlur", "backgroundBrightness", "backgroundSaturate", "backgroundHueRotate", "backgroundContrast", "backgroundInvert", "backgroundGrayscale", "backgroundSepia",
	"shadow1", "shadow2", "shadow3", "shadow4", "shadow5", "shadow6", "shadow7", "shadow8", "shadow9",
	"shadowX", "shadowY", "shadowBlur", "shadowSpread", "shadowColor", "shadowType",
	"shadows",
	"backgroundColor", "color",
	"borderRadius", "borderColor", "borderWidth", "borderStyle",
	"image", "gradient",
	"text"
]



for component in customComponents

	name = component.name.replace "Custom_", ""

	do (component, name) ->

		class exports[name] extends Layer

			constructor: (@options={}) ->

				super @options

				@props = Object.assign component.props, {parent: @options.parent}
				@parent = @options.parent ?= Screen.content

				@addChildren()
				@setChildProps()
				
				@addStateEvents()

				@originalProps = @props

				@setConstraints @options.constraints, component

				@props = @options

				@setConstraints()

				if @options.state?
					state = Layer.select "#{@options.state}_State_#{name}*"
					if state? then @changeState state


			setChildProps: (parent) ->

				for key, value of @options
					if @[key]? && @[key] instanceof Layer

						if @[key].constructor.name == "TextLayer" && @[key].autoSize != true
							@[key].props = value
							width = @[key].width
							@[key].autoSize = true
							@[key].width = width
						else
							@[key].props = value



			addChildren: (parent, origin) ->

				if !origin? then origin = component
				if !parent? then parent = @

				for child in origin.children

					layer = child.copySingle()
					layer.parent = parent

					parent[layer.name] = layer

					if @options[layer.name]?.constraints?
						layer.setConstraints @options[layer.name].constraints, child
					else
						layer.setConstraints {}, child

					if child.children? && child.children.length > 0
						@addChildren layer, child

			addStateEvents: ->

				stateComponents = Layer.selectAll "*State_#{name}_*"

				if stateComponents.length > 0

					states = {}
					eventName = ""
					@stateIndex = 0

					for state in stateComponents

						do (state) =>

							eventName = state.name.replace "State_#{name}_", ""

							if eventName.includes "_"
								eventName = eventName.split("_")[1]
								unless states[eventName]? then states[eventName] = []
								stateName = state.name.replace "_State_#{name}_#{eventName}", ""
								states[eventName].push state
							else
								if Events[eventName]?

									@on Events[eventName], (event) ->

										@changeState state

					if Object.keys(states).length > 0
						
						for key, value of states
							
							if Events[key]?

								@on Events[key], (event) ->

									@cycleStates value


			changeState: (state) ->

				for prop in stateChangeProps
					@[prop] = state[prop]

				for child in @selectAllChildren "*"

					stateChild = state.selectChild child.name

					for prop in [stateChangeProps..., "frame"]
						child[prop] = stateChild[prop]

			cycleStates: (states) ->
				@changeState states[@stateIndex]
				if @stateIndex == states.length-1
					@stateIndex = 0
				else @stateIndex++

			@define "constraints",
				get: -> @options.constraints
				set: (value) ->
					@options.constraints = value
					@emit("change:constraints", @options.constraints)
					@setConstraints value



customStates = Layer.selectAll "State_*"

for componentState in customStates

	classEventName = componentState.name.replace "State_", ""
	if classEventName.includes "_"
		className = classEventName.split("_")[0]
		eventName = classEventName.split("_")[1]
	else
		className = classEventName


###
------------------
EXISTING CLASSES
------------------
###


components = Layer.selectAll "_*"

extendSlider = (origin) ->
	class exports.SliderComponent extends SliderComponent

		constructor: (@options={}) ->
			super @options

			@knob.props =
				shadows: origin.knob.shadows
				backgroundColor: origin.knob.backgroundColor
				borderRadius: origin.knob.borderRadius
				frame: origin.knob.frame

			@fill.props =
				shadows: origin.fill.shadows
				backgroundColor: origin.fill.backgroundColor
				borderRadius: origin.fill.borderRadius
				frame: origin.fill.frame

			@props =
				shadows: origin.shadows
				backgroundColor: origin.backgroundColor
				borderRadius: origin.borderRadius
				size: origin.size

			@value = Utils.modulate origin.knob.midX, [0, origin.width], [@min, @max]


extendRangeSlider = (origin) ->
	class exports.RangeSliderComponent extends RangeSliderComponent

		constructor: (@options={}) ->
			super @options

			@minKnob.props =
				shadows: origin.minKnob.shadows
				backgroundColor: origin.minKnob.backgroundColor
				borderRadius: origin.minKnob.borderRadius
				frame: origin.minKnob.frame
			@maxKnob.props =
				shadows: origin.maxKnob.shadows
				backgroundColor: origin.maxKnob.backgroundColor
				borderRadius: origin.maxKnob.borderRadius
				frame: origin.maxKnob.frame

			@fill.props =
				shadows: origin.fill.shadows
				backgroundColor: origin.fill.backgroundColor
				borderRadius: origin.fill.borderRadius
				frame: origin.fill.frame

			@props =
				shadows: origin.shadows
				backgroundColor: origin.backgroundColor
				borderRadius: origin.borderRadius
				size: origin.size
				
			@minValue = Utils.modulate origin.minKnob.midX, [0, origin.width], [@min, @max]
			@maxValue = Utils.modulate origin.maxKnob.midX, [0, origin.width], [@min, @max]



for component in components

	type = component.name.replace "_", ""

	do (component) ->

		component.addDesignChildren()

		if type == "SliderComponent"
			extendSlider component
		else if type == "RangeSliderComponent"
			extendRangeSlider component









