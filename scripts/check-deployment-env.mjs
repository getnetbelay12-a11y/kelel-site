const required = [
  "INBOX_USERS",
  "INBOX_SESSION_SECRET",
];

const optionalGroups = [
  {
    name: "SMTP notifications",
    vars: [
      "SMTP_HOST",
      "SMTP_PORT",
      "SMTP_USER",
      "SMTP_PASS",
      "LEAD_NOTIFICATION_FROM",
    ],
  },
  {
    name: "Google Sheets sync",
    vars: ["GOOGLE_SHEETS_WEBHOOK_URL"],
  },
  {
    name: "Reminder digests",
    vars: ["REMINDER_DIGEST_SECRET"],
  },
];

function isSet(name) {
  return Boolean(process.env[name]?.trim());
}

function printGroup(title, lines) {
  console.log(`\n${title}`);
  for (const line of lines) {
    console.log(line);
  }
}

const missingRequired = required.filter((name) => !isSet(name));

printGroup("Required environment", required.map((name) => `${isSet(name) ? "[ok]" : "[missing]"} ${name}`));

for (const group of optionalGroups) {
  printGroup(
    group.name,
    group.vars.map((name) => `${isSet(name) ? "[ok]" : "[not set]"} ${name}`),
  );
}

if (missingRequired.length > 0) {
  console.error("\nDeployment readiness check failed.");
  console.error(`Missing required variables: ${missingRequired.join(", ")}`);
  process.exit(1);
}

console.log("\nDeployment readiness check passed for required variables.");
