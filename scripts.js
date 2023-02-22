document.addEventListener("DOMContentLoaded", function (e) {
  const TEAMS_URL = 'https://docs.google.com/spreadsheets/d/1DgYa6Xqm_V03Zfp6_pk0_19JMV4_FHlbnwAUg9TTDqw/pub?gid=93065932&single=true&output=csv';
  const PLAYERS_URL = 'https://docs.google.com/spreadsheets/d/1DgYa6Xqm_V03Zfp6_pk0_19JMV4_FHlbnwAUg9TTDqw/pub?gid=2082302886&single=true&output=csv';

  let initialList = {};
  let itemsProcessed = 0;

  function getClubs() {
    Papa.parse(TEAMS_URL, {
      download: true,
      header: true,
      complete: createClubs
    })
  }

  function getPlayers() {
    Papa.parse(PLAYERS_URL, {
      download: true,
      header: true,
      complete: createList
    })
  }

  function createClubs(results) {
    let data = results.data;
    let containerNav = document.getElementsByClassName('clubs')[0];
    containerNav.innerHTML = data.map(el => {
      itemsProcessed++;
      console.log(itemsProcessed);
      return `    
      <div data-name='${el.clubname}' data-cod='${el.cod}' class='club'> 
        <img src='https://clarin.com/redaccionfiler/clarin/desarrollo/2023/deportes/superliga/escudos/${el.shield}'>
        <div class="club__info">
          <h3>${el.clubname}</h3>
          <div class="club__meta">
            <p class="--titles"><span>Titulos: </span>${el.titulos}</p> 
            <p class="--dt"><span>DT: </span>${el.dt}</p>
          </div>
        </div>
        <a><span class="club__icon">Ver plantel</span> <span class="club__total">${el.plantel}</span></a>
      </div>
    `;
    }).join('');

    const checkItems = itemsProcessed === data.length;
    checkItems ? initSlide() : false;
  }

  const createList = (results, item) => {
    let data = results.data;

    // console.log('data', data);

    initialList = Object.assign(data);

    const filteredList = data.filter(el => el.cod === 'arg');
    const containerList = document.querySelector('.plantel__table tbody');

    containerList.innerHTML = filteredList.map(el => {
      return `<tr>
      <td class="td__name"><span>${el.apellido}, ${el.nombre}  </span> 
      ${el.fecha_nac}<br /> <small>${el.ciudad}, ${el.provincia}, ${el.pais} </small></td>
      <td class="td__position">${el.puesto}</td> 
      <td class="td__goles td__totales">${el.total_pj}</td> 
      <td class="td__goles td__totales">${el.total_g}</td> 
      <td class="td__goles">${el.liga_pj}</td> 
      <td class="td__goles">${el.liga_g}</td>        
      <td class="td__goles">${el.liga2023_pj}</td> 
      <td class="td__goles">${el.liga2023_g}</td>       			
      <td class="td__goles">${el.copaloc_pj}</td> 
      <td class="td__goles">${el.copaloc_g}</td>       			
      <td class="td__goles">${el.copaint_pj}</td> 
      <td class="td__goles">${el.copaint_g}</td>       			
      <td class="td__goles">${el.ascenso_pj}</td> 
      <td class="td__goles">${el.ascenso_g}</td>       			
      <td class="td__goles">${el.ext_pj}</td> 
      <td class="td__goles">${el.ext_g}</td>          			
      <td class="td__goles">${el.sel_pj}</td> 
      <td class="td__goles">${el.sel_g}</td>         			     			
    </tr>
  `;
    }).join('');
  }

  const createList2 = (results, item) => {
    let data = results;

    // console.log('data', data);

    initialList = Object.assign(data);

    const filteredList = data.filter(el => el.cod === item);
    const containerList = document.querySelector('.plantel__table tbody');

    containerList.innerHTML = filteredList.map(el => {
      return `<tr>
      <td class="td__name"><span>${el.apellido}, ${el.nombre}  </span> 
      <small>${el.fecha_nac}</small><br /> <small>${el.ciudad}, ${el.provincia}, ${el.pais} </small></td>
      <td class="td__position">${el.puesto}</td> 
      <td class="td__goles td__totales">${el.total_pj}</td> 
      <td class="td__goles td__totales">${el.total_g}</td> 
      <td class="td__goles">${el.liga_pj}</td> 
      <td class="td__goles">${el.liga_g}</td>        
      <td class="td__goles">${el.liga2023_pj}</td> 
      <td class="td__goles">${el.liga2023_g}</td>       			
      <td class="td__goles">${el.copaloc_pj}</td> 
      <td class="td__goles">${el.copaloc_g}</td>       			
      <td class="td__goles">${el.copaint_pj}</td> 
      <td class="td__goles">${el.copaint_g}</td>       			
      <td class="td__goles">${el.ascenso_pj}</td> 
      <td class="td__goles">${el.ascenso_g}</td>       			
      <td class="td__goles">${el.ext_pj}</td> 
      <td class="td__goles">${el.ext_g}</td>          			
      <td class="td__goles">${el.sel_pj}</td> 
      <td class="td__goles">${el.sel_g}</td>  
    </tr>
  `;
    }).join('');
  }

  const triggersElem = () => {
    const triggersContainer = document.querySelector('.clubs');
    const triggers = document.querySelectorAll('.club');
    const main = document.querySelector('body');

    const modal = document.querySelector('.js-modal');
    const modal_close = document.querySelector('.js-close');

    triggersContainer.addEventListener('click', (e) => {
      main.classList.add('--static');
      modal.classList.add('--active');

      // h3
      const nombre = e.target.dataset.name;
      const imagen = e.target.dataset.cod.toUpperCase();
      document.querySelector('.plantel__header').innerHTML = ` 
      <img src='https://www.clarin.com/redaccionfiler/clarin/desarrollo/2020/deportes/superliga/escudos/${imagen}.svg'>
      <h3>${nombre}</h3>  
    `;

      console.log('aaaa', initialList)
      createList2(initialList, e.target.dataset.cod);
    }, false);


    // Close
    modal_close.addEventListener('click', (e) => {
      main.classList.remove('--static');
      modal.classList.remove('--active');

    }, false);

  }

  const initSlide = () => {
    console.log('Render done!');
    document.querySelector('.spinner-box').style.opacity = 0;
    document.querySelector('.circle-border').style.animation = 'none';
    itemsProcessed = 0;
    getPlayers();
  }
  triggersElem();
  getClubs();

});