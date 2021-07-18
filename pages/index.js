import React from 'react'
import MainGrid from "../src/components/MainGrid"
import Box from "../src/components/Box"
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault ,OrkutNostalgicIconSet} from "../src/lib/AluraCommons"
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations"

function ProfileSidebar(item){
  return(
    <Box as="aside">
      <img src={`https://github.com/${item.githubUser}.png`} style={{borderRadius:'8px'}} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github/${item.githubUser}`}>
          @{item.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {

  const [comunidades, setComunidades] = React.useState([{
    id: '12345',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);

  const githubUser = 'gabyrlsilva';
  const pessoasFavoritas = [
    'juunegreiros', 
    'omariosouto', 
    'peas', 
    'rafaballerini', 
    'marcobrunodev', 
    'felipefialho'
  ]

  return(
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
        <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>
            <OrkutNostalgicIconSet/>
          </Box>

          <Box>

            <h2 className="subTitle"> O que você deseja fazer? </h2>
            <form onSubmit={function handle(e){
              e.preventDefault();

              const dadosForm = new FormData(e.target);
              const comunidade = {
                id: new Date().toISOString(),
                title: dadosForm.get('title'),
                image: dadosForm.get('image'),
              }
              const comunidadeAtualizada = [...comunidades, comunidade];
              setComunidades(comunidadeAtualizada)

            }}>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade?" 
                />
              </div>
              <div>
                <input 
                  placeholder="Coloque uma URL para usarmos de capa" 
                  name="image" 
                  aria-label="Coloque uma URL para usarmos de capa" 
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>

          </Box>

        </div>
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                  
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({comunidades.length})
            </h2>

            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`} >
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
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
