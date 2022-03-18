import { useRouter } from 'next/router'

const AirtablePlus = require('airtable-plus');
const airtable = new AirtablePlus({
  baseID: process.env.AIRTABLE_BASE_ID,
  apiKey: process.env.AIRTABLE_API_KEY,
  tableName: 'Links',
});

export default function RedirectPage(res) {
  const router = useRouter()
  if (typeof window !== 'undefined') {
    router.push(res.redirectUrl);
    return;
  }
}

RedirectPage.getInitialProps = async (ctx) => {
  if (ctx.res) {
    let slug = ctx.query.slug;
    if (slug[0] !== 'favicon.ico') {
      const shortUrl = slug[0];
      const params = slug.splice(1).toString().replace(/,/g, '/');
      const url = await airtable.read({
        filterByFormula: `Slug = "${shortUrl}"`,
        maxRecords: 1
      });
      if (url.length) {
        let urlToRedirect = url[0].fields.destination + `${params ? `/${params}` : ``}`;
        ctx.res.writeHead(303, { Location: urlToRedirect });
        ctx.res.end();
        return {
          redirectUrl: urlToRedirect
        }
      }
      if (!url.length) {
        ctx.res.writeHead(302, { Location: `/404?m=\/${slug[0]}` });
        ctx.res.end();
        return {
          redirectUrl: `/404?m=\/${slug[0]}`
        }
      }
    } else return { redirectUrl: `/404?m=what%20you%27re%20looking%20for` }
  }
  return { redirectUrl: '/404?m=where%20you%20are' };
}
