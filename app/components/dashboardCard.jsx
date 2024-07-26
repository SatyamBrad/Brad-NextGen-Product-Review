
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
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 11.9391L3.41421 7.35391L4.82843 5.93909L8 9.06091L11.1716 5.93909L12.5858 7.35391L8 11.9391Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontSize: '14px', marginBottom: "10px" }}>{props.Statistics}</span>
            </div>
        </div>
    );
};
