/* eslint-disable no-await-in-loop */
import { endpoint } from './consts';

let pingCloudFunction = true;

export function disableAwakener() {
  pingCloudFunction = false;
}

export async function enableAwakener() {
  // eslint-disable-next-line no-unmodified-loop-condition
  while (pingCloudFunction) {
    // Send GET request to endpoint
    const resp = await fetch(endpoint);
    if (resp.status !== 204) {
      console.error(
        `unexpected value returned to the awakener by endpoint: ${resp.status}: ${
          resp.statusText
        }\n -> Body: ${await resp.text()}`
      );
      return;
    }

    // Sleep 30s
    await new Promise((resolve) => setTimeout(resolve, 30 * 1000));
  }
}
