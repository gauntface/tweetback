const Twitter = require("./src/twitter");
const dataSource = require("./src/DataSource");
const metadata = require("./_data/metadata.js");

class Popular extends Twitter {
	data() {
		return {
			layout: metadata.layout,
		};
	}

	async render(data) {
		let tweets = await dataSource.getAllTweets();
		let tweetHtml = await Promise.all(this.getMostPopularTweets(tweets).map(tweet => this.renderTweet(tweet, {showPopularity: true, showSentiment: true})));

		return `<h2>Popular Tweets</h2>
		<p>A list of popular tweets by retweets and favorites.</p>
		<ol class="tweets tweets-linear-list">
			${tweetHtml.join("")}
		</ol>`;
	}
}

module.exports = Popular;
