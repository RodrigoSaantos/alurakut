import { Box, MainGrid, ProfileRelationsBoxWrapper } from '../styles/home';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../lib/AluraCommons';

interface ProfileSidebarProps {
  userName: string;
}

function ProfileSidebar({ userName }: ProfileSidebarProps) {
  return (
    <Box>
      <img src={`https://github.com/${userName}.png`} style={{ borderRadius: '8px'}} />
    </Box>
  )
}

export default function Home() {
  const githubUser = 'rodrigosaantos';

  const friends = [
    'rodrigosaantos',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'

  ]

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
          <Box>
            Comunidade
          </Box>
        </div>
      </MainGrid>
    </>
  )
}
