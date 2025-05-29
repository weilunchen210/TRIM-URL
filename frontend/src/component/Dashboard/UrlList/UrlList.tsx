import React, { useState, useEffect } from 'react';
import UrlItem from '../UrlItem/UrlItem';
import './UrlList.css';

interface UrlData {
    _id: string;
    originalUrl: string;
    shortenedUrl: string;
    createdAt: string;
}

const UrlList: React.FC = () => {
    const [urls, setUrls] = useState<UrlData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const mockUrls: UrlData[] = [
            {
                _id: '1',
                originalUrl: 'google.com',
                shortenedUrl: 'abc123',
                createdAt: '2024-01-15T10:30:00Z'
            },
            {
                _id: '2',
                originalUrl: 'google.com2',
                shortenedUrl: 'xyz789',
                createdAt: '2024-01-14T15:45:00Z'
            },
            {
                _id: '3',
                originalUrl: 'google.com3',
                shortenedUrl: 'def456',
                createdAt: '2024-01-13T09:15:00Z'
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

    if (loading) {
        return <div className="url-list-loading">Loading URLs...</div>;
    }

    return (
        <div className="url-list-container">
            <h2 className="url-list-title">Your URLs</h2>
            
            <div className="url-grid">
                <div className="grid-header">
                    <div className="header-cell">Original URL</div>
                    <div className="header-cell">Short URL</div>
                    <div className="header-cell">Created</div>
                    <div className="header-cell">Actions</div>
                </div>

                <div className="grid-body">
                    {urls.length === 0 ? (
                        <div className="empty-state">
                            <p>No URLs found. Create your first short URL!</p>
                        </div>
                    ) : (
                        urls.map((url) => (
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
    );
};

export default UrlList;