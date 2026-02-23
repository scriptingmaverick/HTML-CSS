export const requestHandler = (req) => {
  const url = new URL(req.url);

  console.log(url);
  const paths = {
    "/": servePage.bind(null,"./index.html"),
    // "/profile-card": generateProfileCard,
  };

  try {
    return paths[url.pathname]();
  } catch {
    return servePage("./not-found.html");
  }
};

const servePage = (path) => {
  const data = Deno.readTextFileSync(path);
  return new Response(data, { headers: { "content-type": "text/html" } });
};

// const getDataFromUser = () => {
//   return redirectToForm();
// };

// const redirectToForm = () =>
//   new Response(null, {
//     status: 303,
//     headers: {
//       location: "/",
//     },
//   });
