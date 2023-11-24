import { useState , useCallback, useEffect} from 'react'


function App() {

  const [length , setlength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [CharAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  // use ref Hook
  const passwordRef = useState(null)

  // Fucniton to generate Password 
  const passGen= useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="1234567890"
    if(CharAllowed) str+="!@~`#$%^&*()_+=-}{][:;<>?/|,."

    for(let i=1; i<length ; i++){
      let char = Math.floor(Math.random()* str.length + 1)
      pass+=str.charAt(char)
    }

    setPassword(pass)
  },[length, numberAllowed, CharAllowed, setPassword])         //dependencies

  // hook to see the effects on password 
  useEffect(()=>{
        passGen()
  },[length, numberAllowed, CharAllowed, passGen])             //dependencies

  // Function to copy the password 
  const copyClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])                                                //dependencies
  

  return (
    <>
    <div className="w-full max-w-sm bg-gradient-to-t from-emerald-500 to-lime-600 my-48 p-8 rounded-lg mx-auto md:w-fll md:max-w-md md:mx-auto lg:max-w-lg lg:mx-[35%]">
      <h1 className="font-primary text-4xl text-slate-700 text-center">
        Password Generator</h1>

      <div className="flex items-center justify-center ">
        {/* Input Box */}
        <input
         type="text"
         value={password}
         className="p-2 rounded-l-md w-full outline-none text-black " 
         readOnly 
         ref={passwordRef}
         placeholder="Your Password" />

         {/* Button */}
        <button className="bg-slate-600 p-2 mx-1 rounded-r-md " onClick={copyClipboard}>
          <img src="./src/img/copy.png" alt="click me " />
          </button>
      </div>

      {/* -------------------------------------------  */}

      {/* Input Box */}
      <div className="flex flex-col gap-y-2 font-tertiary font-semibold lg:flex lg:place-items-stretch lg:justify-between lg:flex-row">
        <div className="flex items-center  gap-2" > 
        <input 
        type="range"
        min={0}
        max={20}
        value={length}
        className="cursor-pointer" 
        onChange={(e)=>{
          setlength(e.target.value)
        }}
        />
        
        <label className="p-2">Length: ( {length} )</label>
        </div>

        {/* Number Box */}
        <div className="flex items-cente gap-2">
        <input 
        type="checkbox" 
        defaultChecked={numberAllowed}
        className="flex items-start"
        onChange={(e)=>{
          setnumberAllowed((prev) => !prev)      //Arrow Function
        }}
        />
        <label className="p-2">Number</label>
        </div>

        {/* Character Box */}
        <div className="flex items-center gap-2">
          <input type="checkbox"
          defaultChecked= {CharAllowed}
          onChange={()=>{
            setCharAllowed((prev) => !prev)    //Arrow Function 
          }}
          className="flex items-start" />
        <label className="p-2">Character</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
