import { client } from "@gradio/client";
async function test() {
  try {
    const app = await client("laakshaa/bg-remover-api");
    const endpoints = app.view_api();
    console.log(JSON.stringify(endpoints, null, 2));
  } catch(e) {
    console.error(e);
  }
}
test();
