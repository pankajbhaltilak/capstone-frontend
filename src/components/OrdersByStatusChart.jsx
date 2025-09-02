import React from "react";

const OrdersByStatusChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.order_count, 0);

  return (
    <div className="table-responsive">
      <table className="table table-striped align-middle">
        <thead className="table-light">
          <tr>
            <th>Status</th>
            <th>Orders</th>
            <th style={{ width: "40%" }}>Share</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const percent = ((item.order_count / total) * 100).toFixed(1);
            return (
              <tr key={item.status}>
                <td>{item.status}</td>
                <td>{item.order_count.toLocaleString()}</td>
                <td>
                  <div className="progress" style={{ height: "20px" }}>
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: `${percent}%` }}
                    >
                      {percent}%
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersByStatusChart;
