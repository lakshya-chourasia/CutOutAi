import { client } from "@gradio/client";
async function test() {
  try {
    const app = await client("laakshaa/bg-remover-api");
    const api_info = await app.view_api();
    console.log(api_info);
  } catch(e) {
    console.error(e);
  }
}
test();
