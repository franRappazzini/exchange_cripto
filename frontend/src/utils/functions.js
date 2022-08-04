// https://remarkablemark.org/blog/2021/08/29/javascript-generate-sha-256-hexadecimal-hash/#browser
export async function hash(pass) {
  const utf8 = new TextEncoder().encode(pass);
  const hashBuffer = await crypto.subtle.digest("SHA-256", utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((bytes) => bytes.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}
