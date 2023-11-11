/**
 * API föll.
 * @see https://lldev.thespacedevs.com/2.2.0/swagger/
 */

/**
 * Sækjum týpurnar okkar.
 * @typedef {import('./api.types.js').Launch} Launch
 * @typedef {import('./api.types.js').LaunchDetail} LaunchDetail
 * @typedef {import('./api.types.js').LaunchSearchResults} LaunchSearchResults
 */

/** Grunnslóð á API (DEV útgáfa) */
const API_URL = 'https://lldev.thespacedevs.com/2.2.0/';

/**
 * Skilar Promise sem bíður í gefnar millisekúndur.
 * Gott til að prófa loading state, en einnig hægt að nota `throttle` í 
 * DevTools.
 * @param {number} ms Tími til að sofa í millisekúndum.
 * @returns {Promise<void>}
 */
export async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(undefined), ms);
  });
}

/**
 * Leita í geimskota API eftir leitarstreng.
 * @param {string} query Leitarstrengur.
 * @returns {Promise<Launch[] | null>} Fylki af geimskotum eða `null` ef villa
 *  kom upp.
 */
export async function searchLaunches(query) {
  /* TODO útfæra */
  try {
    const response = await fetch(`${API_URL}launch/?mode=list&search=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('það eru einhver vandamál með netið');
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

/**
 * Skilar stöku geimskoti eftir auðkenni eða `null` ef ekkert fannst.
 * @param {string} id Auðkenni geimskots.
 * @returns {Promise<LaunchDetail | null>} Geimskot.
 */
export async function getLaunch(id) {
  /* TODO útfæra */
  try {
    const response = await fetch(`${API_URL}launch/${id}`);
    if (!response.ok) {
      throw new Error('Error Net tenging:');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
