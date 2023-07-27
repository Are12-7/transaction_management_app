import React from "react";
import styled from "styled-components";
import { useTransactionContext } from "../../context/TransactionContext";

function History() {
  const { transactionHistory } = useTransactionContext();

  const [...history] = transactionHistory();

  return (
    <HistoryStyle>
      <h2>Recent Transactions</h2>
      {history.map((item) => {
        const { _id, title, amount, type } = item;
        return (
          <div key={_id} className="history-item">
            <p
              style={{
                color: type === "expense" ? "red" : "var(--color-green)",
              }}
            >
              {title}
            </p>

            <p
              style={{
                color: type === "expense" ? "red" : "var(--color-green)",
              }}
            >
              {type === "expense"
                ? `-${amount <= 0 ? 0 : amount}`
                : `+${amount <= 0 ? 0 : amount}`}
            </p>
          </div>
        );
      })}
    </HistoryStyle>
  );
}

const HistoryStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .history-item {
    background: linear-gradient(
      90deg,
      rgba(36, 0, 35, 1) 0%,
      rgba(245, 233, 233, 1) 0%,
      rgba(255, 255, 255, 1) 0%,
      rgba(230, 204, 240, 1) 57%,
      rgba(232, 190, 249, 1) 100%
    );
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export default History;
