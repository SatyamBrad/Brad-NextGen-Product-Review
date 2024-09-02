import React, { useState } from 'react';
import { Form, useTransition } from 'remix';

const UploadCSVForm = () => {
    const transition = useTransition();
    const [file, setFile] = useState(null);

    const isSubmitting = transition.state === "submitting";

    return (
        <Form
            method="post"
            encType="multipart/form-data"
            action="/upload-csv"
        >
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="file"
                    name="csvFile"
                    accept=".csv"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                />
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#4CAF50",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                {isSubmitting ? "Uploading..." : "Upload CSV"}
            </button>
        </Form>
    );
};

export default UploadCSVForm;
