const Twitter = require("./src/twitter");
const metadata = require("./_data/metadata.js");

class Index extends Twitter {
	data() {
		return {
			layout: metadata.layout,
      permalink: "404.html"
		};
	}

	async render(data) {
		return `
		<h2 class="tweets-primary-count">
			Tweet not found.
		</h2>
`;
	}
}

module.exports = Index;
