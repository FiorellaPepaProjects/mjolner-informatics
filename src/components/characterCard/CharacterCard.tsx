import Button from '../button/Button';

export interface Character {
    // Main info
    _id: number;
    name: string;
    imageUrl: string;
    // Filmography
    films: string[];
    shortFilms: string[];
    tvShows: string[];
    videoGames: string[];
    // Others
    parkAttractions: string[];
    // Related characters
    allies: string[];
    enemies: string[];
    // Source info
    sourceUrl: string;
    createdAt: string;
    updatedAt: string;
    url: string;
    __v: number;
}

interface CharacterProps {
    character: Character;
}

function CharacterCard(props: CharacterProps) {
    const goToCharacterDetails = (characterId: number): void => {
        // TODO: add routing to CharacterDetail
    };

    return (
        <Card>
            <div className='aspect-square overflow-hidden'>
                <img src={props.character.imageUrl} alt={props.character.name} className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105' />
            </div>
            <div className='p-6 flex flex-col justify-between items-center gap-4'>
                <h3 className='font-bold text-gray-900 text-lg'>{props.character.name}</h3>
                <Button onClick={() => goToCharacterDetails(props.character._id)}>See more</Button>
            </div>
        </Card>
    );
}

export default CharacterCard;
