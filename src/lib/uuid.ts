export default function uuid() {
  const temp_url = URL.createObjectURL(new Blob());
  const split_url = temp_url.toString().split("/");
  URL.revokeObjectURL(temp_url);
  return split_url[split_url.length - 1];
}
