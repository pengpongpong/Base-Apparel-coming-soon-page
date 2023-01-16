import path from "path";
import fs from "fs";

function buildPath() {
  return path.join(process.cwd(), "data", "emails.json");
}

function extractData(filepath) {
  const jsonData = fs.readFileSync(filepath);
  const data = JSON.parse(jsonData);
  return data;
}

export default function handler(req, res) {
  const { method } = req;

  const filepath = buildPath();
  const { email_registration } = extractData(filepath);

  if (method === "POST") {
    const { emailValue } = req.body;

    if (!emailValue || !emailValue.includes("@")) {
      res.json({
        message: "Please provide a valid email",
      });
      return;
    } else {
      const emailCheck = email_registration.indexOf(emailValue);

      if (emailCheck !== -1) {
        res.json({
          message: "This email has already been registered",
        });
      } else {
        email_registration.push(emailValue);
        fs.writeFileSync(
          filepath,
          JSON.stringify({
            email_registration: email_registration,
          })
        );
      }

      res.status(200).json({
        message: "You have been successfully subscribed",
      });
    }
  }
}
