export const requestHandler = (req) => {
  const url = new URL(req.url);
  req.pathname = url.pathname;

  logRequest(req);

  if (url.pathname === "/") {
    return serveHomepage(req);
  }

  if(url.pathname === "/success") {
    return serveSuccessPage(req);
  }

  if(url.pathname === "/birthday") {
    return wishBirthday(req, url)
  }
  
  if(url.pathname === "/greet" && req.method === "POST") {
    return serveGreeting(req);
  }

  return notFoundPage();
};

const logRequest = (req) => {
  console.log(`${req.method} ${req.pathname}`);
};

const serveHomepage = async (_req) => {
  const homepage = await Deno.readTextFile("./public/html/index.html");

  return new Response(homepage, {
    headers: {
      "content-type": "text/html",
    },
  });
};

const serveGreeting = async(req) => {
  const body = await req.text();
  const searchParams = new URLSearchParams(body);

  console.log(Object.fromEntries(searchParams.entries()));

  if(searchParams.get("username") === "priyanshu") {
    return redirectToBirthdaypage(searchParams.get("username"));
  }

  return new Response(null, {
    status: 303,
    headers: {
      location: "/success"
    }
  });
}

const serveSuccessPage = async(req) => {
  const successPage = await Deno.readTextFile("./public/html/success.html");

  return new Response(successPage, {
    headers: {
      "content-type": "text/html",
    },
  });
}

const redirectToBirthdaypage = (name) => {
  return new Response(null, {
    status: 303,
    headers: {
      location: `/birthday?name=${name}`
    }
  })
}

const notFoundPage = (_req) => {
  return new Response("<h1>NOT FOUND</h1>", { status: 404 });
};

const wishBirthday = (req, url) => {
  const name = new URLSearchParams(url.search).get("name");
  return new Response(`<h1>Happy Birthday ${name}</h1>`, {
    headers: {
      "content-type": "text/html"
    }
  })
}