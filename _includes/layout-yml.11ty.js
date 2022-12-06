const dataSource = require("../src/DataSource");

module.exports = async function(data) {
	let titleTweetNumberStr = "";
	if(data.page.fileSlug === "tweet-pages") {
		titleTweetNumberStr = `—№ ${this.renderNumber(data.pagination.hrefs.length - data.pagination.pageNumber)}`;
	} else if(data.page.fileSlug === "newest") {
		titleTweetNumberStr = `—№ ${this.renderNumber((await dataSource.getAllTweets()).length)}`;
	}

	return `---
title: ${data.metadata.username}'s Twitter Archive${titleTweetNumberStr}
description: A read-only indieweb self-hosted archive of${ data.pagination && data.pagination.hrefs && data.pagination.hrefs.length ? ` all ${data.pagination.hrefs.length}` : ""} of ${data.metadata.username}'s tweets.
---
${data.content}`;
};
