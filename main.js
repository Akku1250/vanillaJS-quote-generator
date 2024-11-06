const quote = document.querySelector('.quote');
const author = document.querySelector('.person-name');
const newQuoteBtn = document.querySelector('.new-quote-btn');

async function getInspriationalQuote() {
  const url = 'https://api.api-ninjas.com/v1/quotes?category=inspirational';
  const APIKEY = import.meta.env.VITE_API_KEY;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': `${APIKEY}`,
      },
    });

    if (!res.ok) {
      throw new Error('Unable to fetch the Quote');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return null;
  }
}

async function getNewQuote() {
  const data = await getInspriationalQuote();
  let newQuote = `"I do the very best I know how - the very best I can; and I mean to keep on doing so until the end."`;

  let newAuthor = 'Abraham Lincoln';

  if (data) {
    newQuote = `"${data[0].quote}"`;
    newAuthor = data[0].author;
  }

  quote.innerText = newQuote;
  author.innerText = newAuthor;
}

newQuoteBtn.addEventListener('click', getNewQuote);
