import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState({
    text: "",
    author: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchNewQuote = async () => {
    setIsLoading(true);
    try {
      const selectedIndex = Math.round(Math.random() * 100);
      const data = quotes.find((_, ind) => ind === selectedIndex);
      setQuote({
        text: data.quote,
        author: data.author,
      });
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
    setIsLoading(false);
  };

  const fetchAllQuotes = async () => {
    const URL =
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
    const response = await fetch(URL);
    const data = await response.json();
    setQuotes(data.quotes);
  };
  useEffect(() => {
    fetchAllQuotes();
  }, []);

  useEffect(() => {
    if (quotes?.length > 0) fetchNewQuote();
  }, [quotes]);

  const tweetQuote = () => {
    const tweetText = encodeURIComponent(`"${quote.text}" - ${quote.author}`);
    return `https://twitter.com/intent/tweet?text=${tweetText}`;
  };

  return (
    <div className="app">
      <div id="quote-box">
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            <div className="quote-content">
              <p id="text">
                <span className="quote-mark">"</span>
                {quote.text}
                <span className="quote-mark">"</span>
              </p>
              <p id="author">- {quote.author}</p>
            </div>
            <div className="buttons">
              <a
                id="tweet-quote"
                href={tweetQuote()}
                target="_blank"
                rel="noopener noreferrer"
                className="button"
              >
                Tweet
              </a>
              <button id="new-quote" onClick={fetchNewQuote} className="button">
                New Quote
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
