import React from "react";

const KPICards = ({ kpis }) => {
  const { total_sales_amount, total_orders, avg_order_value, total_qty } = kpis;

  const cardData = [
    { 
      label: "Total Sales", 
      value: `$${total_sales_amount || 0}`, 
      icon: "bi-cash-stack", 
      color: "primary" 
    },
    { 
      label: "Total Orders", 
      value: total_orders?.toLocaleString() || 0, 
      icon: "bi-cart-check", 
      color: "success" 
    },
    { 
      label: "Avg Order Value", 
      value: `$${avg_order_value || 0}`, 
      icon: "bi-graph-up-arrow", 
      color: "warning" 
    },
    { 
      label: "Total Quantity", 
      value: total_qty?.toLocaleString() || 0, 
      icon: "bi-box-seam", 
      color: "info" 
    },
  ];

  return (
    <div className="row g-3">
      {cardData.map((card, idx) => (
        <div className="col-12 col-md-6 col-lg-3" key={idx}>
          <div className={`card text-center shadow-sm border-0 h-100`}>
            <div className="card-body">
              <div 
                className={`rounded-circle bg-${card.color} bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-3`} 
                style={{ width: "60px", height: "60px" }}
              >
                <i className={`bi ${card.icon} text-${card.color} fs-3`}></i>
              </div>
              <h6 className="text-muted">{card.label}</h6>
              <h4 className="fw-bold">{card.value}</h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;
