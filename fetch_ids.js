// fetch script

async function search(q) {
  const res = await globalThis.fetch('https://lite.duckduckgo.com/lite/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'q=' + encodeURIComponent(q)
  });
  const html = await res.text();
  const matches = html.match(/v=([a-zA-Z0-9_-]{11})/g) || [];
  console.log(q, [...new Set(matches)]);
}

(async () => {
  await search('youtube "The Notebook" Nicholas Sparks audiobook');
  await search('youtube "Pride and Prejudice" Jane Austen audiobook');
  await search('youtube "Normal People" Sally Rooney audiobook');
  await search('youtube "The Song of Achilles" Madeline Miller audiobook');
  await search('youtube "Seven Husbands of Evelyn Hugo" audiobook');
})();
