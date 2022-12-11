const Twitter = require("./src/twitter");
const dataSource = require("./src/DataSource");
const metadata = require("./_data/metadata.js");

class Recent extends Twitter {
	data() {
		return {
			layout: metadata.layout,
		};
	}

	getRecentTweets(tweets) {
		return tweets.filter(tweet => this.isOriginalPost(tweet)).sort(function(a,b) {
			return b.date - a.date;
		}).slice(0, 40);
	}

	async render(data) {
		let tweets = await dataSource.getAllTweets();
		let tweetHtml = await Promise.all(this.getRecentTweets(tweets).map(tweet => this.renderTweet(tweet, {showSentiment: true})));

		return `<h2>Most Recent 40 Tweets</h2>
		<p>Not including replies or retweets or mentions.</p>
		<ol class="tweets tweets-linear-list">
			${tweetHtml.join("")}
		</ol>`;
	}
}

module.exports = Recent;
