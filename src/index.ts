import { appendFileSync, writeFileSync } from "fs";

async function run(props: { type: string; id: string }) {
  const data = await fetch(
    `https://apic-desktop.musixmatch.com/ws/1.1/token.get?${new URLSearchParams({
    app_id: props.id,
  })}`,
    {
      headers: {
        Cookie: "x-mxm-user-id=",
        authority: "apic-desktop.musixmatch.com",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0",
      },
    }
  ).then((res) => res.json())

  console.log(data);

  if (data.message.header.status_code == 200) {
    const token = data.message.body.user_token ?? "";

    if (
      token !== "" &&
      token !== "UpgradeOnlyUpgradeOnlyUpgradeOnlyUpgradeOnly"
    ) {
      console.log(`valid token`, token);

      writeFileSync(`out/${props.type}-token.txt`, token);
      appendFileSync(`out/${props.type}-tokens.txt`, `\n${token}`);
    }
  }
}

const x = Math.floor(Math.random() * 2) == 0;

if (x) {
  run({
    type: "desktop",
    id: "web-desktop-app-v1.0",
  });
} else {
  run({
    type: "mobile",
    id: "mac-ios-ipad-v1.0",
  });
}
