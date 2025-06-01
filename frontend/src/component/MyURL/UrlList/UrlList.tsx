import React, { useState, useEffect } from 'react';
import UrlItem from '../UrlItem/UrlItem';
import './UrlList.css';
import Modal from '../../Modal/Modal';
import type { URLInfo } from '../../../types/URLInfo';
import { addURL, deleteURL, editURL, getURLList } from '../../../services/UrlService';

interface UrlData {
    _id: string;
    name:string;
    originalUrl: string;
    shortenedUrl: string;
    clicks:number;
    createdAt: string;
}

const UrlList: React.FC = () => {
    const [query,setQuery] = useState("")
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [modalOriginalURL, setModalOriginalURL] = useState("")
    const [modalShortenedURL, setModalShortenedURL] = useState("")
    const [modalURLName, setModalURLName] = useState("")
    const [URLList, setURLList] = useState<URLInfo[]>([])
    const [URLToEdit, setURLToEdit] = useState("")
    const [getURLError,setGetURLError] = useState(false)

    const fetchURLs = async() => {
        try{
            setLoading(true)
            const urlList =await getURLList();
            setURLList(urlList)
        }catch(error){
            setGetURLError(true)
            console.error('Error fetching URLs:' , error)
        }finally{
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchURLs();

    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteURL(id);
            
            setURLList(URLList.filter(url => url._id !== id));
            
            console.log('URL deleted successfully');
        } catch (error) {
            console.error('Failed to delete URL:', error);
            alert('Failed to delete URL. Please try again.');
        } 
    };
 
    const filteredUrls = URLList.filter(url=> 
        url.name.toLowerCase().includes(query.toLowerCase())
    )

    const handleIsModalOpen = () => {
        setIsAddModalOpen(!isAddModalOpen)
    }

    const handleSubmitAddURL = async (e:React.FormEvent) => {
        e.preventDefault(); 
    
        try {
            if (!modalURLName.trim() || !modalOriginalURL.trim() || !modalShortenedURL.trim()) {
                alert('Please fill in all fields');
                return;
            }

            const urlData = {
                name: modalURLName,
                originalUrl: modalOriginalURL,
                shortenedUrl: modalShortenedURL
            };

            const result = await addURL(urlData);
            
            setURLList([result, ...URLList]); 

            setModalURLName("");
            setModalOriginalURL("");
            setModalShortenedURL("");
            setIsAddModalOpen(false);
            
            console.log('URL added successfully:', result);
        } catch (error) {
            console.error('Failed to add URL:', error);
            alert('Failed to add URL. Please try again.');
        } 
    }

    const handleIsEditModalOpen = (URLName:string,OriginalURL:string,ShortenedURL:string,URLId:string) => {
        setModalURLName(URLName);
        setModalOriginalURL(OriginalURL);
        setModalShortenedURL(ShortenedURL);
        setURLToEdit(URLId);
        setIsEditModalOpen(!isEditModalOpen)
    }

    const handleSubmitEditURL = async (e:React.FormEvent) => {
        e.preventDefault(); 
    
        try {
            if (!modalURLName.trim() || !modalOriginalURL.trim() || !modalShortenedURL.trim()) {
                alert('Please fill in all fields');
                return;
            }

            const urlData = {
                name: modalURLName,
                originalUrl: modalOriginalURL,
                shortenedUrl: modalShortenedURL
            };

            const result = await editURL(urlData, URLToEdit);
            
            setURLList(URLList.map(url => 
                url._id === URLToEdit ? result : url
            ));


            setModalURLName("");
            setModalOriginalURL("");
            setModalShortenedURL("");
            setIsEditModalOpen(false);
            
            console.log('URL edited successfully:', result);
        } catch (error) {
            console.error('Failed to edit URL:', error);
            alert('Failed to edit URL. Please try again.');
        } 
    }

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
                <div className="url-list-loading">Loading URLs...</div>
            </div>
    );
    }

    return (
        <div className="url-list-container">
            <h2 className="url-list-title">Your URLs</h2>
            
            <div className = "buttons">
                <input 
                    className="search-bar" 
                    placeholder= "Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    type="text"/>
                <button className = "add-URL-button" onClick={handleIsModalOpen}> 
                    Add URL 
                </button>
            </div>

            <div className="table-scroll-wrapper">
                <div className="url-grid">
                    <div className="grid-header">
                        <div className="header-cell">Name</div>
                        <div className="header-cell">Original URL</div>
                        <div className="header-cell">Short URL</div>
                        <div className="header-cell">Clicks</div>
                        <div className="header-cell">Created</div>
                        <div className="header-cell">Actions</div>
                    </div>

                    <div className="grid-body">
                        {URLList.length === 0 ? (
                            <div className="empty-state">
                                <p>No URLs found. Create your first short URL!</p>
                            </div>
                        ) : (
                            filteredUrls.map((url) => (
                                <UrlItem 
                                    key={url._id}
                                    url={url}
                                    onDelete={handleDelete}
                                    onEditClick={handleIsEditModalOpen}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>


            <Modal isOpen={isAddModalOpen} onClose={handleIsModalOpen} header="Add URL">
                <form onSubmit={handleSubmitAddURL}>
                    <div className="url-input-group">
                        <input 
                            placeholder="URL Name"
                            value={modalURLName}
                            onChange={(e) => setModalURLName(e.target.value)}
                            type="text"/>
                        <input 
                            placeholder="Original URL"
                            value={modalOriginalURL}
                            onChange={(e) => setModalOriginalURL(e.target.value)}
                            type="text"/>
                        <input 
                            placeholder="Shortened URL"
                            value={modalShortenedURL}
                            onChange={(e) => setModalShortenedURL(e.target.value)}
                            type="text"/>
                        <button type="submit" className="url-input-button">
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>

            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} header="Edit URL">
                <form onSubmit={handleSubmitEditURL}>
                    <div className="url-input-group">
                        <input 
                            placeholder="URL Name"
                            value={modalURLName}
                            onChange={(e) => setModalURLName(e.target.value)}
                            type="text"/>
                        <input 
                            placeholder="Original URL"
                            value={modalOriginalURL}
                            onChange={(e) => setModalOriginalURL(e.target.value)}
                            type="text"/>
                        <input 
                            placeholder="Shortened URL"
                            value={modalShortenedURL}
                            onChange={(e) => setModalShortenedURL(e.target.value)}
                            type="text"/>
                        <button type="submit" className="url-input-button">
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default UrlList;