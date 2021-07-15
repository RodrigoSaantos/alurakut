import { Box, MainGrid, ProfileRelationsBoxWrapper } from '../styles/home';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../lib/AluraCommons';
import { FormEvent, useState } from 'react';

interface ProfileSidebarProps {
  userName: string;
}

function ProfileSidebar({ userName }: ProfileSidebarProps) {
  return (
    <Box>
      <img src={`https://github.com/${userName}.png`} style={{ borderRadius: '8px'}} />
      <hr />

      <p>
        <a className='boxLink' href={`http://github.com/${userName}`}>
          @{userName}
        </a>
      </p>

      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const githubUser = 'rodrigosaantos';
  const [imageURL, setImageURL] = useState('');
  const [communityName, setCommunityName] = useState('');
  const [communities, setCommunities] = useState([]);

  const friends = [
    'rodrigosaantos',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'

  ]

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const community = {
      id: new Date().toISOString(),
      title: communityName,
      image: imageURL,
    }

    const newCommunities = [...communities, community];

    setCommunities(newCommunities);

  }

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />

      <MainGrid>
        <div className='profileArea' style={{ gridArea: 'profileArea'}}>
          <ProfileSidebar userName={githubUser} />
        </div>
        <div className='welcomeArea' style={{ gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">
              Bem-vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <input 
                  type="text"
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                  value={imageURL}
                  onChange={event => setImageURL(event.target.value)}
                />
              </div>
              <div>
                <input 
                  type="text"
                  placeholder="Qual vai ser o name da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o name da sua comunidade?"
                  value={communityName}
                  onChange={event => setCommunityName(event.target.value)}
                />
              </div>

              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div className='profileRelationsArea' style={{ gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Amigos ({friends.length})
            </h2>

            <ul>
              {friends.map((friend) => {
                return (
                  <li key={friend}>
                    <a href={`/users/${friend}`}>
                      <img src={`https://github.com/${friend}.png`} />
                      <span>{friend}</span>
                    </a>
                  </li>
                )
              })}

            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidade
            </h2>

            <ul>
              {communities.map((community) => {
                return (
                  <li key={community.id}>
                    <a href={`/users/${community.title}`}>
                      <img src={community.image} />
                      <span>{community.title}</span>
                    </a>
                  </li>
                )
              })}

            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
