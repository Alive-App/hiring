import { useState, useEffect } from "react";
import NavBottom from "./components/navBottom";

const App = () => {
  const [wallet, setWallet] = useState(() => {
    let localWallet = localStorage.getItem("wallet");
    try {
      localWallet = JSON.parse(localWallet);
      return [...localWallet];
    } catch {
      return [];
    }
  });

  const [prices, setPrices] = useState(() => {
    let localPrices = localStorage.getItem("prices");
    try {
      localPrices = JSON.parse(localPrices);
      return [...localPrices];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("price", JSON.stringify(prices));
  }, [prices]);

  useEffect(() => {
    if (wallet) {
      console.log("Wallet");
      localStorage.setItem("wallet", JSON.stringify(wallet));
      console.log("Req");
      let stock_name = wallet.map((e) => e.name).join(",");

      fetch(
        "http://localhost:3001/stocks/quote?" +
          new URLSearchParams({
            stock_name,
          })
      )
        .then((response) => {
          if (response.status !== 200) {
            console.log(
              "Looks like there was a problem. Status Code: " + response.status
            );
            return;
          }

          // Examine the text in the response
          response.json().then((data) => {
            setPrices(data);
          });
        })
        .catch((err) => {
          console.log("Fetch Error :-S", err);
        });
    }
  }, [wallet]);

  const removeQuote = async (index) => {
    let newWallet = wallet;
    newWallet.splice(index, 1);
    setWallet([...newWallet]);
  };

  return (
    <div className="container my-5">
      <header className="text-center mb-5">
        <h1>
          $
          {prices
            .reduce((accumulator, price) => {
              wallet.forEach((e) => {
                if (e.name == price.name) {
                  accumulator = accumulator + price.lastPrice * e.volume;
                }
              });
              return accumulator;
            }, 0)
            .toFixed(2)}
        </h1>
      </header>
      <ul
        className="d-flex flex-column flex-wrap list-group list-group-flush list-group-item flex-container rounded-3 shadow"
        style={{ maxHeight: "80vh" }}
      >
        {wallet.map((wallet, i) => {
          return (
            <li key={i} value={wallet.name} className="list-group-item">
              <div className="text-end">
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  id={i}
                  onClick={(e) => removeQuote(e.target.id)}
                ></button>
              </div>

              <h5>{wallet.name}</h5>
              {prices.map((price) => {
                if (price.name == wallet.name) {
                  return (
                    <>
                      <p>
                        Variação: ${" "}
                        {(price.lastPrice - wallet.price).toFixed(2)}
                      </p>
                      <p>
                        Valor: $ {(price.lastPrice * wallet.volume).toFixed(2)}
                      </p>
                    </>
                  );
                }
              })}
              <p>Data: {new Date(wallet.date).toLocaleString()}</p>
            </li>
          );
        })}
      </ul>
      <NavBottom />
    </div>
  );
};

export default App;
