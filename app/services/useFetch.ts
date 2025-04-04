import { useEffect, useState } from "react"

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState<Error | null>(null)



    const fetchData = async () => {
        try {
            setLoading(true)
            setErr(null)
            const result = await fetchFunction()
            setData(result)
            
        } catch (error) {
            setErr(err instanceof Error ? err: new Error('An Error Occured'))
        } finally {
            setLoading(false)
        }
    }

    const reset = () => {
        setData(null)
        setLoading(false)
        setErr(null)
    }


    useEffect(() => {
        if(autoFetch){
            fetchData()
        }
    }, [])

    return { data, loading, err, refetch: fetchData, reset }
}

export default useFetch;


