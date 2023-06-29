import { useState, useEffect } from 'react';
import './quote.css';

export default function Quote() {
  const [quote, setQuote] = useState('');
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [savedQuotes, setSavedQuotes] = useState([]);
  const [sortQuotes, setSortQuotes] = useState(['asc']);
  useEffect(() => {
    fetchQuote();
  }, []);

  useEffect(() => {
    if (shouldAnimate) {
      // Remove the animation class after a delay
      setTimeout(() => {
        setShouldAnimate(false);
      }, 300); // Adjust the delay time to match your animation duration
    }
  }, [shouldAnimate]);

  //get Quote
  const fetchQuote = () => {
    setShouldAnimate(true); // Start the animation
    fetch('https://api.quotable.io/random')
      .then((res) => res.json())
      .then((data) => {
        setQuote(data);
        setTimeout(() => {
          setShouldAnimate(false); // Remove the animation class after a delay
        }, 300); // Adjust the delay time to match your animation duration
      })
      .catch((err) => console.log(err));
  };
  //Save Quote
  const handleClickSaveQuote = () => {
    if (!isQuoteAlreadySaved()) {
      setSavedQuotes([...savedQuotes, quote]);
    }
  };
  //Is the Quote already saved?
  const isQuoteAlreadySaved = () => {
    //console.log(savedQuotes);
    return savedQuotes.some(
      (savedQuote) => savedQuote.content === quote.content
    );
  };
  //Handle the sorting of my saved quotes
  const handleSortQuotes = () => {
    const sortedQuotes = [...savedQuotes].sort((a, b) => {
      return sortQuotes === 'asc'
        ? a.content.localeCompare(b.content)
        : b.content.localeCompare(a.content);
    });
    setSavedQuotes(sortedQuotes);
    setSortQuotes(sortQuotes === 'asc' ? 'desc' : 'asc');
  };
  return (
    <>
      <div
        className={`quoteWrapper ${shouldAnimate ? 'animate' : ''}`}
        key={quote.content}
      >
        <h2>
          <q>{quote.content}</q>
        </h2>
        <h5>{quote.author}</h5>
      </div>
      <span>
        <button onClick={fetchQuote}>New Quote</button>
        <button onClick={handleClickSaveQuote}>Save Quote</button>
      </span>

      {savedQuotes.length > 0 && (
        <div key={quote.id}>
          <h3>Favorite Quotes:</h3>
          <ul>
            {savedQuotes.map((savedQuote) => (
              <li key={quote.id}>
                <q>{savedQuote.content}</q>
              </li>
            ))}
          </ul>
          <button onClick={handleSortQuotes}>Sort Me!</button>
        </div>
      )}
    </>
  );
}
