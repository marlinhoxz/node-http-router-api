export async function customRequest(req) {
  const url = new URL(req.url, "http://localhost");
  req.query = url.searchParams;
  req.pathname = url.pathname;
  const chunks = [];

  for await (const chunck of req) {
    chunks.push(chunck);
  }

  const body = Buffer.concat(chunks).toString("utf-8");
  const header = req.headers["content-type"];

  if (header === "application/json") {
    req.body = JSON.parse(body);
  } else {
    req.body = body;
  }

  return req;
}
