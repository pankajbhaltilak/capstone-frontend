import React, { useEffect, useState } from "react";
import { getSales } from "../services/api";

const Logs = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const ITEMS_PER_PAGE = 20;

  const fetchSales = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const data = await getSales(pageNumber);
      setSales(data.results || []);
      setCount(data.count || 0);
    } catch (error) {
      console.error("Failed to fetch sales:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales(page);
  }, [page]);

  const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Sales Records</h2>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <>
          <div className="table-responsive shadow-sm rounded">
            <table className="table table-striped table-hover table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Order ID</th>
                  <th>Category</th>
                  <th>Amount (INR)</th>
                  <th>Order Date</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Country</th>
                  <th>Status</th>
                  <th>Courier</th>
                </tr>
              </thead>
              <tbody>
                {sales.length > 0 ? (
                  sales.map((sale, index) => (
                    <tr key={sale.id}>
                      <td>{(page - 1) * ITEMS_PER_PAGE + index + 1}</td>
                      <td>{sale.order_id}</td>
                      <td>{ sale.category}</td>
                      <td>₹{sale.amount}</td>
                      <td>{new Date(sale.order_date).toLocaleDateString()}</td>
                      <td>{sale.ship_city}</td>
                      <td>{sale.ship_state}</td>
                      <td>{sale.ship_country}</td>
                      <td>
                        <span
                          className={`badge ${
                            sale.status.includes("Delivered")
                              ? "bg-success"
                              : sale.status.includes("Shipped")
                              ? "bg-warning text-dark"
                              : "bg-secondary"
                          }`}
                        >
                          {sale.status}
                        </span>
                      </td>
                      <td>{sale.courier_status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center text-muted">
                      No sales data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <button
              className="btn btn-outline-primary"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>

            <span className="fw-bold">
              Page {page} of {totalPages}
            </span>

            <button
              className="btn btn-outline-primary"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Logs;
