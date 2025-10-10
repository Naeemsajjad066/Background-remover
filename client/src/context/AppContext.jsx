import { useAuth, useClerk } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { createContext } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";


export const AppContext = createContext();


const AppContextProvider = (props) => {

    const navigate = useNavigate()
    const [credit, setCredit] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const { getToken } = useAuth()

    const [image, setImage] = useState(false)
    const { isSignedIn, isLoaded } = useUser()
    const { openSignIn } = useClerk()
    const [resultImage, setResultImage] = useState(false)

    const loadCreditData = async () => {
        try {

            const token = await getToken()
            console.log("Token obtained:", token)

            const response = await axios.get(`${backendUrl}/api/user/credits`, { headers: { token } })
            console.log("Full response:", response)
            console.log("Response data:", response.data)

            if (response.data.success) {
                setCredit(response.data.credits)
                console.log("Credits:", response.data.credits)
            } else {
                console.log("Request failed:", response.data.message)
            }


        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    const removebg = async (image) => {
        try {
            if (!isSignedIn) {
                return openSignIn()
            }

            // Validate file size (4MB limit)
            const maxSize = 4 * 1024 * 1024; // 4MB in bytes 
            if (image && image.size > maxSize) {
                const sizeMB = (image.size / (1024 * 1024)).toFixed(2);
                toast.error(`File too large (${sizeMB}MB). Maximum size is 4MB. Please compress your image.`);
                return;
            }

            // Validate file type
            
            if (image && !image.type.startsWith('image/')) {
                toast.error('Please upload a valid image file');
                return;
            }

            setImage(image)
            setResultImage(false)
            navigate('/result')
            const token = await getToken()
            const formData = new FormData()
            image && formData.append('image', image)

            const response = await axios.post(`${backendUrl}/api/image/removebg`, formData, { headers: { token, } })
            console.log("Remove BG Response:", response.data)
            
            if (response.data.success) {
                setResultImage(response.data.resultImage)
                response.data.creditBalance && setCredit(response.data.creditBalance)
                toast.success("Background removed successfully")
            }
            else {
                toast.error(response.data.message)
                response.data.creditBalance && setCredit(response.data.creditBalance)
                if(response.data.creditBalance===0){
                    navigate('/buycredits')
                }
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Load credit data when user is authenticated and Clerk is loaded
    useEffect(() => {
        if (isLoaded && isSignedIn) {
            loadCreditData()
        }
    }, [isLoaded, isSignedIn])

    const value = {
        credit, setCredit, loadCreditData, backendUrl
        , image, setImage, removebg,resultImage, setResultImage
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider