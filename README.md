### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ezy-metrics-backend.git
```

### 2. Navigate to the Project Directory

```bash
cd ezy-metrics-backend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Set Up Environment Variables

Create a `.env` file in the root directory and add the following variables:

```plaintext
MONGO_URI=mongodb+srv://Akgisno1:Akgisno1@ezybackend.thci8.mongodb.net/?retryWrites=true&w=majority&appName=ezybackend
EMAIL_USER=akgisokay@gmail.com
EMAIL_PASS=sviq xeik gfcx roam

ALERT_EMAIL=alert@email.com //Adjust the alert email to fit your needs
```

### 5. Start the Server

```bash
node app.js
```

## Testing with Postman

1. **Open Postman**.
2. **Create a New Request**:
   - Set the request type to **GET**.
   - Enter the URL: `http://localhost:3000/report`.
3. **Send the Request**:
   - Click the **Send** button.
4. **Check the Response**:
   - A successful response will generate a report and send an alert email.
   - You should see the generated report in your console and a confirmation message indicating the alert email has been sent.
5. **Test Get and Post Requests**:
   - Use Postman to send GET and POST requests to the `/leads` endpoint.
   - Use Postman to send GET and POST requests to the `/campaigns` endpoint.

## Error Handling

If you encounter a `500 Internal Server Error`:

- Ensure your MongoDB connection string is correct in the `.env` file.
- Check that your email settings and credentials are accurate.
- Review the server console logs for detailed error messages.
