import { useEffect, useState } from 'react';
import Spinner from '../../components/spinner/Spinner';
import Button from '../../components/button/Button';
import CharacterCard, { Character } from '../../components/characterCard/CharacterCard';
import Paginator, { Pagination } from '../../components/paginator/Paginator';
import { getCharacters } from '../../services/requests.service';

function Home() {
    const [allCharacters, setAllCharacters] = useState<Character[]>([]);
    const [paginationInfo, setPaginationInfo] = useState<Pagination>();
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const getAllCharacters = async (url?: string) => {
        try {
            const characters = await getCharacters(url ?? 'https://api.disneyapi.dev/character');
            setAllCharacters(characters.data);
            setPaginationInfo(characters.info);
        } catch (err: any) {
            setErrorMessage(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllCharacters();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    if (errorMessage) {
        return (
            <div className='flex flex-col justify-center items-center h-[calc(100vh-64px)] w-full gap-6'>
                <div>{errorMessage}</div>
                <Button onClick={getAllCharacters}>Try again</Button>
            </div>
        );
    }

    return (
        <div className='flex flex-col h-[calc(100vh-115px)]'>
            <div className='flex-1 overflow-y-auto p-6'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6'>
                    {allCharacters.map((character, index) => (<CharacterCard key={`character-${index}`} character={character} />))}
                </div>
            </div>
            {!!paginationInfo && (
                <div className='border-t border-gray-100 bg-white'>
                    <Paginator pagination={paginationInfo} onPrevPage={() => getAllCharacters(paginationInfo.previousPage)} onNextPage={() => getAllCharacters(paginationInfo.nextPage)} />
                </div>
            )}
        </div>
    );
}

export default Home;
