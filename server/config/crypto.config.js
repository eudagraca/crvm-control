export const hash = (value) =>
  crypto.createHash("sha256").update(value).digest("base64");

export const hash_compare = (first_item, second_item) =>
  Object.is(first_item, second_item);
