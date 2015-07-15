jest.autoMockOff()
jest.mock('../../../stores/game-store');

import {ControlBar} from "../control-bar.jsx";

import React from "react/addons";
let TestUtils = React.addons.TestUtils;

describe('Control Bar', () => {

	describe('Pause Button', () => {
	  	it('pauses automatic execution', () => {
	  		let actions = { canPause: true };
	      let bar = TestUtils.renderIntoDocument(<ControlBar actions={actions}/>);
	      let pause = TestUtils.findRenderedDOMComponentWithClass(bar, 'btn-pause');
	      expect(pause.getDOMNode().disabled).toBeFalsy();
	      expect(pause.getDOMNode().className).not.toContain("disabled");

	      TestUtils.Simulate.click(pause);
      	expect(GameActions.pause.mock.calls.length).toEqual(1);	      
	  	});

	  	it('disables pause', () => {
	  		let actions = { canPause: false };
	      let bar = TestUtils.renderIntoDocument(<ControlBar actions={actions}/>);
	      let pause = TestUtils.findRenderedDOMComponentWithClass(bar, 'btn-pause');
	      expect(pause.getDOMNode().className).toContain("disabled");
	      expect(pause.getDOMNode().disabled).toBeTruthy()
	  	});
	});

	describe('Resume Button', () => {
	  	it('resumes automatic execution', () => {
	  		let actions = { canResume: true };
	      let bar = TestUtils.renderIntoDocument(<ControlBar actions={actions}/>);
	      let resume = TestUtils.findRenderedDOMComponentWithClass(bar, 'btn-resume');
	      expect(resume.getDOMNode().disabled).toBeFalsy();
	      expect(resume.getDOMNode().className).not.toContain("disabled");

	     	TestUtils.Simulate.click(resume);
      	expect(GameActions.resume.mock.calls.length).toEqual(1);
	  	});

	  	it('is disabled when paused', () => {
	  		let actions = { canResume: false };
	      let bar = TestUtils.renderIntoDocument(<ControlBar actions={actions}/>);
	      let resume = TestUtils.findRenderedDOMComponentWithClass(bar, 'btn-resume');
	      expect(resume.getDOMNode().className).toContain("disabled");
	      expect(resume.getDOMNode().disabled).toBeTruthy();
	  	});
	});

 	describe('Back Button', () => {
	  	it('goes back and pauses', () => {
	  		let actions = { canBack: true };
	      let bar = TestUtils.renderIntoDocument(<ControlBar actions={actions}/>);
	      let back = TestUtils.findRenderedDOMComponentWithClass(bar, 'btn-back');
	      expect(back.getDOMNode().className).not.toContain("disabled");
	      expect(back.getDOMNode().disabled).toBeFalsy();

	      TestUtils.Simulate.click(back);
      	expect(GameActions.back.mock.calls.length).toEqual(1);
	  	});

	  	it('disables back', () => {
	  		let actions = { canBack: false };
	      let bar = TestUtils.renderIntoDocument(<ControlBar actions={actions}/>);
	      let back = TestUtils.findRenderedDOMComponentWithClass(bar, 'btn-back');
	      expect(back.getDOMNode().className).toContain("disabled");
	      expect(back.getDOMNode().disabled).toBeTruthy();
	  	});
	});

	describe('Forward Button', () => {
	  	it('goes forward', () => {
	  		let actions = { canForward: true };
	      let bar = TestUtils.renderIntoDocument(<ControlBar actions={actions}/>);
	      let forward = TestUtils.findRenderedDOMComponentWithClass(bar, 'btn-forward');
	      expect(forward.getDOMNode().className).not.toContain("disabled");
	      expect(forward.getDOMNode().disabled).toBeFalsy();

	      TestUtils.Simulate.click(forward);
      	expect(GameActions.forward.mock.calls.length).toEqual(1);
	  	});

	  	it('disables forward', () => {
	  		let actions = { canForward: false };
	      let bar = TestUtils.renderIntoDocument(<ControlBar actions={actions}/>);
	      let forward = TestUtils.findRenderedDOMComponentWithClass(bar, 'btn-forward');
	      expect(forward.getDOMNode().className).toContain("disabled");
	      expect(forward.getDOMNode().disabled).toBeTruthy();
	  	});
	});

	describe('Jump-Back Button', () => {
	  	it('jumps back', () => {
	  		let actions = { canJumpBack: true };
	      let bar = TestUtils.renderIntoDocument(<ControlBar actions={actions}/>);
	      let jump = TestUtils.findRenderedDOMComponentWithClass(bar, 'btn-jump-back');
	     	expect(jump.getDOMNode().className).not.toContain("disabled");
	     	expect(jump.getDOMNode().disabled).toBeFalsy();

	      TestUtils.Simulate.click(jump);
      	expect(GameActions.jumpBack.mock.calls.length).toEqual(1);
	  	});

	  	it('disables jump back', () => {
	  		let actions = { canJumpBack: false };
	      let bar = TestUtils.renderIntoDocument(<ControlBar actions={actions}/>);
	      let jump = TestUtils.findRenderedDOMComponentWithClass(bar, 'btn-jump-back');
	     	expect(jump.getDOMNode().className).toContain("disabled");
	     	expect(jump.getDOMNode().disabled).toBeTruthy();
	  	});
	});
});
