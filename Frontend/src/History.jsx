import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const UseQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const History = () => {
  let query = UseQuery();

  const [history, setHistory] = useState({
    series: [
      {
        data: null,
      },
    ],
    options: {
      chart: {
        type: "candlestick",
      },
      title: {
        text: "CandleStick Chart",
        align: "left",
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
    },
  });

  useEffect(() => {
    let dateFrom = new Date(query.get("from"));
    if (dateFrom) {
      console.log(dateFrom);
      let dateTo = new Date(query.get("to"));
      if (dateTo) {
        fetch(
          "http://localhost:3001/stocks/history?" +
            new URLSearchParams({
              stock_name: query.get("stock_name"),
              from: dateFrom.toISOString().slice(0, 10),
              to: dateTo.toISOString().slice(0, 10),
            })
        )
          .then((response) => {
            if (response.status !== 200) {
              console.log(
                "Looks like there was a problem. Status Code: " +
                  response.status
              );
              return;
            }

            // Examine the text in the response
            response.json().then((data) => {
              history.series[0].data = data.prices.map((item) => {
                return {
                  x: new Date(item.pricedAt),
                  y: [item.opening, item.high, item.low, item.closing],
                };
              });
              console.log(history);
              setHistory({...history});
            });
          })
          .catch((err) => {
            console.log("Fetch Error :-S", err);
          });
      } else {
        alert("Data final incorreta");
      }
    } else {
      alert("Data Inicial incorreta");
    }
  }, []);

  function DChart() {
    if (history.series[0].data) {
      return (
        <Chart
          options={history.options}
          series={history.series}
          type="candlestick"
          className="col-11"
          width="100%"
          height={window.innerHeight /1.3} 
        />
      );
    }
    return <p>Carregando</p>
  }

  return (
    <div className="container my-5">
      <header className="text-center mb-5">
        <p>{query.get("stock_name")}</p>
        <p>{query.get("from")}</p>
        <p>{query.get("to")}</p>
      </header>
      <main className="text-center col-12 mb-5">
        <DChart />
      </main>
    </div>
  );
};
export default History;
