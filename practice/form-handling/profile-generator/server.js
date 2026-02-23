import { requestHandler } from "./app.js";

const main = () => {
  Deno.serve({port:5500},requestHandler)
}

main()