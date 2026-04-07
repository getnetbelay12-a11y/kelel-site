import crypto from "node:crypto";

function createSecret(bytes = 32) {
  return crypto.randomBytes(bytes).toString("base64url");
}

const sessionSecret = createSecret(32);
const reminderSecret = createSecret(32);

console.log("Generated production secrets:\n");
console.log(`INBOX_SESSION_SECRET=${sessionSecret}`);
console.log(`REMINDER_DIGEST_SECRET=${reminderSecret}`);
console.log("\nUse these in your production environment settings or .env file.");
