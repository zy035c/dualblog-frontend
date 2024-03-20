import { useState, useEffect, useMemo } from "react";

export default function PrimeList() {

    const isPrime = (num) => {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;
        
        let i = 5;
        while (i * i <= num) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
            i += 6;
        }
        return true;
    }
    
    const [inputValue, setInputValue] = useState("");
    
    const primeList = useMemo(() => {
        const inputVal = parseInt(inputValue);
        if (!isNaN(inputVal)) {
            const primes = []
            for (let i = 2; i <= inputVal; ++i) {
                if (isPrime(i)) {
                    primes.push(i);
                }
            }
            return primes
        } else {
            return [];
        }
    }, [inputValue]);
    
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div>
            <h3>Prime List</h3>
            <input 
                type="number"
                placeholder="Input a number"
                value={inputValue}
                onChange={handleInputChange}
            />
            <div>
                <h4>Prime less or equal to {inputValue}:</h4>
                <ul>
                    {primeList.map((prime, index) => (
                        <li key={index}>{prime}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

