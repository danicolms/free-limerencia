import { useState, useEffect} from "react";

export function useCountryWhitelist(){
const locationAPI = 'https://free.freeipapi.com/api/json'
const allowedCountries = ["ES", "VE"]
const [loading, setLoading] = useState(true);
const [error, setError] = useState();

    useEffect(() => {
        const fetchIPData = async () => {
          try {
            const response = await fetch(locationAPI);
    
            if (!response.ok) {
              throw new Error('No hemos podido localizar el país desde donde intentas acceder');
            }
    
            const {countryCode} = await response.json();
    
            if(!allowedCountries.includes(countryCode)){
              throw new Error("Esta página no está habilitada para tu país")
            }
    
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchIPData();
      }, []);

      return {loading, error}
}