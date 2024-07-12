import { Badge, Checkbox, Icon, Select } from "@shopify/polaris";
import { InfoIcon, ChatIcon, CheckCircleIcon } from "@shopify/polaris-icons";
import "./review-component.css";

export default function ReviewComponent({ item }) {
  // console.log(item);

  const flexStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.3rem",
  };

  const handleCheck = () => {
    item.checked = !item.checked;
  };

  const handleTimeShow = () => {
    const time = new Date(item.createdAt);
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][time.getMonth()];
    const date = time.getDate();
    const hours = time.getHours();
    const finalHours = hours > 12 ? hours - 12 : hours;
    const mins = time.getMinutes();
    const isAmOrPm = hours > 12 ? "PM" : "AM";
    return `${month} ${date} at ${finalHours}:${mins} ${isAmOrPm}`;
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
          <h2>{item.reviewTitle}</h2>
        </div>
        <div style={{ ...flexStyle }}>
          <p
            style={{ textDecoration: "underline", textUnderlineOffset: "4px" }}
          >
            {item.customerName}
          </p>
          {item.verified && <Icon source={CheckCircleIcon} />}
          <p>{handleTimeShow()}</p>
        </div>
      </div>

      <div className="review-component-body">
        <p>{item.reviewDescription}</p>
      </div>

      <div className="review-component-image">
        {item.images?.map((image, index) => (
          <img key={index} src={image.imageUrl} alt="" />
        ))}
      </div>
    </div>
  );
}
