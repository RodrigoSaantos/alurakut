import { FormEvent, useEffect, useState } from 'react';
import { Box, MainGrid, ProfileRelationsBoxWrapper } from '../styles/home';
import { 
  AlurakutMenu, 
  AlurakutProfileSidebarMenuDefault, 
  OrkutNostalgicIconSet
} from '../lib/AluraCommons';
import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import { decode } from 'jsonwebtoken';

interface ProfileSidebarProps {
  userName: string;
}

interface ProfileRelationsBoxProps {
  title: string;
  items: Array<object>;
}

interface HomeProps{
  githubUser: string
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

// function ProfileRelationBox({ title, items }: ProfileRelationsBoxProps) {
//   return (
//     <ProfileRelationsBoxWrapper>
//       <h2 className="smallTitle">
//         {title} ({items.length})
//       </h2>

//       <ul>
//         {items.map((items) => {
//           return (
//             <li key={items}>
//               <a href={`/users/${items}`}>
//                 <img src={`https://github.com/${items}.png`} />
//                 <span>{items}</span>
//               </a>
//             </li>
//           )
//         })}

//       </ul>
//     </ProfileRelationsBoxWrapper>
//   )
// }

export default function Home({ githubUser }: HomeProps) {
  const [imageURL, setImageURL] = useState('');
  const [communityName, setCommunityName] = useState('');
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'authorization': process.env.NEXT_PUBLIC_API_COMMUNITIES,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ "query": `
        query {
          allCommunities {
            id
            title
            imageUrl
            creatorSlug
            _status
            _firstPublishedAt
          }
        
          _allCommunitiesMeta {
            count
          }
        }
        ` 
      })
    })
      .then(response => response.json())
      .then(response => setCommunities(response.data.allCommunities))
  }, []);

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
      title: communityName,
      image_url: imageURL,
      creator_slug: githubUser,
    }

    fetch('/api/community', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(community),
    }).then(async response => {
      // const data = await response.json();
      // console.log({data});
      const newCommunities = [...communities, community];
      setCommunities(newCommunities);
      setCommunityName('')
      setImageURL('')
    })


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
            <h2 className="subTitle">O que voc?? deseja fazer</h2>
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
          {/* <ProfileRelationBox title="Amigos" items={friends}   /> */}
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
                    <a href={`/community/${community.id}`}>
                      <img src={community.imageUrl} />
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = nookies.get(ctx, 'USER_TOKEN').USER_TOKEN;

  const { isAuthenticated } = await fetch('http://localhost:3000/api/auth', { 
    headers: { 
      Authorization: token,
    }
  }).then(response => response.json());

  console.log(isAuthenticated);

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const githubUser = decode(token, { complete: true }).payload.githubUser;

  return {
    props: {
      githubUser,
    }
  }
}
