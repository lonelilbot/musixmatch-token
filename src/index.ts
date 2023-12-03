import axios from "axios";
import { appendFileSync, writeFileSync } from "fs";

async function run() {
  const { data } = await axios.get(
    `https://apic-desktop.musixmatch.com/ws/1.1/token.get`,
    {
      params: {
        app_id: "web-desktop-app-v1.0",
        t: random(),
      },
      headers: {
        Cookie: "x-mxm-user-id=",
        authority: "apic-desktop.musixmatch.com",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0",
      },
      maxRedirects: 50,
    }
  );

  console.log(data);

  if (data.message.header.status_code == 200) {
    const token = data.message.body.user_token ?? "";

    if (
      token !== "" &&
      token !== "UpgradeOnlyUpgradeOnlyUpgradeOnlyUpgradeOnly"
    ) {
      console.log(`valid token`, token);

      writeFileSync("token.txt", token);
      appendFileSync("tokens.txt", `\n${token}`);
    }
  }
}

run();

function random() {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .slice(2, 10);
}
