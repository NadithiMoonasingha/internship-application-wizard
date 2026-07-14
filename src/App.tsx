import "./App.css";

function App() {
  return (
    <main className="app">
      <section className="wizard-container">
        <header className="wizard-header">
          <p className="wizard-label">Internship Application</p>
          <h1>Application Form Wizard</h1>
          <p>
            Complete the three steps below to prepare your internship
            application.
          </p>
        </header>

        <div className="placeholder-content">
          <h2>Project setup completed</h2>
          <p>The application form will be added in the next steps.</p>
        </div>
      </section>
    </main>
  );
}

export default App;