
import './App.css';
import Chatbox from './chatbox';

function App() {
  return (
  //   <div className="flex justify-center items-center h-screen bg-gray-100">
  //   <div className="w-full max-w-lg border rounded-lg shadow-lg bg-white">
  //     <div className="bg-gray-200 p-4 rounded-t-lg">
  //       <h1 className="text-lg font-semibold text-gray-800">Nerve Solution</h1>
  //       <Chatbox />
  //     </div>
  //   </div>
  // </div>
 <div className="flex h-screen bg-gray-100">
 {/* Sidebar */}
 <div className="w-1/4 bg-gray-800 text-white p-4">
   <h2 className="text-xl font-bold mb-4 flex items-center">
     <span className="mr-2 w-6 h-6 flex items-center justify-center bg-white text-gray-800 rounded-full">
       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
         <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
       </svg>
     </span>
     Contacts
   </h2>
   <ul>
     <li className="mb-2 p-2 hover:bg-gray-700 rounded cursor-pointer flex items-center">
       <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-2">A</span>
       Test
     </li>

   </ul>
 </div>

 {/* Main Chat Area */}
<Chatbox/>
</div>
  );
}

export default App;
