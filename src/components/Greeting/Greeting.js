import "./Greeting.css";
import quotesData from "../../quotes.json";
import { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";

function Greeting() {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(true);

  const { user } = useUser();

  useEffect(() => {
    const today = new Date().toDateString();
    let storedQuoteIndex = Number(localStorage.getItem("quoteIndex"));
    let storedDate = localStorage.getItem("quoteDate");

    if (isNaN(storedQuoteIndex) || storedDate !== today) {
      storedQuoteIndex = Math.floor(Math.random() * quotesData.quotes.length);
      localStorage.setItem("quoteIndex", storedQuoteIndex);
      localStorage.setItem("quoteDate", today);
    }

    setQuote(quotesData.quotes[storedQuoteIndex]);
    setLoading(false);
  }, []);

  if (loading) {
    return <h1 className="text-center">Loading...</h1>;
  } else {
    if (!user || user === null) {
      return (
        <div className="greeting_container_1 text-center">
          <h1 className="text-center">Welcome</h1>
        </div>
      );
    } else {
      return (
        <div className="greeting_container_2 text-center">
          <h1>{`Welcome to your To-Do list, ${user.username}`}</h1>
          <h5 className="pt-4 w-75 m-auto" key={quote.id}>
            {quote.text}
          </h5>
          <span>{quote.author}</span>
        </div>
      );
    }
  }
}

export default Greeting;
