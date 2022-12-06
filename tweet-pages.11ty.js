const Twitter = require("./src/twitter");
const dataSource = require("./src/DataSource");
const metadata = require("./_data/metadata.js");

class TweetToFile extends Twitter {
	async data() {
		return {
			tweets: await dataSource.getAllTweets(),
			pagination: {
				data: "tweets",
				size: 1,
				before: (paginationData) => paginationData.sort((a, b) => b.date - a.date),
				alias: "tweet"
			},
			layout: metadata.layout,
			// permalink: false,
			permalink: data => `/${data.tweet.id_str}/`,
			hideHeaderTweetsLink: true
		};
	}

	async render(data) {
		return await this.renderTweetThread(data.tweet, { hidePermalink: true, showPopularity: true });
	}
}

module.exports = TweetToFile;
