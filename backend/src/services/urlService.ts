import { UrlDto } from '../dto/UrlDto.js';
import { toUrlResponse } from '../dto/urlResponse.js';
import { isUuid, isUniqueViolation } from '../db.js';
import { UrlRepository } from '../repositories/urlRepository.js';
import { safeBrowsingService, SafetyCheckResult } from './urlCheckService.js';

const DUPLICATE_SHORTENED_URL = 'Shortened URL already exists';

export class urlService {

    constructor(private readonly urlRepository = new UrlRepository()) {}

    async save(input: UrlDto, userId: string) {

        if (!input.originalUrl.startsWith('http://') && !input.originalUrl.startsWith('https://')) {
            input.originalUrl = 'https://' + input.originalUrl;
        }

        await this.validateIfShortenedUrlExists(input.shortenedUrl);

        await this.assertSafe(input.originalUrl);

        try {
            const url = await this.urlRepository.create({
                name: input.name,
                originalUrl: input.originalUrl,
                shortenedUrl: input.shortenedUrl,
                userId,
            });
            return toUrlResponse(url);
        } catch (error) {
            if (isUniqueViolation(error)) throw new Error(DUPLICATE_SHORTENED_URL);
            throw error;
        }
    }

    async validateIfShortenedUrlExists(shortenedUrl: string, excludeId?: string) {
        if (await this.urlRepository.existsByShortenedUrl(shortenedUrl, excludeId)) {
            throw new Error(DUPLICATE_SHORTENED_URL);
        }
    }

    private async assertSafe(url: string) {
        const safetyCheck: SafetyCheckResult = await safeBrowsingService.checkUrl(url);
        if (!safetyCheck.isSafe) {
            const threatTypes = safetyCheck.threats?.join(', ') || 'Unknown threats';
            console.log(`URL is flagged as malicious. Threats detected: ${threatTypes} for malicious URL: ${url}`);

            throw new Error(`URL is flagged as malicious. Threats detected: ${threatTypes}`);
        }
    }

    async getOriginalLink(input: string) {
        const savedModel = await this.urlRepository.recordClick(input);

        if (!savedModel) {
            throw new Error("Shortened URL not found")
        }

        let originalUrl = savedModel.originalUrl;

        if (!originalUrl.startsWith('http://') && !originalUrl.startsWith('https://')) {
            originalUrl = 'https://' + originalUrl;
        }

        return originalUrl
    }

    async getAllUrl(userId: string) {
        const urlList = await this.urlRepository.findAllByUser(userId);
        return urlList.map(toUrlResponse);
    }

    async delete(id: string, userId: string) {
        if (!isUuid(id)) {
            throw new Error('URL not found');
        }

        const deleted = await this.urlRepository.deleteForUser(id, userId);
        if (!deleted) {
            throw new Error('URL not found');
        }
        return { message: 'URL deleted successfully' };
    }

    async update(id: string, userId: string, input: UrlDto) {
        if (!isUuid(id)) {
            throw new Error('URL not found');
        }

        const existing = await this.urlRepository.findByIdForUser(id, userId);
        if (!existing) {
            throw new Error('URL not found');
        }

        await this.validateIfShortenedUrlExists(input.shortenedUrl, id);

        await this.assertSafe(input.originalUrl);

        try {
            const result = await this.urlRepository.update(id, {
                name: input.name,
                originalUrl: input.originalUrl,
                shortenedUrl: input.shortenedUrl,
            });
            return toUrlResponse(result);
        } catch (error) {
            if (isUniqueViolation(error)) throw new Error(DUPLICATE_SHORTENED_URL);
            throw error;
        }
    }
}
