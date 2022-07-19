import type { Component } from 'solid-js';
import './about.css';

export const About: Component = () => {
	return (
		<div class="about-container">
			<section>
				<h3>About Redouble</h3>
				<p>
					Redouble are a software consultancy who specialise in creating rich web applications
					for managing complex data models using the latest technologies. We have a wide range
					of experience developing on multiple platforms including HTML5, JavaScript, .NET, JVM and C/C++.
					We can provide:
				</p>
					<ul>
						<li>Software development</li>
						<li>Training for team members on new technologies</li>
						<li>Software architecture design</li>
						<li>High-level project estimation</li>
						<li>Technology selection advice</li>
					</ul>
				<p>
					For more information or to get in touch, please email us at <a href="mailto:redoublesoftware@outlook.com">redoublesoftware@outlook.com</a>
				</p>
			</section>
			<section>
				<h3>About this application</h3>
				<p>
					The application you are using is an isomorphic application, written in ES6 using ReactJS and the Flux architecture via Redux.
					It is built using WebPack, React-Hot-Loader and Babel, runs on NodeJS and is and hosted on GitHub <a href="https://github.com/frankwallis/redouble">here</a>.<br />
					The card-play logic is handled by a C/C++ library called <a href="https://github.com/dds-bridge/dds">DDS</a> via a custom written <a href="https://github.com/frankwallis/dds-node-adapter">adapter</a> which
					uses the NodeJS native API.<br />
					The application has also been ported to <a href="https://github.com/frankwallis/redouble/tree/angular2">Angular2</a>.<br />
					It is a work-in-progress, so please excuse any strange behaviours, or send a <a href="https://github.com/frankwallis/redouble/">pull request</a>
				</p>
				<p>
					Special thanks to the good people at BrowserStack for providing cross-browser integration test support.
				</p>
			</section>
			<section>
				<h3>Roadmap</h3>
				<ul>
					<li>Futher implement the bidding strategy</li>
					<li>Convert to Reason ML <a href="https://github.com/frankwallis/redouble/tree/reason">(in-progress)</a></li>
					<li>UI Improvements (Sounds/Animations/Accessibility/Responsivity)</li>
					<li>Add Integration Tests</li>
					<li>React Native</li>
				</ul>
			</section>
		</div>
	);
}

