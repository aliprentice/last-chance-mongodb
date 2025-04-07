// pages/index.js

export default function Home() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Welcome to Flight Updates Webhook</h1>
      <p>
        This deployment is running successfully.
        <br />
        To receive flight updates, use the API endpoint at <code>/api/flight-updates</code>.
      </p>
    </div>
  );
}
