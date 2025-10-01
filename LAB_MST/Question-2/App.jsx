//Product cart
import react from 'react';
import ProductCart from './components/ProductCart';

const App = () => {
  return (
         <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-10">
      <h1 className="text-3xl font-bold  text-blue-700">Product Cart</h1>
          <div className="flex justify-center gap-4">
      <ProductCart name="Iphone" price="1,29,900" description="This is the mobile from Apple" 
      inStock={true}/>
      <ProductCart name="Samsung" price="1,05,999" 
      description="This is the latest mobile from Samsung" inStock={false}/>
      <ProductCart name="Victus" price="39,999" 
      description="This is the laptop from hp" inStock={true}/>
      </div>
    </div>
  )
}

export default App
