export default async function SendData(data: object): Promise<any> {
    try {
        const response = await fetch('http://localhost:5000/api/run-python', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to send data to the backend');
        }
        const result = await response.json();
        console.log("Backend response:", result);
        return result;
    } catch (error) {
        console.error("Error sending data to the backend:", error);
        throw error;
    }
}
