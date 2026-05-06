import "./Greeting.css";
import quotesData from "../../quotes.json";
import { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";

function Greeting() {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(true);

  const { user } = useUser();

  useEffect(() => {
    let quoteIndex = Number(sessionStorage.getItem("quoteIndex"));

    if (isNaN(quoteIndex)) {
      quoteIndex = Math.floor(Math.random() * quotesData.quotes.length);
      sessionStorage.setItem("quoteIndex", quoteIndex);
    }

    setQuote(quotesData.quotes[quoteIndex]);
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
          <h1>{`Welcome, ${user.username}`}</h1>
          <h5 className="pt-4 w-75 m-auto" key={quote.id}>
            {quote.text}
          </h5>
        </div>
      );
    }
  }
}

export default Greeting;
