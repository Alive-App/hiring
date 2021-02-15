import { Link, useHistory } from "react-router-dom";
import { useState } from "react";

const Modal = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [volume, setVolume] = useState(100);
  const [date, setDate] = useState(
    new Date()
      .toLocaleDateString("ko-KR-iso8601", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/. /g, "-")
      .slice(0, 10)
  );

  const addStock = () => {
    let localWallet = localStorage.getItem("wallet");

    try {
      localWallet = JSON.parse(localWallet);
      let sumPrice = { name, price, date: new Date(date), volume };
      let othersWallet = []

      for (let i = 0; i < localWallet.length; i++) {
        if (name == localWallet[i].name) {
          sumPrice.price = sumPrice.price + localWallet[i].price
          sumPrice.volume = sumPrice.volume + localWallet[i].volume
        } else {
          othersWallet.push(localWallet[i])
        }
      }

      localWallet = [...othersWallet, sumPrice];
    } catch {
      localWallet = [{ name, price, date: new Date(date), volume }];
    } finally {
      console.log("localWallet");
      console.log(localWallet);
      localStorage.setItem("wallet", JSON.stringify(localWallet));
      history.push("/");
    }
  };

  return (
    <div>
      <div className="modal-backdrop fade show"></div>
      <div
        className="modal fade show"
        id="modal"
        aria-labelledby="LabeModal"
        style={{ display: "block" }}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="LabeModal">
                Incluir ações no portifólio
              </h5>
              <Link
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                to="/"
              ></Link>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="col-form-label" for="name">
                    Nome do Ativo:
                  </label>
                  <input
                    type="stock"
                    className="form-control"
                    id="name"
                    onChange={(e) => setName(e.target.value.toUpperCase())}
                  />
                </div>
                <div className="mb-3">
                  <label className="col-form-label" for="price">
                    Preço da compra:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>
                <div className="mb-3">
                  <label className="col-form-label" for="date">
                    Data da compra:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="col-form-label" for="volume">
                    Quantidade de papeis:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="volume"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={addStock}
              >
                Adicionar ao portifólio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
