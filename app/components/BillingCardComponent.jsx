import { useNavigate } from "@remix-run/react";
import "./billing-card-component.css";
const BillingCardComponent = ({ plan }) => {
  const navigate = useNavigate()
  return (
    <div className="billing-card-component-container">
      <div>
        <h2>{plan.name.toUpperCase()}</h2>
      </div>
      <div>
        <p>$ {plan.amount}/month</p>
      </div>
      <div>
        {plan.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </div>
      <div className="button">
        <button onClick={()=>navigate(plan.url)}>Purchase</button>
      </div>
    </div>
  );
};

export default BillingCardComponent;
