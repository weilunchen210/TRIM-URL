// backend/src/services/safeBrowsingService.ts
import axios from 'axios';
import dotenv from 'dotenv'

const GOOGLE_API_KEY = process.env.GOOGLE_SAFE_BROWSING_API_KEY;
const SAFE_BROWSING_URL = 'https://safebrowsing.googleapis.com/v4/threatMatches:find';

interface ThreatMatch {
    threatType: string;
    platformType: string;
    threat: {
        url: string;
    };
}

interface SafeBrowsingResponse {
    matches?: ThreatMatch[];
}

export interface SafetyCheckResult {
    isSafe: boolean;
    threats?:string[];
}

export class SafeBrowsingService {
    async checkUrl(url: string): Promise<SafetyCheckResult> {
        try {
            const GOOGLE_API_KEY = process.env.GOOGLE_SAFE_BROWSING_API_KEY;
            console.log(GOOGLE_API_KEY)
            if (!GOOGLE_API_KEY || GOOGLE_API_KEY === 'your_api_key_here') {
                console.warn('Google Safe Browsing API key not configured properly');
                return { 
                    isSafe: false,
                    threats:["API key not configured"]
                };
            }

            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
            }

            const requestBody = {
                client: {
                    clientId: "TRIM-URL",
                    clientVersion: "1.0.0"
                },
                threatInfo: {
                    threatTypes: [
                        "MALWARE",
                        "SOCIAL_ENGINEERING", 
                        "UNWANTED_SOFTWARE",
                        "POTENTIALLY_HARMFUL_APPLICATION"
                    ],
                    platformTypes: ["ANY_PLATFORM"],
                    threatEntryTypes: ["URL"],
                    threatEntries: [
                        { url }
                    ]
                }
            };

            const response = await axios.post<SafeBrowsingResponse>(
                `${SAFE_BROWSING_URL}?key=${GOOGLE_API_KEY}`,
                requestBody,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    timeout: 10000
                }
            );

            const matches = response.data.matches || [];
            
            if (matches.length > 0) {
                const threats = matches.map((match:ThreatMatch) => match.threatType);
                console.log(`⚠️  Threats detected for ${url}:`, threats);
                
                return { 
                    isSafe: false,
                    threats:threats
                };
            }

            console.log(`✅ URL is safe: ${url}`);
            return { 
                isSafe: true
            };

        } catch (error) {
            console.error('Safe Browsing API error:', error.response?.data || error.message);
            
            if (error.response?.status === 403) {
                console.error('🔑 API Key error - check your Google Safe Browsing API key');
            }
            return { 
                isSafe: false,
                threats:["API key not configured"]
            };
        }
    }
}

export const safeBrowsingService = new SafeBrowsingService();