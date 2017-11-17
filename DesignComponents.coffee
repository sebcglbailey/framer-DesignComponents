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
				
				@stateComponents = Layer.selectAll "*State_#{name}*"
				@addStates()

				@originalProps = @props

				@setConstraints @options.constraints, component

				@props = @options

				@setConstraints()

				if @options.state?
					# state = Layer.select "#{@options.state}_State_#{name}*"
					@animateState @options.state, false


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

					@[layer.name] = layer

					if @options[layer.name]?.constraints?
						layer.setConstraints @options[layer.name].constraints, child
					else
						layer.setConstraints {}, child

					if child.children? && child.children.length > 0
						@addChildren layer, child


			addStates: () ->

				@customStates =
					array: []

				for state in @stateComponents

					do (state) =>

						stateIndex = state.name.indexOf("State")
						if stateIndex > 0
							stateName = state.name.slice 0, stateIndex-1
						else
							stateName = state.name.split("State_#{name}_")[1]

						@customStates[stateName] = {}
						@customStates.array.push stateName

						stateProps = {}

						for prop in stateChangeProps
							stateProps[prop] = state[prop]

						@states[stateName] = stateProps

						for dec in state.descendants
							do (dec) =>
								thisStateProps = {}
								for prop in stateChangeProps
									do (prop) =>
										thisStateProps[prop] = dec[prop]
								@[dec.name].states[stateName] = thisStateProps

				@addStateEvents()

			addStateEvents: () ->

				events = []

				for state in @stateComponents

					do (state) =>

						if state.name.includes "State_#{name}_"

							if state.name.includes "_State_#{name}_"
								stateName = state.name.split("_State_#{name}_")[0]
								eventName = state.name.split("_State_#{name}_")[1]
							else
								eventName = state.name.replace "State_#{name}_", ""
								stateName = eventName

							if eventName.includes "_Animate" || eventName.includes "_true" || eventName.includes "_True"
								animate = true
								eventName = eventName.split("_")[0]
							else animate = false

							@customStates[stateName].animate = animate

							unless events.includes eventName then events.push eventName

				for eventName in events

					do (eventName) =>

						if Events[eventName]? && @customStates.array.includes eventName

							@on Events[eventName], (event, layer) ->

								animate = @customStates[eventName].animate
								@stateSwitch(eventName, {animate: animate})
								@animateChildren()

						else if Events[eventName]?

							@on Events[eventName], ->
								currentIndex = @customStates.array.indexOf(@states.current.name)
								nextIndex = currentIndex + 1
								if nextIndex == @customStates.array.length then nextIndex = 0
								animate = @customStates[@customStates.array[nextIndex]].animate
								nextState = @customStates.array[nextIndex]
								
								@stateSwitch(nextState, {animate: animate})
								@animateChildren()

			animateChildren: (stateName, animate, options={}) ->
				unless stateName? then stateName = @states.current.name
				unless animate? then animate = @customStates[stateName].animate
				if !animate then options.time = 0
				for dec in @descendants
					do (dec) =>
						dec.stateSwitch(stateName, {animate: animate, options: options})

			animateState: (state, animate, options={}) ->

				if !state? || !@customStates?[state]? then return
				if !animate? && @customStates?[state]? then animate = @customStates[state].animate else if animate? then animate = animate else animate = false
				if !animate then options.time = 0

				@stateSwitch(state, {animate: animate, options: options})
				@animateChildren(state, animate, options)

			@define "constraints",
				get: -> @options.constraints
				set: (value) ->
					@options.constraints = value
					@emit("change:constraints", @options.constraints)
					@setConstraints value

			@define "state",
				get: -> @options.state
				set: (value) ->
					@options.state = value
					@emit("change:state", @options.state)
					@animateState value



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









