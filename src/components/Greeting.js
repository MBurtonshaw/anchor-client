import quotesData from "../quotes.json";
import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { useHomepage } from "../contexts/HomepageContext";
import { getToday } from "./utils/DateUtils";

function Greeting() {
  const [quote, setQuote] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");

  const { user } = useUser();
  const { homepage } = useHomepage();
  const isWeekend = homepage?.dayType === "WEEKEND";
  const today = getToday();

  useEffect(() => {
    const storedDate = localStorage.getItem("quoteDate");
    const storedIndex = localStorage.getItem("quoteIndex");

    if (storedDate === today && storedIndex !== null) {
      setQuote(quotesData.quotes[Number(storedIndex)]);
      return;
    }

    const newIndex = Math.floor(Math.random() * quotesData.quotes.length);

    localStorage.setItem("quoteIndex", newIndex);
    localStorage.setItem("quoteDate", today);

    setQuote(quotesData.quotes[newIndex]);
  }, [today]);

  useEffect(() => {
    const updateTime = () => {
      const hour = new Date().getHours();

      if (hour < 12) setTimeOfDay("morning");
      else if (hour < 17) setTimeOfDay("afternoon");
      else setTimeOfDay("evening");
    };

    updateTime();
    const interval = setInterval(updateTime, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const getGreeting = () => {
    let clock = "";
    if (timeOfDay === "morning") {
      clock = "Good morning, ";
    } else if (timeOfDay === "afternoon") {
      clock = "Good afternoon, ";
    } else {
      clock = "Good evening, ";
    }
    const now = new Date();

    const dayOfWeek = now.toLocaleDateString(undefined, {
      weekday: "long",
    });

    const fullDate = now.toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    return (
      <div>
        <h1>
          {clock} {user.username}
        </h1>

        <h4>Today is {dayOfWeek}</h4>

        <h5>{fullDate}</h5>
      </div>
    );
  };

  if (homepage && isWeekend) {
    return (
      <div className="text-center">
        {getGreeting()}
        <h5 className="pt-5 w-75 m-auto quote">Weekend Mode</h5>
      </div>
    );
  } else {
    return (
      <div className="text-center">
        {getGreeting()}
        <h5 className="pt-5 w-75 m-auto quote" key={quote.id}>
          {quote.text}
        </h5>
        <span>{quote.author}</span>
      </div>
    );
  }
}

export default Greeting;
