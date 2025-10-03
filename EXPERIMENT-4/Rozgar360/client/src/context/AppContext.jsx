import { createContext } from "react";
export const AppContext = createContext();
import { useState } from "react";
export const AppContextProvider = (props) => {

  const [searchFilter,setSearchFilter] = useState({
    title : '',
    location : ''
  })
  const [isSearched,setIsSearched] = useState(false)
const value = {
    setSearchFilter,searchFilter,
    isSearched,setIsSearched
}
return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
)


}