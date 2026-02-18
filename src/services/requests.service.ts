import { Character } from '../components/characterCard/CharacterCard';
import { Pagination } from '../components/paginator/Paginator';

export const getCharacters = async (url: string): Promise<{ data: Character[]; info: Pagination; }> => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Error on getting all characters');
        }

        return await response.json();
    } catch (err) {
        console.error(err);
        throw new Error('Error on getting all characters');
    }
};

export const getCharacterDetail = async (characterId: Character['_id']): Promise<Character> => {
    try {
        const response = await fetch(`https://api.disneyapi.dev/character/${characterId}`);

        if (!response.ok) {
            throw new Error('Error on getting character\'s information');
        }

        const parsedResponse = await response.json();
        
        return parsedResponse.data;
    } catch (err) {
        console.error(err);
        throw new Error('Error on getting character\'s information');
    }
};