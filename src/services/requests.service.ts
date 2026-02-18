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