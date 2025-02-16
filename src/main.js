import { createApp } from "vue";
import App from "./App.vue";
import "./main.css";
// Export the component as a library
export default App;

// Optionally, you can also provide a way to mount the widget to a specific element
window.renderMyWidget = function (elementId, props) {
	const app = createApp(App, props);
	app.mount(`#${elementId}`);
};
