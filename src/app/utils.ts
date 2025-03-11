export class Utils {
  constructor(selector) {
    this.elements = Utils.getSelector(selector)
    this.element = this.get(0)
    return this
  }

  on(events, listener) {
    events.split(" ").forEach(eventName => {
      this.each(el => {
        const tNEventName = Utils.setEventName(el, eventName)
        if (!Array.isArray(Utils.eventListeners[tNEventName])) {
          Utils.eventListeners[tNEventName] = []
        }
        Utils.eventListeners[tNEventName].push(listener)

        // https://github.com/microsoft/TypeScript/issues/28357
        if (el) {
          el.addEventListener(eventName.split(".")[0], listener)
        }
      })
    })

    return this
  }
  removeClass(classNames) {
    this.each(el => {
      // IE doesn't support multiple arguments
      classNames.split(" ").forEach(className => {
        el.classList.remove(className)
      })
    })
    return this
  }
  addClass(classNames = "") {
    this.each(el => {
      // IE doesn't support multiple arguments
      classNames.split(" ").forEach(className => {
        el.classList.add(className)
      })
    })
    return this
  }
  height() {
    if (!this.element) {
      return 0
    }
    const style = window.getComputedStyle(this.element, null)
    return parseFloat(style.height.replace("px", ""))
  }
  each(func) {
    if (!this.elements.length) {
      return this
    }
    this.elements.forEach((el, index) => {
      func.call(el, el, index)
    })
    return this
  }
  css(css, value) {
    if (value !== undefined) {
      this.each(el => {
        Utils.setCss(el, css, value)
      })
      return this
    }
    if (typeof css === "object") {
      for (const property in css) {
        if (Object.prototype.hasOwnProperty.call(css, property)) {
          this.each(el => {
            Utils.setCss(el, property, css[property])
          })
        }
      }
      return this
    }
    const cssProp = Utils.camelCase(css)
    const property = Utils.styleSupport(cssProp)
    return getComputedStyle(this.element)[property]
  }
  outerHeight(margin) {
    if (!this.element) {
      return 0
    }
    if (margin !== undefined) {
      let height = this.element.offsetHeight
      const style = getComputedStyle(this.element)

      height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10)
      return height
    }
    return this.element.offsetHeight
  }
  trigger(event, detail) {
    if (!this.element) {
      return this
    }
    const eventName = event.split(".")[0]
    const isNativeEvent = typeof document.body["on" + eventName] !== "undefined"
    if (isNativeEvent) {
      this.each(el => {
        el.dispatchEvent(new Event(eventName))
      })
      return this
    }
    const customEvent = new CustomEvent(eventName, {
      detail: detail || null,
    })
    this.each(el => {
      el.dispatchEvent(customEvent)
    })
    return this
  }
  static getSelector(selector, context) {
    if (selector && typeof selector !== "string") {
      if (selector.length !== undefined) {
        return selector
      }
      return [selector]
    }
    context = context || document

    // For performance reasons, use getElementById
    // eslint-disable-next-line no-control-regex
    const idRegex = /^#(?:[\w-]|\\.|[^\x00-\xa0])*$/
    if (idRegex.test(selector)) {
      const el = document.getElementById(selector.substring(1))
      return el ? [el] : []
    }
    return [].slice.call(context.querySelectorAll(selector) || [])
  }
  get(index) {
    if (index !== undefined) {
      return this.elements[index]
    }
    return this.elements
  }
  static setEventName(el, eventName) {
    // Need to verify https://stackoverflow.com/questions/1915341/whats-wrong-with-adding-properties-to-dom-element-objects
    const elementUUId = el.eventEmitterUUID
    const uuid = elementUUId || Utils.generateUUID()
    // eslint-disable-next-line no-param-reassign
    el.eventEmitterUUID = uuid
    return Utils.getEventName(eventName, uuid)
  }
  static setCss(el, prop, value) {
    // prettier-ignore
    let cssProperty = Utils.camelCase(prop);
    cssProperty = Utils.styleSupport(cssProperty)
    el.style[cssProperty] = value
  }
  static camelCase(text) {
    return text.replace(/-([a-z])/gi, (s, group1) => group1.toUpperCase())
  }
  static styleSupport(prop) {
    let vendorProp
    let supportedProp
    const capProp = prop.charAt(0).toUpperCase() + prop.slice(1)
    const prefixes = ["Moz", "Webkit", "O", "ms"]
    let div = document.createElement("div")

    if (prop in div.style) {
      supportedProp = prop
    } else {
      for (let i = 0; i < prefixes.length; i++) {
        vendorProp = prefixes[i] + capProp
        if (vendorProp in div.style) {
          supportedProp = vendorProp
          break
        }
      }
    }

    div = null
    return supportedProp
  }
  static generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
      // eslint-disable-next-line no-bitwise
      const r = (Math.random() * 16) | 0
      // eslint-disable-next-line no-bitwise
      const v = c === "x" ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }
  static getEventName(eventName, uuid) {
    return eventName + "__EVENT_EMITTER__" + uuid
  }
}

Utils.eventListeners = {}

export default function $utils(selector) {
  return new Utils(selector)
}
