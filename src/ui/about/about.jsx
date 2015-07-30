/* @flow */

import React from 'react';

if (process.env.__BROWSER__) {
	require('./about.css');
}

/**
 * Top-Level view for the about page
 */
export class AboutView extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		console.log('rendering about');

		return (
			<div className="about-container">
				<section>
					<h3>About Tower</h3>
					<p>
						Welcome to Tower!
					</p>
					<p>
						The application you are using is developed in ES6 using ReactJS and the Flux architecture via Redux. It is built using WebPack, React-Hot-Loader and Babel.
						I have also ported this application to <a href="https://github.com/frankwallis/tower/tree/angular2">Angular2</a>, and combined
						Angular2 Zones with ReactJS to create the world's first <a href="https://github.com/frankwallis/react-zones">react zones</a> application!
						It is a work in progress, so please excuse any strange behaviours, or send a <a href="https://github.com/frankwallis/tower/">pull request</a>
					</p>
				</section>
				<section>
					<h3>Roadmap</h3>
					<ul>
						<li>Implement the playing strategies based on <a href="http://www.aifactory.co.uk/newsletter/2011_02_mcts_static.htm">Information Set Monte Carlo Tree Search</a> algorithm</li>
						<li>Add server API for playing strategies and data storage</li>
						<li>UI Improvements (Sounds/Animations/Accessibility/Responsivity)</li>
						<li>Add Integration Tests</li>
						<li>React Native</li>
					</ul>
				</section>
				<section>
					<h3>About Me</h3>
					<p>I am a software developer based in London.</p>
				</section>
			</div>
		);
	}
}
