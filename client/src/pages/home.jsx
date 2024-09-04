import { useState, useEffect } from "react";
import "./home.css";
import { useFetch } from "../components/context/fetch";
import { Slider } from "../components/slider";
import { Footer } from "../components/footer";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../components/firebase";

export const Home = () => {
    const { data } = useFetch();
    const [contador, setContador] = useState(0);
    const [imagesList, setImagesList] = useState([]);
    const [homeImagesList, setHomeImagesList] = useState([]);
    
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const imagesRef = ref(storage, "posters");
                const listResult = await listAll(imagesRef);
                const urls = await Promise.all(listResult.items.map((itemRef) => getDownloadURL(itemRef)));
                setImagesList(urls);
            } catch (error) {
                console.error('Error al listar archivos en Firebase Storage:');
            }
        };

        fetchImages();

        const fetchHomeImages = async () => {
            try {
                const imagesRef = ref(storage, "home");
                const listResult = await listAll(imagesRef);
                const urls = await Promise.all(listResult.items.map((itemRef) => getDownloadURL(itemRef)));
                setHomeImagesList(urls);
            } catch (error) {
                console.error('Error al listar archivos en Firebase Storage:');
            }
        };

        fetchHomeImages();
    }, []);

    const imagesHome = homeImagesList.map((image, index) => (
        <div className="home-main" key={index}>
            <img src={image} alt="fondo" className="background-image" style={{backgroundSize: '100% 100'}} />
        </div>
    ));

    useEffect(() => {
        const interval = setInterval(() => {
            setContador((prev) => (prev === 0 ? imagesHome.length - 1 : prev - 1));
        }, 10000);

        return () => clearInterval(interval);
    }, [imagesHome.length]);

    const handlePrevious = () => {
        setContador((prev) => (prev === 0 ? imagesHome.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setContador((prev) => (prev === imagesHome.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="home-container">
            <div className="slider-wrapper">
                <button className="slider-button" id="previous-home" onClick={handlePrevious}>
                    <span className="material-symbols-outlined">arrow_back_ios</span>
                </button>

                {imagesHome[contador]}

                <button className="slider-button" id="next-home" onClick={handleNext}>
                    <span className="material-symbols-outlined">arrow_forward_ios</span>
                </button>
            </div>
            <div className="caja2">
                <Slider array={imagesList} />
            </div>
            <Footer />
        </div>
    );
};
