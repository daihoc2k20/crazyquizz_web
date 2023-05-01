export function randomList(limit: number, to: number, from: number = 0) {
  const list: number[] = [];

  while (list.length < limit) {
    let num = Math.floor(Math.random() * to) + from;
    if (!list.includes(num)) {
      list.push(num);
    }
  }

  return list;
}
