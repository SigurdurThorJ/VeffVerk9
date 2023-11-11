import { getLaunch, searchLaunches } from './api.js';
import { el, empty } from './elements.js';

/**
 * Býr til leitarform.
 * @param {(e: SubmitEvent) => void} searchHandler Fall sem keyrt er þegar leitað er.
 * @param {string | undefined} query Leitarstrengur.
 * @returns {HTMLElement} Leitarform.
 */
export function renderSearchForm(searchHandler, query = undefined) {
  /* TODO útfæra */
  const form = el('form', {}, 
    el('input', { type: 'search', name: 'search', value: query || '' }),
    el('button', {}, 'Leita')
  );
  form.addEventListener('submit', searchHandler);
  return form;
}


/**
 * Setur „loading state“ skilabað meðan gögn eru sótt.
 * @param {HTMLElement} parentElement Element sem á að birta skilbaoð í.
 * @param {Element | undefined} searchForm Leitarform sem á að gera óvirkt.
 */
function setLoading(parentElement, searchForm = undefined) {
  /* TODO útfæra */
  if (searchForm) {
    const formClone = searchForm.cloneNode(true);
    formClone.querySelector('button').disabled = true;
    parentElement.replaceChild(formClone, searchForm);
  }
  const loadingElement = el('p', {}, 'Sæki gögn...');
  parentElement.appendChild(loadingElement);
}

/**
 * Fjarlægir „loading state“.
 * @param {HTMLElement} parentElement Element sem inniheldur skilaboð.
 * @param {Element | undefined} searchForm Leitarform sem á að gera virkt.
 */
function setNotLoading(parentElement, searchForm = undefined) {
  /* TODO útfæra */
  if (searchForm) {
     // Create a clone with the desired modifications
     const formClone = searchForm.cloneNode(true);
     formClone.querySelector('button').disabled = false;
 
     // Replace only if searchForm is still a child of parentElement
     if (parentElement.contains(searchForm)) {
       parentElement.replaceChild(formClone, searchForm);
     }
  }
  empty(parentElement);
}

/**
 * Birta niðurstöður úr leit.
 * @param {import('./api.types.js').Launch[] | null} results Niðurstöður úr leit
 * @param {string} query Leitarstrengur.
 */
function createSearchResults(results, query) {
  /* TODO útfæra */
  if (!results) {
    return el('p', {}, 'Engar niðurstöður fundust.');
  }
  const list = el('ul', {});
  results.forEach((launch) => {
    const item = el('li', {},
      el('a', { href: `/?id=${launch.id}` }, launch.name),
      el('span', {}, ` - ${launch.status.name}`),
    );
    list.appendChild(item);
  });
  return list;
}

/**
 *
 * @param {HTMLElement} parentElement Element sem á að birta niðurstöður í.
 * @param {Element} searchForm Form sem á að gera óvirkt.
 * @param {string} query Leitarstrengur.
 */
export async function searchAndRender(parentElement, searchForm, query) {
  /* TODO útfæra */
  setLoading(parentElement, searchForm);
  const results = await searchLaunches(query);
  setNotLoading(parentElement, searchForm);
  const searchResults = createSearchResults(results, query);
  parentElement.appendChild(searchResults);
}

/**
 * Sýna forsíðu, hugsanlega með leitarniðurstöðum.
 * @param {HTMLElement} parentElement Element sem á að innihalda forsíðu.
 * @param {(e: SubmitEvent) => void} searchHandler Fall sem keyrt er þegar leitað er.
 * @param {string | undefined} query Leitarorð, ef eitthvað, til að sýna niðurstöður fyrir.
 */
export function renderFrontpage(parentElement, searchHandler, query = undefined) {
  const heading = el('h1', {}, 'Geimskotaleitin 🚀');
  const searchForm = renderSearchForm(searchHandler, query);
  const container = el('main', {}, heading, searchForm);
  parentElement.appendChild(container);

  if (query) {
    searchAndRender(parentElement, searchForm, query);
  }
}

export async function renderDetails(parentElement, id) {
  const container = el('main', {});
  const backElement = el(
    'div',
    { class: 'back' },
    el('a', { href: '/' }, 'Til baka'),
  );


  parentElement.appendChild(container);

  setLoading(container);

  const result = await getLaunch(id);

  setNotLoading(container);

  if (!result) {
    container.textContent = 'Villa við að sækja gögn.';
    return;
  }

  const launchElement = el('div', { class: 'launch-details' },
    el('h2', {}, result.name),
    el('p', {}, `Staða: ${result.status.name}`),
    el('p', {}, `Geimferð: ${result.mission.name}`),
    result.image ? el('img', { src: result.image, alt: `Image of ${result.name}` }) : null,
    el('p', {}, `Stöðulýsing: ${result.status.description}`),
    el('p', {}, `Lýsing á geimferð: ${result.mission.description}`),
    // ... annað efni eftir þörfum
  );

  container.appendChild(backElement);
  container.appendChild(launchElement);
}

/**
 * Sýna geimskot.
 * @param {HTMLElement} parentElement Element sem á að innihalda geimskot.
 * @param {string} id Auðkenni geimskots.
 */

