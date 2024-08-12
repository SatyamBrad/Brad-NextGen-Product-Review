import { TfiStatsUp } from "react-icons/tfi";
export default function DashboardCard(props) {
    return (
        <div style={{
            backgroundColor: '#3C3C4E',
            width: '28%',
            padding: '32px 8px 8px 16px',
            borderRadius: '8px',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            gap: '4px',
            marginBottom: '5px'
        }}>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', paddingBottom: "8px" }}>{props.ReviewsCollected}</h1>
            <p style={{ fontWeight: 'bold', fontSize: "16px" }} >{props.CardName}</p>
            <div style={{ display: 'flex', alignItems: 'start' }}>
                <div style={{
                    padding: "2px",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    borderBottomLeftRadius: "16px",
                    borderBottomRightRadius: "16px",
                    backgroundColor: "#0B0B22"
                }}>
                    <TfiStatsUp />  {props.Progress}
                </div>
                <span style={{ fontSize: '14px', marginBottom: "10px", marginLeft: "4px" }}>   { }{props.TimePeriod}</span>
            </div>
        </div >
    );
};
