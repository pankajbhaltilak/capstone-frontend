import React from "react";

const SalesByCategoryChart = ({ data }) => {
  const totalSales = data.reduce((sum, item) => sum + item.total_sales, 0);

  return (
    <div className="table-responsive">
      <table className="table table-striped align-middle">
        <thead className="table-light">
          <tr>
            <th>Category</th>
            <th>Sales ($)</th>
            <th style={{ width: "40%" }}>Sales Share</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const percent = ((item.total_sales / totalSales) * 100).toFixed(1);
            return (
              <tr key={item.category}>
                <td>{item.category}</td>
                <td>${item.total_sales}</td>
                <td>
                  <div className="progress" style={{ height: "20px" }}>
                    <div
                      className="progress-bar bg-success"
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

export default SalesByCategoryChart;
