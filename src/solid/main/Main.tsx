import { Component } from 'solid-js';
import { NavLink, Outlet } from "solid-app-router"
import { Growl } from '../growl/Growl';

import './Main.css';
import './Navbar.css';

export const Main: Component = () => {
	return (
		<div class="main-container">
			<nav role="navigation" class="main-navbar nav-main">
				<ul class="nav-site">
					<li>
						<NavLink activeClass="active" href="/" end>Table</NavLink>
					</li>
					<li>
						<NavLink  activeClass="active" href="/ui/settings">Settings</NavLink>
					</li>
					<li>
						<NavLink activeClass="active" href="/ui/about">About</NavLink>
					</li>
				</ul>
			</nav>
			<div class="main-content">
				<Outlet />
			</div>
			<div class="main-growl">
				<Growl />
			</div>
		</div>
	);
}
