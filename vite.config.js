import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import replace from "@rollup/plugin-replace";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
	plugins: [
		vue(),
		replace({
			"process.env.NODE_ENV": JSON.stringify("dev"),
			preventAssignment: true,
		}),
		cssInjectedByJsPlugin(),
	],
	build: {
		sourcemap: true,
		lib: {
			entry: "src/main.js", // Adjust this path to your main entry file
			name: "ChatWidget",
			fileName: (format) => `chat-widget.${format}.js`,
			formats: ["iife"],
		},
		rollupOptions: {
			// Make sure to externalize dependencies that shouldn't be bundled
			output: {
				globals: {
					vue: "Vue",
				},
			},
		},
	},
});
