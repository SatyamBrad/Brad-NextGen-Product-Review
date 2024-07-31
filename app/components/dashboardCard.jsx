
export default function DashboardCard(props) {
    return (
        <div style={{
            backgroundColor: '#3C3C4E',
            width: '28%',
            padding: '30px',
            borderRadius: '8px',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '5px'
        }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>{props.ReviewsCollected}</h1>
            <p>{props.CardName}</p>
            <div style={{ display: 'flex', alignItems: 'start', gap: '8px' }}>

                <span style={{ fontSize: '14px', marginBottom: "10px" }}>{props.Statistics}</span>
            </div>
        </div>
    );
};
