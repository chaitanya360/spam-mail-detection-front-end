import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import styled from "styled-components";

function App() {
  const [loading, setLoading] = useState(false);

  const [history, setHistory] = useState([]);
  const [result, setResult] = useState(false);

  const addToHistory = (email, result) => {
    let spam_count = 0;
    let pred_result = true;
    if (result.dt_pred) spam_count++;

    if (result.nb_pred) spam_count++;

    if (result.svm_pred) spam_count++;

    setHistory((oldMails) => [{ email, result: pred_result }, ...oldMails]);
  };

  const predict = (msg) => {
    setResult(false);
    setLoading(true);
    if (msg.length === 0) {
      alert("Please Enter Email");
      return;
    }
    fetch(`http://127.0.0.1:5000/predict/${msg}`)
      .then((response) => response.json())
      .then((result) =>
        setTimeout(() => {
          setResult(result);
          addToHistory(msg, result);
          setLoading(false);
        }, [1500])
      )
      .catch(() => alert("Check your internet connection"));
  };

  return (
    <AppStyle>
      <header>Spam Email Detection</header>
      <div className="prediction">
        <div className="input-container">
          <div class="input-group">
            {/* <div class="input-group-prepend">
              <span class="input-group-text">Email</span>
            </div> */}
            <textarea
              class="form-control"
              aria-label="With textarea"
              placeholder="Enter email"
              id="user-entered-mail"
            ></textarea>
          </div>
          <button
            className="btn btn-success"
            onClick={() =>
              predict(document.getElementById("user-entered-mail").value)
            }
          >
            Predict
          </button>
        </div>
        <div className="output">
          {loading && (
            <div className="loader-wrapper">
              <span className="loader"></span>
            </div>
          )}
          {result && (
            <>
              <div className="algorithm">
                <div className="key">Naive Bayes</div>
                {!result.nb_pred ? (
                  <div className="value not">Not Spam</div>
                ) : (
                  <div className="value spam">Spam</div>
                )}
                <div className="accuracy">87.316</div>
              </div>
              <div className="algorithm">
                <div className="key">Support Vector Machine</div>
                {!result.svm_pred ? (
                  <div className="value not">Not Spam</div>
                ) : (
                  <div className="value spam">Spam</div>
                )}
                <div className="accuracy">98.221</div>
              </div>
              <div className="algorithm">
                <div className="key">Decision Tree</div>
                {!result.dt_pred ? (
                  <div className="value not">Not Spam</div>
                ) : (
                  <div className="value spam">Spam</div>
                )}
                <div className="accuracy">93.194</div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="history">
        <div className="spam-container mail-container">
          <div className="title">Spam</div>
          <div className="container">
            {history.map(
              (single_mail) =>
                single_mail.result && (
                  <div className="email-card">{single_mail.email}</div>
                )
            )}
          </div>
        </div>
        <div className="not-spam-container mail-container">
          <div className="title">Not Spam</div>
          <div className="container">
            {history.map(
              (single_mail) =>
                !single_mail.result && (
                  <div className="email-card">{single_mail.email}</div>
                )
            )}
          </div>
        </div>
      </div>
    </AppStyle>
  );
}

export default App;

const AppStyle = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr;
  height: 100vh;
  background: #fcf0f0;

  header {
    background: tomato;
    padding: 1rem;
    text-align: center;
    color: white;
    font-size: 1.3rem;
    font-weight: 600;
  }

  .prediction {
    /* border: 1px solid tomato; */
    background: #252f37;
    display: grid;
    grid-template-columns: 1fr 1fr;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
    /* background: white; */
    margin: 1rem;
    border-radius: 5px;
    .input-container {
      padding: 2rem;
      // background: grey;
      /* display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center; */
      .btn {
        margin: 1rem 0;
      }
    }
    .output {
      color: white;
      .loader-wrapper {
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
      }

      padding: 2rem;
      /* background: yellow; */
      .algorithm {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        align-items: center;
        box-shadow: 0px 0px 2px 0px rgba(0, 255, 0, 0.75) inset;
        margin-bottom: 1rem;
        border-radius: 5px;
        max-width: 600px;
        font-weight: 500;
        /* border: 1px solid navy; */
        .spam {
          color: red;
        }
        .not {
          color: green;
        }
        .key {
          padding: 0.5rem 1rem;
        }
        .value {
          padding: 0.5rem 1rem;
        }
      }
    }
  }

  .history {
    .mail-container {
      /* background-color: rgba(0, 0, 0, 0.3); */
      border-radius: 5px;
      margin: 0 1rem;
      box-shadow: 0px 0px 4px 0px rgba(0, 255, 0, 0.75) inset;
      background: rgba(255, 255, 255, 0.9);
      overflow: hidden;
      margin-bottom :1rem;
      .container {
        overflow: auto;
        height: 45vh;
        margin: 0.3rem;
        border-radius: 10px;
        width: 98%;
      }
    }

    .spam-container {
      box-shadow: 0px 0px 4px 0px rgba(255, 0, 0, 0.75) inset;
    }

    .title {
      text-align: center;
      font-size: 1.1rem;
      padding: 0.4rem 0;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
      z-index; 2;
    }

    /* border: 1px solid tomato; */
    display: grid;
    grid-template-columns: 1fr 1fr;

    .email-card {
      box-shadow: 1px 0px 2px rgba(0, 0, 0, 0.2);
      background: white;
      padding: 1rem;
      margin: 0.8rem 1rem;
      border-radius: 4px;
    }
  }
`;
