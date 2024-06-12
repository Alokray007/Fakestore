export default function App() {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => console.log(json));

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      
    </div>

);
}
