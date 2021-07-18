// Hook do NextJS
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { GetServerSideProps } from 'next';
import { decode } from 'jsonwebtoken';

export default function LoginScreen() {
  const router = useRouter();
  const [githubUser, setGithubUser] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    fetch('https://alurakut.vercel.app/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  
        },
        body: JSON.stringify({ githubUser })
    })
    .then(async (responseFromServer) => {
        const response = await responseFromServer.json()
        const token = response.token;
        nookies.set(null, 'USER_TOKEN', token, {
            path: '/',
            maxAge: 86400 * 7 
        })
        router.push('/dashboard')
    })
  }

  return (
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
          <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
          <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
        </section>

        <section className="formArea">
          <form className="box" onSubmit={handleSubmit}>
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
          </p>
            <input
                placeholder="Usuário"
                value={githubUser}
                onChange={event => setGithubUser(event.target.value)}
            />
            {githubUser.length === 0 && 'Preencha o campo'}
            <button type="submit">
              Login
            </button>
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong>
                  ENTRAR JÁ
              </strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  )
} 

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = nookies.get(ctx, 'USER_TOKEN').USER_TOKEN;

  const { isAuthenticated } = await fetch('http://localhost:3000/api/auth', { 
    headers: { 
      Authorization: token,
    }
  }).then(response => response.json());

  if (isAuthenticated) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      }
    }
  }


  return {
    props: {
      
    }
  }
}