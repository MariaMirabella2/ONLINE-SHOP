
export const formatNumber = number => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'RON' }).format(number);
}


const API = 'https://stripe-backend-zknsth5hha-uc.a.run.app';

/**
 * A helper function to fetch data from your API.
 */
export async function fetchFromAPI(endpointURL, opts) {
  const { method, body } = { method: 'POST', body: null, ...opts };

  const res = await fetch(`${API}/${endpointURL}`, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json();
}