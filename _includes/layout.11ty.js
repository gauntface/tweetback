const dataSource = require("../src/DataSource");
const metadata = require("../_data/metadata.js");

module.exports = async function(data) {
	let titleTweetNumberStr = "";
	if(data.page.fileSlug === "tweet-pages") {
		titleTweetNumberStr = `—№ ${this.renderNumber(data.pagination.hrefs.length - data.pagination.pageNumber)}`;
	} else if(data.page.fileSlug === "newest") {
		titleTweetNumberStr = `—№ ${this.renderNumber((await dataSource.getAllTweets()).length)}`;
	}

	let navHtml = "";
	if(data.page.fileSlug === "tweet-pages" || data.page.fileSlug === "newest") {
		let newestHref = "/newest/";
		let previousHref = data.pagination.previousPageHref;
		let nextHref = data.pagination.nextPageHref;

		if(data.page.fileSlug === "newest") {
			newestHref = "";
			previousHref = "";
			nextHref = "/" + (await dataSource.getAllTweets()).sort((a, b) => b.date - a.date).slice(1, 2).map(tweet => tweet.id_str).join("") + "/";
		} else if(data.page.fileSlug === "tweet-pages" && data.pagination.firstPageHref === data.page.url) {
			newestHref = "";
		}

		navHtml = `<ul class="tweets-nav">
			<li>${newestHref ? `<a href="${newestHref}">` : ""}⇤ Newest<span class="sr-only"> Tweet</span>${newestHref ? `</a>` : ""}</li>
			<li>${previousHref ? `<a href="${previousHref}">` : ""}⇠ Newer<span class="sr-only"> Tweet</span>${previousHref ? `</a>` : ""}</li>
			<li>${nextHref ? `<a href="${nextHref}">` : ""}Older<span class="sr-only"> Tweet</span> ⇢${nextHref ? `</a>` : ""}</li>
		</ul>`;
	}

	return `---
title: ${data.metadata.username}'s Twitter Archive${titleTweetNumberStr}
description: A read-only indieweb self-hosted archive of${ data.pagination && data.pagination.hrefs && data.pagination.hrefs.length ? ` all ${data.pagination.hrefs.length}` : ""} of ${data.metadata.username}'s tweets.
---
${data.content}`;
};