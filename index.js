// ⚡️ Import Styles
import './style.scss';
import feather from 'feather-icons';
import { showNotification } from './modules/showNotification.js';

// ⚡️ Render Skeleton
document.querySelector('#app').innerHTML = `
<div class='app-container'>
  <div class='state-capital-lookup'>
    <h2>State Capital Lookup</h2>
    <input type='text' placeholder='Enter state name or abbreviation...' data-input=''>
    <ul data-list=''></ul>
  </div>

  <a class='app-author' href='https://github.com/nagoev-alim' target='_blank'>${feather.icons.github.toSvg()}</a>
</div>
`;

// ⚡️Create Class
class App {
  constructor() {
    this.DOM = {
      input: document.querySelector('[data-input]'),
      list: document.querySelector('[data-list]'),
    };

    this.DOM.input.addEventListener('input', this.onInput);
  }

  /**
   * @function onInput - Input change event handler
   * @param value
   * @returns {Promise<void>}
   */
  onInput = async ({ target: { value } }) => {
    try {
      const response = await fetch('./data/mock.json');
      const data = await response.json();

      let matches = data.filter(({ name, abbr }) => {
        const regex = new RegExp(`^${value.toLowerCase()}`, 'gi');
        return name.toLowerCase().match(regex) || abbr.toLowerCase().match(regex);
      });

      if (value.length === 0) {
        matches = [];
        this.DOM.list.innerHTML = ``;
      }

      if (matches.length > 0) {
        this.DOM.list.innerHTML = `
        ${matches.map(({ name, abbr, capital, lat, long }) => `
        <li>
          <h5>${name} (${abbr}):</h5>
          <div>
            <p>${capital}</p>
            <p>Lat: ${lat} / Long: ${long}</p>
          </div>
        </li>
        `).join('')}
        `;
      }
    } catch (e) {
      console.log(e);
      showNotification('danger', 'Enter valid value');
    }
  };
}

// ⚡️Class instance
new App();
