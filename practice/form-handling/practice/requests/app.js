export const requestHandler = (req) => {
  const url = new URL(req.url);

  const paths = {
    "/": servePage.bind(null, "../index.html"),
    "/greet": handleGreet,
    "/sayTo": handleSay,
  };

  try {
    return paths[url.pathname](req, url);
  } catch {
    return servePage("../pages/notFoundPage.html");
  }
};

const servePage = (path) => {
  const data = Deno.readTextFileSync(path);
  return new Response(data, {
    headers: { "content-type": "text/html" },
  });
};

const handleGreet = async (req) => {
  const data = await req.text();
  const parsedData = new URLSearchParams(data);
  const fields = Object.fromEntries(parsedData.entries());

  return new Response(null, {
    status: 303,
    headers: { location: `/sayTo?name=${fields.username}` },
  });
};

const handleSay = (_req, url) => {
  const name = new URLSearchParams(url["search"]).get("name");
  return new Response(`<h1>hello ${name}</h1>`, {
    headers: { "content-type": "text/html" },
  });
};
