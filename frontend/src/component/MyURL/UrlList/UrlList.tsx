import React, { useState, useEffect } from 'react';
import UrlItem from '../UrlItem/UrlItem';
import './UrlList.css';
import Modal from '../../Modal/Modal';

interface UrlData {
    _id: string;
    name:string;
    originalUrl: string;
    shortenedUrl: string;
    clicks:number;
    createdAt: string;
}

const UrlList: React.FC = () => {
    const [urls, setUrls] = useState<UrlData[]>([]);
    const [query,setQuery] = useState("")
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalOriginalURL, setModalOriginalURL] = useState("")
    const [modalShortenedURL, setModalShortenedURL] = useState("")
    const [modalURLName, setModalURLName] = useState("")

    useEffect(() => {
        const mockUrls: UrlData[] = [
            {
                _id: '1',
                name: "Google Homepage",
                originalUrl: 'https://www.google.com',
                shortenedUrl: 'abc123',
                clicks: 1547,
                createdAt: '2024-01-15T10:30:00Z'
            },
            {
                _id: '2',
                name: "YouTube",
                originalUrl: 'https://www.youtube.com',
                shortenedUrl: 'xyz789',
                clicks: 892,
                createdAt: '2024-01-14T15:45:00Z'
            },
            {
                _id: '3',
                name: "GitHub",
                originalUrl: 'https://www.github.com',
                shortenedUrl: 'def456',
                clicks: 2134,
                createdAt: '2024-01-13T09:15:00Z'
            },
            {
                _id: '4',
                name: "Stack Overflow",
                originalUrl: 'https://stackoverflow.com',
                shortenedUrl: 'ghi789',
                clicks: 456,
                createdAt: '2024-01-12T14:20:00Z'
            },
            {
                _id: '5',
                name: "React Documentation",
                originalUrl: 'https://react.dev',
                shortenedUrl: 'jkl012',
                clicks: 763,
                createdAt: '2024-01-11T11:45:00Z'
            },
            {
                _id: '6',
                name: "TypeScript Handbook",
                originalUrl: 'https://www.typescriptlang.org/docs',
                shortenedUrl: 'mno345',
                clicks: 1289,
                createdAt: '2024-01-10T16:30:00Z'
            },
            {
                _id: '7',
                name: "MDN Web Docs",
                originalUrl: 'https://developer.mozilla.org',
                shortenedUrl: 'pqr678',
                clicks: 345,
                createdAt: '2024-01-09T13:15:00Z'
            },
            {
                _id: '8',
                name: "CSS Tricks",
                originalUrl: 'https://css-tricks.com',
                shortenedUrl: 'stu901',
                clicks: 967,
                createdAt: '2024-01-08T10:00:00Z'
            },
            {
                _id: '9',
                name: "npm Registry",
                originalUrl: 'https://www.npmjs.com',
                shortenedUrl: 'vwx234',
                clicks: 234,
                createdAt: '2024-01-07T15:30:00Z'
            },
            {
                _id: '10',
                name: "VS Code",
                originalUrl: 'https://code.visualstudio.com',
                shortenedUrl: 'yza567',
                clicks: 1876,
                createdAt: '2024-01-06T12:45:00Z'
            }
        ];
        
        setTimeout(() => {
            setUrls(mockUrls);
            setLoading(false);
        }, 1000);
    }, []);

    const handleDelete = (id: string) => {
        setUrls(urls.filter(url => url._id !== id));
    };
 
    const filteredUrls = urls.filter(url=> 
        url.name.toLowerCase().includes(query.toLowerCase())
    )

    const handleIsModalOpen = () => {
        setIsModalOpen(!isModalOpen)
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
                        {urls.length === 0 ? (
                            <div className="empty-state">
                                <p>No URLs found. Create your first short URL!</p>
                            </div>
                        ) : (
                            filteredUrls.map((url) => (
                                <UrlItem 
                                    key={url._id}
                                    url={url}
                                    onDelete={handleDelete}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>


            <Modal isOpen={isModalOpen} onClose={handleIsModalOpen} header="Add URL">
                <form>
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