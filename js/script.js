const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const removeLoadingSpinner = () => {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
};

// Get Quote From API
const getQuote = async () => {
  showLoadingSpinner();
  // We need to use a Proxy URL to make our API call in order to avoid a CORS error
  const proxyUrl = "https://jacinto-cors-proxy.herokuapp.com/";
  const apiUrl =
    "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    // Check if Author field is blank and replace it with 'Unknown'
    data.quoteAuthor === ""
      ? (authorText.innerText = "Unknown")
      : (authorText.innerText = data.quoteAuthor);

    // Dynamically reduce font size for long quotes
    data.quoteText.length > 120
      ? quoteText.classList.add("long-quote")
      : quoteText.classList.remove("long-quote");

    // populate quote
    quoteText.innerText = data.quoteText;

    // Stop Loading, Show Quote
    removeLoadingSpinner();
  } catch (error) {
    getQuote();
  }
};

// Tweet Quote
const tweetQuote = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
};

// Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuote();
