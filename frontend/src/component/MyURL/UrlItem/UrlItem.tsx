import React from 'react';
import './UrlItem.css';
import Modal from '../../Modal/Modal';

interface UrlItemProps {
    url: {
        _id: string;
        name:string;
        originalUrl: string;
        shortenedUrl: string;
        clicks:number;
        createdAt: string;
    };
    onDelete: (id: string) => void;
    onEditClick: (URLName:string,OriginalURL:string,ShortenedURL:string,URLId:string) => void;
}

const UrlItem: React.FC<UrlItemProps> = ({ url, onDelete, onEditClick }) => {
    
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(`http://localhost:3000/url/${text}`);
            alert('Short URL copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this URL?')) {
            onDelete(url._id);
        }
    };

    return (
        <div className="url-item-grid">
            <div className="grid-cell">
                {url.name}
            </div>


            <div className="grid-cell original-url">
                <a 
                    href={url.originalUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    title={url.originalUrl}
                >
                    {url.originalUrl.length > 50 
                        ? `${url.originalUrl.substring(0, 50)}...` 
                        : url.originalUrl
                    }
                </a>
            </div>
            
            <div className="grid-cell short-url">
                <div className="short-url-container">
                    <span className="short-url-text">
                        localhost:3000/url/{url.shortenedUrl}
                    </span>
                    <button 
                        className="copy-btn"
                        onClick={() => copyToClipboard(url.shortenedUrl)}
                        title="Copy to clipboard"
                    >
                        📋
                    </button>
                </div>
            </div>

            <div className="grid-cell">
                {url.clicks}
            </div>
            
            <div className="grid-cell created-date">
                {formatDate(url.createdAt)}
            </div>

            <div className="grid-cell actions">
                <button 
                    className="edit-btn"
                    title="Edit URL"
                    onClick={() => onEditClick(url.name,url.originalUrl,url.shortenedUrl,url._id)}
                >
                    ✏️
                </button>
                <button 
                    className="delete-btn"
                    onClick={handleDelete}
                    title="Delete URL"
                >
                    🗑️
                </button>
            </div>
        </div>
    );
};

export default UrlItem;