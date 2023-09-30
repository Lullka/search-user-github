const InputUserSearch = document.getElementById("userSearch");
const informationContainer = document.getElementById("informationContainer");
const SearchButton = document.getElementById("searchButton");
const AreaUsername = document.getElementById("username");
const AreaName = document.getElementById("name");
const AreaBio = document.getElementById("bio");
const TagIMG = document.getElementById('userIMG');
const LeftButton = document.getElementById("leftButton");
const goToPerfil = document.getElementById('goToPerfil');


function RequestAPI(name){
  return new Promise((resolve, reject) => {
    fetch(`https://api.github.com/users/${name}`)
    .then(res => {
      res.json().then(data => {
        if(res.status != 200) return reject(res.status);
        resolve(data);
      })
    }).catch(err => {
      reject(err);
    });
  })
}

async function Execute(){
  informationContainer.classList.remove('active');
  await RequestAPI(InputUserSearch.value).then(data => {
    AreaName.innerText = data.name;
    AreaUsername.innerText = data.login;
    if(data.bio == null){
      AreaBio.innerText = `Não há biografia`;
    }else{
      AreaBio.innerText = `"${data.bio}"`;
    }
    goToPerfil.href = data.html_url;
    TagIMG.src = data.avatar_url;
    informationContainer.classList.add('active');
  }).catch(err => {
    console.log("Código de erro: " + err);
    InputUserSearch.innerText = "Houve um erro ao pesquisar";
  })
}

SearchButton.addEventListener('click', () => Execute());
InputUserSearch.addEventListener('keydown', (event) => {
   if(event.keyCode == '13') Execute();
});
LeftButton.addEventListener('click', () => {
  informationContainer.classList.remove('active');
  TagIMG.src = "https://img.freepik.com/icones-gratis/do-utilizador_318-159711.jpg?w=2000";
});