import Navigation from "./components/Navigation";

function App() {
  window.onresize = () => {
    document.body.height = window.innerHeight;
    document.body.width = window.innerWidth;
  };
  window.onresize();

  return (
    <div className="container">
      <h1>Manager zadań</h1>
      <Navigation />
    </div>
  );
}

export default App;
