/*
    $server = 'imap.titan.email';
    $port = '993';
    $username = "cuenca-writers-collective-rsvp@castoware.com";
    $password = ",3sBwo?7^qab>oE40P}J";
*/

const { ImapFlow } = require("imapflow");
const simpleParser = require("mailparser").simpleParser;

const settings = { y: "Yes", n: "No", t: "Tentative" };

const client = new ImapFlow({
  host: "imap.titan.email",
  port: 993,
  secure: true,
  auth: {
    user: "cuenca-writers-collective-rsvp@castoware.com",
    pass: ",3sBwo?7^qab>oE40P}J",
  },
  emitLogs: false,
  logger: false,
});

const main = async () => {
  const mails = [];

  // Wait until client connects and authorizes
  await client.connect();

  // Select and lock a mailbox. Throws if mailbox does not exist
  let lock = await client.getMailboxLock("INBOX");

  try {
    for await (let message of client.fetch("1:*", {
      source: true,
      envelope: true,
    })) {
      const src = await simpleParser(message.source);
      const date = message.envelope.date;
      const from = message.envelope.from.shift().address;
      const body = src.text;
      let response = body.match(
        /^(?<attending>yes|no|tentative)\s*(?<reading>reading)?/i
      );

      rsvp = response ? response.groups : { attending: null, reading: null };

      mails.push({ date, from, rsvp });
    }
  } finally {
    lock.release();
  }

  // log out and close connection
  await client.logout();

  return mails;
};

module.exports = main;
