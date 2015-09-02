import React from 'react'
let utils = require('react/addons').addons.TestUtils
import App from '../src/app'

let render = (element) => {
  let renderer = utils.createRenderer()
  renderer.render(element)
  return renderer.getRenderOutput()
}

describe("Component", () => {

  let app

  beforeEach(() => {
    app = new App()
  })

  describe("actions", () => {

    let Widget

    beforeEach(() => {
      Widget = class Widget extends app.Component {
        render () { return <div/> }
      }
    })

    it("calls an action", () => {
      spyOn(app.actions, 'do')
      let widget = new Widget()
      widget.action('jump', {height: 7})
      expect(app.actions.do).toHaveBeenCalledWith('jump', {height: 7})
    })
  })

  describe("rendering", () => {

    let Widget

    beforeEach(() => {
      Widget = class Widget extends app.Component {
        stateFromTree () {
          return {
            theFruit: 'fruit'
          }
        }

        render () { return <div>{this.state.theFruit}</div> }
      }
    })

    it("renders from the tree", () => {
      app.tree.at().set({fruit: 'orange', animal: 'sheep'}).commit()
      let widget = new Widget()
      let result = render(<Widget/>)
      expect(result.props.children).toEqual("orange")
    })
  })

})