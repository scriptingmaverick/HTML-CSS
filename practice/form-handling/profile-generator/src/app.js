import { extname } from "jsr:@std/path";

const BASEURL = "./public/";
const CONTENT_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".png": "image/png",
};

export const requestHandler = (request) => {
  const url = new URL(request.url);
  const path = url.pathname.replace("/", "") || "index.html";
  console.log({ prev: url.pathname, new: path, method: request.method });
  return serve(path);
};

const getDataAndHeaders = async (path) => {
  const contentType = CONTENT_TYPES[extname(path)];
  const data = await Deno.readFile(BASEURL + path);

  const headers = new Headers();
  headers.append("content-type", contentType);

  return [data, headers];
};

export const serve = async (path) => {
  try {
    const [data, headers] = await getDataAndHeaders(path);

    return new Response(data, { headers });
  } catch {
    const [data, headers] = await getDataAndHeaders("not-found.html");

    return new Response(data, {
      status: 404,
      headers,
    });
  }
};
