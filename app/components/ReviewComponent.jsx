import { Badge, Checkbox, Icon, Select } from "@shopify/polaris";
import { InfoIcon, ChatIcon, CheckCircleIcon } from "@shopify/polaris-icons";
import "./review-component.css";
import { useState } from "react";

export default function ReviewComponent({ item }) {
  const flexStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.3rem",
  };

  const handleCheck = () => {
    item.checked = !item.checked;
  };

  return (
    <div className="review-component-container">
      <div className="review-component-applets">
        <div className="flex-row">
          <Checkbox checked={item.checked} onChange={handleCheck} />
          <Badge tone="info">{item.status}</Badge>
        </div>

        <div className="flex-row">
          <Icon source={InfoIcon} />
          <Icon source={ChatIcon} />
          <div className="flex-row" style={{ color: "black" }}>
            <Select
              options={[
                { label: "Pending", value: "pending" },
                { label: "Approved", value: "approved" },
              ]}
              // value={selected}
              // onChange={(val) => {
              //   setSelected(val);
              // }}
            />
            <Select
              options={[
                { label: "Pending", value: "pending" },
                { label: "Approved", value: "approved" },
              ]}
              // value={selected}
              // onChange={(val) => {
              //   setSelected(val);
              // }}
            />
          </div>
        </div>
      </div>

      <div className="review-component-heading">
        <div>
          <h2>{item.heading}</h2>
        </div>
        <div style={{ ...flexStyle }}>
          <p style={{textDecoration:"underline", textUnderlineOffset:"4px"}}>{item.author}</p>
          {item.verified && <Icon source={CheckCircleIcon} />}
          <p>{item.time}</p>
        </div>
      </div>

      <div className="review-component-body">
        <p>{item.review}</p>
      </div>
    </div>
  );
}
