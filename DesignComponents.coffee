
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


pushParent = (layer, direction) ->
	layer.pushValues =
		marginBottom: layer.parent.height - layer.maxY
		marginRight: layer.parent.width - layer.maxX

	if direction == "down"
		layer.onChange "y", ->
			@parent.height = layer.maxY + @pushValues.marginBottom
		layer.onChange "height", ->
			@parent.height = layer.maxY + @pushValues.marginBottom

buildConstraintsProtos = (constructorName) ->

	constructorName = eval constructorName
	
	constructorName::setConstraints = (options={}, origin) ->
		@constraintValues =
			top: if typeof options?.top == "object" then null else if options?.top? && typeof options.top == "number" then options.top else origin?.constraintValues?.top || null
			left: if typeof options?.left == "object" then null else if options?.left? && typeof options.top == "number" then options.top else origin?.constraintValues?.left || null
			bottom: if typeof options?.bottom == "object" then null else if options?.pushDown then null else if options?.bottom? && typeof options.bottom == "number" then options.bottom else origin?.constraintValues?.bottom || null
			right: if typeof options?.right == "object" then null else if options?.pushRight then null else if options?.right? && typeof options.right == "number" then options.right else origin?.constraintValues?.right || null
			width: @width
			height: @height
			widthFactor: options?.scaleX || options?.widthFactor || null
			heightFactor: options?.scaleY ||options?.heightFactor || null
			centerAnchorX: options?.centerX || options?.centerAnchorX || null
			centerAnchorY: options?.centerY || options?.centerAnchorY || null
			aspectRatioLocked: if options?.aspectRatioLocked? then options.aspectRatioLocked else if origin?.constraintValues?.aspectRatioLocked? then origin.constraintValues.aspectRatioLocked else false

		if options.pushDown?
			@constraintValues.bottom = null
			pushParent @, "down"
		if options.pushRight?
			@constraintValues.right = null
			pushParent @, "right"

		constraints = @constraintValues
		textLayerAutoSize = typeof @ == TextLayer && @autoSize

		@onChange "y", ->
			@constraintValues = constraints
		@onChange "x", ->
			@constraintValues = constraints
		@onChange "height", ->
			@constraintValues = constraints
		@onChange "width", ->
			@constraintValues = constraints

		@applyConstraints()

	constructorName::applyConstraints = ->

		return if !@constraintValues

		values = @constraintValues

		if !@parent then parent = Screen else parent = @parent

		aspectRatio = @width / @height

		# position
		if values.top? && typeof values.top != "object"
			@y = values.top
		else if values.top == null && values.topRef?.layer?
			@y = values.topRef.layer[values.topRef.align] + values.topRef.value

		if values.left? && typeof values.left != "object"
			@x = values.left
		else if values.left == null && values.leftRef?.layer?
			@x = values.leftRef.layer[values.leftRef.align] + values.leftRef.value

		# size
		if values.left? && values.right?
			@width = parent.width - @x - values.right
			if values.aspectRatioLocked
				@height = @width / aspectRatio
		if values.top? && values.bottom?
			@height = parent.height - @y - values.bottom
			if values.aspectRatioLocked
				@width = @height * aspectRatio

		if values.widthFactor?
			@width = parent.width * values.widthFactor
		if values.heightFactor?
			@height = parent.height * values.heightFactor

		# max position
		if values.right? 
			@maxX = parent.width - values.right
		else if values.right == null && values.rightRef?.layer?
			@maxX = values.rightRef.layer[values.rightRef.align] - values.rightRef.value
		if values.bottom?
			@maxY = parent.height - values.bottom
		else if values.bottom == null && values.bottomRef?.layer?
			@maxY = values.bottomRef.layer[values.bottomRef.align] - values.bottomRef.value

		# center position
		if !values.left? && !values.right? && values.centerAnchorX?
			@midX = parent.width * values.centerAnchorX
		if !values.top? && !values.bottom? && values.centerAnchorY?
			@midY = parent.height * values.centerAnchorY

		@constraintValues = values


layerTypes = ["Layer", "TextLayer", "ScrollComponent", "PageComponent", "SliderComponent", "RangeSliderComponent", "SVGLayer", "BackgroundLayer", "SVGPath", "SVGGroup"]
for type in layerTypes
	buildConstraintsProtos(type)

Object.defineProperty(Layer.prototype, "constraints", {
	get: -> return @constraintValues
	set: (value) ->
		@_constraints = value
		@emit "change:constraints", value
		@setConstraints value
})

for component in customComponents
	name = component.name.replace "Custom_", ""

	do (component, name) ->

		class exports[name] extends Layer
			constructor: (@options={}) ->
				super @options
				@props = Object.assign component.props, {parent: @options.parent || null}

				if @options.constraints?
					@constraints = @options.constraints
				
				@props = @options

				@addChildren()
				@assignChildren()
				@setDescendantProps()
				@setDescendantConstraints()

				@stateComponents = Layer.selectAll "*State_#{name}*"
				@addStates()

				if @options.state?
					@animateState @options.state, false

			addChildren: ->
				newParent = component.copy()
				for child in newParent.children
					if child instanceof SVGPath or child instanceof SVGGroup
						Utils.throwInStudioOrWarnInProduction "SVG '#{child.name}' in  'Custom_#{name}' must be wrapped in a Frame in order to create a Design Component Symbol"
					else
						child.parent = @
						if child instanceof TextLayer && component.selectChild(child.name)?
							child.autoSize = true
				newParent.destroy()

			assignChildren: ->
				for descendant in @descendants
					@[descendant.name] = descendant

			setDescendantProps: ->
				for descendant in @descendants
					do (descendant) =>
						if @options[descendant.name]
							@[descendant.name].constraints = @options[descendant.name].constraints || undefined
							@[descendant.name].props = @options[descendant.name]

			setDescendantConstraints: ->
				for descendant in @descendants
					decName = descendant.name
					origin = component.selectChild decName
					descendant.setConstraints(
						@options[decName]?.constraints || {},
						origin
					)

			addStates: ->
				@customStates =
					array: []

				for state in @stateComponents
					do (state) =>
						stateIndex = state.name.indexOf "State"
						if stateIndex > 0
							stateName = state.name.slice 0, stateIndex-1
						else
							stateName = state.name.split("State_#{name}_")[1]

						@customStates[stateName] = {}
						@customStates.array.push stateName

						addProps = (layer, origin) ->
							stateProps = {}
							for prop in stateChangeProps
								stateProps[prop] = origin[prop]
							layer.states[stateName] = stateProps

						addProps @, state

						for descendant in state.descendants
							do (descendant) =>
								addProps @[descendant.name], descendant

				@addStateEvents()

			addStateEvents: ->
				events = []

				for state in @stateComponents
					if state.name.includes "_State_#{name}"
						stateName = state.name.split("_State_#{name}")[0]
						eventName = state.name.split("_State_#{name}")[1]
					else
						eventName = state.name.replace "State_#{name}_", ""
						stateName = eventName

					if eventName.includes "_Animate"
						animate = true
						eventName = eventName.split("_Animate")[0]
					else animate = false
					
					eventName = eventName.replace "_", ""

					@customStates[stateName].animate = animate

					unless events.includes eventName then events.push eventName

				for eventName in events

					do (eventName) =>

						if Events[eventName]? && @customStates.array.includes eventName

							@on Events[eventName], (event, layer) ->

								animateBool = @customStates[eventName].animate
								@stateSwitch(eventName, {animate: animateBool})
								@animateChildren()

						else if Events[eventName]?

							@on Events[eventName], ->
								currentIndex = @customStates.array.indexOf(@states.current.name)
								nextIndex = currentIndex + 1
								if nextIndex == @customStates.array.length then nextIndex = 0
								animateBool = @customStates[@customStates.array[nextIndex]].animate
								nextState = @customStates.array[nextIndex]
								
								@stateSwitch(nextState, {animate: animateBool})
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









