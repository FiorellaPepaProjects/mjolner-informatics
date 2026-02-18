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
        if (id == undefined || isNaN(Number(id))) {
            setErrorMessage('No character specified');
            setLoading(false);
            return;
        }

        setLoading(true);
        setErrorMessage('');

        try {
            const characterDetail = await getCharacterDetail(Number(id));
            setCharacter(characterDetail);
        } catch (err: any) {
            setErrorMessage(err.message);
        } finally {
            setLoading(false);
        }
    };

    const goToHomePage = () => {
        navigate('/');
    };

    useEffect(() => {
        getCurrentCharacterDetail();
    }, [id]);

    if (loading) {
        return <Spinner />;
    }

    if (errorMessage) {
        return (
            <div className='flex flex-col justify-center items-center h-[calc(100vh-64px)] w-full gap-6'>
                <div>{errorMessage}</div>
                <div className='flex gap-6'>
                    <Button type='secondary' onClick={getCurrentCharacterDetail}>Try again</Button>
                    <Button onClick={goToHomePage}>Go home</Button>
                </div>
            </div>
        );
    }

    return (
        <div className='p-6'>
            <div className='pb-6'>
                <Button onClick={goToHomePage}>Go back</Button>
            </div>

            {!!character && (
                <div className='flex flex-col w-full gap-6'>
                    <div className='flex flex-row justify-between items-start w-full gap-6'>
                        <div className='flex flex-row gap-4 items-center'>
                            <img src={character.imageUrl} alt={character.name} className='w-16 h-16 object-cover rounded-full' />
                            <h3 className='font-bold text-gray-900 text-lg'>{character.name}</h3>
                        </div>

                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-start'>
                        <Card>
                            <div className='p-6 flex flex-col justify-between items-center gap-4'>
                                <h3 className='font-bold text-gray-900 text-lg'>Filmography</h3>
                                <div className='flex flex-col items-center justify-center gap-2 text-center'>
                                    {!!character.films.length && (
                                        <div className='gap-2'>
                                            <div className='underline'>Films</div>
                                            <div>{character.films.join(', ')}</div>
                                        </div>
                                    )}
                                    {!!character.shortFilms.length && (
                                        <div className='gap-2'>
                                            <div className='underline'>Short films</div>
                                            <div>{character.shortFilms.join(', ')}</div>
                                        </div>
                                    )}
                                    {!!character.tvShows.length && (
                                        <div className='gap-2'>
                                            <div className='underline'>TV shows</div>
                                            <div>{character.tvShows.join(', ')}</div>
                                        </div>
                                    )}
                                    {!!character.videoGames.length && (
                                        <div className='gap-2'>
                                            <div className='underline'>Videogames</div>
                                            <div>{character.videoGames.join(', ')}</div>
                                        </div>
                                    )}

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
                                    <div className='gap-2'>
                                        <div className='underline'>Allies</div>
                                        {!!character.allies.length && (<div>{character.allies.join(', ')}</div>)}
                                        {!character.allies.length && (
                                            <div className='text-gray-400'>No allies</div>
                                        )}
                                    </div>
                                    <div className='gap-2'>
                                        <div className='underline'>Enemies</div>
                                        {!!character.enemies.length && (<div>{character.enemies.join(', ')}</div>)}
                                        {!character.enemies.length && (
                                            <div className='text-gray-400'>No enemies</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CharacterDetail;
