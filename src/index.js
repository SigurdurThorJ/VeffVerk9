import { empty } from './lib/elements.js';
import { renderDetails, renderFrontpage, searchAndRender } from './lib/ui.js';

/**
 * Fall sem keyrir við leit.
 * @param {SubmitEvent} e
 * @returns {Promise<void>}
 */
async function onSearch(e) {
  /* TODO útfæra */
  e.preventDefault();
  const form = e.currentTarget;
  const formData = new FormData(form);
  const query = formData.get('search');
  searchAndRender(document.querySelector('main'), form, query);

}

/**
 * Athugar hvaða síðu við erum á út frá query-string og birtir.
 * Ef `id` er gefið er stakt geimskot birt, annars er forsíða birt með
 * leitarniðurstöðum ef `query` er gefið.
 */
function route() {
  /* TODO athuga hvaða síðu á að birta og birta */
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');
    const query = queryParams.get('query');
  
    if (id) {
      renderDetails(document.querySelector('body'), id);
    } else {
      renderFrontpage(document.querySelector('body'), onSearch, query);
    }
}

// Bregst við því þegar við notum vafra til að fara til baka eða áfram.
window.onpopstate = () => {
  /* TODO bregðast við */
  route();
};

// Athugum í byrjun hvað eigi að birta.
route();

