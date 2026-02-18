import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCharacterDetail } from '../../services/requests.service';
import { Character } from '../../components/characterCard/CharacterCard';
import Spinner from '../../components/spinner/Spinner';
import Button from '../../components/button/Button';
import Card from '../../components/card/Card';

function CharacterDetail() {
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();

    const [character, setCharacter] = useState<Character>();
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    // We are not using any global state management library, so we will get the info again
    const getCurrentCharacterDetail = async () => {
        if (id == undefined) return;

        try {
            const characterDetail = await getCharacterDetail(Number(id));
            setCharacter(characterDetail);
        } catch (err: any) {
            setErrorMessage(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id !== undefined) {
            getCurrentCharacterDetail();
        }
    }, [id]);

    if (loading) {
        return <Spinner />;
    }

    if (errorMessage) {
        return (
            <div className='flex flex-col justify-center items-center h-[calc(100vh-64px)] w-full gap-6'>
                <div>{errorMessage}</div>
                <Button onClick={getCurrentCharacterDetail}>Try again</Button>
            </div>
        );
    }

    return (
        <>
            {!!character && (
                <div className='flex flex-col w-full gap-6'>
                    <div className='flex flex-row justify-between items-center w-full gap-6'>
                        <h3 className='font-bold text-gray-900 text-lg'>{character.name}</h3>
                        <Button onClick={() => navigate('/')}>Go back</Button>
                    </div>

                    <img src={character.imageUrl} alt={character.name} className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105' />

                    <Card>
                        <div className='p-6 flex flex-col justify-between items-center gap-4'>
                            <h3 className='font-bold text-gray-900 text-lg'>Filmography</h3>
                            <div className='flex flex-col items-center justify-center gap-2 text-center'>
                                {!!character.films.length && (<div>{character.films.join(', ')}</div>)}
                                {!!character.shortFilms.length && (<div>{character.shortFilms.join(', ')}</div>)}
                                {!!character.tvShows.length && (<div>{character.tvShows.join(', ')}</div>)}
                                {!!character.videoGames.length && (<div>{character.videoGames.join(', ')}</div>)}

                                {!character.films.length && !character.shortFilms.length && !character.tvShows.length && !character.videoGames.length && (
                                    <div className='text-gray-400'>This character doesn't have any filmopgrahy</div>
                                )}
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className='p-6 flex flex-col justify-between items-center gap-4'>
                            <h3 className='font-bold text-gray-900 text-lg'>Park attractions</h3>
                            <div className='flex flex-col items-center justify-center gap-2 text-center'>
                                {!!character.parkAttractions.length && (<div>{character.parkAttractions.join(', ')}</div>)}

                                {!character.parkAttractions.length && (
                                    <div className='text-gray-400'>This character doesn't have any park attractions</div>
                                )}
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className='p-6 flex flex-col justify-between items-center gap-4'>
                            <h3 className='font-bold text-gray-900 text-lg'>Allies and enemies</h3>
                            <div className='flex flex-col items-center justify-center gap-2 text-center'>
                                <div className='flex gap-2'>
                                    <div className='underline'>Allies:</div>
                                    {!!character.allies.length && (<div>{character.allies.join(', ')}</div>)}
                                    {!character.allies.length && (
                                        <div className='text-gray-400'>No allies</div>
                                    )}
                                </div>
                                <div className='flex gap-2'>
                                    <div className='underline'>Enemies:</div>
                                    {!!character.enemies.length && (<div>{character.enemies.join(', ')}</div>)}
                                    {!character.enemies.length && (
                                        <div className='text-gray-400'>No enemies</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </>
    );
}

export default CharacterDetail;
