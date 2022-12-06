const crypto = require('crypto');

const email = "hello@gaunt.dev ".trim().toLowerCase();
const hash = crypto.createHash('md5').update(email).digest("hex");

let data = {
	username: "gauntface", // No leading @ here
	homeLabel: "gaunt.dev",
	homeUrl: "https://www.gaunt.dev/twitter/",
};

data.avatar = `https://v1.indieweb-avatar.11ty.dev/${encodeURIComponent(data.homeUrl)}/`;

module.exports = data;