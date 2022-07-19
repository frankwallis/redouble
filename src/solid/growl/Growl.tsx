import { Component, For } from 'solid-js';
import { dismissGrowl, growls } from './growlStore';
import './Growl.css';

/**
 * Component for displaying notifications from the
 * NotificationStore as growls
 */
export const Growl: Component = () => {
	return (
		<ol class="growl-list">
			<For each={growls}>
				{(growl) => (
					<li class={"growl-item growl-" + growl.type}
						onClick={() => dismissGrowl(growl.id)}>
						<h3 class="growl-title">{growl.title}</h3>
						<p class="growl-message">{growl.message}</p>
					</li>
				)}
			</For>
		</ol>
	);
}
