import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import KPICards from "../components/KPICards";
import SalesTrendChart from "../components/SalesTrendChart";
import SalesByCategoryChart from "../components/SalesByCategoryChart";
import OrdersByStatusChart from "../components/OrdersByStatusChart";
import SalesByRegion from "../components/SalesByRegion";
import TopCities from "../components/TopCities";

import {
  getKPIs,
  getSalesTrend,
  getSalesByCategory,
  getOrdersByStatus,
} from "../services/api";

const Dashboard = () => {
  const [kpis, setKpis] = useState({});
  const [trend, setTrend] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statusData, setStatusData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    (async () => {
      setKpis(await getKPIs(token));
      setTrend(await getSalesTrend(token));
      setCategories(await getSalesByCategory(token));
      setStatusData(await getOrdersByStatus(token));
    })();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container-fluid mt-4">

        {/* KPI Cards */}
        <div className="row mb-4">
          <KPICards kpis={kpis} />
        </div>

        {/* First Row: Sales Trend (Full Width) */}
        <div className="row mb-4">
          <div className="col-12 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">Sales Trend</h5>
                <SalesTrendChart data={trend} />
              </div>
            </div>
          </div>
        </div>

        {/* Second Row: Sales by Category + Orders by Status */}
        <div className="row mb-4">
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">Sales by Category</h5>
                <SalesByCategoryChart data={categories} />
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">Orders by Status</h5>
                <OrdersByStatusChart data={statusData} />
              </div>
            </div>
          </div>
        </div>

        {/* Third Row: Geographical Analysis */}
        <div className="row mb-4">
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">Sales by Region</h5>
                <SalesByRegion />
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">Top Cities by Orders</h5>
                <TopCities />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
